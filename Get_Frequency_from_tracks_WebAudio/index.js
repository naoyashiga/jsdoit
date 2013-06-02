var defaultFilter = 10000;

var source;
var audioCtx;
var url;
var analyser;
var frequencyData;
var canvas;
var lowpass;
var highpass;

//キャンバス
var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");
var w = canvas.width = 950;
var h = canvas.height = 800;

//オーディオコンテキスト作成
audioCtx = new webkitAudioContext();
url = "http://jsrun.it/assets/k/m/v/T/kmvTS.mp3";

LoadSample(url);

//アナライザ作成	
analyser = audioCtx.createAnalyser();

//入力信号にフィルターをかけて出力(ローパスフィルタ)
lowpass = audioCtx.createBiquadFilter();
lowpass.type = 0;
lowpass.frequency.value = defaultFilter;
//入力信号にフィルターをかけて出力(ローパスフィルタ)
highpass = audioCtx.createBiquadFilter();
highpass.type = 1;
highpass.frequency.value = 10001 - defaultFilter;

function LoadSample(url){
	var bufferLoader = new BufferLoader(audioCtx,[url],function(bufferList){
		for(var i = 0;i < bufferList.length;i++){
			//音源からバッファを作成
			source = audioCtx.createBufferSource();
			//console.log(bufferList[i]);
			source.buffer = bufferList[i];
			//繰り返し再生
			source.loop = true;
			//ローパスフィルタを接続
			source.connect(lowpass);
			//ハイパスフィルタを接続
			lowpass.connect(highpass);
			//アナライザーを接続
			highpass.connect(analyser);
			//出力に接続
			analyser.connect(audioCtx.destination);	
		}
		//power on music
		source.noteOn(0);
	});
	bufferLoader.load();
}
	
$("#stop").click(function(){
	source.stop(0);
	source = null;

	$("#start").attr("disabled",false);
	$("#stop").attr("disabled",true);
});

$("#start").click(function(){
	LoadSample(url);

	$("#start").attr("disabled",true);
	$("#stop").attr("disabled",false);
});

function Loop(){
    ctx.clearRect(0,0,w,h);
	ctx.fillStyle = "#efefef";
	ctx.fillRect(0,0,w,h);

	//符号なし8bitArrayを生成
	var data = new Uint8Array(analyser.frequencyBinCount);
	//周波数データ
	analyser.getByteFrequencyData(data);

	//console.log(data);
	ctx.fillStyle = "#ccc";

	for(var i = 0; i < data.length; ++i) {
        ctx.fillRect(i, 256 - data[i], 1, data[i]);
    }
	//ループ
	requestAnimationFrame(Loop);
}
Loop();
