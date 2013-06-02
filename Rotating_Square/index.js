var row = 10;
var column = 10;


for(var i = 1;i<=row;i++){
    $("#wrapper").append(
            '<div id="content'+i+'"></div>'
        );
    $("#content"+i).css("display","-moz-box");
    
    for(var j = 1;j<=column;j++){
        $("#content"+i).append(
            '<div class="box"></div>'
        );
    }

}