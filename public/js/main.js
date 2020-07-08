import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {loadLevel} from './Loader.js';
import {createMario} from './Entities.js';
import {loadBackgroundSprites} from './Sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './Layer.js'; 
import Keyboard from './KeyboardState.js';

// cek event pada keyboard
// window.addEventListener('keydown', event => {
//     event.preventDefault();
//     console.log(event);
// });

const canvas = document.getElementById('screen'); // ambil element canvas dengan id
const context = canvas.getContext('2d'); // API yang gunakan untuk menggambar di kanvas.

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1.1'),
])
.then(([mario, backgroundSprites, level]) => {

    //console.log('level loaded', level);
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = 2000; // gravitasi
    mario.pos.set(64, 180); // posisi karakter
    //mario.vel.set(200, -600); // kecepatan / percepatan

    // const pos = new Vec2(64, 180);
    // const vel = new Vec2(2, -10);
    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            mario.jump.start();
        }else{
            mario.jump.cancel();
        }
        console.log(keyState);
    });
    input.listenTo(window);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer =  new Timer(1/60); // set waktu perframe
    timer.update = function update(deltaTime) {
        
        mario.update(deltaTime);
        // console.log(mario.pos);

        comp.draw(context);

        mario.vel.y += gravity * deltaTime;
        
    }
    timer.start();

});

//context.fillRect(0, 0, 50, 50); // draw canvas
    // const pos = {
    //     x : 64,
    //     y : 180,
    // };

    // const vel = {
    //     x : 2,
    //     y : -10,
    // }

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
