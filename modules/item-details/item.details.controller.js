(function() {
	"use strict";
	
	angular.module('Item.Details.Controller', [])
	.controller('ItemDetailsController', ItemDetailsController);
	
	ItemDetailsController.$inject = ['APIService', 'storeConfig', '$route', 'ShareDataServce', '$location'];
	function ItemDetailsController(APIService, storeConfig, $route, ShareDataServce, $location) {
		var _this = this;
		var thisFruit = {};
		_this.storeConfig = storeConfig;
		_this.detailsData = {
			id: '',
			details: {}
		};
		_this.cartData = {
			items: [],
			totalPrice: 0
		};
		_this.ratingArray = [0, 1, 2, 3, 4];
		
		_this.addToCart = addToCart;
		_this.removeFromCart = removeFromCart;
		_this.goToCart = goToCart;
		_this.goBack = goBack;
		
		function init() {
			//_this.cartData = ShareDataServce.getCartData();
			_this.detailsData.id = $route.current.params.id;
			var cartData = JSON.parse(localStorage.getItem('AngularStoreCart'));
			if(cartData && cartData.items && cartData.items.length) {
				_this.cartData = cartData;
			}
			if(_this.cartData.items && _this.cartData.items.length) {
				for(var i=0; i<_this.cartData.items.length; i++) {
					if(_this.cartData.items[i].fruit === _this.detailsData.id) {
						_this.detailsData.isInCart = true;
					}
				}
			}
			var promise = APIService.getFruitsDetails();
			promise.then(function(result) {
				if(result.status === 200) {
					_this.detailsData.data = result.data[_this.detailsData.id];
					var fullDataPromise = APIService.getFruits();
					fullDataPromise.then(function(response) {
						if(response.status === 200) {
							_this.detailsData.fullData = response.data;
							thisFruit = _this.detailsData.fullData.filter(function(fruit) {
								return (fruit.fruit === _this.detailsData.id);
							})[0];
						}
					}, function(error) {
						console.log('Something went wrong while fetching fruits! Please try again.')
					});
				}
			}, function(error) {
				console.log('Something went wrong while fetching fruits details! Please try again.')
			});
		}
		
		function addToCart() {
			thisFruit.quantity = 1;
			_this.cartData.items.push(thisFruit);
			_this.detailsData.isInCart = true;
			_this.cartData.totalPrice = _this.cartData.totalPrice + thisFruit.price;
			localStorage.setItem('AngularStoreCart', JSON.stringify(_this.cartData));
		}
		
		function removeFromCart() {
			_this.detailsData.isInCart = false;
			_this.cartData.totalPrice = _this.cartData.totalPrice - thisFruit.price;
			for(var i=0; _this.cartData.items.length; i++) {
				if(_this.cartData.items[i].id === thisFruit.id) {
					_this.cartData.items.splice(i, 1);
					break;
				}
				
			};
			localStorage.setItem('AngularStoreCart', JSON.stringify(_this.cartData));
		}
		
		function goToCart() {
			$location.search({});
			$location.path('/cart');
		}
		
		function goBack() {
			$location.search({});
			$location.path('/');
		}
		
		init();
	}
})();
