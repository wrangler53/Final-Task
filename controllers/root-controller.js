appModule.controller('rootController', ['$scope', 'Authentification', function($scope, Authentification) {

    //RegExps
    $scope.emailRegexp = /^[-\w\+\.]+@(\w+\.)+\w+$/;

    //Show/hide burger
    $scope.toggleBurger = function(event) {
        $scope.isBurgerActive = !$scope.isBurgerActive;
        console.log($scope.isBurgerActive);
        event.stopPropagation();
    };

    $scope.user = {};

    // if(sessionStorage.length != 0) {
    //     $scope.currentUserName = sessionStorage.getItem('currentUserName');
    //     $scope.currentUserId = sessionStorage.getItem('currentUserId');
    // }

    $scope.user = Authentification.returnCurrentUser();
}]);