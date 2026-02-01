// Single Logic Gate MicroSim
// Displays one gate at a time with dropdown selection
// Uses canvas-based controls (no DOM elements)

let canvasWidth = 400;
let drawHeight = 280;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Gate types
const gateTypes = ['Buffer', 'Inverter', 'AND', 'NAND', 'OR', 'NOR', 'XOR', 'XNOR'];
let selectedGateIndex = 2; // Default to AND gate
let dropdownOpen = false;

// Dropdown dimensions
let dropdownX = 120;
let dropdownY = drawHeight + 25;
let dropdownWidth = 150;
let dropdownHeight = 30;
let optionHeight = 28;

// Gate drawing parameters
let gateSize = 80;
let wireLength = 40;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(16);
}

function updateCanvasSize() {
    const container = document.querySelector('main')?.parentElement;
    if (container) {
        canvasWidth = Math.min(container.offsetWidth - 20, 500);
    }
}

function draw() {
    // Drawing region background
    fill('ghostwhite');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control region background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw the selected gate centered
    let gateX = canvasWidth / 2 - gateSize / 2;
    let gateY = drawHeight / 2 - gateSize / 2 - 20;

    // Gate styling
    fill(130, 200, 255); // Light blue fill
    stroke(50, 100, 150);
    strokeWeight(2);

    drawSelectedGate(gateX, gateY, gateSize, gateSize, wireLength);

    // Draw gate name label
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text(gateTypes[selectedGateIndex], canvasWidth / 2, gateY + gateSize + 30);

    // Draw dropdown control
    drawDropdown();
}

function drawSelectedGate(x, y, w, h, l) {
    switch(selectedGateIndex) {
        case 0: drawBuffer(x, y, w, h, l); break;
        case 1: drawInverter(x, y, w, h, l); break;
        case 2: drawAND(x, y, w, h, l); break;
        case 3: drawNAND(x, y, w, h, l); break;
        case 4: drawOR(x, y, w, h, l); break;
        case 5: drawNOR(x, y, w, h, l); break;
        case 6: drawXOR(x, y, w, h, l); break;
        case 7: drawXNOR(x, y, w, h, l); break;
    }
}

function drawDropdown() {
    textSize(16);

    // Label
    fill('black');
    noStroke();
    textAlign(RIGHT, CENTER);
    text("Gate Type:", dropdownX - 10, dropdownY + dropdownHeight / 2);

    // Dropdown button
    fill('white');
    stroke('steelblue');
    strokeWeight(2);
    rect(dropdownX, dropdownY, dropdownWidth, dropdownHeight, 5);

    // Selected value text
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text(gateTypes[selectedGateIndex], dropdownX + 10, dropdownY + dropdownHeight / 2);

    // Dropdown arrow
    fill('steelblue');
    noStroke();
    let arrowX = dropdownX + dropdownWidth - 20;
    let arrowY = dropdownY + dropdownHeight / 2;
    if (dropdownOpen) {
        triangle(arrowX - 5, arrowY + 3, arrowX + 5, arrowY + 3, arrowX, arrowY - 5);
    } else {
        triangle(arrowX - 5, arrowY - 3, arrowX + 5, arrowY - 3, arrowX, arrowY + 5);
    }

    // Dropdown options (when open)
    if (dropdownOpen) {
        let optionsY = dropdownY + dropdownHeight;

        // Options background
        fill('white');
        stroke('steelblue');
        strokeWeight(1);
        rect(dropdownX, optionsY, dropdownWidth, gateTypes.length * optionHeight, 0, 0, 5, 5);

        // Draw each option
        for (let i = 0; i < gateTypes.length; i++) {
            let optY = optionsY + i * optionHeight;

            // Highlight on hover
            if (mouseX > dropdownX && mouseX < dropdownX + dropdownWidth &&
                mouseY > optY && mouseY < optY + optionHeight) {
                fill('aliceblue');
                noStroke();
                rect(dropdownX + 1, optY, dropdownWidth - 2, optionHeight);
            }

            // Option text
            fill(i === selectedGateIndex ? 'steelblue' : 'black');
            noStroke();
            textAlign(LEFT, CENTER);
            text(gateTypes[i], dropdownX + 10, optY + optionHeight / 2);
        }
    }
}

function mousePressed() {
    // Check if clicking on dropdown button
    if (mouseX > dropdownX && mouseX < dropdownX + dropdownWidth &&
        mouseY > dropdownY && mouseY < dropdownY + dropdownHeight) {
        dropdownOpen = !dropdownOpen;
        return;
    }

    // Check if clicking on dropdown options
    if (dropdownOpen) {
        let optionsY = dropdownY + dropdownHeight;
        if (mouseX > dropdownX && mouseX < dropdownX + dropdownWidth &&
            mouseY > optionsY && mouseY < optionsY + gateTypes.length * optionHeight) {
            let clickedIndex = Math.floor((mouseY - optionsY) / optionHeight);
            if (clickedIndex >= 0 && clickedIndex < gateTypes.length) {
                selectedGateIndex = clickedIndex;
            }
            dropdownOpen = false;
            return;
        }
    }

    // Close dropdown if clicking elsewhere
    dropdownOpen = false;
}
