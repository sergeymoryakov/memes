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
