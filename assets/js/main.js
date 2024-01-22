import * as THREE from 'three';
import levels from '../../public/levels.json'
import Game from "./game";

// Create game
const game = new Game(levels.levels);

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// window.addEventListener('keydown', (event) => {
//     if (event.code !== 'Space') {
//         return;
//     }

    // const bullet = new Bullet(new THREE.Vector3(8, -5), 1, new THREE.Vector3(-0.17, -0.01, 0));
    // bullets.push(bullet);
    // game.scene.add(bullet.mesh);
// });


game.animate(renderer);

window.addEventListener('resize', () => {
    const camera = game.camera;
    const aspect = window.innerWidth / window.innerHeight;
    const frustumHalfSize = game.cameraFrustumSize / 2;

    camera.left = -frustumHalfSize * aspect;
    camera.right = frustumHalfSize * aspect;
    camera.top = frustumHalfSize;
    camera.bottom = -frustumHalfSize;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});