//領域の横幅
var width = window.innerWidth;
//領域の縦幅
var height = window.innerHeight;
//行
var row = 3;
//列
var column = 3;
//プレイヤーを囲うDIV
var wrapper = $("#wrapper");
//DIVの中身
var wrapperHTML = "";
//表示する動画の数
var videolen = row * column;

//動画を埋め込むDIVを追加する
for(var i = 0;i < videolen;i++){
    wrapperHTML += "<div id='videoDiv"+i+"'>Loading...</div>";
}
wrapper.html(wrapperHTML);

//フィルター
$("#container").css("width",width,"height",height);

google.load("swfobject","2.1");

//再生開始
$("#startBtn").click(function(){
    for(var i = 0;i<videolen;i++){
        ytplayer[i].playVideo();
    }
});

//一時停止
$("#stopBtn").click(function(){
    for(var i = 0;i<videolen;i++){
        ytplayer[i].pauseVideo();
    }
});

/*-----------------------------------
    再生時間を算出する関数
-----------------------------------*/
function updateHTML(elmId, value) {
    var m = (value / 60) | 0;
    if(m < 10){
        m = "0" + String(m);
    }
    var s = (value % 60) | 0;
    if(s < 10){
        s = "0" + String(s);
    }
    //動画の長さ
    var d = ytplayer[0].getDuration();
    var dm = (d / 60) | 0;
    if(dm < 10){
        dm = "0" + String(dm);
    }
    var ds = (d % 60) | 0;
    if(ds < 10){
        ds = "0" + String(ds);
    }
    //再生時間の表示
    document.getElementById(elmId).innerHTML = m + ":" + s + " / " + dm + ":" + ds;
}

/*-----------------------------------
    再生時間を更新する関数
-----------------------------------*/
function updatePlayerInfo() {
  if(ytplayer[0] && ytplayer[0].getDuration) {
    updateHTML("videoCurrentTime", ytplayer[0].getCurrentTime());
  }
}

/*-----------------------------------
    プレーヤーの状態を表示する関数
-----------------------------------*/
function onPlayerStateChange(newState){
    console.log("newState:"+newState);
}

/*-----------------------------------
    プレイヤーの読み込み完了後、APIが呼び出す関数
-----------------------------------*/
function onYouTubePlayerReady(playerId){
    //プレイヤーapiIDを入れる配列
    ytplayer = [];
    //ビデオのロード
    //ReS40XbVlEo
    var videoID = "ZaUnruczZnw";
    
    for(var i = 0;i<videolen;i++){
        ytplayer[i] = document.getElementById("ytPlayer"+i);
        ytplayer[i].cueVideoById(videoID);
        if(i !== 0){
            ytplayer[i].mute();
        }else{
            ytplayer[i].setVolume(100);
        }
        
        ytplayer[i].seekTo(i,true);
        
        //$("#ytPlayer"+i).css("-webkit-filter","grayscale(0%) contrast(130%)");

        ytplayer[i].addEventListener("onStateChange","onPlayerStateChange");
    }
    //ループ
    setInterval(updatePlayerInfo, 1000);
    updatePlayerInfo();
}

function loadPlayer(){
    console.log("ok");
    //ビデオのロード
    //var videoID = "23wgzA1dbzA";
    //自動再生
    var autoplay = "0";
    //SWFのURL
    //var swfUrlStr = "http://www.youtube.com/v/"+videoID+"?version=3&enable&enablejsapi=1&playerapiid=player1&autoplay="+autoplay;
    var swfUrlStr = "http://www.youtube.com/apiplayer?"+
                    "version=3&enable&enablejsapi=1&playerapiid=player1&autoplay="+autoplay;    
    
    //横マージン(画面調整のため)
    var margin_W = 10;
    //縦マージン(画面調整のため)
    var margin_H = 50;
    //プレイヤーの横幅
    var widthStr = String((width/row)-margin_W);
    //プレイヤーの縦幅
    var heightStr = String((height/column)-margin_H);
    //コンテンツを表示するために必要な最低限のバージョン
    var swfVersionStr = "9";
    //SWFを高速インストールするためのURL
    var xiSwfUrlStr = null;
    //FlashVarsを名前と値の組で指定
    var flashVarsObj = null;
    //異なるドメインのスクリプト実行を許可
    var params = {allowScriptAccess:"always"};
    
    for(var i = 0;i<videolen;i++){
        //埋め込みコンテンツで置き換えられるHTML DIV ID
        var replaceElemIdStr = "videoDiv"+i;
        //埋め込みオブジェクトのid名
        var atts = {id:"ytPlayer"+i};
        //Youtubeからプレイヤーを読み込み、ページに埋め込む
        swfobject.embedSWF(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashVarsObj, params, atts);
    }
}

function _run(){
    loadPlayer();
}
google.setOnLoadCallback(_run);