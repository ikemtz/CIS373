'use strict';
let currentDiceValues = {};
let rollTemplate = '';
let speed = 50;
let interval;
const speedElm = document.getElementById('speed');
const die1Elm = document.getElementById('die1');
const die2Elm = document.getElementById('die2');
const rollsElm = document.getElementById('rolls');
const speedUpElm = document.getElementById('speedUp');
const slowDownElm = document.getElementById('slowDown');
const speedRangeElm = document.getElementById('speedRange');
let isEmpty;

function speedUp() {
  if (speed <= 10) {
    updateRoller(1);
  } else if (0 < speed % 10) {
    updateRoller(speed - (speed % 10));
  } else {
    updateRoller(speed - 10);
  }
}

function slowDown() {
  if (speed >= 90) {
    updateRoller(99);
  } else if (0 < speed % 10) {
    updateRoller(speed + ((10 - speed) % 10));
  } else {
    updateRoller(speed + 10);
  }
}

function updateRoller(updatedSpeed) {
  speed = updatedSpeed;
  slowDownElm.disabled = speed >= 91;
  speedUpElm.disabled = speed <= 9;
  speedRangeElm.value = speed;
  clearInterval(interval);
  rollTheDice();
}
// Takes the current dice and add it's to the DOM.
function captureRoll() {
  if (isEmpty) {
    rollsElm.innerHTML = '';
  }
  isEmpty = false;
  rollsElm.innerHTML += rollTemplate
    .replace(
      '{rollIndex}',
      (rollsElm.innerHTML.match(/<table/gim) || []).length + 1
    )
    .replace('{die1}', currentDiceValues.die1)
    .replace('{die2}', currentDiceValues.die2);
}

// Removes all dice from the DOM.
function clearRolls() {
  rollsElm.innerHTML = '<h3>No Roles Captured Yet!</h3>';
  isEmpty = true;
}

function rollTheDice() {
  // Random Function
  const ran = () => Math.floor(Math.random() * 6) + 1;

  speedElm.innerText = 100 - speed;
  return (interval = setInterval(() => {
    currentDiceValues = {
      die1: `./images/dice${ran()}.png`,
      die2: `./images/dice${ran()}.png`
    };
    die1Elm.src = currentDiceValues.die1;
    die2Elm.src = currentDiceValues.die2;
  }, speed * 10));
}

//Initializes the randomization of the die
(() => {
  /*
    In the markup I had to change "img src" to "img [src]" to avoid having the 
    browser load invalid images on load
  */
  rollTemplate = rollsElm.innerHTML.replace(/\[src\]/gim, 'src');
  clearRolls();
  rollTheDice();
})();
