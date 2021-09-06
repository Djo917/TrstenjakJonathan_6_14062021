import { Mediafactory } from '../lib/mediafactory.class.js';

export class Lightbox {
    constructor(){
        this.mediafactory = new Mediafactory();
    }

    closeLight(e) {
        e.preventDefault();
        e.path[1].classList.add('delete');

        window.setTimeout( () => {
            e.path[1].remove();
        }, 500);
    }

    generateMedia(arrayMedia, index) {
        let html = this.mediafactory.createMedia(arrayMedia[index]);
        return html;
    }

    buildLightbox() {
        const structure = document.createElement('div');
        const close = document.createElement('button');
        const next = document.createElement('button');
        const previous = document.createElement('button');

        structure.classList.add("lightbox");

        structure.appendChild(close);        
        close.classList.add("lightbox__close", "buttonlightbox");
        close.setAttribute("id", "closelight");

        structure.appendChild(next);
        next.classList.add("lightbox__next", "buttonlightbox");
        next.setAttribute("id", "nextelement");
        
        structure.appendChild(previous);
        previous.classList.add("lightbox__previous", "buttonlightbox");
        previous.setAttribute("id", "previouselement");

        return structure;
    }
}
export default Lightbox;