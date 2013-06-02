$(function(){
	$.ajax({
		type:"GET",
		url:"http://www.flickr.com/services/rest/",
		data:{
			format:"json",
			method:"flickr.photos.search",//実行メソッド名
			api_key:"93615ad325c02d522cd022b4426f6dbc",//API KEY
			//text:"beatles",
			group_id:"88364874@N00",
			per_page:"1000"//取得件数
		},
		dataType:"jsonp",
		jsonp:"jsoncallback",
		success:getFlickrPhotos//成功した時の処理
	});
});

function getFlickrPhotos(data){
	var dataStat = data.stat;
	var dataTotal = data.photos.total;

	if(dataStat == "ok"){
		$("#viewer").append("<ul></ul>");
		$.each(data.photos.photo,function(i,item){
			var itemFarm = item.farm;
			var itemServer = item.server;
			var itemID = item.id;
			var itemOwner = item.owner;
			var itemSecret = item.secret;
			var itemTitle = item.title;
			var size = "s";
			var itemLink = "http://www.flickr.com/photos/"+ itemOwner +"/" + itemID + "/";
			var itemPath = "http://farm" + itemFarm + ".static.flickr.com/" + itemServer + "/" + itemID + "_" + itemSecret + "_" + size +".jpg";
			var flickrSrc = "<img src='" + itemPath + "' alt='" + itemTitle + "'>";
			//var htmlSrc = "<li><a href='" + itemLink + "'target='_blank'>" + flickrSrc + "</a></li>";
			var htmlSrc = "<li>"+ flickrSrc + "</li>";
			$("#viewer ul").append(htmlSrc);
		});
	}else{
		console.log("fail");
	}
}