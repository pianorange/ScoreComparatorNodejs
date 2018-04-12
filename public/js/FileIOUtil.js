module.exports = {

    CreateDirectory: function (timestamp) {
        let basepath = 'c:/';
        let foldername = 'ComparedScoreData_' + timestamp;
        let path = basepath + foldername;
        console.log(matchDataList);
        console.log("Going to create directory  " + path);
        fs.mkdir(path, function (err) {
            if (err != null && err.code == "EEXIST") {
                console.log("folder exist already");
                return console.error(err);
            }else{
                console.log("Directory created successfully!   " + path);
            }
        });
    },
    ExportDataFile: function (timestamp) {
    
    }
};

