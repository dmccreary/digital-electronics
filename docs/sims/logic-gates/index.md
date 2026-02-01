---
title: Logic Gates MicroSim
description: Interactive simulation library for drawing and testing digital logic gates including AND, OR, NOT, NAND, NOR, XOR, and XNOR gates.
image: /sims/logic-gates/logic-gates.png
og:image: /sims/logic-gates/logic-gates.png
quality_score: 85
---

# Logic Gates MicroSim

<iframe src="main.html" width="100%" height="350px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/digital-electronics/sims/logic-gates/main.html" width="100%" height="350px" scrolling="no"></iframe>
```

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }
[Edit in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/SpFEWepWj){ .md-button }

## Description

This interactive simulation provides a visual library of digital logic gates, demonstrating how each gate processes binary inputs to produce outputs. The simulation uses p5.js to render high-quality gate symbols following standard IEEE conventions.

### Key Features

- Visual representation of all common logic gate types
- Interactive inputs to test gate behavior
- Real-time output display
- Standard IEEE gate symbols
- Reusable gate drawing library for building complex circuits

### How to Use

1. Click on input nodes to toggle between 0 (LOW) and 1 (HIGH) states
2. Observe how the output changes based on the gate's logic function
3. Experiment with different input combinations to understand each gate's truth table
4. Use the gate library as a foundation for building more complex circuits

### Logic Gate Types

| Gate | Symbol | Function |
|------|--------|----------|
| AND | Flat back, curved front | Output is 1 only when ALL inputs are 1 |
| OR | Curved back, pointed front | Output is 1 when ANY input is 1 |
| NOT | Triangle with bubble | Inverts the input |
| NAND | AND with bubble | Inverted AND output |
| NOR | OR with bubble | Inverted OR output |
| XOR | OR with extra curved line | Output is 1 when inputs DIFFER |
| XNOR | XOR with bubble | Output is 1 when inputs are SAME |

## Goals

Our goal in this simulation is to:

1. Use generative AI to build a library of high-quality logical gate drawings using the p5.js library.
2. Use this library to build a logic simulator that can simulate simple digital logic gates.

[Drawing Gates](./01-drawing-gates.md) - Tutorial on creating gate graphics

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Identify and draw the standard symbols for each logic gate type
- Create truth tables for each logic gate
- Predict the output of a logic gate given any combination of inputs
- Explain the relationship between basic gates (AND, OR, NOT) and derived gates (NAND, NOR, XOR, XNOR)

### Target Audience

- High school electronics and computer science students
- College students in introductory digital logic courses
- Prerequisites: Understanding of binary numbers (0 and 1)

### Activities

1. **Exploration Activity**: Interact with each gate type, testing all possible input combinations and recording results.

2. **Guided Investigation**: Complete the truth table worksheet for each gate, verifying answers with the simulation.

3. **Extension Activity**: Design a simple circuit using multiple gates (e.g., a half-adder) and predict its behavior before testing.

### Assessment

- Draw the symbol for each of the seven logic gates from memory
- Given a truth table, identify which logic gate it represents
- Explain why NAND and NOR gates are called "universal gates"

## References

- [Wikipedia: Logic Gate](https://en.wikipedia.org/wiki/Logic_gate) - Overview of logic gate types and applications
- [All About Circuits: Logic Gates](https://www.allaboutcircuits.com/textbook/digital/chpt-3/logic-gate-introduction/) - Comprehensive tutorial on digital logic gates
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this simulation
- [IEEE Std 91-1984](https://standards.ieee.org/standard/91-1984.html) - Standard for logic gate symbols
