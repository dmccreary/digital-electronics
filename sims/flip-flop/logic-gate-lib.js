/*

Logic Gate Library - mostly generated by GPT-4

All functions have the following input parameters

1. x: position of the upper left corner of the gate (excluding wires)
2. y: position of the upper left corner
3. w: width of the gate excluding wires
4. h: height of the gate excluding wires
5. l: length of both the input and output wires

Note that these drawing are all designed to inherit
the drawing context such as fill, stroke, and strokeWeight.
The key limitation is that the entire drawing can only
use a single context.  You will need to customize this
library if you want to fine tune the drawings.
Note that we use push() and pop() around the circles to keep
the drawing context preserved.

Here are the functions sorted from the simplest to
the most complicated to draw.

drawbuffer(x, y, w, h, l);
drawInverter(x, y, w, h, l);
drawAND(x, y, w, h, l);
drawNAND(x, y, w, h, l);
drawOR(x, y, w, h, l);
drawNOR(x, y, w, h, l);
drawXOR(x, y, w, h, l);
drawXNOR(x, y, w, h, l);
*/
  
function drawBuffer(x, y, w, h, l) {
  // Draw input wire
  line(x - l, y + h / 2, x, y + h / 2);
  // Draw the buffer (triangle)
  triangle(x, y, x, y + h, x + w, y + h / 2);
  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);
}

function drawInverter(x, y, w, h, l) {
  // Draw input wire
  line(x - l, y + h / 2, x, y + h / 2);

  // Draw the buffer (triangle)
  triangle(x, y, x, y + h, x + w, y + h / 2);

  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);

  // Draw small circle at the right tip of the triangle
  push();
  fill('black')
  circle(x + w, y + h / 2, w / 5);
  pop();
}


function drawAND(x, y, w, h, l) {
  // Draw input wires
  line(x - l, y + h / 3, x, y + h / 3);
  line(x - l, y + 2 * h / 3, x, y + 2 * h / 3);

  // Draw the AND gate shape - note the indent to the endShape()
  beginShape();
     vertex(x, y); // top left corner
     vertex(x + w * 0.6, y); // top right corner (start of semicircle)
     // Create semicircle
     for (let angle = -HALF_PI; angle <= HALF_PI; angle += 0.01) {
        let sx = x + w * 0.6 + cos(angle) * w * 0.4;
        let sy = y + h / 2 + sin(angle) * h / 2;
        vertex(sx, sy);
      }
     vertex(x + w * 0.6, y + h); // bottom right corner (end of semicircle)
     vertex(x, y + h); // bottom left corner
  endShape(CLOSE);
  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);
}

function drawNAND(x, y, w, h, l) {
  // Draw input wires
  line(x - l, y + h / 3, x, y + h / 3);
  line(x - l, y + 2 * h / 3, x, y + 2 * h / 3);

  // Draw the NAND gate shape
  beginShape();
      vertex(x, y); // top left corner
      vertex(x + w * 0.6, y); // top right corner (start of semicircle)
      // Create semicircle
      for (let angle = -HALF_PI; angle <= HALF_PI; angle += 0.01) {
      let sx = x + w * 0.6 + cos(angle) * w * 0.4;
      let sy = y + h / 2 + sin(angle) * h / 2;
      vertex(sx, sy);
      }
      vertex(x + w * 0.6, y + h); // bottom right corner (end of semicircle)
      vertex(x, y + h); // bottom left corner
  endShape(CLOSE);
  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);
  // Draw small circle at the right of the gate
  push(); // keep the drawing context
  fill('black')
  circle(x + w + l / 4, y + h / 2, w / 5);
  pop();
}

// the curves were extensively drawn by hand
// GPT-4 could not 
function drawOR(x, y, w, h, l) {
  // Draw input wires
  line(x - l, y + h / 3,     x+w*.18, y + h / 3);
  line(x - l, y + 2 * h / 3, x+w*.18, y + 2 * h / 3);
  
  cs = .4 // upper and lower curve starting point
  // bounding box for testing
  // rect(x, y, w, h);
  
    // Now draw the curves.  
    // We are going in a counter clockwise direction
    // We start with the left, then do the bottom, then the top
    beginShape();
    // Left side concave curve
    for (let angle = -HALF_PI; angle < HALF_PI + 0.1; angle += 0.1) {
      let sx = x + cos(angle) * w * 0.19;
      let sy = y + h / 2 + sin(angle) * h / 2;
      vertex(sx, sy);
    }

    // draw lower convex curve points from left to right
    vertex(x,y+h);
    vertex(x+w*cs,y+h);
    for (let angle = 0; angle <= HALF_PI + .1; angle += 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 + sin(HALF_PI - angle) * h/2;
      vertex(sx, sy);
    }

    // draw upper convex curve from right to left
    for (let angle = HALF_PI; angle > 0 + .2; angle -= 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 - sin(-angle+HALF_PI) * h/2;
      vertex(sx, sy);
    }
    vertex(x+w*cs,y);
    vertex(x, y);
  endShape();
  
  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);
}

function drawNOR(x, y, w, h, l) {
  // Draw the OR part
  drawOR(x, y, w, h, l);

  // Draw the NOT circle at the output
  
  let outputY = y + h / 2;
  let circleRadius = w * 0.20; // 1/5 of the width
  let outputX = x + w + circleRadius / 2;
  push();
  fill('black')
  circle(outputX, outputY, circleRadius);
  pop();
}

