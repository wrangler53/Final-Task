appModule.controller('rootController', ['$scope', '$location', 'Authentification', 'FindImgService', function($scope, $location, Authentification, FindImgService) {

    //RegExps
    $scope.emailRegexp = /^[-\w\+\.]+@(\w+\.)+\w+$/;

    //Show/hide burger
    $scope.toggleBurger = function(event) {
        $scope.isBurgerActive = !$scope.isBurgerActive;
        console.log($scope.isBurgerActive);
        event.stopPropagation();
    };

    $scope.user = {};

    if(sessionStorage.length != 0) {
        $scope.user.name = sessionStorage.getItem('currentUserName');
        $scope.user.id = sessionStorage.getItem('currentUserId');
    } else {
        $scope.user = Authentification.returnCurrentUser();
    }

    // Image search
    $scope.findImages = function() {
        var searchTags = encodeURI($scope.searchTags);
        $location.path('/search/' + searchTags);
        $scope.searchTags = '';
    }

}]);