appModule.service('FindImgService', function () {

   // this.filteredImgArr = [];

    this.findImages = function (searchPtrn) {
        // var self = this;
        // Filtering images 
        var allUserRef = firebase.database().ref().child('Users');

        // get images by tags
        function filterImages(allUsers) {
            var filteredImgArr = [];
            for (var key in allUsers) {
                for (img in allUsers[key].images) {
                    if (allUsers[key].images[img].tags.some(img => img == searchPtrn)) {
                        filteredImgArr.push(allUsers[key].images[img]);
                    }
                }
            }

            return filteredImgArr;
        }  

        // get all users
        return allUserRef.once('value').then(function(success) {
            var allUsers = success.val();
            return filterImages(allUsers);
        });

        

        //return self.filteredImgArr;
    }
});