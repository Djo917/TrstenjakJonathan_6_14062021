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
        const datas = this.ajax.fetchData();
        const idUrl = window.location.search.substr(1);

        window.onload = () =>  {
            const element = document.querySelectorAll('button');
            
            datas.then(data => {
                let getMedias = data.media.filter(p => p.photographerId == idUrl);

                element.forEach(button => {
                    button.addEventListener('click', (e) => {
                        let getId = e.target.id;

                        getMedias.forEach(m => {

                            if(getId == m.id) {
                                m.likes ++;
                                button.innerText = m.likes + "❤️";
                            }
                        })
                    })
                })
            })
        }
    }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Mediafactory());
photographerPage.run();