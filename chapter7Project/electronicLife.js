/**
 * Created by chrismorgan on 11/19/14.
 */

function Vector(x,y){
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
};

var directions = {
    'n':  new Vector( 0,-1),
    'ne': new Vector( 1,-1),
    'e':  new Vector( 1, 0),
    'se': new Vector(-1, 1),
    's':  new Vector( 0, 1),
    'sw': new Vector(-1, 1),
    'w':  new Vector(-1, 0),
    'nw': new Vector(-1,-1)
};

function Grid(width, height){
    this.space = new Array(width,height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector){
    return vector.x >= 0 && vector.y >= 0 && vector.x < this.width && vector.y < this.height;
};
Grid.prototype.get = function(vector){
    return this.space[vector.x + vector.y * this.width];
};
Grid.prototype.set = function(vector, value){
    this.space[vector.x + vector.y * this.width] = value;
};
Grid.prototype.forEach = function(f, context){
  for(var y = 0; y < this.height; y++ ){
      for(var x = 0; x < this.width; x++){
          var value = this.space[x + y * this.width];
          if (value !== null){
              f.call(context, value, new Vector(x,y));
          }
      }
  }
};

/* Helper functions */
function randomElement (array){
    return array[Math.floor(Math.random() * array.length)];
}
function elementFromChar(legend, char){
    if (char === " ")
        return null;
    var element = new legend[char]();
    element.originChar = char;
    return element;
}
function charFromElement(element){
    if (element === null){
        return " ";
    } else {
        return element.originChar;
    }
}



/* World entities */
function Wall(){};


function BouncingCritter(){
    this.direction = randomElement(Object.keys(directions));
}
BouncingCritter.prototype.act = function(view){
    if (view.look(this.direction) !== " "){
        this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
};





function World(map, legend){
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y){
        for(var x = 0; x < line.length; x++){
            grid.set(new Vector(x,y), elementFromChar(legend, line[x]));
        }
    });
}
World.prototype.toString = function(){
    var output = "";
    for(var y = 0; y < this.grid.height; y++){
        for(var x = 0; x < this.grid.width; x++){
            var element = this.grid.get(new Vector(x,y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};
World.prototype.turn = function(){
    var acted = [];
    this.grid.forEach(function(critter, vector){
        if (critter.act && acted.indexOf(critter) === -1){
            acted.push(critter);
            this.__letAct(critter, vector);
        }
    }, this);
};
World.prototype.__letAct = function(critter, vector){
    var action = critter.act(new View(this, vector));
    if (action && action.type === "move"){
        var dest = this.__checkDestination(action, vector);
        if (dest && this.grid.get(dest) === null){
            this.grid.set(vector, null);
            this.grid.set(dest,critter);
        }
    }
};
World.prototype.__checkDestination = function(action,vector){
    if (directions.hasOwnProperty(action.direction)){
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(vector)){
            return dest;
        }
    }
};

var plan2 = ["############################",
            "#####                 ######",
            "##   ***                **##",
            "#   *##**         **  O  *##",
            "#    ***     O    ##**    *#",
            "#       O         ##***    #",
            "#                 ##**     #",
            "#   O       #*             #",
            "#*          #**       O    #",
            "#***        ##**    O    **#",
            "##****     ###***       *###",
            "############################"];

var plan = ["############################",
            "#####                 ######",
            "##                        ##",
            "#    ##               O   ##",
            "#            O    ##       #",
            "#       O         ##       #",
            "#                 ##       #",
            "#   O       #              #",
            "#           #         O    #",
            "#           ##      O      #",
            "##         ###           ###",
            "############################"];



var world = new World(plan, {'#': Wall,"O": BouncingCritter});
console.log(world.toString());