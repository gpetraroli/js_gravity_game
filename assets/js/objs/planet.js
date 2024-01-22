import * as THREE from 'three';
import Body from "./body";

class Planet extends Body {

    constructor(radius, position, texture, mass) {
        super(mass);

        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(texture),
        });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.set(position.x, position.y, position.z);

        const atmosphereGeometry = new THREE.SphereGeometry(radius + 0.06, 32, 32);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            opacity: 0.10,
            transparent: true,
        });

        this._mesh.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));
    }
}

export default Planet;