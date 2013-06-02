/*-----------------------------------
    グローバル変数
-----------------------------------*/
//読み込む元の画像
var IMAGE_URL = "http://jsrun.it/assets/k/Y/x/I/kYxIy.png";
var WIDTH;
var HEIGHT;
var img;
var canvas;
var ctx;
var imgW,imgH;
var BLOCK_SIZE;
var imgW,imgH;
var cnt = 1;
/*-----------------------------------
    8bit風の文字
-----------------------------------*/
var BIT_C = ["","■","■","■","■","■","■","■",
            "■","■","■","■","■","■","■","■",
            "■","■","■","","","","","",
            "■","■","■","","","","","",
            "■","■","■","","","","","",
            "■","■","■","","","","","",
            "■","■","■","■","■","■","■","■",
            "","■","■","■","■","■","■","■"];

var BIT_R = ["■","■","■","■","■","■","■","",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","■","■","■","■","",
            "■","■","■","■","■","■","■","",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■"];

var BIT_A = ["","■","■","■","■","■","■","",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","■","■","■","■","■",
            "■","■","■","■","■","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■"];

var BIT_Z = ["■","■","■","■","■","■","■","■",
            "■","■","■","■","■","■","■","■",
            "","","","","","■","■","■",
            "","","","","","■","■","■",
            "","■","■","■","■","■","■","■",
            "■","■","■","■","■","■","■","",
            "■","■","■","","","","","",
            "■","■","■","■","■","■","■","■"];

var BIT_Y = ["■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","■","■","■","■","■",
            "","■","■","■","■","■","■","",
            "","","■","■","■","■","","",
            "","","■","■","■","■","","",
            "","","■","■","■","■","",""];

var BIT_L = ["■","■","■","■","","","","",
            "■","■","■","■","","","","",
            "■","■","■","■","","","","",
            "■","■","■","■","","","","",
            "■","■","■","■","","","","",
            "■","■","■","■","","","","",
            "■","■","■","■","■","■","■","■",
            "■","■","■","■","■","■","■","■"];

var BIT_O = ["","■","■","■","■","■","■","",
            "■","■","■","■","■","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","■","■","■","■","■",
            "","■","■","■","■","■","■",""];

var BIT_K = ["■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","■","■","■","■","",
            "■","■","■","■","■","■","■","",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■",
            "■","■","■","","","■","■","■"];


var MESSAGE = [BIT_C,BIT_R,BIT_A,BIT_Z,BIT_Y,
               BIT_C,BIT_L,BIT_O,BIT_C,BIT_K];

/*-----------------------------------
    メイン関数
-----------------------------------*/
function init(){
     //Canvasの設定
    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
    //Canvasの大きさ
    canvas.width = WIDTH = window.innerWidth;
    canvas.height = HEIGHT = window.innerHeight;

    //ブロックのサイズ
    BLOCK_SIZE = WIDTH / 6;
    
    //イメージオブジェクト生成
    img = new Image();
    //読み込み完了後、実行
    img.onload = function(){
        imgW = this.width;
        imgH = this.height;
        
        setInterval ("Loop()",65);
    };
    //画像読み込み
    img.src = IMAGE_URL;
}

function Loop(){
    //Canvasを初期化
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    //背景色
    ctx.fillStyle = "#0091BE";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    Draw_Text();
    Count_Time();
}
/*-----------------------------------
    文字を描画する関数
-----------------------------------*/
function Draw_Text(){
    //8bitに分けたサイズ    
    var BIT_SIZE = BLOCK_SIZE/8;
    //横マージン
    var MARGIN_X = BIT_SIZE;
    if(cnt%100!=0){
        cnt ++;
        BIT_SIZE = BLOCK_SIZE/8*cnt/100;
    }
    for(var i = 0;i<MESSAGE.length;i++){
        for(var h = 0;h<MESSAGE[i].length/8;h++){
            for(var w = 0;w<MESSAGE[i].length/8;w++){
                if(MESSAGE[i][h*8+w] == "■"){
                    ctx.fillStyle = "#222";
                    if(i < 5){
                        //上段の文字
                        ctx.fillRect((BLOCK_SIZE+ MARGIN_X)*i + BIT_SIZE*w,BIT_SIZE*h,BIT_SIZE,BIT_SIZE);
                        ctx.drawImage(img, 0,0,imgW,imgH,(BLOCK_SIZE+ MARGIN_X)*i + BIT_SIZE*w,BIT_SIZE*h,BIT_SIZE,BIT_SIZE);
                    }else{
                        //下段の文字
                        ctx.fillRect((BLOCK_SIZE+ MARGIN_X)*(i-5) + BIT_SIZE*w,BLOCK_SIZE*2 + BIT_SIZE*h,BIT_SIZE,BIT_SIZE);
                        ctx.drawImage(img, 0,0,imgW,imgH,(BLOCK_SIZE+ MARGIN_X)*(i-5) + BIT_SIZE*w,BLOCK_SIZE*2 + BIT_SIZE*h,BIT_SIZE,BIT_SIZE);
                    }
                }
            }
        }
    }
}
/*-----------------------------------
    時間を計測する関数
-----------------------------------*/
function Count_Time(){
    now = new Date();
    
    //時間
    h = now.getHours();
    //十の位
    h1 = (h / 10) | 0;
    //一の位
    h2 = h - h1 * 10;
    //分
    mi = now.getMinutes();
    mi1 = (mi / 10) | 0;
    mi2 = mi - mi1 * 10;
    //秒
    s = now.getSeconds();
    s1 = (s / 10) | 0;
    s2 = s - s1 * 10;

    Draw_Time(h1,h2,mi1,mi2,s1,s2);
}

/*-----------------------------------
    時間を描画する関数
-----------------------------------*/
function Draw_Time(h1,h2,mi1,mi2,s1,s2){
    //記号の色
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";

    var POSITION_Y = 2;
    var time = "";
    var COMMA_SIZE = BLOCK_SIZE/8;
    //各エリアのX座標の位置
    var p1 = BLOCK_SIZE*(3/16);
    var p2 = BLOCK_SIZE*(3/8);
    var p3 = BLOCK_SIZE*(5/8);
    var p4 = BLOCK_SIZE*(13/16);
    //記号のサイズ
    var SIGN_SIZE = BLOCK_SIZE/4;
    
    ctx.lineWidth = SIGN_SIZE/4;

    for(var i = 0;i<6;i++){
        //時間、分、秒の選定
        switch(i){
            case 0:time = h1;break;
            case 1:time = h2;break;
            case 2:time = mi1;break;
            case 3:time = mi2;break;
            case 4:time = s1;break;
            case 5:time = s2;break;
        }
        /*
        0~9を5だけで表現する
        1:5/5
        2:1/.5
        3:5 - 1/.5
        4:5 - 5/5
        5:5
        6:5 + 5/5
        7:5 + 1/.5
        8:5+5-1/.5
        9:5+5-5/5
        0:5 % 5
        */
        switch(time){
            case 1:
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),BLOCK_SIZE/2,BLOCK_SIZE/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2,BLOCK_SIZE/2,BLOCK_SIZE/2);
                
                //斜線
                ctx.beginPath();

                ctx.moveTo(BLOCK_SIZE*i + p2/8,BLOCK_SIZE*POSITION_Y - p2/8);
                ctx.lineTo(BLOCK_SIZE*(i+1) - p2/8,BLOCK_SIZE*(POSITION_Y-1) + p2/8);
                ctx.stroke();
                ctx.closePath();
                break;
            case 2://5/5 / .5
                /*~~~~~~~~~~~~~~~~上エリア~~~~~~~~~~~~~~~~*/
                //左の「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                //中央「/」
                ctx.beginPath();
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p2 - p2/8);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p2/8);
                ctx.stroke();
                ctx.closePath();
                //右の「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                
                /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「/」
                ctx.beginPath();
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p3);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p2);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~下エリア~~~~~~~~~~~~~~~~*/
                //右下画像「.5」
                ctx.fillRect(BLOCK_SIZE*i + p3 - COMMA_SIZE/2,BLOCK_SIZE*POSITION_Y - COMMA_SIZE/2,COMMA_SIZE/2,COMMA_SIZE/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                break;
            case 3://5 - 1/.5
                /*~~~~~~~~~~~~~~~~上エリア~~~~~~~~~~~~~~~~*/
                //左の「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                 /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「-」
                ctx.beginPath();
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~下エリア~~~~~~~~~~~~~~~~*/
                //下「1/.5」
                //左「1」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1) + p3,p2/2,p2/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p1,BLOCK_SIZE*(POSITION_Y-1) + p4,p2/2,p2/2);
                
                //斜線
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(BLOCK_SIZE*i,BLOCK_SIZE*POSITION_Y-1);
                ctx.lineTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p3);
                ctx.stroke();
                ctx.closePath();

                //中央斜線
                ctx.beginPath();
                ctx.lineWidth = SIGN_SIZE/4;
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*POSITION_Y - p2/8);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3 + p2/8);
                ctx.stroke();
                ctx.closePath();
                
                //右下画像「.5」
                ctx.fillRect(BLOCK_SIZE*i + p3 - COMMA_SIZE/2,BLOCK_SIZE*POSITION_Y - COMMA_SIZE/2,COMMA_SIZE/2,COMMA_SIZE/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                
                break;
            case 4://5 - 5/5
                /*~~~~~~~~~~~~~~~~左上エリア~~~~~~~~~~~~~~~~*/
                //左上画像「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                
                 /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「-」
                ctx.beginPath();
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~下エリア~~~~~~~~~~~~~~~~*/
                //下「5/5」
                //左「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);

                //中央斜線
                ctx.beginPath();
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*POSITION_Y - p2/8);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3 + p2/8);
                ctx.stroke();
                ctx.closePath();
                
                //右下画像「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                
                break;
            case 5:
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),BLOCK_SIZE,BLOCK_SIZE);
                break;
            case 6://5 + 5/5
                /*~~~~~~~~~~~~~~~~左上エリア~~~~~~~~~~~~~~~~*/
                //左上画像「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                
                /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「+」
                ctx.beginPath();
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                //縦線
                ctx.moveTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p2);
                ctx.lineTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p3);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~下エリア~~~~~~~~~~~~~~~~*/
                //下「5/5」
                //左「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                //中央斜線
                ctx.beginPath();
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*POSITION_Y - p2/8);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3 + p2/8);
                ctx.stroke();
                ctx.closePath();
                
                //右下画像「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                
                break;
            case 7://5 + 1/.5
                /*~~~~~~~~~~~~~~~~左上エリア~~~~~~~~~~~~~~~~*/
                //左上画像「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                
                /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「+」
                ctx.beginPath();
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                //縦線
                ctx.moveTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p2);
                ctx.lineTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p3);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~下エリア~~~~~~~~~~~~~~~~*/
                //下「1/.5」
                
                //左「1」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1) + p3,p2/2,p2/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p1,BLOCK_SIZE*(POSITION_Y-1) + p4,p2/2,p2/2);
                
                //斜線
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(BLOCK_SIZE*i,BLOCK_SIZE*POSITION_Y-1);
                ctx.lineTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p3);
                ctx.stroke();
                ctx.closePath();

                //中央斜線
                ctx.beginPath();
                ctx.lineWidth = SIGN_SIZE/4;
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*POSITION_Y - p2/8);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3 + p2/8);
                ctx.stroke();
                ctx.closePath();
                
                //右下画像「.5」
                ctx.fillRect(BLOCK_SIZE*i + p3 - COMMA_SIZE/2,BLOCK_SIZE*POSITION_Y - COMMA_SIZE/2,COMMA_SIZE/2,COMMA_SIZE/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                
                break;
            case 8://5 + 5 -1/.5
                /*~~~~~~~~~~~~~~~~上エリア~~~~~~~~~~~~~~~~*/
                //左の「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                //中央「+」
                ctx.beginPath();
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p2/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p2/2);
                //縦線
                ctx.moveTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p2/8);
                ctx.lineTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p2 - p2/8);
                ctx.stroke();
                ctx.closePath();
                //右の「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                
                /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「-」
                ctx.beginPath();
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~下エリア~~~~~~~~~~~~~~~~*/
                //下「1/.5」
                //左「1」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1) + p3,p2/2,p2/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p1,BLOCK_SIZE*(POSITION_Y-1) + p4,p2/2,p2/2);
                
                //斜線
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(BLOCK_SIZE*i,BLOCK_SIZE*POSITION_Y-1);
                ctx.lineTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p3);
                ctx.stroke();
                ctx.closePath();

                //中央斜線
                ctx.beginPath();
                ctx.lineWidth = SIGN_SIZE/4;
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*POSITION_Y - p2/8);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3 + p2/8);
                ctx.stroke();
                ctx.closePath();
                
                //右下画像「.5」
                ctx.fillRect(BLOCK_SIZE*i + p3 - COMMA_SIZE/2,BLOCK_SIZE*POSITION_Y - COMMA_SIZE/2,COMMA_SIZE/2,COMMA_SIZE/2);
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                
                break;
            case 9://5 + 5 -5/5
                /*~~~~~~~~~~~~~~~~上エリア~~~~~~~~~~~~~~~~*/
                //左の「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                //中央「+」
                ctx.beginPath();
                ctx.lineWidth = SIGN_SIZE/4;
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p2/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p2/2);
                //縦線
                ctx.moveTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p2/8);
                ctx.lineTo(BLOCK_SIZE*i + BLOCK_SIZE/2,BLOCK_SIZE*(POSITION_Y-1) + p2 - p2/8);
                ctx.stroke();
                ctx.closePath();
                //右の「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                
                /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「-」
                ctx.beginPath();
                ctx.lineWidth = SIGN_SIZE/4;
                //横線
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + BLOCK_SIZE/2);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~下エリア~~~~~~~~~~~~~~~~*/
                //下「5/5」
                
                //左「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);

                //中央斜線
                ctx.beginPath();
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*POSITION_Y - p2/8);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3 + p2/8);
                ctx.stroke();
                ctx.closePath();
                
                //右下画像「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
                
                break;
            case 0://5 % 5
                /*~~~~~~~~~~~~~~~~左上エリア~~~~~~~~~~~~~~~~*/
                //左上画像「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i,BLOCK_SIZE*(POSITION_Y-1),p2,p2);
                
                /*~~~~~~~~~~~~~~~~中央エリア~~~~~~~~~~~~~~~~*/
                //中央「%」
                ctx.beginPath();
                ctx.lineWidth = SIGN_SIZE/4;
                //左上の○
                ctx.arc(BLOCK_SIZE*i + p2 + SIGN_SIZE/4, BLOCK_SIZE*(POSITION_Y-1) + p2 + SIGN_SIZE/4, SIGN_SIZE/4, 0, 360 * Math.PI / 180, false);
                ctx.stroke();
                ctx.closePath();
                
                //斜線
                ctx.beginPath();
                ctx.moveTo(BLOCK_SIZE*i + p2,BLOCK_SIZE*(POSITION_Y-1) + p3);
                ctx.lineTo(BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p2);
                ctx.stroke();
                ctx.closePath();
                
                //右下の○
                ctx.beginPath();
                ctx.arc(BLOCK_SIZE*i + p3 - SIGN_SIZE/4, BLOCK_SIZE*(POSITION_Y-1) + p3 - SIGN_SIZE/4, SIGN_SIZE/4, 0, 360 * Math.PI / 180, false);
                ctx.stroke();
                ctx.closePath();
                /*~~~~~~~~~~~~~~~~右下エリア~~~~~~~~~~~~~~~~*/
                //右下「5」
                ctx.drawImage(img, 0,0,imgW,imgH,BLOCK_SIZE*i + p3,BLOCK_SIZE*(POSITION_Y-1) + p3,p2,p2);
   
                break;
            default:
                ctx.fillText(time, BLOCK_SIZE*i, BLOCK_SIZE*POSITION_Y);
                break;
        }        
    }
}
window.onload = function(){
	init();
};