angular.module('starter.controllers').directive('map', function() {
  return {
    restrict: 'AEC',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      var overlay;

      USGSOverlay.prototype = new google.maps.OverlayView();

function initialize() {
  var mapOptions = {
          center: new google.maps.LatLng(35.999051, -78.938949),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
  };

  var map = new google.maps.Map($element[0], mapOptions);

   var opt = {minZoom: 14};
   map.setOptions(opt);

  var imageBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(35.999051,-78.938949), 
          new google.maps.LatLng(36.005796,-78.926957));

  var srcImage = 'http://i62.tinypic.com/mccdty.jpg';

  overlay = new USGSOverlay(imageBounds, srcImage, map);
  $scope.onCreate({map: map});
}

function USGSOverlay(bounds, image, map) {
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;
  this.div_ = null;
  this.setMap(map);
}

USGSOverlay.prototype.onAdd = function() {
  var div = document.createElement('div');
  div.style.border = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  div.appendChild(img);
  this.div_ = div;
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(this.div_);
};

USGSOverlay.prototype.draw = function() {
  var overlayProjection = this.getProjection();
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};
      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});