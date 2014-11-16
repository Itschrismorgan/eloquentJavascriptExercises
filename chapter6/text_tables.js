/**
 * Created by chrismorgan on 11/15/14.
 */
var MOUNTAINS = require("./mountains.js");
//console.log(MOUNTAINS);

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
TextCell.prototype.draw = function(width,height){
    var cellContents = [];

    for(var x = 0; x < height; x++){
        var content = this.data[x] || "";
        cellContents.push(rightPad(content,width," "));
    }
    //console.log(cellContents);
    return cellContents;
};

function rightPad(text, width, padString){
    var padding = "";
    for(var x = 0; x < width-text.length; x++){
        padding += padString;
    }
    //console.log(text+padding);
    return text+padding;
}

function leftPad(text, width, padString){
    var padding = "";
    for(var x = 0; x < width-text.length; x++){
        padding += padString;
    }
    //console.log(text+padding);
    return padding+text;
}

function convertObjectToCells(rows){
    var keys = Object.keys(rows[0]);
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
    return this.inner.draw();
};

function minCol(rows){
    //console.log(rows);
    return rows[0].map(function(__, i){
        return rows.reduce(function(max, col){
            //console.log(max+"---"+col[i]+"("+i+")");
            return Math.max(max, col[i].minWidth());
        },0);
    });
}

function minRow(rows){
    return rows.map(function(row){
        return row.reduce(function(max,col){return Math.max(max, col.minHeight())},0);
    });
}

function drawTable(rows){
    var minColumnWidth = minCol(rows);
    //console.log(minColumnWidth);
    var minRowHeight = minRow(rows);
    //console.log(minRowHeight);

    function drawLine(blocks, lineNo){
        return blocks.map(function(block){
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row,rowNum){
        var blocks = row.map(function(cell, colNum){
            return cell.draw(minColumnWidth[colNum],minRowHeight[rowNum]);
        });
        //console.log(blocks);
        return blocks[0].map(function(__, lineNo){
            return drawLine(blocks, lineNo);
        }).join("\n");

    }

    return rows.map(drawRow).join("\n");
}





//convertObjectToCells(MOUNTAINS);

var testCell = new TextCell('143232');
console.log(testCell.minWidth());
console.log(testCell.minHeight());
console.log(testCell.draw(testCell.minWidth(),testCell.minHeight()));

var testCell2 = new TextCell('143232\ntytrd7gg');
console.log(testCell2.minWidth());
console.log(testCell2.minHeight());
console.log(testCell2.draw(testCell2.minWidth(),testCell2.minHeight()));


console.log(drawTable(convertObjectToCells(MOUNTAINS)));