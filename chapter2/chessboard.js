/**
 * Created by chrismorgan on 11/9/14.
 */

var boardSize = 16;
var chessBoard = "";
var firstSpace = "#";
var secondSpace = " ";
var tempSpace = "";

for(var space = 1; space <= boardSize*boardSize; space++){
    if(space%2 === 0){
        chessBoard = chessBoard+secondSpace;
    } else {
        chessBoard = chessBoard+firstSpace;
    }
    if(space%boardSize === 0){
        chessBoard = chessBoard + "\n";
        tempSpace = firstSpace;
        firstSpace = secondSpace;
        secondSpace = tempSpace;
    }
}


console.log(chessBoard);