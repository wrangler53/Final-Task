appModule.controller('rootController', ['$scope', 'Authentification', function($scope, Authentification) {
    $scope.index = 'I`m index page'

    //RegExps
    $scope.emailRegexp = /^[-\w\+\.]+@(\w+\.)+\w+$/;

    //Show/hide burger
    $scope.toggleBurger = function(event) {
        $scope.isBurgerActive = !$scope.isBurgerActive;
        console.log($scope.isBurgerActive);
        event.stopPropagation();
    }

    $scope.user = {};

    // if(sessionStorage.length != 0) {
    //     $scope.currentUserName = sessionStorage.getItem('currentUserName');
    //     $scope.currentUserId = sessionStorage.getItem('currentUserId');
    // }

    if(sessionStorage.length != 0) {
        $scope.user.name = sessionStorage.getItem('currentUserName');
    }

    $scope.user = Authentification.returnCurrentUser();
}]);