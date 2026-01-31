// Decimal to Binary Conversion Stepper
// Educational MicroSim for learning the repeated division algorithm
// Students step through the division process to convert decimal to binary
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 490;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 16;

// Conversion state
let decimalInput = 107; // Default starting value
let inputString = "107";
let isInputActive = false;
let steps = []; // Array of {dividend, quotient, remainder}
let currentStep = 0;
let binaryResult = "";
let isComplete = false;

// Button areas (canvas-based controls)
let stepButton = { x: 160, y: 0, w: 50, h: 30 };
let completeButton = { x: 215, y: 0, w: 65, h: 30 };
let randomButton = { x: 285, y: 0, w: 60, h: 30 };
let resetButton = { x: 350, y: 0, w: 50, h: 30 };
let inputBox = { x: 100, y: 0, w: 80, h: 30 };

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Initialize the conversion
    initializeConversion();

    describe('Decimal to binary conversion stepper showing repeated division algorithm step by step', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing region background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control region background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Decimal to Binary Conversion', canvasWidth / 2, 15);
    textSize(16);
    fill(100);
    text('Using Repeated Division by 2', canvasWidth / 2, 45);

    // Draw input section
    drawInputSection();

    // Draw the division steps
    drawDivisionSteps();

    // Draw the binary result
    drawBinaryResult();

    // Draw control buttons
    drawControls();
}

function drawInputSection() {
    let startY = 80;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(18);
    text('Decimal Value:', 30, startY + 15);

    // Draw input box
    stroke(isInputActive ? 'blue' : 'gray');
    strokeWeight(2);
    fill('white');
    rect(160, startY, 80, 30, 5);

    // Draw input text
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(inputString + (isInputActive ? '|' : ''), 200, startY + 15);

    // Store input box position for click detection
    inputBox.x = 160;
    inputBox.y = startY;
}

function drawDivisionSteps() {
    let startX = 50;
    let startY = 130;
    let rowHeight = 32;

    // Header
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text('Division', startX, startY);
    text('Quotient', startX + 180, startY);
    text('Remainder', startX + 290, startY);

    // Draw separator line
    stroke(150);
    strokeWeight(1);
    line(startX, startY + 22, startX + 380, startY + 22);

    // Draw each step
    for (let i = 0; i < steps.length && i <= currentStep; i++) {
        let step = steps[i];
        let y = startY + 30 + i * rowHeight;

        // Highlight current step
        if (i === currentStep && !isComplete) {
            fill(230, 240, 255);
            noStroke();
            rect(startX - 5, y - 5, 390, rowHeight, 5);
        }

        fill('black');
        noStroke();
        textAlign(LEFT, TOP);
        textSize(18);

        // Division expression
        text(step.dividend + ' \u00F7 2 =', startX, y);

        // Quotient
        text(step.quotient, startX + 200, y);

        // Remainder (highlighted)
        if (i <= currentStep) {
            // Draw remainder with colored background
            let remX = startX + 310;
            fill(step.remainder === 1 ? '#4287f5' : '#cccccc');
            noStroke();
            rect(remX - 5, y - 2, 30, 26, 5);

            fill(step.remainder === 1 ? 'white' : 'black');
            textAlign(CENTER, TOP);
            text(step.remainder, remX + 10, y);
        }
    }

    // Show arrow indicating read direction
    if (steps.length > 0 && currentStep >= 0) {
        let arrowX = startX + 370;
        let arrowStartY = startY + 30 + Math.min(currentStep, steps.length - 1) * rowHeight;
        let arrowEndY = startY + 30;

        if (currentStep > 0 || isComplete) {
            stroke('#4287f5');
            strokeWeight(2);
            // Draw arrow pointing up
            line(arrowX, arrowStartY + 10, arrowX, arrowEndY);
            line(arrowX - 8, arrowEndY + 10, arrowX, arrowEndY);
            line(arrowX + 8, arrowEndY + 10, arrowX, arrowEndY);

            // Label
            fill('#4287f5');
            noStroke();
            textSize(12);
            textAlign(CENTER, CENTER);
            push();
            translate(arrowX + 20, (arrowStartY + arrowEndY) / 2);
            rotate(-HALF_PI);
            text('Read up', 0, 0);
            pop();
        }
    }
}

