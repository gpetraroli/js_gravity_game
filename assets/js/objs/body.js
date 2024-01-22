class Body {
    _mesh;
    _mass;

    constructor(mass) {
        this._mass = mass;
    }

    get mesh() {
        return this._mesh;
    }

    get mass() {
        return this._mass;
    }
}

export default Body;
