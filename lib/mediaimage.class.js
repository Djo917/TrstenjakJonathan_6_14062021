export class Picture {
    
    constructor(path, filename, alt, id) {
        this.path = path;
        this.filename = filename;
        this.alt = alt;
        this.id = id;
    }

    createImg() {
        let pic = document.createElement("img");
        pic.classList.add("content__vignettes--pictures");
        pic.src = `media/sample_photos/${this.path}/${this.filename}`
        pic.alt = `${this.alt}`
        return pic;
    }
}

export default Picture;