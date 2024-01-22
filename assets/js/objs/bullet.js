import * as THREE from 'three';
import Body from "./body";

class Bullet extends Body {
    #velocity;

    constructor(position, mass, velocity) {
        super(mass);

        const geometry = new THREE.SphereGeometry(0.05, 32, 32);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this._mesh = new THREE.Mesh(geometry, material);

        this._mesh.position.x = position.x;
        this._mesh.position.y = position.y;

        this.#velocity = velocity;
    }

    get velocity() {
        return this.#velocity;
    }
}

export default Bullet;