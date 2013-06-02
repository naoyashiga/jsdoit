//領域の横幅
var width = window.innerWidth;
//領域の縦幅
var height = window.innerHeight;
//行
var row = 1;
//列
var column = 1;
//プレイヤーを囲うDIV
var wrapper = $("#wrapper");
//DIVの中身
var wrapperHTML = "";
//表示する動画の数
var videolen = row * column;
//チェッカー
var playChecker = 1;
//相対時間
var relative_time;
//再生フラグ
var playFlag = 1;

//動画を埋め込むDIVを追加する
for(var i = 0;i < videolen;i++){
    wrapperHTML += "<div id='videoDiv"+i+"'>Loading...</div>";
}
wrapper.html(wrapperHTML);

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
    フィルターを作成する関数
-----------------------------------*/
function CreateFilter(){
    $("#wrapper").append("<div id='thumbnail_filter'></div>");

    $("#thumbnail_filter").css({"position":"absolute",
                                "top":$("#ytPlayer0").offset().top + $("#ytPlayer0").height()*(1 - 0.775),
                                "left":$("#ytPlayer0").offset().left,
                                "width":$("#ytPlayer0").width(),
                                "height":$("#ytPlayer0").height()*0.55,
                                "background":"#ff0",
                                "opacity":"0.2"
                               });
    
    $("#thumbnail_filter").mousemove(CalPosition);
    $("#thumbnail_filter").click(PlayMovie);
}

/*-----------------------------------
    再生位置を計算する関数
-----------------------------------*/
function CalPosition(e){
    console.log(e);
    if(playFlag == 1){
        //要素内で左端から何%の位置にあるか
        var ratio = (e.pageX - e.target.offsetLeft) / e.target.clientWidth;
        //四捨五入
        ratio = (ratio * 100) | 0;
        //再生時間トータルから見て何%の時刻か
        relative_time = ytplayer[0].getDuration() * ratio / 100;
        //サムネイルの数(最大100個)
        var thumnail_num = 10;
        
        if(ratio % thumnail_num == 0){
            //サムネイルを取得
            GetThumbnail(relative_time);
        }
    }
}

/*-----------------------------------
    動画を先頭から再生する関数
-----------------------------------*/
function PlayMovie(){
    //一時停止
    ytplayer[0].pauseVideo();
    //先頭まで動画をシーク
    ytplayer[0].seekTo(0,true);
    //再生
    ytplayer[0].playVideo();
    
    //フラグ更新
    playFlag = -1;
}
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

/*-----------------------------------
    サムネイルを取得する関数
-----------------------------------*/
function GetThumbnail(time){
    //一時停止
    ytplayer[0].pauseVideo();
    //指定時間まで動画をシーク
    ytplayer[0].seekTo(time,true);
}
/*-----------------------------------
    プレイヤーの読み込み完了後、APIが呼び出す関数
-----------------------------------*/
function onYouTubePlayerReady(playerId){
    //プレイヤーapiIDを入れる配列
    ytplayer = [];
    //ビデオのロード
    var videoID = "ReS40XbVlEo";
    
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
    //プレーヤーの状態を取得
    setInterval(updatePlayerInfo, 1000);
    updatePlayerInfo();
    
    ytplayer[0].pauseVideo();
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
    
    console.log("width:"+ widthStr + "height:" + heightStr);
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
    
    //サムネイルフィルター作成
    CreateFilter();
}

function _run(){
    loadPlayer();
}
google.setOnLoadCallback(_run);