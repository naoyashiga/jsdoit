var canvas = document.getElementById("world");
//canvasの横幅を設定
canvas.setAttribute("width",480);
//canvasの縦幅を設定
canvas.setAttribute("height",480);
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;



/*-----------------------------------
	初期画面の描画
-----------------------------------*/
//水滴の幅
var w = 100;
//高さ1/3
var h = height/3;
//始点
var startX = 0;
var startY = h;
//制御点1
var cp1x = startX - w;
var cp1y = h;
//終点
var endX = -startX + width;
var endY = startY;
//制御点2
var cp2x = endX + w;
var cp2y = h;

ctx.fillStyle = "#3cbdc9";
ctx.strokeStyle = "#3cbdc9";
//上部の四角を塗りつぶす
ctx.fillRect(0,0,width,height/3);

ctx.beginPath();
//始点に移動
ctx.moveTo(startX,startY);
//ベジェ曲線
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,endX,endY);
//塗りつぶし
ctx.fill();
//描画
ctx.stroke();


//Y座標を保持する変数
var y = 0;
/*-----------------------------------
	水滴生成メソッド
-----------------------------------*/
function CreateWaterDrop(){
    //Y座標を増やす
    y+=2;
    
    //水滴の落ちる位置
    var divide = 1/2;
    var waterX = width*divide;
    
    //水滴が完成
    if(y >= h){
        //始点,終点のY座標を増やす
        startY = endY = y;
        //制御点1と2のY座標を増やす
        cp1y = cp2y = y + w;
        
    }
    else{ //水滴が未完成
        //始点X座標を左から右へ移動
        startX = (waterX/h)*y;
        //終点Y座標を右から左へ移動
        endX = width - (1- divide)*width/h*y;
        //制御点1と2のY座標を増やす
        cp1y = cp2y = h + (w/h)*y;
    }

    //制御点1と2
    cp1x = waterX - w - Math.random()*20;
    cp2x = waterX + w + Math.random()*20;
    
        
    ctx.beginPath();
    //始点に移動
    ctx.moveTo(startX,startY);
    //ベジェ曲線
    ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,endX,endY);    
    //canvasを初期化
    ctx.clearRect(0,0,width,height);
    //塗りつぶし
    ctx.fill();
    //描画
    ctx.stroke();
    
    
    if(y >= h){
    	ctx.fillRect(0,0,width,h);
    }else{
        //青い四角をぷるぷるさせる
        ctx.fillRect(0,0,width,h + Math.random()*3);
    }
    
    //水滴が消えるまでループ
    if(startY<height){
        setTimeout("CreateWaterDrop()",1);
    }
}

function Draw(){
    if(startY>=height){
        //始点
        startX = 0;
        startY = h;
        //制御点1
        cp1x = startX - w;
        cp1y = h;
        //終点
        endX = -startX + width;
        endY = startY;
        //制御点2
        cp2x = endX + w;
        cp2y = h;
        y=0;
        CreateWaterDrop();
    }
    
    setTimeout("Draw()",100);
}
window.onload = function(){
    //最初の水滴
    CreateWaterDrop();
    Draw();
};

