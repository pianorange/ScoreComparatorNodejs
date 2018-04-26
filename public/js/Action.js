
  // ------------------------------------------------------------
　//HTMLPageのボタンイベントを設定する
　// ------------------------------------------------------------


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

});
