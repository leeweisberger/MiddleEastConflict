angular.module('starter.controllers').controller('MapCtrl', function($scope, $rootScope, pois, centers) {
  $scope.rangeValue = 0;
    $scope.year = 1991;
    $scope.month='01';
    $scope.lines=[];
    $scope.markers=[];
  $scope.mapCreated = function(map) {
    $scope.pois=pois;
    $scope.map = map;
    $scope.windows=[];

    for(var center in centers){
      var marker = new google.maps.Marker({
        position: centers[center],
        map: $scope.map,
        title: center
      });
    }

    $scope.drawData();
        
    
  };
$scope.makeLine = function(countries, c1, c2, line, map) {
   var infowindow = new google.maps.InfoWindow({
            content: '<h1 id="firstHeading" class="firstHeading">' + c1 + ' - ' + c2 + '</h1>'+
                  '<div id="bodyContent">'+
                  '<p><b> cooperation</b>: ' +  countries[c1][c2].coop + '</p>'+
                  '<p><b> conflict</b>: ' +  countries[c1][c2].confl + '</p>'+

                  '</div>' 
          });
          $scope.windows.push(infowindow);
          google.maps.event.addListener(line, 'mouseover', function (event) {
            // lineHover(event.latLng.lat(),event.latLng.lng(), infowindow);
            $scope.windows.forEach(function(w){
              w.close();
            });
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            line.position={lat:lat, lng:lng};
            infowindow.open(map, line);               
          });

          var diff = Math.abs((countries[c1][c2].coop - countries[c1][c2].confl)/
          ((countries[c1][c2].confl+countries[c1][c2].coop)/2));

          if(diff>.5 && countries[c1][c2].coop>countries[c1][c2].confl)
                line.setOptions({strokeColor: 'green'});
          else if(diff>.5 && countries[c1][c2].confl>countries[c1][c2].coop)
            line.setOptions({strokeColor: 'red'});
          else
            line.setOptions({strokeColor: 'yellow'});

          var total = countries[c1][c2].confl+countries[c1][c2].coop;
          if(total>20){
            line.setOptions({strokeWeight: 3});
          }
          if(total>50){
            line.setOptions({strokeWeight: 4});
          }
          if(total>100){
            line.setOptions({strokeWeight: 5});
          }
          if(total>200){
            line.setOptions({strokeWeight: 6});
          }
          if(total>500){
            line.setOptions({strokeWeight: 7});
          }
          if(total>1000){
            line.setOptions({strokeWeight: 8});
          }
          if(total>1500){
            line.setOptions({strokeWeight: 9});
          }


          
};

$scope.drag = function(value) {
    $scope.year = Math.floor(value / 12) + 1991;
    $scope.month = value % 12 +1;
    if($scope.month<10){
      $scope.month="0"+$scope.month;
    }
    $scope.month=""+$scope.month;
    
    $scope.drawData();

};

$scope.drawData = function(){
  

  for(var l in $scope.lines){
      $scope.lines[l].setMap(null);
    }
    $scope.lines=[];

  var countries = pois[$scope.year+$scope.month];
    for(var c1 in countries){
      for(var c2 in countries[c1]){
          // if(!$scope.isChecked("None"))
          //   continue;
          if(!$scope.isChecked(c2) && !$scope.isChecked(c1))
            continue;
          var p1 = centers[c1];
          var p2 = centers[c2];
          var x = countries[c1][c2];
          var line = new google.maps.Polyline({
              path: [p1,p2],
              geodesic: true,
              strokeColor: '#FF000',
              strokeOpacity: .8,
              strokeWeight: 2,
              position: p1
          }); 
          line.setMap($scope.map);
          $scope.makeLine(countries, c1, c2, line, $scope.map);
          $scope.lines.push(line);
      }
    }

  };

$rootScope.$watch('num', function(){
  $scope.drawData();
});

$scope.isChecked = function(country){
  for(c in $rootScope.list){

    if($rootScope.list[c].name===country)
      return $rootScope.list[c].checked;
  }
  return true;
};


});