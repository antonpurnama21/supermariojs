const PRESSED = 1;
const RELEASED = 0;

/**
 * name: KeyboardState
 * desc: Membuat state keyboard
 */

export default class KeyboardState {
    constructor(){
        // hold the current state of a given key
        this.keyStates = new Map();

        // hold the callback functions for a key code
        this.keyMap = new Map();

    }
    // menambahkan pemetaan keyboard
    addMapping(keyCode, callback){
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event){
        const {keyCode} = event;

        if (!this.keyMap.has(keyCode)) {
            // did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(keyCode) === keyState) {
            return;
        }

        this.keyStates.set(keyCode, keyState);
        console.log(this.keyStates);

        this.keyMap.get(keyCode)(keyState);
    }

    // get input from window
    listenTo(window){
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}