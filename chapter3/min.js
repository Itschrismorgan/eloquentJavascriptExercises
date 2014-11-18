/**
 * Created by chrismorgan on 11/10/14.
 */

function min(a, b) {
    if (a < b){
        return a;
    } else {
        return b;
    }
}


console.log(min(4,5));
console.log(min(1,20));
console.log(min(6,5));
console.log(min(5,5));
console.log(min('A','B'));
console.log(min('B','A'));
console.log(min('B','a'));
console.log(min('b','a'));