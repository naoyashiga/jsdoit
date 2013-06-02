//読み込む元の画像
var IMAGE = "http://jsrun.it/assets/x/y/1/B/xy1Bw.jpeg";
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


//モノクロ加工
function GrayEffect(data){
    for(var i = 0;i<data.length;i+=4){
        var brightness = 0.34*data[i] + 0.5*data[i+1] + 0.16*data[i+2];
        // red
        data[i] = brightness;
        // green
        data[i + 1] = brightness;
        // blue
        data[i + 2] = brightness;
        
    }
}
//セピア加工
function SepiaEffect(data){
    for(var i = 0;i<data.length;i+=4){
        var brightness = 0.34*data[i] + 0.5*data[i+1] + 0.16*data[i+2];
        // red
        data[i] = (brightness/255)*240;
        // green
        data[i + 1] = (brightness/255)*200;
        // blue
        data[i + 2] = (brightness/255)*145;
        
    }
}

//色反転
function ReverseEffect(data){
    for(var i = 0;i<data.length;i+=4){
        // red
        data[i] = 255-data[i];
        // green
        data[i + 1] = 255-data[i+1];
        // blue
        data[i + 2] = 255-data[i+2];
        
    }
}

//2値化
function BinarizeEffect(data){
    var threshold = document.getElementById("range").value;
    for(var i = 0;i<data.length;i+=4){
        //グレースケールの計算
        var Y = 0.298912 * data[i] + 0.586611 * data[i+1] + 0.114478 * data[i+2];
        if(Y > threshold){
            Y = 255;
        }else{
            Y = 0;			
        }
        // red
        data[i] = Y;
        // green
        data[i + 1] = Y;
        // blue
        data[i + 2] = Y;
        //alpha
        data[i+3] = 255; 
    }
}

//ぼかし
function BlurEffect(data,width){
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
    
    switch(effectName){
        case "Gray":
            GrayEffect(data);
            break;
        case "Sepia":
            SepiaEffect(data);
            break;
        case "Reverse":
            ReverseEffect(data);
            break;
        case "Binarize":
            BinarizeEffect(data);
            break;
        case "Blur":
            BlurEffect(data,w);
            break;
        default:
            break;
    }
    
    ctx.putImageData(imageData,x,y);
}

function radioCheck(effect){
    //加工する画像オブジェクトを取得
    var effect_imageObj = new Image();
    effect_imageObj.onload = function(){
        effect_drawImage(this,effect);
    };

    effect_imageObj.src = IMAGE;
}