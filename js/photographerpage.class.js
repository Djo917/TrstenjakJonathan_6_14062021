import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';

class PhotographerPage {
    constructor(view, ajax) {
        this.view = view;
        this.ajax = ajax;
    }
    run() {
        // this.showLikes();
        this.showPhotographer();
    }

    showPhotographer() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.towardsPhotographer(data.photographers);
        })
    }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'));
photographerPage.run();