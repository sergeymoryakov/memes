class Controller {
    constructor() {
        // this.model = new Model();
        // this.view = new View();
        this.api = new API();
    }

    init() {
        this.api.fetchMemes().then((res) => {
            console.log(res);
            console.log(memesData.success);
            console.log(memesData.data.memes);
        });
    }
}
