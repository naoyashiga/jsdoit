var base_w = window.innerWidth / 2;
var base_h = window.innerWidth / 2;

for(var i = 0;i < 1;i++){
    $("#wrapper").append("<div class='box spin'"+i+"></div>");
    //$(".box").css("-webkit-animation","spin "+i+"s linear infinite")
    //$(".spin"+i).css("-webkit-animation","spin "+i+"s linear infinite");
}

var w = $(".box").width();
var h = $(".box").height();

$(".box").css("top",base_w - w/2);
$(".box").css("left",base_h - h/2);

