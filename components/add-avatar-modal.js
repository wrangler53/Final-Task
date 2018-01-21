appModule.component('addAvatarModal', {
    bindings: {
        heading: '@',
        hide: '&'
    },
    template:
        `<div class="modal-bg" id="modal-add-avatar" ng-click="$ctrl.hide()"> 
            <div class="modal-content" ng-click="$event.stopPropagation()">
                <div class="modal-header"> 
                    {{ $ctrl.heading }} 
                    <div class="close-modal" ng-click="$ctrl.hide()"></div>
                </div>
                <div class="modal-body">
                    <div class="image-preview">
                        <input photo-upload type="file" accept="image/*" name="newPhoto" class="upload-photo" id="upload-new-photo">
                        <label for="upload-new-photo" class="photo-item" ng-if="!image">
                            <img src="./images/add-image.svg">
                        </label>
                        <img-crop ng-if="image" image="image" area-type="square" result-image="$ctrl.myAvatar" class="photo-item"></img-crop>
                    </div>                    
                </div>
                <div class="modal-controls">
                    <input type="submit" value="Set avatar" class="btn-submit" ng-click="$ctrl.uploadPhoto(); $ctrl.hide()">
                </div>
            </div>
        </div>`,
    controller: function(uploadPhotoService) {
        this.$onInit = function() {
            // Init avatar slot
            this.myAvatar = '';
        }
        this.uploadPhoto = function() {
            uploadPhotoService.setAvatar(this.myAvatar);
        };
    }
});