function drawBinaryResult() {
    let y = 430;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(18);
    text('Binary Result:', 30, y);

    // Build current binary string from completed steps
    let currentBinary = "";
    for (let i = Math.min(currentStep, steps.length - 1); i >= 0; i--) {
        if (i <= currentStep && steps[i]) {
            currentBinary += steps[i].remainder;
        }
    }

    if (currentBinary === "") {
        currentBinary = "...";
    }

    // Draw binary digits with boxes
    let digitX = 160;
    textSize(24);

    for (let i = 0; i < currentBinary.length; i++) {
        let digit = currentBinary[i];
        if (digit === '.') {
            fill(150);
            noStroke();
            text('...', digitX, y);
            break;
        }

        // Draw box
        fill(digit === '1' ? '#4287f5' : '#dddddd');
        stroke(digit === '1' ? '#2a5db0' : '#aaaaaa');
        strokeWeight(2);
        rect(digitX, y - 18, 32, 36, 5);

        // Draw digit
        fill(digit === '1' ? 'white' : 'black');
        noStroke();
        textAlign(CENTER, CENTER);
        text(digit, digitX + 16, y);

        digitX += 38;
    }

    // Show subscript 2 and decimal equivalent when complete
    if (isComplete) {
        textSize(14);
        fill(100);
        noStroke();
        textAlign(LEFT, CENTER);
        text('\u2082', digitX + 5, y + 8);

        textSize(18);
        fill('green');
        text('= ' + decimalInput + '\u2081\u2080', digitX + 25, y);

        // Verification message
        textSize(14);
        fill(0, 150, 0);
        textAlign(CENTER, CENTER);
        text('\u2713 Verified!', canvasWidth / 2, y + 35);
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // Update button y positions
    stepButton.y = y;
    completeButton.y = y;
    randomButton.y = y;
    resetButton.y = y;

    // Input label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Enter 0-255:', 10, y + 15);

    // Step button
    drawButton(stepButton, 'Step', !isComplete && currentStep < steps.length - 1);

    // Complete button
    drawButton(completeButton, 'Done', !isComplete);

    // Random button
    drawButton(randomButton, 'Random', true);

    // Reset button
    drawButton(resetButton, 'Reset', true);
}

function drawButton(btn, label, enabled) {
    if (enabled) {
        fill(240);
        stroke(100);
    } else {
        fill(220);
        stroke(180);
    }
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 5);

    fill(enabled ? 'black' : 150);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function initializeConversion() {
    steps = [];
    currentStep = -1;
    isComplete = false;
    binaryResult = "";

    // Calculate all steps
    let value = decimalInput;
    if (value === 0) {
        steps.push({ dividend: 0, quotient: 0, remainder: 0 });
    } else {
        while (value > 0) {
            let quotient = Math.floor(value / 2);
            let remainder = value % 2;
            steps.push({ dividend: value, quotient: quotient, remainder: remainder });
            value = quotient;
        }
    }
}

function mousePressed() {
    // Check input box click
    if (isInside(mouseX, mouseY, inputBox)) {
        isInputActive = true;
        return;
    } else {
        isInputActive = false;
    }

    // Check Step button
    if (isInside(mouseX, mouseY, stepButton)) {
        if (!isComplete && currentStep < steps.length - 1) {
            currentStep++;
            if (currentStep >= steps.length - 1) {
                isComplete = true;
            }
        }
        return;
    }

    // Check Complete button
    if (isInside(mouseX, mouseY, completeButton)) {
        if (!isComplete) {
            currentStep = steps.length - 1;
            isComplete = true;
        }
        return;
    }

    // Check Random button
    if (isInside(mouseX, mouseY, randomButton)) {
        decimalInput = Math.floor(Math.random() * 256);
        inputString = decimalInput.toString();
        initializeConversion();
        return;
    }

    // Check Reset button
    if (isInside(mouseX, mouseY, resetButton)) {
        initializeConversion();
        return;
    }
}

function isInside(mx, my, btn) {
    return mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h;
}

function keyPressed() {
    if (!isInputActive) return;

    if (keyCode === BACKSPACE) {
        if (inputString.length > 0) {
            inputString = inputString.slice(0, -1);
        }
        return false;
    }

    if (keyCode === ENTER || keyCode === RETURN) {
        isInputActive = false;
        let value = parseInt(inputString);
        if (!isNaN(value) && value >= 0 && value <= 255) {
            decimalInput = value;
            initializeConversion();
        } else {
            inputString = decimalInput.toString();
        }
        return false;
    }

    return true;
}

function keyTyped() {
    if (!isInputActive) return true;

    // Only allow digits
    if (key >= '0' && key <= '9') {
        if (inputString.length < 3) {
            let testValue = parseInt(inputString + key);
            if (testValue <= 255) {
                inputString += key;
            }
        }
    }

    return false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
