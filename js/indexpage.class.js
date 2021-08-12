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
    }

    showAllPhotographers(filtreTags) {
        const datas = this.ajax.fetchData();
        
        datas.then(data => {
            
            let photographersFiltre = [];
            // console.log(filtreTags)

            if(filtreTags === undefined) {
                this.view.renderAllPhotographers(data.photographers);
                console.log("coucou");
            }

            else {
                this.view.clearCardsPhotographers();
                
               let filtreTagsLower = filtreTags.map(tags => tags.toLowerCase());
               
               filtreTagsLower.forEach(tags => {
                    photographersFiltre.push(data.photographers.filter(t => t.tags.includes(tags)));
               });

               photographersFiltre.forEach(p => {
                    this.view.renderAllPhotographers(p);
                    
               })
            }
        })

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
                    tagsSelected.splice(index, 1);
                    event.target.style.background = 'none';
                    this.showAllPhotographers(tagsSelected);
                    console.log(tagsSelected);

                    if(tagsSelected.length === 0) {
                        tagsSelected = undefined;
                        this.showAllPhotographers(tagsSelected);
                    }
                
                }
                else {
                    event.target.style.background = '#DB8876';
                    tagsSelected.push(event.target.innerText.substring(1)); //Retire le #
                    this.showAllPhotographers(tagsSelected);
                }
            }
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