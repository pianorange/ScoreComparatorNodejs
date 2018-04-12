const fs = require("fs");
module.exports = {

    CreateDirectory: function (timestamp) {
        //var fs = require("fs");
        let basepath = 'c:/';
        let foldername = 'ComparedScoreData_' + timestamp;
        var directoryPath = basepath + foldername;
        console.log("Going to create directory  " + directoryPath);
        fs.mkdir(directoryPath, function (err) {
            if (err != null && err.code == "EEXIST") {
                console.log("folder exist already");
                console.error(err);
                return directoryPath;
            }
        });
        console.log("Directory created successfully!   " + directoryPath);
        return directoryPath;
    },
    ExportDataFile: function (timestamp, matchDataList, directoryPath) {
        var Excel = require("exceljs");
        var filePath = directoryPath + '/scoreData_' + timestamp + '.xlsx';

        fs.stat(filePath, function (err, data) {
           
            if (err) {
                console.log(filePath + 'File does not exist. Create new File');
                var workbook = new Excel.Workbook();
                var worksheet = workbook.addWorksheet(timestamp);

                worksheet.columns = [
                    // セル入力値、キー、セル幅
                    { header: 'site', key: 'site', width: 30 },
                    { header: 'recoredTime', key: 'recoredTime', width: 20 },
                    { header: 'teamName_A', key: 'teamName_A', width: 15 },
                    { header: 'score_A', key: 'score_A', width: 10 },
                    { header: 'teamName_B', key: 'teamName_B', width: 15 },
                    { header: 'score_B', key: 'score_B', width: 10 }
                ];

                for (matchData of matchDataList) {
                    for (perMatchData of matchData) {
                        // Add a couple of Rows by key-value, after the last current row, using the column keys
                        worksheet.addRow({
                            site: perMatchData.site,
                            recoredTime: perMatchData.recoredTime,
                            teamName_A: perMatchData.teamName_A,
                            score_A: perMatchData.score_A,
                            teamName_B: perMatchData.teamName_B,
                            score_B: perMatchData.score_B
                        });
                              if (perMatchData.compareFlag == false) {
                                    let row = worksheet.lastRow;
                                    row.fill = {
                                        type: 'pattern',
                                        pattern:'solid',
                                        fgColor:{argb:'12345678'}
                                    };
                                }
                    }
                }
                workbook.xlsx.writeFile(filePath);

            } else {
                console.log(filePath + 'File exists. update File');
                var workbook = new Excel.Workbook();
                workbook.xlsx.readFile(filePath).then(function () {
                        var worksheet = workbook.getWorksheet(1);
                        console.log(worksheet.getRow(5).values);
                        for (matchData of matchDataList) {
                            for (perMatchData of matchData) {
                                console.log(perMatchData);
                                // Add a couple of Rows by key-value, after the last current row, using the column keys
                              
                                worksheet.addRow([
                                    perMatchData.site,
                                    perMatchData.recoredTime,
                                    perMatchData.teamName_A,
                                    perMatchData.score_A,
                                    perMatchData.teamName_B,
                                    perMatchData.score_B
                                ]).commit();
                                if (perMatchData.compareFlag == false) {
                                    console.log('flagdata');
                                    //columeCount 써서마지막 컬럼까지 범위지정가능
                                    worksheet.lastRow.fill = {
                                        type: 'pattern',
                                        pattern:'solid',
                                        fgColor:{argb:'12345678'}
                                    };
                                    worksheet.lastRow.commit();
                                }
                            }
                        }
                        console.log('file Modify lastline');
                        return workbook.xlsx.writeFile(filePath);
                    })
            }

        });



    }
};

