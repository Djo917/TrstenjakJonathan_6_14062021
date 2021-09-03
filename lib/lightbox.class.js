export class Lightbox {

    onKeyUp (e) {
        if (e.key == 'Escape') {
            this.closeLight(e);
        }
    }

    closeLight(e) {
        e.preventDefault();
        e.path[1].classList.add('delete');

        window.setTimeout( () => {
            e.path[1].remove();
        }, 500);
    }

    // buildLightbox(pathingpic, altpic) {
    //     const structure = document.createElement('div');
    //     structure.classList.add("lightbox");

    //     structure.innerHTML = `
    //         <button class ="lightbox__close buttonlightbox"></button>
    //         <button class ="lightbox__next buttonlightbox"></button>
    //         <button class ="lightbox__prev buttonlightbox"></button>
                
    //         <div class="lightbox__container">
    //             <img src="${pathingpic}" alt = "${altpic}">
    //         </div>
    //     `
    //     structure.querySelector(".lightbox__close").addEventListener('click', this.closeLight.bind(this));
    //     return structure;
    // }

    buildLightbox(arrayMedia) {
        const divParent = Element.parentNode;
        console.log(divParent);
        const structure = document.createElement('div');
        structure.classList.add("lightbox");

        structure.innerHTML = `
            <button class ="lightbox__close buttonlightbox"></button>
            <button class ="lightbox__next buttonlightbox"></button>
            <button class ="lightbox__prev buttonlightbox"></button>
                
            <div class="lightbox__container">
                <img src="${pathingpic}" alt = "${altpic}">
            </div>
        `
        structure.querySelector(".lightbox__close").addEventListener('click', this.closeLight.bind(this));
        return structure;
    }

    // const divParent = element.parentNode.parentNode;
    // this.index = Array.from(this.mediaContainer.children).indexOf(divParent);

}
export default Lightbox;