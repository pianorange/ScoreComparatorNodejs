const ScoreDataObject = require('../public/js/ScoreDataObject.js');


module.exports = function (app, fs) {

    var ParsingUtils = require('../public/js/ParsingUtil');
    var FileIOUtils = require('../public/js/FileIOUtil');

    app.get('/', function (req, res) {
        res.render('Practice.html');
    });

    app.get('/score', function (req, res) {

        let timestamp = ParsingUtils.toLocaleString(new Date());
        let timestamp_date = ParsingUtils.toLocaleString(new Date(), 'dateonly');
        var matchDataList = ParsingUtils.compareScoreData(timestamp);
        let directoryPath = FileIOUtils.CreateDirectory(timestamp_date, fs);

        FileIOUtils.ExportNGDataFile(timestamp_date, matchDataList, directoryPath);
        FileIOUtils.ExportDataFile(timestamp_date, matchDataList, directoryPath);
        res.render('Practice.html');
    });

    app.get('/test', function (req, res) {

        let timestamp = ParsingUtils.seleniumTest().then(function (data) {
            console.log("main result" + timestamp + data);
        });

        res.send('networking success');
    });

}