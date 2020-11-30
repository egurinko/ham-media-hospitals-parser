function saveCSV() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  
  const dir = DriveApp.createFolder(ss.getName().toLowerCase().replace(/ /g,'_') + '_csv_' + new Date().getTime());
  
  for (const sheet of sheets){
    const sheetName = sheet.getName();
    if(!excludedFiles(sheetName)){
      const fileName = sheetName + ".csv";
      const csvContent = convertRangeToCsvContent(fileName, sheet);
      const blob = Utilities.newBlob("", "text/csv", fileName).setDataFromString(csvContent);
      
      dir.createFile(blob);
    }
  }
}

function convertRangeToCsvContent(fileName, sheet){
  // エクセルの二次元配列
  const rows = sheet.getDataRange().getValues();

  // 二次元配列をCSV形式のテキストデータに変換
  const dataArray = [];
  for (var i = 0; i < rows.length; i++) {
    // 上から３行目まではいらない
    if (i >= 3) {
      // セル内改行の許容
      const removed = rows[i].map(cell => '\"' + cell + '\"');
    
      dataArray.push(removed.join(","));
    }
  }
  return dataArray.join("\n");
}

function excludedFiles(sheetName){
  return sheetName === "はじめに" || sheetName === "エキゾ専門" || sheetName === "sample";
}
