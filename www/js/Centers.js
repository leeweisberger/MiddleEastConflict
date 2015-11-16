angular.module('starter.controllers').factory('centers', function($rootScope) {
       var c = new Object(); // or var map = {};
       c['TURKEY'] = {lat: 39.059012, lng: 34.911546};
       c['IRAQ'] = {lat: 33, lng: 44};
        c['EGYPT'] = {lat: 26.0000, lng: 30.0000};

        c['ISRAEL'] = {lat: 31.5, lng: 34.75};
       c['JORDAN'] = {lat: 31, lng: 36};
        c['PALESTINIAN TERRITORY, OCCUPIED'] = {lat: 31.6253, lng: 35.1453};


        c['LEBANON'] = {lat: 33.833333, lng: 35.833333};
       c['YEMEN'] = {lat: 15, lng: 48};
        c['SYRIAN ARAB REPUBLIC'] = {lat: 35, lng: 38};

        c['UNITED ARAB EMIRATES'] = {lat: 24, lng: 54};
       c['SAUDI ARABIA'] = {lat: 24, lng: 45};
        c['OMAN'] = {lat: 21, lng: 57};

       return c;
});