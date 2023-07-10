const imageSelectorNode = document.getElementById("imageSelector");
const inputTextTopNode = document.getElementById("inputTextTop");
const inputTextBottomNode = document.getElementById("inputTextBottom");
const memeImgNode = document.getElementById("memeImg");

function fetchMemes() {
    const baseUrl = "https://api.imgflip.com";
    return fetch(`${baseUrl}/get_memes`).then((data) => data.json());
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

function renderImg(memes, id) {
    memeImgNode.src = memes[id].url;
    console.log(memeImgNode.src);
}

function init() {
    fetchMemes().then((res) => {
        if (res.success === true) {
            const memes = res.data.memes;
            // Check - for TBS only:
            console.log(memes);
            console.log(memes[0]);

            renderImg(memes, 96);
            renderOptions(memes);
            console.log("init completed");
        } else {
            console.log("API request failed");
        }
    });
}

init();
