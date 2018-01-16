appModule.service('Sharing', function(){
    this.shareInFB = function(photo) {
        FB.ui({
            method: 'share',
            href: photo.imageUrl, //test url
        }, function(response){
            return console.log(response);
        });
    }; 
});