/**
 * Created by chrismorgan on 11/23/14.
 */

function MultiplicatorUnitFailure(message) {
    this.message = message;
    this.stack = (new Error()).stack
}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";

function primitiveMultiple(x,y){
    if(Math.random() >= 0.5){
        return x*y;
    } else {
        throw new MultiplicatorUnitFailure("Flaky code failed...");
    }
}

for(;;) {
    try {
        var product = primitiveMultiple(5, 6);
        break;
    } catch (e) {
        if (e instanceof MultiplicatorUnitFailure) {
            console.log(e.message);
            console.log("Retrying");
        } else {
            throw e;
        }

    }
}
console.log(product);