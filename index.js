class API {
    constructor() {
        this.BASE_URL = "https://api.imgflip.com/get_memes";
        console.log("API defined");
    }
    fetchMemes() {
        console.log("BASE_URL fetched");
        return fetch(this.BASE_URL).then((data) => data.json());
    }
}
class Model {
    constructor() {
        this.memes = [];
        console.log("Model defined");
    }

    getMemeId(memes, imgId) {
        this.findId = "";
        for (let index = 0; index < memes.length; index++) {
            if (memes[index].id === imgId) {
                this.findId = index;
                console.log("findId = ", this.findId);
            }
        }
        return this.findId;
    }
}
class View {
    constructor() {
        this.DEFAULT_IMG = "default-img.png";

        this.imageSelectorNode = document.getElementById("imageSelector");
        this.inputTextTopNode = document.getElementById("inputTextTop");
        this.inputTextBottomNode = document.getElementById("inputTextBottom");
        this.memeImgNode = document.getElementById("memeImg");
        this.textTopNode = document.getElementById("textTop");
        this.textBottomNode = document.getElementById("textBottom");

        this.inputTextTopNode.addEventListener("input", this.renderTextTop);
        this.inputTextBottomNode.addEventListener(
            "input",
            this.renderTextBottom
        );

        console.log("View defined");
    }

    renderOptions(memes) {
        this.imageSelectorNode.innerHTML = "";
        let optionList = `
        <option value="hidden" hidden disabled selected
        >Select Image</option>
        `;
        memes.forEach((element) => {
            optionList += `
            <option value="${element.id}">${element.name}</option>
            `;
        });
        this.imageSelectorNode.innerHTML = optionList;
    }

    cleanImg() {
        this.memeImgNode.src = "";
    }

    displayImg(url) {
        this.memeImgNode.src = url;
    }

    renderTextTop = () => {
        this.textTopNode.textContent = this.inputTextTopNode.value;
    };

    renderTextBottom = () => {
        this.textBottomNode.textContent = this.inputTextBottomNode.value;
    };
}

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View(this);
        this.api = new API(console.log());
        console.log("Controller initiated");
        this.view.imageSelectorNode.addEventListener("input", () => {
            this.handleImg();
        });
    }

    init() {
        this.api.fetchMemes().then((res) => {
            if (res.success === true) {
                this.model.memes = res.data.memes;

                // console.log("memes received, meme[0]:");
                // console.log(memes[0].name);
                // console.log(memes[0].url);
                // console.log(memes[0].id);

                this.view.renderOptions(this.model.memes);
                this.view.displayImg(this.view.DEFAULT_IMG);

                // console.log("options rendered");
            } else {
                console.log("API request failed");
            }
        });
    }

    handleImg() {
        console.log(
            "imageSelectorNode.value = ",
            this.view.imageSelectorNode.value
        );
        const memeId = this.model.getMemeId(
            this.model.memes,
            this.view.imageSelectorNode.value
        );
        // console.log("memeId = ", memeId);
        this.renderImg(this.model.memes, memeId);
    }

    renderImg(memes, id) {
        this.view.cleanImg();
        const imageUrl = memes[id].url;
        this.loadImage(imageUrl)
            .then((image) => displayImg(image))
            .catch(() => {
                console.log("Error loading image. Rendering default image.");
                this.view.displayImg(this.view.DEFAULT_IMG);
            });
        this.view.displayImg(memes[id].url);
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            this.img = new Image();
            this.img.onload = () => resolve(url);
            this.img.onerror = () => reject();
            this.img.src = url;
        }).catch(() => {
            console.log("Error loading image. Rendering default image.");
            return this.view.DEFAULT_IMG;
        });
    }
}

// module Index:
const app = new Controller();

app.init();
