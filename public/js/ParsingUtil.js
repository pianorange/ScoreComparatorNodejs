var querySelectorAll = require('query-selector');


// const Node = require('xmldom').Node;
// const NodeList = require('xmldom').NodeList;
//const DOMParser = require('dom-parser');
const ScoreDataObject = require('./ScoreDataObject.js');


//const yahoo = "https://baseball.yahoo.co.jp/npb/schedule/?&date=20180411";
const yahoo = "https://baseball.yahoo.co.jp/npb/schedule/";

// ------------------------------------------------------------
// PatterA  top-score
// ------------------------------------------------------------
//山梨日日
const sannichi = "https://sports.sannichi.co.jp/smp/sports/pro_baseball/";
//秋田魁
const sakigake = "http://sports.sakigake.jp/smp/sports/pro_baseball/";


module.exports = {

    compareScoreData: function (timestamp) {
        //各siteから取得したデータを入れるためのリスト
        var compareTargetScoreDataList = [];
        var standardScoreList = getStandardScore(yahoo, timestamp);
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
                        }else {
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
                        }else {
                            perMatchDataList.push(patternAScoreObj);
                        }
                    }
                }
            }
            matchDataList.push(perMatchDataList);
        }
        for (inneritem of matchDataList[0]) {
            console.log(inneritem.teamName_A+inneritem.teamName_B+inneritem.score_A+inneritem.score_B);
        }
        return matchDataList;
    },
    toLocaleString : function (date,flag) {
        if(flag == 'dateonly'){
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

    // パースに成功した
    console.log("getStandardScore: print document_obj" + document_obj + "resultType:" + typeof document_obj);
    if (document_obj == null) {
        console.log('getStandardScore :  document_obj == null');
    }
    //var matches = document_obj.getElementById("gm_sch").getElementsByTagName("table").getElementsByClassName("teams");
    var matches = document_obj.querySelectorAll("#gm_sch table.teams");
    console.log("getStandardScore: matchestextContent" + document_obj.querySelectorAll("#gm_sch table.teams")[0].innerHTML);

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

    // パースに成功した
    console.log("getPatternAScoreList print document_obj" + document_obj);
    if (document_obj == null) {
        console.log('getPatternAScoreList  :  document_obj == null');
    }
    //var matches = document_obj.getElementsByTagName("div").getElementsByClassName("top-score").getElementsByTagName("section").getElementsByClassName("score-detail-mini");
    var matches = querySelectorAll("div.top-score section.score-detail-mini", document_obj);
    console.log("getPatternAScoreList matches" + matches);
    var scoreObjList = [];

    for (var i = 0; i < matches.length; i++) {
        //section.score-detail-mini p strong.team basball-(teamname)
        var nameA = matches[i].children[0].children[0].textContent;
        var nameB = matches[i].children[0].children[2].textContent;
        var ScoreA = (matches[i].children[0].children[1].children[0] == null) ? '77' : matches[i].children[0].children[1].children[0].textContent;
        var ScoreB = (matches[i].children[0].children[1].children[1] == null) ? '99' : matches[i].children[0].children[1].children[1].textContent;
        //すべての項目取得後、ScoreDataObject単位で管理する。
        var scoreObj = new ScoreDataObject(nameA, Number(ScoreA), nameB, Number(ScoreB), timestamp, urlString, true);
        console.log(scoreObj);
        scoreObjList.push(scoreObj);
    }
    return scoreObjList;
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
            // alert("finishi");
        }
    });
    console.log('gettargetsitedomobj' + target_result);
    return target_result;
}

var ParsingStringToDomObject = function (data) {

    var jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    let text_html = data;
    //var DOMParser = require('dom-parser');

    // ------------------------------------------------------------
    // DOMParser オブジェクトを作成する
    // ------------------------------------------------------------
    //  let dom_parser = new DOMParser();


    // ------------------------------------------------------------
    // html 文字列から Document オブジェクトを作成する
    // ------------------------------------------------------------
    let dom = null;
    // ------------------------------------------------------------
    // html 文字列から Document オブジェクトを作成する
    // ------------------------------------------------------------
    dom = new JSDOM(text_html);
    let document_obj = dom.window.document;
    // ------------------------------------------------------------
    // パースに失敗したか調べる
    // ------------------------------------------------------------

    //url null 入っても、エラーにならない、ローカルホストのDOM取得してしまうので処理必要
    // if (document_obj.getElementsByTagName("parsererror").length) {
    //     document_obj = null;
    // }

    return document_obj;
}



