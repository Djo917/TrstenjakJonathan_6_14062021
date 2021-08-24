import { Picture } from '/lib/mediaimage.class.js';
import { Movie } from '/lib/mediavideo.class.js';

export class Mediafactory {

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