---
title: Flip Flop MicroSim
description: Interactive simulation demonstrating SR flip-flop behavior using NAND gates, showing how digital memory circuits store binary states.
image: /sims/flip-flop/flip-flop.png
og:image: /sims/flip-flop/flip-flop.png
quality_score: 85
---

# Flip Flop MicroSim

<iframe src="main.html" width="100%" height="450px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/digital-electronics/sims/flip-flop/main.html" width="100%" height="450px" scrolling="no"></iframe>
```

[Run the Flip Flop MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }
[Edit in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/AwlOJNtQd){ .md-button }

## Description

This interactive simulation demonstrates the behavior of an SR (Set-Reset) flip-flop, one of the fundamental building blocks of digital memory. The flip-flop is constructed using NAND gates, showing how simple logic gates can be combined to create circuits that "remember" their state.

### Key Features

- Visual representation of NAND gate connections
- Interactive Set and Reset inputs
- Real-time display of Q and Q' (not Q) outputs
- Animation of signal propagation through the circuit

### How to Use

1. Click the **Set** button to set the flip-flop output Q to 1
2. Click the **Reset** button to reset the flip-flop output Q to 0
3. Observe how the outputs maintain their state after the input returns to its default value
4. Notice the cross-coupled feedback that enables the memory function

## Challenges

Explaining electronic components like flip-flops through animation can be challenging due to several reasons:

1. **Abstract Concepts**: Flip-flops are digital logic circuits used in electronics and computing. They store and manipulate binary data (0s and 1s). The concepts involved in how they work—like logic gates, binary states, clock signals, and data storage—are abstract and not directly observable, making them hard to represent visually.

2. **Complex Functionality**: Flip-flops have different types (like SR, JK, D, and T flip-flops) and each type has its unique mode of operation. This complexity can be difficult to condense into a simplified animation without losing essential details.

3. **Timing and Synchronization**: Flip-flops often operate based on clock signals, and their behavior is dependent on the timing of these signals. Accurately depicting timing and synchronization in an animation can be challenging, as it requires precise representation of these temporal aspects.

4. **Scale and Interaction with Other Components**: Flip-flops are usually part of larger electronic systems. Showing how they interact with other components in a system (like processors or memory units) within the limited scope of an animation can be difficult, as it might require a broader context that is hard to visualize succinctly.

5. **Viewer Background Knowledge**: Understanding the operation of flip-flops often requires a background in electronics or computer science. Animations need to be designed considering the viewer's prior knowledge, which can vary widely, making it hard to create a one-size-fits-all explanation.

6. **Visual Simplicity vs. Technical Accuracy**: Striking the right balance between simplicity for easier understanding and technical accuracy for correctness is a major challenge. Over-simplification can lead to misconceptions, while too much detail can overwhelm the viewer.

To effectively use animation for explaining flip-flops, it's essential to focus on clear, step-by-step visual representations, using metaphor or analogy where possible, and providing sufficient explanatory context to make the abstract concepts more relatable.

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Explain how NAND gates can be combined to create a flip-flop circuit
- Describe the difference between Set and Reset operations
- Demonstrate understanding of how flip-flops store binary data
- Identify the forbidden state in an SR flip-flop and explain why it should be avoided

### Target Audience

- High school electronics students
- College students in introductory digital electronics courses
- Prerequisites: Basic understanding of logic gates (AND, OR, NOT, NAND)

### Activities

1. **Exploration Activity**: Allow students to freely interact with the simulation, observing how Set and Reset inputs affect the outputs.

2. **Guided Investigation**: Have students create a truth table for the SR flip-flop by testing all input combinations and recording the outputs.

3. **Extension Activity**: Discuss how multiple flip-flops can be connected to create registers and counters, leading into the shift register simulation.

### Assessment

- What happens when both Set and Reset are activated simultaneously?
- Why is the flip-flop called a "memory" element?
- Draw the circuit diagram of an SR flip-flop using NAND gates.

## References

- [Falstad Flip-Flop Simulator](https://www.falstad.com/circuit/e-nandff.html) - Interactive circuit simulator with flip-flop examples
- [Wikipedia: Flip-flop (electronics)](https://en.wikipedia.org/wiki/Flip-flop_(electronics)) - Comprehensive overview of flip-flop types and applications
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this simulation
