$(function(){
    /*
	var conn;

	var peer = new Peer({key: 'xmnhid902g3krzfr',debug:true});

	peer.on("open",function(id){
		$("#pid").text(id);
	});

	peer.on("connection",connect);

	function connect(c){
		//チャットエリアの表示
		$("#chat_area").show();

		conn = c;

		$("#messages").empty().append("Now chatting with" + conn.peer);

		conn.on("data",function(data){
			$("#messages").append("<br>"+ conn.peer + ":<br>" + data);
		});

		conn.on("close",function(err){
			console.log(conn.peer + "has left the chat.");
		});
	}

	$(document).ready(function(){
		$("#connect").click(function(){
			//相手のkeyを取得
			var c = peer.connect($("#rid").val());
			c.on("open",function(){
				connect(c);
			});
			//エラー処理
			c.on("error",function(err){
				alert(err);
			});
		});

		$("#send").click(function(){
			var msg = $("#text").val();
			conn.send(msg);
			$("#messages").append("<br>You:<br>" + msg);
			$("#text").val("");
		});
	});
    */
	/*-----------------------------------
		クエリから検索URLを生成
	-----------------------------------*/
	function SearchQuery(query){
		var url = "http://wikipedia.simpleapi.net/api?keyword="+query+"&output=json";
		callJSONP(url);
	}
	/*-----------------------------------
		APIからJSONを受け取る
	-----------------------------------*/
	function callJSONP(URL){
		$.ajax({
			url:URL,
			dataType:"jsonp",
			jsonp:"callback",
			contentType:"application/json",
			success:function(data){//コールバック関数
				console.log("success");
				$("#wiki_list").append("<li>"+data[0].title+"</li>");
				$("#wiki_list").append("<p>"+data[0].body+"</p>");

				console.log("URL:"+URL);
				console.log(data[0].url);
				console.log(data[0].body);
			},
			error:function(data){
				console.log("Error");
			}
		});
	}
	//最終結果を入れる文字列
	var final_transcript = "";

	var final_span = document.getElementById("final_span");
	var interim_span = document.getElementById("interim_span");

	//音声認識
	var recognition = new webkitSpeechRecognition();
	//連続して認識
	recognition.continuous = true;
	//修正しながら認識する
	recognition.interimResults = true;
	//認識開始
	recognition.start();

	//認識開始ハンドラ
	/*
	recognition.onstart = function(){
		recognizing =true;
	};
	*/
	//最終結果のカタカナを入れる配列
	var final_katakana =[];
	//認識結果ハンドラ
	recognition.onresult = function(event) {
		console.log(event);
		//認識中の語を初期化
		var interim_transcript = "";
		//console.log(event);
		for(var i = event.resultIndex;i < event.results.length;i++){
			//認識した文字列
			var str = event.results[i][0].transcript;

			//認識確定の場合
			if(event.results[i].isFinal){
				final_transcript += str;
				//認識文字列からスペースを除去
				var s = str.replace(" ","");
				//カタカナの有無
				if(s.match(/[ァ-ヶー]+/)){
					//該当したカタカナを配列で返す
					var array = s.match(/[ァ-ヶー]+/g);
					console.log(final_katakana);
					for(var j = 0;j < array.length;j++){
						//カタカナに重複の有無
						if(final_katakana.indexOf(array[j]) == -1){
							//conn.send(array[j]);
							final_katakana.push(array[j]);
							$("#katakana").append("<li>"+array[j]+"</li>");
							SearchQuery(array[j]);
						}else{
							console.log("カタカナの重複がありました");
						}
						
					}
				}
			}else{//認識中の場合
				interim_transcript += str;
			}
		}
		final_span.innerHTML = final_transcript;
		interim_span.innerHTML = interim_transcript;
	};

	
	
	/*
	function startButton(){
		//認識開始
		recognition.start();
	}
	*/

	

});
