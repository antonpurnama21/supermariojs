import SpriteSheet from './SpriteSheet.js'; // export class
import {loadImage, loadLevel} from './loader.js'; // export function

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        // loog untuk membuat langit di canvas
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}


const canvas = document.getElementById('screen'); // ambil element canvas dengan id
const context = canvas.getContext('2d'); // API yang gunakan untuk menggambar di kanvas.

//context.fillRect(0, 0, 50, 50); // draw canvas
loadImage('/img/tiles.png') // load image pada context
.then(image => {
    //  drawing subset sprite dari API
    const sprites =  new SpriteSheet(image, 16, 16); // class SpriteSheet
    sprites.define('ground', 0, 0); // define image ground
    sprites.define('sky', 3, 23); // define image sky

    loadLevel('1.1')
    .then(level => {
        // loop level background
        level.backgrounds.forEach(background => {
            drawBackground(background, context, sprites);
        });
    })
    
    // loog untuk menggambar tanah di canvas
    for (let x = 0; x < 25; x++) {
        for (let y = 12; y < 14; y++) {
            sprites.drawTile('ground', context, x, y);
        }
    }
    //sprites.draw('sky', context, 45, 65); // gambar image

    // drawing subset sprite dari gambar
    // context.drawImage(image , 
    //     0, 0, // x, y
    //     16, 16, // p , l (panjang, lebar)
    //     0, 0,
    //     16, 16
    //     );
});
