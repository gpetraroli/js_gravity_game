class Body {
    _mesh;
    _mass;
    _radialSpeed;

    constructor(mass, radialSpeed = 0) {
        this._mass = mass;
        this._radialSpeed = radialSpeed;
    }

    get mesh() {
        return this._mesh;
    }

    get mass() {
        return this._mass;
    }

    get radialSpeed() {
        return this._radialSpeed;
    }
}

export default Body;
