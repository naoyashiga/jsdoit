var canvas = document.getElementById("world");
//canvasの横幅を設定
canvas.setAttribute("width",480);
//canvasの縦幅を設定
canvas.setAttribute("height",280);
var ctx = canvas.getContext("2d");

ctx.fillStyle = "#B8F2A5";
ctx.fillRect(0,0,canvas.width,canvas.height);

//マップの配列
var map = [
    ["*","*","*","*","*","*","*","*","*","*","*","*"],
    ["*",".","g","*","*","*","*","*","*","*","*","*"],
    ["*",".",".","*","*","*","*","*","*","*","*","*"],
    ["*","b","p",".",".","*","*","*","*","*","*","*"],
    ["*",".",".","b",".","*","*","*","*","*","*","*"],
    ["*",".",".","*","*","*","*","*","*","*","*","*"],
    ["*","*","*","*","*","*","*","*","*","*","*","*"]
];
//1ブロックの横幅
var w = 40;
//1ブロックの縦幅
var h = w;

var goal_array = new Array();
//goalがboxと重なった部分は予め配列に入れておく
goal_array.push(1);//goalのX座標
goal_array.push(3);//goalのY座標
//もう一つのgoalも配列に入れる
goal_array.push(2);//goalのX座標
goal_array.push(1);//goalのY座標

