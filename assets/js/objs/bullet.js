import * as THREE from 'three';

class Bullet {
    #mesh;
    #mass;
    #velocity;

    constructor(position, mass, velocity) {
        const geometry = new THREE.SphereGeometry(0.05, 32, 32);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.#mesh = new THREE.Mesh(geometry, material);

        this.#mesh.position.x = position.x;
        this.#mesh.position.y = position.y;

        this.#mass = mass;

        this.#velocity = velocity;
    }

    get mesh() {
        return this.#mesh;
    }

    get mass() {
        return this.#mass;
    }

    get velocity() {
        return this.#velocity;
    }
}

export default Bullet;