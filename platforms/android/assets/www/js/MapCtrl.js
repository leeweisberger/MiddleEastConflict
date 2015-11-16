angular.module('starter.controllers').controller('MapCtrl', function($scope, pois, $ionicLoading, $rootScope) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
    var marker = new google.maps.Marker({
      position: {lat: -25.363, lng: 131.044},
      icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 5
      },
      
      map: map,
      title: 'Your Location'
    });
    $scope.marker=marker;
    $scope.watching=false;
    

      for(var poi in pois){
        var p = pois[poi];
        p.marker.setMap(map);
        p.marker.addListener('click', markerClick(map, p));
      }

    $scope.centerOnMe();

    function markerClick(map, p){
      return function(){
        map.setZoom(18);
        map.panTo(p.center);
        var infowindow = new google.maps.InfoWindow({
          content: p.getText()
        });
        infowindow.open(map, p.marker);
      }
    }
  };

  $scope.centerOnMe = function () {
    if (!$scope.map) {
      return;
    }

    if($scope.watching==true){
      $scope.map.panTo($scope.marker.getPosition());
      $scope.map.setZoom(18);
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

  
  function onSuccess(position) {
      $rootScope.myLat = position.coords.latitude;
      $rootScope.myLng = position.coords.longitude;
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var heading = position.coords.heading;
      var icon = $scope.marker.getIcon();

      if(heading){
        icon.rotation=heading;
      }
      $scope.marker.setIcon(icon);
      $scope.marker.setPosition(pos);
      $scope.loading.hide();
      if($scope.watching==false)
        $scope.map.setCenter($scope.marker.getPosition());
      
      $scope.watching=true;

  }
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
      $scope.loading.hide();
  }

  var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
  };
});