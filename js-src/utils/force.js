/**
 * The force around us.
 */
export default class Force {

    constructor() {
        this.all = {};
    }

    createAcceleration(vector) {
        return (velocity, td) => {
            velocity.iadd(vector.muls(td));
        };
    }

    createDamping(damping) {
        return (velocity /*, td */) => {
            velocity.imuls(damping);
        };
    }

    createWind(vector) {
        return (velocity, td) => {
            velocity.iadd(vector.adds(td));
        };
    }

    addAcceleration(name, vector) {
        this.all[name] = this.createAcceleration(vector);
    }

    addDamping(name, damping) {
        this.all[name] = this.createDamping(damping);
    }

    addWind(name, vector) {
        this.all[name] = this.createWind(vector);
    }

    update(object, td) {
        for (var force in this.all) {
            if (this.all.hasOwnProperty(force)) {
                this.all[force](object, td);
            }
        }
    }
}
