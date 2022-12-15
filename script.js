class GuessNumber {
    constructor() {
        this.range = [0, 100];
        this.triesLeft = 10;
        this.triesInputted = 10;
        this.chosenNum = GuessNumber.setNum(this.range[0], this.range[1]);
        this.numLimits = GuessNumber.setLimits(this.range, this.chosenNum);
    }

    static setNum(lowerLimit, upperLimit) {
        return lowerLimit + Math.round(Math.random() * (upperLimit - lowerLimit)) + 1;
    }
    static setLimits(range, chosenNum) {
        let limits = {};
        let high = (range[1] - range[0]) * 0.3;
        let low = (range[1] - range[0]) * 0.05;
        limits[-2] = chosenNum - high;
        limits[-1] = chosenNum - low;
        limits[1] = chosenNum + low;
        limits[2] = chosenNum + high;
        return limits;
    }
    
    setRange(lowerLimit, upperLimit) {
        this.range[0] = lowerLimit;
        this.range[1] = upperLimit;
        this.chosenNum = GuessNumber.setNum(this.range[0], this.range[1]);
        this.numLimits = GuessNumber.setLimits(this.range, this.chosenNum);
    }
    setTriesLeft(triesLeft) {
        this.triesLeft = triesLeft;
        this.triesInputted = triesLeft;
    }
    checkNum(num) {
        if (num >= this.range[0] && num <= this.range[1]) {
            this.triesLeft --;
            if (num == this.chosenNum) {
                return 0;
            } else if (this.triesLeft != 0) {
                if (num < this.chosenNum) {
                    if (num < this.numLimits[-2]) {
                        return 3;
                    } else if (num < this.numLimits[-1]) {
                        return 2;
                    } else {
                        return 1;
                    }
                } else {
                    if (num > this.numLimits[2]) {
                        return -3;
                    } else if (num > this.numLimits[1]) {
                        return -2;
                    } else {
                        return -1;
                    }
                }
            } else {
                return 'go';
            }
        } else {
            return 404;
        }
    }
    reset() {
        this.triesLeft = this.triesInputted;
        this.chosenNum = GuessNumber.setNum(this.range[0], this.range[1]);
        this.numLimits = GuessNumber.setLimits(this.range, this.chosenNum);
    }
}

runGame();
getAcces();
init();

function runGame() {
    game = new GuessNumber();
    game.setRange(0, 1000);
    game.setTriesLeft(12);
}
function getAcces() {
    eleLowerLimit = document.querySelector('label > span:first-child');
    eleUpperLimit = document.querySelector('label > span:last-child');
    eleInput = document.querySelector('input');
    eleLog = document.querySelector('.guess > span');
    eleButton = document.querySelector('button');
    eleTries = document.querySelector('.main > p > span');
    eleArrow = document.querySelector('.arrow');
    eleUsed = document.querySelector('.used > p');
}
function init() {
    eleLowerLimit.textContent = game.range[0];
    eleUpperLimit.textContent = game.range[1];
    eleTries.textContent = game.triesLeft;
    eleButton.onclick = process;
    window.addEventListener('keyup', function(event) {
        if (event.keyCode == 13) {
            eleButton.click()
        }
    });
}
function process() {
    let input = eleInput.value.trim();
    eleInput.value = "";
    console.log(input);
    if (input != "" && !isNaN(input)) {
        input = Number(input);
        const status = game.checkNum(input);
        if (status != 404) {
            eleTries.textContent = game.triesLeft;
            setUsed(input);
            if (status == 0) {
                gameOver("You won!");
            } else {
                if (game.triesLeft == 0) {
                    gameOver(`Number was ${game.chosenNum}`);
                } else {
                    setSlider(status);
                }
            }
        } else {
            eleArrow.style.top = '-25%';
        }
    } else {
        alert("Enter a valid integer!");
    }
}
function setUsed(num) {
    const span = document.createElement('span');
    span.textContent = num + " ";
    eleUsed.appendChild(span);
    setTimeout(function() {
        document.querySelector('.used > p > span:last-child').className = "re-state";
    }, 0);
}
function setSlider(hint) {
    switch (hint) {
        case 1:
            eleArrow.style.top = '42%';
            break;
        case 2:
            eleArrow.style.top = '28%';
            break;
        case 3:
            eleArrow.style.top = '6%';
            break;
        case -1:
            eleArrow.style.top = '58%';
            break;
        case -2:
            eleArrow.style.top = '72%';
            break;
        case -3:
            eleArrow.style.top = '94%';
            break;
    }
}
function gameOver(log) {
    eleArrow.style.top = '50%';
    eleInput.className = 're-state';
    eleLog.textContent = log;
    eleLog.className = 're-state';
    eleButton.className = 're-state';
    eleButton.textContent = 'Restart';
    eleButton.onclick = restart;
    eleTries.className = 're-state';
}
function restart() {
    game.reset()
    eleLog.className = "";
    eleInput.className = "";
    eleInput.focus();
    eleButton.className = "";
    eleButton.textContent = "Guess";
    eleButton.onclick = process;
    eleTries.textContent = game.triesLeft;
    eleTries.className = "";
    eleUsed.textContent = "";
}