import Entity from './Entity.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import {loadMarioSprite} from './Sprites.js';


/**
 * name : createMario
 * desc : membuat entity carachter
 */
export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();

        mario.addTrait(new Velocity()); // sifat percepatan
        mario.addTrait(new Jump()); // sifat lompat

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        // mario.update = function updateMario(deltaTime) {
        //     this.pos.x += this.vel.x * deltaTime;
        //     this.pos.y += this.vel.y * deltaTime;
        // }
        return mario;
    });
}