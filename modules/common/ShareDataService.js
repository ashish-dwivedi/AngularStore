(function() {
	"use strict";
	
	angular.module('AngularStore')
	.factory('ShareDataServce', ShareDataServce);
	
	ShareDataServce.$inject = [];
	function ShareDataServce() {
		var cartData = {};
		var serviceObj = {
			getCartData : getCartData,
			setCartData : setCartData
		};
		
		return serviceObj;
		
		function getCartData() {
			return cartData;
		}
		
		function setCartData(cart) {
			cartData = cart;
		}
	}
})();