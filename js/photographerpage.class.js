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

    // showMedias() {
    //     const datas = this.ajax.fetchData();
    //     const idUrl = window.location.search.substr(1);
        

    //     datas.then(data => {
    //         const medias = data.media.filter(p => p.photographerId == idUrl);
    //         this.view.renderAllMedia(medias);
    //     })
    // }

    // incrementLikes () {
    //     const button = document.getElementById("buttonlikes");
    //     console.log(button);
        
    //     button.addEventListener('click', e => {
    //         console.log(e);
    //     })

    // }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Mediafactory());
photographerPage.run();

