---
title: Combinational Building Blocks
description: Master the standard modular components that serve as building blocks for larger digital systems
generated_by: claude skill chapter-content-generator
date: 2026-01-31 19:00:00
version: 0.03
---

# Combinational Building Blocks

## Summary

This chapter introduces the standard combinational circuit modules that serve as building blocks for larger digital systems. Students will design and analyze multiplexers, demultiplexers, encoders, decoders, priority encoders, binary and magnitude comparators, half and full adders, ripple-carry adders, and understand ALU concepts. Additional topics include parity generation and checking for error detection, tri-state buffers, and bus architecture. These modular components are fundamental to constructing complex digital systems efficiently.

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Multiplexer
2. MUX 2-to-1
3. MUX 4-to-1
4. MUX 8-to-1
5. MUX Tree
6. MUX as Logic Function
7. Demultiplexer
8. DEMUX 1-to-4
9. Encoder
10. Decoder
11. 2-to-4 Decoder
12. 3-to-8 Decoder
13. Decoder Enable
14. Priority Encoder
15. 7-Segment Display
16. 7-Segment Decoder
17. Binary Comparator
18. Magnitude Comparator
19. Equality Comparator
20. Half Adder
21. Full Adder
22. Carry Bit
23. Sum Bit
24. Ripple Carry Adder
25. Carry Propagation Delay
26. Carry Lookahead Concept
27. Adder Subtractor
28. Overflow in Addition
29. ALU Concept
30. Parity Bit
31. Parity Generator
32. Parity Checker
33. Error Detection
34. Tri-State Buffer
35. Bus Architecture

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Logic Gates and Digital Signal Properties](../03-logic-gates-digital-signals/index.md)
- [Chapter 4: Combinational Logic Design Fundamentals](../04-combinational-logic-design/index.md)

---

## Introduction: Your Digital Toolbox

Imagine you're building a house. You *could* start from scratch—mix your own concrete, forge your own nails, fell your own trees. But that would take forever and probably result in a wonky house. Smart builders use prefabricated components: standard-sized lumber, pre-made windows, factory-built doors.

Digital design works the same way.

In the previous chapters, you learned how to design circuits from scratch—write truth tables, simplify with K-maps, draw gate-level implementations. That's essential knowledge, like knowing how concrete cures. But now it's time to meet the prefabricated components of digital electronics: **combinational building blocks**.

These are standard, proven modules that you can grab "off the shelf" (or from a component library) and snap together like LEGO bricks. Need to select one of eight inputs? There's a block for that (multiplexer). Need to route a signal to one of four destinations? Block for that too (demultiplexer). Need to add two binary numbers? You guessed it—there's a block.

By the end of this chapter, you'll have a complete toolbox of digital building blocks. More importantly, you'll understand *how* each block works internally, so you can modify them when needed or design new ones yourself. You'll transform from someone who builds circuits gate-by-gate into someone who architects systems from proven modules.

Let's stock that toolbox!

## Multiplexers: The Data Selectors

A **multiplexer** (or **MUX** for short) is one of the most versatile building blocks in digital design. Think of it as a digital selector switch—it chooses one of several inputs and routes it to a single output.

Here's the key insight: a multiplexer is essentially a "many-to-one" switch controlled by binary select lines.

- **Data inputs**: Multiple signals competing to reach the output
- **Select inputs**: Binary code that chooses which data input wins
- **Output**: The selected input signal

The select lines work like an address. If you have 4 data inputs, you need 2 select lines (because \(2^2 = 4\)). If you have 8 data inputs, you need 3 select lines (\(2^3 = 8\)).

| Inputs | Select Lines | Common Name |
|--------|--------------|-------------|
| 2 | 1 | 2-to-1 MUX |
| 4 | 2 | 4-to-1 MUX |
| 8 | 3 | 8-to-1 MUX |
| 16 | 4 | 16-to-1 MUX |

### MUX 2-to-1: The Simplest Selector

The **2-to-1 multiplexer** is the fundamental building block. It has:

- Two data inputs: \(D_0\) and \(D_1\)
- One select input: \(S\)
- One output: \(Y\)

The behavior is simple:

- When \(S = 0\), the output \(Y = D_0\)
- When \(S = 1\), the output \(Y = D_1\)

The Boolean equation is:

\[Y = \overline{S} \cdot D_0 + S \cdot D_1\]

Reading this equation: "Output equals NOT-S AND D0, OR S AND D1." When S is 0, the first term passes D0. When S is 1, the second term passes D1.

Here's the truth table:

| S | D₀ | D₁ | Y |
|---|----|----|---|
| 0 | 0 | X | 0 |
| 0 | 1 | X | 1 |
| 1 | X | 0 | 0 |
| 1 | X | 1 | 1 |

Notice the pattern: when S=0, Y copies D₀ regardless of D₁. When S=1, Y copies D₁ regardless of D₀.

#### Diagram: 2-to-1 MUX Interactive

<iframe src="../../sims/mux-2to1/main.html" width="100%" height="450" scrolling="no"></iframe>

<details markdown="1">
<summary>2-to-1 Multiplexer Interactive Demonstration</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain how a 2-to-1 multiplexer selects between two inputs based on the select signal.

Instructional Rationale: Interactive toggle of select and data inputs with immediate visual feedback on output helps students internalize the selection mechanism.

Canvas Layout:

- Left: Input controls (toggle buttons for S, D0, D1)
- Center: MUX symbol (trapezoid shape with labels)
- Right: Output display with Y value
- Bottom: Boolean equation with current values substituted

Interactive Elements:

- Toggle buttons for S (select), D0, and D1
- MUX symbol shows signal flow with highlighted paths
- Active input path highlighted in green
- Inactive input path grayed out
- Output indicator (LED-style)
- Equation display shows current evaluation

Data Visibility:

- All input values clearly labeled
- Selected path visually emphasized
- Output value prominent
- Equation with color-coded substitutions

Visual Style:

- Standard MUX trapezoid symbol
- Signal flow arrows
- Active path in green, inactive in gray
- Clean, uncluttered layout

Implementation: p5.js with toggle state management and path highlighting
</details>

### MUX 4-to-1: Four Choices, Two Bits

The **4-to-1 multiplexer** selects one of four inputs using a 2-bit select code:

- Four data inputs: \(D_0, D_1, D_2, D_3\)
- Two select inputs: \(S_1, S_0\)
- One output: \(Y\)

The select code determines which input reaches the output:

| S₁ | S₀ | Output Y |
|----|----|----------|
| 0 | 0 | D₀ |
| 0 | 1 | D₁ |
| 1 | 0 | D₂ |
| 1 | 1 | D₃ |

The Boolean equation:

\[Y = \overline{S_1} \cdot \overline{S_0} \cdot D_0 + \overline{S_1} \cdot S_0 \cdot D_1 + S_1 \cdot \overline{S_0} \cdot D_2 + S_1 \cdot S_0 \cdot D_3\]

