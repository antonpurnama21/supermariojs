/*
name: drawBackground
desc: menggambar layer background
*/
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

/*
name: createBackgroundLayer
desc: membuat layer background
*/
export function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256; // lebar
    buffer.height = 240; // tinggi

    // loop background
    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}
/**
 * name : createSpriteLayer
 * desc :
 */
export function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
    }
}