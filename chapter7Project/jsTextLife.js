/**
 * Created by chrismorgan on 11/18/14.
 *
 * My own implementation of life simulation
 */


var World = require("./world");
var GameEntity = require("./gameObject");


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

var animal1 = new GameEntity("O");
var plant1 = new GameEntity("*");

gameWorld.registerEntity(animal1);


//console.log(gameWorld.view());
//gameWorld.turn();
//console.log(gameWorld.view());