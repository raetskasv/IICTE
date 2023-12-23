import * as THREE from '../js/three/three.module.js';
import {ARButton} from '../js/three/ARButton.js';


document.addEventListener("DOMContentLoaded", () => {
	//основна функція
	const initialize = async() => {
		// створення сцени з червоним кубом розміром 5 см
		let scene = new THREE.Scene();
	    let camera = new THREE.PerspectiveCamera();

		let renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.setPixelRatio(window.devicePixelRatio);
		document.body.appendChild(renderer.domElement);

		// Створюємо масив для зберігання веж
		var towers = [];
		// Створюємо масив для зберігання кілець
		var rings = [];

		// Створюємо функцію для створення вежі
		function createTower (x, y, z, radius, height, color) {
		  // Створюємо геометрію і матеріал для вежі
		  var towerGeometry = new THREE.CylinderBufferGeometry (radius, radius, height, 32);
		  var towerMaterial = new THREE.MeshStandardMaterial ({color: color});
		  // Створюємо меш для вежі
		  var tower = new THREE.Mesh (towerGeometry, towerMaterial);
		  // Встановлюємо позицію вежі
		  tower.position.set (x, y, z);
		  // Додаємо вежу до сцени
		  scene.add (tower);
		  // Додаємо вежу до масиву
		  towers.push (tower);
		}
		
		// Створюємо функцію для створення кільця
		function createRing (x, y, z, innerRadius, outerRadius, color) {
		  // Створюємо геометрію і матеріал для кільця
		  var ringGeometry = new THREE.TorusBufferGeometry (outerRadius, (outerRadius - innerRadius) / 2, 16, 100);
		  var ringMaterial = new THREE.MeshStandardMaterial ({color: color});
		  // Створюємо меш для кільця
		  var ring = new THREE.Mesh (ringGeometry, ringMaterial);
		  // Встановлюємо позицію і поворот кільця
		  ring.position.set (x, y, z);
		  ring.rotation.x = Math.PI / 2;
		  // Додаємо кільце до сцени
		  scene.add (ring);
		  // Додаємо кільце до масиву
		  rings.push (ring);
		}

		// Створюємо три вежі з різними кольорами і позиціями
		createTower (-0.5, 0.5, -1.5, 0.05, 0.5, 0xffffff); // Червона вежа
		createTower (0, 0.5, -1.5, 0.05, 0.5, 0x0000ff); // Зелена вежа
		createTower (0.5, 0.5, -1.5, 0.05, 0.5, 0x00ff00); // Синя вежа
		
		// Створюємо 7 кілець з різними розмірами і кольорами, які розташовані на першій вежі
		createRing (-0.5, 0.65, -1.5, 0.075, 0.1, 0xff00ff); 
		createRing (-0.5, 0.6, 	-1.5, 0.1,   0.125, 0x00ffff);
		createRing (-0.5, 0.55, -1.5, 0.125, 0.15, 0xff00ff); 
		createRing (-0.5, 0.5, 	-1.5, 0.15,  0.175, 0x00ffff);
		createRing (-0.5, 0.45, -1.5, 0.175, 0.2, 0xff00ff); 
		createRing (-0.5, 0.4,  -1.5, 0.2,   0.225, 0x00ffff);
		createRing (-0.5, 0.35, -1.5, 0.225, 0.25, 0xff00ff); 
		
		function render() {
			if (rings[0].position.y < 1.55 && rings[0].position.x < 0 ) {
				rings[0].position.set(-0.5, rings[0].position.y+0.005, -1.5);
				rings[1].position.set(-0.5, rings[1].position.y+0.005, -1.5);
				rings[2].position.set(-0.5, rings[2].position.y+0.005, -1.5);
				rings[3].position.set(-0.5, rings[3].position.y+0.005, -1.5);
				rings[4].position.set(-0.5, rings[4].position.y+0.005, -1.5);
				rings[5].position.set(-0.5, rings[5].position.y+0.005, -1.5);
				rings[6].position.set(-0.5, rings[6].position.y+0.005, -1.5);
			}
			renderer.render(scene, camera);
			
			
			if (rings[6].position.y >= 1.05 && rings[0].position.x < 0 ){
				rings[0].position.set(rings[0].position.x+0.01/2, rings[0].position.y, -1.5);
				rings[1].position.set(rings[1].position.x+0.01, rings[1].position.y, -1.5);
				rings[2].position.set(rings[2].position.x+0.01/2, rings[2].position.y, -1.5);
				rings[3].position.set(rings[3].position.x+0.01, rings[3].position.y, -1.5);
				rings[4].position.set(rings[4].position.x+0.01/2, rings[4].position.y, -1.5);
				rings[5].position.set(rings[5].position.x+0.01, rings[5].position.y, -1.5);
				rings[6].position.set(rings[6].position.x+0.01/2, rings[6].position.y, -1.5);
				renderer.render(scene, camera);
			}
			renderer.render(scene, camera);
			
			if (rings[0].position.x >= 0 && rings[0].position.y > 0.65) {
				rings[0].position.set(rings[0].position.x, rings[0].position.y-0.005, -1.5);
				rings[1].position.set(rings[1].position.x, rings[1].position.y-0.005, -1.5);
				rings[2].position.set(rings[2].position.x, rings[2].position.y-0.005, -1.5);
				rings[3].position.set(rings[3].position.x, rings[3].position.y-0.005, -1.5);
				rings[4].position.set(rings[4].position.x, rings[4].position.y-0.005, -1.5);
				rings[5].position.set(rings[5].position.x, rings[5].position.y-0.005, -1.5);
				rings[6].position.set(rings[6].position.x, rings[6].position.y-0.005, -1.5);
			}
			renderer.render(scene, camera);	
		}
       
		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

		// повідомлення рушія Three.js про параметри використання WebXR
		renderer.xr.enabled = true;

		// перевірка запуску та завершення сесії WebXR
		renderer.xr.addEventListener("sessionstart", (evt) => {
			//console.log("Сесію WebXR розпочато");
			renderer.setAnimationLoop(() => {
			    render();
				//renderer.render(scene, camera);
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