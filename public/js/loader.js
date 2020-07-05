/*
 fungsi untuk meload image
*/
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', ()=> {
            //setTimeout(resolve, 2000, image); // set timer to image loader
            resolve(image);
        });
        image.src = url;
    });
}
/* Fungsi untuk load level */
export function loadLevel(name){
    return fetch(`/levels/${name}.json`) // kutip satu miring
    .then(r => r.json());
    //.then(json => new Promise(resolve => setTimeout(resolve, 3000, json))); // set timer to level loader
}