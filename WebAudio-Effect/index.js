var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");
var w = canvas.width = 950;
var h = canvas.height = 800;

//バッファの長さ
var buflen = 1024;

var buf = new Uint8Array(buflen);

var audioContext = new webkitAudioContext();

filter = audioContext.createBiquadFilter();
filter.type = 0;
filter.frequency.value = 440;

//analyserオブジェクトの生成
var analyser = audioContext.createAnalyser();

function render(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,w,h);
    var length = buf.length;
    var bar_spacing = 5;
    var bar_h = 5;
    
    var startAngle = 0;
    var endAngle = 360 * Math.PI / 180;

    var j = 0;
    for(var i = 0;i < length;++i){
        var scaled_buf = (buf[i] / 256) * h;
        var v = (buf[i] - buf[0])*10;

        var r = 255 - (buf[i] - buf[0])*30;
        var g = 255 - (buf[i] - buf[0])*10;
        var b = 255 -(buf[i] - buf[0])*12;
        ctx.fillStyle = "rgb("+r+","+g+","+b+")";

        var radius = buf[i]%10;
        //ctx.fillRect(i,h - scaled_buf + 2,-bar_spacing,-1);
        //ctx.fillRect(i/2,h - v,-bar_spacing,-bar_h);
        if(i%30==0){j++;}


        ctx.beginPath();
        ctx.arc(40*(i%30), 40*j, radius*2, startAngle, endAngle, false);
        ctx.stroke();
        ctx.fill();
    }
    
    
    
    //console.log(radius);
/*
    for(var i = 0;i<10;i++){
        for(var j = 0;j<10;j++){
            ctx.beginPath();
            ctx.arc(40*i, 40*j, radius, startAngle, endAngle, false);
            ctx.stroke();
            ctx.fill();
        }
    }
    */
    
    
}

function loop(){
    //音データをバッファに格納
    analyser.getByteTimeDomainData(buf);
    //Canvasに描画
    render();
    //console.log(buf);
    //繰り返し関数を実行
    webkitRequestAnimationFrame(loop);
}

/*-----------------------------------
    メイン関数
-----------------------------------*/
function init(){  
    var audioObj = {"audio":true};

    //エラー処理
    var errBack = function(e){
        console.log("Web Audio error:",e.code);
    };
    
    //WebAudioリクエスト成功時に呼び出されるコールバック関数
    function gotStream(stream){
        //var audioContext = new webkitAudioContext();

        //streamからAudioNodeを作成
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);

        mediaStreamSource.connect(filter);

        filter.connect(analyser);
        //出力Nodeのdestinationに接続
        analyser.connect(audioContext.destination);
        //mediaStreamSource.connect(audioContext.destination);

        loop();
    }
    //マイクの有無を調べる
    if(navigator.webkitGetUserMedia){
        //マイク使って良いか聞いてくる
        navigator.webkitGetUserMedia(audioObj,gotStream,errBack);
    }else{
        console.log("マイクデバイスがありません");
    }
}


window.onload = function(){
    //メイン関数
    init();
};