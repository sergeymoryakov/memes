class API {
    constructor() {
        this.baseUrl = "https://api.imgflip.com";
    }

    fetchMemes() {
        return fetch(`${this.baseUrl}/get_memes`).then((data) => data.json());
    }
}

class Model {
    constructor() {
        console.log("Model engaged");
    }
}

class View {
    constructor() {
        this.imageSelectorNode = document.getElementById("imageSelector");
        this.inputTextTopNode = document.getElementById("inputTextTop");
        this.inputTextBottomNode = document.getElementById("inputTextBottom");
        this.memeImgNode = document.getElementById("memeImg");

        console.log("View engaged");
    }

    renderOptions(memes) {
        this.imageSelectorNode.innerHTML = "";
        let optionList = "";
        memes.forEach((element) => {
            optionList += `
                <option value="${element.id}">${element.name}</option>
            `;
        });
        this.imageSelectorNode.innerHTML = optionList;
    }

    renderImg(memes, id) {
        this.memeImgNode.src = memes[id].url;
        console.log(this.memeImgNode.src);
    }
}

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.api = new API();
    }

    init() {
        this.api.fetchMemes().then((res) => {
            if (res.success === true) {
                const memes = res.data.memes;
                // Check - for TBS only:
                console.log(memes);
                console.log(memes[0]);

                this.view.renderImg(memes, 96);
                this.view.renderOptions(memes);
                console.log("init completed");
            } else {
                console.log("API request failed");
            }
        });
    }
}

const app = new Controller();

app.init();
