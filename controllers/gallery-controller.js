appModule.controller('galleryCtrl', ['$scope', '$location', 'Sharing', 'Authentification', function($scope, $location, Sharing, Authentification) {
    
    var images = firebase.database().ref().child('Users');
    $scope.allImagesArr = [];

    // Get all images
    images.once('value').then(function(success) {
        var user = success.val();
        for(var key in user) {
            var imagesObj = user[key].images;
            for(var key1 in imagesObj) {
                $scope.allImagesArr.push(imagesObj[key1]);
            }
        }
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    });
    
    // Like system
    // $scope.setLike = function(element, photo) {
        
    //     element.isLike = !element.isLike;

    //     var userId = sessionStorage.getItem('currentUserId');
    //     var imageOwnerId = photo.owner.ownerId;
    //     var imageId = photo.id;

    //     var likesArr = firebase.database().ref().child('Users').child(imageOwnerId).child('images').child(imageId).child('likes');

    //     if(element.isLike) {
    //         //set user`s like
    //         likesArr.push(userId);

    //         likesArr.once('value', function(success) {
    //             console.log(success.val());
    //         })
    //     } else {
    //         likesArr.child('-L3K4r4Xq9RM3cmOYoEc').remove();
    //     }
    // }

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