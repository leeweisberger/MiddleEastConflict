angular.module('starter.controllers').controller('MenuController', function($scope,$rootScope, pois, centers) {
  $rootScope.list=[];
  $rootScope.num=0;
  for(var c in centers){

    $rootScope.list.push({name:c,checked:true});
  }
  $rootScope.list.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
  // $rootScope.list.unshift({name:'None',checked:false});
  $scope.all = function(){
   
	$rootScope.list.forEach(function(l){
		l.checked=true;
	});
    $rootScope.num++;

  };
  $scope.none = function(){
   
	$rootScope.list.forEach(function(l){
		l.checked=false;
	});
    $rootScope.num++;

  };

  $scope.testmodel = function(){
  	$rootScope.num++;
  };
  
});