var row = 6;
var z_row = 6;
var column = 12;

for(var i = 1;i<=row;i++){
    for(var j = 1;j<=column;j++){
    	for(var k = 1;k<=z_row;k++){
	        $("#cube").append(
	          '<div class="circle front-'+i+'-'+j+'-'+k+'"></div>'
	        );
	        
	    }
	    $("#cube").append(
	          '<div class="circle back-'+i+'-'+j+'"></div>'
        );
    }
}