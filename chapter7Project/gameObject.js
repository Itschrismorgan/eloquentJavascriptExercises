/**
 * Created by chrismorgan on 11/18/14.
 */
(function(){

    function lookFor(icon, surroundings){
        var foundItems = [];
        for(var direction in surroundings){
            if (surroundings[direction] === icon){
                foundItems.push(direction);
            }
        }
        return foundItems;
    }


    var GameEntity = function(avatar){
        this.avatar = avatar;
        this.energy = 0;
        this.act = act;
    };
    function act(surroundings){

        if (this.avatar === 'O'){
            var placesToGo = lookFor('*',surroundings);
            if (placesToGo === []){
                placesToGo = lookFor(' ',surroundings);
            }

        } else if (this.avatar === '*') {
            this.energy += 25;
            if (this.energy >= 100){
                var growHere = lookFor(' ',surroundings);
            }
        }


        return true;
    }


    module.exports = GameEntity;

})();