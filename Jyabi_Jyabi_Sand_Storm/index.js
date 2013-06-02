var canvas = document.getElementById("world");
//canvasの横幅を設定
canvas.setAttribute("width",480);
//canvasの縦幅を設定
canvas.setAttribute("height",480);
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

//canvasの背景色
ctx.fillStyle = "#000";
ctx.fillRect(0,0,width,height);

//フォントスタイルを定義
ctx.font = "150px 'ＭＳ Ｐゴシック'";
//色
ctx.fillStyle = "#FFF";
//表示文字,表示位置
ctx.fillText("砂嵐", 100,height/2);


function Draw(imgObj){
    //画像を描画
    ctx.drawImage(imgObj,0,0,width,height);
    
    //Canvasのイメージデータを取得
    var imgData = ctx.getImageData(0,0,width,height);
    
    //imgDataのプロパティを取得
    var data = imgData.data;
    
    // 各ピクセルの色情報設定
    for(var y = 0;y < height;y++) {
        for(var x = 0;x < width;x++) {
            //対象pixelのindex
            var index = (x + y *width)*4;
                       
            if(y%3==0 && x%3==0){
                //各色情報をランダムな値に更新
                data[index + 0] = Math.random()*255;
                data[index + 1] = Math.random()*255;
                data[index + 2] = Math.random()*255;
            }
        }
    }
    
    //加工したイメージデータを再描画
    ctx.putImageData(imgData, 0, 0);
    
    //繰り返し
    setTimeout(function(){Draw(imgObj);},10);
}


window.onload = function(){
	//canvasをpngで保存
    var img_src = canvas.toDataURL();
    //イメージオブジェクトを生成
    var imgObj = new Image();
    imgObj.src = img_src;
    
    imgObj.onload = function(){
        Draw(this);
    };
    
};