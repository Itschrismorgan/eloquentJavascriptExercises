/**
 * Created by chrismorgan on 11/15/14.
 */
var MOUNTAINS = require("./mountains.js");
//var mts = JSON.parse(MOUNTAINS);
console.log(MOUNTAINS);

function TextCell(data){
    this.data = data.split('\n');
    //console.log(this.data);
}
TextCell.prototype.minWidth = function(){
    return this.data.reduce(function(max,element){
        return Math.max(max, element.length);
    },0);
};
TextCell.prototype.minHeight = function(){
    return this.data.length;
};

function convertObjectToCells(rows){
    var keys = Object.keys(rows[0])
    var titleRow = keys.map(function(key){
        return new TextCell(key);
    });
    var body = rows.map(function(row) { return keys.map(function(name) {
        return new TextCell(String(row[name])); });
    });
    return [titleRow].concat(body);
}

function StrechCell(inner, width, heigth){
    this.inner = inner;
    this.width = width;
    this.height = heigth;
}

StrechCell.prototype.minWidth = function(){
    return this.width;
};

StrechCell.prototype.minHeight = function(){
    return this.height;
};

StrechCell.prototype.draw = function(){

};

function minCol(rows){
    console.log(rows);
    return rows[0].map(function(__, i){
        return rows.reduce(function(max, col){
            console.log(max+"---"+col[i]+"("+i+")");
            return Math.max(max, col[i].minWidth());
        },0);
    });
};

function drawTable(rows){
    var minColumnWidth = minCol(rows);
    console.log(minColumnWidth);
};





//convertObjectToCells(MOUNTAINS);

var testCell = new TextCell('143232');
console.log(testCell.minWidth());
console.log(testCell.minHeight());
var testCell2 = new TextCell('143232\ntytrd7gg');
console.log(testCell2.minWidth());
console.log(testCell2.minHeight());


drawTable(convertObjectToCells(MOUNTAINS));