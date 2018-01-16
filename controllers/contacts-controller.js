appModule.controller('contactsCtrl', ['$scope', 'Map', function ($scope, Map) {
    //Run map
    Map.init();

    $scope.sendComplaint = function(complaint) {
        //Send complaint
        var complaintsRef = firebase.database().ref().child('Complaints');
        var complaintObj = {
            userName: complaint.name,
            userEmail: complaint.email,
            subject: complaint.subject,
            message: complaint.messageText
        };

        complaintsRef.push(complaintObj).then(function(success){
            complaintForm.reset();
            alert('Complaint send successfully');
        }).catch(function(error) {
            console.log(error);
        });
    };
}]);