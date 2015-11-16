
angular.module('starter.controllers').factory('pois', function($rootScope) {
    function Poi(name, lat, lng, description, summary, category, location) {
        this.name = name;
        this.center={lat: lat, lng: lng};
        this.summary=summary;
        this.category=category;
        this.location=location;
        var desc = description;

        makeText = function(name, dist, description){
          return '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>'+
                  '<div id="bodyContent">'+
                  '<p><b>' + name + '</b>, ' +  description + '</p>'+
                  '<p>Distance Away: ' + dist + '</p>' +
                  '</div>'+
                  '</div>'
        };

        this.getDistanceText = function(){
          var dist = this.getDistance();
          return dist.toFixed(2) + " mi";
        };

        this.getBackgroundColor = function(){
          if(location==="blue")
            return '#B5BBB9';
          else if(location==='red')
            return '#D5B1B1';
          else if(location==='yellow')
            return '#E7CF93';
          else
            return '#C5C5A1';
        };

        this.getMarkerColor = function(){
          if(location==="blue")
            return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
          else if(location==='red')
            return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
          else if(location==='yellow')
            return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
          else
            return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        };

        this.getDistance = function(){
          var radlat1 = Math.PI * lat/180
          var radlat2 = Math.PI * $rootScope.myLat/180
          var radlon1 = Math.PI * lng/180
          var radlon2 = Math.PI * $rootScope.myLng/180
          var theta = lng-$rootScope.myLng
          var radtheta = Math.PI * theta/180
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          dist = Math.acos(dist)
          dist = dist * 180/Math.PI
          dist = dist * 60 * 1.1515
          return dist
        };

        this.getText = function(){
          return makeText(this.name, this.getDistanceText(), desc);
        }; 
    }

    var sundial = new Poi("sundial", 36.001823, -78.93443, "sundial descr", "a sundial", "other", "green");
    var mundial = new Poi("mundial", 36.003, -78.932, "mundial descr", "a mundial","fake", "red");
    var poiMap = [sundial, mundial];

    for(var poi in poiMap){
      var poiMarker = new google.maps.Marker({
        position: poiMap[poi].center,
        animation: google.maps.Animation.DROP,
        optimized: false,
        icon: poiMap[poi].getMarkerColor()

      });

      poiMap[poi].marker = poiMarker;

    }
    return poiMap; 
});