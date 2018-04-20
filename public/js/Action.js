// import exfunc from './sup.js';

//const yahoo = "https://baseball.yahoo.co.jp/npb/schedule/?&date=20180407";
const yahoo = "https://baseball.yahoo.co.jp/npb/schedule/";

// ------------------------------------------------------------
// PatterA  top-score
// ------------------------------------------------------------
//山梨日日
const sannichi = "https://sports.sannichi.co.jp/smp/sports/pro_baseball/";
//秋田魁
const sakigake = "http://sports.sakigake.jp/smp/sports/pro_baseball/";

var timestamp;

$(document).on('click', '#button01', function () {
    var downloadbtn =  $("#btnExport");

    //クリックした後の処理
    console.log("button clicked");

    //urlを取得する。
    //this.urlString = $('#url').val();
    var urlString = "/score";

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
});
$(document).on('click', '#button02', function () {
   

    //クリックした後の処理
    console.log("button clicked");

    //urlを取得する。
    //this.urlString = $('#url').val();
    var urlString = "/test";

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
});

$(document).ready(function () {
    var downloadbtn =  $("#btnExport");

    $('#btn-add-row').click(function () {
        var time = new Date().toLocaleTimeString();
        $('#recoredTable > tbody:last').append('<tr><td>안녕 친구들 </td><td>' + time + '</td></tr>');
    });

    $('#btn-delete-row').click(function () {
        $('#recoredTable > tbody:last > tr:last').remove();
    });

    $("#btnExport").on('click', function () {
        var fileName = "ScoreData_" + timestamp + ".xls";
        var uri = $("#recoredTable").excelexportjs({
            containerid: "recoredTable"
            , datatype: 'table'
            , returnUri: true
        });
        $(this).attr('download', fileName).attr('href', uri).attr('target', '_blank');
    });
});


// function compareScoreData() {

//     //TimeStampを 取得する 出力例:2008/5/1 2:00:00
//     let timestamp = toLocaleString(new Date());
//     this.timestamp = timestamp;

//     let standardScoreList = getStandardScore(yahoo, timestamp);
//     let patternAScoreList = getPatternAScoreList(sannichi, timestamp);
//     var indexnum = 0;
//     var logStr = '';
//     $('#sample01').append(standardScoreList);

//     for (standardScoreObj of standardScoreList) {
//         console.log(standardScoreObj);
//         for (patternAScoreObj of patternAScoreList) {

//             // if (indexnum == 0) {
//             //     patternAScoreObj.score_A = 99;
//             //     ++indexnum;
//             // }

//             console.log(patternAScoreObj);
//             if (standardScoreObj.teamName_A == patternAScoreObj.teamName_A
//                 && standardScoreObj.teamName_B == patternAScoreObj.teamName_B) {
//                 if (standardScoreObj.score_A != patternAScoreObj.score_A
//                     || standardScoreObj.score_B != patternAScoreObj.score_B) {
//                     patternAScoreObj.compareFlag = false;

//                     $('#recoredTable > tbody:last').append('<tr>' +
//                         '<td>' + standardScoreObj.site + ' </td>' +
//                         '<td>' + standardScoreObj.recoredTime + '</td>' +
//                         '<td>' + standardScoreObj.teamName_A + '</td>' +
//                         '<td>' + standardScoreObj.score_A + '</td>' +
//                         '<td>' + standardScoreObj.teamName_B + '</td>' +
//                         '<td>' + standardScoreObj.score_B + '</td>' +
//                         '</tr>');

//                     $('#recoredTable > tbody:last').append('<tr style="background-color: DarkSalmon;">' +
//                         '<td>' + patternAScoreObj.site + ' </td>' +
//                         '<td>' + patternAScoreObj.recoredTime + '</td>' +
//                         '<td>' + patternAScoreObj.teamName_A + '</td>' +
//                         '<td>' + patternAScoreObj.score_A + '</td>' +
//                         '<td>' + patternAScoreObj.teamName_B + '</td>' +
//                         '<td>' + patternAScoreObj.score_B + '</td>' +
//                         '</tr>');
//                 }
//             } else if (standardScoreObj.teamName_A == patternAScoreObj.teamName_B
//                 && standardScoreObj.teamName_B == patternAScoreObj.teamName_A) {
//                 if (standardScoreObj.score_A != patternAScoreObj.score_B
//                     || standardScoreObj.score_B != patternAScoreObj.score_A) {
//                     patternAScoreObj.compareFlag = false;

//                     $('#recoredTable > tbody:last').append('<tr>' +
//                         '<td>' + standardScoreObj.site + ' </td>' +
//                         '<td>' + standardScoreObj.recoredTime + '</td>' +
//                         '<td>' + standardScoreObj.teamName_A + '</td>' +
//                         '<td>' + standardScoreObj.score_A + '</td>' +
//                         '<td>' + standardScoreObj.teamName_B + '</td>' +
//                         '<td>' + standardScoreObj.score_B + '</td>' +
//                         '</tr>');

//                     $('#recoredTable > tbody:last').append('<tr style="background-color: DarkSalmon;">' +
//                         '<td>' + patternAScoreObj.site + ' </td>' +
//                         '<td>' + patternAScoreObj.recoredTime + '</td>' +
//                         '<td>' + patternAScoreObj.teamName_B + '</td>' +
//                         '<td>' + patternAScoreObj.score_B + '</td>' +
//                         '<td>' + patternAScoreObj.teamName_A + '</td>' +
//                         '<td>' + patternAScoreObj.score_A + '</td>' +
//                         '</tr>');

//                 }
//             }
//         }
//     }

