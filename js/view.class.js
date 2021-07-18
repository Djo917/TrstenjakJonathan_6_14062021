import { Ajax } from '/lib/ajax.class.js';

export class View {
    renderAllPhotographers() {
        fetchData(FishEyeData.json)
    }

    renderAllTags() {
        console.log('showTags');
    }
}

export default View;