This looks complex, but the pattern is clear: each term "enables" one data input when the select lines match its address.

!!! tip "Memory Trick"
    Think of the select inputs as a binary address. S₁S₀ = 00 selects input 0, S₁S₀ = 01 selects input 1, and so on. The select code is literally the "address" of the data input you want.

#### Diagram: 4-to-1 MUX Interactive

<iframe src="../../sims/mux-4to1/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>4-to-1 Multiplexer Interactive Demonstration</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use a 4-to-1 multiplexer to select any of four inputs by setting the appropriate select code.

Instructional Rationale: Building on 2-to-1 understanding, this sim shows how additional select lines exponentially increase input options while maintaining the same selection principle.

Canvas Layout:

- Left column: Four data input toggles (D0-D3)
- Center: MUX symbol with internal routing visualization
- Right: Select input controls (S1, S0) and binary address display
- Bottom: Output and current equation

Interactive Elements:

- Toggle buttons for all data inputs (D0-D3)
- Toggle buttons for select inputs (S1, S0)
- Binary address display showing select value (00, 01, 10, 11)
- Internal AND gates visualized
- Active path highlighted through internal structure
- Output LED indicator

Data Visibility:

- All input values visible
- Select address prominently displayed
- Internal gate states optionally visible
- Active signal path emphasized

Visual Style:

- MUX shown as trapezoid or with internal structure option
- Color-coded paths (selected in green)
- Address display as binary digits
- Professional schematic appearance

Implementation: p5.js with multi-input selection logic
</details>

### MUX 8-to-1: Eight Inputs, Three Bits

Following the pattern, an **8-to-1 multiplexer** has:

- Eight data inputs: \(D_0\) through \(D_7\)
- Three select inputs: \(S_2, S_1, S_0\)
- One output: \(Y\)

The 3-bit select code addresses any of the 8 inputs (since \(2^3 = 8\)).

The general formula for an n-to-1 MUX:

- Number of data inputs: n
- Number of select lines: \(\log_2(n)\)
- Output equation: Sum of (each minterm of select lines ANDed with its corresponding data input)

### MUX Tree: Building Bigger from Smaller

What if you need a 16-to-1 MUX but only have 4-to-1 MUXes available? You build a **MUX tree**—a hierarchical structure where smaller MUXes cascade to form larger ones.

Here's the strategy for a 16-to-1 using 4-to-1 MUXes:

**Level 1** (First stage): Four 4-to-1 MUXes, each selecting from 4 inputs

- MUX A: selects from D₀-D₃
- MUX B: selects from D₄-D₇
- MUX C: selects from D₈-D₁₁
- MUX D: selects from D₁₂-D₁₅

All four use the same select lines (S₁S₀) for their internal selection.

**Level 2** (Second stage): One 4-to-1 MUX selecting among the Level 1 outputs

- Inputs: outputs from MUX A, B, C, D
- Select lines: S₃S₂ (the higher-order bits)

This creates a 16-to-1 MUX using five 4-to-1 MUXes!

The same principle extends indefinitely. Need a 64-to-1? Use 4-to-1s in a three-level tree. This modular approach is fundamental to digital design.

#### Diagram: MUX Tree Builder

<iframe src="../../sims/mux-tree/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>Multiplexer Tree Hierarchical Builder</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Organize

Learning Objective: Students will be able to organize smaller multiplexers into tree structures to create larger multiplexers, understanding how select lines are distributed across levels.

Instructional Rationale: Visualizing the hierarchical structure helps students understand how modularity enables scalable design. Interactive building reinforces the select line distribution concept.

Canvas Layout:

- Left: Available MUX components (4-to-1 blocks)
- Center: Canvas for building tree structure
- Right: Select line assignment panel
- Bottom: Input/output test interface

Interactive Elements:

- Drag and drop MUX blocks onto canvas
- Connect outputs to inputs
- Assign select lines to each MUX level
- Test with specific input patterns
- View signal propagation through tree
- Preset examples (8-to-1 from 2-to-1s, 16-to-1 from 4-to-1s)

Data Visibility:

- Clear level labeling
- Select line distribution shown
- Data path highlighting during test
- Total component count

Visual Style:

- Tree structure flowing left to right
- MUXes as consistent block symbols
- Color coding by tree level
- Connection wires with proper routing

Implementation: p5.js with drag-drop and connection logic
</details>

### MUX as Logic Function: The Universal Implementer

Here's a mind-bending fact: a multiplexer can implement *any* Boolean function. This makes MUXes incredibly versatile.

The trick is to use the function's input variables as the MUX select lines, and connect the function's truth table outputs to the MUX data inputs.

**Example**: Implement \(F(A, B) = A \oplus B\) (XOR) using a 4-to-1 MUX.

Step 1: Write the truth table:

| A | B | F |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Step 2: Connect A and B to the select inputs (S₁ = A, S₀ = B).

Step 3: Connect the F column values to the data inputs:

- \(D_0 = 0\) (for AB = 00)
- \(D_1 = 1\) (for AB = 01)
- \(D_2 = 1\) (for AB = 10)
- \(D_3 = 0\) (for AB = 11)

That's it! The MUX now computes XOR. For any input combination, the select lines choose the correct output from the data inputs.

**Even cooler**: You can implement an n-variable function with a \(2^{n-1}\)-to-1 MUX by using one variable directly and its complement on the data inputs. This is called the **Shannon expansion**.

#### Diagram: MUX Function Implementer

<iframe src="../../sims/mux-logic-function/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>MUX as Logic Function Implementer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement

Learning Objective: Students will be able to implement any Boolean function using a multiplexer by mapping truth table outputs to data inputs.

Instructional Rationale: This demonstrates the universality of multiplexers and provides a systematic method for function implementation that doesn't require Boolean simplification.

Canvas Layout:

- Left: Truth table input (editable)
- Center: MUX symbol with configurable data inputs
- Right: Test interface with variable toggles
- Bottom: Verification panel comparing MUX output to truth table

Interactive Elements:

- Editable truth table for 2 or 3 variable functions
- Auto-configure MUX data inputs from truth table
- Test inputs by toggling variables
- Compare MUX output to expected truth table value
- Highlight which data input is currently selected
- Option to show intermediate calculations

Data Visibility:

- Truth table with current row highlighted
- MUX data input values
- Current select code and selected input
- Output verification (match/mismatch indicator)

Visual Style:

- Truth table on left, MUX on right
- Arrow showing mapping from truth table to data inputs
- Active row and path highlighted
- Success/verification indicators

Implementation: p5.js with truth table parser and MUX simulator
</details>

## Demultiplexers: The Opposite Direction

If a multiplexer is many-to-one, a **demultiplexer** (DEMUX) is one-to-many. It takes a single input and routes it to one of several outputs based on select lines.

