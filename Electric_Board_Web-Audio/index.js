var defaultFilter = 10000;

var source;
var audioCtx;
var url;
var analyser;
var frequencyData;
var canvas;
var lowpass;
var highpass;

var BLOCK_SIZE = 3;

//キャンバス
var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");

var WIDTH;
var HEIGHT;

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

function GridLine(canvas,ctx){
	var i = 0,j = 0;
	var x = 0,y = 0,w = 0,h = 0;
	var tiles_w = WIDTH / BLOCK_SIZE;
	var tiles_h = HEIGHT / BLOCK_SIZE;

	ctx.beginPath();
	ctx.lineWidth = 0.9;

	//vertical line
	for(i = 0;i < tiles_w + 1;i++){
		w = BLOCK_SIZE;
		x = i * w;

		ctx.moveTo(x,0);
		ctx.lineTo(x,HEIGHT);
	}

	//horizontal line
	for(j = 0;j < tiles_h + 1;j++){
		h = BLOCK_SIZE;
		y = j * h;

		ctx.moveTo(0,y);
		ctx.lineTo(WIDTH,y);
	}

	ctx.stroke();
}

function Loop(){
    WIDTH = canvas.width = window.innerWidth;
    HEIGHT = canvas.height = window.innerHeight - $("#world").offset().top;
    
    ctx.clearRect(0,0,WIDTH,HEIGHT);
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,WIDTH,HEIGHT);

	//符号なし8bitArrayを生成
	var data = new Uint8Array(analyser.frequencyBinCount);
	//周波数データ
	analyser.getByteFrequencyData(data);

	//console.log(data);
	ctx.fillStyle = "rgb(243,152,0)";

    var line_W = 5;
	for(var i = 0; i < data.length; i++) {
        ctx.fillRect(line_W*i, HEIGHT, 5, -data[i] * 1.3);
    }
    
    
    GridLine(canvas,ctx);
	//ループ
	requestAnimationFrame(Loop);
}
Loop();
