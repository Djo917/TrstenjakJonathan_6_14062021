import { View } from './view.class.js';
import { Ajax } from '/lib/ajax.class.js';
import { Mediafactory } from '/lib/mediafactory.class.js';

class PhotographerPage {
    constructor(view, ajax, mediafactory) {
        this.view = view;
        this.ajax = ajax;
        this.mediafactory = mediafactory;
    }
    run() {
        this.showPhotographer();
        this.showMedias();
        this.eventLikes();
        this.noPhotographer();
        this.handleModal();
    }

    showPhotographer() {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.towardsPhotographer(data.photographers);
        })
    }

    showMedias () {
        const datas = this.ajax.fetchData();

        datas.then(data => {
            this.view.renderAllMedia(data.media);
        })

    }
    
    eventLikes() {
        const datas = this.ajax.fetchData();
        const idUrl = window.location.search.substr(1);

        window.onload = () =>  {
            const element = document.querySelectorAll('button');
            
            datas.then(data => {
                let getMedias = data.media.filter(p => p.photographerId == idUrl);

                element.forEach(button => {
                    button.addEventListener('click', (e) => {
                        let getId = e.target.id;

                        getMedias.forEach(m => {

                            if(getId == m.id) {
                                m.likes ++;
                                button.innerText = m.likes + "❤️";
                            }
                        })
                    })
                })
            })
        }
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

        button.addEventListener('click', () => {
            modal.style.display = "block";
        })


        const cross = document.getElementById("close");
        
        cross.addEventListener('click', () => {
            modal.style.display = "none";
        })

        const firstNameValid = () => {
            const messageErreurPrenom = document.getElementById("messageErreurPrenom");
            let prenom = document.getElementById("first");
          
            if (prenom.value.length < 2) {
              messageErreurPrenom.textContent ="Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
              return false;
          
            } else {
              messageErreurPrenom.textContent = "";
              return true;
            }
          };
          
          const lastNameValid = () => {
            const messageErreurNom = document.getElementById("messageErreurNom");
            let nom = document.getElementById("last");
          
            if (nom.value.length < 2) {
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
}

const photographerPage = new PhotographerPage(new View(), new Ajax('/data/FishEyeData.json'), new Mediafactory());
photographerPage.run();