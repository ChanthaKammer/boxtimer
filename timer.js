//const fs = require('fs');
//const { argv } = require("process");

const timerElement = document.getElementById("timer");
const parcelAverage = document.getElementById("parcelAverage");
const smallAverage = document.getElementById("smallAverage");
const rateAAverage = document.getElementById("rateAAverage");
const mediumAverage = document.getElementById("mediumAverage");

const parcelCount = document.getElementById("parcelCount");
const smallCount = document.getElementById("smallCount");
const rateACount = document.getElementById("rateACount");
const mediumCount = document.getElementById("mediumCount");

let startTime = 0;
let interval = 1000;
let lightspeed = false;


let smalls = [];
let boxes = []
let parcels = [];
let rateAs = [];
let mediums = [];
let monsters = [];


let timer = setInterval(function() {
  startTime += 10;
  let minutes = Math.floor((startTime % 60000) / 600);
  let seconds = Math.floor((startTime % 60000) / 10) % 60;
  var timeString = minutes + ":" + seconds;
  timerElement.textContent = `${timeString}`;
}, interval);

cancelTimer = () => {
  startTime = 0;
};

pauseTimer = () => {
  clearInterval(timer);
};

startTimer = () => {
  startTime += 1;
};
  

lightSpeed = () => {
  if (lightspeed) {
    interval = 1000;
    lightspeed = false;
  } else if (!lightspeed) {
    interval = 20;
    lightspeed = true;
  }
  console.log(lightspeed);
  console.log(interval);


  clearInterval(timer);

  timer = setInterval(function() {
    startTime += 10;
    let minutes = Math.floor((startTime % 60000) / 600);
    let seconds = Math.floor((startTime % 60000) / 10) % 60;
    var timeString = minutes + ":" + seconds;
    timerElement.textContent = `${timeString}`;
  }, interval);
};


class Box {
  constructor(boxType, date, duration, rawDuration) {
    this.boxType = boxType;
    this.date = date;
    this.duration = duration;
    this.rawDuration = rawDuration;
    this.addToArray();
  }
  addToArray() {
    const arrays = {
      parcel: parcels,
      small: smalls,
      rateA: rateAs,
      medium: mediums,
      monster: monsters,
    };
    arrays[this.boxType].push(this);
  }
}


const boxType = ['parcel', 'small', 'rateA', 'medium', 'monster'];

function createBox(type) {
  console.log(startTime);
  date = new Date();
  duration = timerElement.textContent;
  rawDuration = startTime;
  startTime = 0;
  const box = new Box(type, date, duration, rawDuration);
  boxes.push(box);
  averageAll();
}

function averageTime(type){
  let boxCount = 0;
  let boxTotalTime = 0;
  let boxAvg = 0;
  for (box of type){
    boxCount++;
    boxTotalTime += box.rawDuration;
  }
  boxAvg = boxTotalTime/boxCount;
  let averageMinutes = Math.floor((boxAvg % 60000) / 600);
  let averageSeconds = Math.floor((boxAvg % 60000) / 10) % 60;
  var avgFormatted = averageMinutes + ":" + averageSeconds;
  if(type === parcels){
    parcelAverage.textContent = avgFormatted;
    parcelCount.textContent = boxCount;
  } else if (type === smalls){
    smallAverage.textContent = avgFormatted;
    smallCount.textContent = boxCount;
  } else if (type === rateAs){
    rateAAverage.textContent  = avgFormatted;
    rateACount.textContent = boxCount;
  } else if (type === mediums){
    mediumAverage.textContent = avgFormatted;
    mediumCount.textContent = boxCount;
  }
  //console.log(avgFormatted);
  return avgFormatted;
}

function averageAll(){
  averageTime(parcels);
  averageTime(smalls);
  averageTime(rateAs);
  averageTime(mediums);
}




