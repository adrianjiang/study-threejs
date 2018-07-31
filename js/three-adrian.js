var Demo = {}

var ThreeAdrian = {}
ThreeAdrian._lookAt = [0,0,0]
// 初始化镜头
ThreeAdrian.init_camera = function() {
	var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, .1, 1000);
	camera.position.set(70, 100, 30);
	camera.lookAt(0, 0, 0);//将相机快门的位置设置为场景的位置
	this.camera = camera
	return camera
}
ThreeAdrian.camera_position_add = function(type, num) {

	ThreeAdrian.camera.position[type] += num
	ThreeAdrian.camera.lookAt(ThreeAdrian._lookAt[0], ThreeAdrian._lookAt[1], ThreeAdrian._lookAt[2]);

	this.render()
}
ThreeAdrian.camera_position_set = function(x,y,z) {

	ThreeAdrian.camera.position.set(x,y,z);
	ThreeAdrian.camera.lookAt(ThreeAdrian._lookAt[0], ThreeAdrian._lookAt[1], ThreeAdrian._lookAt[2]);

	this.render()
}
// 初始化场景
ThreeAdrian.init = function() {
	var scene = new THREE.Scene();
	this.scene = scene
	var renderer = new THREE.WebGLRenderer();
	this.renderer = renderer
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.left = 0
	renderer.domElement.style.top = 0


	document.body.appendChild( renderer.domElement );
	// renderer.setClearColor(0xFFFFFF, 1.0);
	return scene
}

ThreeAdrian.init_spotLight = function() {
	spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.position.set(50, 50, 100);
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
			// x y 香蕉平面
			let line0 = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } ) );
			line0.position.y = ( i * 10 ) - 100;
			ThreeAdrian.scene.add( line0 );

			let line_xy_x = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } ) );
			line_xy_x.position.x = ( i * 10 ) - 100;
			line_xy_x.rotation.z = 90 * Math.PI / 180;

			ThreeAdrian.scene.add( line_xy_x );

			// x z 相交平面
      let line1 = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x00ff00, opacity: 0.2 } ) );
      line1.position.z = ( i * 10 ) - 100;
      ThreeAdrian.scene.add( line1 );

      let line2 = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x00ff00, opacity: 0.2 } ) );
      line2.position.x = ( i * 10 ) - 100;
      line2.rotation.y = 90 * Math.PI / 180;
      ThreeAdrian.scene.add( line2 );

			// y z相交平面
			let line3 = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x0000ff, opacity: 0.2 } ) );
      line3.position.y = ( i * 10 ) - 100;
			line3.rotation.y = 90 * Math.PI / 180;
			ThreeAdrian.scene.add( line3 );

			// y z相交平面
			let line_yz_z = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x0000ff, opacity: 0.2 } ) );
      line_yz_z.position.z = ( i * 10 ) - 100;
			line_yz_z.rotation.z = 90 * Math.PI / 180;

			ThreeAdrian.scene.add( line_yz_z );
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
	ThreeAdrian.camera_position_set(100,100,100)
}



// 性能监控

ThreeAdrian.stats = function() {
	var stats = new Stats();
	stats.setMode(1); // 0: fps, 1: ms
	// 将stats的界面对应左上角
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = '10';

	document.body.appendChild( stats.domElement );
	setInterval( function () {
			stats.begin();
			// 你的每一帧的代码
			stats.end();
	}, 1000 / 60 );
	this.stats = stats
}

// 画个球
ThreeAdrian.create_ball = function() {
	var radius = 8, segemnt = 16, rings = 16;
	var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius,segemnt,rings), sphereMaterial );

  sphere.geometry.verticesNeedUpdate = true;
  sphere.geometry.normalsNeedUpdate = true;
	sphere.position.set(20,20,80)
	ThreeAdrian.scene.add(sphere);
	ThreeAdrian.render()
	return sphere
}






ThreeAdrian.init_renderScene = function() {
	//创建控件并绑定在相机上
	trackballControls = new THREE.TrackballControls(ThreeAdrian.camera);
	trackballControls.rotateSpeed = 1.0;
	trackballControls.zoomSpeed = 1.0;
	trackballControls.panSpeed = 1.0;
	trackballControls.noZoom=false;
	trackballControls.noPan=false;
	trackballControls.staticMoving = true;
	trackballControls.dynamicDampingFactor = 0.3;

	this.renderScene();
}


ThreeAdrian.renderScene = function(){
	var clock = new THREE.Clock()
	var delta = clock.getDelta()
	trackballControls.update(delta)

	ThreeAdrian.stats.update();

	requestAnimationFrame(ThreeAdrian.renderScene);
	ThreeAdrian.render();
}



Demo.tween = function() {
	function initTween(){
	    new TWEEN.Tween( ball.position)
	            .to( { z: -100 }, 3000 ).repeat( Infinity ).yoyo().start();
	}

	function animation(){
	    ThreeAdrian.render();
	    requestAnimationFrame(animation);
	    ThreeAdrian.stats.update();
	    TWEEN.update();
	}
	initTween()
	animation()
}

Demo.load_3dfile = function() {

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};


	var loader = new THREE.OBJMTLLoader();
	loader.load('models/demo/tank.obj', 'models/demo/tank.mtl', function (object) {
			// cosnole.log('')
			object.position.y =0;                //   0 ̹��tank     -0.6  ����LQ
			ThreeAdrian.scene.add(object);

			// var start = new Date().getTime(), delta;
			// (function anime() {
			// 		delta = new Date().getTime() - start;
			// 		object.rotation.y = delta / 1000;
			// 		renderer.render(scene, camera);
			// 		return requestAnimationFrame(anime);
			// })();
	}, onProgress, onError );

}
