//基準となる円の横幅、縦幅をウィンドウサイズの半分にする
var base_w = window.innerWidth / 2;
var base_h = window.innerWidth / 2;


for(var i = 0;i < 10;i++){
    $("#wrapper").append("<div class='circle"+i+" sub-border'></div>");
    //今回の横幅を設定
    $(".circle"+i).css("width",base_w - 40 * i);
    //今回の縦幅を設定
    $(".circle"+i).css("height",base_h - 40 * i);
    //今回の横幅
    var cur_w = $(".circle"+i).width() / 2;
    //前回の縦幅
    var cur_h = $(".circle"+i).height() / 2;
    
    if(i !== 0){
        //前回の横幅
        var pre_w = $(".circle"+(i-1)).width() / 2;
        //前回の縦幅
        var pre_h = $(".circle"+(i-1)).height() / 2;
        //前回の位置
        var pre_top = $(".circle"+(i-1)).position().top;
        var pre_left = $(".circle"+(i-1)).position().left;
        
 
        $(".circle"+i).css("top",pre_top + pre_h - cur_h);
        $(".circle"+i).css("left",pre_left + pre_w - cur_w);
        
        
    }else{//初回        
        $(".circle"+i).css("top",base_w - cur_h);
        $(".circle"+i).css("left",base_h - cur_w);
    }
    
    $(".circle"+i).css("-webkit-animation","spin "+(i+1)*1.5+"s infinite linear");
    $(".circle"+i).css("-moz-animation","spin "+(i+1)*1.5+"s infinite linear");
    $(".circle"+i).css("-o-animation","spin "+(i+1)*1.5+"s infinite linear");
    $(".circle"+i).css("-ms-animation","spin "+(i+1)*1.5+"s infinite linear");
}