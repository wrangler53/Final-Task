appModule.controller('userCtrl', ['$scope', '$stateParams', 'Sharing', function($scope, $stateParams, Sharing) {
    var userRef = firebase.database().ref().child('Users').child($stateParams.userId);

    // Get user name
    userRef.child('userName').once('value', function(success) {
        $scope.userName = success.val();
        console.log(success.val());  
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    });

    // Get user`s avatar
    userRef.child('avatarUrl').once('value', function(success) {
        $scope.avatar = success.val();
    })

    // Get user images
    userRef.child('images').once('value', function(success) {
        $scope.userPhotos = Object.values(success.val());
        console.log($scope.userPhotos);
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    });

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

}]);
