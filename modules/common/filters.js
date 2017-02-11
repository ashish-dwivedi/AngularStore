(function() {
	"use strict";
	
	angular.module('AngularStore')
	.filter('userInput', userInput);
	
	function userInput() {
		return function (input, filter) {
			var localArray = [];
			if(filter) {
				filter = filter.toLowerCase();
				for(var i=0; i<input.length; i++) {
					if(input[i].fruit.toLowerCase().indexOf(filter)!==-1 || input[i].description.toLowerCase().indexOf(filter)!==-1) {
						localArray.push(input[i]);
					}
				}
				return localArray;
			} else {
				return input;
			}
        };
	}
})();