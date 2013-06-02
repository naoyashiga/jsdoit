var BLOCK_SIZE = 3;

var WIDTH;
var HEIGHT;

function init(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	WIDTH = canvas.width = window.innerWidth;
	HEIGHT = canvas.height = window.innerHeight;

	drawText(canvas,ctx,"【横須賀線　遅延】");

	Pixelization(canvas,ctx);

	GridLine(canvas,ctx);
}

function drawText(canvas,ctx,text){
	//clear Canvas
	ctx.clearRect(0,0,WIDTH,HEIGHT);

	ctx.fillStyle = "rgb(128,128,128)";
	ctx.font = "150px 'ＭＳ 明朝'";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(text,0,0);
}

//モザイク
function Pixelization(canvas,ctx){
	var i = 0,j = 0;
	var x = 0,y = 0,w = 0,h = 0;
	var tiles_w = WIDTH / BLOCK_SIZE;
	var tiles_h = HEIGHT / BLOCK_SIZE;
	var block_image;

	for(i = 0;i < tiles_w;i++){
		for(j = 0;j < tiles_h;j++){
			w = BLOCK_SIZE;
			h = BLOCK_SIZE;
			x = (i * w);
			y = (j * h);

			//ピクセルデータを取得
			block_image = ctx.getImageData(x,y,w,h);
			//rgbの平均値を取得
			rgb = getAvgRgb(block_image);

			ctx.fillStyle = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
			ctx.fillRect(x,y,w,h);
		}
	}
}

function getAvgRgb(block_image){
	var pixels = block_image.data;
	var r=0,g=0,b=0;
	var rgb;

	//ブロック内のピクセル平均を算出
	var len = pixels.length/4;
	for(var i = 0;i < len;i++){
		r += pixels[i*4];
		g += pixels[i*4 + 1];
		b += pixels[i*4 + 2];
	}

	r = parseInt(r/len,10);
	g = parseInt(g/len,10);
	b = parseInt(b/len,10);

	rgb = adjustBlightness(r,g,b);
	r = rgb[0];
	g = rgb[1];
	b = rgb[2];

	rgb = colorize(r,g,b);
	r = rgb[0];
	g = rgb[1];
	b = rgb[2];

	return [r,g,b];
}

/*-----------------------------------
    you can adjust blightness
-----------------------------------*/
function adjustBlightness(r,g,b){
	var threshold = 20;
	if((r > threshold) && (g > threshold) && (b > threshold)){
		r = r + 160;
		g = g + 160;
		b = b + 160;
	}else{
		r = r + 20;
		g = g + 20;
		b = b + 20;
	}

	//subtle brighter when LED turned off
	if((r === 0) && (g === 0) && (b === 0)){
		r = 40;
		g = 40;
		b = 40;
	}

	return [r,g,b];
}

/*-----------------------------------
    you can change RGB to Weighted Color
-----------------------------------*/
function colorize(r,g,b){
	//change color to orange(243,152,0)
	r = parseInt(r / 255 * 243,10);
	g = parseInt(g / 255 * 152,10);
	b = parseInt(b / 255 * 0,10);

	return [r,g,b];
}

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

window.onload = function(){
	init();
};