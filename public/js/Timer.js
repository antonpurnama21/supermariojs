/**
 * name : Timer 
 * desc : mengatur akurasi waktu perframe
 */

export default class Timer {
    constructor(deltaTime = 1/60){
        let accumulatedTime = 0;
        let lastTime = 0;
        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;
            //console.log(deltaTime);
            
            while (accumulatedTime > deltaTime) { 
                this.update(deltaTime); 
                accumulatedTime -= deltaTime;
            }
            // setTimeout(update, 1000/500, performance.now()); // debug perpose only
            lastTime = time;
            this.enqueue()
        }
    }

    enqueue(){
        requestAnimationFrame(this.updateProxy);
    }

    start(){
        this.enqueue();
    }
}