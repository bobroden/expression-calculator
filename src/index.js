function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    function calc (array) {
    	for(var i = 0; i < array.length; i++)
			if(array[i] == "*") {
				var prm = +array[i-1] * +array[i+1];
				array.splice(i-1, 3, prm);
				i = 0;
			}
			else if (array[i] == "/") {
				if(array[i+1] == "0")
					throw Error("TypeError: Division by zero.");
				var prm = +array[i-1] / +array[i+1];
				array.splice(i-1, 3, prm);
				i = 0;
			}
    		for(var i = 0; i < array.length; i++)
	    		if(array[i] == "+") {
	    			var prm = +array[i-1] + +array[i+1];
	    			array.splice(i-1, 3, prm);
	    			i = 0;
	    		}
	    		else if(array[i] == "-") {
	    			var prm = +array[i-1] - +array[i+1];
	    			array.splice(i-1, 3, prm);
	    			i = 0;
	    		}
    	return array[0];
	}
	var arr = [];
	var s = "";
    for(var i = 0; i < expr.length; i++)
    	if(expr[i] == " ") {
    		var s = " ";
    		break;
    	}
    arr = expr.split(s);
    for(var i = 0; i < arr.length; i++)
    	if(arr[i] == "") {
    		arr.splice(i, 1);
    		i--;
    	}
    var brack = [];
    for(var i = 0; i < arr.length; i++)
    	if(arr[i] == "(" || arr[i] == ")")
    		brack.push([i, arr[i]])
    for(var i = 0; i < brack.length; i++)
    	if(brack[i][1] == "(" && brack[i+1][1] == ")") {
    		var newarr = arr.slice(brack[i][0] + 1, brack[i+1][0])
    		var prm = calc(newarr);
    		arr.splice(brack[i][0], brack[i+1][0] - brack[i][0] + 1, prm);
    		brack = [];
    		for(var j = 0; j < arr.length; j++)
    			if(arr[j] == "(" || arr[j] == ")")
    				brack.push([j, arr[j]]);
    		i = -1;
    	}
    var res = calc(arr);
    if(isNaN(res))
    	throw Error("ExpressionError: Brackets must be paired");
    return res;
}

module.exports = {
    expressionCalculator
}