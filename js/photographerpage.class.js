import { View } from './view.class.js';
import { Ajax } from '../lib/ajax.class.js';
import { Mediafactory } from '../lib/mediafactory.class.js';
import { Lightbox } from '../lib/lightbox.class.js';

class PhotographerPage {
    constructor(view, ajax, mediafactory, lightbox) {
        this.view = view;
        this.ajax = ajax;
        this.mediafactory = mediafactory;
        this.lightbox = lightbox;
    }
    
    run() {
        this.showPhotographer();
        this.noPhotographer();
        this.handleModal();
        this.eventLikes();
        this.price();
        this.initialDisplay();
    }

    showPhotographer() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.towardsPhotographer(data.photographers);
        })   
    }

    initialDisplay() {
        const idUrl = window.location.search.substr(1);
        const datas = this.ajax.fetchData();
        const menu = document.getElementById('menufilter');
        
        datas.then(data => {
            let getMedias = data.media.filter(p => p.photographerId == idUrl);
            let mediasSorted = this.sortingBy(getMedias, menu.value);
            this.view.renderAllMedia(mediasSorted);
            this.eventSort(mediasSorted);
            this.lightbox.eventShow(mediasSorted);
        })
    }

    sortingBy(arrayMedia, sortType) {
        if(sortType === 'Popularité') {
            arrayMedia.sort((a, b) => b.likes - a.likes);
        }
        else if(sortType === 'Date') {
            arrayMedia.sort((a,b) => new Date(b.date) - new Date(a.date));
        }
        else if (sortType === 'Titre') {
            arrayMedia.sort((a, b) => {
                if(a.title > b.title) {
                    return 1;
                }
                if(a.title < b.title) {
                    return -1;
                }
                return 0;
            })
        }
        else{console.log("Unvalid type for sort");}

        return arrayMedia;
    }

    eventSort(initialSort){
        const menu = document.getElementById('menufilter');
        const section = document.getElementById('content');

        menu.addEventListener('change', () => {
            section.innerHTML = '';
            let newSort = this.sortingBy(initialSort, menu.value);
            this.view.renderAllMedia(newSort);
            // new Lightbox(newSort);
        })
    }
    
    // eventSort() {
    //     const idUrl = window.location.search.substr(1);
    //     const menu = document.getElementById('menufilter');
    //     const section = document.getElementById('content');
    //     const datas = this.ajax.fetchData();
    //     let getMedias = [];

    //     const specificSort = (sortValue) => {
    //         if(sortValue === 'Popularité') {
    //             getMedias.sort((a, b) => b.likes - a.likes );
    //         }
    //         else if(sortValue === 'Date') {
    //             getMedias.sort((a,b) => new Date(b.date) - new Date(a.date));
    //         }
        //     else if (sortValue === 'Titre') {
        //         getMedias.sort((a, b) => {
        //             if(a.title > b.title) {
        //                 return 1;
        //             }
        //             if(a.title < b.title) {
        //                 return -1;
        //             }
        //             return 0;
        //         })
        //     }
        //     else{console.log("Unvalid type for sort");}
        //     return getMedias;
        // }
        
    //     datas.then(data => {
    //         getMedias = data.media.filter(p => p.photographerId == idUrl);
    //         getMedias = specificSort(menu.value);
    //         this.view.renderAllMedia(getMedias);
    //         this.lightbox.eventShow(getMedias);              
    //     })

    //     menu.addEventListener('change', (e) => {
    //         section.innerHTML = '';
    //         getMedias = specificSort(e.target.value);
    //         this.view.renderAllMedia(getMedias);
    //         this.lightbox.eventShow(getMedias);
    //     })
    //     return getMedias; 
    // }

    // displayLightbox(mediaSorted) {
    //     const section = document.getElementById('content');

    //     section.addEventListener("click", (e) => {
    //         let index = mediaSorted.findIndex((media) => media.id == e.target.dataset.id); 
            
    //         if(e.target.nodeName === 'IMG') {
    //             const light = this.lightbox.buildLightbox();
    //             document.body.appendChild(light);
    //             const divLightBox = document.querySelector(".lightbox");
                
    //             let html = this.lightbox.generateMedia(mediaSorted, index);
    //             divLightBox.appendChild(html.render());

    //             divLightBox.addEventListener('click', (e) => {
                    
    //                 if(e.target.id === 'closelight') {
    //                     this.lightbox.closeLight(e);
    //                     index = 0;
    //                     divLightBox.removeEventListener('click', (e));
    //                 }
            
    //                 else if(e.target.id === 'nextelement') {
    //                     light.removeChild(light.lastChild);
    //                     index++;
                        
    //                     if(index >= mediaSorted.length){
    //                         index = 0;
    //                     }
                        
    //                     html = this.lightbox.generateMedia(mediaSorted, index);
    //                     divLightBox.appendChild(html.render());
    //                 }
            
    //                 else if(e.target.id === 'previouselement') {
    //                     light.removeChild(light.lastChild);
    //                     if(index <= 0){
    //                         index = mediaSorted.length;
    //                     }
            
    //                     index--;
    //                     html = this.lightbox.generateMedia(mediaSorted, index);
    //                     divLightBox.appendChild(html.render());
    //                 }
    //             })
    //         }
    //     });   
    // }

    noPhotographer() {
        const datas = this.ajax.fetchData();
        let idUrl = window.location.search.substr(1);
        idUrl = parseInt(idUrl, 10);

        datas.then(data => {
            let arrayId = [];
            data.photographers.forEach(p => {
                arrayId.push(p.id);
            })
            
            if(arrayId.includes(idUrl)) {
                return true;
            }
            else {
                const main = document.getElementById("deleteall");
                main.innerHTML = "Le photographe recherché n'existe pas";
                main.style.color = "red";
                main.style.fontSize = "3em";
            }
        })
    }

    handleModal() {
        const button = document.querySelector(".photographers__button--submit ");
        const modal = document.querySelector(".wrappermodal");
        const cross = document.getElementById("close");
        const mask = /\W/;

        button.addEventListener('click', () => {
            modal.style.display = "block";
        })

        button.addEventListener('keydown', (e) => {
            console.log(e.key);
            if(e.key == 'Escape') {
                closeForm();
            }
        })
        
        cross.addEventListener('click', () => {
            modal.style.display = "none";
        })

        const firstNameValid = () => {
            const messageErreurPrenom = document.getElementById("messageErreurPrenom");
            let prenom = document.getElementById("first");
            
          
            if (prenom.value.length < 2 || prenom.value.match(mask)) {
                messageErreurPrenom.textContent ="Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
                return false;
          
            } 
            else {
              messageErreurPrenom.textContent = "";
              return true;
            }
          };
          
          const lastNameValid = () => {
            const messageErreurNom = document.getElementById("messageErreurNom");
            let nom = document.getElementById("last");
          
            if (nom.value.length < 2 || nom.value.match(mask)) {
              messageErreurNom.textContent ="Veuillez entrer 2 caractères ou plus pour le champ du nom.";
              return false;
          
            } else {
              messageErreurNom.textContent = "";
              return true;
            }
          };
          
          const emailAdressValid = () => {
            const messageErreurMail = document.getElementById("messageErreurMail");
            let email = document.getElementById("email");
            const emailregex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
          
            if (emailregex.test(email.value)) {
              messageErreurMail.textContent = "";
              return true;
          
            } else {
              messageErreurMail.textContent = "L'adresse e-mail est incorrecte.";
              return false;
            }
          };

          const closeForm = () => {
            modal.style.display = "none";
        }

          const confirmationSubmit = () => {          
            if(firstNameValid() && lastNameValid() && emailAdressValid()) {
                document.getElementById("formulaire").reset();
                closeForm();
            }
          };

        document.getElementById("formulaire").addEventListener("submit", (e) => {
            e.preventDefault();
            firstNameValid();
            lastNameValid();
            emailAdressValid();
            confirmationSubmit();
        })
    }

    price() {
        const datas = this.ajax.fetchData();
        const idUrl = window.location.search.substr(1);
        
        datas.then(data => {            
            const getPrice = data.photographers.filter(p => p.id == idUrl)
            const price = document.getElementById("price");
            
            let priceEuro = new Intl.NumberFormat('fr-FR', { 
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0
            });
            price.innerText = priceEuro.format(getPrice[0].price) + '/jour';
        })
    }

    eventLikes() {
        const section = document.getElementById("content"); 
        const total = document.getElementById('totallikes');
        let likesMedia = 0;

        section.addEventListener('click', (e) => {
            
            if(e.target.nodeName === 'BUTTON') {                
                e.target.value ++;
                e.target.innerText = e.target.value + "❤️";
                total.innerText = likesMedia + "❤️";
                this.view.displayTotalLikes();
            }
        })
    }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Mediafactory(), new Lightbox());
photographerPage.run();