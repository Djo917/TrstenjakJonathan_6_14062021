export class View {
    renderAllPhotographers(photographers) {
        
        photographers.forEach(photographer => {
            const idsection = document.getElementById("photographers");
            const div = document.createElement("div");
            const a = document.createElement("a");
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            const pbis = document.createElement("p");  

            idsection.appendChild(div);
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
            div.appendChild(pbis).innerText = photographer.price;
            pbis.classList.add("photographers__line--price", "margin--details");
        });

    }

    renderAllTags() {
        console.log('showTags');
    }

}
export default View;