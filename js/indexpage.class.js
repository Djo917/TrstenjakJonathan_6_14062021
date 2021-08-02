import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';
/*
let width = document.getElementsByClassName("photographers__line");

if(width.value.clientWidth > "1280") {
    photographers__line.style.flex-wrap: wrap;
}
*/


class IndexPage {
    constructor(view, ajax) {
        this.view = view;
        this.ajax = ajax;
    }
    run() {
        this.showAllPhotographers();
        this.showTags();
        // this.showLikes();
        this.showPhotographerPage();
        this.filterTag();
    }

    showAllPhotographers() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.renderAllPhotographers(data.photographers);
        })
    }

    showTags() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.renderAllTags(data.photographers);
        })  
    }

    showPhotographerPage() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.towardsPhotographer(data.photographers);
        })
    }

    filterTag() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.filterTag(data.photographers);
        })
    }



    // showLikes () {
    //     const datasLikes = this.ajax.fetchData();

    //     datasLikes.then(dataLikes => {
    //         this.view.renderLikes(dataLikes.media);
    //     })
    // }
}

// const redirectUp = () => {
    
// }

// const showLike = () => {
//     const buttonLike = document.querySelector("content__describe");


// }


const indexPage = new IndexPage(new View(), new Ajax('/data/FishEyeData.json'));
indexPage.run();