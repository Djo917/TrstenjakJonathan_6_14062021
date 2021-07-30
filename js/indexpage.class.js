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







// fetch("data/FishEyeData.json")
//     .then(dataPhotographes => dataPhotographes.json())
//     .then(dataPhotographes => console.log(dataPhotographes.photographers[0].name))
//     .catch(error => console.log(error));
