---
title: Binary Place Value Visualizer
description: Interactive simulation for understanding positional notation in binary by toggling bits and observing decimal value changes.
image: /sims/binary-place-value/binary-place-value.png
og:image: /sims/binary-place-value/binary-place-value.png
quality_score: 90
---

# Binary Place Value Visualizer

<iframe src="main.html" width="100%" height="402px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/digital-electronics/sims/binary-place-value/main.html" width="100%" height="402px" scrolling="no"></iframe>
```

[Run in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

This interactive MicroSim helps students understand how binary positional notation works. Each bit position has a specific weight (power of 2), and the decimal value is the sum of all active bit weights.

### Key Features

- 8 toggleable bit buttons (positions 7 through 0)
- Power of 2 labels showing the weight of each position
- Dynamic calculation display showing active terms (e.g., "128 + 32 + 4 = 164")
- Large decimal result display
- Challenge mode for practicing binary-to-decimal conversion

### How to Use

1. **Toggle bits**: Click any bit button to toggle it between 0 and 1
2. **Observe the calculation**: Watch how the calculation line updates to show only active terms
3. **Check the result**: See the decimal equivalent displayed prominently below
4. **Practice with challenges**: Click "Challenge" to get a target decimal number to create

### Controls

| Button | Action |
|--------|--------|
| Bit buttons | Toggle between 0 (gray) and 1 (blue) |
| Clear All | Reset all bits to 0 |
| Random | Generate a random 8-bit number |
| Challenge | Start challenge mode with a target decimal |

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

- **Understand** how positional notation assigns weight to each bit position
- **Apply** binary-to-decimal conversion by summing active bit weights
- **Explain** why the rightmost bit is worth 1 and each position doubles in value
- **Create** specific decimal values by selecting the correct combination of bits

### Bloom's Taxonomy Level

**Understand (L2)** - Students explain and demonstrate how binary positional notation works through interactive exploration.

### Target Audience

- High school students learning binary number systems
- College freshmen/sophomores in digital electronics or computer science
- Prerequisites: Basic understanding of decimal place value

### Activities

1. **Exploration (5 min)**: Toggle bits randomly and observe patterns in the decimal output.

2. **Guided Discovery (10 min)**:
   - Start with all bits off
   - Turn on only the rightmost bit (position 0) - note the value is 1
   - Turn on only position 1 - note the value is 2
   - Continue through all positions, noting the doubling pattern

3. **Pattern Recognition (5 min)**:
   - What's the maximum value with all 8 bits on? (255)
   - What's the minimum value with at least one bit on? (1)
   - How many different values can 8 bits represent? (256)

4. **Challenge Practice (10 min)**: Use Challenge mode to practice converting decimal to binary.

### Assessment

- Given a binary number, calculate the decimal equivalent without the simulator
- Given a decimal number (0-255), determine which bits must be on
- Explain why 8 bits can represent exactly 256 different values

## Technical Details

### Implementation

- Built with p5.js for responsive canvas rendering
- Canvas-based controls (no DOM elements) for reliable iframe embedding
- Width-responsive design adapts to container size

### Canvas Layout

- **Top section**: Binary string display (e.g., "Binary: 10100100₂")
- **Middle section**: 8 bit toggle buttons with power of 2 labels
- **Bottom section**: Calculation breakdown and large decimal result
- **Control area**: Clear All, Random, and Challenge buttons

## References

- [Wikipedia: Binary Number](https://en.wikipedia.org/wiki/Binary_number) - Overview of binary number system
- [Khan Academy: Binary Numbers](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information/xcae6f4a7ff015e7d:binary-numbers/v/binary-numbers) - Video tutorial on binary
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library
