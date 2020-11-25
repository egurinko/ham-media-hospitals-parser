import * as fs from "fs";
import csv from "csv-parser";

fs.readdir("hospitals", (error, fileNames) => {
    const hospitals: any = {};

    fileNames.map((fileName, index)=>{
        const prefectureHospitals: any = [];
        fs.createReadStream(`./hospitals/${fileName}`)
            .pipe(csv())
            .on("data", (data) => prefectureHospitals.push(data))
            .on("end", ()=>{
                const prefectureName = fileName.split(".")[0];
                hospitals[prefectureName] = prefectureHospitals;

                if (index === fileNames.length-1) {
                    const jsonHospitals = JSON.stringify(hospitals);
                    fs.writeFileSync('hospitals.json', jsonHospitals);
                }
            })
    })
})
