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
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    });
    
    // Like system
    $scope.setLike = function(element, photo) {
        
        element.isLike = !element.isLike;

        var userId = sessionStorage.getItem('currentUserId');
        var imageOwnerId = photo.owner.ownerId;
        var imageId = photo.id;
        
        var likesObj = firebase.database().ref().child('Users').child(imageOwnerId).child('images').child(imageId).child('likes');

        // Read numLikes
        likesObj.child('numLikes').once('value', function(success){
            $scope.likesNumber = success.val();
            if(!$scope.$$phase) { 
                $scope.$digest();
            }
        })

        if(element.isLike) {
            //set user`s like
            likesObj.child('likesBy').push(userId);
            likesObj.child('numLikes').once('value', function(success) {
                var numLikes = +success.val();
                ++numLikes;
                likesObj.child('numLikes').set(numLikes);
            })

        } else {
            //likesObj.child('likesBy').child('-L3P-N-pED9DqutDYr_Z').remove();
            likesObj.child('numLikes').once('value', function(success) {
                var numLikes = +success.val();
                --numLikes;
                likesObj.child('numLikes').set(numLikes);
            })
        }


        likesObj.child('numLikes').on('value', function(success) {
            $scope.likesNumber = success.val();
            if(!$scope.$$phase) {
                $scope.$digest();
            }
        })

        // Listen for changes in likesObj
        // likesObj.child('numLikes').on('value', function(success) {
        //     $scope.likesNumber = success.val();
        //     if(!$scope.$$phase) {
        //         $scope.$digest();
        //     }
        // })
    }

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