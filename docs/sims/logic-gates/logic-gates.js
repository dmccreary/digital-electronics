// Logic Gates Library Test Program
// Canvas-based sliders for size, fill color, stroke color and stroke weight

let canvasWidth = 400;
let drawHeight = 200;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let sliderLeftMargin = 130;
let sliderWidth;
let lm = 40; // left margin
let tm = 20; // top margin
let hspace = 90; // horizontal spacing between gates
let vspace = 85; // vertical spacing between gates

// Slider values
let sizeValue = 40;
let colorValue = 130;
let strokeColorValue = 150;
let strokeWeightValue = 1;

// Slider parameters
let sliderY = [10, 35, 60, 85]; // Y offsets from drawHeight
let sliderHeight = 20;
let activeSlider = -1; // Which slider is being dragged

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    colorMode(HSB, 255);
    textSize(16);
    sliderWidth = canvasWidth - sliderLeftMargin - 20;
}

function updateCanvasSize() {
    const container = document.querySelector('main')?.parentElement;
    if (container) {
        canvasWidth = Math.min(container.offsetWidth - 20, 450);
        sliderWidth = canvasWidth - sliderLeftMargin - 20;
    }
}

function draw() {
    // Make the background drawing region light gray
    fill('ghostwhite');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);

    // Make the background of the controls white
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Set gate drawing style
    fill(colorValue, 255, 255, 255);
    stroke(strokeColorValue, 255, 255, 255);
    strokeWeight(strokeWeightValue);

    // Draw all gates
    drawBuffer(lm, tm, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('Buffer', lm, tm, sizeValue, sizeValue);

    drawInverter(lm + hspace, tm, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('Inverter', lm + hspace, tm, sizeValue, sizeValue);

    drawAND(lm + hspace * 2, tm, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('AND', lm + hspace * 2, tm, sizeValue, sizeValue);

    drawNAND(lm + hspace * 3, tm, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('NAND', lm + hspace * 3, tm, sizeValue, sizeValue);

    drawOR(lm, tm + vspace, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('OR', lm, tm + vspace, sizeValue, sizeValue);

    drawNOR(lm + hspace, tm + vspace, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('NOR', lm + hspace, tm + vspace, sizeValue, sizeValue);

    drawXOR(lm + hspace * 2, tm + vspace, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('XOR', lm + hspace * 2, tm + vspace, sizeValue, sizeValue);

    drawXNOR(lm + hspace * 3, tm + vspace, sizeValue, sizeValue, sizeValue / 2);
    drawLabel('XNOR', lm + hspace * 3, tm + vspace, sizeValue, sizeValue);

    // Draw sliders
    drawSliders();
}

function drawSliders() {
    // Slider 1: Size (0-60)
    drawSlider(0, "Size:", sizeValue, 0, 60);

    // Slider 2: Fill Color (0-255)
    drawSlider(1, "Fill Color:", colorValue, 0, 255);

    // Slider 3: Stroke Color (0-255)
    drawSlider(2, "Stroke Color:", strokeColorValue, 0, 255);

    // Slider 4: Stroke Weight (0-5)
    drawSlider(3, "Stroke Weight:", strokeWeightValue.toFixed(1), 0, 5);
}

function drawSlider(index, label, value, minVal, maxVal) {
    let y = drawHeight + sliderY[index];

    // Label
    fill('black');
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(14);
    text(label + " " + (typeof value === 'number' ? Math.round(value) : value), sliderLeftMargin - 10, y + sliderHeight / 2);

    // Track
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(sliderLeftMargin, y, sliderWidth, sliderHeight, 5);

    // Filled portion
    let fillWidth = map(parseFloat(value), minVal, maxVal, 0, sliderWidth);
    fill('steelblue');
    noStroke();
    rect(sliderLeftMargin, y, fillWidth, sliderHeight, 5, 0, 0, 5);

    // Handle
    fill('white');
    stroke('steelblue');
    strokeWeight(2);
    let handleX = sliderLeftMargin + fillWidth;
    ellipse(handleX, y + sliderHeight / 2, sliderHeight + 4, sliderHeight + 4);
}

function mousePressed() {
    // Check which slider was clicked
    for (let i = 0; i < 4; i++) {
        let y = drawHeight + sliderY[i];
        if (mouseX >= sliderLeftMargin && mouseX <= sliderLeftMargin + sliderWidth &&
            mouseY >= y && mouseY <= y + sliderHeight) {
            activeSlider = i;
            updateSliderValue();
            return;
        }
    }
}

function mouseDragged() {
    if (activeSlider >= 0) {
        updateSliderValue();
    }
}

function mouseReleased() {
    activeSlider = -1;
}

function updateSliderValue() {
    let x = constrain(mouseX, sliderLeftMargin, sliderLeftMargin + sliderWidth);
    let percent = (x - sliderLeftMargin) / sliderWidth;

    switch (activeSlider) {
        case 0: // Size
            sizeValue = map(percent, 0, 1, 0, 60);
            break;
        case 1: // Fill Color
            colorValue = map(percent, 0, 1, 0, 255);
            break;
        case 2: // Stroke Color
            strokeColorValue = map(percent, 0, 1, 0, 255);
            break;
        case 3: // Stroke Weight
            strokeWeightValue = map(percent, 0, 1, 0, 5);
            break;
    }
}

// Draw black text without losing the drawing context
// Place the label under the logic gate
function drawLabel(textStr, x, y, w, h) {
    push();
    fill('black');
    noStroke();
    textAlign(CENTER);
    textSize(12);
    text(textStr, x + w / 2, y + h + 20);
    pop();
}
