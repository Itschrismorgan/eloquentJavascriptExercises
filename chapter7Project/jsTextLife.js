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

var testObj = new GameEntity("&");
testObj.act([]);

//Add animals
gameWorld.registerEntity(new GameEntity("O"));
gameWorld.registerEntity(new GameEntity("O"));
gameWorld.registerEntity(new GameEntity("O"));

//Add plants
gameWorld.registerEntity(new GameEntity("*"));
gameWorld.registerEntity(new GameEntity("*"));
gameWorld.registerEntity(new GameEntity("*"));



console.log(gameWorld.toString());
gameWorld.turn();
//console.log(gameWorld.view());