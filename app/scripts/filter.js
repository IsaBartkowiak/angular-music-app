/************
  FILTERS
*************/

'use strict';

var appFilters = angular.module('appFilters', []);

appFilters.filter('humanTime', function(){
	return function(time){
		if(time && time > 0.0) {
			var sec = parseInt(time % 60);
			return parseInt(time / 60) + ":" + (sec < 10 ? '0' + sec : sec);
		}
		else {
			return '0:00';
		}
	};
});