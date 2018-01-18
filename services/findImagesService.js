appModule.service('FindImgService', function () {

    this.findImages = function (searchPtrn) {
        
        // Filtering images 
        function search() {

            var allUserRef = firebase.database().ref().child('Users');

            // get all users
            allUserRef.once('value', function (success) {
                var allUsers = success.val();
                filterImages(allUsers);
            });


            var filteredImgArr = [];

            // get images by tags
            function filterImages(allUsers) {

                for (var key in allUsers) {
                    for (img in allUsers[key].images) {
                        if (allUsers[key].images[img].tags.some(img => img == searchPtrn)) {
                            filteredImgArr.push(allUsers[key].images[img]);
                        }
                    }
                }

                return console.log(filteredImgArr);
            }

        }
    }
});