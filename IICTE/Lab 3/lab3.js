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
		
	const lithiumGeometry = new THREE.SphereGeometry(0.03, 15, 15);
    const lithiumMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/images/perlin-512.png') });
    const lithium = new THREE.Mesh(lithiumGeometry, lithiumMaterial);
    scene.add(lithium);

    const electron1 = createElectron(0.05, 0.05, 0.02, 0x0000FF);
    electron1.position.setX(0.04 * Math.cos(Math.PI / 2));
    electron1.position.setY(0.04 * Math.cos(Math.PI / 4));
    electron1.position.setZ(0.04 * Math.sin(Math.PI / 2));
    scene.add(electron1);

    const electron2 = createElectron(0.08, 0.03, 0.04, 0xFFFF00);
    electron2.position.set(0.08, 0, 0);
    scene.add(electron2);

    const electron3 = createElectron(0.11, 0.02, 0.06, 0x00FF00);
    electron3.position.set(0.11, 0, 0);
    electron3.rotation.x = Math.PI / 2;
    scene.add(electron3);

    addOrbit(scene, 0.05, 0x000000, 0, 0, 0);
    addOrbit(scene, 0.08, 0x000000, 0, Math.PI / 2);
    addOrbit(scene, 0.11, 0x000000, Math.PI / 2, 0, 0);

    const skyGeometry = new THREE.SphereGeometry(1, 15, 15);
    const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x293134FF });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x8F8F8F, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.2;
    scene.add(plane);

    const main = createMain();
    scene.add(main);
	
	function createElectron(animationRadius, animationSpeed, sphereRadius, color) {
		const electronGeometry = new THREE.SphereGeometry(sphereRadius, 15, 15);
		const electronMaterial = new THREE.MeshBasicMaterial({ color: color });
		const electron = new THREE.Mesh(electronGeometry, electronMaterial);
		setScale(electron);
		electron.userData = { radius: animationRadius, speed: animationSpeed };
		return electron;
	}

	function addOrbit(scene, radius, color, rotationx, rotationy) {
		const orbitGeometry = new THREE.TorusGeometry(radius, 0.01, 15, 100);
		const orbitMaterial = new THREE.MeshBasicMaterial({ color: color });
		const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
		setScale(orbit);
		orbit.rotation.x = rotationx;
		orbit.rotation.y = rotationy;
		scene.add(orbit);
		return orbit;
	}

	function setScale(object) {
		// Implement scaling logic if needed
	}

	function createMain() {
		const main = new THREE.Object3D();
		main.userData = { angle: 0 };
		return main;
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
			    for (let electron of [electron1, electron2, electron3]) {
					let radius = parseFloat(electron.userData.radius);
					let speed = parseFloat(electron.userData.speed);
					let time = Date.now() / 500;

					if (electron === electron1) {
						electron.position.setX(radius * Math.cos(speed * time));
						electron.position.setY(radius * Math.sin(speed * time));
						electron.position.setZ(0);
					} else if (electron === electron2) {
						electron.position.setX(0);
						electron.position.setY(radius * Math.cos(speed * time));
						electron.position.setZ(radius * Math.sin(speed * time));
					} else if (electron === electron3) {
						electron.position.setX(radius * Math.cos(speed * time));
						electron.position.setY(0);
						electron.position.setZ(radius * Math.sin(speed * time));
					}
				}
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