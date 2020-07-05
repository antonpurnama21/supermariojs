import Compositor from './compositor.js';
import {loadLevel} from './loader.js'; // export function
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layer.js'; 

const canvas = document.getElementById('screen'); // ambil element canvas dengan id
const context = canvas.getContext('2d'); // API yang gunakan untuk menggambar di kanvas.

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; i++) {
            sprite.draw('idle', context, pos.x + i * 16, pos.y);            
        }
    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1.1'),
])
.then(([marioSprite, backgroundSprites, level]) => {

    //console.log('level loaded', level);
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const pos = {
        x : 64,
        y : 64,
    };

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);
        marioSprite.draw('idle', context, pos.x, pos.y);
        pos.x += 2;
        pos.y += 2;

        requestAnimationFrame(update);
        
    }
    update();

});

//context.fillRect(0, 0, 50, 50); // draw canvas
    
    // loog untuk menggambar tanah di canvas
    // for (let x = 0; x < 25; x++) {
    //     for (let y = 12; y < 14; y++) {
    //         sprites.drawTile('ground', context, x, y);
    //     }
    // }
    //sprites.draw('sky', context, 45, 65); // gambar image

    // drawing subset sprite dari gambar
    // context.drawImage(image , 
    //     0, 0, // x, y
    //     16, 16, // p , l (panjang, lebar)
    //     0, 0,
    //     16, 16
    //     );
