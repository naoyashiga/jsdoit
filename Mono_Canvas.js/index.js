(function () {
    function Draw_Mono(imgObj){
        //画像を描画
        ctx.drawImage(imgObj,0,0,width,height);
        
        //Canvasのイメージデータを取得
        var imgData = ctx.getImageData(0,0,width,height);
        
        //imgDataのプロパティを取得
        var data = imgData.data;
        
        // 各ピクセルの色情報設定
        for(var i = 0;i<data.length;i+=4){
            var brightness = 0.34*data[i] + 0.5*data[i+1] + 0.16*data[i+2];
            // red
            data[i] = brightness;
            // green
            data[i + 1] = brightness;
            // blue
            data[i + 2] = brightness;
            
        }
        //加工したイメージデータを再描画
        ctx.putImageData(imgData, 0, 0);
    }

    var canvas = document.getElementsByClassName("mono");

    //canvasの数だけループ
    for(var i = 0;i<canvas.length;i++){
        var ctx = canvas[i].getContext("2d");

        var width = canvas[i].width;
        var height = canvas[i].height;

        //canvasをpngで保存
        var img_src = canvas[i].toDataURL();
        //イメージオブジェクトを生成
        var imgObj = new Image();
        imgObj.src = img_src;
        
        imgObj.onload = function(){
            Draw_Mono(this);
        };
    }
})();