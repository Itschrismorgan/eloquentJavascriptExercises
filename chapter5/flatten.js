/**
 * Created by chrismorgan on 11/12/14.
 */
var doubledArray = [[2,4,6],[1,3,5],[8,10,12],[7,9,11],[14,16,18]];

var simpleArray = doubledArray.reduce(function (array1,array2) {
    return array1.concat(array2);
});


console.log(simpleArray);