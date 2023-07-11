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
            .then((image) => this.view.displayImg(image))
            .catch(() => {
                console.log("Error loading image. Rendering default image.");
                this.view.displayImg(this.view.DEFAULT_IMG);
            });
        this.view.displayImg(memes[id].url);
    }

    loadImage(url) {
        const TIMEOUT_DURATION = 5000; // 5 seconds timeout

        return new Promise((resolve, reject) => {
            const img = new Image();
            let loaded = false;

            img.onload = () => {
                if (!loaded) {
                    loaded = true;
                    resolve(url);
                }
            };

            img.onerror = () => {
                if (!loaded) {
                    loaded = true;
                    reject();
                }
            };

            img.src = url;

            setTimeout(() => {
                if (!loaded) {
                    loaded = true;
                    reject();
                }
            }, TIMEOUT_DURATION);
        }).catch(() => {
            console.log("Error loading image. Rendering default image.");
            return this.view.DEFAULT_IMG;
        });
    }
}
