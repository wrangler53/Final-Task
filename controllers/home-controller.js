appModule.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
    
    var users = firebase.database().ref().child('Users');

    // Get all images
    users.once('value').then(function(success) {
        $scope.images = [];
        var user = success.val();
        for(var key in user) {
            var imagesObj = user[key].images;
            for(var key1 in imagesObj) {
                $scope.images.push(imagesObj[key1]);
                if(!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        }
        console.log($scope.images);
    });


}]);