/**
 * Created by chrismorgan on 11/15/14.
 */
var MOUNTAINS = require("./mountains.js");
//console.log(MOUNTAINS);

/* Cell Definitions */
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
            cellContents.push(rightPad(content, width, " "));
    }
    //console.log(cellContents);
    return cellContents;
};

function RTextCell(text){
    TextCell.call(this,text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function (width, height){
    var cellContents = [];

    for(var x = 0; x < height; x++){
        var content = this.data[x] || "";
        cellContents.push(leftPad(content, width, " "));
    }
    return cellContents;
};


function UnderlineCell(inner){
    this.inner = inner;
}
UnderlineCell.prototype.minWidth = function (){
    return this.inner.minWidth();
};
UnderlineCell.prototype.minHeight = function (){
    return this.inner.minHeight()+1;
};
UnderlineCell.prototype.draw = function (width, heigth){
    return this.inner.draw(width,heigth-1).concat(repeatStr("_",width));
};



function StretchCell(inner, width, heigth){
    this.inner = inner;
    this.width = width;
    this.height = heigth;
}

StretchCell.prototype.minWidth = function(){
    return Math.max(this.width, this.inner.minWidth());
};
StretchCell.prototype.minHeight = function(){
    return Math.max(this.height, this.inner.minHeight());
};
StretchCell.prototype.draw = function(width, heigth){
    return this.inner.draw(width, heigth);
};



/* Helpers */
function rightPad(text, width, padString){
    return text+repeatStr(padString,width-text.length);
}

function leftPad(text, width, padString){
    return repeatStr(padString,width-text.length)+text;
}

function repeatStr(string, size){
    var padding = "";
    for(var x = 0; x < size; x++){
        padding += string;
    }
    return padding
}

function convertObjectToCells(rows){
    var keys = Object.keys(rows[0]);
    var titleRow = keys.map(function(key){
        return new UnderlineCell(new TextCell(key));
    });
    var body = rows.map(function(row) { return keys.map(function(name) {
            //console.log(row[name]);
            //console.log(typeof row[name]);
            if(typeof row[name] == 'number'){
                return new RTextCell(String(row[name]));
            } else {
                return new TextCell(String(row[name]));
            }
        });
    });
    return [titleRow].concat(body);
}



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

console.log("\n\n");
console.log(drawTable(convertObjectToCells(MOUNTAINS)));


var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]