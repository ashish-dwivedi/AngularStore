(function() {
	"use strict";
	
	angular.module('AngularStore', [
		'ngRoute',
		'ngAnimate',
		'ui.bootstrap',
		'Store.Home',
		'Item.Details',
		'Cart'
	])
	.constant('storeConfig', {
		currency : '$'
	});
})();