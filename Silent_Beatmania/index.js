//Webフォント
WebFontConfig = {
    google: { families: [ 'Passion+One::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

enchant();

window.onload = function(){
    var game = new Game(500,500);
    game.whiteList = [];
    game.blackList = [];
    game.lightList = [];
    game.targetList = [];
    
    game.onload = function(){
        var scene = game.rootScene;
        scene.backgroundColor = "black";
        
        //スコア表示のラベル
        var score = new Label();
        score.moveTo(30,250);
        var defaultText = "";
        score.color = "white";
        score.text = defaultText;
        score.font = "60px 'Passion One'";
        scene.addChild(score);
        //スコアの位置
        var SCORE_X = 280;
        var SCORE_Y = 320;
        //GOOD
        var good = new Label();
        good.moveTo(SCORE_X ,SCORE_Y);
        var cnt_good = 0;
        good.color = "white";
        good.text = "GOOD:" + cnt_good;
        good.font = "40px 'Passion One'";
        scene.addChild(good);
        //COOL
        var cool = new Label();
        cool.moveTo(SCORE_X,SCORE_Y + 45);
        var cnt_cool = 0;
        cool.color = "white";
        cool.text = "COOL:" + cnt_cool;
        cool.font = "40px 'Passion One'";
        scene.addChild(cool);
        //GREAT
        var great = new Label();
        great.moveTo(SCORE_X,SCORE_Y + 45*2);
        var cnt_great = 0;
        great.color = "white";
        great.text = "GREAT:" + cnt_great;
        great.font = "40px 'Passion One'";
        scene.addChild(great);  
        
        //白い鍵盤を生成
        var width = 40;
        for(var i = 30;i <= width*3  ;i = i + width){
            var white_key = new Entity();
            white_key.x = i;
            white_key.y = 350;
            white_key.width = width;
            white_key.height = 100;
            white_key.className = "white_key_off";
            scene.addChild(white_key);
            game.whiteList.push(white_key);
        }
        //黒い鍵盤を生成
        var black_width = 30;
        for(var k = 0;k<2  ;k++){
            var black_key = new Entity();
            black_key.x = 55 + width*k;
            black_key.y = 350;
            black_key.width = black_width;
            black_key.height = 50;
            black_key.className = "black_key_off";
            scene.addChild(black_key);
            game.blackList.push(black_key);
        }
        //DJの枠
        var djkit = new Entity();
        djkit.className = "djkit_off";
        djkit.x = width*3 + 30;
        djkit.y = 350;
        djkit.width = 80;
        djkit.height = 100 - 6;
        scene.addChild(djkit);
        //DJのディスク
        var disc = new Entity();
        disc.className = "metal radial";
        disc.width = (djkit.width - 10)/2.5;
        disc.height = disc.width;
        disc.x = djkit.x + 10;
        disc.y = 350 + 8;
        scene.addChild(disc);
        
        //スプライトの大きさ
        var SPRITE_WIDTH  = 300;
		var SPRITE_HEIGHT = 350;
        //線を描画
        var line  = new Sprite(SPRITE_WIDTH, SPRITE_HEIGHT);	// スプライト生成
        var surface = new Surface(SPRITE_WIDTH, SPRITE_HEIGHT);	// サーフェス生成
    
        // canvas 描画
        for(var l = 0;l<5;l++){
            var context = surface.context;
            context.beginPath();             // パスのリセット
            context.lineWidth = 1;           // 線の太さ
            context.strokeStyle="#fff";   // 線の色
            if(l<4){
                context.moveTo(31 + 40*l,0);//開始位置
                context.lineTo(31 + 40*l,350);// 終了位置
            }
            else{//右端の線
                context.moveTo(31 + 40*3 + djkit.width + 3,0);
                context.lineTo(31 + 40*3 + djkit.width + 3,350);
            }
            context.stroke();//パスを描画
            
            line.image = surface;	// サーフェスを画像としてセット
            scene.addChild(line);	// シーンに追加
        }
        //ターゲットの落下速度
        var SPEED = 10;
        //ターゲット
        for(var j = 0;j<6;j++){
            var target = new Entity();
            target.height = 10;
            if(j<3){//白い鍵盤のターゲット
                target.width = 40;
                target.x = 30 + target.width * j;
                target.y = -Math.random()*500;
            	//target.y = -10 + (target.height + Math.random()*100) * j;
                target.className = "target";
            }
            else if(j==3 || j==4){//黒い鍵盤のターゲット
                target.width = black_key.width;
                target.x = game.blackList[j-3].x;
                target.y = -Math.random()*500;
            	//target.y = -10 + (target.height + Math.random()*100) * j;
                target.className = "target_small";
            }
            else{//ディスクのターゲット
                target.width = djkit.width;
                target.x = djkit.x + 3;
                target.y = -Math.random()*500;
            	//target.y = -10 + (target.height + Math.random()*100) * j;
                target.className = "target_small";
            }
            scene.addChild(target);
            game.targetList.push(target);
 
            target.addEventListener('enterframe', function(e) {
                this.y += SPEED;
                if(this.y > white_key.y){
                    this.y = -Math.random()*1000;
                }
            });	
        }
        //チェッカー
        var checker = new Entity();
        checker.className = "checker";
        checker.width = white_key.width*3 + djkit.width + 6;
        checker.height = target.height;
        checker.x = 30;
        checker.y = white_key.y - checker.height;
        scene.addChild(checker);
        //押したときに光るライト
        for(var m = 0;m<6;m++){
            var light = new Entity();
            light.height = 200;
            if(m<3){//白い鍵盤のライト
                light.width = game.targetList[m].width;
                light.x = game.targetList[m].x;
            }
            else if(m==3 || m == 4){//黒い鍵盤のライト
                light.width = game.blackList[m-3].width;
            	light.x = game.blackList[m-3].x;
            }
            else{//ディスクのライト
                light.width = djkit.width;
            	light.x = 3 + djkit.x;
            }

            light.y = 350 - light.height - target.height;
            //light.className = "light";
            scene.addChild(light);
            game.lightList.push(light);
        }
        //キーを割り当てる
        game.keybind('Z'.charCodeAt(0), 'z');	// z を z ボタンとして割り当てる
        game.keybind('X'.charCodeAt(0), 'x');	// x を x ボタンとして割り当てる
        game.keybind('C'.charCodeAt(0), 'c');	// c を c ボタンとして割り当てる
        game.keybind('S'.charCodeAt(0), 's');	// s を s ボタンとして割り当てる
        game.keybind('D'.charCodeAt(0), 'd');	// x を x ボタンとして割り当てる
        game.keybind(32,"space");
        
        //キーを押した位置を評価
        function checkPosition(i){
            var position = checker.y - game.targetList[i].y;
            //評価:GOOD
            if(10 < position && position <= 20){
                score.text = "GOOD";
                cnt_good = cnt_good + 1;
                good.text = "GOOD:" + cnt_good;
            }
            //評価:COOL
            if(0 < position && position <= 10){
                score.text = "COOL";
                cnt_cool = cnt_cool + 1;
                cool.text = "COOL:" + cnt_cool;
            }
            //評価:GREAT
            if(position === 0){
                score.text = "GREAT";
                cnt_great = cnt_great + 1;
                great.text = "GREAT:" + cnt_great;
            }
        }
        //zキーを押すと実行される関数
        var white_left = function(e){
            game.whiteList[0].className = "white_key_on";
            game.lightList[0].className = "light";
            checkPosition(0);
        };
        var white_left_up = function(e){
            game.whiteList[0].className = "white_key_off";
            game.lightList[0].className = "";
            score.text = defaultText;
        };
        //xキーを押すと実行される関数
        var white_center = function(e){
            game.whiteList[1].className = "white_key_on";
            game.lightList[1].className = "light";
            checkPosition(1);
        };
        var white_center_up = function(e){
            game.whiteList[1].className = "white_key_off";
            game.lightList[1].className = "";
            score.text = defaultText;
        };
        //cキーを押すと実行される関数
        var white_right = function(e){
            game.whiteList[2].className = "white_key_on";
            game.lightList[2].className = "light";
            checkPosition(2);
        };
        var white_right_up = function(e){
            game.whiteList[2].className = "white_key_off";
            game.lightList[2].className = "";
            score.text = defaultText;
        };
        //sキーを押すと実行される関数
        var black_left = function(e){
            game.blackList[0].className = "black_key_on";
            game.lightList[3].className = "light";
            checkPosition(3);
        };
        var black_left_up = function(e){
            game.blackList[0].className = "black_key_off";
            game.lightList[3].className = "";
            score.text = defaultText;
        };
        //dキーを押すと実行される関数
        var black_right = function(e){
            game.blackList[1].className = "black_key_on";
            game.lightList[4].className = "light";
            checkPosition(4);
        };
        var black_right_up = function(e){
            game.blackList[1].className = "black_key_off";
            game.lightList[4].className = "";
            score.text = defaultText;
        };
        //spaceキーを押すと実行される関数
        var dj_disc = function(e){
            djkit.className = "djkit_on";
            game.lightList[5].className = "light";
            checkPosition(5);
        };
        var dj_disc_up = function(e){
            djkit.className = "djkit_off";
            game.lightList[5].className = "";
            score.text = defaultText;
        };
        //白い鍵盤:左
        game.addEventListener("zbuttondown",white_left);
        game.addEventListener("zbuttonup",white_left_up);
        //白い鍵盤:中央
        game.addEventListener("xbuttondown",white_center);
        game.addEventListener("xbuttonup",white_center_up);
        //白い鍵盤:右
        game.addEventListener("cbuttondown",white_right);
        game.addEventListener("cbuttonup",white_right_up);
        //黒い鍵盤:左
        game.addEventListener("sbuttondown",black_left);
        game.addEventListener("sbuttonup",black_left_up);
        //黒い鍵盤:右
        game.addEventListener("dbuttondown",black_right);
        game.addEventListener("dbuttonup",black_right_up);
         //ディスク
        game.addEventListener("spacebuttondown",dj_disc);
        game.addEventListener("spacebuttonup",dj_disc_up);
    };
    
    game.start();
};