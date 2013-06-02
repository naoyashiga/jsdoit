enchant();
var STAGE_WIDTH = 300;//ステージの横幅
var STAGE_HEIGHT = 300;//ステージの縦幅

window.onload = function(){
    var game = new Game(STAGE_WIDTH,STAGE_HEIGHT);
   	game.enemyList = [];
    game.onload = function(){
        var scene = game.rootScene;
        scene.backgroundColor = "#C3F6F6";
        
        // バーチャルキーパッドを生成
        var pad = new Pad();
        pad.moveTo(0, 220);
        scene.addChild(pad);
        
       
        //プレイヤーを生成
        var player = new Entity();
        player.x = 0;
        player.y = 0;
        player.width = 30;
        player.height = 30;
        player.className = "player";
        scene.addChild(player);

        //プレイヤーの動くスピード
        var SPEED = 8;
        var MOVE_RANGE_X = game.width - player.width;
        var MOVE_RANGE_Y = game.height - player.height;
        //プレイヤーのイベントリスナー
        player.addEventListener('enterframe',function(e){
            //プレイヤーを十字キーで上下左右に移動
            if (game.input.up) this.y -= SPEED;
	        if (game.input.down) this.y += SPEED;
            if (game.input.left) this.x -= SPEED;
	        if (game.input.right) this.x += SPEED;
            
            //プレイヤーの移動範囲を制限
            if(this.y<0){this.y = 0;}//上端
            else if(this.y>MOVE_RANGE_Y) {this.y = MOVE_RANGE_Y;}//左端
            if(this.x<0){this.x = 0;}//左端
            else if(this.x>MOVE_RANGE_X) {this.x = MOVE_RANGE_X;}//右端
        });
        
        //アイテムを生成
        var item = new Entity();
        item.x = MOVE_RANGE_X;
        item.y = MOVE_RANGE_Y;
        item.width = 30;
        item.height = 30;
        item.className = "item";
        scene.addChild(item);
        
        var EnemySpeed = [];
        //敵を生成
        for(var i = 0;i<16;i ++){
            var enemy = new Entity();
            enemy.width = 30;
            enemy.height = 30;
            if(i<8){
                enemy.x = 30 + i*30;
                if(i%2===0){enemy.y = 0;}
                else{enemy.y = game.height - enemy.height;}
            }else{
                enemy.y = 30 + (i-8)*30;
                if(i%2===0){enemy.x = 0;}
                else{enemy.x = game.width - enemy.width;}
            }
            enemy.className = "enemy";
            scene.addChild(enemy);
            game.enemyList.push(enemy);
            //敵の動くスピード
            if(i<8){EnemySpeed[i] = 8;}
            else{EnemySpeed[i] = 8;}
        }
        //敵が移動できる一番端
        var ENEMY_MOVE_RANGE_X = game.width - enemy.width;
        var ENEMY_MOVE_RANGE_Y = game.height - enemy.height;
        
        function enemy_control(num){
            if(num<8){
                game.enemyList[num].y += EnemySpeed[num];
            }else{
                game.enemyList[num].x += EnemySpeed[num];
            }
            
            //敵の移動範囲を制限
            if(game.enemyList[num].x<0 || game.enemyList[num].x>ENEMY_MOVE_RANGE_X){EnemySpeed[num] *= -1;}//右端,左端で移動方向を反転
            if(game.enemyList[num].y<0 || game.enemyList[num].y>ENEMY_MOVE_RANGE_Y){EnemySpeed[num] *= -1;}//上端,下端で移動方向を反転
            //敵とプレイヤーとの当たり判定
            if (game.enemyList[num].intersect(player)) {
	        	player.x = 0;
                player.y = 0;
	        }            
            //アイテムとプレイヤーとの当たり判定
            if (item.intersect(player)) {
               scene.removeChild(item);
               game.end();
            }
        }
        //敵のイベントリスナを設定
        for(i = 0;i<game.enemyList.length;i++){
            game.enemyList[i].addEventListener('enterframe',function(i){
                return function(){
                    enemy_control(i);
                };
        	}(i));
        }
    };
    
    game.start();

};