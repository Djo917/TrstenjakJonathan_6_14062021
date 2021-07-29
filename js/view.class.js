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
            let priceEuro = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
            });

            idSection.appendChild(div);
            div.classList.add("photographers__line--profile");

            div.appendChild(a);
            a.href = "photographer.html"
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

    renderAllTags() {
        console.log("showTags");
    }

    renderLikes(media) {
        // console.log(media[0].likes);
        const buttonLike = document.getElementsById("testlikes");
            console.log(buttonLike);
        media.forEach(mediaLikes => {
            console.log(media[0].likes);
            
            buttonLike.innerHTML = mediaLikes[0].likes + "❤️";
        });
    }

}
export default View;