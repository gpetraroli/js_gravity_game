import * as THREE from "three";
import Planet from "./objs/planet";

class Game {
    #scene;
    #levels;
    #activeLevel;
    #bodies = [];
    #camera;

    constructor(levels) {
        this.#levels = levels;
        this.#activeLevel = 0;

        this.#levels[this.#activeLevel].bodies.forEach((body) => {
            this.#bodies.push(new Planet(body.radius, body.position, 'build/images/' + body.texture, body.mass));
        });

        this.#scene = this.createScene();

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

        this.#scene = scene;

        return scene;
    }

    createCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 20; // This value depends on how much of the scene you want to see
        const frustumHalfSize = frustumSize / 2;
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