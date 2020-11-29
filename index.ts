import * as fs from "fs";
import csv from "csv-parser";

fs.readdir("hospitals", (error, fileNames) => {
    const hospitals: any = {};

    const fileReadPromises = fileNames.map((fileName, index)=>{
        const prefectureHospitals: any = [];

        return new Promise((resolve, reject)=>{
            fs.createReadStream(`./hospitals/${fileName}`)
                            .pipe(csv())
                            .on("data", (data) => prefectureHospitals.push(data))
                            .on("end", ()=>{
                                const prefectureName = fileName.split(".")[0];
                                hospitals[prefectureName] = prefectureHospitals;

                                resolve("read");
                            })
        })
    })

    Promise
        .all(fileReadPromises)
        .then(()=>{
            const jsonHospitals = JSON.stringify(hospitals);
            fs.writeFileSync('hospitals.json', jsonHospitals);

            console.log("FINISH:", Object.keys(hospitals).length);
            console.log("道府県 + 東京23区 + 東京23区外");
        })
})