//goalを描画
function DrawGoal(){
    for(var i = 0;i<goal_array.length;i=i+2){
        ctx.beginPath();
        ctx.fillStyle = "#FF801E";
        ctx.fillRect(w*goal_array[i],w*goal_array[i+1],w,h);
        
        var lw = 3;
        ctx.fillStyle = "#E16200";
        ctx.fillRect(w*goal_array[i] + lw,w*goal_array[i+1] + lw ,w - lw -3,h -lw -3);

        ctx.closePath();
    }
}
/*-----------------------------------
    配置を描画
-----------------------------------*/
function DrawMap(){
    DrawGoal();
    for(var i = 0;i<map.length;i++){
        for(var j = 0;j<map[i].length;j++){
            switch(map[i][j]){
                case "*"://Wall
                    //マスを初期化
                	ctx.clearRect(w*j,w*i,w,h);
                    //背景を塗る
                    ctx.fillStyle = "#B8F2A5";
                    ctx.fillRect(w*j,w*i,w,h);
                    
                    //角の丸み
                    var a = 10;
                    ctx.fillStyle = "#680E1F";
                    //壁の描画
                    ctx.beginPath();
                    ctx.moveTo(w*j + a, w*i);
                    ctx.lineTo(w*j + w - a, w*i);
                    ctx.quadraticCurveTo(w*j + w, w*i,w*j + w, w*i + a );
                    ctx.lineTo(w*j + w, w*i + h -a);
                    ctx.quadraticCurveTo(w*j + w, w*i + h,w*j + w - a, w*i + h);
                    ctx.lineTo(w*j + a, w*i + h);
                    ctx.quadraticCurveTo(w*j, w*i + h,w*j, w*i + h -a);
                    ctx.lineTo(w*j,w*i + a);
                    ctx.quadraticCurveTo(w*j,w*i,w*j + a,w*i);
                    ctx.closePath();
                    ctx.fill();

                    //border-bottom
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.moveTo(w*j - 1, w*i + h - 1);
                    ctx.lineTo(w*j + 1, w*i + h - 1);
                    ctx.closePath();
                    ctx.strokeStyle = "#B4BCAD";
                    ctx.stroke();

                    //border-left
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.moveTo(w*j + 1, w*i + 1);
                    ctx.lineTo(w*j + 1, w*i + h - 1);
                    ctx.closePath();
                    ctx.strokeStyle = "#682834";
                    ctx.stroke();
                    
                    //壁の影の描画
                    //影の大きさ
                    var shadow = 7;
                    ctx.fillStyle = "#4A0A16";
                    //パスを開始
                    ctx.beginPath();
					//パス開始点に移動
                    ctx.moveTo(w*j + w, w*i + h -a - shadow);
                    ctx.lineTo(w*j + w, w*i + h -a);
                    //右下の曲線
                    ctx.quadraticCurveTo(w*j + w, w*i + h,w*j + w - a, w*i + h);
                    ctx.lineTo(w*j + a, w*i + h);
                    //左下の曲線
                    ctx.quadraticCurveTo(w*j, w*i + h,w*j, w*i + h -a);
                    ctx.lineTo(w*j, w*i + h -a - shadow);
                    //左下、影の内枠の曲線
                    ctx.quadraticCurveTo(w*j, w*i + h - shadow,w*j + a, w*i + h - shadow);
                    ctx.lineTo(w*j + w - a, w*i + h - shadow);
                    //右下、影の内枠の曲線
                    ctx.quadraticCurveTo(w*j + w, w*i + h - shadow,w*j + w, w*i + h -a - shadow);
                    ctx.closePath();
					//塗りつぶし
                    ctx.fill();
                    break;
                case "."://Path
                    //マスを初期化
                	ctx.clearRect(w*j,w*i,w,h);
                    if(j== goal_array[0]&& i == goal_array[1]){//(2,1)のgoalの描画
                    	ctx.beginPath();
                        ctx.fillStyle = "#FF801E";
                        ctx.fillRect(w*goal_array[0],w*goal_array[1],w,h);
                        
                        var lw = 3;
                        ctx.fillStyle = "#E16200";
                        ctx.fillRect(w*goal_array[0] + lw,w*goal_array[1] + lw ,w - lw -3,h -lw -3);
                
                        ctx.closePath();
                    }else if(j== goal_array[2]&& i == goal_array[3]){//(1,3)のgoalの描画
                        ctx.beginPath();
                        ctx.fillStyle = "#FF801E";
                        ctx.fillRect(w*goal_array[2],w*goal_array[3],w,h);
                        
                        var lw = 3;
                        ctx.fillStyle = "#E16200";
                        ctx.fillRect(w*goal_array[2] + lw,w*goal_array[3] + lw ,w - lw -3,h -lw -3);
                
                        ctx.closePath();
                    }else{//pathの描画
                        ctx.beginPath();
                        
                        ctx.fillStyle = "#B8F2A5";
                        ctx.fillRect(w*j,w*i,w,h);
                        
                        ctx.strokeStyle = "#153B08";
                        ctx.strokeRect(w*j,w*i,w,h);
                        
                        ctx.closePath();
                    }
                    break;
                case "p"://Player                    
                    ctx.beginPath();
                    ctx.arc(w*j+w/2,w*i+w/2, w/2,0, Math.PI*2, false);
                    ctx.closePath();
                    ctx.fillStyle = "#002477";
                    ctx.fill();
                    
                    break;
                case "b"://Box
                    a = 15;
                    ctx.fillStyle = "#888888";
                    
                    ctx.beginPath();

                    ctx.moveTo(w*j + a, w*i);
                    ctx.lineTo(w*j + w - a, w*i);
                    ctx.quadraticCurveTo(w*j + w, w*i,w*j + w, w*i + a );
                    ctx.lineTo(w*j + w, w*i + h -a);
                    ctx.quadraticCurveTo(w*j + w, w*i + h,w*j + w - a, w*i + h);
                    ctx.lineTo(w*j + a, w*i + h);
                    ctx.quadraticCurveTo(w*j, w*i + h,w*j, w*i + h -a);
                    ctx.lineTo(w*j,w*i + a);
                    ctx.quadraticCurveTo(w*j,w*i,w*j + a,w*i);

                    ctx.closePath();

                    ctx.fill();
                    
                    shadow = 7;
                    ctx.fillStyle = "#6A6A6A";
                    ctx.beginPath();

                    ctx.moveTo(w*j + w, w*i + h -a - shadow);
                    ctx.lineTo(w*j + w, w*i + h -a);
                    //右下の曲線
                    ctx.quadraticCurveTo(w*j + w, w*i + h,w*j + w - a, w*i + h);
                    ctx.lineTo(w*j + a, w*i + h);
                    //左下の曲線
                    ctx.quadraticCurveTo(w*j, w*i + h,w*j, w*i + h -a);
                    ctx.lineTo(w*j, w*i + h -a - shadow);

                    //左下、影の内枠の曲線
                    ctx.quadraticCurveTo(w*j, w*i + h - shadow,w*j + a, w*i + h - shadow);
                    ctx.lineTo(w*j + w - a, w*i + h - shadow);

                    //右下、影の内枠の曲線
                    ctx.quadraticCurveTo(w*j + w, w*i + h - shadow,w*j + w, w*i + h -a - shadow);

                    ctx.closePath();

                    ctx.fill();
                    break;
                default:
                    break;
            }
        }
    }
    //クリアのチェック
    if(map[goal_array[1]][goal_array[0]] == "b" && map[goal_array[3]][goal_array[2]] == "b"){
        $("#end").css("display","inline");
        $("#sub_control").css("display","none");
        $("#side").css("display","none");
        $("#wrapper").css("opacity","0.5");
    }
    
}


