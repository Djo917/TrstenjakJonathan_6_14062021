import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';
/*
let width = document.getElementsByClassName("photographers__line");

if(width.value.clientWidth > "1280") {
    photographers__line.style.flex-wrap: wrap;
}
*/


class IndexPage {
    constructor(view) {
        this.view = view;
    }
    run() {
        this.showAllPhotographers();
        this.showTags();
    }

    showAllPhotographers() {
        this.view.renderAllPhotographers();
    }

    showTags() {
        this.view.renderAllTags();
    }
}


const indexPage = new IndexPage(new View());
indexPage.run();

fetch("data/FishEyeData.json")
    .then(dataPhotographes => dataPhotographes.json())
    .then(dataPhotographes => console.table(dataPhotographes))
