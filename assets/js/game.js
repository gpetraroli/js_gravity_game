import * as THREE from "three";
import Planet from "./objs/planet";
import Vessel from "./objs/vessel";
import Bullet from "./objs/bullet";
import {calculateVelocity} from "./services/physicEngine";

class Game {
    #scene;
    #levels;
    #activeLevel;
    #bodies = [];
    #camera;
    #players = [];
    #activePlayerIndex = null;
    #bullets = [];

    cameraFrustumSize = 20; // This value depends on how much of the scene you want to see

    constructor(levels) {
        this.#levels = levels;
        this.#activeLevel = 0;

        // create bodies
        this.#levels[this.#activeLevel].bodies.forEach((body) => {
            this.#bodies.push(new Planet(body.radius, body.position, 'build/images/' + body.texture, body.mass, body.radialSpeed));
        });

        // create players
        this.#levels[this.#activeLevel].players.forEach((player) => {
            this.#players.push(new Vessel('', new THREE.Vector3(player.position.x, player.position.y, 0)));
        });

        // create scene
        this.#scene = this.createScene();

        this.#activePlayerIndex = 0;

        // create shoot event
        // TODO: create function
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowUp' :
                    this.#players[this.#activePlayerIndex].mesh.rotateZ(-1 * Math.PI / 180);
                    break;
                case 'ArrowDown':
                    this.#players[this.#activePlayerIndex].mesh.rotateZ(Math.PI / 180);
                    break;
            }

            if (event.code !== 'Space') {
                return;
            }

            const activePlayer = this.#players[this.#activePlayerIndex];

            const bulletVector = new THREE.Vector3(-0.20, 0, 0);
            bulletVector.applyAxisAngle(new THREE.Vector3(0, 0, 1), activePlayer.mesh.rotation.z - Math.PI / 2);

            const bullet = new Bullet(new THREE.Vector3(activePlayer.mesh.position.x, activePlayer.mesh.position.y), 1, bulletVector);
            this.#bullets.push(bullet);
            this.scene.add(bullet.mesh);

            this.#activePlayerIndex = (this.#activePlayerIndex + 1) % this.#players.length;
        });

        this.createCamera();
    }

    createScene() {
        const scene = new THREE.Scene();

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

        this.#bodies.forEach((body) => {
            scene.add(body.mesh);
        });

        this.#players.forEach((player) => {
            scene.add(player.mesh);

            const directionVector = new THREE.Vector3(0, 0, 0).sub(player.mesh.position);
            const angle = Math.atan2(directionVector.y, directionVector.x);
            player.mesh.rotation.z = angle - Math.PI / 2;
        });

        this.#scene = scene;

        return scene;
    }

    createCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        const frustumHalfSize = this.cameraFrustumSize / 2;
        const near = 0.1;
        const far = 1000;

        this.#camera = new THREE.OrthographicCamera(
            -frustumHalfSize * aspect,
            frustumHalfSize * aspect,
            frustumHalfSize,
            -frustumHalfSize,
            near,
            far
        );

        this.#camera.position.z = 10;
    }

    animate(renderer) {
        setTimeout(() => {
            this.#bullets.forEach((bullet) => {
                bullet.mesh.position.add(calculateVelocity(bullet, this.#bodies));

                // check if bullet is overlapping with anybody's mesh
                // TODO: create function in the physicEngine
                this.#bodies.forEach((body) => {
                    if (body.mesh.position.distanceTo(bullet.mesh.position) < body.mesh.geometry.parameters.radius) {
                        this.#scene.remove(bullet.mesh);
                    }
                });
            });

            this.#bodies.forEach((body) => {
                body.mesh.rotation.y += body.radialSpeed;
            });

            renderer.render(this.#scene, this.#camera);
            requestAnimationFrame(() => this.animate(renderer));
        }, 1000 / 60); // 60 FPS
    }

    get scene() {
        return this.#scene;
    }

    get bodies() {
        return this.#bodies;
    }

    get camera() {
        return this.#camera;
    }
}

export default Game;