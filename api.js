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
