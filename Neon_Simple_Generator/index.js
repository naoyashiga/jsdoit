//WebFont
WebFontConfig = {
    google: { families: [ 'Carter+One::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

var canvas = document.getElementById('world');
//canvasの横幅を設定
canvas.setAttribute("width",480);
//canvasの縦幅を設定
canvas.setAttribute("height",280);
var ctx = canvas.getContext('2d');
//背景色
ctx.fillStyle = "#000";
//塗りつぶし
ctx.fillRect(0,0,canvas.width,canvas.height);

//文字の表示位置
var tX = 43;
var tY = 100;
//ぼかし
var blur;

//クリッピングパスの横幅
var width = 500;
//クリッピングパスの縦幅
var height = 500;


function Neon(){
    var SHADOW_COLOR = Color();
    var text = Word();
    var size = Font_Size();
    //文字のフォント
    ctx.font = size+"px 'Carter One'";
    //文字色
    ctx.fillStyle = "#FFF";
    //canvasを初期化
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //影の元になる文字はいらないので影だけをクリッピンパスで残す
    //クリッピングする範囲を指定
    ctx.rect(tX-20,tY-30,width, height);
    ctx.clip();
    //ネオン加工
    for(var i = 1;i<=8;i++){
        //ネオンの影
        if(i<5){
            blur = 10*i;
            ctx.shadowColor = "#FFF";
        }else if(i<7){
            blur = 70+10*(i-5);
            ctx.shadowColor = SHADOW_COLOR;
        }else if(i==7){
            blur = 100;
            ctx.shadowColor = SHADOW_COLOR;
        }else{
            blur = 150;
            ctx.shadowColor = SHADOW_COLOR;
        }
        
        ctx.textBaseline = "top";
        //影をクリッピングパスの外にずらす
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = height;
        ctx.shadowBlur = blur;
        
        //影を作る文字の描画
        ctx.fillText(text,tX,tY-height);
    }
    //一番上にあたる文字を描画
    ctx.fillText(text,tX,tY);
}

function Color(){
    var color = document.getElementById("color").value;
    
    return color;
}

function Word(){
    var word = document.getElementById("word").value;
    
    return word;
}

function Font_Size(){
    var size = document.getElementById("range").value;
    return size;
}

window.onload = function(){
    //デフォルトの文字を描画
    Neon();
};
