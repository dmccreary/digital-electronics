---
title: Single Logic Gate MicroSim
description: Interactive simulation displaying one digital logic gate at a time with dropdown selection for AND, OR, NOT, NAND, NOR, XOR, XNOR, and Buffer gates.
image: /sims/single-logic-gate/single-logic-gate.png
og:image: /sims/single-logic-gate/single-logic-gate.png
quality_score: 85
---

# Single Logic Gate MicroSim

<iframe src="main.html" width="100%" height="460px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/digital-electronics/sims/single-logic-gate/main.html" width="100%" height="500px" scrolling="no"></iframe>
```

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }
[Edit in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/){ .md-button }

## Description

This interactive simulation allows you to focus on one digital logic gate at a time. Use the dropdown menu to select from eight common gate types and see its standard IEEE symbol rendered in the display area.

### Key Features

- Single gate display for focused learning
- Dropdown selector with all common gate types
- Large, clear gate symbols for easy identification
- Standard IEEE gate notation
- Canvas-based controls for reliable embedding

### How to Use

1. Click the "Gate Type" dropdown in the control area
2. Select any gate from the list: Buffer, Inverter, AND, NAND, OR, NOR, XOR, or XNOR
3. The selected gate symbol is displayed prominently in the center
4. Study the gate shape to memorize its symbol for circuit diagrams

### Logic Gate Types

| Gate | Function | Symbol Feature |
|------|----------|----------------|
| Buffer | Output equals input | Triangle |
| Inverter | Inverts the input | Triangle with bubble |
| AND | Output is 1 only when ALL inputs are 1 | Flat back, curved front |
| NAND | Inverted AND output | AND with bubble |
| OR | Output is 1 when ANY input is 1 | Curved back, pointed front |
| NOR | Inverted OR output | OR with bubble |
| XOR | Output is 1 when inputs DIFFER | OR with extra curved line |
| XNOR | Output is 1 when inputs are SAME | XOR with bubble |

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Identify and draw the standard IEEE symbol for each logic gate type
- Distinguish between basic gates (AND, OR, NOT) and derived gates (NAND, NOR, XOR, XNOR)
- Explain the function of the "bubble" symbol on inverted gates
- Recognize gates by their distinctive shapes in circuit diagrams

### Target Audience

- High school electronics and computer science students
- College students in introductory digital logic courses
- Prerequisites: Understanding of binary numbers (0 and 1)

### Activities

1. **Symbol Recognition**: Cycle through each gate and sketch its symbol from memory

2. **Shape Association**: Create mnemonics linking gate shapes to their functions (e.g., AND has a "D" shape for "all inputs Determined")

3. **Flash Card Practice**: Use the dropdown to quiz yourself on identifying gates

### Assessment

- Draw the symbol for each of the eight logic gates from memory
- Given a gate symbol, identify the gate type and describe its function
- Explain what the bubble at a gate output indicates

## References

- [Wikipedia: Logic Gate](https://en.wikipedia.org/wiki/Logic_gate) - Overview of logic gate types and applications
- [All About Circuits: Logic Gates](https://www.allaboutcircuits.com/textbook/digital/chpt-3/logic-gate-introduction/) - Comprehensive tutorial on digital logic gates
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this simulation
- [IEEE Std 91-1984](https://standards.ieee.org/standard/91-1984.html) - Standard for logic gate symbols
