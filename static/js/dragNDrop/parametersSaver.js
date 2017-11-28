function getInputs(droppedElementIndex) {
    var droppedElement = droppedElements[droppedElementIndex];
	var propertiesPannel = document.getElementById("propertiesPannel").getElementsByTagName("form");
	var inputValues = [];

	for(var i=0; i<propertiesPannel.length; i++){
		var parameterChecked = undefined;
		var parameterValue = undefined;	

		var formNode = propertiesPannel[i];
		//There is a checkbox
		var checkboxNode = formNode[0];
		var parameterChecked = checkboxNode.checked;
		
		if(droppedElement.arguments[i].needs_value){
			var parameterValue = formNode[1].value;
		}

	    var inputValue = {
	        "checked": parameterChecked,
	        "value": parameterValue,
	    };
	    inputValues.push(inputValue);
	}
	return inputValues;
}

function getInputsKeywordInTestcaseInRange(droppedElementIndex, keywordIndexInTestcase, commandIndexInJSON, indexStart, indexEnd) {
    var droppedTestcase = droppedElements[droppedElementIndex];
    var commands = droppedTestcase.keywordJSON[keywordIndexInTestcase].keywordJSON;

	var propertiesPannel = document.getElementById("propertiesPannel").getElementsByTagName("form");
	var inputValues = [];

	for(var i=indexStart; i<indexEnd; i++){
		var parameterChecked = undefined;
		var parameterValue = undefined;	

		var formNode = propertiesPannel[i];
		//There is a checkbox
		var checkboxNode = formNode[0];
		var parameterChecked = checkboxNode.checked;
			
		var currentArgument = commands[commandIndexInJSON].arguments[i-indexStart];

		if(currentArgument.needs_value){
			var parameterValue = formNode[1].value;
		}

	    var inputValue = {
	        "checked": parameterChecked,
	        "value": parameterValue,
	    };
	    inputValues.push(inputValue);
	}
	return inputValues;
}

function getInputsInRange(droppedElementIndex, commandIndexInJSON, indexStart, indexEnd) {
    var droppedElement = droppedElements[droppedElementIndex];
    var commands = droppedElement.keywordJSON;

	var propertiesPannel = document.getElementById("propertiesPannel").getElementsByTagName("form");
	var inputValues = [];

	for(var i=indexStart; i<indexEnd; i++){
		var parameterChecked = undefined;
		var parameterValue = undefined;	

		var formNode = propertiesPannel[i];
		//There is a checkbox
		var checkboxNode = formNode[0];
		var parameterChecked = checkboxNode.checked;
		
		var currentArgument = commands[commandIndexInJSON].arguments[i-indexStart];

		if(currentArgument.needs_value){
			var parameterValue = formNode[1].value;
		}

	    var inputValue = {
	        "checked": parameterChecked,
	        "value": parameterValue,
	    };
	    inputValues.push(inputValue);
	}
	return inputValues;
}

function getInputsExtraInput(droppedElementIndex) {
    var droppedElement = droppedElements[droppedElementIndex];
	var propertiesPannel = document.getElementById("propertiesPannel").getElementsByTagName("form");
	var inputValues = [];

	for(var i=0; i<propertiesPannel.length; i++){

		if(i===0){
			var formNode = propertiesPannel[i];	
			droppedElements[droppedElementIndex].extraValue = formNode[0].value;
		}
		else{
			var parameterChecked = undefined;
			var parameterValue = undefined;	

			var formNode = propertiesPannel[i];
			//There is a checkbox
			var checkboxNode = formNode[0];
			var parameterChecked = checkboxNode.checked;
			
			if(droppedElement.arguments[i-1].needs_value){
				var parameterValue = formNode[1].value;
			}

		    var inputValue = {
		        "checked": parameterChecked,
		        "value": parameterValue,
		    };
		    inputValues.push(inputValue);
		}
	}
	return inputValues;
}

