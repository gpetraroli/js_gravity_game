import * as THREE from 'three';

export const G = 0.0001; // Gravitational constant for the simulation

export const calculateVelocity = (bullet, bodies) => {
    let netForce = new THREE.Vector3(0, 0, 0);

    bodies.forEach(body => {
        let forceDirection = body.mesh.position.clone().sub(bullet.mesh.position);
        let distance = forceDirection.length();

        if (distance > 0) {
            forceDirection.normalize(); // Normalize vector to get the direction

            let forceMagnitude = G * (body.mass * bullet.mass) / (distance * distance);
            let force = forceDirection.multiplyScalar(forceMagnitude);

            netForce.add(force); // Add this force to the net force
        }
    });

    // Calculate acceleration (net force divided by bullet's mass)
    let acceleration = netForce.divideScalar(bullet.mass);

    bullet.velocity.add(acceleration);

    return bullet.velocity;
};
