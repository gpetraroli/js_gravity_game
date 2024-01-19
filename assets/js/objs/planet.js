import * as THREE from 'three';

class Planet {
    #mesh;
    #mass;

    constructor(radius, position, texture, mass) {
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(texture),
        });
        this.#mesh = new THREE.Mesh(geometry, material);
        this.#mesh.position.set(position.x, position.y, position.z);

        const atmosphereGeometry = new THREE.SphereGeometry(radius + 0.06, 32, 32);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            opacity: 0.10,
            transparent: true,
        });

        this.#mesh.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));

        this.#mass = mass;
    }

    get mesh() {
        return this.#mesh;
    }

    get mass() {
        return this.#mass;
    }
}

export default Planet;