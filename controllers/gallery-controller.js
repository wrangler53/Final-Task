appModule.controller('galleryCtrl', ['$scope', '$http', 'Sharing', 'Authentification', function($scope, $http, Sharing, Authentification) {
    
    var images = firebase.database().ref().child('Users');
    $scope.allImagesArr = [];

    // Get all images
    images.once('value', function(success) {
        var user = success.val();
        for(var key in user) {
            var imagesObj = user[key].images;
            for(var key1 in imagesObj) {
                $scope.allImagesArr.push(imagesObj[key1]);
            }
        }
    });

    setTimeout(function() {
        console.log($scope.allImagesArr);
    }, 2000)

    //Show/Hide share block
    $scope.toggleShareBlock = function(element) {
        element.isShareBlockActive = !element.isShareBlockActive;
    };

    $scope.hideOnLeave = function(element) {
        element.isShareBlockActive = false;
    };

    // Share photo in Facebook
    $scope.shareFB = function(photo) {
        Sharing.shareInFB(photo);
    };

}]);