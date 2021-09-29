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
        books: {
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
                            <template v-for="item in books" >
                                <book-item
                                    :item="item"
                                    :key="item.name"
                                    @remove-item="$emit('remove-item', item)">
                                </book-item> 
                                <v-divider></v-divider>      
                            </template>              
                          </v-card>
                        </template>
                </v-col>`,
});

Vue.component('BookItem', {
    data: function(){
        //generating a random number for the id so that each one is unique
        //if you have this.item.name just remember if you ever change the name it wont update in the id
        return {
            id: Math.floor(Math.random() + 10e16),
            editPopUpVisible: {
                show: false
            },

        };
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    methods: {
        //remove book from list
        remove(){
            this.$emit('remove-item');
        },

        //favorite book
        favorite(){
            this.item.isFavorite = !this.item.isFavorite;
        },
    },

    template: `<v-list-item color="accent">
                  <v-list-item-content>
                    <v-list-item-title>{{item.name}} - {{item.author}}</v-list-item-title>
                    
                    <v-col
                        cols="12"
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
                          @click="editPopUpVisible.show = true" >
                          
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          :color="item.isFavorite ? 'yellow' : 'accent'"
                          @click="favorite()"
                        >
                          <v-icon>mdi-star</v-icon>
                        </v-btn>
                    </v-col>
                    <pop-up title="Edit Book" color="secondary" :model-name="item.name"
            :model-author="item.author" :model-genre="item.genre" :book="item" :show-dialog="editPopUpVisible"></pop-up>
                  </v-list-item-content>
                </v-list-item>`,


});

Vue.component('PopUp', {
    data(){
        return {
            // showDialog: this.showPopUpDialog
        }
    },

    props: {
        title:{
            type: String,
            required: true,
        },
        modelName:{
            type: String,
            required: true,
        },
        modelAuthor:{
            type: String,
            required: true,
        },
        modelGenre:{
            type: String,
            required: true,
        },
        book:{
            type: Object,
            required: true,
        },
        buttonFunction:{
            type: Function,
            required: false,
            default: function(){

            }
        },
        showDialog:{
            type: Object,
            required: true,
        }
    },


    template: `
        <v-row justify="center">
            <v-dialog
                    v-model="showDialog.show"
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
                                            v-model="book.name"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                            label="Author"
                                            required
                                            v-model="book.author"
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
                                            v-model="book.genre"
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
                                @click="showDialog.show = false">
                            Close
                        </v-btn>
                        <v-btn
                                color="accent"
                                text
                                @click="buttonFunction(); showDialog.show = false">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>`,
});