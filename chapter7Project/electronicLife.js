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
var directionNames = Object.keys(directions);


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
function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}



/* World entities */
function Wall(){}

function BouncingCritter(){
    this.direction = randomElement(Object.keys(directions));
}
BouncingCritter.prototype.act = function(view){
    if (view.look(this.direction) !== " "){
        this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
};
function WallFlower(){
    this.dir = "s";
}
WallFlower.prototype.act = function(view){
    var start = this.dir;
    if(view.look(dirPlus(this.dir, -3)) !== " "){
        start = this.dir = dirPlus(this.dir, -2);
    }
    while (view.look(this.dir) !== " "){
        this.dir = dirPlus(this.dir, 1);
        if (this.dir === start){
            break;
        }
    }
    return {type: "move", direction: this.dir};
};


/* Game Word Object */
function World(map, legend){
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    this.age = 0;

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
    this.age++;
    var acted = [];
    this.grid.forEach(function(critter, vector){
        if (critter.act && acted.indexOf(critter) === -1){
            acted.push(critter);
            this.__letAct(critter, vector);
        }
    }, this);
    return this.age;
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
World.prototype.status = function(){
    var critters = [];
    var status = [];
    this.grid.forEach(function(critter, vector){
        if (critter.act && critters.indexOf(critter) === -1){
            critters.push(critter);
            status.push(critter.originChar+": "+critter.energy+" energy");
        }
    }, this);
    return "Count: "+status.length + "\n"+ status.join("\n");
};

/* The View object */
function View(world, vector){
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir){
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    } else {
        return "#";
    }
};
View.prototype.findAll = function(char) {
    var found = [];
    for(var dir in directions){
        if(this.look(dir) === char){
            found.push(dir);
        }
    }
    return found;
};
View.prototype.find = function(char) {
    var found = this.findAll(char);
    if(found.length === 0) {
        return null;
    }
    return randomElement(found);
};

/*
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
var turnCnt = 0;

for(var x = 0; x < 10; x++){
    turnCnt = world.turn();
    console.log("Turn: "+turnCnt);
    console.log(world.toString());
}*/



/* Object with all valid action functions */
var actionTypes = Object.create(null);
actionTypes.grow = function(critter){
    critter.energy += 1;
    return true;
};
actionTypes.move = function(critter, vector, action){
    var dest = this.__checkDestination(action, vector);
    if (dest === null || critter.energy <= 1 || this.grid.get(dest) !== null){
        return false;
    }
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};
actionTypes.eat = function(critter,vector, action){
    var dest = this.__checkDestination(action, vector);
    var atDest = dest !== null && this.grid.get(dest);
    if (!atDest || atDest.energy == null){
        return false;
    }
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};
actionTypes.reproduce = function(critter, vector, action){
    var baby = elementFromChar(this.legend, critter.originChar);
    if (critter.originChar === "O"){
        //console.log(baby);
        //console.log(vector);
        //console.log(action);
    }
    var dest = this.__checkDestination(action, vector);

    if (dest === null || critter.energy <= 2 * baby.energy || this.grid.get(dest) !== null){
        return false;
    }
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};
actionTypes.stand = function(critter, vector, action){
    //standing still recovers some of the energy lost
    critter.energy += 0.5;
    return true;
};

function Plant(){
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(context){
   if(this.energy > 20){
        var space = context.find(" ");
        if (space){
            //console.log("More cowbell....");
            return {type: "reproduce", direction: space};
        }
    }
    if (this.energy < 30){
        return {type: "grow"};
    }
};
function PlantEater(){
    this.energy = 20;
}
PlantEater.prototype.act = function(context){
    var space = context.find(" ");

    if(this.energy > 40 && space){
        console.log("Baby plant eater....");
        //console.log(space);
        return {type: "reproduce", direction: space};
    }
    var plant = context.find ("*");
    if (plant) {
        //console.log("pe e");
        return {type: "eat", direction: plant};
    } else if (space) {
        //console.log("pe move");
        //console.log(space);
        return {type: "move", direction: space};
    } else {
        //console.log("sitting tight...");
        return {type: "stand"};
    }

};
function Predator(){
    this.energy = 20;
}
Predator.prototype.act = function(context){
    var space = context.find(" ");

    if(this.energy > 40 && space){
        console.log("Baby Tyrano....");
        return {type: "reproduce", direction: space};
    }
    var plant = context.find ("O");
    if (plant) {
        console.log("Yummy.....");
        return {type: "eat", direction: plant};
    } else if (space) {
        //console.log("pred move");
        return {type: "move", direction: space};
    } else {
        //console.log("sitting tight....");
        return {type: "stand"};
    }

};


/* More complex world inherited from World */
function LifeLikeWorld(map, legend){
    World.call(this, map, legend);
}
LifeLikeWorld.prototype = Object.create(World.prototype);
LifeLikeWorld.prototype.__letAct = function(critter, vector){
    var action = critter.act(new View(this, vector));
    //if (action) {console.log(action);}
    var handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);

    if (!handled){
        critter.energy -= 0.2;
        if (critter.energy <= 0){
            console.log(critter.originChar+ " died.....");
            this.grid.set(vector, null);
        }
    }
};


var lifeLikePlan = ["############################",
                    "#####            &    ######",
                    "##   ***                **##",
                    "#   *##**         **  O  *##",
                    "#    ***     O    ##**    *#",
                    "#       O         ##***    #",
                    "#                 ##**     #",
                    "#   O       #*             #",
                    "#*          #**       O    #",
                    "#***     &  ##**    O    **#",
                    "##****     ###*** &     *###",
                    "############################"];

var world2 = new LifeLikeWorld(lifeLikePlan, {'#': Wall,"O": PlantEater, "*": Plant, "&": Predator});
console.log(world2.toString());
var turnCnt = 0;

for(var x = 0; x < 100; x++){
    turnCnt = world2.turn();
    console.log("Turn: "+turnCnt);
    console.log(world2.toString());
    //console.log(world2.status());
}