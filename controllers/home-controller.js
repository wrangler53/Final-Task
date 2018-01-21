appModule.controller('homeCtrl', ['$scope', 'Carousel', function ($scope, Carousel) {
    //init Carousel
    $scope.Carousel = Carousel;

    var users = firebase.database().ref().child('Users');

    $scope.images = [];

    // Get all images
    users.once('value').then(function (success) {
        var user = success.val();
        for (var key in user) {
            var imagesObj = user[key].images;
            for (var key1 in imagesObj) {
                $scope.images.push(imagesObj[key1]);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        }
    });


}]);