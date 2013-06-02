var canvas = document.getElementById("world");
//canvasの横幅を設定
canvas.setAttribute("width",480);
//canvasの縦幅を設定
canvas.setAttribute("height",480);
var ctx = canvas.getContext("2d");

//原点
var X = canvas.width/2;
var Y = canvas.height/2;
//角度の初期値
var radian = 0;

//シータの中身
var t = radian*Math.PI/180;

var x = 0;
var y = 100*Math.sin(t);

var radius = 3;
var SPEED = 2;

function Draw_Stage(){
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
}

function Draw_Sin(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    Draw_Stage();
    //パス開始
    ctx.beginPath();
    //透明度を設定
    ctx.globalAlpha = 0.4;
    //色を設定
    ctx.fillStyle = "#00C12B";
    
    for(var i = -200;i<200;i+=10){
        var t2 = (radian+i)*Math.PI/180;
        var y2 = 150*Math.sin(t2);
        
        ctx.arc(X + i,Y-y2, radius, 0, Math.PI*2, false);
        ctx.fillRect(X + i - radius/2,Y,radius,-y2);
        //描画
        ctx.fill();
    }
   
    //角度を増やす
    radian = radian + SPEED;
    //各値を更新
    t = radian*Math.PI/180;

    setTimeout("Draw_Sin()",10);
}

window.onload = function(){
    Draw_Sin();
    Draw_Stage();
};