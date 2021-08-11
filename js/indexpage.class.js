import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';

class IndexPage {
    constructor(view, ajax) {
        this.view = view;
        this.ajax = ajax;
    }
    run() {
        this.showAllPhotographers(this.tagsSelected);
        this.showTags();
        this.eventTags();
        this.clearTags(this.tagsSelected);
    }

    showAllPhotographers(filtreTags) {
        const datas = this.ajax.fetchData();
        
        datas.then(data => {
            
            let photographersFiltre = [];

            if(filtreTags === undefined) {
                this.view.renderAllPhotographers(data.photographers);
                }

            else {
                
               let filtreTagsLower = filtreTags.map(tags => tags.toLowerCase());
               
               filtreTagsLower.forEach(tags => {
                    // console.log(tags);
                    photographersFiltre.push(data.photographers.filter(t => t.tags.includes(tags)));
               });
               
               photographersFiltre.forEach(p => {
                    this.view.renderAllPhotographers(p);
                    
               })
               const photographersToClear = document.querySelectorAll(".photographers__line--profile");
            //    console.log(photographersToClear);
            }
        })

    }

    clearTags(tagsSelected) {
        const photographersToClear = document.querySelectorAll(".photographers__line--profile");
        const datas = this.ajax.fetchData();
        // console.log(photographersToClear);
        
        // datas.then(data => {
        //     if() {

        //     }
        // })
    }

    showTags() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.renderAllTags(data.photographers);
        })  
    }

    eventTags() {
        const tags = document.getElementById("navmenu");
        let tagsSelected = [];

        tags.addEventListener('click', event =>{
            
            if(event.target.nodeName === 'SPAN') {
                
                if(tagsSelected.includes(event.target.innerText.substring(1))) {
                    let index = tagsSelected.indexOf(event.target.innerText.substring(1));
                    console.log(index);
                    tagsSelected.splice(index, 1);
                    console.log(tagsSelected);
                    event.target.style.background = 'none';

                    if(tagsSelected.length === 0) {
                        tagsSelected = undefined;
                    }
                    return true;
                }
                else {
                    event.target.style.background = '#DB8876';
                    tagsSelected.push(event.target.innerText.substring(1)); //Retire le #
                    this.showAllPhotographers(tagsSelected);
                }
                
                //this.view.clearPhotographe(tous)
            }


            // else {
            //     event.target.style.background = 'none';
            //     this.view.clearTags(this.renderAllPhotographers());
            // }
            // tagsSelected = [];
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