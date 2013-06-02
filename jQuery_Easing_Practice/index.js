var easing = "easeInBack";
var easing = [
    "linear",
    "swing",
    "jswing",
    "easeInQuad",
    "easeOutQuad",
    "easeInOutQuad",
    "easeInCubic",
    "easeOutCubic",
    "easeInOutCubic",
    "easeInQuart",
    "easeOutQuart",
    "easeInOutQuart",
    "easeInQuint",
    "easeOutQuint",
    "easeInOutQuint",
    "easeInSine",
    "easeOutSine",
    "easeInOutSine",
    "easeInExpo",
    "easeOutExpo",
    "easeInOutExpo",
    "easeInCirc",
    "easeOutCirc",
    "easeInOutCirc",
    "easeInElastic",
    "easeOutElastic",
    "easeInOutElastic",
    "easeInBack",
    "easeOutBack",
    "easeInOutBack",
    "easeInBounce",
    "easeOutBounce",
    "easeInOutBounce"
];

for(var i = 0;i < easing.length;i++){
    $("#wrapper").append("<div class='box'></div>");
}
$("#startBtn").click(function(){
    for(var i = 0;i < easing.length;i++){
        $(".box").eq(i).animate({
            "marginLeft": window.innerWidth / 2 + "px"
        },3000,easing[i]);
    }
});

$("#stopBtn").click(function(){
    for(var i = 0;i < easing.length;i++){
        $(".box").eq(i).stop();
    }
});

$("#defaultBtn").click(function(){
    for(var i = 0;i < easing.length;i++){
        $(".box").eq(i).stop();
        $(".box").eq(i).css("marginLeft","0px");
    }
});
/*
$(".box").hover(
    function(){
        $(this).animate({
            "marginLeft": window.innerWidth / 2 + "px"
        },1000,easing);
    },
    function(){
        $(this).animate({
            "marginLeft":"0px"
        },1000,easing);
    }
);
*/
