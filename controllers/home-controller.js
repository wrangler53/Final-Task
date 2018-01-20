appModule.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
    
    $http({
        method: 'GET',
        url: './test_photos/photos.json'
    }).then(function(success) {
        $scope.images = success.data;
    }, function(error) {
        console.log(error);
    });
}]);