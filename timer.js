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
        // this.lw = 100;
        
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
    	this.root.insertBefore(this.elementContainer, this.root.firstChild);
 
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

            this.timerId = setInterval(
                () => {
                    this.time -= this.interval;
                    this.timeString = this.timeToString(this.time);

                    if (this.percent > this.interval) {
                        this.percent -= this.interval;
                        this.lw = 100*this.percent/this.data.time;
                     
                        this.render(
                            'Stop',
                            this.timeString,
                            this.lw
                        );
                    }             
                }
                , this.interval*1000);

            this.timerIdOut = setTimeout(
                () => {
                    this.pause();
                    clearInterval(this.timerId);

                    this.render(
                        'Start',
                        this.timeToString(0),
                        0
                    );
                    
                    this.initialState();
                }
                , this.time*1000);   
        } else {
            this.pause();
        }
    }

    pause() {
        this.running = !this.running;

        this.render(
            'Start',
            this.timeString,
            this.lw
        );

        clearInterval(this.timerId);
        clearTimeout(this.timerIdOut);
    }

    render(btnTxt, newTime, newLineWidth) {
        this.button.innerText = btnTxt;
        this.timeTxt.innerText = newTime;   
        this.line.style.width = `${newLineWidth}%`;
    }
}

const timerSettings = {time: 10, interval: 3};
const timerSettings2 = {time: 200, interval: 2};

const timer = new Timer({
    data: timerSettings,
    className: 'timer',
    root: document.getElementById('root'),
    autoAttach: true,
    autoStart: true
});

const timer2 = new Timer({
    data: timerSettings2,
    className: 'timer2',
    root: document.getElementById('root'),
    autoAttach: true,
    autoStart: true
});

const timer3 = new Timer({
    data: {time: 10, interval:3},
    className: 'timer3',
    root: document.getElementById('root'),
    autoAttach: true,
    autoStart: false
});

newTimer ();

function newTimer () {
    const form = document.getElementById("form");

    form.addEventListener('submit', newTimerAdd);

    function newTimerAdd (ev) {
        ev.preventDefault();

        const values = ev.target.getElementsByTagName('input');
        const time = Number(values[0].value);
        const interval = Number(values[1].value);
        const autorun = values[2].checked;

        const timer = new Timer({
            data: {time, interval},
            className: `timer${Math.random()}`,
            root: document.getElementById('root'),
            autoAttach: true,
            autoStart: autorun
        });
    }
}
