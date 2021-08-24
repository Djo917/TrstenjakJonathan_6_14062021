export class Picture {
    
    constructor(media) {
        
        this.media = media;
            
            const idSection = document.getElementById("content");
            const vignette = document.createElement("article");
            const img =  document.createElement("img");

            idSection.appendChild(vignette);
            vignette.classList.add("content__vignettes");
            vignette.setAttribute("id", `${media.id}`);
        
            vignette.appendChild(img);
            img.classList.add("content__vignettes--pictures");
            img.src = `media/sample_photos/${media.photographerId}/${media.image}`;
            img.alt = `${media.altText}`;
    }
}

export default Picture;