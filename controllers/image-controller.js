appModule.controller('imageCtrl', ['$scope', '$stateParams', '$location', 'Sharing', function($scope, $stateParams, $location, Sharing) {
    // Retrieve image from DB
    var imageRef = firebase.database().ref().child('Users').child($stateParams.userId).child('images').child($stateParams.imageId);
    var avatarRef = firebase.database().ref().child('Users').child($stateParams.userId).child('avatarUrl')

    // Get image from DB
    imageRef.once('value', function(success) {
        $scope.image = success.val();
        console.log($scope.image);
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    }).catch(function(error) {
        console.log(error);
    });

    // Get avatar
    avatarRef.once('value', function(success) {
        $scope.avatar = success.val();
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    }).catch(function(error) {
        console.log(error);
    });

    //Go to user`s page 
    $scope.goToUserPage = function(userId) {
        console.log(userId);
        $location.path('user/' + userId);
    };

    //Show/Hide share block
    $scope.toggleShareBlock = function() {
        $scope.isShareBlockActive = !$scope.isShareBlockActive;
    };

    // FB sharing
    $scope.shareFB = function(photo) {
        Sharing.shareInFB(photo);
    };
    
}]);