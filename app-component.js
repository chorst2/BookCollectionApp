const LibraryComponent = Vue.component('Library', {
    data(){
        return {
            library: new LibraryCollection()
                .addItem(new Movie('Twilight', 'Mystery'))
                .addItem(new Book('After', 'Romance', 'Anna Todd'))
                .addItem(new Movie('Gone Girl', 'Mystery'))
                .addItem(new Book('Wake Up!', 'Informational', 'Claudia Velandia')
            ),
            addBookPopUpVisible: {
                show: false
            },
            addMoviePopUpVisible: {
                show: false
            },
            favoritedPopUpVisible: {
                show: false
            },

        }
    },
    methods:{
        //remove book from array
        removeIt(item){
            this.library.splice(this.library.indexOf(item), 1);
        },
        addIt(item){
            this.library.addItem(item);
        },
    },

    template: `<div>
    <div>
        <v-app-bar
                color="secondary"
                dense>
            <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="accent" dark fab fixed top left v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus-thick</v-icon>
                </v-btn>
                </template>
                <v-list>
                <v-list-item>
                    <v-list-item-title @click="addBookPopUpVisible.show=true">New Book</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title @click="addMoviePopUpVisible.show=true">New Movie</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>
            <v-app-bar-title class="text-center" color="accent">My Personal Library</v-app-bar-title>
            <v-btn color="accent" dark fab fixed top right @click="favoritedPopUpVisible.show = true">
                <v-icon>mdi-star</v-icon>
            </v-btn>

        </v-app-bar>
    </div>
    <div id="genreCards">
        <v-row>
            <genre-card name="Romance" genre-picture="love-3061483_1280.jpg" :library="library.romanceItems()"
                        @remove-item="removeIt"></genre-card>
            <genre-card name="Mystery" genre-picture="forest-3394066_1280.jpg" :library="library.mysteryItems()"
                        @remove-item="removeIt"></genre-card>
            <genre-card name="Informational" genre-picture="glasses-1052010_1280.jpg" :library="library.informationalItems()"
                        @remove-item="removeIt"></genre-card>
        </v-row>
    </div>
    <book-form title="Add Book" color="secondary" :button-function="addIt" :show-book-dialog="addBookPopUpVisible"></book-form>
            
    <movie-form title="Add Movie" color="secondary" :button-function="addIt" :show-movie-dialog="addMoviePopUpVisible"></movie-form>

    <list-pop-up title="Favorited Items" color="secondary" :show-favorites="favoritedPopUpVisible" :library="library.favoritedItems()"></list-pop-up>
    </div>`,
});

Vue.component('GenreCard', {
    props: {
        name: {
            type: String,
            required: true,
        },
        genrePicture: {
            type: String,
            required: true,
        },
        library: {
            type: Array,
            required: true,
        },
    },

    methods: {

    },

    computed: {

    },

    template: `<v-col>
                    <template>
                          <v-card
                            class="mx-auto"
                            max-width="300"
                            color="secondary"
                            elevation="10"
                          >
                            <v-img
                              class="white--text align-end"
                              height="200px"
                              v-bind:src="genrePicture"
                            >
                              <v-card-title color="primary">{{name}}</v-card-title>
                            </v-img>
                            <template v-for="item in library" >
                                <library-item
                                    :item="item"
                                    :key="item.name"
                                    @remove-item="$emit('remove-item', item)">
                                </library-item> 
                                <v-divider></v-divider>      
                            </template>              
                          </v-card>
                        </template>
                </v-col>`,
});

Vue.component('LibraryItem', {
    data: function(){
        //generating a random number for the id so that each one is unique
        //if you have this.item.name just remember if you ever change the name it wont update in the id
        return {
            id: Math.floor(Math.random() + 10e16),
            editBookPopUpVisible: {
                show: false
            },
            editMoviePopUpVisible: {
                show: false
            },

        };
    },

    computed: {
        typeOfItem(){
            return this.item.constructor.name;
        }
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
        showToolbar:{
            type: Boolean,
            default: true,
        }
    },

    methods: {
        //remove item from list
        remove(){
            this.$emit('remove-item');
        },

        edit(){
            //find the type of item and if it is 'Book' then set editBookPopUpVisible.show = true
            //if it is 'Movie' then set editMoviePopUpVisible.show = true
            var type = this.typeOfItem;
            if(type === 'Book'){
                this.editBookPopUpVisible.show = true;
            }
            else if(type === 'Movie'){
                this.editMoviePopUpVisible.show = true;
            }
        }

    },

    template: `<v-list-item color="accent">
                  <v-list-item-content>
                    <component :is="typeOfItem" :item="item"></component>
                    <v-col
                        cols="12"
                        v-if="showToolbar"
                      >
                        <v-btn
                          icon
                          color="accent"
                          @click="remove()"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          color="accent"
                          @click="edit()"
                          >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          :color="item.isFavorite() ? 'yellow' : 'accent'"
                          @click="item.toggleFavorite()"
                        >
                          <v-icon>mdi-star</v-icon>
                        </v-btn>
                    </v-col>
                    <book-form title="Edit Book" color="secondary" :item="item" 
                        :show-book-dialog="editBookPopUpVisible"></book-form>
                    <movie-form title="Edit Movie" color="secondary" :item="item" 
                        :show-movie-dialog="editMoviePopUpVisible"></movie-form>
                        
                  </v-list-item-content>
                </v-list-item>`,


});

