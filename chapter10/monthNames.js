/**
 * Created by chrismorgan on 11/24/14.
 */

var month = function(){
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return {
        name: function(num){return monthNames[num];},
        number: function(name){return monthNames.indexOf(name);}
    };
}();

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10

try {
    console.log(month.monthNames[0]);
} catch (e){
    console.log("this failed correctly because monthNames is 'private'");
}