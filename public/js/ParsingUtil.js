
// ------------------------------------------------------------
//HTMLParsingに関した処理を管理する
// ------------------------------------------------------------
var querySelectorAll = require('query-selector');
const ScoreDataObject = require('./ScoreDataObject.js');


// ------------------------------------------------------------
// Standard Score。比較基準になるスコアはヤフーから提供されるデータにする。
// ------------------------------------------------------------
const yahoo = "https://baseball.yahoo.co.jp/npb/schedule/?&date=20180425";
//const yahoo = "https://baseball.yahoo.co.jp/npb/schedule/";

// ------------------------------------------------------------
// PatterA  top-score
// ------------------------------------------------------------
//山梨日日
const sannichi = "https://sports.sannichi.co.jp/smp/sports/pro_baseball/";
//秋田魁
const sakigake = "http://sports.sakigake.jp/smp/sports/pro_baseball/";

const fukui_se = "http://sports.fukuishimbun.co.jp/list.html?k=%E3%83%97%E3%83%AD%E9%87%8E%E7%90%83,%E3%83%97%E3%83%AD%E9%87%8E%E7%90%83%E9%80%9F%E5%A0%B1%E3%83%91%E3%83%BC%E3%83%84,%E3%82%BB%E3%83%BB%E3%83%AA%E3%83%BC%E3%82%B0&pt=results&cat=pro_baseball";


module.exports = {

    seleniumTest: async  function (urlString) {

        const webdriver = require('selenium-webdriver');
        const chrome = require('selenium-webdriver/chrome');
        var path = require('chromedriver').path;
        const { Builder, By, Key } = require('selenium-webdriver');

        var driver =  chrome.Driver.createSession(new chrome.Options(), new
            chrome.ServiceBuilder(path).build());

        // Do not implicitly wait for anything.
        driver.manage().timeouts().implicitlyWait(0);

        // Set the script wait timeout to 10 seconds.
        driver.manage().timeouts().setScriptTimeout(10 * 1000);

        var strhtml;
        //取得したいURLの設定
         driver.get(yahoo).then(function () {

            let untilDomReady = new webdriver.Condition('to be ready', function (driver) {
                return driver
                    .executeScript("return document.readyState;")
                    .then(function (state) {
                        return state === 'complete';
                    });
            });

            driver.wait(untilDomReady, 2000).then(function () {
                //非同期処理
                driver.getPageSource().then(function (source) {
                    strhtml = source;
                    console.log("sourceCode!!!!!"+source);
                    if (source = ! null) {

                        console.log("sourceCode"+source);

                    } else {
                        return "failed";
                    }
                });
            });
        });
        driver.sleep(3000);
        let until = webdriver.until;

        console.log("strhtml!!!!!!!!!!!!! typeof" + typeof strhtml);
        console.log("strhtml!!!!!!!!!!!!!" + strhtml);

        driver.quit();
        return strhtml;
    },

    compareScoreData: function (timestamp) {

        //各siteから取得したデータを入れるためのリスト
        var compareTargetScoreDataList = [];
        var standardScoreList = getStandardScore(yahoo, timestamp);
        //testのために、sannichi一つだけを設定
        var patternAScoreList = getPatternAScoreDataList(sannichi, timestamp);
        compareTargetScoreDataList.push(patternAScoreList);

        var indexnum = 0;
        var logStr = '';
        //マッチごとにリストを生成して、管理する。
        var matchDataList = [];

        for (standardScoreObj of standardScoreList) {
            var perMatchDataList = [];
            perMatchDataList.push(standardScoreObj);

            console.log(standardScoreObj);
            for (compareTargetScoreData of compareTargetScoreDataList) {
                for (patternAScoreObj of compareTargetScoreData) {

                    if (standardScoreObj.teamName_A == patternAScoreObj.teamName_A
                        && standardScoreObj.teamName_B == patternAScoreObj.teamName_B) {
                        if (standardScoreObj.score_A != patternAScoreObj.score_A
                            || standardScoreObj.score_B != patternAScoreObj.score_B) {
                            patternAScoreObj.compareFlag = false;
                            console.log(patternAScoreObj);
                            perMatchDataList.push(patternAScoreObj);
                        } else {
                            perMatchDataList.push(patternAScoreObj);
                        }
                    } else if (standardScoreObj.teamName_A == patternAScoreObj.teamName_B
                        && standardScoreObj.teamName_B == patternAScoreObj.teamName_A) {
                        //基準になるサイトとデータの表示順序が反対なので、合わせて設定。
                        let teamName_A = patternAScoreObj.teamName_A;
                        let teamName_B = patternAScoreObj.teamName_B;
                        let score_A = patternAScoreObj.score_A;
                        let score_B = patternAScoreObj.score_B;

                        patternAScoreObj.teamName_A = teamName_B;
                        patternAScoreObj.score_A = score_B;
                        patternAScoreObj.teamName_B = teamName_A;
                        patternAScoreObj.score_B = score_A;

                        if (standardScoreObj.score_A != patternAScoreObj.score_A
                            || standardScoreObj.score_B != patternAScoreObj.score_B) {
                            patternAScoreObj.compareFlag = false;
                            console.log(patternAScoreObj);
                            perMatchDataList.push(patternAScoreObj);
                        } else {
                            perMatchDataList.push(patternAScoreObj);
                        }
                    }
                }
            }
            matchDataList.push(perMatchDataList);
        }
        for (inneritem of matchDataList[0]) {
            console.log(inneritem.teamName_A + inneritem.teamName_B + inneritem.score_A + inneritem.score_B);
        }
        return matchDataList;
    },
    toLocaleString: function (date, flag) {
        if (flag == 'dateonly') {
            return [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            ].join('_');
        } else {
            return [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            ].join('_') + ' '
                + date.toLocaleTimeString();
        }

    }
};

