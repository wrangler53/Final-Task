appModule.service('uploadPhotoService', function() {
    var photo; 

    this.recievePhoto = function(currentPhoto) {
       photo = currentPhoto;
       console.log(photo);
    };

    this.uploadPhotoToFirebase = function(tagsArr) {
        // get photo name, userId, userName, imageRef in Firebase
        var photoName = photo.name;
        var userId = sessionStorage.getItem('currentUserId');
        var userName = sessionStorage.getItem('currentUserName');
        var imagesRef = firebase.storage().ref('images/' + userId + '/' + photoName);

        // Upload photo to Firebase Storage
        imagesRef.put(photo).then(function(succsess) {
            console.log('Uploaded succsesfully');

            //create image data
            var imageData = {
                imageUrl: succsess.metadata.downloadURLs[0],
                imageName: succsess.metadata.name,
                tags: tagsArr,
                owner: {
                    ownerName: userName,
                    ownerId: userId
                }
            };
            
            writePhotoToDB(imageData);
        }).catch(function(error) {
            console.log(error);
        });

        // Upload photo to Firebase Database
        function writePhotoToDB(imageData) {
            // Get user`s ref
            var userRef = firebase.database().ref().child('Users').child(userId).child('images');
            // Image id in DB
            var imageId;

            userRef.push(imageData).then(function(succsess){
                console.log('Image added to DB successfully');
                // Set image id in DB
                setImageId(succsess.key);
            }).catch(function(error){
                console.log(error);
            });
        }

        // Set id for image (the same as branch id)
        function setImageId(imageId) {
            var newImageRef = firebase.database().ref().child('Users').child(userId).child('images').child(imageId).child('id');
            
            newImageRef.set(imageId).then(function(succsess) {
                console.log('Id set successfully');
            }).catch(function(error) {
                console.log(error);
            });
        } 
    };
});