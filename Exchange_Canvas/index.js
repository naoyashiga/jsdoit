//読み込む元の画像
var IMAGE = "http://jsrun.it/assets/x/y/1/B/xy1Bw.jpeg";
var IMAGE2 = "http://jsrun.it/assets/i/9/z/b/i9zbi.jpg";
window.onload = function(){
    var data = [];
    var data2 = [];
    var imageData;
    
    function drawImage(imageObj){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        
        //canvasの横幅を設定
        var w = canvas.width = imageObj.width / 2;
        //canvasの縦幅を設定
        var h = canvas.height= imageObj.height / 2;
    
        
        //canvas上に画像を表示
        ctx.drawImage(imageObj,0,0);
        
        imageData = ctx.getImageData(0,0,w,h);
        //RGBA の順番のデータを含んだ 1 次元配列data
        data = imageData.data;
        
    }
    
    var imageObj = new Image();
    imageObj.onload = function(){
        drawImage(this);
    };
    imageObj.src = IMAGE;


    //2つめのCanvas
    function drawImage2(imageObj){
        var canvas2 = document.getElementById("canvas2");
        var ctx2 = canvas2.getContext("2d");
        
         //canvasの横幅を設定
        var w = canvas2.width = imageObj.width / 2;
        //canvasの縦幅を設定
        var h = canvas2.height= imageObj.height / 2;
        
        //canvas上に画像を表示
        ctx2.drawImage(imageObj,0,0);
        
        var imageData2 = ctx2.getImageData(0,0,w,h);
        //RGBA の順番のデータを含んだ 1 次元配列data
        data2 = imageData2.data;
    }
    
    var imageObj2 = new Image();
    imageObj2.onload = function(){
        drawImage2(this);
    };
    imageObj2.src = IMAGE2;
    
    

    function addNum(num,num2,ctx3,i){
        num+=30;
        imageData.data[i] = num;
        ctx3.putImageData(imageData,0,0);
        if(num < num2){
            //ループ
            setTimeout(addNum,1,num,num2,ctx3,i);
        }else{
            imageData.data[i] = num2;
        }
    }

    function subNum(num,num2,ctx3,i){
        //色情報を減らす
        num-=30;
        imageData.data[i] = num;
        ctx3.putImageData(imageData,0,0);
        if(num > num2){
            //ループ
            setTimeout(subNum,1,num,num2,ctx3,i);
        }else{
            imageData.data[i] = num2;
        }
    }

    $("#btn").click(function(){
        var canvas3 = document.getElementById("canvas3");
        var ctx3 = canvas3.getContext("2d");
        
         //canvasの横幅を設定
        canvas3.width = imageObj.width / 2;
        //canvasの縦幅を設定
        canvas3.height= imageObj.height / 2;

        ctx3.putImageData(imageData,0,0);
        console.log("data1:"+data[0]+","+data2[0]);

        for(var i = 0;i < data.length;i++){
            if(data[i] > data2[i]){
                subNum(data[i],data2[i],ctx3,i);
            }else if(data[i] < data2[i]){
                addNum(data[i],data2[i],ctx3,i);
            }
        }
        console.log("finish");
    });

    
};
