import * as THREE from 'three';
import levels from '../../public/levels.json'
import Game from "./game";

// Create game
const game = new Game(levels.levels);

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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