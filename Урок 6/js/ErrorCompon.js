Vue.component ('error', {
    data() {
        return  {
            message: '',
            showError: false
           }
    },

    methods: {
        reportError(error) {
            this.message = error;
            this.showError = true;
        },

        noError() {
            this.showError = false;
        }
    },

    template: `
        <div class="error" v-show="showError"> 
            <p>{{message}}</p>
            <button class="close-btn" @click="noError">Close</button>
        </div>`

});