/*  SR Flip Flop MicroSim
 A Set/Reset flip flop simulator, also called a latch,
 uses two NAND gates to create a primitive 1-bit memory
 cell.  It has two buttons, one for setting the output (Q)
 to be positive and a Reset button to change the output
 to be low.
 
 Compare with: https://www.falstad.com/circuit/e-nandff.html
 
 TODO: make the cross wires have state
*/
let canvasWidth = 350;
let canvasHeight = 300;
let setButton, resetButton;
let isSet = false;
let leftMargin = 20;
let topMargin = 50;
let wc1 = 110; // wire column 1
let wc2 = 250; // wire column 1
let wr1 = 100; // wire row 1
let wr2 =200; // wire row 2

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(16);
  
  setButton = createButton('Set');
  setButton.position(leftMargin, topMargin+10);
  setButton.mousePressed(() => isSet = true);
  
  resetButton = createButton('Reset');
  resetButton.position(leftMargin, wr2+30);
  resetButton.mousePressed(() => isSet = false);
}

function draw() {
  background(240);
  
  // Draw flip-flop
  fill('black');
  noStroke();
  text('Q', wc2+50, wr1-30);
  text('Q̅', wc2+50, wr2+20);
  
  // Cross wires
  stroke('black');
  
  // little verticles on right
  line(wc2, 80, wc2, 100);
  line(wc2, wr2, wc2, wr2+30); 
  
  // cross
  
  // Draw NAND Gates
  fill('white');
  // drawNAND(x, y, w, h, l);
  w = 70; // width of NAND gates
  h = 60; // height of NAND gates
  l = 30; // wire lengths
  drawNAND(wc1+30, topMargin, w, h, l);
  drawNAND(wc1+30, wr2, w, h, l);
  
  strokeWeight(2);
  // set wire
  drawWire(leftMargin+40, topMargin+20, wc1+30, topMargin+20, isSet ? color(0, 255, 0) : color(255, 0, 0));
  drawWire(wc2-20, topMargin+30, wc2+60, topMargin+30, isSet ? color(0, 255, 0) : color(255, 0, 0));
  
  // reset wire
  drawWire(leftMargin+50, wr2+40, wc1+30, wr2+40, isSet ? color(255, 0, 0) : color(0, 255, 0));
  drawWire(wc2-20, wr2+30, wc2+60, wr2+30, isSet ? color(255, 0, 0) : color(0, 255, 0));
  
  drawWire(400, 100, 400, 300, color(255));
  
  // draw the cross
  // upper left down to right
  drawWire(wc1, 90, wc1, 100, isSet ? color(255, 0, 0) : color(0, 255, 0));
  drawWire(wc1, wr1, wc2, wr2, isSet ? color(255, 0, 0) : color(0, 255, 0));
  drawWire(wc2, wr2, wc2, wr2+30, isSet ? color(255, 0, 0) : color(0, 255, 0));
  
  // lower left up to right
  drawWire(wc1, wr2, wc1, wr2+20, isSet ? color(0,255, 0) : color(255, 0, 0));
  drawWire(wc1, wr2, wc2, wr1, isSet ? color(0,255, 0) : color(255, 0, 0));
  drawWire(wc2, 80, wc2, 100, isSet ? color(0,255, 0) : color(255, 0, 0));
  
  
}

function drawWire(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(4);
  line(x1, y1, x2, y2);
}

// Add this function to change wire colors when buttons are pressed
function mousePressed() {
  if (mouseX > 50 && mouseX < 100 && mouseY > 50 && mouseY < 70) {
    isSet = true;
  } else if (mouseX > 50 && mouseX < 100 && mouseY > 350 && mouseY < 370) {
    isSet = false;
  }
}

