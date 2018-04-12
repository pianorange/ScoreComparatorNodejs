const ScoreDataObject = require('../public/js/ScoreDataObject.js');


module.exports = function (app, fs) {

    var ParsingUtils = require('../public/js/ParsingUtil');
    var ParsingUtil = require('../public/js/ParsingUtil');
    app.get('/', function (req, res) {
        //res.render('index.html');
        console.log(parsingTools.foo());
        res.render('index', {
            title: "MY HomePage",
            length: 5
        })
    });

    app.get('/list', function (req, res) {
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function (err, data) {
            console.log(data);
            res.end(data);
        });
    })

    app.get('/getUser/:username', function (req, res) {
        fs.readFile(__dirname + "/../data/user.json", 'utf-8', function (err, data) {
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });


    app.post('/addUser/:username', function (req, res) {

        var result = {};
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if (!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function (err, data) {
            var users = JSON.parse(data);
            if (users[username]) {
                // DUPLICATION FOUND
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;

            // SAVE DATA
            fs.writeFile(__dirname + "/../data/user.json",
                JSON.stringify(users, null, '\t'), "utf8", function (err, data) {
                    result = { "success": 1 };
                    res.json(result);
                })
        })
    });



    app.get('/score', function (req, res) {
        //standardScoreList_param, patternAScoreList_param
        let timestamp = ParsingUtils.toLocaleString(new Date());
        var matchDataList = ParsingUtils.compareScoreData(timestamp);



        res.render('Practice.html');
    });

    app.post('/score', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        var tableData = req.body.recoredTable;
        console.log('request success!!!! ');
        console.log(req.body);
        console.log(tableData);
        res.send('networking success');
        //res.render("Success");
    });

}