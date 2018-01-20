appModule.component('popup', {
    bindings: {
        showToast: '='
    },
    template: 
       `<div class="popup" ng-if="$ctrl.isShowToast">
            <div class="popup-text">
            </div>
       </div>`,
    controller: function() {
        this.isShowToast = true;
    }
})