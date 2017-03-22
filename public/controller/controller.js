var app = angular.module('myApp', []);

app.controller('AppCtrl', function($scope,$http) {
	console.log("Hello console")
	var refresh = function(){
		$http.get('/contactlists').then(function(response){
			var data = response.data;
			console.log("i got the data");
			console.log(data);
			$scope.contactlist = data;
			$scope.contact = null;
		});
	};
	refresh();
	
	$scope.addcontact = function(){
		console.log($scope.contact)
		$http.post('/contactlists',$scope.contact).then(function(response){
			var data = response.data;
			console.log(data);
			refresh();
		});
	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlists/'+id).then(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactlists/'+id).then(function(response){
			$scope.contact = response.data;
		});
	};		

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlists/' + $scope.contact._id, $scope.contact).then(function(response){
			refresh();
		});
	};
});
