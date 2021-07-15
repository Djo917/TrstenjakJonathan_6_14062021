

export class View {
    renderAllPhotographers() {
        fetch("data/FishEyeData.json")
        .then(dataPhotographes => dataPhotographes.json())

        for(let i of photographers) {
            console.log(i);
        }
    }

    renderAllTags() {
        console.log('showTags');
    }
}

export default View;