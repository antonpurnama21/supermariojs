import SpriteSheet from './SpriteSheet.js'; // export class
import {loadImage} from './loader.js'; // export function

export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
    .then(image => {
        const sprites =  new SpriteSheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16 ,16);
        return sprites;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/img/tiles.png') // load image pada context
    .then(image => {
        //console.log('Image loaded', image);
        //  drawing subset sprite dari API
        const sprites =  new SpriteSheet(image, 16, 16); // class SpriteSheet
        sprites.defineTile('ground', 0, 0); // define image ground
        sprites.defineTile('sky', 3, 23); // define image sky
        return sprites;
    });
}