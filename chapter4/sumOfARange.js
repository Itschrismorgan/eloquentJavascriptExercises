/**
 * Created by chrismorgan on 11/10/14.
 */
function range(begin,end){
    var step = 1;
    var range = [];

    if (arguments.length > 2){
        step = arguments[2];
    }

    if(step > 0){
        for(var x = begin;x <= end; x += step) {
            range.push(x);
        }
    } else if (step < 0) {
        for(var x = begin;x >= end; x += step) {
            range.push(x);
        }
    } else {
        return [];
    }

    return range;
}


function sum(array){
    var sum = 0;
    for(var x = 0; x < array.length; x++){
        sum += array[x];
    }
    return sum;
}


console.log(range(1,4));
console.log(range(1,4,2));
console.log(range(5,2,-1));
console.log(range(5,2,0));
console.log(range(1,10,2));

console.log(sum([1,2,3]));

console.log(sum(range(1,10)));