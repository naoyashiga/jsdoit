var canvas = document.getElementById("world");
canvas.setAttribute("width",480);
canvas.setAttribute("height",480);

var ctx = canvas.getContext("2d");

var w = canvas.width;
var h = canvas.height;

//1マスの大きさ
var LENGTH = 10;

for(var i = 0;i<=w;i++){
    for(var j = 0;j<=h;j++){
        //パスの開始
        ctx.beginPath();
        //乱数生成
        var num = Math.floor(Math.random()*2);
        
        if(num==1){
            //左上から右下への線
            ctx.moveTo(LENGTH*i,LENGTH*j);
            ctx.lineTo(LENGTH+LENGTH*i,LENGTH+LENGTH*j);
        }else{
            //右上から左下への線
            ctx.moveTo(LENGTH*i+LENGTH,LENGTH*j);
            ctx.lineTo(LENGTH*i,LENGTH+LENGTH*j);
        }
        //乱数生成
        var color = Math.floor(Math.random()*3);
        
        if(color==1){
            ctx.strokeStyle = "#3cbdc9";//ブルー
        }else if(color==2){
            ctx.strokeStyle = "#D30202";//レッド
        }else{
            ctx.strokeStyle = "#87EA07";//グリーン
        }
        //線の太さ
        ctx.lineWidth = 5;
        //パスの終了
        ctx.closePath();
        //パスの描画
        ctx.stroke();
    }
}

