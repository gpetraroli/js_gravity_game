import * as THREE from 'three';
import levels from '../../public/levels.json'
import Planet from "./objs/planet";
import Bullet from "./objs/bullet";

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    'build/images/stars.jpg',
    () => {
        scene.background = texture;
    },
    undefined,
    (err) => {
        console.error(err);
    }
);

const level = levels.levels[0];

const bodies = [];
level.bodies.forEach((body) => {
    bodies.push(new Planet(body.radius, body.position, 'build/images/' + body.texture, body.mass));
    scene.add(bodies[bodies.length - 1].mesh);
});

// // Earth
// const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
// const earthMaterial = new THREE.MeshBasicMaterial({
//     map: textureLoader.load('build/images/earth_6K.jpg'),
// });
// const earth = new THREE.Mesh(earthGeometry, earthMaterial);
// scene.add(earth);
//
// const cloudsGeometry = new THREE.SphereGeometry(2 + 0.05, 32, 32);
// const cloudsMaterial = new THREE.MeshBasicMaterial({
//     alphaMap: textureLoader.load('build/images/earth_clouds.jpg'),
//     transparent: true,
// });
// const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
// earth.add(clouds);
//
// const atmosphereGeometry = new THREE.SphereGeometry(2 + 0.06, 32, 32);
// const atmosphereMaterial = new THREE.MeshBasicMaterial({
//     color: 0x0000ff,
//     opacity: 0.10,
//     transparent: true,
// });
// earth.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));
//

const bullet = new Bullet({x: 8, y: -5}, 1, new THREE.Vector3(-0.17, -0.01, 0));
scene.add(bullet.mesh);

const G = 0.0001; // Gravitational constant for the simulation


(function animate() {
    // Calculate the vector pointing from the bullet to the Earth
    let forceDirection = bodies[0].mesh.position.clone().sub(bullet.mesh.position);
    let distance = forceDirection.length();
    forceDirection.normalize(); // Normalize vector to get the direction

    // Calculate gravitational force magnitude
    let forceMagnitude = G * (bodies[0].mass * bullet.mass) / (distance * distance);

    // // Apply the force to the bullet's velocity
    let acceleration = forceDirection.multiplyScalar(forceMagnitude / bullet.mass);
    bullet.velocity.add(acceleration);

    // Update bullet position
    bullet.mesh.position.add(bullet.velocity);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // earth.rotation.y += 0.001;
})();