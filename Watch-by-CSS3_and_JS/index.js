function disp(){
		var now = new Date();
		var watch1 = now.toLocaleTimeString();
		document.getElementById("time").innerHTML = watch1;		
		setTimeout("disp()",1000);
}