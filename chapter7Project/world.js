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

    function entityHere(entities, checkLocation){
        for(var x = 0; x < entities.length; x++){
            if(entities[x].location.x === checkLocation.x && entities[x].location.y === checkLocation.y){
                return true;
            }
        }
        return false;
    }

    function isLocationUnoccupied(map, entities, checkLocation){
        if(map[checkLocation.y][checkLocation.x] === "#"){
            return false;
        } else if (entityHere(entities,checkLocation)){
            return false;
        } else {
            return true;
        }
    }

    function pickRandomLocation(map, entities) {
        var location = {'x': 0, 'y': 0};
        while(!isLocationUnoccupied(map, entities, location)){
            location.x = Math.floor(Math.random() * map[0].length);
            location.y = Math.floor(Math.random() * map.length);
        }
        return location;
    }

    function mapWithEntities(map, entities) {
        var completeMap = map;

        entities.map(function(entity){
            completeMap[entity.location.y][entity.location.x] = entity.object.avatar;
        });

        return completeMap;
    }




    var World = function(map){
        this.mapArray = processMap(map);
        this.age = 0;
        this.entities = [];
    };

    World.prototype.view = function(){
        return mapWithEntities(this.mapArray,this.entities).map(function(row){
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

    World.prototype.registerEntity = function(entity){
        var newEntity = {};
        newEntity.object = entity;
        newEntity.location = pickRandomLocation(this.mapArray, this.entities);
        this.entities.push(newEntity);
    };



    module.exports = World;
})();