appModule.service('uploadPhotoService', function() {
    var photo; 
    var userId = sessionStorage.getItem('currentUserId');
    var userName = sessionStorage.getItem('currentUserName');

    this.recievePhoto = function(currentPhoto) {
       photo = currentPhoto;
       console.log(photo);
    };

    this.uploadPhotoToFirebase = function(tagsArr) {
        // get photo name, imageRef in Firebase
        var photoName = photo.name;
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
            var userImagesRef = firebase.database().ref().child('Users').child(userId).child('images');
            
            // Image id in DB
            userImagesRef.push(imageData).then(function(succsess){
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

    this.setAvatar = function(myAvatar) {
        var smallAvatarPhoto;
        var bigAvatarPhoto = photo;
        
        var bigAvatarName = 'bigAvatar';
        var smallAvatarName = 'smallAvatar';
        
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
            smallAvatarPhoto = blob;
        }

        base64ToBlob(myAvatar);

        // Get avatars ref in Firebase Storage
        var bigAvatarRef = firebase.storage().ref().child('images/' + userId + '/avatars/' + bigAvatarName);
        var smallAvatarRef = firebase.storage().ref().child('images/' + userId + '/avatars/' + smallAvatarName);

        // Push avatars into Firebase Storage
        bigAvatarRef.put(bigAvatarPhoto).then(function(succsess) {
            bigAvatarUrl = succsess.metadata.downloadURLs[0];
        }).catch(function(error) {
            console.log(error);
        });

        smallAvatarRef.put(smallAvatarPhoto).then(function(succsess) {
            var smallAvatarUrl = succsess.metadata.downloadURLs[0];
        }).catch(function(error) {
            console.log(error);
        });


        // setting avatars into object
        // var userAvatars = {
        //     bigAvatar: '',
        //     smallAvatar: ''
        // }

        // set avatars url`s into Firebase Database user obj
        // var userRef = firebase.database().ref().child('Users').child(userId);

        // userRef.push(userAvatars).then(function(succsess) {
        //     console.log('Avatars set successfully');
        // }).catch(function(error) {
        //     console.log(error);
        // });
    }
});