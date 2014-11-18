/**
 * Created by chrismorgan on 11/10/14.
 */

function countBs(searchString){
    var bCount = 0;
    for (var x = 0; x < searchString.length; x++){
        if(searchString.charAt(x) === 'B'){
            bCount++;
        }
    }
    return bCount;
}


function countChar(searchString, character){
    var bCount = 0;
    for (var x = 0; x < searchString.length; x++){
        if(searchString.charAt(x) === character){
            bCount++;
        }
    }
    return bCount
}


console.log(countBs('I eat Bones'));
console.log(countBs('My name is Bobby'));
console.log(countBs('BBbbbsjsjsdBbbBske3'));

console.log(countChar('I eat Bones','e'));
console.log(countChar('My name is Bobby',' '));
console.log(countChar('BBbbbsjsjsdBbbBske3','j'));