import { Ajax } from '/lib/ajax.class.js';

const mediaFactory = (type) => {
    switch(type) {
        case 'picture' :
            return new Picture();
        
        case 'movie' : 
            return new Movie();
    }
}