Think of it as a digital rotary switch or a train track switch—the signal comes in on one line and gets routed to exactly one destination.

- **Data input**: Single signal to be routed
- **Select inputs**: Binary code choosing the destination
- **Outputs**: Multiple lines, only one active at a time

### DEMUX 1-to-4: One Input, Four Destinations

A **1-to-4 demultiplexer** has:

- One data input: D
- Two select inputs: \(S_1, S_0\)
- Four outputs: \(Y_0, Y_1, Y_2, Y_3\)

The behavior:

| S₁ | S₀ | Y₀ | Y₁ | Y₂ | Y₃ |
|----|----|----|----|----|-----|
| 0 | 0 | D | 0 | 0 | 0 |
| 0 | 1 | 0 | D | 0 | 0 |
| 1 | 0 | 0 | 0 | D | 0 |
| 1 | 1 | 0 | 0 | 0 | D |

The selected output equals D; all others equal 0.

The Boolean equations:

\[Y_0 = \overline{S_1} \cdot \overline{S_0} \cdot D\]
\[Y_1 = \overline{S_1} \cdot S_0 \cdot D\]
\[Y_2 = S_1 \cdot \overline{S_0} \cdot D\]
\[Y_3 = S_1 \cdot S_0 \cdot D\]

Notice the pattern: each output is the corresponding minterm of the select lines, ANDed with D.

#### Diagram: 1-to-4 DEMUX Interactive

<iframe src="../../sims/demux-1to4/main.html" width="100%" height="450" scrolling="no"></iframe>

<details markdown="1">
<summary>1-to-4 Demultiplexer Interactive Demonstration</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Contrast

Learning Objective: Students will be able to contrast demultiplexer operation with multiplexer operation, understanding the one-to-many signal routing.

Instructional Rationale: Showing DEMUX as the "opposite" of MUX reinforces both concepts. Highlighting exactly one active output emphasizes the routing behavior.

Canvas Layout:

- Left: Data input toggle and select input controls
- Center: DEMUX symbol (inverted trapezoid or standard representation)
- Right: Four output indicators (LED style)
- Bottom: Current routing description

Interactive Elements:

- Toggle for data input D
- Toggle buttons for select inputs S1, S0
- DEMUX symbol with internal routing paths
- Active output LED lights up
- Inactive outputs clearly shown as off
- Address display showing current destination

Data Visibility:

- Input value D
- Select code as binary and decimal
- All four output values
- Clear indication of which output is "active"

Visual Style:

- DEMUX as inverted trapezoid (complement to MUX shape)
- Single input branching to multiple outputs
- Active path in green, inactive in gray
- LED-style output indicators

Implementation: p5.js with routing visualization
</details>

