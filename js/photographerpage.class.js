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
        this.showPhotographer();
        this.showMedias();
        // this.incrementLikes();
        this.eventLikes();
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
            this.view.renderAllMedia(data.media);
        })

    }
    
    eventLikes() {

        window.setTimeout(this.view.Likes, 90);
        
    }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Mediafactory());
photographerPage.run();