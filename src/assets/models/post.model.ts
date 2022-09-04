export class PostModel {
    id: number;
    title: string;
    content: string;
    lat: string;
    long: string;
    image_url: string;

    constructor(){
        this.id = 0;
        this.title = '';
        this.content = '';
        this.lat = '';
        this.long = '';
        this.image_url = '';
    }
}