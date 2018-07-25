

var ThreeAdrian = {}
ThreeAdrian._lookAt = 
// 初始化镜头
ThreeAdrian.init_camera = function() {
	var camera = new THREE.PerspectiveCamera(130, window.innerWidth / window.innerHeight, .1, 1000);
	camera.position.set(-70, 100, 30);
	camera.lookAt(0, 0, 0);//将相机快门的位置设置为场景的位置
	this.camera = camera
	return camera
}
ThreeAdrian.camera_position_add = function(type, num) {

	ThreeAdrian.camera.position[type] += num
	this.render()
}
ThreeAdrian.camera_position_set = function(x,y,z) {

	ThreeAdrian.camera.position.set(x,y,z);

	this.render()
}
// 初始化场景
ThreeAdrian.init = function() {
	var scene = new THREE.Scene();
	this.scene = scene
	var renderer = new THREE.WebGLRenderer();
	this.renderer = renderer
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	// renderer.setClearColor(0xFFFFFF, 1.0);
	return scene
}

ThreeAdrian.init_spotLight = function() {
	spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 2048;
	spotLight.shadow.mapSize.height = 2048;
	this.spotLight = spotLight
	this.scene.add(spotLight);
}

ThreeAdrian.render = function () {
	this.renderer.render(this.scene, this.camera)
}
ThreeAdrian.example = {
	create_plane: function() {

		var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
		//材质
		var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
		//生成平面体
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		//打开阴影效果
		plane.receiveShadow = true;
		//设置平面体的位置
		plane.position.set(16, 0, 0)
		//设置平面体的旋转
		plane.rotation.x = -.5 * Math.PI;
		//将平面体加入到场景中
		ThreeAdrian.scene.add(plane);
		this.plane = plane
		return plane
	}
}

function draw_coordinate() {
	ThreeAdrian.init()
	ThreeAdrian.init_camera()
	ThreeAdrian.init_spotLight()
	ThreeAdrian.example.create_plane()
	var geometry = new THREE.Geometry();
	geometry.vertices.push( new THREE.Vector3( - 100, 0, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 100, 0, 0 ) );



	for ( var i = 0; i <= 20; i ++ ) {

      var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } ) );
      line.position.z = ( i * 10 ) - 100;
      ThreeAdrian.scene.add( line );

      var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } ) );
      line.position.x = ( i * 10 ) - 100;
      line.rotation.y = 90 * Math.PI / 180;
      ThreeAdrian.scene.add( line );

  }

	// 画x轴
	let line_x = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 0.2 } ) );
	ThreeAdrian.scene.add( line_x );
	// 画y轴
	let line_y = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 0.2 } ) );
	line_y.rotation.y = 90 * Math.PI / 180;
	ThreeAdrian.scene.add( line_y );
	// 画z轴
	let line_z = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 0.2 } ) );
	line_z.rotation.z = 90 * Math.PI / 180;
	ThreeAdrian.scene.add( line_z );

	ThreeAdrian.render()
}
