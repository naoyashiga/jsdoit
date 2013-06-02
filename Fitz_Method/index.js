var canvas = document.getElementById("world");
//canvasの横幅を設定
var w = canvas.width = 400;
//canvasの縦幅を設定
var h = canvas.height = 400;

var ctx = canvas.getContext("2d");

//背景描画
ctx.fillStyle = "#111";
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
ctx.fillStyle = "#FF0";
ctx.fillRect(w/2,h/2,1,1);


/*-------上の四角-------*/
ctx.fillStyle = "#666";
//大きさ
var width = 10;
//原点からの距離
var dir = 20;
//四角を描画
ctx.fillRect(w/2 - width/2,h/2 - dir,width,width);

//到達時間を求める
var t = Fitts(dir,width);

/*-------下の四角-------*/
//距離を設定
var dir_bottom = dir*2;
//大きさを求める
width = Check_W(dir_bottom,t);
//四角を描画
ctx.fillRect(w/2 - width/2,h/2 + 1 + dir_bottom,width,width);


/*-------右の四角-------*/
//距離を設定
var dir_right = dir*4;
//大きさを求める
width = Check_W(dir_right,t);
//四角を描画
ctx.fillRect(w/2 + 1 + dir_right,h/2 - width/2,width,width);

/*-------左の四角-------*/
//距離を設定
var dir_left = dir*8;
//大きさを求める
width = Check_W(dir_left,t);
//四角を描画
ctx.fillRect(w/2 + 1 - dir_left - width,h/2 - width/2,width,width);


/*-----------------------------------
    カーソル位置からターゲットまでの時間を計算
-----------------------------------*/
function Fitts(A,W){
    //ユーザの熟練度によって変わる操作効率
    var a = 50;
    var b = 150;
    
    //A:カーソルとターゲットまでの距離
    //W:ターゲットの画面上の大きさ(タテヨコの小さいほう)
    var t = a + b * Math.LOG2E * Math.log(A/W + 1);
    return t;
}

/*-----------------------------------
    ターゲットの大きさを決める
-----------------------------------*/
function Check_W(A,t){
    //ユーザの熟練度によって変わる操作効率
    var a = 50;
    var b = 150;

    var c = Math.pow(2,(t - a)/b) - 1;
    W = A / c;
    
    return W;
}