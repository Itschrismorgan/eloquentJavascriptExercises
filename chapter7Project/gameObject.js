/**
 * Created by chrismorgan on 11/18/14.
 */
(function(){


    var GameEntity = function(avatar){
        this.avatar = avatar;
    };
    GameEntity.prototype.act = function(){
        return true;
    };


    module.exports = GameEntity;

})();