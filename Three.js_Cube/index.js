//描画領域の横幅
var width = 300;
//描画領域の縦幅
var height = 480;
//画角
var fov = 40;
//縦横比
var aspect = width/height;
//クリッピング手前
var near = 1;
//クリッピング奥
var far = 1000;
//ジオメトリーの横幅
var geo_width = 100;
//ジオメトリーの縦幅
var geo_height = 100;
//ジオメトリーの奥行き
var geo_depth = 100;

//立方体ジオメトリー作成
var geometry = new THREE.CubeGeometry(geo_width,geo_height,geo_depth);
//テクスチャに画像を取り込む
var texture = new THREE.ImageUtils.loadTexture("http://jsrun.it/assets/3/O/z/V/3OzVQ.jpg");
//マテリアル表現をランバート反射表現に設定
var material = new THREE.MeshLambertMaterial({map:texture});
//立方体と材質を結びつけてメッシュを作成
var mesh = new THREE.Mesh(geometry,material);
//メッシュを回転
mesh.rotation = {x:0.5,y:0.5,z:0};

//カメラ作成
var camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
//カメラの位置はz軸の-400
camera.position.z = -400;
//メッシュの位置にカメラを向ける
camera.lookAt(mesh.position);

//シーン作成
var scene = new THREE.Scene();
//シーンにメッシュ追加
scene.add(mesh);

var light = new THREE.DirectionalLight(0xffffff,1.5);
light.position = {x: 0, y: 0.2, z: -1};
scene.add(light);

//WebGLレンダラーを作成
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);

var mousedown = false;

//マウスクリック時の処理
renderer.domElement.addEventListener("mousedown",function(e){
	mousedown = true;
    //ポインタの現在位置を保持
	prevPosition = {x: e.pageX,y: e.pageY};
},false);

//マウスポインタを移動した時の処理
renderer.domElement.addEventListener("mousemove",function(e){
	if(!mousedown)return;
    //移動距離を計算
	moveDistance = {x: prevPosition.x - e.pageX,y:prevPosition.y - e.pageY};
    //移動距離に合わせてメッシュを回転
	mesh.rotation.x += moveDistance.y * 0.01;
	mesh.rotation.y -= moveDistance.x * 0.01;
    //ポインタの現在位置を更新
	prevPosition = {x:e.pageX,y:e.pageY};
    //描画
	render();
},false);

//マウスクリック終了時の処理
renderer.domElement.addEventListener("mouseup",function(e){
	mousedown = false;
},false);

function render(){
	//sceneをcameraでまわす
	renderer.render(scene,camera);
}

window.onload = function () {
	document.getElementById("wrapper").appendChild(renderer.domElement);
	render();
};
