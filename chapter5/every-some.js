/**
 * Created by chrismorgan on 11/12/14.
 */


function every(array, predicate){
    var returnVal = true;
    array.forEach(function(element){
        //console.log(predicate(element));
        if (!predicate(element)){
            if(returnVal === true)
                returnVal = false;
        }
    });
    return returnVal;
}

function some(array, predicate){

    for(var x = 0; x < array.length; x++){
        //console.log(array[x]);
        if(predicate(array[x])){
            return true;
        }
    }
    return false;
}


console.log(every([1,3,45,3],function(num){return num > 0;}));
console.log("");
console.log(every([1,3,45,3],function(num){return num > 10;}));
console.log("");
console.log(some([1,3,45,3],function(num){return num > 10;}));
console.log("");
console.log(some([1,3,45,3],function(num){return num > 100;}));