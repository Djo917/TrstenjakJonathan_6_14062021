import { Picture } from '/lib/mediaimage.class.js';
import { Movie } from '/lib/mediavideo.class.js';

export class Mediafactory {
    
    constructor() {
        
        this.renderMedia = (media) => {
            
            const idUrl = window.location.search.substr(1);
            let getMedias = media.filter(p => p.photographerId == idUrl);
            let medias = null;
            console.log(getMedias);
            
            getMedias.forEach(m => {
                if(m.hasOwnProperty('image')) {
                    console.log("c'est une image");
                    medias = new Picture();
                }

                else {
                    console.log("c'est une video");
                    medias = new Movie();
                }
            })

            return medias;
        }
    }
}

export default Mediafactory;