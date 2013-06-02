/*-----------------------------------
    キャレット位置の移動
-----------------------------------*/
function getCaretPosition(obj,cur_pos){
	//obj.focus();
	//カーソルの位置
	obj.setSelectionRange(cur_pos,cur_pos);
}
/*-----------------------------------
    テキスト選択
-----------------------------------*/
function TextSelector(obj,cur_pos){
	//obj.selectionDirection = "forward";
	//選択範囲の起点
    var pos = obj.selectionEnd;
    if(pos<cur_pos){//右方向へ選択
        pos = obj.selectionStart;
        console.log("start:"+pos);
        //始点から現在地まで選択
    	obj.setSelectionRange(pos,cur_pos);
    }else{//左方向へ選択
        pos = obj.selectionEnd;
        console.log("end:"+pos);
        //現在地から終点まで選択
    	obj.setSelectionRange(cur_pos,pos);
    }
	
}

/*-----------------------------------
    キャレット位置を関数に投げる
-----------------------------------*/
function ChangeCaret(cur_pos){
	//選択にチェック
	if($('#selector').is(':checked')){

		TextSelector($("#txtarea1").get(0),cur_pos);
	}else{//移動にチェック
		getCaretPosition($("#txtarea1").get(0),cur_pos);
	}
	
}

/*-----------------------------------
    キャレット位置調整バーの幅を文字数に合わせる
-----------------------------------*/
function getEndPosition(){
	//終端の位置
	var len = $("#txtarea1").get(0).value.length;
	//キャレット位置調整バーの幅を文字数に合わせる
	$("#range").attr("max",len);
}

/*
function getRows(){
	//文字列
	var str = $("#txtarea1").get(0).value;
	
    $("#rows").get(0).value = str.replace(/\r\n?/g,"\n").split("\n").length;
}

function getCols(){
	//終端の位置
	var len = $("#txtarea1").get(0).value.length;
	//キャレット位置調整バーの幅を文字数に合わせる
	$("#range").attr("max",len);
}
*/
window.onload = function(){
	getEndPosition();
    //getRows();
};
