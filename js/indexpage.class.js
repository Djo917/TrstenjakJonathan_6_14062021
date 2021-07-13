/*
let width = document.getElementsByClassName("photographers__line");

if(width.value.clientWidth > "1280") {
    photographers__line.style.flex-wrap: wrap;
}
*/

class IndexPage {
    constructor() {
        this.view = new View();
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

const indexPage = new IndexPage();
indexPage.run();