/*-----------------------------------
    初期の画面にリセット
-----------------------------------*/
function Reset(){
    //初期の位置設定に戻す
    map = [
        ["*","*","*","*","*","*","*","*","*","*","*","*"],
        ["*",".","g","*","*","*","*","*","*","*","*","*"],
        ["*",".",".","*","*","*","*","*","*","*","*","*"],
        ["*","b","p",".",".","*","*","*","*","*","*","*"],
        ["*",".",".","b",".","*","*","*","*","*","*","*"],
        ["*",".",".","*","*","*","*","*","*","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","*","*","*"]
    ];

    //クリア
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#B8F2A5";
	ctx.fillRect(0,0,canvas.width,canvas.height);
    //再描画
    DrawMap();
}

/*-----------------------------------
    現在地を取得する関数
-----------------------------------*/
function CurrentMap(elememt){
    for(var i = 0;i<map.length;i++){
        for(var j = 0;j<map[i].length;j++){
            if(map[i][j]==elememt){
                var current = {x:j,y:i}; 
                return current;
            }
        }
    }
}

/*-----------------------------------
    移動後の描画
-----------------------------------*/
function NextMap(preX,preY,nextX,nextY,element){  
    //クリア
    ctx.clearRect(w*preX,h*preY,w,h);
    //移動後をpathにする
    map[preY][preX] = ".";
    //マップの要素を更新
    map[nextY][nextX] = element;
    
    //再描画
    DrawMap();
}

/*-----------------------------------
    プレイヤーの移動
-----------------------------------*/
function movePlayer(key) {
    var cur_p,next_p;
    var cur_b,next_b;
    //プレイヤーの現在地を取得
    cur_p = CurrentMap("p");
    switch(key){
        case "up":
            next_p = {x:cur_p.x,y:cur_p.y-1};
            break;
        case "down":
            next_p = {x:cur_p.x,y:cur_p.y+1};
            break;
        case "left":
            next_p = {x:cur_p.x-1,y:cur_p.y};
            break;
        case "right":
            next_p = {x:cur_p.x+1,y:cur_p.y};
            break;
        default:
            break;
    }
    if(map[next_p.y][next_p.x] != "*"){//playerの移動後,Wallと重ならない場合
        if(map[next_p.y][next_p.x] == "b"){//playerとboxが重なるとき
            //boxもキー入力に従って移動
            switch(key){
                case "up":
                    next_b = {x:next_p.x,y:next_p.y-1};
                    break;
                case "down":
                    next_b = {x:next_p.x,y:next_p.y+1};
                    break;
                case "left":
                    next_b = {x:next_p.x-1,y:next_p.y};
                    break;
                case "right":
                    next_b = {x:next_p.x+1,y:next_p.y};
                    break;
                default:
                    break;
            }
            if(map[next_b.y][next_b.x] != "*" && map[next_b.y][next_b.x] != "b"){//boxの移動後,boxとWallに重ならない場合
                //移動後のマップをセット
                NextMap(next_p.x,next_p.y,next_b.x,next_b.y,"b");
                NextMap(cur_p.x,cur_p.y,next_p.x,next_p.y,"p");
            }
        }else{
            NextMap(cur_p.x,cur_p.y,next_p.x,next_p.y,"p"); 
        }
    }
}

/*-----------------------------------
    クリックしてスタート
-----------------------------------*/
function start(){
    $("#start").css("display","none");
    $("#wrapper").css("opacity","1");
}
window.onload = function(){
    //スタート時の描画
	DrawMap();
};


