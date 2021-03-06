/**
 * Created by chrismorgan on 11/25/14.
 */

function parseExpression(program) {
    program = skipSpace(program);
    //console.log(program);
    var match, expr;
    if (match = /^"([^"]*)"/.exec(program))
        expr = {type: "value", value: match[1]};
    else if (match = /^\d+\b/.exec(program))
        expr = {type: "value", value: Number(match[0])};
    else if (match = /^[^\s(),"]+/.exec(program))
        expr = {type: "word", name: match[0]};
    else
        throw new SyntaxError("Unexpected syntax: " + program);

    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string){
    var skippable = string.match(/^(\s|#.*)*/);
    return string.slice(skippable[0].length);
}

function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(")
        return {expr: expr, rest: program};

    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args: []};
    while (program[0] != ")") {
        var arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",")
            program = skipSpace(program.slice(1));
        else if (program[0] != ")")
            throw new SyntaxError("Expected ',' or ')'");
    }
    return parseApply(expr, program.slice(1));
}

function parse(program){
    var result = parseExpression(program);
    if(skipSpace(result.rest).length > 0){
        throw new SyntaxError("Unexpected text after program");
    }
    return result.expr;
}

function evaluate(expr, env){
    switch(expr.type){
        case "value":
            return expr.value;

        case "word":
            if(expr.name in env){
                return env[expr.name];
            } else {
                throw new ReferenceError("Undefined variable: "+expr.name);
            }

        case "apply":
            if(expr.operator.type === "word" && expr.operator.name in specialForms){
                return specialForms[expr.operator.name](expr.args, env);
            }
            var op = evaluate(expr.operator, env);
            if (typeof op !== "function"){
                throw new TypeError("Applying a non-function");
            }
            return op.apply(null, expr.args.map(function(arg){
                return evaluate(arg, env);
            }));
    }
}


var specialForms = Object.create(null);
specialForms["if"] = function(args, env){
    if (args.length !== 3)
        throw new SyntaxError("Bad number of args to if");

    if(evaluate(args[0],env) !== false)
        return evaluate(args[1],env);
    else
        return evaluate(args[2],env);
};
specialForms["while"] = function(args, env){
    if (args.length !== 2)
        throw new SyntaxError("Bad number of args to while loop");
    while(evaluate(args[0], env) !== false){
        evaluate(args[1],env);
    }

    return false;
};
specialForms["do"] = function(args,env){
    var value = false;
    args.forEach(function(arg){
        value = evaluate(arg,env);
    });
    return value;
};
specialForms["define"] = function(args,env){
    if(args.length !== 2 || args[0].type !== "word"){
        throw new SyntaxError("Bad use of define");
    }
    var value = evaluate(args[1], env);
    env[args[0].name] = value;
    return value;
};

var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;
["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
    topEnv[op] = new Function("a, b", "return a " + op + " b;");
});
topEnv["print"] = function(value) {
    console.log(value);
    return value;
};

function run() {
    var env = Object.create(topEnv);
    var program = Array.prototype.slice
        .call(arguments, 0).join("\n");
    return evaluate(parse(program), env);
}

specialForms["fun"] = function(args, env) {
    if (!args.length)
        throw new SyntaxError("Functions need a body");
    function name(expr) {
        if (expr.type != "word")
            throw new SyntaxError("Arg names must be words");
        return expr.name;
    }
    var argNames = args.slice(0, args.length - 1).map(name);
    var body = args[args.length - 1];

    return function() {
        if (arguments.length != argNames.length)
            throw new TypeError("Wrong number of arguments");

        /* This line here allows for closures.  It creates a new local scope 'Enviroment' by using the
            enviroment as the prototype. New values are added to the local enviroment.*/
        var localEnv = Object.create(env);


        for (var i = 0; i < arguments.length; i++)
            localEnv[argNames[i]] = arguments[i];
        return evaluate(body, localEnv);
    };
};

// Array function exercise
topEnv["array"] = function(){
    var array = [];
    for(var x = 0; x < arguments.length; x++){
        array.push(arguments[x]);
    }
    return array;
};

topEnv["length"] = function(array){
    return array.length;
};


topEnv["element"] = function(array,index){
    return array[index];
};

specialForms["set"] = function(args, env) {
    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of set");
    var varName = args[0].name;
    var value = evaluate(args[1], env);

    for (var scope = env; scope; scope = Object.getPrototypeOf(scope)) {
        if (Object.prototype.hasOwnProperty.call(scope, varName)) {
            scope[varName] = value;
            return value;
        }
    }
    throw new ReferenceError("Setting undefined variable " + varName);
};







    console.log(parse("+(a, 10)"));
// → {type: "apply",
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}”


var prog = parse("if(true, false, true)");
console.log(evaluate(prog, topEnv));
// false

run("do(define(total, 0),",
    "   define(count, 1),",
    "   while(<(count, 11),",
    "         do(define(total, +(total, count)),",
    "            define(count, +(count, 1)))),",
    "   print(total))");
// → 55

run("do(define(plusOne, fun(a, +(a, 1))),",
    "   print(plusOne(10)))");
// → 11

run("do(define(pow, fun(base, exp,",
    "     if(==(exp, 0),",
    "        1,",
    "        *(base, pow(base, -(exp, 1)))))),",
    "   print(pow(2, 10)))");
// → 1024

run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
// → 6

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}


run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");
// → 50
run("set(quux, true)");
// → Some kind of ReferenceError