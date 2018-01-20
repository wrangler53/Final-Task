appModule.controller('galleryCtrl', ['$scope', '$location', 'Sharing', 'Authentification', function($scope, $location, Sharing, Authentification) {
    
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
    
    // Go to image page
    $scope.goToImagePage = function(photo) {
        $location.path('image/' + photo.owner.ownerId + '/' + photo.id);
    };

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