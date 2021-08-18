import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';
import { Mediafactory } from '/lib/mediafactory.class.js';

class PhotographerPage {
    constructor(view, ajax, mediafactory) {
        this.view = view;
        this.ajax = ajax;
        this.mediafactory = mediafactory;
    }
    run() {
        // this.showLikes();
        this.showPhotographer();
        this.showMedias();
    }

    showPhotographer() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.towardsPhotographer(data.photographers);
        })
    }

    showMedias () {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.mediafactory.renderMedia(data.media)
        })

    }

    // showMovies () {
    //     const datas = this.ajax.fetchData();

    //     datas.then(data => {
    //         this.movie.displayMovies(data.media);
    //     })
    // }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Mediafactory());
photographerPage.run();

