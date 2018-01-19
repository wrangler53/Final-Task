appModule.service('FindImgService', function () {

    this.filteredImgArr = [];

    this.findImages = function (searchPtrn) {
        var self = this;
        // Filtering images 
        var allUserRef = firebase.database().ref().child('Users');

        // get all users
        allUserRef.once('value', function (success) {
            var allUsers = success.val();
            filterImages(allUsers);
        });


        //var filteredImgArr = [];

        // get images by tags
        function filterImages(allUsers) {
            for (var key in allUsers) {
                for (img in allUsers[key].images) {
                    if (allUsers[key].images[img].tags.some(img => img == searchPtrn)) {
                        self.filteredImgArr.push(allUsers[key].images[img]);
                    }
                }
            }
        }  

        return self.filteredImgArr;
    }
});