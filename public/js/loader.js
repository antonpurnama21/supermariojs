/*
 fungsi untuk meload image
*/
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', ()=> {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadLevel(name){
    return fetch(`/levels/${name}.json`) // kutip satu miring
    .then(r => r.json());
}