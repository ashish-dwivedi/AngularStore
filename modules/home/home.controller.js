(function() {
	"use strict";
	
	angular.module('Store.Home.Controller', [])
	.controller('HomeController', HomeController);
	
	HomeController.$inject = ['APIService', 'storeConfig', '$location', 'ShareDataServce'];
	function HomeController(APIService, storeConfig, $location, ShareDataServce) {
		var _this = this;
		_this.storeConfig = storeConfig;
		_this.fruitData = {};
		_this.cartData = {
			items: [],
			totalPrice: 0
		};
		
		_this.addToCart = addToCart;
		_this.goToDetails = goToDetails;
		_this.proceedToCart = proceedToCart;
		
		function init() {
			var cartData = JSON.parse(localStorage.getItem('AngularStoreCart'));
			if(cartData && cartData.items && cartData.items.length) {
				_this.cartData = cartData;
			}
			var promise = APIService.getFruits();
			promise.then(function(result) {
				if(result.status === 200) {
					_this.fruitData = result.data;
					updateSelection();
				}
			}, function(error) {
				console.log('Something went wrong while fetching fruits! Please try again.')
			});
		}
		
		function updateSelection() {
			for(var i=0; i<_this.fruitData.length; i++) {
				for(var j=0; j<_this.cartData.items.length; j++) {
					if(_this.fruitData[i].id === _this.cartData.items[j].id) {
						_this.fruitData[i].selected = true;
					}
				}
			}
		}
		
		function addToCart(item) {
			if(item.selected) {
				item.selected = !item.selected;
				for(var i=0; i<_this.cartData.items.length; i++) {
					if(_this.cartData.items[i].id === item.id) {
						_this.cartData.items.splice(i, 1);
						_this.cartData.totalPrice = _this.cartData.totalPrice - item.price;
						break;
					}
				}
			} else {
				item.selected = true;
				item.quantity = 1;
				_this.cartData.items.push(item);
				_this.cartData.totalPrice = _this.cartData.totalPrice + item.price;
			}
			localStorage.setItem('AngularStoreCart', JSON.stringify(_this.cartData));
			ShareDataServce.setCartData(_this.cartData);
		}
		
		function goToDetails(fruit) {
			var pathParams = {
				id: fruit
			}
			$location.search(pathParams);
			$location.path('/details');
		}
		
		function proceedToCart() {
			$location.path('/cart');
		}
		
		init();
	}
})();