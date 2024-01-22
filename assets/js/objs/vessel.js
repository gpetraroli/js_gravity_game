import * as THREE from 'three';
import Body from "./body";

class Bullet extends Body {
    #sprite;

    constructor(sprite, position) {
        super(0);

        const vertices = new Float32Array([
            0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0
        ]);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this._mesh = new THREE.Mesh(geometry, material);

        this._mesh.position.x = position.x;
        this._mesh.position.y = position.y;
    }
}

export default Bullet;