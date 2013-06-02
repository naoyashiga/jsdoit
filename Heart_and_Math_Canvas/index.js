var canvas = document.getElementById("world");
//canvasの横幅を設定
canvas.setAttribute("width",480);
//canvasの縦幅を設定
canvas.setAttribute("height",480);
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";
ctx.fillRect(0,0,canvas.width,canvas.height);

//X軸
ctx.beginPath();
ctx.strokeStyle = "#1987E5";
ctx.moveTo(0,canvas.height/2);
ctx.lineTo(canvas.width,canvas.height/2);
ctx.stroke();

//Y軸
ctx.beginPath();
ctx.strokeStyle = "#1987E5";
ctx.moveTo(canvas.width/2,0);
ctx.lineTo(canvas.width/2,canvas.height);
ctx.stroke();

//原点
var X = canvas.width/2;
var Y = canvas.height/2;
//角度の初期値
var radian = 0;
//シータの中身
var t = radian*Math.PI/180;
//ハートのパラメータ
var x = 16*Math.pow(Math.sin(t),3);
var y = 13*Math.cos(t) - 5*Math.cos(2*t) -2*Math.cos(3*t) - Math.cos(4*t);

while(radian<=360){
    //パス開始
    ctx.beginPath();
    //透明度を設定
    ctx.globalAlpha = 0.4;
    //色を設定
    ctx.strokeStyle = "#F2D8DF";
    //原点に移動
    ctx.moveTo(X,Y);
    //ハートの輪郭まで線を引く
    ctx.lineTo(X+10*x,Y-10*y);
    //描画
    ctx.stroke();
    //角度を増やす
    radian = radian + 0.1;
    //各値を更新
    t = radian*Math.PI/180;
    x = 16*Math.pow(Math.sin(t),3);
	y = 13*Math.cos(t) - 5*Math.cos(2*t) -2*Math.cos(3*t) - Math.cos(4*t);
}