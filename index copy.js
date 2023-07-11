const BASE_URL = "https://api.imgflip.com/get_memes";
const DEFAULT_IMG = "default-img.png";
let memes = [];

const imageSelectorNode = document.getElementById("imageSelector");
const inputTextTopNode = document.getElementById("inputTextTop");
const inputTextBottomNode = document.getElementById("inputTextBottom");
const memeImgNode = document.getElementById("memeImg");
const textTopNode = document.getElementById("textTop");
const textBottomNode = document.getElementById("textBottom");

init();

imageSelectorNode.addEventListener("input", handleImg);
inputTextTopNode.addEventListener("input", renderTextTop);
inputTextBottomNode.addEventListener("input", renderTextBottom);

function init() {
    fetchMemes().then((res) => {
        if (res.success === true) {
            memes = res.data.memes;

            // console.log("memes received, meme[0]:");
            // console.log(memes[0].name);
            // console.log(memes[0].url);
            // console.log(memes[0].id);

            renderOptions(memes);
            displayImg(DEFAULT_IMG);

            // console.log("options rendered");
        } else {
            console.log("API request failed");
        }
    });
}

function fetchMemes() {
    return fetch(BASE_URL).then((data) => data.json());
}

function renderOptions(memes) {
    imageSelectorNode.innerHTML = "";
    let optionList = `
            <option value="hidden" hidden disabled selected
            >Select Image</option>
        `;
    memes.forEach((element) => {
        optionList += `
            <option value="${element.id}">${element.name}</option>
        `;
    });
    imageSelectorNode.innerHTML = optionList;
}

function handleImg() {
    console.log("imageSelectorNode.value = ", imageSelectorNode.value);
    const memeId = getMemeId(memes, imageSelectorNode.value);
    // console.log("memeId = ", memeId);
    renderImg(memes, memeId);
}

function getMemeId(memes, imgId) {
    let findId = "";
    for (let index = 0; index < memes.length; index++) {
        if (memes[index].id === imgId) {
            findId = index;
            // console.log("findId = ", findId);
        }
    }
    return findId;
}

function renderImg(memes, id) {
    cleanImg();
    const imageUrl = memes[id].url;
    loadImage(imageUrl)
        .then((image) => displayImg(image))
        .catch(() => {
            console.log("Error loading image. Rendering default image.");
            displayImg(DEFAULT_IMG);
        });
    displayImg(memes[id].url);
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject();
        img.src = url;
    }).catch(() => {
        console.log("Error loading image. Rendering default image.");
        return DEFAULT_IMG;
    });
}

function cleanImg() {
    memeImgNode.src = "";
}

function displayImg(url) {
    memeImgNode.src = url;
}

function renderTextTop() {
    textTopNode.textContent = inputTextTopNode.value;
}

function renderTextBottom() {
    textBottomNode.textContent = inputTextBottomNode.value;
}
