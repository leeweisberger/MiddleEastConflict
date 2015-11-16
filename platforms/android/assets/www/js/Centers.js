angular.module('starter.controllers').factory('centers', function($rootScope) {
       var c = new Object(); // or var map = {};
       c['TURKEY'] = {lat: 39.9167, lng: 32.8333};
       c['IRAQ'] = {lat: 33.3333, lng: 44.4333};
        c['EGYPT'] = {lat: 26.0000, lng: 30.0000};

        c['ISRAEL'] = {lat: 31, lng: 35};
       c['JORDAN'] = {lat: 31.9500, lng: 35.9333};
        c['PALESTINIAN TERRITORY, OCCUPIED'] = {lat: 31.6253, lng: 35.1453};

        c['LEBANON'] = {lat: 33.9000, lng: 35.5333};
       c['YEMEN'] = {lat: 15, lng: 48};
        c['SYRIAN ARAB REPUBLIC'] = {lat: 33.5000, lng: 36.3000};

        c['UNITED ARAB EMIRATES'] = {lat: 24.4667, lng: 54.3667};
       c['SAUDI ARABIA'] = {lat: 24, lng: 45};
        c['OMAN'] = {lat: 23.6000, lng: 58.5500};

       return c;
});