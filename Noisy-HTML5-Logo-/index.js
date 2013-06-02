/*-----------------------------------
    グローバル変数
-----------------------------------*/
//読み込む元の画像
var IMAGE_URL = "http://jsrun.it/assets/k/Y/x/I/kYxIy.png";
//var IMAGE_URL = "http://jsrun.it/assets/3/O/z/V/3OzVQ.jpg";
var WIDTH,HEIGHT,img,canvas,ctx,imgW,imgH,
    MOUSE_X,MOUSE_y,MARGIN_X,RATIO,pieceH = 0.8,rnd;

/*-----------------------------------
    メイン関数
-----------------------------------*/
function init(){
    //Canvasの設定
    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
    //Canvasの大きさ
    canvas.width = WIDTH = window.innerWidth;
    canvas.height = HEIGHT = window.innerHeight * (2 / 3);
    //Canvasの配置
    $("#canvas").css("top",window.innerHeight*(1/6));
    $("#canvas").css("left",0);
    
    //イメージオブジェクト生成
    img = new Image();
    //読み込み完了後、実行
    img.onload = function(){
        imgW = this.width;
        imgH = this.height;
        MARGIN_X = (WIDTH - HEIGHT)*0.5;
        RATIO = HEIGHT / imgH;
        ctx.drawImage(img, 0,0,imgW,imgH,MARGIN_X,0,HEIGHT,HEIGHT);
    };
    //画像読み込み
    img.src = IMAGE_URL;
}

$("#canvas").mousemove(function(e){
    //Canvas内のマウスポインタの絶対Y座標
    MOUSE_Y = e.pageY - e.target.offsetTop;
    //Canvasの中にポインタが入っている時だけ描画
    if(MOUSE_Y >= 0 && MOUSE_Y <= HEIGHT){
        //マウスポインタのX座標
        MOUSE_X = e.pageX - MARGIN_X;
        //画像の外側
        if(MOUSE_X <= 0 || MOUSE_X > HEIGHT){MOUSE_X = 0;}
        //画像の右半分
        else if(MOUSE_X >= HEIGHT / 2 && MOUSE_X <= HEIGHT){MOUSE_X = HEIGHT - MOUSE_X;}
        
        Draw();
    }
});

function Draw(){
    //Canvas初期化
    ctx.clearRect(0,0,WIDTH,HEIGHT);

    for(var i = 0;i < imgH/pieceH;i+=pieceH){
        rnd = Math.random();
        ctx.drawImage(img, 0,i,imgW - rnd * MOUSE_X,pieceH,
                      MARGIN_X + rnd*MOUSE_X*RATIO,i*RATIO,HEIGHT,pieceH*RATIO);
    }
}
window.onload = function(){
	init();
};