const BookComponent = Vue.component('Book', {
    props: {
        item: Book,
    },

    template: `
                <div class="book">                    
                    <h4 class="card-title">{{item.name}} - Book</h4><br>
                    <p class="card-text">Genre: {{item.genre}}</p>
                    <p class="card-text">Author: {{item.author}}</p>
                </div>`,
});

const MovieComponent = Vue.component('Movie', {
    props: {
        item: Movie,
    },

    template: `
                <div class="movie">                    
                    <h4 class="card-title">{{item.name}} - Movie</h4><br>
                    <p class="card-text">Genre: {{item.genre}}</p>
                    <p class="card-text">Director: {{item.director}}</p>
                </div>`,
});

Vue.component('BookForm',{
    data(){
        return {
            currentBook: {
                name: this.item.name,
                author: this.item.author,
                genre: this.item.genre,
            },
        }
    },

    props: {
        title:{
            type: String,
            required: true,
        },
        item:{
            type: Object,
            default: () => (new Book()),
        },
        buttonFunction:{
            type: Function,
            required: false,
            default: function(){
            }
        },
        showBookDialog:{
            type: Object,
            required: true,
        }
    },

    methods: {
        save(){
            this.item.name = this.currentBook.name;
            this.item.author = this.currentBook.author;
            this.item.genre = this.currentBook.genre;

            this.buttonFunction(this.item);
            this.showBookDialog.show = false;
            //resetting form
            this.currentBook = new Book;
        },
    },

    template: `
        <v-row justify="center">
            <v-dialog
                    v-model="showBookDialog.show"
                    persistent
                    max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h5" color="primary">{{title}}</span>
                    </v-card-title>
                    <v-card-text color="primary">
                        <v-container>
                            <v-row>
                                <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                >
                                    <v-text-field
                                            label="Book Title"
                                            required
                                            v-model="currentBook.name"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                            label="Author"
                                            required
                                            v-model="currentBook.author"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        sm="6"
                                >
                                    <v-select
                                            :items="['Romance', 'Mystery', 'Informational']"
                                            label="Genre"
                                            required
                                            v-model="currentBook.genre"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="secondary"
                                text
                                @click="showBookDialog.show = false">
                            Close
                        </v-btn>
                        <v-btn
                                color="accent"
                                text
                                @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>`,
});

Vue.component('MovieForm',{
    data(){
        return {
            currentMovie: {
                name: this.item.name,
                director: this.item.director,
                genre: this.item.genre,
            },
        }
    },

    props: {
        title:{
            type: String,
            required: true,
        },
        item:{
            type: Object,
            default: () => (new Movie()),
        },
        buttonFunction:{
            type: Function,
            required: false,
            default: function(){
            }
        },
        showMovieDialog:{
            type: Object,
            required: true,
        }
    },

    methods: {
        save(){
            this.item.name = this.currentMovie.name;
            this.item.director = this.currentMovie.director;
            this.item.genre = this.currentMovie.genre;

            this.buttonFunction(this.item);
            this.showMovieDialog.show = false;
            //resetting form
            this.currentMovie = new Movie;
        },
    },

    template: `
        <v-row justify="center">
            <v-dialog
                    v-model="showMovieDialog.show"
                    persistent
                    max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h5" color="primary">{{title}}</span>
                    </v-card-title>
                    <v-card-text color="primary">
                        <v-container>
                            <v-row>
                                <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                >
                                    <v-text-field
                                            label="Movie Title"
                                            required
                                            v-model="currentMovie.name"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                            label="Director"
                                            required
                                            v-model="currentMovie.director"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        sm="6"
                                >
                                    <v-select
                                            :items="['Romance', 'Mystery', 'Informational']"
                                            label="Genre"
                                            required
                                            v-model="currentMovie.genre"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="secondary"
                                text
                                @click="showMovieDialog.show = false">
                            Close
                        </v-btn>
                        <v-btn
                                color="accent"
                                text
                                @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>`,

});


Vue.component('ListPopUp', {
    data(){
        return {

        }
    },

    props: {
        title:{
            type: String,
            required: true,
        },
        showFavorites:{
            type: Object,
            required: true,
        },
        library: {
            type: Array,
            required: true,
        },
    },

    methods: {

    },

    template: `
        <v-row justify="center">
            <v-dialog
                    v-model="showFavorites.show"
                    persistent
                    max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h5" color="primary">{{title}}</span>
                    </v-card-title>
                    <v-card-text color="primary">
                        <template v-for="item in library" >
                                <library-item
                                    :item="item"
                                    :key="item.name"
                                    :showToolbar="false">
                                </library-item> 
                                <v-divider></v-divider>      
                            </template>    
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="accent"
                                text
                                @click="showFavorites.show = false">
                            Close
                        </v-btn>
                       
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>`,
});