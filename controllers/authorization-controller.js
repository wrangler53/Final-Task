appModule.controller('authorizationCtrl', ['$scope', '$state', 'Authentification', function($scope, $state, Authentification) {
    
    // Login user
    $scope.authUser = function(user) {
        Authentification.authUser(user);
    };

}]);