/**
 * Created by chrismorgan on 11/17/14.
 */


function Sequencer(numberList){
    this.numberList = numberList;
    this.currentIndex = 0;
}
Sequencer.prototype.next = function(){
    if(this.currentIndex+1 >= this.numberList.length){
        return false;
    }
    this.currentIndex++;
    return true;
};
Sequencer.prototype.currentValue = function(){
    return this.numberList[this.currentIndex];
};


function RangeSequencer(begin, end){
    this.array = [];
    if (end > begin) {
        for(var x = begin; x <= end; x++){
            this.array.push(x);
        }
    } else {
        for(var x = begin; x >= end; x--){
            this.array.push(x);
        }
    }
    this.iterator = new Sequencer(this.array);
}
RangeSequencer.prototype.next = function(){
    return this.iterator.next();
};
RangeSequencer.prototype.currentValue = function(){
    return this.iterator.currentValue();
};


function logFive(numberCycler){
    for(var x = 0; x < 5; x++){
        console.log(numberCycler.currentValue());
        if(numberCycler.next() === false){
            break;
        }
    }
}


var testSeq = new Sequencer([3,6,9]);
console.log(testSeq.currentValue());
testSeq.next();
console.log(testSeq.currentValue());
testSeq.next();
console.log(testSeq.currentValue());
testSeq.next();

var testRangeUp = new RangeSequencer(1,5);
console.log(testRangeUp.currentValue());
testRangeUp.next();
console.log(testRangeUp.currentValue());
testRangeUp.next();
console.log(testRangeUp.currentValue());
testRangeUp.next();
var testRangeDown = new RangeSequencer(5,1);
console.log(testRangeDown.currentValue());
testRangeDown.next();
console.log(testRangeDown.currentValue());
testRangeDown.next();
console.log(testRangeDown.currentValue());
testRangeDown.next();

console.log("\n\n\n");

logFive(new Sequencer([1, 2]));
// → 1
// → 2
logFive(new RangeSequencer(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104