(function() {
	"use strict";
	
	angular.module('Cart.Controller', [])
	.controller('CartController', CartController);
	
	CartController.$inject = ['APIService', 'storeConfig', '$route', 'ShareDataServce', '$location'];
	function CartController(APIService, storeConfig, $route, ShareDataServce, $location) {
		var _this = this;
		var thisFruit = {};
		_this.storeConfig = storeConfig;
		_this.cartData = {
			items: [],
			totalPrice: 0,
			totalCount: 0
		};
		_this.quantity = {};
		
		_this.clearCart = clearCart;
		_this.modifyquantity = modifyquantity;
		_this.removeItem = removeItem;
		_this.goBack = goBack;
		
		function init() {
			var cartData = JSON.parse(localStorage.getItem('AngularStoreCart'));
			if(cartData && cartData.items && cartData.items.length) {
				_this.cartData = cartData;
				_this.cartData.totalCount = _this.cartData.items.length;
			}
		}
		
		function clearCart() {
			_this.cartData = {};
			localStorage.clear();
		}
		
		function goBack() {
			$location.search({});
			$location.path('/');
		}
		
		function modifyquantity(fruit, operation) {
			if(operation === 'increase') {
				fruit.quantity = fruit.quantity + 1;
				_this.cartData.totalCount++;
				_this.cartData.totalPrice += fruit.price;
			} else {
				if(fruit.quantity !==1) {
					fruit.quantity  = fruit.quantity -1;
					_this.cartData.totalCount--;
					_this.cartData.totalPrice -= fruit.price;
				} else {
					return;
				}
			}
			localStorage.setItem('AngularStoreCart', JSON.stringify(_this.cartData));
		}
		
		function removeItem(thisFruit) {
			for(var i=0; _this.cartData.items.length; i++) {
				if(_this.cartData.items[i].id === thisFruit.id) {
					_this.cartData.totalPrice -= (thisFruit.price*thisFruit.quantity);
					_this.cartData.totalCount -= thisFruit.quantity;
					_this.cartData.items.splice(i, 1);
					break;
				}
				
			};
			localStorage.setItem('AngularStoreCart', JSON.stringify(_this.cartData));
		}
		
		init();
	}
})();