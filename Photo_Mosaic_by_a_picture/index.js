/*-----------------------------------
    グローバル変数
-----------------------------------*/
//読み込む元の画像
var IMAGE_URL = "http://jsrun.it/assets/3/O/z/V/3OzVQ.jpg";
//モザイクに使用する画像
var MOSAIC_IMG_URL = "http://jsrun.it/assets/w/N/g/Q/wNgQT.png";
//モザイクのサイズ
var BLOCK_SIZE = 10;
var WIDTH;
var HEIGHT;
var rgb = [];
/*-----------------------------------
    メイン関数
-----------------------------------*/
function init(){  
    $("#btn").click(function(){
        //イメージオブジェクト生成
        var img = new Image();
        //読み込み完了後、実行
        img.onload = function(){
            for(var i = 0;i < WIDTH / BLOCK_SIZE;i++){
                for(var j = 0;j < HEIGHT / BLOCK_SIZE;j++){
                    ctx.drawImage(img, BLOCK_SIZE * i, BLOCK_SIZE * j,BLOCK_SIZE,BLOCK_SIZE);
                }
            }
            Pixelization(canvas,ctx,"mosaic");
        };
        img.src = MOSAIC_IMG_URL;
    });
    
    $("#reset").click(function(){
        //リセット
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,WIDTH,HEIGHT);
    });
    
	//モザイク用のCanvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    WIDTH = canvas.width = window.innerWidth / 2;
	HEIGHT = canvas.height = window.innerHeight / 2;
    //背景色を設定
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    //元画像用のCanvas
    var canvas2 = document.getElementById("canvas2");
	var ctx2 = canvas2.getContext("2d");
	canvas2.width = WIDTH;
    canvas2.height = HEIGHT;
    
    //イメージオブジェクト生成
    var original_img = new Image();
    //読み込み完了後、実行
    original_img.onload = function(){
        //画像を描画
        ctx2.drawImage(this, 0, 0,canvas2.width,canvas2.height);
        //モザイク処理後、RGB平均値を算出
        Pixelization(canvas2,ctx2,"original");
    };
    //画像読み込み
    original_img.src = IMAGE_URL;
}

/*-----------------------------------
    モザイク処理
-----------------------------------*/
function Pixelization(canvas,ctx,str){
	var i = 0,j = 0;
	var x = 0,y = 0,w = 0,h = 0;
	var tiles_w = WIDTH / BLOCK_SIZE;
	var tiles_h = HEIGHT / BLOCK_SIZE;
	var block_image;
    var indexCnt = 0;

	for(i = 0;i < tiles_w;i++){
		for(j = 0;j < tiles_h;j++){
			w = BLOCK_SIZE;
			h = BLOCK_SIZE;
			x = (i * w);
			y = (j * h);
			//ピクセルデータを取得
			block_image = ctx.getImageData(x,y,w,h);
            
            if(str == "original"){
                //rgbの平均値を取得
                rgb.push(getAvgRgb(block_image));
            }else{
                //カウント増加
                indexCnt++;
                //元画像のRGB平均
                var mosaic_red = rgb[indexCnt][0];
                var mosaic_green = rgb[indexCnt][1];
                var mosaic_blue = rgb[indexCnt][2];
                
                var pixels = block_image.data;
                var len = pixels.length/4;

                //元画像のRGBを使って重み付け
                for(var k = 0;k < len;k++){
                    pixels[k*4] = (pixels[k*4] / 255) * mosaic_red;
                    pixels[k*4 + 1] = (pixels[k*4 + 1] / 255) * mosaic_green;
                    pixels[k*4 + 2] = (pixels[k*4 + 2] / 255) * mosaic_blue;
                }
                //ピクセルデータを更新
                ctx.putImageData(block_image,x,y);
            }
		}
	}
}
/*-----------------------------------
    RGB平均を算出
-----------------------------------*/
function getAvgRgb(block_image){
	var pixels = block_image.data;
	var r=0,g=0,b=0;
	var rgb;

	var len = pixels.length/4;
	for(var i = 0;i < len;i++){
		r += pixels[i*4];
		g += pixels[i*4 + 1];
		b += pixels[i*4 + 2];
	}

	r = parseInt(r/len,10);
	g = parseInt(g/len,10);
	b = parseInt(b/len,10);

	return [r,g,b];
}

window.onload = function(){
	init();
};