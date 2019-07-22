class Timer {
    constructor({
        data,
        root = document.body,
        className = '',
        autoAttach,
        autoStart,
        
        min = 0,
        sec = 0
    }) {

        this.data = data;
        this.min = Math.trunc(this.data.time/60),
        this.sec = this.data.time % 60;
        this.timeString = this.timeToString(this.data.time);
        this.time = this.data.time;
        this.interval = this.data.interval;
        this.lw = 100;
        
        this.buttonTxt = 'Start',

        this.running = false;
        this.timerId = null;
        this.timerIdOut = null;

        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);

        this.root = root;

        this.elementContainer = document.createElement('div');
        this.elementContainer.className = className;
        // Create time
        this.timeTxt = document.createElement('h3');
        this.timeTxt.innerText = this.timeString;
        // Create button
        this.button = document.createElement('button');
        this.button.innerText = this.buttonTxt;
        this.button.addEventListener('click', this.start);
        // Create line
        this.line = document.createElement('div');
        this.line.className = 'line';
        
        this.percent = this.time;
        
        if (autoAttach) {
            this.attach();
        }

        if (autoStart) {
            this.start();
        }
    }

    
    
    attach() {
    	this.root.appendChild(this.elementContainer);
 
        this.elementContainer.append(this.timeTxt);
        this.elementContainer.append(this.button);
        this.elementContainer.append(this.line);
    }
    
    detach() {
    	// remove timer
    }

    initialState() {
        this.min = Math.trunc(this.data.time/60),
        this.sec = this.data.time % 60;
        this.timeString = this.timeToString(this.data.time);
        this.time = this.data.time;
        this.interval = this.data.interval;
        this.lw = 100;
        this.percent = this.time;
    }

    timeToString(time) {
        const min = Math.trunc(time/60);
        const sec = time % 60;
        const time2string = min < 10 ?
            sec < 10 ? `0${min}:0${sec}`
        : `0${min}:${sec}` :
        `${min}:${sec}`;
        return time2string;
    }

    start() {
        if (!this.running) {
            this.running = !this.running;
            this.button.innerText = 'Stop';
            this.line.style.width = `${this.lw}%`;

            this.timerId = setInterval(
                () => {
                    this.time -= this.interval;
                    this.timeString = this.timeToString(this.time);
                    this.timeTxt.innerText = this.timeString;

                    // Change line
                    if (this.percent > this.interval) {
                        this.percent -= this.interval;
                        this.lw = 100*this.percent/this.data.time;
                        this.line.style.width = `${this.lw}%`;
                    }
                }
                , this.interval*1000);

            this.timerIdOut = setTimeout(
                () => {
                    this.pause();
                    clearInterval(this.timerId);

                    this.timeTxt.innerText = this.timeToString(0);   
                    this.line.style.width = '0%';
                    
                    this.initialState();
                }
                , this.time*1000);   
        } else {
            this.pause();
        }
    }

    pause() {
        this.running = !this.running;
        this.button.innerText = 'Start';

        clearInterval(this.timerId);
        clearTimeout(this.timerIdOut);
    }
}

const timerSettings = {time: 10, interval: 1};
const timerSettings2 = {time: 200, interval: 2};

const timer = new Timer({
    data: timerSettings,
    className: 'timer',
    root: document.getElementById('root'),
    autoAttach: true,
    autoStart: false
});

const timer2 = new Timer({
    data: timerSettings2,
    className: 'timer2',
    root: document.getElementById('root'),
    autoAttach: true,
    autoStart: true
});

