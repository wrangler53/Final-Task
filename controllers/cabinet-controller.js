appModule.controller('cabinetCtrl', ['$scope', '$state', '$location', 'Authentification', 'Sharing', function($scope, $state, $location, Authentification, Sharing) {
    
    // Get user`s images
    if(sessionStorage.length != 0) {
        var userId = sessionStorage.getItem('currentUserId');
        var userRef = firebase.database().ref().child('Users').child(userId).child('avatarUrl');
        var userImagesRef = firebase.database().ref().child('Users').child(userId).child('images');
    }

    
    userImagesRef.on('value', function(success) {
        $scope.userPhotos = Object.values(success.val());
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    });

    // Get user`s avatar
    userRef.on('value', function(success) {
        $scope.avatar = success.val();
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    })
    
    //Delete image
    $scope.deleteImage = function(photo) {
        // Delete from DB
        userImagesRef.child(photo.id).remove();
        // Delete from Storage
        var imageInStorage = firebase.storage().ref().child('images').child(userId).child(photo.imageName);
        imageInStorage.delete().then(function() {
            console.log('Image deleted successfully');
        }).catch(function(error) {
            console.log(error);
        });
    };

    // Go to image page
    $scope.goToImagePage = function(photo) {
        $location.path('image/' + userId + '/' + photo.id);
    };

    //show/hide Upload photo modal
    $scope.hideUploadPhotoModal = function() {
        $scope.uploadPhotoModal = false;
    }

    $scope.showUploadPhotoModal = function() {
        $scope.uploadPhotoModal = true;
    };

    //show/hide Add avatar modal
    $scope.showAddAvatarModal = function() {
        $scope.addAvatarModal = true;
    };

    $scope.hideAddAvatarModal = function() {
        $scope.addAvatarModal = false;
    }

    //Show/Hide share block
    $scope.toggleShareBlock = function(element) {
        element.isShareBlockActive = !element.isShareBlockActive;
    };

    $scope.hideOnLeave = function(element) {
        element.isShareBlockActive = false;
    };

    // FB sharing
    $scope.shareFB = function(photo) {
        Sharing.shareInFB(photo);
    };

    //Logout
    $scope.logout = function() {
        Authentification.logout();
    };

}]);