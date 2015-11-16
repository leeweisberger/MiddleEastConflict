angular.module('starter.controllers').controller('PoisCtrl', function($scope, pois) {
  $scope.poiMap=pois;
  $scope.mySort='Name';
  $scope.showPOI = function(poi){
    google.maps.event.trigger(poi.marker, 'click');
  };
  $scope.sortChanged = function(mySort){
    $scope.mySort=mySort;
  };

  $scope.sortList = function(poi){
    if($scope.mySort==='Name'){
      return poi.name;
    }
    if($scope.mySort==='Proximity'){      
      return poi.getDistance();
    }
    if($scope.mySort==='Category'){      
      return poi.category;
    }
  };
});