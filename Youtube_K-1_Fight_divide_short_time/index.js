//領域の横幅
var width = window.innerWidth;
//領域の縦幅
var height = window.innerHeight;
//行
var row = 4;
//列
var column = 4;
//プレイヤーを囲うDIV
var wrapper = $("#wrapper");
//DIVの中身
var wrapperHTML = "";
//表示する動画の数
var videolen = row * column;
//チェッカー
var playChecker = 1;

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
    ボリュームを調整する関数
-----------------------------------*/
function SoundControl(v){
    ytplayer[0].setVolume(v);
}
/*-----------------------------------
    再生時間を算出する関数
-----------------------------------*/
function updateHTML(elmId, value) {
    //分
    var m = (value / 60) | 0;
    //秒
    var s = (value % 60) | 0;
    if(m < 10){
        m = "0" + String(m);
    }
    if(s < 10){
        s = "0" + String(s);
    }
    
    //動画の長さ
    var d = ytplayer[0].getDuration();
    //分
    var dm = (d / 60) | 0;
    //秒
    var ds = (d % 60) | 0;
    if(dm < 10){
        dm = "0" + String(dm);
    }
    
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
var time = 0;
/*-----------------------------------
    再生タイミングを調整する関数
-----------------------------------*/
function ControlVideo(){
    for(var i = 0;i<videolen;i++){
        if(i == (playChecker%videolen)){
            //再生位置までシーク
            ytplayer[i].seekTo(480 + time,true);
            //再生
            ytplayer[i].playVideo();
            //音量ON
            ytplayer[i].setVolume(100);
        }else{
            //一時停止
            ytplayer[i].pauseVideo();
        }
    }

    playChecker++;
    time += videolen;
}
/*-----------------------------------
    プレイヤーの読み込み完了後、APIが呼び出す関数
-----------------------------------*/
function onYouTubePlayerReady(playerId){
    //プレイヤーapiIDを入れる配列
    ytplayer = [];
    //ビデオのロード
    var videoID = "T_W9MCjegfI";
    
    for(var i = 0;i<videolen;i++){
        ytplayer[i] = document.getElementById("ytPlayer"+i);
        ytplayer[i].cueVideoById(videoID);
        
        
        if(i !== 0){
            //ミュート
            ytplayer[i].mute();
        }else{
            //音量調整
            ytplayer[i].setVolume(100);
        }
        //初回の再生位置
        ytplayer[i].seekTo(480 + i,true);
        

        ytplayer[i].addEventListener("onStateChange","onPlayerStateChange");
    }
    //ループ
    setInterval(updatePlayerInfo, 1000);
    updatePlayerInfo();
    
    //(動画の数)秒ごとに実行
    setInterval(ControlVideo,1000 * videolen);
}

function loadPlayer(){
    //自動再生
    var autoplay = "0";
    //SWFのURL
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