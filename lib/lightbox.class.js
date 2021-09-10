import { Mediafactory } from '../lib/mediafactory.class.js';

export class Lightbox {
    constructor() {
        this.mediafactory = new Mediafactory();
        this.eventShow();
        this.eventClose();
        //eventNext();
        //eventPrev();
        //eventKeyboard();
    }

    //close();
    //next();
    //prev();
    //showMedia();

    eventShow(arrayMedia){
        const section = document.querySelector('.content');
        const lightbox = document.querySelector('.lightbox');

        
        section.addEventListener('click', (e) => {
            let index = arrayMedia.findIndex((media) => media.id == e.target.dataset.id);
            
            if(e.target.nodeName === 'IMG') {
                lightbox.style.display = 'flex';
                let html = this.generateMedia(arrayMedia, index);
                lightbox.appendChild(html.render());
            }
        })
    }

    eventClose() {
        const lightbox = document.querySelector('.lightbox');

        lightbox.addEventListener('click', (e) => {
            if(e.target.id === "closelight") {
                lightbox.style.display = 'none';
                lightbox.removeChild(lightbox.lastElementChild);
            }
        })

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                lightbox.style.display = 'none';
                lightbox.removeChild(lightbox.lastElementChild);
            }
        })
    }

    generateMedia(arrayMedia, index) {
        let html = this.mediafactory.createMedia(arrayMedia[index]);
        return html;
    }

        // nextElement(e, arrayMedia, index) {
    //     e.preventDefault();

    //     if(e.key === 'ArrowRight') {
    //         const media = document.querySelector(".content__vignettes--pictures");
    //         const divLightBox = document.querySelector(".lightbox"); 
    //         media.remove();
    //         index++;

    //         if(index >= mediaSorted.length){
    //             index = 0;
    //         }
                
    //         let html = this.generateMedia(arrayMedia, index);
    //         divLightBox.appendChild(html.render());
    //     }
    // }
}
export default Lightbox;