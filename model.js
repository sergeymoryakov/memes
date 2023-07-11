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
                // console.log("findId = ", this.findId);
            }
        }
        console.log(`model.getMemeId() reverted findId = ${this.findId} back`);
        return this.findId;
    }
}
