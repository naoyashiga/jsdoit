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

//グーチョキパーの画像
var GU_IMAGE = "http://jsrun.it/assets/v/m/m/v/vmmv1.png";
var CHOKI_IMAGE = "http://jsrun.it/assets/b/A/7/1/bA71C.png";
var PA_IMAGE = "http://jsrun.it/assets/R/o/M/0/RoM0P.png";

//右の画面の端
var RIGHT_END = 800;
//下の画面の端
var BOTTOM_END = 750; 
window.onload = function(){
    var game = new Game(RIGHT_END,BOTTOM_END);
    //画像読み込み
    
    game.preload(GU_IMAGE);	
    game.preload(CHOKI_IMAGE);
    game.preload(PA_IMAGE);

    game.mojiList = [];
    game.masuList = [];
    game.signalList = [];
    game.masuNumList = [];
    
    game.onload = function(){
        //シーン生成
        var scene = game.rootScene;
        
        //マスの間隔
        var margin = 10;
        //マスを生成
        for(var i = 0;i<12;i ++){
            var masu = new Entity();
            masu.width = 80;
            masu.height = 80;
            var top_margin = 30;
            var masu_margin_right = 20;
            var line_height = 0;
            var line_margin = 20;
            masu.x = 30 + masu.width * (i%3)  + masu_margin_right*(i%3);
            if(i<=2){
                masu.y = top_margin;
            }else if(i<=5){
                line_height = game.masuList[i-3].y + masu.height;
                masu.y = line_margin + line_height;
            }else if(i<=8){
                line_height = game.masuList[i-3].y + masu.height;
                masu.y = line_margin + line_height;
            }else{
                line_height = game.masuList[i-3].y + masu.height;
                masu.y = line_margin + line_height;
            }
            masu.className = "masu";
            scene.addChild(masu);
            game.masuList.push(masu);
            
            //マスの数字のラベル
            var masu_num = new Label();
            
            if(i<=2){
                masu_num.moveTo(60+100*i,40);
            }else if(i<=5){
                masu_num.moveTo(60+100*(i-3),game.masuNumList[i-3].y + 100);
            }else if(i<=8){
                masu_num.moveTo(60+100*(i-6),game.masuNumList[i-3].y + 100);
            }else{
                masu_num.moveTo(50+100*(i-9),game.masuNumList[i-3].y + 100);
            }
            masu_num.text = i+1;
            masu_num.font = "80px 'Passion One'";
            scene.addChild(masu_num);
            game.masuNumList.push(masu_num);
        }
        
        //グミ・チョコレート・パインの表示を生成
        for(var k = 0;k<12;k ++){
            var signal = new Entity();
            signal.width = 80;
            signal.height = 80;
            var signal_top_margin = 30;
            var signal_margin_right = 20;
            var signal_line_height = 0;
            var signal_line_margin = 20;
            signal.x = 350 + signal.width * (k%3)  + signal_margin_right*(k%3);
            
            //表示文字を作成
            var moji = new Label();
            moji.x = 350 + signal.width * (k%3)  + signal_margin_right*(k%3) + 25;
            
            if(k<=2){
                signal.y = top_margin;
                moji.y = top_margin + 15;
            }else if(k<=5){
                line_height = game.masuList[k-3].y + signal.height;
                signal.y = line_margin + line_height;
                moji.y = signal.y + 15;
            }else if(k<=8){
                line_height = game.masuList[k-3].y + signal.height;
                signal.y = line_margin + line_height;
                moji.y = signal.y + 15;
            }else{
                line_height = game.masuList[k-3].y + signal.height;
                signal.y = line_margin + line_height;
                moji.y = signal.y + 15;
            }
            signal.className = "signal";
            scene.addChild(signal);
            game.signalList.push(signal);
            //game.signalList[k].className = "player_masu";
           	
            switch(k){
                case 0:
                    moji.text = "グ";
                    break;
                case 1:
                    moji.text = "ミ";
                    break;
                case 2:
                    moji.text = "";
                    break;
                case 3:
                    moji.text = "チ";
                    break;
                case 4:
                    moji.text = "ョ";
                    break;
                case 5:
                    moji.text = "コ";
                    break;
                case 6:
                    moji.text = "レ";
                    break;
                case 7:
                    moji.text = "ー";
                    break;
                case 8:
                    moji.text = "ト";
                    break;
                case 9:
                    moji.text = "パ";
                    break;
                case 10:
                    moji.text = "イ";
                    break;
                case 11:
                    moji.text = "ン";
                    break;
                default:
                    break;
            }
            moji.font = "50px 'Passion One'";
            scene.addChild(moji);
            game.mojiList.push(moji);
        }
        //プレイヤーのマス
        var player_masu = new Entity();
        player_masu.width = 20;
        player_masu.height = 60;
        player_masu.x = 60;
        player_masu.y = 50;
        player_masu.className = "player_masu";
        scene.addChild(player_masu);
 
        //敵のマス
        var enemy_masu = new Entity();
        enemy_masu.width = 20;
        enemy_masu.height = 60;
        enemy_masu.x = 80;
        enemy_masu.y = 50;
        enemy_masu.className = "enemy_masu";
        scene.addChild(enemy_masu);
        
        
        //グーのスプライト生成
        var gu_sprite = new Sprite(80, 80);		
        gu_sprite.image = game.assets[GU_IMAGE];
        gu_sprite.moveTo(30, 520);	
        scene.addChild(gu_sprite);
        
         //チョキのスプライト生成
        var choki_sprite = new Sprite(80, 90);		
        choki_sprite.image = game.assets[CHOKI_IMAGE];
        choki_sprite.moveTo(110, 510);	
        scene.addChild(choki_sprite);
        
         //パーのスプライト生成
        var pa_sprite = new Sprite(80, 80);		
        pa_sprite.image = game.assets[PA_IMAGE];
        pa_sprite.moveTo(190, 520);	
        scene.addChild(pa_sprite);
        
        //COMグーのスプライト生成
        var com_gu_sprite = new Sprite(80, 80);		
        com_gu_sprite.image = game.assets[GU_IMAGE];
        com_gu_sprite.moveTo(300, 520);
        scene.addChild(com_gu_sprite);
        
         //COMチョキのスプライト生成
        var com_choki_sprite = new Sprite(80, 90);		
        com_choki_sprite.image = game.assets[CHOKI_IMAGE];
        com_choki_sprite.moveTo(380, 510);
        scene.addChild(com_choki_sprite);
        
         //COMパーのスプライト生成
        var com_pa_sprite = new Sprite(80, 80);		
        com_pa_sprite.image = game.assets[PA_IMAGE];
        com_pa_sprite.moveTo(460, 520);
        scene.addChild(com_pa_sprite);
        
        
        //プレイヤーの手のラベル
        var player_sign = new Label();
        player_sign.moveTo(40,450);
        player_sign.text = "YOU";
        player_sign.font = "35px 'Passion One'";
        scene.addChild(player_sign);
        
        //プレイヤーの手のラインのラベル
        var player_line = new Entity();
        player_line.width = 55;
        player_line.height = 60;
        player_line.x = 40;
        player_line.y = 420;
        player_line.className = "player_masu";
        scene.addChild(player_line);
        
        //COMの手のラベル
        var com_sign = new Label();
        com_sign.moveTo(300,450);
        com_sign.text = "COM";
        com_sign.font = "35px 'Passion One'";
        scene.addChild(com_sign);
        
        //COMの手のラインのラベル
        var com_line = new Entity();
        com_line.width = 55;
        com_line.height = 60;
        com_line.x = 300;
        com_line.y = 420;
        com_line.className = "enemy_masu";
        scene.addChild(com_line);
        
        //プレイヤーの結果表示のラベル
        var player_score = new Label();
        player_score.width = 500;
        player_score.moveTo(30,600);
        player_score.text = "";
        player_score.font = "50px 'Passion One'";
        scene.addChild(player_score);
        
        //相手の結果表示のラベル
        var enemy_score = new Label();
        enemy_score.width = 500;
        enemy_score.moveTo(30,650);
        enemy_score.text = "";
        enemy_score.font = "50px 'Passion One'";
        scene.addChild(enemy_score);
        
        //じゃんけんの手
        var gu = "グー";
        var choki = "チョキ";
        var pa = "パー";
        //プレイヤーと相手の手
        var player;
        var enemy;
        
        //グミ・チョコレート・パイン
        var gumi = 2;
        var chocolate = 6;
        var pine = 3;
        
        //点数
        var num = 1;
        var enemy_num = 1;
        
        //スコア合計点をチェックする関数
        function check_score(sign,winner){
            if(winner == "PLAYER"){//じゃんけんの勝者がプレイヤーのとき
                if(num+sign>12){//12を超えたときに折り返す計算
                    player_masu.className = "player_masu player_move"+sign + num;//アニメーションの追加
                    num = 12 - (num + sign - 12);//折り返した後の到着点の計算                    
                }else if(num+sign<12){//12より小さいとき普通に足す
                    player_masu.className = "player_masu player_move"+sign + num;
                    num += sign;
                }else if(num+sign==12){//12になったら終了
                    player_masu.className = "player_masu player_move"+sign + num;
                    player_score.text = "RESULT:YOU ARE WINNER";
                    enemy_score.text = "RESULT:COM IS LOSER";
                    // ゲームエンド
					game.end();
                }
        }else{//じゃんけんの勝者がCOMのとき
                if(enemy_num+sign>12){
                    enemy_masu.className = "enemy_masu player_move"+sign + enemy_num;//アニメーションの追加
                    enemy_num = 12 - (enemy_num + sign - 12);
                }else if(enemy_num+sign<12){
                    enemy_masu.className = "enemy_masu player_move"+sign + enemy_num;
                    enemy_num += sign;
                }else{
                    enemy_masu.className = "enemy_masu player_move"+sign + enemy_num;
                    player_score.text = "RESULT:YOU ARE LOSER";
                    enemy_score.text = "RESULT:COM IS WINNER";
                    // ゲームエンド
					game.end();
                }
            }
        }
        
        function Junken_Battle(){
            //0～2までの乱数を発生させる
            var Rnd=Math.floor( Math.random() * 3 );

            //敵の手をランダムで決定
            switch(Rnd){
                case 0:
                    enemy = gu;
                    //グーの画像を上に移動
                    com_gu_sprite.moveTo(300, 490);
                    com_choki_sprite.moveTo(380, 510);
                    com_pa_sprite.moveTo(460, 520);
                    break;
                case 1:
                    enemy = choki;
                    //チョキの画像を上に移動
                    com_gu_sprite.moveTo(300, 520);
                    com_choki_sprite.moveTo(380, 480);
                    com_pa_sprite.moveTo(460, 520);
                    break;
                case 2:
                    enemy = pa;
                    //パーの画像を上に移動
                    com_gu_sprite.moveTo(300, 520);
                    com_choki_sprite.moveTo(380, 510);
                    com_pa_sprite.moveTo(460, 490);
                    break;
                default:
                    break;
            }            
            //じゃんけんの判定
            if(player==gu && enemy == choki){//プレイヤーの勝ち手:グー
                check_score(gumi,"PLAYER");
                player_sign.text = "YOU WIN";
                com_sign.text = "COM LOSE";
                //グミの表示を点灯
                game.signalList[0].className = "signal color1";
                game.signalList[1].className = "signal color2";
            }else if(player==gu && enemy == pa){//相手の勝ち手:パー
                check_score(pine,"COM");
                player_sign.text = "YOU LOSE";
                com_sign.text = "COM WIN";
                //パインの表示を点灯
                game.signalList[9].className = "signal color10";
                game.signalList[10].className = "signal color11";
                game.signalList[11].className = "signal color12";
            }else if(player==choki && enemy == pa){//プレイヤーの勝ち手:チョキ
                check_score(chocolate,"PLAYER");
                player_sign.text = "YOU WIN";
                com_sign.text = "COM LOSE";
                //チョコレートの表示を点灯
                game.signalList[3].className = "signal color4";
                game.signalList[4].className = "signal color5";
                game.signalList[5].className = "signal color6";
                game.signalList[6].className = "signal color7";
                game.signalList[7].className = "signal color8";
                game.signalList[8].className = "signal color9";
            }else if(player==choki && enemy == gu){//相手の勝ち手:グー
                check_score(gumi,"COM");
                player_sign.text = "YOU LOSE";
                com_sign.text = "COM WIN";
                //グミの表示を点灯
                game.signalList[0].className = "signal color1";
                game.signalList[1].className = "signal color2";
            }else if(player==pa && enemy == gu){//プレイヤーの勝ち手:パー
                check_score(pine,"PLAYER");
                player_sign.text = "YOU WIN";
                com_sign.text = "COM LOSE";
                //パインの表示を点灯
                game.signalList[9].className = "signal color10";
                game.signalList[10].className = "signal color11";
                game.signalList[11].className = "signal color12";
            }else if(player==pa && enemy == choki){//相手の勝ち手:チョキ
                check_score(chocolate,"COM");
                player_sign.text = "YOU LOSE";
                com_sign.text = "COM WIN";
                //チョコレートの表示を点灯
                game.signalList[3].className = "signal color4";
                game.signalList[4].className = "signal color5";
                game.signalList[5].className = "signal color6";
                game.signalList[6].className = "signal color7";
                game.signalList[7].className = "signal color8";
                game.signalList[8].className = "signal color9";
            }else{//あいこ
                player_sign.text = "YOU DRAW";
                com_sign.text = "COM DRAW";
            }
        }
        
        //プレイヤーのグーの画像をクリックすると起動するイベントリスナ
        gu_sprite.addEventListener("touchstart", function() {
            //点灯のマスのCSSを初期化する(点灯アニメーションのCSSを保持させない)
            game.signalList[0].className = "signal";
            game.signalList[1].className = "signal";
            game.signalList[3].className = "signal";
            game.signalList[4].className = "signal";
            game.signalList[5].className = "signal";
            game.signalList[6].className = "signal";
            game.signalList[7].className = "signal";
            game.signalList[8].className = "signal";
            game.signalList[9].className = "signal";
            game.signalList[10].className = "signal";
            game.signalList[11].className = "signal";
            //出す手はグー
	    	player = gu;
            Junken_Battle();
            //グーの画像を上に移動
            gu_sprite.moveTo(30, 490);
            choki_sprite.moveTo(110, 510);
            pa_sprite.moveTo(190, 520);
		});
        
		//プレイヤーのチョキの画像をクリックすると起動するイベントリスナ
        choki_sprite.addEventListener("touchstart", function() {
            //点灯のマスのCSSを初期化する(点灯アニメーションのCSSを保持させない)
            game.signalList[0].className = "signal";
            game.signalList[1].className = "signal";
            game.signalList[3].className = "signal";
            game.signalList[4].className = "signal";
            game.signalList[5].className = "signal";
            game.signalList[6].className = "signal";
            game.signalList[7].className = "signal";
            game.signalList[8].className = "signal";
            game.signalList[9].className = "signal";
            game.signalList[10].className = "signal";
            game.signalList[11].className = "signal";
            //出す手はチョキ
	    	player = choki;
            Junken_Battle();
            //チョキの画像を上に移動
            gu_sprite.moveTo(30, 520);
            choki_sprite.moveTo(110, 480);
            pa_sprite.moveTo(190, 520);
		});
        
        //プレイヤーのパーの画像をクリックすると起動するイベントリスナ
        pa_sprite.addEventListener("touchstart", function() {
            //点灯のマスのCSSを初期化する(点灯アニメーションのCSSを保持させない)
            game.signalList[0].className = "signal";
            game.signalList[1].className = "signal";
            game.signalList[3].className = "signal";
            game.signalList[4].className = "signal";
            game.signalList[5].className = "signal";
            game.signalList[6].className = "signal";
            game.signalList[7].className = "signal";
            game.signalList[8].className = "signal";
            game.signalList[9].className = "signal";
            game.signalList[10].className = "signal";
            game.signalList[11].className = "signal";
            //出す手はパー
	    	player = pa;
            Junken_Battle();
            //パーの画像を上に移動
            gu_sprite.moveTo(30, 520);
            choki_sprite.moveTo(110, 510);
            pa_sprite.moveTo(190, 490);
		});
    };
    
    game.start();
};