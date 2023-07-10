const baseUrl = "https://api.imgflip.com/get_memes";
let memes = [];

const imageSelectorNode = document.getElementById("imageSelector");
const inputTextTopNode = document.getElementById("inputTextTop");
const inputTextBottomNode = document.getElementById("inputTextBottom");
const memeImgNode = document.getElementById("memeImg");
const textTopNode = document.getElementById("textTop");
const textBottomNode = document.getElementById("textBottom");

init();

imageSelectorNode.addEventListener("input", displayImg);
inputTextTopNode.addEventListener("input", renderTextTop);
inputTextBottomNode.addEventListener("input", renderTextBottom);

function init() {
    fetchMemes().then((res) => {
        if (res.success === true) {
            memes = res.data.memes;

            console.log("memes received, meme[0]:");
            console.log(memes[0].name);
            console.log(memes[0].url);
            console.log(memes[0].id);

            renderOptions(memes);

            console.log("options rendered");
        } else {
            console.log("API request failed");
        }
    });
}

function fetchMemes() {
    return fetch(baseUrl).then((data) => data.json());
}

function renderOptions(memes) {
    imageSelectorNode.innerHTML = "";
    let optionList = "";
    memes.forEach((element) => {
        optionList += `
            <option value="${element.id}">${element.name}</option>
        `;
    });
    imageSelectorNode.innerHTML = optionList;
}

function displayImg() {
    console.log("imageSelectorNode.value = ", imageSelectorNode.value);
    const memeId = getMemeId(memes, imageSelectorNode.value);
    console.log("memeId = ", memeId);
    renderImg(memes, memeId);
}

function getMemeId(memes, imgId) {
    let findId = "";
    for (let index = 0; index < memes.length; index++) {
        if (memes[index].id === imgId) {
            findId = index;
            console.log("findId = ", findId);
        }
    }
    return findId;
}

function renderImg(memes, id) {
    memeImgNode.src = memes[id].url;
    console.log(memeImgNode.src);
}

function renderTextTop() {
    textTopNode.textContent = inputTextTopNode.value;
}

function renderTextBottom() {
    textBottomNode.textContent = inputTextBottomNode.value;
}
