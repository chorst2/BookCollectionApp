// adds Vuetify functionality to your Vue app
Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify({
        theme: {
            themes: {
                // modify themes (light or dark) on the fly
                light: {
                    accent: '#38627a',
                    primary: '#646963',
                    secondary: '#BFEDEF',

                }
            }
        }
    }),


    // mounted: function() {
    //     if(localStorage.getItem('bookList')){
    //         this.bookList = JSON.parse(localStorage.getItem('bookList'));
    //     }
    // },
    //
    // watch: {
    //     bookList: {
    //         //by default these watchers only watch these shopping lists directly
    //         // (like added or removed to list not if quantity is changed etc)
    //         handler(newList){
    //             localStorage.setItem('bookList', JSON.stringify(newList))
    //         },
    //
    //         //watch for any changes in nested properties as well
    //         //now it will watch for if the quantity is changed etc.
    //         deep: true,
    //     }
    // }
});