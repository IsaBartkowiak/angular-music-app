/**
 * @ngdoc function
 * @name reTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reTestApp
 */

 'use strict';

 var APP_ID = '156241';
 var CHANNEL_URL = './channel.html';
 var appControllers = angular.module('appControllers', []);

 appControllers.controller('MusicCtrl', ['$http', '$rootScope', '$scope', '$timeout', function($http, $rootScope, $scope, $timeout){
 	var music = this;
 	$scope.tracks = {};
 	$scope.tracksId = [];
 	$scope.currentTrack = {};
 	$scope.currentTrack.title = null;
 	$scope.currentTrack.timeCurrent = 0.0;
 	$scope.currentTrack.timeTotal = 0.0;

 		//---- récupération des données
 		$http.get('data/musics.json').success(function(data){
 			$scope.tracks = data;
 			angular.forEach($scope.tracks, function(value, key) {
 				$scope.tracksId.push(value.trackId);
 				var url = 'http://api.deezer.com/track/' + value.trackId + '&output=jsonp&callback=JSON_CALLBACK';
 				$http.jsonp(url).success(function(response){
 					if(angular.isDefined(response)){
 						value.artist = response.artist.name;
 						value.title = response.title;
 						value.img = response.artist.picture_medium;
 						value.duration = response.duration;
 					}
 				});		
 			}, this);
 			$scope.currentTrack.title = $scope.tracks[0].title;
 		});	

 		DZ.init({
 			appId : APP_ID,
 			channelUrl : CHANNEL_URL, 
 			player: {
 				container: 'player',
 				width: 800,
 				height: 400,
	    //playlist: false,
	    onload: function(response) {
	    	DZ.player.playTracks($scope.tracksId);
	    }
	}
});	
 		DZ.player.playTracks([23, 22], true);
 		$scope.play = function(track_id){
 			DZ.player.playTracks([track_id]);
 			$scope.currentTrack.isPlaying = true;
 		};

 		$scope.prev = function(){
 			DZ.player.prev();
 		};

 		$scope.start = function(){
 			if($scope.currentTrack.isPlaying){
 				DZ.player.pause();
 				$scope.currentTrack.isPlaying = false;
 			}else{
 				DZ.player.play();
 				$scope.currentTrack.isPlaying = true;
 			}
 		};

 		$scope.stop = function(){
 			DZ.player.pause();
 			$scope.currentTrack.isPlaying = false;
 		};

 		$scope.next = function(){
 			DZ.player.next();
 		};

 		$scope.move = function(e) {
 			var positionClicked = e.offsetX;
 			var bar = e.target.className === 'time-progress' ? e.target.parentNode : e.target;
 			var widthOfProgressBar = bar.offsetWidth;
 			DZ.player.seek(positionClicked / widthOfProgressBar * 100);
 			$scope.currentTrack.isPlaying = true;
 		};

 		DZ.Event.subscribe('current_track', function(track, evt_name){
 			$timeout(function(){
 				var currentTrack = DZ.player.getCurrentTrack();
 				console.log(currentTrack);
 				var url = 'http://api.deezer.com/track/' + currentTrack.id + '&output=jsonp&callback=JSON_CALLBACK';
 				$http.jsonp(url).success(function(response){
 					if(angular.isDefined(response)){
 						$scope.currentTrack = response;
 						$scope.currentTrack.isPlaying = true;
 					}
 				});			
 			}, 1);
 		});

 		DZ.Event.subscribe('player_position', function(e){
 			$scope.currentTrack.timeCurrent = e[0];
 			if (e[1]) {
 				$scope.currentTrack.timeTotal = +e[1];
 			}
 			$scope.$apply();
 		});

 	}]);

appControllers.controller('MainCtrl', ['$http', function($http){
	var test = this;
	this.newMusic = {};
	test.musics = [];
	$http.get('data/musics.json').success(function(data){
		test.musics = data;
	});
	this.addMusic = function() {  	
		test.musics.push(this.newMusic);
		this.newMusic = {};
	};
}]);
