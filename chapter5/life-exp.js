/**
 * Created by chrismorgan on 11/12/14.
 */
var ANCESTRY_FILE = require('./ancestry.js');

var af = JSON.parse(ANCESTRY_FILE);

function groupBy(array, test){
    var groupedObj = {};

    array.forEach(function(element){
        //console.log(test(element));
        if (groupedObj[test(element)] === undefined){
            groupedObj[test(element)] = [];
        }
        groupedObj[test(element)].push(element);
    });

    return groupedObj;
};

function avgArray(array){
    var sum = array.reduce(function(element1,element2){ return element1 + element2});

    return sum / array.length;
};

var byCentury = groupBy(af,function(person){
    return Math.ceil(person.died/100);
});

//console.log(byCentury);

var avgAgesByCentury = {};

for(var group in byCentury){
    //console.log(byCentury[group]);
    avgAgesByCentury[group] = avgArray(byCentury[group].map(function(person){return person.died - person.born}));
};

console.log(avgAgesByCentury);