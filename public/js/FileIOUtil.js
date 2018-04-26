
// ------------------------------------------------------------
//LogFlie作成、格納ディレクトリ生成処理を管理する
// ------------------------------------------------------------

const fs = require("fs");

module.exports = {

    CreateDirectory: function (timestamp) {

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
    ExportNGDataFile: function (timestamp, matchDataList, directoryPath) {
        var Excel = require("exceljs");
        var filePath = directoryPath + '/scoreDataNG_' + timestamp + '.xlsx';

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
                        if (perMatchData.compareFlag == false) {
                            // Add a couple of Rows by key-value, after the last current row, using the column keys
                            worksheet.addRow([
                                matchData[0].site,
                                matchData[0].recoredTime,
                                matchData[0].teamName_A,
                                matchData[0].score_A,
                                matchData[0].teamName_B,
                                matchData[0].score_B
                            ]).commit();
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
                                    pattern: 'solid',
                                    fgColor: { argb: '12345678' }
                                };
                            }
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
                            if (perMatchData.compareFlag == false) {
                                console.log(perMatchData);
                                // Add a couple of Rows by key-value, after the last current row, using the column keys
                                worksheet.addRow([
                                    matchData[0].site,
                                    matchData[0].recoredTime,
                                    matchData[0].teamName_A,
                                    matchData[0].score_A,
                                    matchData[0].teamName_B,
                                    matchData[0].score_B
                                ]).commit();
                                worksheet.addRow([
                                    perMatchData.site,
                                    perMatchData.recoredTime,
                                    perMatchData.teamName_A,
                                    perMatchData.score_A,
                                    perMatchData.teamName_B,
                                    perMatchData.score_B
                                ]).commit();

                                worksheet.lastRow.fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: '12345678' }
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
                                pattern: 'solid',
                                fgColor: { argb: '12345678' }
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
                    console.log("matchdataList!");
                    console.log(matchDataList);
                    console.log("matchdata!");
                    console.log(matchData);
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

                                worksheet.lastRow.fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: '12345678' }
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

