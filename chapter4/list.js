/**
 * Created by chrismorgan on 11/10/14.
 */


function arrayToList(array){
    var list = null;
    for(var x = array.length - 1; x >= 0; x--){
        list = prepend({'value': array[x]},list);
    }
    return list;
}

function listToArray(list){
    var array = [];
    if(list.rest === null){
        array[0] = list.value;
        return array;
    } else {
        array[0] = list.value;
        var rightArray = listToArray(list.rest);
        return array.concat(rightArray);
    }
}

function prepend(element, list){
    var newList = element;
    newList.rest = list;
    return newList;
}

function nth(n, list){
    if(n === 0 && list === null){
        return undefined;
    } else if (n === 0 && list !== null) {
        return list.value;
    } else {
        return nth(n-1,list.rest);
    }
}

var list = arrayToList([1,2,3,4]);
console.log(JSON.stringify(list));


console.log(listToArray(list));


var list2 = arrayToList([1,2,4,6,8,10]);
console.log(JSON.stringify(list2));
console.log(nth(3,list2));