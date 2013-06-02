//読み込む元の画像
var IMAGE = "http://jsrun.it/assets/i/9/z/b/i9zbi.jpg";

window.onload = function(){    
    function drawImage(imageObj){
        var canvas = document.getElementById("world");
        //canvasの横幅を設定
        canvas.setAttribute("width",imageObj.width);
        //canvasの縦幅を設定
        canvas.setAttribute("height",imageObj.height);
    
        var ctx = canvas.getContext("2d");
        var x = 0;
        var y = 0;
        
        //canvas上に画像を表示
        ctx.drawImage(imageObj,x,y);
    }
    
    var imageObj = new Image();
    imageObj.onload = function(){
        drawImage(this);
    };
    imageObj.src = IMAGE;
};


//モザイク
function Pixelization(ctx,height,width){
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
            ctx.lineWidth = document.getElementById("range").value;
            document.radioBtn.bold.value = ctx.lineWidth;
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
//ぼかし
function Blur(data,width){
    for(var i = 0;i<data.length;i+=4){
        var pre_line = i - width*4;
        var next_line = i + width*4;
        
        var red = (data[pre_line-4]+data[pre_line]+data[pre_line+4]
                   +data[i-4]+data[i]+data[i+4]
                   +data[next_line -4]+data[next_line]+data[next_line+4])/9;
        
        var blue = (data[pre_line-3]+data[pre_line+1]+data[pre_line+5]
                   +data[i-3]+data[i+1]+data[i+5]
                   +data[next_line -3]+data[next_line+1]+data[next_line+5])/9;
        
        var green = (data[pre_line-2]+data[pre_line+2]+data[pre_line+6]
                   +data[i-2]+data[i+2]+data[i+6]
                   +data[next_line -2]+data[next_line+2]+data[next_line+6])/9;
        
        // red
        data[i] = red;
        // green
        data[i + 1] = blue;
        // blue
        data[i + 2] = green;
        
    }
}

//モーションブラー
function MotionBlur(ctx,height,width){
    var size = 10;
    var w,h;
    for(var y =0;y<height;y++){
        //alert("ok");
        console.log(y);
        if(size <= height - y){//上下端ともオーバーなし
            h = size*2 + 1;
        }else if(size > height - y){//下端でオーバー
            h = size + 1 + height - y;
        }else if(y<=size){//上端でオーバー
            h = size + y;
        }
        for(var x =0;x<width;x++){
            if(size <= width - x){//左右端ともオーバーなし
                w = size*2+1;
            }else if(size > width - x){//右端でオーバー
                w = size + 1 + width - x;
            }else if(x<=size){//左端でオーバー
                w = size + x;
            }
             //指定範囲のイメージオブジェクト
            var imageData = ctx.getImageData(x-size,y-size,w,h);
            //RGBA の順番のデータを含んだ 1 次元配列data
            var data = imageData.data;
            
            //RGBを初期化
			var r = 0;
			var g = 0;
			var b = 0;
            
            for(var i = 0;i<data.length;i+=4*w+4){
                r += data[i];
                g += data[i+1];
                b += data[i+2];
            }

            var cnt = h;
            r = Math.floor(r/cnt);
            g = Math.floor(g/cnt);
            b = Math.floor(b/cnt);
            
            //canvasを透明にする
            ctx.clearRect(x,y,1,1);
            //平均色をセット
            ctx.fillStyle = "rgb("+r+","+g+","+b+")";
            //canvasを塗る
            ctx.fillRect(x,y,1,1);
        }
    }
}
//ランダムディザ
function randomDither(data){
    for(var i = 0;i<data.length;i+=4){
        //RGBの平均値
        var gray = (data[i] + data[i+1] + data[i+2])/3;
        
        //乱数との大小比較で黒白を決定
        if(gray < Math.random()*256){
            data[i]=data[i+1]=data[i+2]=0;//黒
        }else{
            data[i]=data[i+1]=data[i+2]=255;//白	
        }
    }
}

function CheckThreshold(r,g,b,threshold,level){
    //RGBの平均
    var avg = (r+g+b)/3;
    
    //白黒2階調
    if(level=="mono"){
        if(avg<threshold){r=g=b=0;}
        else{r=g=b=255;}
    }else{//カラー8色
        if(r<threshold){
            r = 0;
        }else{
            r = 256;
        }
        if(g<threshold){
            g = 0;
        }else{
            g = 256;
        }
        if(b<threshold){
            b = 0;
        }else{
            b = 256;
        }
    }
    var rgb = [r,g,b];
    
    return rgb;
}
//ベイヤディザ
function BayerDither(ctx,height,width,level){
    var size = 4;
    var w,h;
    var m,n;
    //パターンを生成
    var line1 = [0,8,2,10];
    var line2 = [12,4,14,6];
    var line3 = [3,11,1,9];
    var line4 = [15,7,13,5];
    var pattern = [line1,line2,line3,line4];
    
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
            
            var cnt = 0;
            for(var i = 0;i<data.length;i+=4){
                if(i<=w*4-4){//パターン1行目と比較
                    m=cnt;
                    n=0;
                    cnt++;
                }
                else if(i>=w*4 && i<=w*8-4){//パターン２行目と比較
                    m=cnt - w;
                    n=1;
                    cnt++;
                }
                else if(i>=w*8 && i<=w*12-4){//パターン３行目と比較
                    m=cnt - w*2;
                    n=2;
                    cnt++;
                }
                else{//パターン４行目と比較
                    m=cnt - w*3;
                    n=3;
                    cnt++;
                }
                
                //パターンから閾値を代入
                var threshold = pattern[m][n];
                
                //RGBの256階調を16階調に変換
                r = data[i]/16;
                g = data[i+1]/16;
                b = data[i+2]/16;
                
                var rgb = CheckThreshold(r,g,b,threshold,level);
                
                //canvasを1px*1pxだけ透明にする
                ctx.clearRect(x+m,y+n,1,1);
                //色をセット
                ctx.fillStyle = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
                //canvasを塗る
                ctx.fillRect(x+n,y+n,1,1);
            } 
        }
    }
}

