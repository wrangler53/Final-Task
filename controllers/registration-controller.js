appModule.controller('registrationCtrl', ['$scope', '$state', function($scope, $state) {
    
    // Register user
    $scope.addUser = function(newUser) {
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(function(success) {
            
            $scope.currentUser = firebase.auth().currentUser;
            var userId = firebase.auth().currentUser.uid;

            //add user nickname to user object
            $scope.currentUser.updateProfile({
                displayName: newUser.nickname,
            }).then(function() {
                console.log('Username added successfully');
            }).catch(function(error) {
                console.log('Username NOT added');
            });   

            addUserToDB(userId, newUser.nickname); 
            //getData();

            alert('Register successed. Use authorization to sign in');
            $state.go('authorization');

        }).catch(function(error) {
            //Handle errors            
            var errorCode = error.code;
            var errorMessage = error.message;

            if(errorCode === 'auth/email-already-in-use') {
                alert(errorMessage);
            }      
        });   
    };

    //Create retype password regexp
    $scope.createRetypePassRegexp = function() {
        $scope.retypePassRegexp = new RegExp('^' + $scope.newUser.password + '$');
    };

    //write user to database
    function addUserToDB(uId, userName) {
        var usersRef = firebase.database().ref().child('Users');
        var userObj = {
            userName: userName
        };      

        usersRef.child(uId).set(userObj).then(function(success){
            console.log('Child added good');
        }).catch(function(error) {
            console.log(error);
        });
    }
    
}]);