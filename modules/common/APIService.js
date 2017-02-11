(function() {
	"use strict";
	
	angular.module('AngularStore')
	.factory('APIService', APIService);
	
	APIService.$inject = ['$http'];
	function APIService($http) {
		var apiObj = {
			getFruits : getFruits,
			getFruitsDetails : getFruitsDetails
		};
		
		return apiObj;
		
		function getFruits() {
			return $http.get('scripts/user-data/fruits.json');
		}
		
		function getFruitsDetails() {
			return $http.get('scripts/user-data/fruits.details.json');
		}
	}
})();