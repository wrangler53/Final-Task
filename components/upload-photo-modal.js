appModule.component('uploadPhotoModal', {
    bindings: {
        show: '=',
        heading: '@',
    },
    template:     
        `<div class="modal-bg" id="modal-upload-photo" ng-show="$ctrl.show" ng-click="$ctrl.closeModal()"> 
            <div class="modal-content" ng-click="$event.stopPropagation()">
                <div class="modal-header"> 
                    {{ $ctrl.heading }} 
                    <div class="close-modal" ng-click="$ctrl.closeModal()"></div>
                </div>
                <div class="modal-body">
                    <div class="image-preview">
                        <input photo-upload type="file" accept="image/*" name="newPhoto" class="upload-photo" id="upload-new-photo">
                        <label for="upload-new-photo" class="photo-item">
                            <img ng-if="!image" src="./images/add-image.svg">
                            <img ng-src="{{image}}" ng-class="{'cabinet-photo': image}">
                        </label>
                    </div>
                    <div class="image-tags">
                        <span class="chips-label">Enter tags:</span>
                        <chips ng-model="$ctrl.tags">
                            <chip-tmpl>
                                <div class="default-chip">
                                    {{chip}}
                                    <div class="delete-chip" remove-chip>
                                    
                                    </div>
                                </div>
                            </chip-tmpl>
                            <input chip-control></input>
                        </chips>
                    </div>
                </div>
                <div class="modal-controls">
                    <input type="submit" value="Upload" class="btn-submit" ng-click="$ctrl.uploadPhoto()">
                </div>
            </div>
        </div>`,
    controller: function(uploadPhotoService) {
        this.closeModal = function() {
            this.show = false;
        };
        // Tag`s array
        this.tags = [];
        // Upload photo to Firebase
        this.uploadPhoto = function() {
            uploadPhotoService.uploadPhotoToFirebase(this.tags);
        };
    }
});