function getTagInputs(droppedElementIndex) {
    var droppedElement = droppedElements[droppedElementIndex];
	var propertiesPannel = document.getElementById("propertiesPannel").getElementsByTagName("form");
	var inputValues = [];

	for(var i=0; i<propertiesPannel.length; i++){

		var parameterChecked = undefined;
		var parameterValue = undefined;

		var formNode = propertiesPannel[i];
		//There is a checkbox
		var checkboxNode = formNode[0];
		var parameterChecked = checkboxNode.checked;

		if(droppedElement.arguments[i].name === "name"){
			var parameterValue = formNode[1].value;
		}
		else if(droppedElement.arguments[i].name === "tags"){
			var chipsID = formNode.children[2].id;
			var data = document.getElementById(chipsID);

			if(data !== null){
				var parameterValue = "";				
				for(var j=0; j<data.children.length-1; j++){
		 			var chipNode = data.children[j];
		 			parameterValue += chipNode.firstChild.data;
		 			if(j+1 < data.children.length-1){
						parameterValue += "; ";
		 			}		 			
		 		}
			}
		}

	    var inputValue = {
	        "checked": parameterChecked,
	        "value": parameterValue,
	    };
	    inputValues.push(inputValue);

	}
	//console.log(inputValues);
	return inputValues;
}

function saveFromInput(droppedElementIndex, elementID){
	if (elementID === undefined ){
		alert("You need to select an item to edit first");
		return;
	}
	var droppedElement = droppedElements[droppedElementIndex];
    if(droppedElement.category === 1){
    	var values = getInputs(droppedElementIndex);        
    }
	else{
        var values = getInputsExtraInput(droppedElementIndex);
    }	
	saveValuesInJSON(droppedElementIndex, values);
	drawParameterList(droppedElementIndex, elementID);	
}

function saveTagFromInput(droppedElementIndex, elementID){
	if (elementID === undefined ){
		alert("You need to select an item to edit first");
		return;
	}
	var values = getTagInputs(droppedElementIndex);
	saveValuesInJSON(droppedElementIndex, values);
	drawParameterList(droppedElementIndex, elementID);	
}

function saveTestcaseFromInput(droppedElementIndex, elementID){
	if (elementID === undefined ){
		alert("You need to select an item to edit first");
		return;
	}
    var droppedTestcase = droppedElements[droppedElementIndex];
    var commands = droppedTestcase.keywordJSON;

    var indexStart = 0;
    var indexEnd = 0;

    var keywordsCategory = 6;

    for(var i=0; i<commands.length; i++){
    	if(commands[i].category === keywordsCategory){
    		var keywordIndexInTestcase = i;
    		var metaData = saveValuesKeywordInTestcase(droppedElementIndex, keywordIndexInTestcase, indexStart, indexEnd);

    		indexStart = metaData.indexStart;
    		indexEnd = metaData.metaData;
    	}else{
	        arguments = commands[i].arguments;
			argumentsDisplayed = getIndexesOfArgumentsDisplayed(arguments);
			indexEnd = indexStart + argumentsDisplayed.length;

			var values = getInputsInRange(droppedElementIndex, i, indexStart, indexEnd);
			saveValuesInKeywordJSON(droppedElementIndex, i, values, argumentsDisplayed);

			indexStart = indexEnd;
    	}
    }
}

function saveValuesKeywordInTestcase(droppedElementIndex, keywordIndexInTestcase, indexStart, indexEnd){
    var droppedTestcase = droppedElements[droppedElementIndex];
    var commands = droppedTestcase.keywordJSON[keywordIndexInTestcase].keywordJSON;


    for(var i=0; i<commands.length; i++){
        arguments = commands[i].arguments;
		argumentsDisplayed = getIndexesOfArgumentsDisplayed(arguments);
		indexEnd = indexStart + argumentsDisplayed.length;

		var values = getInputsKeywordInTestcaseInRange(droppedElementIndex, keywordIndexInTestcase, i, indexStart, indexEnd);
		//console.log(values);
		saveValuesKeywordInTestcaseJSON(droppedElementIndex, keywordIndexInTestcase, i, values, argumentsDisplayed);

		indexStart = indexEnd;
    }

    var metaData = {
        "start": indexStart,
        "end": indexEnd,
    };

    return metaData;
}

