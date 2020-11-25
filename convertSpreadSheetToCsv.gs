// Google SpreadSheet の都道府県別病院リストシートを、CSV に書き出してくれるやつです

function saveCSV() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  
  const dir = DriveApp.createFolder(ss.getName().toLowerCase().replace(/ /g,'_') + '_csv_' + new Date().getTime());
  
  for (const sheet of sheets){
    const fileName = sheet.getName() + ".csv";
    const csvContent = convertRangeToCsvContent(fileName, sheet);
    const blob = Utilities.newBlob("", "text/csv", fileName).setDataFromString(csvContent);
    
    dir.createFile(blob);
  }
}

function convertRangeToCsvContent(fileName, sheet){
  const values = sheet.getDataRange().getValues();

  // 二次元配列をCSV形式のテキストデータに変換
  const dataArray = [];
  for (var i = 0; i < values.length; i++) {
    // 上から３行目まではいらない
    if (i >= 3) {
      // セル内改行の許容
      const removed = values[i].map(value => '\"' + value + '\"');
    
      dataArray.push(removed.join(","));
    }
  }
  return dataArray.join("\n");
}
