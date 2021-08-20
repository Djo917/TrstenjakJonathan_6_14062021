export class Movie {
    constructor(media) {
        
        this.media = media;
            
            const idSection = document.getElementById("content");
            const vignette = document.createElement("article");
            const video =  document.createElement("video");

            idSection.appendChild(vignette);
            vignette.classList.add("content__vignettes");
            vignette.setAttribute("id", `${media.id}`);
        
            vignette.appendChild(video);
            video.classList.add("content__vignettes--pictures");
            video.src = `media/sample_photos/${media.photographerId}/${media.video}`;
            video.alt = `${media.altText}`;
    }
}


export default Movie;