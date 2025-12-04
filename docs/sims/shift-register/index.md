---
title: Shift Register MicroSim
description: Interactive simulation of a 74HC594 shift register with logic analyzer display, demonstrating serial-to-parallel data conversion.
quality_score: 80
---

# Shift Register MicroSim

<iframe src="main.html" width="100%" height="400px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/digital-electronics/sims/shift-register/main.html" width="100%" height="400px" scrolling="no"></iframe>
```

[Run the Shift Register MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

<!-- TODO: Add p5.js editor link when sketch is uploaded -->
<!-- [Edit in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/SKETCH_ID){ .md-button } -->

## Description

This interactive simulation demonstrates the operation of a 74HC594 shift register, a common integrated circuit used to convert serial data into parallel output. The simulation includes a logic analyzer display that shows the timing relationships between the DATA IN, CLOCK, and LATCH signals.

### Key Features

- Visual representation of the 74HC594 shift register chip
- Real-time logic analyzer showing signal waveforms
- Interactive DATA IN toggle (ON/OFF)
- CLOCK button to shift data into the register
- LATCH button to transfer shift register contents to output
- Reset button to clear all states
- 8-bit output display with LED indicators

### How to Use

1. Set **DATA IN** to ON or OFF using the radio buttons
2. Click **Next Clock** to shift the current DATA IN value into the register
3. Repeat steps 1-2 to load a complete 8-bit pattern
4. Click **Latch** to transfer the shift register contents to the output pins
5. Observe the LED indicators showing the parallel output
6. Watch the Logic Analyzer to see the timing of each signal
7. Click **Reset** to clear the register and start over

### Understanding the Logic Analyzer

The logic analyzer display shows three signals:

- **DATA IN** (blue): The current input data level
- **CLOCK** (red): Pulses each time you click "Next Clock"
- **LATCH** (green): Pulses when you click "Latch"

Each rising edge of the CLOCK signal shifts the DATA IN value into the first position of the shift register, pushing all existing bits one position to the right.

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Explain the difference between serial and parallel data transfer
- Describe how a shift register converts serial input to parallel output
- Identify the function of CLOCK and LATCH signals in a shift register
- Demonstrate the sequence of operations needed to load an 8-bit pattern

### Target Audience

- High school electronics students
- College students in digital electronics courses
- Prerequisites: Understanding of flip-flops and binary numbers

### Activities

1. **Exploration Activity**: Load the binary pattern for the letter "A" (01000001) into the shift register and display it on the outputs.

2. **Guided Investigation**: Document the timing sequence by recording what happens at each clock pulse as you shift in a specific bit pattern.

3. **Extension Activity**: Calculate how many clock pulses are needed to shift data through multiple cascaded shift registers. Discuss applications like LED displays or motor control.

### Assessment

- What is the difference between the shift register and the output register in the 74HC594?
- Why is a separate LATCH signal needed?
- How many clock pulses are required to load all 8 bits?
- Describe a real-world application where shift registers are used.

## References

- [Wikipedia: Shift Register](https://en.wikipedia.org/wiki/Shift_register) - Overview of shift register types and applications
- [Texas Instruments 74HC594 Datasheet](https://www.ti.com/lit/ds/symlink/sn74hc594.pdf) - Technical specifications for the 74HC594
- [SparkFun Shift Register Tutorial](https://learn.sparkfun.com/tutorials/shift-registers) - Practical guide to using shift registers with microcontrollers
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this simulation
