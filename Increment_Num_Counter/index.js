function disp(i){
		var num = document.getElementById("num").value;
		
		if(i<num){
			i++;
			document.getElementById("counter").innerHTML = i;
			
			setTimeout("disp("+i+")",1);
		}
}
</script>
