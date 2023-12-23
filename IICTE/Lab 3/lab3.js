import * as THREE from '../../js/three/three.module.js';
import {ARButton} from '../../js/three/ARButton.js';


document.addEventListener("DOMContentLoaded", () => {
	//основна функція
	const initialize = async() => {
		let scene = new THREE.Scene();
	    let camera = new THREE.PerspectiveCamera();

		let renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.setPixelRatio(window.devicePixelRatio);
		document.body.appendChild(renderer.domElement);
		
	// bbxb	
		
	// Створюємо ядро атома літію, яке складається з 3 протонів (червоні сфери) та 4 нейтронів (сірі сфери)
	var nucleus = new THREE.Group();
	var protonMaterial = new THREE.MeshBasicMaterial({color: "red"});
	var neutronMaterial = new THREE.MeshBasicMaterial({color: "gray"});
	var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
	var proton1 = new THREE.Mesh(sphereGeometry, protonMaterial);
	proton1.position.set(-0.15, 0, 0);
	var proton2 = new THREE.Mesh(sphereGeometry, protonMaterial);
	proton2.position.set(0.15, 0, 0);
	var proton3 = new THREE.Mesh(sphereGeometry, protonMaterial);
	proton3.position.set(0, 0.15, 0);
	var neutron1 = new THREE.Mesh(sphereGeometry, neutronMaterial);
	neutron1.position.set(0, -0.15, 0);
	var neutron2 = new THREE.Mesh(sphereGeometry, neutronMaterial);
	neutron2.position.set(0, 0, 0.15);
	var neutron3 = new THREE.Mesh(sphereGeometry, neutronMaterial);
	neutron3.position.set(0, 0, -0.15);
	var neutron4 = new THREE.Mesh(sphereGeometry, neutronMaterial);
	neutron4.position.set(0.15, 0.15, 0.15);
	nucleus.add(proton1, proton2, proton3, neutron1, neutron2, neutron3, neutron4);
	scene.add(nucleus);

	// Створюємо електрони (сині сфери) та їхні орбіти (білі кільця)
	var electronMaterial = new THREE.MeshBasicMaterial({color: "blue"});
	var orbitMaterial = new THREE.LineBasicMaterial({color: "white"});
	var ringGeometry = new THREE.RingGeometry(0.9, 1, 32);
	var electron1 = new THREE.Mesh(sphereGeometry, electronMaterial);
	electron1.position.set(1, 0, 0);
	var orbit1 = new THREE.Line(ringGeometry, orbitMaterial);
	orbit1.rotation.x = Math.PI / 2;
	var electron2 = new THREE.Mesh(sphereGeometry, electronMaterial);
	electron2.position.set(0, 1, 0);
	var orbit2 = new THREE.Line(ringGeometry, orbitMaterial);
	orbit2.rotation.y = Math.PI / 2;
	var electron3 = new THREE.Mesh(sphereGeometry, electronMaterial);
	electron3.position.set(0, 0, 1);
	var orbit3 = new THREE.Line(ringGeometry, orbitMaterial);
	orbit3.rotation.z = Math.PI / 2;
	scene.add(electron1, orbit1, electron2, orbit2, electron3, orbit3);
	
	function animate() {
	  requestAnimationFrame(animate);
	  // Обертаємо ядро атома
	  nucleus.rotation.x += 0.01;
	  nucleus.rotation.y += 0.01;
	  // Обертаємо електрони навколо ядра
	  electron1.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.05);
	  electron2.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.05);
	  electron3.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.05);
	  // Рендеримо сцену
	  renderer.render(scene, camera);
	}
	
	// lnvnd
		
       
		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

		// повідомлення рушія Three.js про параметри використання WebXR
		renderer.xr.enabled = true;

		// перевірка запуску та завершення сесії WebXR
		renderer.xr.addEventListener("sessionstart", (evt) => {
			//console.log("Сесію WebXR розпочато");
			renderer.setAnimationLoop(() => {
			    animate();
			}); 
		});


		const arButton = ARButton.createButton(renderer, {
				optionalFeatures: ["dom-overlay"],
				domOverlay: {root: document.body},
			}
		);
		//arButton.style.background = 'yellow';
		arButton.textContent = "Увійти до WebXR";
		document.body.appendChild(arButton);
	}

	initialize(); // розпочати роботу
});