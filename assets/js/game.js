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
    #activePlayer = 0;
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
        this.#players.push(new Vessel('', new THREE.Vector3(8, -5, 0)));

        // create scene
        this.#scene = this.createScene();

        // create shoot event
        // TODO: create function
        document.addEventListener('keydown', (event) => {
            if (event.code !== 'Space') {
                return;
            }

            const bulletVector = new THREE.Vector3(-0.20, 0, 0);
            bulletVector.applyAxisAngle(new THREE.Vector3(0, 0, 1), this.#players[0].mesh.rotation.z - Math.PI / 2);

            const bullet = new Bullet(new THREE.Vector3(8, -5), 1, bulletVector);
            this.#bullets.push(bullet);
            this.scene.add(bullet.mesh);
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

        scene.add(this.#players[0].mesh);

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