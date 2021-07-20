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
        const ajax = new Ajax('/data/FishEyeData.json');
        const datas = ajax.fetchData();
        console.log(datas);
        this.view.renderAllPhotographers(datas);

    }

    showTags() {
        this.view.renderAllTags();
    }

}




const indexPage = new IndexPage(new View());
indexPage.run();




// fetch("data/FishEyeData.json")
//     .then(dataPhotographes => dataPhotographes.json())
//     .then(dataPhotographes => console.log(JSON.stringify(dataPhotographes.photographers[0].name)))  
//     .then(dataPhotographes => console.log(dataPhotographes.photographers[0].name))
//     .catch(error => console.log(error));
