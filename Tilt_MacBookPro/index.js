window.onload = function(){
    //FPS
    var FPS = function(target){
        this.target = target;//目標FPS
        this.interval = 1000 / target;//setTimeoutに与えるインターバル
        this.checkpoint = new Date();
        this.fps = 0;
    };
    
    FPS.prototype = {
        //checkからcheckまでの時間を元にFPSを計算
        check:function(){
            var now = new Date();
            this.fps = 1000 / (now - this.checkpoint);
            this.checkpoint = new Date();
        },
        //現在のFPSを取得
        getFPS:function(){
            return this.fps.toFixed(2);
        },
    
        //次回処理までのインターバルを取得
        getInterval:function(){
            var elapsed = new Date() - this.checkpoint;
            return this.interval - elapsed > 10 ? this.interval - elapsed:10;
        }
    };
    
    //メイン処理
    var canvas = document.getElementById('world');
    //canvasの横幅を設定
    canvas.setAttribute("width",400);
    //canvasの縦幅を設定
    canvas.setAttribute("height",400);
    var ctx = canvas.getContext('2d');
    
    //円の位置
    var cirX = 0;
    var cirY = 0;
    //半径
    var radius = 50;
    //壁の厚さ
    var thickness = 10;
    //30FPSでアニメーション
    var fps = new FPS(30);
    
    //傾きセンサー
    function orientationEvent(event) {
        cirX += event.gamma*2;
        cirY += event.beta*2;
        radius += event.gamma;
    }
    var loop = function(){
        fps.check();
        //現在の状態をスタックの最後に加える
        ctx.save();
    
        //キャンパスをクリア
        ctx.beginPath();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        ctx.beginPath();
        ctx.fillRect(0,0,canvas.width,thickness);//上壁
        ctx.fillRect(0,canvas.height-thickness,canvas.width,thickness);//下壁
        ctx.fillRect(0,0,thickness,canvas.height);//左壁
        ctx.fillRect(canvas.width-thickness,0,thickness,canvas.height);//右壁
    
        //傾きを取得
        window.addEventListener("deviceorientation", orientationEvent, true);
        
        //円の大きさを制限
        if(radius<1){//最小
           radius = 1;
        }else if(radius>canvas.width/2-thickness){//最大
            	radius=canvas.width/2-thickness;
        }
        
        //壁のあたり判定
        if(cirX>=canvas.width-radius-thickness){//右壁に衝突
            cirX = canvas.width-radius-thickness;
        }
        else if(cirX<radius+thickness){//左壁に衝突
            cirX = radius+thickness;
        }
        
        if(cirY>=canvas.height-radius-thickness){//下壁に衝突
            cirY = canvas.height-radius-thickness;
        }
        else if(cirY<radius+thickness){//上壁に衝突
            cirY = radius+thickness;
        }
        
        //円を描画
        ctx.beginPath();
        ctx.arc(cirX,cirY, radius, 0, 360*Math.PI/180, false);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.stroke();
        
    
        //スタックの最後の状態を抜き出しその状態をコンテキストに復元
        ctx.restore();
    	
        setTimeout(loop,fps.getInterval());
    
    };
    
    loop();
};