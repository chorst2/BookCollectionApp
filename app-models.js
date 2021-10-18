function LibraryCollection(){
    this.__proto__ = [];

    this.addItem = function(item){
        this.push(new LibraryItem(item));

        //allows for chaining
        return this;
    }

    this.favoritedItems = function(){
        return this.filter(function(item){
            return item.isFavorite();
        })
    }

    this.romanceItems = function(){
        return this.filter(function(item){
            return item.genre === 'Romance';
        })
    }
    this.mysteryItems = function(){
        return this.filter(function(item){
            return item.genre === 'Mystery';
        })
    }
    this.informationalItems = function(){
        return this.filter(function(item){
            return item.genre === 'Informational';
        })
    }
}

function LibraryItem(media){

    const STATUSES = {FAVORITED: 'favorite', UNFAVORITED: 'not favorite'};

    media.status = STATUSES.UNFAVORITED;

    media.toggleFavorite = function(){
        if(this.isFavorite()){
            this.status = STATUSES.UNFAVORITED;
        }
        else this.status = STATUSES.FAVORITED;
    }
    media.unfavorite = function(){
        this.status = STATUSES.UNFAVORITED;
    }

    media.isFavorite = function(){
        return this.status === STATUSES.FAVORITED;
    }

    return media;
}

function Book(name, genre, author){
    this.name = name || 'Unnamed';
    this.genre = genre || '';
    this.author = author || 'Anonymous';

}

function Movie(name, genre, director){
    this.name = name || 'Unnamed';
    this.genre = genre || '';
    this.director = director || 'Unknown';

}