!!! info "MUX-DEMUX Duality"
    Multiplexers and demultiplexers are duals of each other. In fact, the internal structure of a DEMUX is nearly identical to a decoder (which we'll meet shortly). Some chips combine both functions, acting as a MUX in one direction and DEMUX in the other.

## Encoders and Decoders: Binary Translation

Encoders and decoders are complementary circuits that translate between different representations of information.

### Encoder: Many Bits to Few

An **encoder** converts a "one-hot" input (where exactly one of many inputs is active) into a compact binary code.

Think of it as a compression function: many wires go in, fewer wires come out.

For an 8-to-3 encoder:

- 8 inputs: \(D_0\) through \(D_7\) (only one should be active)
- 3 outputs: \(A_2, A_1, A_0\) (binary code indicating which input is active)

When input \(D_5\) is high (and all others low), the output is 101 (binary for 5).

| Active Input | A₂ | A₁ | A₀ |
|--------------|----|----|-----|
| D₀ | 0 | 0 | 0 |
| D₁ | 0 | 0 | 1 |
| D₂ | 0 | 1 | 0 |
| D₃ | 0 | 1 | 1 |
| D₄ | 1 | 0 | 0 |
| D₅ | 1 | 0 | 1 |
| D₆ | 1 | 1 | 0 |
| D₇ | 1 | 1 | 1 |

The output equations are simply ORs of the inputs that should produce a 1 in each output position:

\[A_0 = D_1 + D_3 + D_5 + D_7\]
\[A_1 = D_2 + D_3 + D_6 + D_7\]
\[A_2 = D_4 + D_5 + D_6 + D_7\]

### Decoder: Few Bits to Many

A **decoder** is the inverse: it takes a binary code and activates exactly one of many outputs.

For a 3-to-8 decoder:

- 3 inputs: \(A_2, A_1, A_0\) (the binary code)
- 8 outputs: \(Y_0\) through \(Y_7\) (only one active at a time)

When the input is 101 (5 in decimal), output \(Y_5\) goes high and all others stay low.

### 2-to-4 Decoder

The **2-to-4 decoder** is the smallest useful decoder:

- 2 inputs: \(A_1, A_0\)
- 4 outputs: \(Y_0, Y_1, Y_2, Y_3\)

Each output corresponds to a minterm:

\[Y_0 = \overline{A_1} \cdot \overline{A_0}\]
\[Y_1 = \overline{A_1} \cdot A_0\]
\[Y_2 = A_1 \cdot \overline{A_0}\]
\[Y_3 = A_1 \cdot A_0\]

#### Diagram: 2-to-4 Decoder Interactive

<iframe src="../../sims/decoder-2to4/main.html" width="100%" height="450" scrolling="no"></iframe>

<details markdown="1">
<summary>2-to-4 Decoder Interactive Demonstration</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain how a decoder converts a binary input code into exactly one active output line.

Instructional Rationale: The 2-to-4 decoder is simple enough to see the complete pattern while demonstrating the minterm-based implementation.

Canvas Layout:

- Left: Two input toggles (A1, A0)
- Center: Decoder symbol with internal AND gates visible
- Right: Four output indicators with labels (Y0-Y3)
- Bottom: Minterm equation for currently active output

Interactive Elements:

- Toggle buttons for A1 and A0
- Internal structure showing two inverters and four AND gates
- Signal flow animation through gates
- Active output highlighted prominently
- Minterm expression displayed for active output

Data Visibility:

- Input binary value and decimal equivalent
- All four outputs with active one emphasized
- Gate-level signal states
- Current minterm equation

Visual Style:

- Standard decoder block symbol with optional internal view
- Active output LED style (bright green)
- Inactive outputs dim
- Gate-level view toggle

Implementation: p5.js with gate simulation
</details>

### 3-to-8 Decoder

The **3-to-8 decoder** follows the same pattern:

- 3 inputs: \(A_2, A_1, A_0\)
- 8 outputs: \(Y_0\) through \(Y_7\)
- Each output is a 3-variable minterm

A 3-to-8 decoder is essentially a minterm generator—each output corresponds to one minterm. This makes decoders incredibly useful for implementing Boolean functions!

### Decoder Enable

Most practical decoders include an **enable** input (sometimes labeled E or G). When enable is inactive (typically low), ALL outputs are forced to 0 regardless of the select inputs. When enable is active, the decoder operates normally.

Enable inputs serve several purposes:

- **Power saving**: Disable unused decoders
- **Cascading**: Build larger decoders from smaller ones
- **Timing control**: Only activate outputs at specific times
- **Memory addressing**: Enable specific memory chips

With an enable input, the decoder equations become:

\[Y_i = E \cdot (\text{minterm}_i)\]

#### Diagram: Decoder with Enable

<iframe src="../../sims/decoder-enable/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Decoder with Enable Input Demonstration</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use the enable input to control decoder operation, understanding its role in system design.

Instructional Rationale: Enable inputs are crucial for cascading decoders and memory system design. Interactive demonstration shows how enable gates the entire decoder output.

Canvas Layout:

- Left: Enable input and address inputs
- Center: 3-to-8 decoder symbol with enable
- Right: Eight output indicators
- Bottom: Use case examples (cascading, memory addressing)

Interactive Elements:

- Toggle for Enable input
- Toggle buttons for address inputs (A2, A1, A0)
- When E=0, all outputs show "disabled" state
- When E=1, normal decoder operation
- Show cascading example with two decoders making 4-to-16

Data Visibility:

- Enable state prominently displayed
- Address value in binary and decimal
- Output states with disabled indication when E=0
- Cascade mode shows larger decoder configuration

Visual Style:

- Enable input at top of decoder symbol
- Disabled state shown with grayed outputs
- Active state with green LED outputs
- Optional cascade view with two decoders

Implementation: p5.js with enable gating logic
</details>

## Priority Encoder: When Multiple Inputs Compete

A standard encoder assumes exactly one input is active. But what happens if multiple inputs are high simultaneously? Chaos! The output would be an unpredictable OR of multiple codes.

A **priority encoder** solves this by assigning priorities: if multiple inputs are active, the highest-priority one wins.

For a 4-to-2 priority encoder with D₃ as highest priority:

| D₃ | D₂ | D₁ | D₀ | A₁ | A₀ | V |
|----|----|----|----|----|----|----|
| 0 | 0 | 0 | 0 | X | X | 0 |
| 0 | 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | X | 0 | 1 | 1 |
| 0 | 1 | X | X | 1 | 0 | 1 |
| 1 | X | X | X | 1 | 1 | 1 |

Notice the "X" (don't care) entries. Once a higher-priority input is active, lower-priority inputs don't matter.

The **V** output is a "valid" flag—it's 1 when ANY input is active, 0 when all inputs are low. This distinguishes between "output is 00 because D₀ is active" and "output is 00 because nothing is active."

#### Diagram: Priority Encoder Interactive

<iframe src="../../sims/priority-encoder/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Priority Encoder Interactive Demonstration</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine how a priority encoder resolves conflicts when multiple inputs are active simultaneously.

Instructional Rationale: The priority resolution is the key distinguishing feature. Showing multiple active inputs with clear priority indication demonstrates why this circuit is needed.

Canvas Layout:

- Left: Four input toggles with priority labels (Highest D3 to Lowest D0)
- Center: Priority encoder block with internal priority logic visible
- Right: Output code and valid indicator
- Bottom: Priority resolution explanation for current state

Interactive Elements:

- Toggle buttons for all four inputs
- Allow multiple inputs to be active simultaneously
- Show priority resolution in real-time
- Indicate which input "wins"
- Valid output as separate indicator
- Comparison mode: show what regular encoder would output (undefined)

Data Visibility:

- All input states
- Winning input highlighted with priority crown
- Output code with decimal equivalent
- Valid signal status
- Ignored (lower priority) inputs marked

Visual Style:

- Priority levels visualized as stacked heights
- Winning input emphasized with color/glow
- Output arrows from winning input only
- Conflict indication when multiple inputs active

Implementation: p5.js with priority resolution logic
</details>

!!! tip "Real-World Use: Interrupt Controllers"
    Priority encoders are the heart of interrupt controllers in CPUs. When multiple devices request attention simultaneously, the priority encoder determines which one gets serviced first. Higher-priority devices (like keyboard input) get encoded over lower-priority ones (like background disk access).

## 7-Segment Display and Decoder

One of the most visible applications of decoders is driving **7-segment displays**—those ubiquitous numeric readouts found in clocks, microwaves, and calculator screens.

### 7-Segment Display Basics

A 7-segment display consists of seven LED segments arranged in a figure-8 pattern:

```
  _a_
 |   |
 f   b
 |_g_|
 |   |
 e   c
 |_d_|
```

By lighting specific combinations of segments, you can display digits 0-9 (and some letters).

| Digit | a | b | c | d | e | f | g |
|-------|---|---|---|---|---|---|---|
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 2 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
| 3 | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| 4 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 5 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
| 6 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 7 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |

### 7-Segment Decoder

A **7-segment decoder** takes a 4-bit BCD (Binary Coded Decimal) input and produces the seven outputs needed to display the corresponding digit.

This is a specialized decoder—instead of one-hot outputs, it produces the specific segment pattern for each digit.

Each segment output is a separate Boolean function of the four inputs:

- \(a = f(D_3, D_2, D_1, D_0)\)
- \(b = f(D_3, D_2, D_1, D_0)\)
- ... and so on for all seven segments

For example, segment 'a' should be ON for digits 0, 2, 3, 5, 6, 7, 8, 9:

\[a = \sum m(0, 2, 3, 5, 6, 7, 8, 9)\]

Since BCD only uses values 0-9, inputs 10-15 are don't cares, which can be exploited for simplification.

#### Diagram: 7-Segment Display Driver

<iframe src="../../sims/seven-segment/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>7-Segment Display and Decoder Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will be able to execute the conversion from BCD input to 7-segment display output by tracing signals through the decoder.

Instructional Rationale: The 7-segment display is a tangible, familiar application that connects abstract Boolean logic to a real-world output students recognize.

Canvas Layout:

- Left: 4-bit BCD input controls (toggles or buttons 0-9)
- Center: 7-segment display visualization (realistic LED segments)
- Right: Individual segment state indicators (a-g)
- Bottom: K-map or truth table for selected segment

Interactive Elements:

- Input as either toggles (D3-D0) or direct digit buttons (0-9)
- Large 7-segment display showing current digit
- Individual segment LEDs with labels
- Select a segment to see its K-map/truth table
- Invalid BCD inputs (10-15) show as blank or special pattern
- Segment equation display option

Data Visibility:

- BCD input value in binary and decimal
- All seven segment states
- Currently displayed digit
- Boolean equation for selected segment

Visual Style:

- Realistic 7-segment LED display (red or green segments)
- Segment labels clearly visible
- Active segments bright, inactive dim
- Professional appearance matching real displays

Implementation: p5.js with 7-segment rendering and decoder logic
</details>

## Comparators: Digital Decision Makers

Comparators are circuits that compare two binary numbers and indicate their relationship. Is A equal to B? Is A greater than B? Is A less than B? These fundamental questions arise constantly in digital systems.

### Equality Comparator

An **equality comparator** determines if two n-bit numbers are identical. The output is 1 if A = B, and 0 otherwise.

For single bits, equality is simply XNOR:

\[EQ = A \odot B = \overline{A \oplus B} = A \cdot B + \overline{A} \cdot \overline{B}\]

For multi-bit comparison, each bit position is compared, and ALL must match:

\[A = B \text{ when } (A_3 \odot B_3) \cdot (A_2 \odot B_2) \cdot (A_1 \odot B_1) \cdot (A_0 \odot B_0) = 1\]

This is simply ANDing all the bit-wise XNOR results.

### Binary Comparator (Single Bit)

A **binary comparator** for single bits determines all three relationships:

| A | B | A > B | A = B | A < B |
|---|---|-------|-------|-------|
| 0 | 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 |

The equations:

\[A > B = A \cdot \overline{B}\]
\[A = B = \overline{A \oplus B}\]
\[A < B = \overline{A} \cdot B\]

### Magnitude Comparator

A **magnitude comparator** extends this to multi-bit numbers. For n-bit numbers A and B, it outputs three signals: A > B, A = B, and A < B.

The comparison starts from the most significant bit:

1. If \(A_{n-1} > B_{n-1}\), then A > B (regardless of other bits)
2. If \(A_{n-1} < B_{n-1}\), then A < B
3. If \(A_{n-1} = B_{n-1}\), compare the next bit down
4. Continue until a difference is found, or all bits match (equality)

For a 4-bit magnitude comparator, the equations become complex, but the logic follows this cascading comparison pattern.

Standard IC magnitude comparators (like the 74LS85) include cascade inputs, allowing multiple chips to be connected for comparing larger numbers.

#### Diagram: Magnitude Comparator Interactive

<iframe src="../../sims/magnitude-comparator/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>4-Bit Magnitude Comparator Interactive</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students will be able to differentiate between the three comparison outcomes (A>B, A=B, A<B) and trace how the comparison cascades from MSB to LSB.

Instructional Rationale: Understanding the bit-by-bit comparison process reveals why magnitude comparison is more complex than equality checking. Step-through visualization makes the cascade logic clear.

Canvas Layout:

- Left: 4-bit input A (toggles or slider 0-15)
- Right: 4-bit input B (toggles or slider 0-15)
- Center: Comparison visualization with bit-by-bit analysis
- Bottom: Three output indicators (A>B, A=B, A<B)

Interactive Elements:

- Toggle buttons or sliders for A and B (4 bits each)
- Decimal value display for both inputs
- Step-by-step comparison animation showing bit-by-bit analysis
- Highlight which bit "decides" the comparison
- Three output LEDs with only one active
- Cascade mode showing multi-chip comparison

Data Visibility:

- Binary and decimal values for A and B
- Bit-by-bit comparison status
- Deciding bit highlighted
- All three comparison outputs (exactly one true)

Visual Style:

- Numbers displayed as bit columns
- Comparison arrows between corresponding bits
- Deciding bit connection emphasized
- Clear output labeling with symbols (>, =, <)

Implementation: p5.js with cascading comparison logic and animation
</details>

## Adders: The Heart of Arithmetic

Addition is the most fundamental arithmetic operation in digital systems. All other arithmetic (subtraction, multiplication, division) ultimately reduces to combinations of addition. Let's build adders from the ground up.

### Half Adder

A **half adder** adds two single-bit inputs and produces a sum and carry:

- Inputs: A, B (single bits)
- Outputs: Sum (S), Carry (C)

The truth table:

| A | B | C (Carry) | S (Sum) |
|---|---|-----------|---------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

This is just binary addition: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (which is 0 with carry 1).

The equations:

\[S = A \oplus B\]
\[C = A \cdot B\]

The **sum bit** is XOR (it's 1 when inputs differ). The **carry bit** is AND (it's 1 when both inputs are 1).

Why "half"? Because it only handles two inputs. Real multi-bit addition needs to handle a carry coming *in* from the previous position.

### Full Adder

A **full adder** adds three single-bit inputs: two data bits plus a carry-in from the previous position.

- Inputs: A, B, \(C_{in}\) (carry in)
- Outputs: S (sum), \(C_{out}\) (carry out)

The truth table:

| A | B | Cᵢₙ | Cₒᵤₜ | S |
|---|---|-----|------|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 1 |

The equations:

\[S = A \oplus B \oplus C_{in}\]
\[C_{out} = A \cdot B + C_{in} \cdot (A \oplus B)\]

The sum is the XOR of all three inputs (odd number of 1s gives 1). The carry-out is 1 when at least two inputs are 1.

A full adder can be built from two half adders and an OR gate:

1. First half adder: add A and B → partial sum, partial carry
2. Second half adder: add partial sum and Cᵢₙ → final sum, second partial carry
3. OR gate: combine partial carries → final Cₒᵤₜ

#### Diagram: Half and Full Adder Interactive

<iframe src="../../sims/adders/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>Half Adder and Full Adder Interactive</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain the difference between half and full adders, including why full adders are necessary for multi-bit addition.

Instructional Rationale: Side-by-side comparison of half and full adders clarifies the role of carry-in. Building full adder from half adders reinforces modular design concepts.

Canvas Layout:

- Top tabs: Half Adder / Full Adder toggle
- Left: Input controls (2 for half, 3 for full)
- Center: Circuit diagram with gate-level detail
- Right: Sum and Carry outputs
- Bottom: Binary addition visualization

Interactive Elements:

- Switch between half adder and full adder views
- Toggle buttons for all inputs
- Gate-level simulation showing signal propagation
- Binary addition shown as column addition (like pencil and paper)
- Build mode: construct full adder from half adders
- Animation showing carry propagation concept

Data Visibility:

- All input values
- Sum and Carry outputs
- Gate output states in circuit view
- Binary column addition visualization

Visual Style:

- Clean gate-level circuit diagrams
- XOR and AND gates clearly labeled
- Signal flow arrows
- Column addition format familiar from arithmetic

Implementation: p5.js with gate simulation and dual-mode display
</details>

### Ripple Carry Adder

To add multi-bit numbers, we cascade full adders, connecting each carry-out to the next carry-in. This is called a **ripple carry adder** because the carry "ripples" through the chain.

For a 4-bit ripple carry adder:

- Inputs: A₃A₂A₁A₀ and B₃B₂B₁B₀
- Outputs: S₃S₂S₁S₀ and Cₒᵤₜ (final carry)
- Structure: Four full adders in series

The LSB adder's carry-in is typically 0 (unless we're doing subtraction). Each subsequent adder takes its carry-in from the previous adder's carry-out.

#### Diagram: 4-Bit Ripple Carry Adder

<iframe src="../../sims/ripple-carry-adder/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>4-Bit Ripple Carry Adder Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will be able to calculate the sum of two 4-bit binary numbers by tracing through a ripple carry adder.

Instructional Rationale: Visualizing the carry chain makes the ripple effect tangible. Timing animation shows why this design has latency issues.

Canvas Layout:

- Top: Two 4-bit input fields (binary or decimal entry)
- Center: Four cascaded full adders with carry chain visible
- Bottom: 5-bit result (4 sum bits + carry out)
- Optional: Timing diagram showing carry propagation

Interactive Elements:

- Input A and B as binary toggles or decimal 0-15
- Carry chain highlighted showing propagation
- Step-through mode: watch carry ripple bit by bit
- Speed control for animation
- Timing visualization showing delay accumulation
- Decimal equivalents displayed

Data Visibility:

- Input values in binary and decimal
- Each full adder's sum and carry
- Carry chain connections
- Final sum with possible overflow indication

Visual Style:

- Four FA blocks connected horizontally
- Carry wires clearly connecting adjacent stages
- Active carries highlighted during propagation
- Time labels showing cumulative delay

Implementation: p5.js with cascaded full adder simulation and timing display
</details>

### Carry Propagation Delay

Here's the problem with ripple carry adders: each bit must wait for the carry from the previous bit. The carry "ripples" through the entire chain, causing **carry propagation delay**.

For an n-bit ripple carry adder:

- Worst case: carry must propagate through all n stages
- Delay = n × (delay of one full adder)

For a 32-bit adder, that's 32 gate delays just for the carry chain! In modern processors running at gigahertz speeds, this is unacceptable.

### Carry Lookahead Concept

The solution is **carry lookahead**: instead of waiting for carries to ripple, we calculate them in advance using combinational logic.

The key insight: for each bit position, we can determine if it will:

- **Generate** a carry: when both Aᵢ = 1 and Bᵢ = 1
- **Propagate** a carry: when exactly one of Aᵢ or Bᵢ = 1

Define generate (G) and propagate (P) signals:

\[G_i = A_i \cdot B_i\]
\[P_i = A_i \oplus B_i\]

The carry for position i can be calculated directly:

\[C_1 = G_0 + P_0 \cdot C_0\]
\[C_2 = G_1 + P_1 \cdot G_0 + P_1 \cdot P_0 \cdot C_0\]
\[C_3 = G_2 + P_2 \cdot G_1 + P_2 \cdot P_1 \cdot G_0 + P_2 \cdot P_1 \cdot P_0 \cdot C_0\]

These are parallel calculations—all carries can be computed simultaneously in just a few gate delays, regardless of word size!

The tradeoff: carry lookahead requires more gates (those equations get big). It's a classic speed vs. area tradeoff.

!!! info "Real-World Adders"
    Modern processors use hierarchical carry lookahead with multiple levels of G and P calculations. A 64-bit adder might use 4-bit carry lookahead blocks cascaded with block-level lookahead, achieving logarithmic delay instead of linear delay.

### Adder Subtractor

Here's a clever trick: you can build a combined adder/subtractor with just one adder and some XOR gates.

Recall that in two's complement:

\[A - B = A + (-B) = A + \overline{B} + 1\]

To subtract, we:

1. Complement B (flip all bits)
2. Add 1 (set carry-in to 1)

Using XOR gates as controlled inverters:

- When control = 0: XOR passes B unchanged (addition)
- When control = 1: XOR inverts B (preparation for subtraction)

The control signal also connects to the LSB carry-in:

- Control = 0: Cᵢₙ = 0 (normal addition)
- Control = 1: Cᵢₙ = 1 (adds the +1 for two's complement)

One circuit, two operations!

#### Diagram: Adder-Subtractor

<iframe src="../../sims/adder-subtractor/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>4-Bit Adder-Subtractor with Two's Complement</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will be able to execute both addition and subtraction using a single adder circuit by understanding the role of XOR inversion and carry-in control.

Instructional Rationale: Seeing how subtraction reuses the addition hardware reinforces two's complement concepts and demonstrates efficient hardware design.

Canvas Layout:

- Top: Add/Subtract mode toggle
- Left: 4-bit input A
- Right: 4-bit input B (with XOR inversion visible)
- Center: 4-bit adder with controlled carry-in
- Bottom: Result with sign interpretation

Interactive Elements:

- Mode toggle (Add/Subtract)
- Input toggles for A and B
- XOR gates visible on B path, controlled by mode
- Carry-in connected to mode signal
- Show both unsigned and signed interpretations of result
- Overflow detection indicator

Data Visibility:

- Original A and B values
- Complemented B when subtracting
- Carry-in value
- Sum/difference result
- Overflow/underflow indication

Visual Style:

- XOR gates clearly shown on B input path
- Control signal branching to XORs and carry-in
- Color coding: add mode in blue, subtract mode in orange
- Clear labeling of two's complement operation

Implementation: p5.js with mode-switched arithmetic
</details>

### Overflow in Addition

When adding signed numbers, we can get **overflow**—a result that doesn't fit in the available bits.

For signed numbers using two's complement:

- Positive + Positive that yields Negative = Overflow
- Negative + Negative that yields Positive = Overflow
- Mixed signs (positive + negative) = Never overflows

The overflow detection rule:

\[\text{Overflow} = C_{n-1} \oplus C_{n-2}\]

Overflow occurs when the carry into the MSB differs from the carry out of the MSB.

Alternatively:

\[\text{Overflow} = (A_{n-1} \cdot B_{n-1} \cdot \overline{S_{n-1}}) + (\overline{A_{n-1}} \cdot \overline{B_{n-1}} \cdot S_{n-1})\]

This checks: "Did two positives give negative, or two negatives give positive?"

## ALU Concept: The Calculator Core

All the arithmetic and logic circuits we've discussed come together in the **Arithmetic Logic Unit (ALU)**—the computational heart of any processor.

An ALU combines:

- Arithmetic operations: add, subtract, increment, decrement
- Logic operations: AND, OR, XOR, NOT
- Comparison: set flags based on results

The operation is selected by a function code:

| Function Code | Operation |
|---------------|-----------|
| 00 | AND |
| 01 | OR |
| 10 | Add |
| 11 | Subtract |
| ... | ... |

Multiplexers select which circuit's output becomes the ALU result.

An ALU also produces **status flags**:

- **Zero (Z)**: Result is all zeros
- **Negative (N)**: Result's MSB is 1 (negative in signed interpretation)
- **Carry (C)**: Carry out from MSB (unsigned overflow)
- **Overflow (V)**: Signed overflow occurred

These flags drive conditional branches in programs: "jump if zero," "branch if negative," etc.

#### Diagram: Simple ALU

<iframe src="../../sims/simple-alu/main.html" width="100%" height="600" scrolling="no"></iframe>

<details markdown="1">
<summary>Simple 4-Bit ALU Interactive</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine how an ALU selects between multiple operations and generates status flags.

Instructional Rationale: The ALU integrates many concepts from this chapter. Seeing how selection logic routes between different functional units provides insight into processor architecture.

Canvas Layout:

- Top: Two 4-bit inputs (A and B)
- Center: ALU block showing multiple internal functional units
- Right: Operation selector (function code input)
- Bottom: Result and status flags (Z, N, C, V)

Interactive Elements:

- Input toggles or sliders for A and B
- Operation selector (dropdown or buttons)
- Internal view toggle showing which unit is active
- Status flag indicators with tooltips explaining each
- Example calculations for each operation
- Step through showing data path for selected operation

Data Visibility:

- Both input values
- Selected operation name
- Intermediate results from each functional unit
- MUX selection to output
- All four status flags with explanations

Visual Style:

- ALU as block with internal functional units
- Currently active unit highlighted
- Flag indicators as LEDs with labels
- Clean, processor-diagram aesthetic

Implementation: p5.js with multi-function simulation
</details>

## Error Detection: Parity

Digital systems aren't perfect—noise can flip bits during transmission or storage. **Parity** is one of the simplest error detection techniques.

### Parity Bit

A **parity bit** is an extra bit added to data to make the total count of 1s either even (even parity) or odd (odd parity).

For **even parity**: the parity bit is set so the total number of 1s (including the parity bit) is even.

| Data | 1s Count | Parity Bit | Total with Parity |
|------|----------|------------|-------------------|
| 0000 | 0 | 0 | 00000 |
| 0001 | 1 | 1 | 00011 |
| 0110 | 2 | 0 | 01100 |
| 0111 | 3 | 1 | 01111 |
| 1111 | 4 | 0 | 11110 |

For **odd parity**: the parity bit makes the total count odd.

### Parity Generator

A **parity generator** circuit computes the parity bit from the data bits. For even parity:

\[P = D_0 \oplus D_1 \oplus D_2 \oplus D_3 \oplus ...\]

It's simply the XOR of all data bits. XOR is the "odd function"—it outputs 1 when an odd number of inputs are 1. Adding this bit makes the total even.

### Parity Checker

A **parity checker** verifies that received data has correct parity. It XORs all bits including the parity bit:

\[\text{Error} = D_0 \oplus D_1 \oplus D_2 \oplus ... \oplus P\]

For even parity: if the result is 0, parity is correct. If 1, an error occurred.

### Error Detection Limitations

Parity is simple but limited:

- **Detects**: Any single-bit error (odd number of errors)
- **Misses**: Two-bit errors (or any even number of errors)
- **Cannot correct**: Only detects, doesn't identify which bit is wrong

For better error handling, more sophisticated codes like Hamming codes add multiple parity bits to enable single-error correction.

#### Diagram: Parity Generator and Checker

<iframe src="../../sims/parity/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Parity Generator and Checker Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use parity generation and checking to detect single-bit errors in transmitted data.

Instructional Rationale: Error detection is a practical application of XOR gates. Introducing bit-flip errors demonstrates the detection capability and its limitations.

Canvas Layout:

- Top: Transmitter section with 4 data bits and generated parity
- Center: Transmission channel with error injection option
- Bottom: Receiver section with parity check result
- Side: Error indicator and explanation

Interactive Elements:

- Toggle buttons for 4 data bits at transmitter
- Auto-computed parity bit display
- Error injection: click any bit in channel to flip it
- Parity checker output (OK/ERROR)
- Even/odd parity mode toggle
- Multi-bit error demonstration (shows undetected errors)

Data Visibility:

- Original data and parity
- Transmitted data (possibly with errors)
- Received data with parity check result
- Count of errors introduced
- Explanation of why error was detected/missed

Visual Style:

- Transmitter, channel, and receiver as distinct sections
- XOR tree visualization for generator/checker
- Error injection as clickable bits in channel
- OK in green, ERROR in red
- Transmission arrow between sections

Implementation: p5.js with error injection simulation
</details>

## Tri-State Buffers and Bus Architecture

So far, all our outputs have been either 0 or 1. But real digital systems need a third state: **high-impedance (Z)**, where the output is effectively disconnected.

### Tri-State Buffer

A **tri-state buffer** has three possible output states:

- **0**: Low voltage, actively driven
- **1**: High voltage, actively driven
- **Z**: High impedance, electrically disconnected

The control:

- **Enable = 1**: Output follows input (normal buffer behavior)
- **Enable = 0**: Output is Z (buffer appears disconnected)

| Enable | Input | Output |
|--------|-------|--------|
| 0 | X | Z |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

Why is this useful? It allows multiple sources to share a single wire without fighting.

### Bus Architecture

A **bus** is a shared communication pathway—multiple devices connect to the same wires. But only one device can "talk" at a time; otherwise, you get electrical conflicts.

Tri-state buffers make buses work:

1. All devices connect to the bus through tri-state buffers
2. Only ONE device's buffer is enabled at any time
3. All others are in high-Z (disconnected) state
4. The enabled device drives the bus, others just listen

This is how your computer's data bus works—the CPU, memory, and I/O all share the same wires, taking turns to transmit.

Common bus widths:

- 8-bit: Early microprocessors
- 16-bit: Older PCs
- 32-bit: Standard PCs for decades
- 64-bit: Modern processors

#### Diagram: Tri-State Buffer and Bus

<iframe src="../../sims/tristate-bus/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>Tri-State Buffer and Bus Architecture Interactive</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Organize

Learning Objective: Students will be able to organize multiple data sources onto a shared bus using tri-state buffers, understanding why only one source can be active at a time.

Instructional Rationale: Bus architecture is fundamental to computer organization. Demonstrating the bus conflict problem and its tri-state solution shows why this circuit exists.

Canvas Layout:

- Top: Three data sources with enable controls
- Center: Shared bus (single wire/set of wires)
- Bottom: Receiver(s) connected to bus
- Side: Bus state indicator and conflict warning

Interactive Elements:

- Three sources with data input and enable toggles
- Enable exactly one source at a time (automatic or manual)
- Attempt to enable multiple sources shows "BUS CONFLICT" warning
- Bus value display shows current driven value
- Receiver(s) show received data
- Animation showing data flow

Data Visibility:

- Each source's data and enable state
- Current bus value (or conflict indication)
- Which source is currently driving
- Receiver(s) capturing bus value

Visual Style:

- Bus as thick wire in center
- Tri-state symbols on connections
- Active connection in green
- Disabled connections with Z symbol
- Bus conflict shown in red with warning icon

Implementation: p5.js with bus arbitration and conflict detection
</details>

!!! warning "Bus Conflict"
    If two tri-state buffers driving the same bus are both enabled with different values, you get a **bus conflict**—one tries to drive 0, the other 1. This causes undefined voltage levels, excessive current, and can damage circuits. Proper bus control is essential!

## Putting It All Together

We've covered a lot of ground in this chapter. Let's see how these building blocks work together in a real system.

Consider a simple calculator that can add or subtract two 4-bit numbers selected from multiple inputs:

1. **Input selection**: 4-to-1 MUXes choose which operands to use
2. **Operation**: Adder-subtractor performs the calculation
3. **Output routing**: DEMUX sends result to appropriate destination
4. **Display**: 7-segment decoder shows the result
5. **Error checking**: Parity added for data transmission
6. **Bus architecture**: Shared data path between components

Each block is a "black box" with defined inputs and outputs. You don't need to think about the internal gates—just connect the blocks correctly.

This modular approach scales to enormous complexity:

- A simple CPU might use hundreds of these blocks
- A modern processor uses billions of transistors organized into these functional modules
- System-on-chip designs integrate memory, I/O, and processing—all from the same building blocks

## Summary and Key Takeaways

Congratulations! You've stocked your digital toolbox with the fundamental building blocks of combinational logic. Here's your inventory:

**Selection and Routing:**

- **Multiplexers** (MUX): Select one of many inputs
- **Demultiplexers** (DEMUX): Route one input to many outputs
- MUXes can implement any Boolean function!

**Code Conversion:**

- **Encoders**: Compress one-hot to binary
- **Priority encoders**: Handle multiple active inputs gracefully
- **Decoders**: Expand binary to one-hot
- **7-segment decoders**: Drive numeric displays

**Comparison:**

- **Equality comparators**: Test A = B
- **Magnitude comparators**: Determine A > B, A = B, or A < B
- Cascading enables comparison of larger numbers

**Arithmetic:**

- **Half adder**: Add two bits, produce sum and carry
- **Full adder**: Add three bits (includes carry-in)
- **Ripple carry adder**: Cascade full adders for multi-bit addition
- **Carry lookahead**: Faster addition at the cost of more gates
- **Adder-subtractor**: Two's complement enables subtract using add

**Error Detection:**

- **Parity generator/checker**: Simple single-bit error detection
- XOR is the key operation for parity

**Bus Control:**

- **Tri-state buffers**: Three output states (0, 1, Z)
- Enable shared buses without conflicts

**System Integration:**

- **ALU**: Combines arithmetic and logic operations
- Function select chooses the operation
- Status flags (Z, N, C, V) report results

!!! success "Key Insight"
    Digital systems are built from proven, modular components. Just as a builder uses standard-sized doors and windows, you'll use standard MUXes, decoders, adders, and comparators. Understanding these building blocks transforms you from a gate-level designer into a system architect.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
A fascinating graphic novel could follow Claude Shannon, the father of information theory, as he develops the mathematical foundations of digital circuit design at MIT and Bell Labs in the 1930s-40s. The story could show young Shannon's insight that Boolean algebra could model telephone switching circuits, leading to his legendary master's thesis—often called the most important master's thesis of the 20th century. The visual medium would brilliantly capture his relay circuits transforming into the digital logic we use today, connecting the abstract symbols of Boolean algebra to the physical circuits that power our modern world.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: MUX Selection"
    A 4-to-1 MUX has inputs D₀=1, D₁=0, D₂=1, D₃=0 and select inputs S₁=1, S₀=0. What is the output Y?

    **Solution:**
    With S₁S₀ = 10, the MUX selects input D₂.
    Since D₂ = 1, the output Y = 1.

??? question "Problem 2: Decoder Outputs"
    For a 3-to-8 decoder with input A₂A₁A₀ = 101, which output is active?

    **Solution:**
    The input 101 in binary equals 5 in decimal.
    Therefore, output Y₅ is active (HIGH), and all other outputs (Y₀-Y₄, Y₆-Y₇) are inactive (LOW).

??? question "Problem 3: Priority Encoder"
    A 4-to-2 priority encoder has inputs D₃=0, D₂=1, D₁=1, D₀=0 with D₃ as highest priority. What is the output?

    **Solution:**
    Multiple inputs are active (D₂ and D₁). The highest priority active input is D₂.
    Therefore: A₁A₀ = 10 (binary for 2), V = 1 (valid output).

??? question "Problem 4: Full Adder"
    What are the Sum and Carry-out for a full adder with A=1, B=1, Cᵢₙ=1?

    **Solution:**
    Sum = A ⊕ B ⊕ Cᵢₙ = 1 ⊕ 1 ⊕ 1 = 0 ⊕ 1 = 1
    Cₒᵤₜ = AB + Cᵢₙ(A ⊕ B) = 1·1 + 1·(1⊕1) = 1 + 1·0 = 1

    In decimal: 1 + 1 + 1 = 3, which is 11 in binary (Sum=1, Carry=1). ✓

??? question "Problem 5: Ripple Carry Delay"
    A ripple carry adder has 8 full adders, each with a gate delay of 2 ns. What is the worst-case delay for the carry to propagate from C₀ to C₈?

    **Solution:**
    Worst case: carry must ripple through all 8 stages.
    Each stage contributes its carry path delay.
    Total delay = 8 × 2 ns = 16 ns.

    (In practice, the delay might be slightly different depending on gate structure, but the linear relationship holds.)

??? question "Problem 6: Parity Check"
    Data 10110 is received with even parity (the last bit is the parity bit). Is there an error?

    **Solution:**
    Count the 1s in the received data: 1+0+1+1+0 = 3 (odd).
    For even parity, the total should be even.
    Since we have an odd count, an error is detected!

??? question "Problem 7: MUX as Logic"
    Implement the function F(A,B) = AB + ĀB̄ (XNOR) using a 4-to-1 MUX.

    **Solution:**
    Use A as S₁ and B as S₀. Fill in data inputs from the truth table:

    - AB = 00: F = 1 → D₀ = 1
    - AB = 01: F = 0 → D₁ = 0
    - AB = 10: F = 0 → D₂ = 0
    - AB = 11: F = 1 → D₃ = 1

    Connect: S₁=A, S₀=B, D₀=1, D₁=0, D₂=0, D₃=1.
    Output Y gives F = XNOR.

??? question "Problem 8: Tri-State Bus"
    Three devices A, B, C connect to a shared bus via tri-state buffers. Device A wants to send 1, B wants to send 0, C wants to send 1. If only device B is enabled, what is the bus value?

    **Solution:**
    Since only device B's buffer is enabled:

    - Device A: disabled → high-Z (disconnected)
    - Device B: enabled, driving 0 → BUS = 0
    - Device C: disabled → high-Z (disconnected)

    The bus value is 0.

[See Annotated References](./references.md)
