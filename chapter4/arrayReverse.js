/**
 * Created by chrismorgan on 11/10/14.
 */


function reverseArray(array){
    var newArray = [];
    for(var x = array.length - 1; x >= 0; x--){
        newArray.push(array[x]);
    }

    return newArray;
};

function reverseArrayInPlace(array){
    for(var x = 0; x < Math.floor(array.length/2); x++){
        var old = array[x];
        array[x] = array[array.length - 1 - x];
        array[array.length - 1 - x] = old;
    }
    return array;
};


console.log(reverseArray([1,2,3,4,5,6]));



var checkArray = [2,4,6,8,10,12,14,16];
console.log(checkArray);
reverseArrayInPlace(checkArray);
console.log(checkArray);
