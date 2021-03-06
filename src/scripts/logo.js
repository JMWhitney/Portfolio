function isMobile() {
	//Browser says it's mobile
  if (navigator.userAgent.match(/Mobi/)) {
    return true;
  }
  //Small screen size
  if ('screen' in window && window.screen.width < 900) {
    return true;
  }
	//On mobile network
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection && connection.type === 'cellular') {
    return true;
  }

  return false;
}

if(!isMobile()) {
	var ThreeJS = document.createElement('script');
	ThreeJS.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.min.js";
	ThreeJS.onload = function() {
		//Limit webgl contexts
		var Singleton = (function() {
			var instance;
	
			function createInstance() {
				var object = new THREE.WebGLRenderer( { antialias: true } );
				return object
			}
	
			return {
				getInstance: function() {
					if (!instance) {
						instance = createInstance();
					}
					return instance;
				}
			};
		})();
	
		(function init() {
			var container = document.getElementById('logo');
			var containerWidth = container.clientWidth;
			var containerHeight = container.clientHeight;
			var scene = new THREE.Scene();
			var clock = new THREE.Clock();
	
			// initialize objects
			var Light1 = getPointLight(2.5, 0x25BD84);
			var Light2 = getPointLight(2.5, 0x961371);
	
			var objectMaterial = getMaterial('lambert', 'rgb(255, 255, 255)');
			var solid = getIso(objectMaterial, 1);
			solid.name = 'solid';
	
			//Construct group object
	
			// manipulate objects
			Light1.position.x = 60;
			Light1.position.y = 60;
			Light1.position.z = 60;
			Light2.position.x = -60;
			Light2.position.y = -60;
			Light2.position.z = -60;
	
			// add objects to the scene
			scene.add(solid);
			scene.add(Light1);
			scene.add(Light2);
	
			// camera
			var camera = new THREE.PerspectiveCamera(
				45, // field of view
				containerWidth / containerHeight, // aspect ratio
				.1, // near clipping plane
				5 // far clipping plane
			);
			camera.position.z = 0;
			camera.position.x = 0;
			camera.position.y = 3.3;
			camera.lookAt(new THREE.Vector3(0, 0, 0));
	
			// renderer
			var renderer = Singleton.getInstance();
			renderer.setSize(containerWidth, containerHeight);
			renderer.shadowMap.enabled = true;
			container.appendChild(renderer.domElement);
	
			update(renderer, scene, camera, clock);
	
			return scene;
		})();
	
		function getMaterial(type, color) {
			var selectedMaterial;
			var materialOptions = {
				color: color === undefined ? 'rgb(255, 255, 255)' : color,
				wireframe: true,
			};
	
			switch (type) {
				case 'basic':
					selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
					break;
				case 'lambert':
					selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
					break;
				case 'phong':
					selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
					break;
				case 'standard':
					selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
					break;
				default: 
					selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
					break;
			}
	
			return selectedMaterial;
		}
	
		function getIso(material, size) {
			var geometry = new THREE.IcosahedronGeometry(size, 0);
			var obj = new THREE.Mesh(geometry, material);
			return obj;
		}
	
		function getPointLight(intensity, color) {
			var light = new THREE.PointLight(color, intensity);
			return light;
		}
	
		function update(renderer, scene, camera, clock) {
			var elapsedTime = clock.getElapsedTime();
	
			var solid = scene.getObjectByName('solid');
			solid.rotation.x = elapsedTime * 0.75;
			solid.rotation.y = elapsedTime * 0.5;
			solid.rotation.z = elapsedTime * 0.25;
	
			renderer.render(scene, camera);
			requestAnimationFrame(function() {
				update(renderer, scene, camera, clock);
			});
		}
	}
	document.body.appendChild(ThreeJS);
} else {
	var logo = document.getElementById("logo");
	var img = document.createElement("img");
	img.src = "./src/images/logo.png";
	logo.appendChild(img);
}

