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
        this.showAllPhotographers(this.tagsSelected);
        this.showTags();
        // this.filterTag();
        this.eventTags();
    }

    showAllPhotographers(filtreTags) {
        const datas = this.ajax.fetchData();
        
        datas.then(data => {
            
            let photographersFiltre = [];

            if(filtreTags === undefined) {
                this.view.renderAllPhotographers(data.photographers);
                }

            else {
                
               console.log(filtreTags);
               
               filtreTags.forEach(tags => {
                    console.log(data.photographers);
                    photographersFiltre.push(data.photographers.filter(t => t.tags.includes('animals')));
               });
               this.view.renderAllPhotographers(data.photographersFiltre);
            }
        })

    }

    showTags() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.renderAllTags(data.photographers);
        })  
    }

    // filterTag() {
    //     const datas = this.ajax.fetchData();

    //     datas.then(data => {
    //         this.view.filterTag(data.photographers);
    //     })
    // }

    eventTags() {
        const tags = document.getElementById("navmenu");
        let tagsSelected = [];

        tags.addEventListener('click', event =>{
            
            if(event.target.nodeName === 'SPAN') {
                event.target.style.background = '#DB8876';
                tagsSelected.push(event.target.innerText.substring(1)); //Retire le #
                this.showAllPhotographers(tagsSelected);
                //this.view.clearPhotographe(tous)
                //récupérer le nom du filtre (innertext, clear #)
                //showAllphotographer(tags selected)
            }

            // else {
            //     this.view.clearTags(this.renderAllPhotographers());
            // }

        })
    }

}
const indexPage = new IndexPage(new View(), new Ajax('/data/FishEyeData.json'));
indexPage.run();



    // showLikes () {
    //     const datasLikes = this.ajax.fetchData();

    //     datasLikes.then(dataLikes => {
    //         this.view.renderLikes(dataLikes.media);
    //     })
    // }


// const redirectUp = () => {
    
// }

// const showLike = () => {
//     const buttonLike = document.querySelector("content__describe");


// }