function drawXOR(x, y, w, h, l) {
  // Draw input wires
  // Changed for the second arch
  line(x - l, y + h / 3,     x+w*.18, y + h / 3);
  line(x - l, y + 2 * h / 3, x+w*.18, y + 2 * h / 3);
  
  cs = .4 // upper and lower curve starting point
  // bounding box for testing
  // rect(x, y, w, h);
  
    // Now draw the curves.  We are going in a counter clockwise direction
    beginShape();
    // Left side concave curve
    for (let angle = -HALF_PI; angle < HALF_PI + 0.1; angle += 0.1) {
      let sx = x + cos(angle) * w * 0.19;
      let sy = y + h / 2 + sin(angle) * h / 2;
      vertex(sx, sy);
    }

    // draw lower convex curve points from left to right
    vertex(x,y+h);
    vertex(x+w*cs,y+h);
    for (let angle = 0; angle <= HALF_PI + .1; angle += 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 + sin(HALF_PI - angle) * h/2;
      vertex(sx, sy);
    }

    // draw upper convex curve from right to left
    for (let angle = HALF_PI; angle > 0 + .2; angle -= 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 - sin(-angle+HALF_PI) * h/2;
      vertex(sx, sy);
    }
    vertex(x+w*cs,y);
    vertex(x, y);
  endShape();
  
  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);
  
  // Add an extra curve for XOR
  noFill();
  beginShape();
  for (let angle = -HALF_PI; angle < HALF_PI + 0.1; angle += 0.1) {
    let sx = x + cos(angle) * w * 0.15 - w * 0.1;
    let sy = y + h / 2 + sin(angle) * h / 2;
    vertex(sx, sy);
  }
  endShape();
}

function drawXOR(x, y, w, h, l) {
  // Draw input wires
  // Changed for the second arch
  line(x - l, y + h / 3,     x+w*.18, y + h / 3);
  line(x - l, y + 2 * h / 3, x+w*.18, y + 2 * h / 3);
  
  cs = .4 // upper and lower curve starting point
  // bounding box for testing
  // rect(x, y, w, h);
  
    // Now draw the curves.  We are going in a counter clockwise direction
    beginShape();
    // Left side concave curve
    for (let angle = -HALF_PI; angle < HALF_PI + 0.1; angle += 0.1) {
      let sx = x + cos(angle) * w * 0.19;
      let sy = y + h / 2 + sin(angle) * h / 2;
      vertex(sx, sy);
    }

    // draw lower convex curve points from left to right
    vertex(x,y+h);
    vertex(x+w*cs,y+h);
    for (let angle = 0; angle <= HALF_PI + .1; angle += 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 + sin(HALF_PI - angle) * h/2;
      vertex(sx, sy);
    }

    // draw upper convex curve from right to left
    for (let angle = HALF_PI; angle > 0 + .2; angle -= 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 - sin(-angle+HALF_PI) * h/2;
      vertex(sx, sy);
    }
    vertex(x+w*cs,y);
    vertex(x, y);
  endShape();
  
  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);
  
  // Add an extra curve for XOR
  push(); // we need to save the current fill color
  noFill();
  beginShape();
  for (let angle = -HALF_PI; angle < HALF_PI + 0.1; angle += 0.1) {
    let sx = x + cos(angle) * w * 0.15 - w * 0.1;
    let sy = y + h / 2 + sin(angle) * h / 2;
    vertex(sx, sy);
  }
  endShape();
  pop();
}

function drawXNOR(x, y, w, h, l) {
  // Draw input wires
  // Changed for the second arch
  line(x - l, y + h / 3,     x+w*.18, y + h / 3);
  line(x - l, y + 2 * h / 3, x+w*.18, y + 2 * h / 3);
  
  cs = .4 // upper and lower curve starting point
  // bounding box for testing
  // rect(x, y, w, h);
  
    // Now draw the curves.  We are going in a counter clockwise direction
    beginShape();
    // Left side concave curve
    for (let angle = -HALF_PI; angle < HALF_PI + 0.1; angle += 0.1) {
      let sx = x + cos(angle) * w * 0.19;
      let sy = y + h / 2 + sin(angle) * h / 2;
      vertex(sx, sy);
    }

    // draw lower convex curve points from left to right
    vertex(x,y+h);
    vertex(x+w*cs,y+h);
    for (let angle = 0; angle <= HALF_PI + .1; angle += 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 + sin(HALF_PI - angle) * h/2;
      vertex(sx, sy);
    }

    // draw upper convex curve from right to left
    for (let angle = HALF_PI; angle > 0 + .2; angle -= 0.1) {
      let sx = map(angle, 0, HALF_PI, x+w*cs, x+w);
      let sy = y+h/2 - sin(-angle+HALF_PI) * h/2;
      vertex(sx, sy);
    }
    vertex(x+w*cs,y);
    vertex(x, y);
  endShape();
  
  // Draw output wire
  line(x + w, y + h / 2, x + w + l, y + h / 2);
  
  // Add an extra curve for XOR
  push(); // this is so we save the current fill color
  noFill();
  beginShape();
  for (let angle = -HALF_PI; angle < HALF_PI + 0.1; angle += 0.1) {
    let sx = x + cos(angle) * w * 0.15 - w * 0.1;
    let sy = y + h / 2 + sin(angle) * h / 2;
    vertex(sx, sy);
  }
  endShape();
  pop();
  
  // Draw the NOT circle at the output
  let outputX = x + w + l*.1;
  let outputY = y + h / 2;
  let circleRadius = l * 0.4;
  push();
  fill('black')
  circle(outputX, outputY, circleRadius);
  pop();
} 