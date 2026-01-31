// Binary Place Value Visualizer
// Educational MicroSim for understanding positional notation in binary
// Students toggle bits and see the decimal value update immediately
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 16;

// Bit array (8 bits, index 0 = LSB)
let bits = [0, 0, 0, 0, 0, 0, 0, 0];

// Bit toggle button dimensions
let bitButtonSize = 60;
let bitButtonSpacing = 10;
let bitButtonY = 80;

// Power of 2 values for each position
const powers = [1, 2, 4, 8, 16, 32, 64, 128];

// Control buttons
let clearButton, randomButton, challengeButton;

// Challenge mode
let challengeMode = false;
let targetValue = 0;
let challengeMessage = "";

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Create control buttons
    clearButton = createButton('Clear All');
    clearButton.position(10, drawHeight + 10);
    clearButton.mousePressed(clearAllBits);

    randomButton = createButton('Random');
    randomButton.position(90, drawHeight + 10);
    randomButton.mousePressed(randomBits);

    challengeButton = createButton('Challenge');
    challengeButton.position(165, drawHeight + 10);
    challengeButton.mousePressed(startChallenge);

    describe('Binary place value visualizer with 8 toggleable bits showing decimal conversion', LABEL);
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
    text('Binary Place Value Visualizer', canvasWidth / 2, 15);

    // Calculate bit button positions (centered)
    let totalWidth = 8 * bitButtonSize + 7 * bitButtonSpacing;
    let startX = (canvasWidth - totalWidth) / 2;

    // Draw bit toggle buttons (MSB on left, LSB on right)
    textSize(32);
    for (let i = 7; i >= 0; i--) {
        let displayIndex = 7 - i; // For display positioning
        let x = startX + displayIndex * (bitButtonSize + bitButtonSpacing);
        let y = bitButtonY;

        // Button background - blue if 1, gray if 0
        if (bits[i] === 1) {
            fill(66, 135, 245); // Bright blue for active
            stroke(33, 100, 200);
        } else {
            fill(200, 200, 200); // Gray for inactive
            stroke(150, 150, 150);
        }
        strokeWeight(2);
        rect(x, y, bitButtonSize, bitButtonSize, 8);

        // Bit value text
        fill(bits[i] === 1 ? 'white' : 'black');
        noStroke();
        textAlign(CENTER, CENTER);
        text(bits[i], x + bitButtonSize / 2, y + bitButtonSize / 2);
    }

    // Draw power of 2 labels below each bit
    textSize(14);
    fill('black');
    textAlign(CENTER, TOP);
    for (let i = 7; i >= 0; i--) {
        let displayIndex = 7 - i;
        let x = startX + displayIndex * (bitButtonSize + bitButtonSpacing) + bitButtonSize / 2;
        let y = bitButtonY + bitButtonSize + 8;
        text('2^' + i, x, y);
        // Also show the decimal value
        textSize(12);
        fill(100);
        text('(' + powers[i] + ')', x, y + 18);
        textSize(14);
        fill('black');
    }

    // Calculate and display the calculation breakdown
    let decimalValue = calculateDecimal();
    let activeTerms = getActiveTerms();

    // Calculation line
    textSize(18);
    textAlign(CENTER, TOP);
    fill('black');
    noStroke();

    let calcY = bitButtonY + bitButtonSize + 60;

    if (activeTerms.length > 0) {
        let calcText = activeTerms.join(' + ') + ' = ' + decimalValue;
        text(calcText, canvasWidth / 2, calcY);
    } else {
        text('0 = 0', canvasWidth / 2, calcY);
    }

    // Large decimal result
    textSize(48);
    fill(66, 135, 245);
    textAlign(CENTER, TOP);
    text(decimalValue, canvasWidth / 2, calcY + 40);

    // Binary representation label
    textSize(14);
    fill(100);
    text('Decimal Value', canvasWidth / 2, calcY + 95);

    // Challenge mode display
    if (challengeMode) {
        textSize(18);
        if (decimalValue === targetValue) {
            fill(0, 150, 0);
            challengeMessage = "Correct! Target: " + targetValue;
        } else {
            fill(200, 100, 0);
            challengeMessage = "Target: " + targetValue + " (Try again!)";
        }
        textAlign(CENTER, TOP);
        text(challengeMessage, canvasWidth / 2, calcY + 115);
    }

    // Binary string display at top
    textSize(16);
    fill(80);
    textAlign(CENTER, TOP);
    let binaryStr = bits.slice().reverse().join('');
    text('Binary: ' + binaryStr + '₂', canvasWidth / 2, 50);
}

function calculateDecimal() {
    let sum = 0;
    for (let i = 0; i < 8; i++) {
        sum += bits[i] * powers[i];
    }
    return sum;
}

function getActiveTerms() {
    let terms = [];
    // Start from MSB for display
    for (let i = 7; i >= 0; i--) {
        if (bits[i] === 1) {
            terms.push(powers[i].toString());
        }
    }
    return terms;
}

function mousePressed() {
    // Check if click is on any bit button
    let totalWidth = 8 * bitButtonSize + 7 * bitButtonSpacing;
    let startX = (canvasWidth - totalWidth) / 2;

    for (let i = 7; i >= 0; i--) {
        let displayIndex = 7 - i;
        let x = startX + displayIndex * (bitButtonSize + bitButtonSpacing);
        let y = bitButtonY;

        if (mouseX >= x && mouseX <= x + bitButtonSize &&
            mouseY >= y && mouseY <= y + bitButtonSize) {
            // Toggle the bit
            bits[i] = bits[i] === 0 ? 1 : 0;
            break;
        }
    }
}

function clearAllBits() {
    for (let i = 0; i < 8; i++) {
        bits[i] = 0;
    }
    challengeMode = false;
}

function randomBits() {
    for (let i = 0; i < 8; i++) {
        bits[i] = random() > 0.5 ? 1 : 0;
    }
    challengeMode = false;
}

function startChallenge() {
    // Clear bits first
    for (let i = 0; i < 8; i++) {
        bits[i] = 0;
    }
    // Generate a random target (1-255)
    targetValue = floor(random(1, 256));
    challengeMode = true;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
