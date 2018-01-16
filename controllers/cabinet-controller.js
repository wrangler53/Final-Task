appModule.controller('cabinetCtrl', ['$scope', '$state', '$location', 'Authentification', 'Logout', 'Sharing', function($scope, $state, $location, Authentification, Logout, Sharing) {

    // Get user`s images
    if(sessionStorage.length != 0) {
        var userId = sessionStorage.getItem('currentUserId');
        var userImagesRef = firebase.database().ref().child('Users').child(userId).child('images');
    }

    userImagesRef.on('value', function(success) {
        $scope.userPhotos = Object.values(success.val());
        console.log($scope.userPhotos);
    });

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
    }

    // Go to image page
    $scope.goToImagePage = function(photo) {
        $location.path('image/' + userId + '/' + photo.id);
    }

    //show Upload photo modal
    $scope.showUploadPhotoModal = function() {
        $scope.uploadPhotoModal = true;
    }

    //show Add avatar modal
    $scope.showAddAvatarModal = function() {
        $scope.addAvatarModal = true;
    }

    //Show/Hide share block
    $scope.toggleShareBlock = function(element) {
        element.isShareBlockActive = !element.isShareBlockActive;
    }

    $scope.hideOnLeave = function(element) {
        element.isShareBlockActive = false;
    }

    // FB sharing
    $scope.shareFB = function(photo) {
        Sharing.shareInFB(photo);
    }

    //Logout
    $scope.logout = function() {
        Authentification.logout();
    }

}]);