function saveKeywordFromInput(droppedElementIndex, elementID){
	if (elementID === undefined ){
		alert("You need to select an item to edit first");
		return;
	}
    var droppedElement = droppedElements[droppedElementIndex];
    var commands = droppedElement.keywordJSON;

    var indexStart = 0;
    var indexEnd = 0;

    for(var i=0; i<commands.length; i++){
        arguments = commands[i].arguments;
		argumentsDisplayed = getIndexesOfArgumentsDisplayed(arguments);
		indexEnd = indexStart + argumentsDisplayed.length;

		var values = getInputsInRange(droppedElementIndex, i, indexStart, indexEnd);
		saveValuesInKeywordJSON(droppedElementIndex, i, values, argumentsDisplayed);

		indexStart = indexEnd;
    }
}

function getIndexesOfArgumentsDisplayed(arguments){
	// Receives an array of arguments and then checks which were modified
	var indexesArgumentsDisplayed = [];
	for(var i=0; i<arguments.length; i++){
		if(!getIfArgumentIsEmpty(arguments[i])){
			indexesArgumentsDisplayed.push(i);
		}
	}
	return indexesArgumentsDisplayed;
}

function saveValuesKeywordInTestcaseJSON(droppedElementIndex, keywordIndexInTestcase, commandIndexInJSON, values, argumentsDisplayed) {
    var droppedTestcase = droppedElements[droppedElementIndex];
    var commands = droppedTestcase.keywordJSON[keywordIndexInTestcase].keywordJSON;

    var arguments = commands[commandIndexInJSON].arguments;

	//console.log(values);
	//console.log(argumentsDisplayed);

    for (var i = 0; i < argumentsDisplayed.length; i++) {
    	var argumentToEdit = argumentsDisplayed[i];
    	//console.log("Argument to edit "+argumentToEdit);

        if (values[i].checked === undefined && (values[i].value === undefined || values[i].value === "")) {
            continue;
        }

        if (values[i].checked !== undefined) {    	
        	droppedTestcase = droppedElements[droppedElementIndex];
        	keywordInsideTestcase = droppedTestcase.keywordJSON[keywordIndexInTestcase].keywordJSON;
        	keywordInsideTestcase[commandIndexInJSON].arguments[argumentToEdit].visible = values[i].checked;
        }

        if (values[i].value !== undefined) {
        	droppedTestcase = droppedElements[droppedElementIndex];
        	keywordInsideTestcase = droppedTestcase.keywordJSON[keywordIndexInTestcase].keywordJSON;
        	keywordInsideTestcase[commandIndexInJSON].arguments[argumentToEdit].value = values[i].value;
        }
    }
}

function saveValuesInKeywordJSON(droppedElementIndex, commandIndexInJSON, values, argumentsDisplayed) {
	var droppedElement = droppedElements[droppedElementIndex];
    var commands = droppedElement.keywordJSON;
    var arguments = commands[commandIndexInJSON].arguments;

	//console.log(values);
	//console.log(argumentsDisplayed);

    for (var i = 0; i < argumentsDisplayed.length; i++) {
    	var argumentToEdit = argumentsDisplayed[i];
    	//console.log("Argument to edit "+argumentToEdit);

        if (values[i].checked === undefined && (values[i].value === undefined || values[i].value === "")) {
            continue;
        }

        if (values[i].checked !== undefined) {
            droppedElements[droppedElementIndex].keywordJSON[commandIndexInJSON].arguments[argumentToEdit].visible = values[i].checked;
        }

        if (values[i].value !== undefined) {
           droppedElements[droppedElementIndex].keywordJSON[commandIndexInJSON].arguments[argumentToEdit].value = values[i].value;
        }
    }
}

function saveValuesInJSON(droppedElementIndex, values) {
	var droppedElement = droppedElements[droppedElementIndex];
    var arguments = droppedElement.arguments;

    for (var i = 0; i < arguments.length; i++) {

        if (values[i].checked === undefined && (values[i].value === undefined || values[i].value === "")) {
            continue;
        }

        if (values[i].checked) {
            droppedElement.arguments[i].visible = true;
        }

        if (values[i].value !== undefined) {
            droppedElement.arguments[i].value = values[i].value;
        }
    }
}