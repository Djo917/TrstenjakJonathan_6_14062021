import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';
import { Picture } from '/lib/mediaimage.class.js';

class PhotographerPage {
    constructor(view, ajax, picture) {
        this.view = view;
        this.ajax = ajax;
        this.picture = picture;
    }
    run() {
        // this.showLikes();
        this.showPhotographer();
        this.showPictures();
    }

    showPhotographer() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.towardsPhotographer(data.photographers);
        })
    }

    showPictures () {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.picture.displayPictures(data.media);
        })
    }

    showMovies () {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.movie.displayMovies(data.media);
        })
    }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Picture());
photographerPage.run();