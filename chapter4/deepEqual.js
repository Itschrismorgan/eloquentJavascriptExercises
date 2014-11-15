/**
 * Created by chrismorgan on 11/10/14.
 */

function deepEqual(a,b){
    if(typeof a === "object" && typeof b === "object"){
        if (a === null && b === null){
            return true;
        } else if (a !== null && b !== null){
            for(var prop in a){
                var returnResult = deepEqual(a[prop],b[prop]);
                if (returnResult === false){
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    } else if(typeof a !== "object" && typeof b !== "object"){
            return (a === b);
    } else {
        return false;
    }
}



console.log(deepEqual(4,5));
console.log(deepEqual(4,4));
console.log(deepEqual(4,{value: 4}));


console.log(deepEqual(null,null));
console.log(deepEqual(null, {value: 4}));

console.log(deepEqual({value:4},{value:4}));

var obj1 = {
    value: 4,
    name: "Chris",
    info: {
        yob: 1976,
        hairColor: "blond",
        family: {
            father: "Harry Morgan",
            mother: "Karen Morgan"
        }
    }
};

var obj2 = {
    value: 4,
    name: "Chris",
    info: {
        yob: 1976,
        hairColor: "blond",
        family: {
            father: "Harry Morgan",
            mother: "Karen Morgan"
        }
    }
};

var obj3 = {
    value: 4,
    name: "Chris",
    info: {
        yob: 1976,
        hairColor: "blond",
        family: {
            father: "Harry Morgan",
            mother: "Kathy Morgan"
        }
    }
};

var obj4 = {
    value: 4,
    name: "Chris",
    info: {
        yob: 1976,
        hairColor: "blond",
        family: {
            mother: "Kathy Morgan"
        }
    }
};

console.log("Compare obj1,obj2");
console.log(deepEqual(obj1,obj2));
console.log("Compare obj2,obj3");
console.log(deepEqual(obj2,obj3));
console.log("Compare obj3,obj4");
console.log(deepEqual(obj3,obj4));