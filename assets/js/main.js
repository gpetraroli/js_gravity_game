import * as THREE from 'three';
import levels from '../../public/levels.json'
import Bullet from "./objs/bullet";
import {calculateVelocity} from "./services/physicEngine";
import Game from "./game";

// Create game
const game = new Game(levels.levels);

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const bullets = [];
window.addEventListener('keydown', (event) => {
    if (event.code !== 'Space') {
        return;
    }

    const bullet = new Bullet(new THREE.Vector3(8, -5), 1, new THREE.Vector3(-0.17, -0.01, 0));
    bullets.push(bullet);
    game.scene.add(bullet.mesh);
});


(function animate() {
    setTimeout(() => {
        bullets.forEach((bullet) => {
            bullet.mesh.position.add(calculateVelocity(bullet, game.bodies));
        });

        requestAnimationFrame(animate);
        renderer.render(game.scene, game.camera);
    }, 1000 / 60); // 60 FPS
})();

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