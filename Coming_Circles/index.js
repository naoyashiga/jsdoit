var row = 3;
var z_row = 10;
var column = 3;

for(var i = 1;i<=row;i++){
    for(var j = 1;j<=column;j++){
    	for(var k = 1;k<=z_row;k++){
	        $("#cube").append(
	          '<div class="circle front-'+i+'-'+j+'-'+k+'"></div>'
	        );
	        
	    }
	    
    }
}