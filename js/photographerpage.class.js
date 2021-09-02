import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';
import { Mediafactory } from '/lib/mediafactory.class.js';
import { Lightbox } from '/lib/lightbox.class.js';

class PhotographerPage {
    constructor(view, ajax, mediafactory, lightbox) {
        this.view = view;
        this.ajax = ajax;
        this.mediafactory = mediafactory;
        this.lightbox = lightbox;
    }
    run() {
        this.showPhotographer();
        this.showMedias();
        this.noPhotographer();
        this.totalCount();
        this.eventLikes();
        this.handleModal();
        this.eventSort();
    }

    showPhotographer() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.towardsPhotographer(data.photographers);
        })
        
    }

    eventSort () {
        const menu = document.getElementById('menufilter');
        const section = document.getElementById('content');
        const datas = this.ajax.fetchData();

        menu.addEventListener('change', (e) => {
            section.innerHTML = '';
            datas.then(data => {
                this.view.renderAllMedia(data.media, e.target.value);
            })
        })        
    }

    showMedias () {
        const menu = document.getElementById('menufilter');
        let selected = menu.querySelector('option').value;
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.renderAllMedia(data.media, selected);
        })

    }

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

        button.addEventListener('keyup', (e) => {
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

    totalCount() {
        const datas = this.ajax.fetchData();
        const idUrl = window.location.search.substr(1);

        datas.then(data => {
            let getMedias = data.media.filter(p => p.photographerId == idUrl);
            let totalLikes = 0;
            const getPrice = data.photographers.filter(p => p.id == idUrl)
            const count = document.getElementById("totallikes");
            
            const price = document.getElementById("price");
            
            getMedias.forEach(l => {
                totalLikes += l.likes
                count.innerText = totalLikes + "❤️";
            })

            let priceEuro = new Intl.NumberFormat('fr-FR', { /* Formate le prix en fonction du local */

                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0
            });
            this.eventLikes(totalLikes);
            price.innerText = priceEuro.format(getPrice[0].price) + '/jour';
        })

        
    }

    eventLikes(total) {
        const section = document.getElementById("content"); 
        const totalLikes = document.getElementById('totallikes');

        section.addEventListener('click', (e) => {
            if(e.target.nodeName === 'BUTTON') {
                e.target.value ++;
                e.target.innerText = e.target.value + "❤️";
                total ++;
                totalLikes.innerText = total + "❤️";
            }
        })
    }
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Mediafactory(),  new Lightbox());
photographerPage.run();