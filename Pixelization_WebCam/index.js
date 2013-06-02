/*-----------------------------------
	モザイク処理
-----------------------------------*/
function Pixelization(ctx,height,width){
    //モザイクのサイズ
    var size = 20;
    var w,h;
    for(var y = 0;y<height;y+=size){
        console.log(y);
        if(size <= height - y){
            h = size;
        }else{//size*sizeの範囲がうまくとれないとき
            h = height - y;
        }
        for(var x = 0;x<width;x+=size){
            if(size <= width - x){
                w = size;
            }else{//size*sizeの範囲がうまくとれないとき
                w = width - x;
            }           
            //RGBを初期化
			var r = 0;
			var g = 0;
			var b = 0;
            
            //size*sizeの範囲のイメージオブジェクトを取得
            var imageData = ctx.getImageData(x,y,w,h);
            //RGBA の順番のデータを含んだ 1 次元配列data
            var data = imageData.data;
            
            for(var i = 0;i<data.length;i+=4){
                r += data[i];
                g += data[i+1];
                b += data[i+2];
            }
            
            var cnt = data.length/4;
            r = Math.floor(r/cnt);
            g = Math.floor(g/cnt);
            b = Math.floor(b/cnt);
            
            //canvasを透明にする
            ctx.clearRect(x,y,w,h);
            //平均色をセット
            ctx.fillStyle = "rgb("+r+","+g+","+b+")";
            //canvasを塗る
            ctx.fillRect(x,y,w,h);
            //パスをリセット
            ctx.beginPath();
            //線の太さの指定
            ctx.lineWidth = 5;
            //下枠の描画
            ctx.moveTo(x+w/5, y+h);
            ctx.lineTo(x+w, y+h);
            ctx.stroke();
            //上枠の描画
            ctx.moveTo(x+w, y+h/5);
            ctx.lineTo(x+w, y+h);
            ctx.stroke();
        }
    }
}

/*-----------------------------------
	ビデオフレームを描画
-----------------------------------*/
function cap(){
    var canvas = document.getElementById("world");
    canvas.setAttribute("width",480);
    canvas.setAttribute("height",360);
    var ctx = canvas.getContext("2d"); 
      
    var video = document.getElementById("video");
    video.setAttribute("width",480);
    video.setAttribute("height",360);
    
    //ビデオフレームを描画
    ctx.drawImage(video,0,0,canvas.width,canvas.height);
    
    //画像の横幅
    var w = 480;
    //画像の縦幅
    var h = 360;
    
    //canvas の指定の矩形に対するイメージを含んだ ImageData オブジェクトを返す
    var imageData = ctx.getImageData(0,0,w,h);
    //RGBA の順番のデータを含んだ 1 次元配列data
    var data = imageData.data;
        
    //モザイク処理
    Pixelization(ctx,h,w);
    
    //ループ
    setTimeout("cap()",100);
}


/*-----------------------------------
	メイン関数
-----------------------------------*/
function init(){  
    var videoObj = {"video":true};
    var errBack = function(e){
        console.log("Video capture error:",e.code);
    };
    
    //Webカメラの有無を調べる
    if(navigator.getUserMedia){
        navigator.getUserMedia(videoObj,function(stream){
            video.src = stream;
            video.play();
        },errBack);
    }else if(navigator.webkitGetUserMedia){
        navigator.webkitGetUserMedia(videoObj,function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        },errBack);
    }
    /*
    var video = document.getElementById("video");
    video.setAttribute("width",480);
    video.setAttribute("height",360);
    */
    cap();
    
    document.getElementById("mosaic").addEventListener("click",function(){
        document.getElementById("world").style.cssText ="display:block;";
        cap();
        
	});
    
    document.getElementById("default").addEventListener("click",function(){
        document.getElementById("world").style.cssText ="display:none;";
	});
}


window.onload = function(){
    init();
};