var getStandardScore = function (urlString, timestamp) {
    let document_str = getTargetSiteDomStr(urlString);
    let document_obj = ParsingStringToDomObject(document_str) || 'notexist';

    var matches = document_obj.querySelectorAll("#gm_sch table.teams");
    var scoreObjList = [];

    for (var i = 0; i < matches.length; i++) {
        var nameA = matches[i].children[0].children[0].children[1].children[0].children[0].innerHTML;
        console.log(typeof nameA);
        console.log(nameA);

        var nameB = matches[i].children[0].children[1].children[1].children[0].children[0].innerHTML;
        console.log(typeof nameB);
        console.log(nameB);
        var ScoreA = matches[i].children[0].children[0].children[2].children[0].children[0].children[0].children[0].textContent;
        console.log(typeof ScoreA);
        console.log(ScoreA);
        var ScoreB = matches[i].children[0].children[0].children[2].children[0].children[0].children[2].children[0].textContent;
        console.log(typeof ScoreB);
        console.log(ScoreB);

        //すべての項目取得後、ScoreDataObject単位で管理する。
        var scoreObj = new ScoreDataObject(nameA, Number(ScoreA), nameB, Number(ScoreB), timestamp, urlString, true);
        console.log("getStandardScore scoreObj" + scoreObj);
        scoreObjList.push(scoreObj);
    }

    console.log(scoreObjList.length);

    return scoreObjList;
}
var getPatternAScoreDataList = function (urlString, timestamp) {
    let document_str = getTargetSiteDomStr(urlString);
    let document_obj = ParsingStringToDomObject(document_str) || 'notexist';

    var matches = querySelectorAll("div.top-score section.score-detail-mini", document_obj);
    console.log("getPatternAScoreList matches" + matches);
    var scoreObjList = [];

    for (var i = 0; i < matches.length; i++) {
        //section.score-detail-mini p strong.team basball-(teamname)
        var nameA = matches[i].children[0].children[0].textContent;
        var nameB = matches[i].children[0].children[2].textContent;
        //結果確認のために、Parsing対象サイトでスコア情報を表示していない時には77,99を入れるように設定
        var ScoreA = (matches[i].children[0].children[1].children[0] == null) ? '77' : matches[i].children[0].children[1].children[0].textContent;
        var ScoreB = (matches[i].children[0].children[1].children[1] == null) ? '99' : matches[i].children[0].children[1].children[1].textContent;
        //すべての項目取得後、ScoreDataObject単位で管理する。
        var scoreObj = new ScoreDataObject(nameA, Number(ScoreA), nameB, Number(ScoreB), timestamp, urlString, true);
        console.log(scoreObj);
        scoreObjList.push(scoreObj);
    }
    return scoreObjList;
}

var ParsingStringToDomObject = function (data) {

    var jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    let text_html = data;
    let dom = null;

    // ------------------------------------------------------------
    // html 文字列から Document オブジェクトを作成する
    // ------------------------------------------------------------
    dom = new JSDOM(text_html);
    let document_obj = dom.window.document;

    return document_obj;
}


var getTargetSiteDomStr = function (urlString) {
    var $ = require('jquery')(require('jsdom-no-contextify').jsdom().parentWindow);

    // Support for Cross-domain request with using jQuery
    // See: http://garajeando.blogspot.jp/2012/06/avoiding-xmlhttprequest-problem-using.html
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    $.support.cors = true;
    $.ajaxSettings.xhr = function () {
        return new XMLHttpRequest;
    }

    console.log("url in ajax" + urlString);
    var target_result = '';
    $.ajax({
        type: 'GET',
        url: encodeURI(urlString),
        dataType: 'html',
        async: false,
        success: function (data) {
            console.log('ajax result' + data);
            target_result = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        },
        complete: function (data) {
            // alert("complete");
        }
    });
    console.log('gettargetsitedomobj' + target_result);
    return target_result;
}
