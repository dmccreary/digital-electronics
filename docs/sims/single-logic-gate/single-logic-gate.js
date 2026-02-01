// Single Logic Gate MicroSim
// Displays one gate at a time with dropdown selection
// Uses native p5.js controls (select and sliders)

let canvasWidth = 400;
let drawHeight = 280;
let controlHeight = 175;
let canvasHeight = drawHeight + controlHeight;

// Gate types
const gateTypes = ['Buffer', 'Inverter', 'AND', 'NAND', 'OR', 'NOR', 'XOR', 'XNOR'];
let selectedGateIndex = 2; // Default to AND gate

// UI controls
let gateSelect;
let controlContainer;
let sizeSlider, fillColorSlider, strokeColorSlider, strokeWeightSlider;

// Gate drawing parameters (default values)
let gateSize = 80;
let wireLength = 40;
let fillColorValue = 130;
let strokeColorValue = 150;
let strokeWeightValue = 2;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    // Use HSB color mode for intuitive color selection
    colorMode(HSB, 255);

    // Create a container div for all controls
    controlContainer = createDiv();
    controlContainer.parent(mainElement);
    controlContainer.style('position', 'absolute');
    controlContainer.style('display', 'flex');
    controlContainer.style('flex-direction', 'column');
    controlContainer.style('gap', '8px');
    controlContainer.style('padding', '10px');

    // Row 1: Gate Type selector
    let row1 = createDiv();
    row1.parent(controlContainer);
    row1.style('display', 'flex');
    row1.style('align-items', 'center');
    row1.style('gap', '10px');

    let gateLabel = createSpan('Gate Type:');
    gateLabel.parent(row1);
    styleLabel(gateLabel);

    gateSelect = createSelect();
    gateSelect.parent(row1);
    for (let gate of gateTypes) {
        gateSelect.option(gate);
    }
    gateSelect.selected(gateTypes[selectedGateIndex]);
    gateSelect.changed(onGateSelected);
    styleSelect(gateSelect);

    // Row 2: Size slider
    let row2 = createDiv();
    row2.parent(controlContainer);
    row2.style('display', 'flex');
    row2.style('align-items', 'center');
    row2.style('gap', '10px');

    let sizeLabel = createSpan('Size:');
    sizeLabel.parent(row2);
    styleLabel(sizeLabel);
    sizeLabel.style('width', '100px');

    sizeSlider = createSlider(20, 120, gateSize, 1);
    sizeSlider.parent(row2);
    styleSlider(sizeSlider);

    // Row 3: Fill Color slider
    let row3 = createDiv();
    row3.parent(controlContainer);
    row3.style('display', 'flex');
    row3.style('align-items', 'center');
    row3.style('gap', '10px');

    let fillLabel = createSpan('Fill Color:');
    fillLabel.parent(row3);
    styleLabel(fillLabel);
    fillLabel.style('width', '100px');

    fillColorSlider = createSlider(0, 255, fillColorValue, 1);
    fillColorSlider.parent(row3);
    styleSlider(fillColorSlider);

    // Row 4: Stroke Color slider
    let row4 = createDiv();
    row4.parent(controlContainer);
    row4.style('display', 'flex');
    row4.style('align-items', 'center');
    row4.style('gap', '10px');

    let strokeLabel = createSpan('Border Color:');
    strokeLabel.parent(row4);
    styleLabel(strokeLabel);
    strokeLabel.style('width', '100px');

    strokeColorSlider = createSlider(0, 255, strokeColorValue, 1);
    strokeColorSlider.parent(row4);
    styleSlider(strokeColorSlider);

    // Row 5: Stroke Weight slider
    let row5 = createDiv();
    row5.parent(controlContainer);
    row5.style('display', 'flex');
    row5.style('align-items', 'center');
    row5.style('gap', '10px');

    let weightLabel = createSpan('Border Width:');
    weightLabel.parent(row5);
    styleLabel(weightLabel);
    weightLabel.style('width', '100px');

    strokeWeightSlider = createSlider(0, 5, strokeWeightValue, 0.5);
    strokeWeightSlider.parent(row5);
    styleSlider(strokeWeightSlider);

    // Position the control container
    positionControls();

    textSize(16);
}

function styleLabel(label) {
    label.style('font-size', '14px');
    label.style('font-family', 'sans-serif');
}

function styleSelect(sel) {
    sel.style('font-size', '14px');
    sel.style('padding', '6px 10px');
    sel.style('border', '2px solid steelblue');
    sel.style('border-radius', '5px');
    sel.style('background-color', 'white');
    sel.style('cursor', 'pointer');
}

// The sliders should use the size method to set width
function styleSlider(slider) {
    slider.size(250);
    slider.style('cursor', 'pointer');
}

function positionControls() {
    if (controlContainer) {
        let canvasElement = document.querySelector('main canvas');
        if (canvasElement) {
            let canvasRect = canvasElement.getBoundingClientRect();

            // Position at the top-left of control region
            let leftPos = canvasRect.left + 10;
            let topPos = canvasRect.top + drawHeight + 5;

            controlContainer.style('left', leftPos + 'px');
            controlContainer.style('top', topPos + 'px');
        }
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main')?.parentElement;
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}

function onGateSelected() {
    let selectedGate = gateSelect.value();
    selectedGateIndex = gateTypes.indexOf(selectedGate);
}

function draw() {
    // Read slider values
    gateSize = sizeSlider.value();
    fillColorValue = fillColorSlider.value();
    strokeColorValue = strokeColorSlider.value();
    strokeWeightValue = strokeWeightSlider.value();
    wireLength = gateSize / 2;

    // Drawing region background

    colorMode(RGB);
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control region background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Restore HSB mode for gate drawing
    colorMode(HSB, 255);

    // Draw the selected gate centered
    let gateX = canvasWidth / 2 - gateSize / 2;
    let gateY = drawHeight / 2 - gateSize / 2 - 20;

    // Gate styling using slider values
    fill(fillColorValue, 255, 255);
    stroke(strokeColorValue, 255, 255);
    strokeWeight(strokeWeightValue);

    drawSelectedGate(gateX, gateY, gateSize, gateSize, wireLength);

    // Draw the name of the gate below the gate
    colorMode(RGB);
    fill('black'); // Black in HSB
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text(gateTypes[selectedGateIndex], canvasWidth / 2, gateY + gateSize + wireLength + 10);

    // Reposition controls in case of scroll or resize
    positionControls();
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

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    positionControls();
}
