export const mediaFactory = (media) => {

    const idUrl = window.location.search.substr(1);
    let getMedias = media.filter(p => p.photographerId == idUrl);

    console.log(getMedias);
    
    getMedias.forEach(m => {  
        
        // if(m.hasOwnProperty('image')) {
        //     console.log(m);
        //     this.displayPictures(m);
        // }

        if("image" in m) {
            console.log(m);
            const img = this.displayPictures(m);
        }

        else {
            console.log("c'est une video");
            // return new Movie(m);
        }
    })

}


export default mediaFactory;