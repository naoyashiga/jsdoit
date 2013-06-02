/*-----------------------------------
    グローバル変数
-----------------------------------*/
//ドラッグした要素を保存する変数
var dragSrcEl = null;

//乱数を入れる配列
var num = [];

//横の分割数
var dw = 3;
//縦の分割数
var dh = 3;

//ピースの個数
var piece = dw*dh;
/*-----------------------------------
    ドラッグ開始時
-----------------------------------*/
function handleDragStart(e){
    //ドラッグした要素を保存
    dragSrcEl = this;
    //ドラッグの種類を設定
    e.dataTransfer.effectAllowed = "move";
    //MIMEタイプを設定、データペイロードは中身のHTML
    e.dataTransfer.setData("text",this.id);
}

/*-----------------------------------
    ドラッグ要素がドロップ要素に重なっている時
-----------------------------------*/
function handleDragOver(e){
    if(e.preventDefault){
        //リンクをドラッグするときにリンク先に飛ばないようにする
        //デフォルトのアクションは実行されない
        e.preventDefault();
    }
    //ブラウザのカーソルをmoveに変更
    e.dataTransfer.dropEffect = "move";
    //ブラウザのデフォルト動作を回避
    return false;
}

/*-----------------------------------
    ドラッグ要素がドロップ要素に入った時
-----------------------------------*/
function handleDragEnter(e){
    //エフェクト用のcssを加える
    this.classList.add("effect");
}

/*-----------------------------------
    ドラッグ要素がドロップ要素から出た時
-----------------------------------*/
function handleDragLeave(e){
    //エフェクト用のcssを削除
    this.classList.remove("effect");
}

/*-----------------------------------
    ドロップ時
-----------------------------------*/
function handleDrop(e){
    if(e.stopPropagation){
        //イベント伝播をやめてDOMの起動を防ぐ
        e.stopPropagation();
    }

    if(dragSrcEl.id != this.id){//ドラッグ元とドロップ先が違うとき
        //ドラッグ元のデータを取得
        var drag_id = e.dataTransfer.getData("text");
        //ドラッグ元のCanvas要素を取得
        var drag_canvas = document.getElementById(drag_id);
        var drag_ctx = drag_canvas.getContext("2d");

        //ドラッグ先のCanvas要素を取得
        var drop_canvas = document.getElementById(this.id);
        var drop_ctx = drop_canvas.getContext("2d");

        //Canvasの横幅
        var w = drag_canvas.width;
        //Canvasの縦幅
        var h = drag_canvas.height;

        //Canvasに描画されたイメージデータを取得
        var drag_image = drag_ctx.getImageData(0,0,w,h);
        var drop_image = drop_ctx.getImageData(0,0,w,h);

        //イメージデータを交換
        drag_ctx.putImageData(drop_image,0,0);
        drop_ctx.putImageData(drag_image,0,0);

        //乱数の個数
        var len = num.length;

        //ドラッグ、ドロップした位置が配列の何番目に入っているかを取得
        for(var i = 0;i < len;i++){
            if(num[i] == parseInt(drag_id)){

                var drag_index = i;
            }else if(num[i] == parseInt(this.id)){
                var drop_index = i;
            }
        }

        //乱数の格納位置を調整を交換
        var tmp = num[drag_index];
        num[drag_index] = num[drop_index];
        num[drop_index] = tmp;
    }

    return false;
}
/*-----------------------------------
    ドラッグ終了時
-----------------------------------*/
function handleDragEnd(e){
    [].forEach.call(cols,function(col){
        //指定された要素からcssを削除
        col.classList.remove("effect");
    });
}
//設定されたクラス名を持つ要素を配列で取得
var cols = document.querySelectorAll("#columns .column");
//配列colsの要素すべてに対して実行  
[].forEach.call(cols,function(col){
    //第3引数がfalse:親要素からルートオブジェクトへイベントが伝播
    col.addEventListener("dragstart",handleDragStart,false);
    col.addEventListener("dragenter",handleDragEnter,false);
    col.addEventListener("dragover",handleDragOver,false);
    col.addEventListener("dragleave",handleDragLeave,false);
    col.addEventListener("drop",handleDrop,false);
    col.addEventListener("dragend",handleDragEnd,false);
});

/*-----------------------------------
    ビデオフレームを描画
-----------------------------------*/
function cap(){
    //Canvas要素
    var canvas = document.getElementById("world");
    var ctx = canvas.getContext("2d");

    //ビデオ要素
    var video = document.getElementById("video");

    //canvasの横幅を設定
    var w = canvas.width = video.width = 360*2;
    //canvasの縦幅を設定
    var h = canvas.height = video.height = 270*2; 
  
    //ビデオフレームを描画
    ctx.drawImage(video,0,0,w,h);
    
    //パズル作成
    CreatePuzzle(ctx,w,h);
    //canvasを初期化
    ctx.clearRect(0,0,w,h);
    
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
            //ストリームをビデオをに流し込む
            video.src = stream;
            //ビデオを再生
            video.play();
        },errBack);
    }else if(navigator.webkitGetUserMedia){
        navigator.webkitGetUserMedia(videoObj,function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        },errBack);
    }
    
    //ビデオフレームを秒が
    cap();
}
window.onload = function(){
    //乱数生成
    Make_Rnd();
    //メイン関数
    init();
};

/*-----------------------------------
    重複なしの乱数を生成
-----------------------------------*/
function Make_Rnd(){
    for(var i = 0;i < piece;i++){
        //0~8の乱数を発生させる
        num[i] = Math.random()* piece | 0;
        //乱数の重複チェック
        for(var j = 0;j<i;j++){
            //乱数が重複した
            if(num[j] == num[i]){
                i--;
                break;
            }
        }
    }
}

/*-----------------------------------
    パズルの初期位置を設定
-----------------------------------*/
function CreatePuzzle(ctx,w,h){
    //1つのピースの横幅
    w = w / dw;
    //1つのピースの縦幅
    h = h / dh;

    //パズルの座標
    var pattern = 
        [[0,0],[0,1],[0,2]
        ,[1,0],[1,1],[1,2]
        ,[2,0],[2,1],[2,2]];

    //ImageDataを入れる配列
    var imageData = [];

    //元のImageDataを取得
    for(var i = 0;i< dh;i++){
        for(var j = 0;j< dw;j++){
            //乱数を取得
            var rnd = num[j+i*dw];
            imageData[rnd] = ctx.getImageData(w*j,h*i,w,h);
        }
    }

    //指定したクラス名のCanvasを取得
    var canvas_array = document.getElementsByClassName("column");
    //Canvasが入った配列の長さ
    var canvas_len = canvas_array.length;
    //Canvasが入る配列
    var ctx_array = [];

    for(var i = 0;i< canvas_len;i++){
        //2Dコンテキストに定義
        ctx_array[i] = canvas_array[i].getContext("2d");
        //canvasの横幅を設定
        canvas_array[i].width = w;
        //canvasの縦幅を設定
        canvas_array[i].height = h; 
        //移動後のピースを描画
        ctx_array[i].putImageData(imageData[i],0,0);
    }   
}
