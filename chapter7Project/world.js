/**
 * Created by chrismorgan on 11/18/14.
 */
(function(){

    function processMap(map){
        var returnArray = [];
        var mapRowsCnt = map.length;
        var mapRowWidth = map[0].length;

        for(var y = 0; y < mapRowsCnt; y++){
            for(var x = 0; x < mapRowWidth; x++){
                if(x === 0) { returnArray[y] = []}
                returnArray[y].push(map[y].slice(x,x+1));
            }
        }
        return returnArray;
    }


    var World = function(map){
        this.mapArray = processMap(map);
        this.age = 0;
    };

    World.prototype.view = function(){
        return this.mapArray.map(function(row){
            return row.reduce(function(rowString, location){
                return rowString+location;
            },"");
        },"").join("\n");
    };

    World.prototype.turn = function(){
        this.age++;
      // cycle through all entities in world to enact actions.
        return this.age;
    };



    module.exports = World;
})();