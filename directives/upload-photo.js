appModule.directive('photoUpload', ['uploadPhotoService', function(uploadPhotoService) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('change', function(event) {
                getPhoto();
            });

            function getPhoto() {
                // Get photo and name, image ref in firebase
                var currentPhoto = element[0].files[0];
                
                var reader = new FileReader();

                //show image
                reader.onload = function(event) {
                    scope.$apply(function(scope) {
                        scope.image = event.target.result;
                    });
                };
                
                reader.readAsDataURL(currentPhoto);

                uploadPhotoService.recievePhoto(currentPhoto);

            }
        }
    };
}]);