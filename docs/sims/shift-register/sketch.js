// Sample MicroSim Sketch Template for 2D Geometry
// MicroSim Template for 2D geometry with region drawing parameters
// Modified to include logic analyzer display
// Author: Dan McCreary (modified by Claude)

// The width of the entire canvas
let canvasWidth = 700;
// The top drawing region above the interactive controls
let drawWidth = canvasWidth;
let drawHeight = 320;
// The control region is where we place sliders, buttons, etc.
let controlHeight = 40;
// The total height = drawing region + control region
let canvasHeight = drawHeight + controlHeight;

// margin around the active plotting region
let margin = 25;
// the left margin area needs to hold the width of the text label and value
let sliderLeftMargin = 130;

// Chip Location 
let chipWidth = 100;
let chipHeight = 240;
let centerX = canvasWidth / 5;
let centerY = drawHeight / 2 + margin;
let rightPinXStart = centerX + chipWidth/2;
let pinLength = 20;
let rightPinXEnd = rightPinXStart + pinLength;

// Logic analyzer display parameters
let timelineX = canvasWidth/2;
let timelineY = margin*3;
let timelineW = canvasWidth/2 - margin*2;
let timelineH = 130; // drawHeight - margin*4;
let signalHeight = 20;  // Height of each signal trace
let signalSpacing = 30; // Vertical spacing between signals
let signalLabelWidth = 50; // Width reserved for signal labels

// larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

// Variables for UI elements
let dataInRadio;
let nextClockButton;
let latchButton;

// Internal signals
let dataIn = false;
let clock = false;  // Will toggle on each press of NEXT CLOCK
let latch = false;  // Will toggle on press of LATCH button

// 74HC594 has an internal shift register and an output register
let shiftRegister = [false, false, false, false, false, false, false, false];
let outputRegister = [false, false, false, false, false, false, false, false];

// For storing a timeline of states with timestamps
let timeline = [];
let maxTimelineSteps = 20;
let timeStep = 0;

function setup() {
  // Create the main canvas
  const canvas = createCanvas(canvasWidth, canvasHeight);
  // If you want to place this in a <main> container in HTML:
  var mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  textSize(16);

  // Radio button for Data In (ON/OFF)
  dataInRadio = createRadio();
  dataInRadio.option('OFF', 'OFF');
  dataInRadio.option('ON', 'ON');
  dataInRadio.selected('OFF');
  dataInRadio.changed(() => {
    dataIn = (dataInRadio.value() === 'ON');
    updateTimeline();
  });
  dataInRadio.position(10, drawHeight + 5);

  // NEXT CLOCK button
  nextClockButton = createButton('Next Clock');
  nextClockButton.position(120, drawHeight + 10);
  nextClockButton.mousePressed(doNextClock);

  // LATCH button
  latchButton = createButton('Latch');
  latchButton.position(240, drawHeight + 10);
  latchButton.mousePressed(doLatch);
  
  // Reset button
  latchButton = createButton('Reset');
  latchButton.position(340, drawHeight + 10);
  latchButton.mousePressed(doReset);
}

function draw() {
  rectMode(CORNER);
  // Background of drawing region
  fill('aliceblue');
  stroke('silver');
  rect(1, 1, canvasWidth-1, drawHeight-2, 5);

  // Background of controls region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight-2, 5);
  
  // Title
  textSize(24);
  textAlign(CENTER);
  fill('black');
  text("Shift Register MicroSim",canvasWidth/2, margin);
  // Draw the chip
  drawChip();
  
  // Draw the logic analyzer display
  drawLogicAnalyzer();

  // Show current states
  fill('black');
  textSize(16);
  textAlign(CENTER, TOP);
  let statusStr = "DATA IN: " + (dataIn ? "HIGH" : "LOW");
  statusStr += " | LATCH: " + (latch ? "HIGH" : "LOW");
  // text(statusStr, width/2, drawHeight - 30);

  // Show output bits
  drawOutputBits();
}

