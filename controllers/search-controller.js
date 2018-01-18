appModule.controller('searchCtrl', ['$scope', '$stateParams', 'FindImgService', function($scope, $stateParams, FindImgService) {
    
    var searchTags = decodeURI($stateParams.searchPtrn);
    
    FindImgService.findImages(searchTags);
}])