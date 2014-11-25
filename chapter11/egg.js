/**
 * Created by chrismorgan on 11/25/14.
 */


function parseExpression(program){
    program = skipSpace(program);
    var match, expr;
    if (match = /^"([^"]*)"/.exec(program)){
        expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)){
        expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),"]=/.exec(program)){
        expr = {type: "word", value: match[0]};
    } else {
        throw new SyntaxError("Unexpected Syntax: "+program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string){
    var first = string.search(/\S/);
    if (first === -1) {
        return "";
    }
    return string.slice(first);
}