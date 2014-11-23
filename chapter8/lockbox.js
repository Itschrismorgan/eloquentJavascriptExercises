/**
 * Created by chrismorgan on 11/23/14.
 */

var box = {
    locked: true,
    unlock: function() {this.locked = false;},
    lock: function() {this.locked = true},
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};


function withBoxUnlocked(body) {
    try {
        box.unlock();
        body();
        box.lock();
    } catch (e) {
        box.lock();
        throw e;
    }
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}
console.log(box.locked);
// → true


withBoxUnlocked(function(){
    console.log(box.content);
});