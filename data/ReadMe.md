

EJS MEMO
https://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9


     // // ３通りの列取得方法
        // var idCol = worksheet.getColumn('id');
        // var nameCol = worksheet.getColumn('B');
        // var dobCol = worksheet.getColumn(3);
        // // Insert a page break prior to the row
        // //row.addPageBreak();
        // // C1にDate of Birth、C2にA.K.A. D.O.B.
        // dobCol.header = ['Date of Birth', 'A.K.A. D.O.B.'];

        // // セル幅指定
        // dobCol.width = 50;

        // // 直接セル名を指定して値を代入
        // worksheet.getCell('C3').value = "555";

        // // 文字の色を変える
        // worksheet.getCell('C2').font = { color: { argb: 'FF00FF00' } };

        // // セルを塗りつぶす（塗りつぶせないセルもある・・・　なぜ？）
        // worksheet.getCell('C3').fill = {
        //     type: 'pattern',
        //     pattern: 'solid',
        //     fgColor: { argb: '12345678' }
        // };