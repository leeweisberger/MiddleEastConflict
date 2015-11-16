angular.module('starter.controllers').directive('map', function() {
  return {
    restrict: 'AEC',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {


      function initialize() {
        var mapOptions = {
                center: new google.maps.LatLng(35.999051, -78.938949),
                zoom: 2,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
        };


      var map = new google.maps.Map($element[0], mapOptions);

      $scope.onCreate({map: map});
    }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});