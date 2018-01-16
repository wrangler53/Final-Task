appModule.service('Authentification', function($state) {
    // Initialize user`s object
    this.currentUser = {}
    this.authUser = function(user) {
        function writeData(success) {
            //Get current user
            this.currentUser.name = success.displayName;
            this.currentUser.id = success.uid;
            
            // Write current user data in Session Storage
            sessionStorage.setItem('currentUserName', this.currentUser.name);
            sessionStorage.setItem('currentUserId', this.currentUser.id);

            alert('Authentification successed. Now - cabinet');
            $state.go('cabinet');            
        }

        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(writeData.bind(this))
        .catch(function(error) {
            //Handle errors            
            var errorCode = error.code;
            var errorMessage = error.message;

            if(errorCode === 'auth/invalid-email') {
                return alert(errorMessage);
            } else if (errorCode === 'auth/user-disabled') {
                return alert(errorMessage);
            } else if(errorCode === 'auth/user-not-found') {
                return alert(errorMessage);
            } else if(errorCode === 'auth/wrong-password') {
                return alert(errorMessage);
            }         
        });

    }
    this.returnCurrentUser = function() {
        return this.currentUser;
    }
    //Logout
    this.logout = function() {
        var self = this;
        firebase.auth().signOut().then(function() {
            function goHome() {
                sessionStorage.removeItem('currentUserName');
                sessionStorage.removeItem('currentUserId');
                self.currentUser.name = '';
                alert('Sign out succsess');
                $state.go('home');

            };
            return goHome();
        }).catch(function(error) {
            return console.log(error);
        });
    }
})