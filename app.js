var weatherApp=angular.module('weatherApp',['ngRoute','ngResource']);
weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    .when('/forecast',{
        templateUrl:'pages/forecast.html',
        controller:'forecastController'
    })
    .when('/forecast/:days',{
       templateUrl:'pages/forecast.html',
       controller:'forecastController'
        
    });

});

//HOMECONTROLLER
weatherApp.controller('homeController', ['$scope','cityService','comfortService', function($scope,cityService,comfortService){
    
    $scope.cityName=cityService.cityName;
    $scope.comfortTemp=comfortService.comfortTemp;
    $scope.comfortHumid=comfortService.comfortHumid;
    $scope.$watch('cityName',function(){
       cityService.cityName=$scope.cityName; 
    });
    $scope.$watch('comfortTemp',function(){
       comfortService.comfortTemp=$scope.comfortTemp; 
    });
    $scope.$watch('comfortHumid',function(){
       comfortService.comfortHumid=$scope.comfortHumid; 
    });
    $scope.cityName='';
    $scope.comfortTemp='';
    $scope.comfortHumid='';
    
}]);



//FORECASTCONTROLLER
weatherApp.controller('forecastController', ['$scope','$resource','$routeParams','cityService','comfortService', function($scope,$resource,$routeParams,cityService,comfortService){
    $scope.cityName=cityService.cityName;
    $scope.days=$routeParams.days || '2' ;
    $scope.comfortTemp=comfortService.comfortTemp;
    $scope.comfortHumid=comfortService.comfortHumid;
    $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"},{get:{method:"JSONP"}});
    $scope.weatherResult=$scope.weatherAPI.get({q:$scope.cityName,cnt:$scope.days,APPID:"4b7cfcc3811ebe3fec729446917d7d4c"});
    
    $scope.getDate=function(date){
        return new Date(date *1000);
    };
    $scope.getCelsius=function(temp){
      return Math.round(temp -273);  
    };
   
    
    
}]);

weatherApp.service('cityService',function(){
    
    this.cityName='';
});
weatherApp.service('comfortService',function(){
    this.comfortTemp=''; 
    this.comfortHumid='';
});

