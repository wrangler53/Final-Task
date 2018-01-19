appModule.controller('searchCtrl', ['$scope', '$stateParams', 'FindImgService', function($scope, $stateParams, FindImgService) {
    
    var searchTags = decodeURI($stateParams.searchPtrn);
    
    $scope.searchedImages = FindImgService.findImages(searchTags);

    setTimeout(function() {
        console.log($scope.searchedImages);
    },2000)

}])