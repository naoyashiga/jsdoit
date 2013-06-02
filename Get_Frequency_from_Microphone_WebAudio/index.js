//Canvasの設定
var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

var audioContext = new webkitAudioContext();

//フィルター
filter = audioContext.createBiquadFilter();
filter.type = 0;
filter.frequency.value = 440;
//analyserオブジェクトの生成
var analyser = audioContext.createAnalyser();

init();
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
        //streamからAudioNodeを作成
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);

        mediaStreamSource.connect(filter);

        filter.connect(analyser);
        //出力Nodeのdestinationに接続
        analyser.connect(audioContext.destination);
        //mediaStreamSource.connect(audioContext.destination);

        Loop();
    }
    //マイクの有無を調べる
    if(navigator.webkitGetUserMedia){
        //マイク使って良いか聞いてくる
        navigator.webkitGetUserMedia(audioObj,gotStream,errBack);
    }else{
        console.log("マイクデバイスがありません");
    }
}


function Loop(){
    //Canvasをクリア
    ctx.clearRect(0,0,w,h);
    //背景色
    ctx.fillStyle = "#efefef";
    //背景描画
    ctx.fillRect(0,0,w,h);

    //符号なし8bitArrayを生成
    var data = new Uint8Array(analyser.frequencyBinCount);
    //周波数データ
    analyser.getByteFrequencyData(data);

    //周波数の色
    ctx.fillStyle = "#ccc";

    for(var i = 0; i < data.length; ++i) {
        //上部の描画
        ctx.fillRect(i*5, 0, 5, data[i]*2);
        //下部の描画
        ctx.fillRect(i*5, h, 5, -data[i]*2);
    }
    //ループ
    requestAnimationFrame(Loop);
}