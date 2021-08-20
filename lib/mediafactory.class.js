import { Picture } from '/lib/mediaimage.class.js';
import { Movie } from '/lib/mediavideo.class.js';

export class Mediafactory {
    
    // // constructor() {
        
    //     this.renderMedia = (media) => {
            
    //         const idUrl = window.location.search.substr(1);
    //         let getMedias = media.filter(p => p.photographerId == idUrl);
    //         let medias = null;
    //         let pic = null;
    //         let movie = null;
    //         console.log(getMedias);
            
    //         getMedias.forEach(m => {
    //             if(m.hasOwnProperty('image')) {
    //                 console.log("c'est une image");
    //                 medias = new Picture(m);
    //                 pic = medias.displayPictures(m);
    //             }

    //             else {
    //                 console.log("c'est une video");
    //                 medias = new Movie(m);
    //                 movie = medias.displayMovies(m);
    //             }
    //         })
    //     }
    // // }

    createMedia(media) {
        if(media.image) {
           return new Picture(media);
        }
        if(media.video) {
           return new Movie(media);
        }
    }
}

export default Mediafactory;