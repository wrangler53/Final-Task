appModule.component('addAvatarModal', {
    bindings: {
        show: '=',
        heading: '@'
    },
    template:
        `<div class="modal-bg" id="modal-add-avatar" ng-show="$ctrl.show" ng-click="$ctrl.closeModal()"> 
            <div class="modal-content" ng-click="$event.stopPropagation()">
                <div class="modal-header"> 
                    {{ $ctrl.heading }} 
                    <div class="close-modal" ng-click="$ctrl.closeModal()"></div>
                </div>
                <div class="modal-body">
                    <div class="image-preview">
                        <input photo-upload type="file" accept="image/*" name="newPhoto" class="upload-photo" id="upload-new-photo">
                        <label for="upload-new-photo" class="photo-item">
                            <img-crop image="$ctrl.image" area-type="square" result-image="$ctrl.myAvatar"></img-crop>
                        </label>
                    </div>                    
                </div>
                <div class="modal-controls">
                    <input type="submit" value="Set avatar" class="btn-submit" ng-click="$ctrl.uploadPhoto(); $ctrl.closeModal()">
                </div>
            </div>
        </div>`,
    controller: function(uploadPhotoService) {
        this.closeModal = function() {
            this.show = false;
        };
        this.myAvatar = '';
        this.uploadPhoto = function() {
            uploadPhotoService.setAvatar(this.myAvatar);
        };
    }
});