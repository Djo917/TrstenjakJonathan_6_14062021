export class Picture {
    
    displayPictures(pictures) {

        const idUrl = window.location.search.substr(1);
        let getPictures = pictures.filter(p => p.photographerId == idUrl);

        console.log(getPictures);

        getPictures.forEach(display => {
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
            img.src = `media/sample_photos/${display.photographerId}/${display.image}`;
        });



    }

}

export default Picture;