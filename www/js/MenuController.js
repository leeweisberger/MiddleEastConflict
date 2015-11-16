angular.module('starter.controllers').controller('MenuController', function($scope,$rootScope, pois, centers) {
  $rootScope.list=[];
  $rootScope.num=0;
  for(var c in centers){

    $rootScope.list.push({name:c,checked:true});
  }
  $rootScope.list.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
  $scope.testmodel = function(){
    $rootScope.num++;
  };
  
});