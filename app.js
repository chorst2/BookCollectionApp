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


    data: function() {
        return {
            newItem: {
                name: '',
                author: '',
                genre: '',
                isFavorite: false
            },
            bookList: [
                {name: 'Twilight', author: 'Stephanie Meyer', genre: 'Romance', isFavorite: true},
                {name: 'After', author: 'Anna Todd', genre: 'Romance', isFavorite: false},
                {name: 'Gone Girl', author: 'Gillian Flynn', genre: 'Mystery', isFavorite: false},
                {name: 'Wake Up!', author: 'Claudia Velandia', genre: 'Informational', isFavorite: false}
            ],
            addPopUpVisible: {
                show: false
            },

        }
    },

    methods: {
        //add book to array list
        addIt(){
            //add item to the array
            this.bookList.push(this.newItem);

            //clear form
            //set to default properties
            this.newItem = {
                name: '',
                author: '',
                genre: ''
            };
        },

        //remove book from array
        removeIt(item){
            //finding item in book list and removing item in the book list starting
            // at the one we found and only removing 1 item
            this.bookList.splice(this.bookList.indexOf(item), 1);
        },

        favoriteIt(item){
            //pass styling to the icon to make it bigger and colorful?

        }
    },

    computed: {
        romanceList: function(){
            return this.bookList.filter(function(item){
                return item.genre === 'Romance';
            });
        },
        mysteryList: function(){
            return this.bookList.filter(function(item){
                return item.genre === 'Mystery';
            });
        },
        informationalList: function(){
            return this.bookList.filter(function(item){
                return item.genre === 'Informational';
            });
        },
    },

    mounted: function() {
        if(localStorage.getItem('bookList')){
            this.bookList = JSON.parse(localStorage.getItem('bookList'));
        }
    },

    watch: {
        bookList: {
            //by default these watchers only watch these shopping lists directly
            // (like added or removed to list not if quantity is changed etc)
            handler(newList){
                localStorage.setItem('bookList', JSON.stringify(newList))
            },

            //watch for any changes in nested properties as well
            //now it will watch for if the quantity is changed etc.
            deep: true,
        }
    }
});