/**
 * Created by chrismorgan on 11/12/14.
 */
var ANCESTRY_FILE = require('./ancestry.js');

var af = JSON.parse(ANCESTRY_FILE);

function avgArray(array){
    var sum = array.reduce(function(element1,element2){ return element1 + element2});

    return sum / array.length;
}




var byNameDict = {};

af.forEach(function(person){
    byNameDict[person.name] = person;
});

var hasMotherAvailable = af.filter(function(person){
    return byNameDict[person.mother] !== undefined;
});
//console.log(hasMotherAvailable);

var motherAgesAtBirth = hasMotherAvailable.map(function(person){
    return person.born - byNameDict[person.mother].born;
});
//console.log(motherAgesAtBirth);

console.log(avgArray(motherAgesAtBirth));
