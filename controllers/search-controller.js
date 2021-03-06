appModule.controller('searchCtrl', ['$scope', '$stateParams', '$location', 'FindImgService', 'Sharing', function($scope, $stateParams, $location, FindImgService, Sharing) {
    
    var searchTags = decodeURI($stateParams.searchPtrn);

    FindImgService.findImages(searchTags).then(function(data) {
       
        $scope.searchedImages = data;

        if(!$scope.$$phase) {
            $scope.$digest();
        }
    })

    //Go to user`s page 
    $scope.goToUserPage = function(userId) {
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

}])