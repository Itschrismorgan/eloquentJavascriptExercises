/**
 * Created by chrismorgan on 11/10/14.
 */

function isEven(x){
    var y = Math.abs(x);
    if (y === 0){
        return true;
    } else if (y === 1) {
        return false;
    } else {
        return isEven(y-2);
    }
}


console.log(isEven(0));

console.log(isEven(1));
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));
console.log(isEven(-77));
console.log(isEven(-50));