function effect_drawImage(effect_imageObj,effectName){
    var canvas = document.getElementById("world");
    //canvasの横幅を設定
    canvas.setAttribute("width",effect_imageObj.width);
    //canvasの縦幅を設定
    canvas.setAttribute("height",effect_imageObj.height);
    
    var ctx = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    
    //canvas上に画像を表示
    ctx.drawImage(effect_imageObj,x,y);
    //canvas の指定の矩形に対するイメージを含んだ ImageData オブジェクトを返す
    var imageData = ctx.getImageData(x,y,effect_imageObj.width, effect_imageObj.height);
    //RGBA の順番のデータを含んだ 1 次元配列data
    var data = imageData.data;
    //画像の横幅
    var w = effect_imageObj.width;
    //画像の縦幅
    var h = effect_imageObj.height;
    
    switch(effectName){
        case "Pixelization":
            Pixelization(ctx,h,w);
            break;
        case "Blur":
            Blur(data,w);
            ctx.putImageData(imageData,x,y);
            break;
        case "MotionBlur":
            MotionBlur(ctx,h,w);
            break;
        case "randomDither":
            randomDither(data);
            ctx.putImageData(imageData,x,y);
            break;
        case "BayerDither":
            var tmp = "mono";
            BayerDither(ctx,h,w,tmp);
            break;
        case "BayerDitherColor":
            var tmp = "color";
            BayerDither(ctx,h,w,tmp);
            break;
        default:
            ctx.putImageData(imageData,x,y);
            break;
    }    
}

function radioCheck(effect){
    //加工する画像オブジェクトを取得
    var effect_imageObj = new Image();
    effect_imageObj.onload = function(){
        effect_drawImage(this,effect);
    };

    effect_imageObj.src = IMAGE;
}