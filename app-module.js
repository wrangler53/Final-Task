var appModule = angular.module('appModule', ['ui.router', 'angular.chips', 'ngImgCrop']);

appModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        //Main page
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        //Gallery
        .state('gallery', {
            url: '/gallery',
            templateUrl: 'views/gallery.html',
            controller: 'galleryCtrl'
        })
        //Image page
        .state('image', {
            url: '/image/{userId}/{imageId}',
            templateUrl: 'views/image.html',
            controller: 'imageCtrl'
        })
        //Search page
        .state('search', {
            url:'/search/{searchPtrn}',
            templateUrl: 'views/search.html',
            controller: 'searchCtrl'
        })
        //User`s page
        .state('user', {
            url: '/user/{userId}',
            templateUrl: 'views/user.html',
            controller: 'userCtrl'
        })
        //Registration
        .state('registration', {
            url: '/registration',
            templateUrl: 'views/registration.html',
            controller: 'registrationCtrl'
        })
        //Authorization
        .state('authorization', {
            url: '/authorization',
            templateUrl: 'views/authorization.html',
            controller: 'authorizationCtrl'
        })
        //User`s cabinet
        .state('cabinet', {
            url: '/cabinet',
            templateUrl: 'views/cabinet.html',
            controller: 'cabinetCtrl'
        })
        //Contacts
        .state('contacts', {
            url: '/contacts',
            templateUrl: 'views/contacts.html',
            controller: 'contactsCtrl'
        })
        //About
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'aboutCtrl'
        });
        //In other cases
        $urlRouterProvider.otherwise('/home');

}]);

