var border_style = ["none",
                    "solid",
                    "double",
                    "groove",
                    "ridge",
                    "inset",
                    "outset",
                    "dashed",
                    "dotted"];

for(var i = 0;i < border_style.length;i++){
    $("#wrapper").append("<div class='box border-"+i+"'>"+border_style[i]+"</div>");
}