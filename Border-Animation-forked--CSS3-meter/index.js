// forked from ksk1015's "forked: CSS3 meter" http://jsdo.it/ksk1015/uiBK
// forked from naoyashiga's "CSS3 meter" http://jsdo.it/naoyashiga/gO2d
var border_style = ["solid",
                    "double",
                    "dashed",
                    "dotted"];

for(var i = 0;i < border_style.length;i++){
    $("#wrapper").append("<div class='meter'><div class='"+border_style[i]+"'></div></div><div class='meter_right'><div class='"+border_style[i]+"'></div></div>");
}