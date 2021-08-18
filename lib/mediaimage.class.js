export class Picture {
    
    constructor() {
        
        this.displayPictures = (media) => {
            
            const idSection = document.getElementById("content");
            const vignette = document.createElement("article");
            const img =  document.createElement("img");
            const div = document.createElement("div");
            const p = document.createElement("p");
            const button = document.createElement("button");

            idSection.appendChild(vignette);
            vignette.classList.add("content__vignettes");
        
            vignette.appendChild(img);
            img.classList.add("content__vignettes--pictures");
            img.src = `media/sample_photos/${media.photographerId}/${media.image}`;
            img.alt = `${media.altText}`;

            vignette.appendChild(div);
            div.classList.add("content__describe");
            
            div.appendChild(p).innerText = media.title
            p.classList.add("content__describe--text")
            
            div.appendChild(button).innerText = media.likes + "❤️";
            button.classList.add("content__describe--button");
        }
    }
}
export default Picture;