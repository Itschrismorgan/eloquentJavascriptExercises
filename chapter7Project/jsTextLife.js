/**
 * Created by chrismorgan on 11/18/14.
 */
var World = require("./world.js");


var map =  ["############################",
            "#####                 ######",
            "##                        ##",
            "#    ##                   ##",
            "#                 ##       #",
            "#                 ##       #",
            "#                 ##       #",
            "#           #              #",
            "#           #              #",
            "#           ##             #",
            "##         ###           ###",
            "############################"];



var gameWorld = new World(map);


console.log(gameWorld.view());
gameWorld.turn();
console.log(gameWorld.view());