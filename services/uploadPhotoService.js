appModule.service('uploadPhotoService', function() {
    var photo; 

    this.recievePhoto = function(currentPhoto) {
       photo = currentPhoto;
    };

    this.uploadPhotoToFirebase = function(tagsArr) {
        // Generate unique id for file name
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        // get photo name, imageRef in Firebase
        var photoName = guid();
        var userId = sessionStorage.getItem('currentUserId');
        var userName = sessionStorage.getItem('currentUserName');
        var imagesRef = firebase.storage().ref('images/' + userId + '/' + photoName);

        // Upload photo to Firebase Storage
        imagesRef.put(photo).then(function(success) {
            console.log('Uploaded succsesfully');

            //create image data
            var imageData = {
                imageUrl: success.metadata.downloadURLs[0],
                imageName: success.metadata.name,
                tags: tagsArr,
                owner: {
                    ownerName: userName,
                    ownerId: userId
                },
                likes: {
                    numLikes: 0
                }
            };
            
            writePhotoToDB(imageData);
        }).catch(function(error) {
            console.log(error);
        });

        // Upload photo to Firebase Database
        function writePhotoToDB(imageData) {
            // Get user`s ref
            var userImagesRef = firebase.database().ref().child('Users').child(userId).child('images');
            
            // Image id in DB
            userImagesRef.push(imageData).then(function(success){
                console.log('Image added to DB successfully');
                // Set image id in DB
                setImageId(success.key);
            }).catch(function(error){
                console.log(error);
            });
        }

        // Set id for image (the same as branch id)
        function setImageId(imageId) {
            var newImageRef = firebase.database().ref().child('Users').child(userId).child('images').child(imageId).child('id');
            
            newImageRef.set(imageId).then(function(success) {
                console.log('Id set successfully');
            }).catch(function(error) {
                console.log(error);
            });
        } 
    };

    this.setAvatar = function(myAvatar) {
        var avatarPhoto;
        var avatarName = 'avatar';
        
        // convert base64 to blob for uploading to Firebase
        function base64ToBlob(image) {
            // extract content type and base64 payload from original string
            var pos = image.indexOf(';base64,');
            var type = image.substring(5, pos);
            var b64 = image.substr(pos + 8);
          
            // decode base64
            var imageContent = atob(b64);
          
            // create an ArrayBuffer and a view (as unsigned 8-bit)
            var buffer = new ArrayBuffer(imageContent.length);
            var view = new Uint8Array(buffer);
          
            // fill the view, using the decoded base64
            for(var n = 0; n < imageContent.length; n++) {
              view[n] = imageContent.charCodeAt(n);
            }
          
            // convert ArrayBuffer to Blob
            var blob = new Blob([buffer], { type: type });
            
            // get final file
            avatarPhoto = blob;
        }

        base64ToBlob(myAvatar);

        var userId = sessionStorage.getItem('currentUserId');
        var userRef = firebase.database().ref().child('Users');

        // Get avatars ref in Firebase Storage
        var avatarRef = firebase.storage().ref().child('images/' + userId + '/avatar/' + avatarName);

        // Set avatar url to Firebase Database
        function setAvatarToDB(avatarUrl) {
            var userAvatar = {
                avatarUrl: avatarUrl
            }

            userRef.child(userId).update(userAvatar);
        } 

        // Set avatar to Firebase Storage
        avatarRef.put(avatarPhoto).then(function(success) {
            var avatarUrl = success.metadata.downloadURLs[0];
            setAvatarToDB(avatarUrl);
        }).catch(function(error) {
            console.log(error);
        });

    }
});