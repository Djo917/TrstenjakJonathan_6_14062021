export class View {
    renderAllPhotographers(photographers) {
        
        photographers.forEach(photographer => {
            const idSection = document.getElementById("photographers");
            const div = document.createElement("div");
            const a = document.createElement("a");
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            const pbis = document.createElement("p");  
            const divTag = document.createElement("div");
            
            let priceEuro = new Intl.NumberFormat('fr-FR', { /* Formate le prix en fonction du local */

                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
            });

            idSection.appendChild(div);
            div.classList.add("photographers__line--profile");

            div.appendChild(a);
            a.href = "photographer.html?" + photographer.id;
            a.classList.add("photographers__line--profilelink");

            a.appendChild(img);
            img.src = `media/sample_photos/Photographers_ID_Photos/${photographer.portrait}`;
            img.classList.add("photographers__line--pictures");

            a.appendChild(h2).innerText = photographer.name;
            h2.classList.add("photographers__line--name");  

            div.appendChild(h3).innerText = photographer.country;
            h3.classList.add("photographers__line--location", "margin--details");
            
            div.appendChild(p).innerText = photographer.tagline;
            p.classList.add("photographers__line--skills", "margin--details");
            div.appendChild(pbis).innerText = priceEuro.format(photographer.price) + '/jour';
            pbis.classList.add("photographers__line--price", "margin--details");

            div.appendChild(divTag);
            divTag.classList.add("photographerstag");

            photographer.tags.forEach(tag =>  {
                const linkTag = document.createElement("a");
                const spanTag = document.createElement("span");

                divTag.appendChild(linkTag);
                linkTag.href = "#";
                linkTag.classList.add("photographerstag__link");

                linkTag.appendChild(spanTag);
                spanTag.classList.add("photographerstag__link--tag");

                spanTag.innerText = '#' + tag;
            }) 
        });
    }

    // renderAllTags(tags) {
    //     //Get all tags from json and make them unique
    //     let returnTags = (tags) => {
        
    //         const uniqueTags = [];
            
    //         for (let i in tags) {
    //             tags[i].tags.forEach(tag => uniqueTags.push(tag));    
    //         }
    //         return uniqueTags;
    //     }

    //     let getTags = [...new Set(returnTags(tags))];   
    //     getTags.sort();
        
    //     //Display all tags in nav menu
    //     getTags.forEach(tagsNavigation => {
            
    //         const idNav = document.getElementById("navmenu");
    //         const a = document.createElement("a");
    //         const span = document.createElement("span");

    //         idNav.appendChild(a);
    //         a.href= "#";
    //         a.classList.add("banner__navigation--link");

    //         a.appendChild(span).innerText = '#' + tagsNavigation;
    //         span.classList.add("banner__navigation--tag");
    //     })
    // }
    
    towardsPhotographer(photographers) {
        
        //Récupère l'id dans l'url et stock le profil du photographe dans printProfil  
        const idUrl = window.location.search.substr(1);
        const printProfil = photographers.find(p => p.id == idUrl);
        console.log(printProfil);

        const idSection = document.getElementById("photographers_banner");
        const navMenu = document.createElement("nav");
        const idDiv = document.createElement("div");
        const h1 = document.createElement("h1");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const divPictures = document.createElement("div")
        const profilPictures = document.createElement("img");
        

        idSection.prepend(idDiv);
        idDiv.classList.add("photographers__details");
        navMenu.setAttribute("id", "navmenu");
        idDiv.appendChild(h1).innerText = printProfil.name;
        h1.classList.add("photographers__details--name", "fontstyle", "margin", "fontweight4");
        idDiv.appendChild(h2).innerText = printProfil.city +  ', ' + printProfil.country;
        h2.classList.add("photographers__details--location", "fontstyle", "margin", "fontweight4");
        idDiv.appendChild(p).innerText = printProfil.tagline;
        h2.classList.add("photographers__details--skills", "fontstyle", "margin", "fontweight4");
        idDiv.append(navMenu);
        navMenu.classList.add("photographers__nav");

        printProfil.tags.forEach(tagsNavProfil => {
            
            const idNav = document.getElementById("navmenu");
            const a = document.createElement("a");
            const span = document.createElement("span");

            idNav.appendChild(a);
            a.href="#";
            a.classList.add("photographers__nav--link");

            a.appendChild(span).innerText = '#' + tagsNavProfil;
            span.classList.add("photographers__nav--tag", "fontstyle");
        })

        idSection.append(divPictures);
        divPictures.classList.add("photographers__picture");
        divPictures.appendChild(profilPictures)
        profilPictures.classList.add("photographers__picture--size");
        profilPictures.src = `media/sample_photos/Photographers_ID_Photos/${printProfil.portrait}`;
        profilPictures.alt = 'photo de profil de ' + printProfil.name;
    }       

    // renderLikes(media) {
    //     // console.log(media[0].likes);
    //     const buttonLike = document.getElementsById("testlikes");
    //         console.log(buttonLike);
    //     media.forEach(mediaLikes => {
    //         console.log(media[0].likes);
            
    //         buttonLike.innerHTML = mediaLikes[0].likes + "❤️";
    //     });
    // }

}
export default View;