//     //downloadbtn[0].click();
//     //.trigger('click',[{timestamp}]);
// }

//get standard of comparison From Yahoo
// function getStandardScore(urlString, timestamp) {

//     let document_str = getTargetSiteDomStr(urlString);
//     let document_obj = ParsingStringToDomObject(document_str) || 'notexist';

//     // パースに成功した
//     console.log("getStandardScore: print document_obj" + document_obj);
//     if (document_obj == null) {
//         console.log('getStandardScore :  document_obj == null');
//     }
//     //var matches = document_obj.querySelectorAll("#gm_sch table.teams tbody td.yjMS.bt");
//     var matches = document_obj.querySelectorAll("#gm_sch table.teams");
//     console.log("getStandardScore: matches" + matches);
//     var scoreObjList = [];

//     for (var i = 0; i < matches.length; i++) {
//         var nameA = matches[i].children[0].children[0].children[1].children[0].children[0].innerText;
//         var nameB = matches[i].children[0].children[1].children[1].children[0].children[0].innerText;
//         var ScoreA = matches[i].children[0].children[0].children[2].children[0].children[0].children[0].children[0].innerText;
//         var ScoreB = matches[i].children[0].children[0].children[2].children[0].children[0].children[2].children[0].innerText;
//         //すべての項目取得後、ScoreDataObject単位で管理する。
//         var scoreObj = new ScoreDataObject(nameA, Number(ScoreA), nameB, Number(ScoreB), timestamp, urlString, true);
//         console.log("getStandardScore scoreObj" + scoreObj);
//         scoreObjList.push(scoreObj);
//     }

//     console.log(scoreObjList.length);

//     return scoreObjList;
// }
// function getPatternAScoreList(urlString, timestamp) {
//     let document_str = getTargetSiteDomStr(urlString);
//     let document_obj = ParsingStringToDomObject(document_str) || 'notexist';

//     // パースに成功した
//     console.log("getPatternAScoreList print document_obj" + document_obj);
//     if (document_obj == null) {
//         console.log('getPatternAScoreList  :  document_obj == null');
//     }
//     var matches = document_obj.querySelectorAll("div.top-score section.score-detail-mini");
//     console.log("getPatternAScoreList matches" + matches);
//     var scoreObjList = [];

//     for (var i = 0; i < matches.length; i++) {
//         //section.score-detail-mini p strong.team basball-(teamname)
//         var nameA = matches[i].children[0].children[0].innerText;
//         var nameB = matches[i].children[0].children[2].innerText;
//         var ScoreA = (matches[i].children[0].children[1].children[0] == null)? '77' : matches[i].children[0].children[1].children[0].innerText ;
//         var ScoreB = (matches[i].children[0].children[1].children[1] == null)? '99' : matches[i].children[0].children[1].children[1].innerText;
//         //すべての項目取得後、ScoreDataObject単位で管理する。
//         var scoreObj = new ScoreDataObject(nameA, Number(ScoreA), nameB, Number(ScoreB), timestamp, urlString, true);
//         console.log(scoreObj);
//         scoreObjList.push(scoreObj);
//     }
//     return scoreObjList;
// }

// function getTargetSiteDomStr(urlString) {
//     console.log("url in ajax" + urlString);
//     var target_result = '';
//     $.ajax({
//         type: 'GET',
//         url: encodeURI(urlString),
//         dataType: 'html',
//         async: false,
//         success: function (data) {
//             console.log('ajax result' + data);
//             target_result = data;
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             console.log("ajax通信に失敗しました");
//             console.log("XMLHttpRequest : " + XMLHttpRequest.status);
//             console.log("textStatus     : " + textStatus);
//             console.log("errorThrown    : " + errorThrown.message);
//         },
//         complete: function (data) {
//             // alert("finishi");
//         }
//     });
//     console.log('gettargetsitedomobj' + target_result);
//     return target_result;
// }

// function ParsingStringToDomObject(data) {

//     let text_html = data;

//     // ------------------------------------------------------------
//     // DOMParser オブジェクトを作成する
//     // ------------------------------------------------------------
//     let dom_parser = new DOMParser();

//     // ------------------------------------------------------------
//     // html 文字列から Document オブジェクトを作成する
//     // ------------------------------------------------------------
//     let document_obj = null;
//     // ------------------------------------------------------------
//     // html 文字列から Document オブジェクトを作成する
//     // ------------------------------------------------------------
//     document_obj = dom_parser.parseFromString(text_html, "text/html");

//     // ------------------------------------------------------------
//     // パースに失敗したか調べる
//     // ------------------------------------------------------------

//     //url null 入っても、エラーにならない、ローカルホストのDOM取得してしまうので処理必要
//     if (document_obj.getElementsByTagName("parsererror").length) {
//         document_obj = null;
//     }

//     return document_obj;
// }

// function toLocaleString(date) {
//     return [
//         date.getFullYear(),
//         date.getMonth() + 1,
//         date.getDate()
//     ].join('/') + ' '
//         + date.toLocaleTimeString();
// }


// class ScoreDataObject {

//     constructor(teamName_A, score_A, teamName_B, score_B, recoredTime, site, compareFlag) {
//         this.teamName_A = teamName_A;
//         this.score_A = score_A;
//         this.teamName_B = teamName_B;
//         this.score_B = score_B;
//         this.recoredTime = recoredTime;
//         this.site = site;
//         this.compareFlag = compareFlag;
//     }

// }

// class ScoreViewModel {
//     constructor(ScoreDataObjectList) {
//         this.ScoreDataObjectList = ScoreDataObjectList;
//     }

// }