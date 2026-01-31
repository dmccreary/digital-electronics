---
title: Decimal to Binary Conversion Stepper
description: Interactive step-through simulation of the repeated division algorithm for converting decimal numbers to binary.
image: /sims/decimal-to-binary-stepper/decimal-to-binary-stepper.png
og:image: /sims/decimal-to-binary-stepper/decimal-to-binary-stepper.png
quality_score: 90
---

# Decimal to Binary Conversion Stepper

<iframe src="main.html" width="100%" height="542px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/digital-electronics/sims/decimal-to-binary-stepper/main.html" width="100%" height="542px" scrolling="no"></iframe>
```

[Run in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

This interactive MicroSim teaches the repeated division algorithm for converting decimal numbers to binary. Students can step through each division operation, observing how remainders accumulate to form the binary representation.

### The Algorithm

The repeated division method works as follows:

1. Divide the decimal number by 2
2. Record the remainder (0 or 1)
3. Use the quotient as the new dividend
4. Repeat until the quotient is 0
5. Read the remainders from bottom to top

### Key Features

- **Step-by-step progression**: Click "Step" to advance one division at a time
- **Visual remainder tracking**: Each remainder is highlighted as it's computed
- **Binary result building**: Watch the binary number grow from right to left
- **Input flexibility**: Enter any decimal value from 0-255
- **Verification**: Final result shows decimal equivalent for confirmation

### How to Use

1. **Enter a value**: Click the input field and type a decimal number (0-255)
2. **Press Enter** to start with your new value
3. **Click Step**: Advance through one division at a time
4. **Predict**: Before each step, try to predict the quotient and remainder
5. **Click Complete**: Skip to see the full solution
6. **Click Reset**: Start over with the current value

### Understanding the Display

| Column | Meaning |
|--------|---------|
| Division | The current dividend divided by 2 |
| Quotient | Result of integer division (next dividend) |
| Remainder | The bit value for this position (0 or 1) |

The arrow on the right reminds you to read remainders from bottom to top to form the binary number.

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

- **Apply** the repeated division algorithm to convert any decimal number (0-255) to binary
- **Explain** why each remainder represents a specific bit position
- **Predict** quotients and remainders before seeing them
- **Verify** conversions by checking the binary result

### Bloom's Taxonomy Level

**Apply (L3)** - Students execute the algorithm step-by-step, practicing the mechanical process while building understanding.

### Target Audience

- High school students learning binary number systems
- College freshmen/sophomores in digital electronics or computer science
- Prerequisites: Understanding of division with remainders, familiarity with binary place values

### Activities

1. **Exploration (5 min)**:
   - Convert 10 to binary using the stepper
   - Note the pattern of remainders

2. **Guided Practice (10 min)**:
   - Convert 42 to binary, predicting each step before clicking
   - Verify: \(42 = 32 + 8 + 2 = 2^5 + 2^3 + 2^1 = 101010_2\)

3. **Pattern Recognition (5 min)**:
   - Convert powers of 2 (2, 4, 8, 16, 32...)
   - What do you notice about the binary representations?

4. **Challenge Problems (10 min)**:
   - Convert 255 (maximum 8-bit value)
   - Convert 128 (minimum 8-bit value with MSB=1)
   - Convert 170 (alternating pattern)

### Assessment

- Given a decimal number, perform the conversion without the simulator
- Explain why odd numbers always have a 1 in the rightmost position
- Describe what determines how many bits are needed for a conversion

## Technical Details

### Implementation

- Built with p5.js for responsive canvas rendering
- Canvas-based controls (no DOM elements) for reliable iframe embedding
- Width-responsive design adapts to container size

### Canvas Layout

- **Input section**: Decimal value entry with editable field
- **Division table**: Step-by-step breakdown showing division, quotient, remainder
- **Binary result**: Growing binary number with highlighted digits
- **Control area**: Step, Complete, and Reset buttons

## Why This Algorithm Works

Each division by 2 essentially "peels off" one bit of the binary representation:

- The **remainder** tells you whether that bit position is 0 or 1
- The **quotient** contains the remaining higher-order bits
- The first remainder is the LSB (rightmost bit)
- The last remainder is the MSB (leftmost bit)

This is why we read remainders bottom-to-top: we compute the LSB first but need to write the MSB first.

## References

- [Wikipedia: Binary Number](https://en.wikipedia.org/wiki/Binary_number) - Overview of binary number system
- [Khan Academy: Converting decimal to binary](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information/xcae6f4a7ff015e7d:binary-numbers/a/decimal-to-binary) - Tutorial on conversion methods
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library