function drawChip() {
  // Draw the chip body
  fill('black');
  noStroke();
  rectMode(CENTER);
  // rounded corners
  rect(centerX, centerY, chipWidth, chipHeight, 10);

  // Label the chip
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text("74HC594", centerX, centerY);

  // Label pins
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  let leftPinX = centerX - chipWidth/2 - 70;
  let pinSpacing = 30;
  let topPinY = centerY - pinSpacing;

  text("DATA IN", leftPinX-5, topPinY);
  text("CLOCK", leftPinX-5, topPinY + pinSpacing);
  text("LATCH", leftPinX-5, topPinY + 2*pinSpacing);

  // Label output pins
  for (let i = 0; i < 8; i++) {
    let y = centerY - (3.5 * pinSpacing) + i*pinSpacing;
    text(`OUT ${i+1}`, rightPinXEnd + 5, y);
  }

  // Draw connecting lines
  stroke('green');
  strokeWeight(4);
  
  // Input lines
  line(leftPinX + 60, topPinY, centerX - chipWidth/2, topPinY);
  line(leftPinX + 60, topPinY + pinSpacing, centerX - chipWidth/2, topPinY + pinSpacing);
  line(leftPinX + 60, topPinY + 2*pinSpacing, centerX - chipWidth/2, topPinY + 2*pinSpacing);

  // Output lines
  stroke('purple');
  strokeWeight(4);
  for (let i = 0; i < 8; i++) {
    let y = centerY - (3.5 * pinSpacing) + i*pinSpacing;
    line(rightPinXStart, y, rightPinXEnd, y);
  }
}

function drawLogicAnalyzer() {
  // Draw logic analyzer frame
  noFill();
  stroke('green');
  // rect(timelineX, timelineY, timelineW, timelineH);

  // Title
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text("Logic Analyzer", timelineX + 5, timelineY + 5);

  // Draw signal labels
  textAlign(RIGHT, CENTER);
  text("DATA IN", timelineX + signalLabelWidth - 5, timelineY + 40);
  text("CLOCK", timelineX + signalLabelWidth - 5, timelineY + 40 + signalSpacing);
  text("LATCH", timelineX + signalLabelWidth - 5, timelineY + 40 + 2 * signalSpacing);
  
  // Draw timeline grid
  stroke(200);
  strokeWeight(1);
  let timeSlotWidth = (timelineW - signalLabelWidth) / maxTimelineSteps;
  
  // Vertical grid lines
  for (let i = 0; i <= maxTimelineSteps; i++) {
    let x = timelineX + signalLabelWidth + i * timeSlotWidth;
    line(x, timelineY + 30, x, timelineY + timelineH - 10);
  }

  // Draw signals
  strokeWeight(2);
  for (let i = 0; i < timeline.length - 1; i++) {
    let current = timeline[i];
    let next = timeline[i + 1];
    let x1 = timelineX + signalLabelWidth + i * timeSlotWidth;
    let x2 = x1 + timeSlotWidth;

    // Draw DATA IN signal
    stroke('blue');
    drawSignalSegment(x1, x2, current.dataIn, next.dataIn, 0);

    // Draw CLOCK signal
    stroke('red');
    drawSignalSegment(x1, x2, current.clock, next.clock, 1);

    // Draw LATCH signal
    stroke('green');
    drawSignalSegment(x1, x2, current.latch, next.latch, 2);
  }
}

function drawSignalSegment(x1, x2, currentState, nextState, signalIndex) {
  let y = timelineY + 40 + signalIndex * signalSpacing;
  let highY = y - signalHeight/2;
  let lowY = y + signalHeight/2;

  // Draw current level
  let currentY = currentState ? highY : lowY;
  line(x1, currentY, x2, currentY);

  // Draw vertical transition if state changes
  if (currentState !== nextState) {
    line(x2, highY, x2, lowY);
  }
}

function drawOutputBits() {
  textAlign(LEFT, CENTER);
  for (let i = 0; i < 8; i++) {
    let y = centerY - (3.5 * 30) + i * 30;
    fill(outputRegister[i] ? 'red' : 'white');
    stroke('black');
    circle(rightPinXEnd + 65, y, 10);
  }
}

function doNextClock() {
  clock = true;
  if (clock) {
    shiftInBit(dataIn);
  }
  updateTimeline();
  
  setTimeout(() => {
    clock = false;
    updateTimeline();
  }, 100);
}

function shiftInBit(bitValue) {
  for (let i = shiftRegister.length - 1; i > 0; i--) {
    shiftRegister[i] = shiftRegister[i-1];
  }
  shiftRegister[0] = bitValue;
}

function doLatch() {
  latch = true;
  outputRegister = shiftRegister.slice();
  updateTimeline();
  
  setTimeout(() => {
    latch = false;
    updateTimeline();
  }, 150);
}

function updateTimeline() {
  timeStep++;
  let newState = {
    timeStep: timeStep,
    dataIn: dataIn,
    clock: clock,
    latch: latch,
    outputs: outputRegister.slice()
  };
  timeline.push(newState);

  while (timeline.length > maxTimelineSteps) {
    timeline.shift();
  }
}

function doReset() {
  // Internal signals
  // console.log('Reset');

  shiftRegister = [false, false, false, false, false, false, false, false];
  outputRegister = [false, false, false, false, false, false, false, false];
  timeline = [];
  timeStep = 0;
  updateTimeline();
  drawLogicAnalyzer();
}