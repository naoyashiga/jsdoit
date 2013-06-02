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
canvas.setAttribute("height",480);
var ctx = canvas.getContext('2d');
//背景色
ctx.fillStyle = "#000";
//塗りつぶし
ctx.fillRect(0,0,canvas.width,canvas.height);

//表示する文字
var text = "The Beatles";
//文字の表示位置
var tX = 43;
var tY = 100;
//ぼかし
var blur = 0;
//文字のフォント
ctx.font = "50px 'Carter One'";
//文字色
ctx.fillStyle = "#FFF";

//ネオン加工
for(var i = 1;i<=8;i++){
  //ネオンの影
  if(i<5){
    blur = 10*i;
    ctx.shadowColor = "#FFF";
  }else if(i<7){
    blur = 70+10*(i-5);
    ctx.shadowColor = "#FF00DE";
  }else if(i==7){
    blur = 100;
    ctx.shadowColor = "#FF00DE";
  }else{
    blur = 150;
    ctx.shadowColor = "#FF00DE";
  }
  var width = ctx.measureText(text).width + blur * 5;

  ctx.textBaseline = "top";
  //影のずらす位置を設定
  ctx.shadowOffsetX = width;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = blur;
  //影の元になる文字はいらないので影だけをクリッピンパスで残す
  //クリッピングする範囲を指定
  ctx.rect(tX-20,tY-30,width+30, 140);
  ctx.clip();
  ctx.fillText(text,-width+tX,tY);
}
//一番上にあたる文字を描画
ctx.fillText(text,tX,tY);
