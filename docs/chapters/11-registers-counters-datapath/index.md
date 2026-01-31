---
title: Registers, Counters, and Datapath
description: Sequential building blocks that form the foundation of digital datapath design
generated_by: claude skill chapter-content-generator
date: 2026-01-31 21:30:00
version: 0.03
---

# Registers, Counters, and Datapath

## Summary

This chapter covers the sequential building blocks that form the foundation of digital datapath design. Students will learn about registers including parallel load and shift registers with various configurations (SISO, SIPO, PISO, PIPO), bidirectional and universal shift registers, and control signals for enable, load, and clear operations. Counter design is thoroughly covered including up, down, and up-down counters, mod-N counters, BCD and decade counters, and specialized counters like ring and Johnson counters. The chapter concludes with datapath concepts, control units, and register transfer level (RTL) abstraction.

## Concepts Covered

This chapter covers the following 29 concepts from the learning graph:

1. Counter
2. Up Counter
3. Down Counter
4. Up-Down Counter
5. Mod-N Counter
6. Binary Counter
7. BCD Counter
8. Decade Counter
9. Ring Counter
10. Johnson Counter
11. Counter State Diagram
12. Counter Overflow
13. Register
14. Parallel Load Register
15. Shift Register
16. Serial In Serial Out
17. Serial In Parallel Out
18. Parallel In Serial Out
19. Parallel In Parallel Out
20. Bidirectional Shift
21. Universal Shift Register
22. Enable Signal
23. Load Signal
24. Clear Signal
25. Register File
26. Datapath Concept
27. Control Unit
28. Register Transfer Level
29. RTL Notation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 8: Flip-Flops and Timing](../08-flip-flops-timing/index.md)
- [Chapter 9: Finite State Machine Fundamentals](../09-fsm-fundamentals/index.md)

---

## Introduction: Building Blocks That Remember and Count

Welcome to the chapter where flip-flops graduate from being solo performers to joining an orchestra! You've mastered individual flip-flops—those tiny one-bit memory cells that hold either a 0 or a 1. Now it's time to see what happens when you gang them together to create *registers* (memory units that remember entire words) and *counters* (circuits that can count events).

Think of a flip-flop as a single Post-It note that can remember one bit. A register is like a whole notebook—you can store eight bits, sixteen bits, or even more. A counter is like a mechanical tally counter at the door of a concert venue: click, click, click, keeping track of how many people entered.

But here's where it gets really exciting: registers and counters are the bread and butter of *datapath design*. The datapath is the part of a processor that actually moves and manipulates data—adding numbers, shifting bits, storing intermediate results. If the CPU were a kitchen, the datapath would be the prep station, cutting board, and mixing bowls where all the actual cooking happens.

By the end of this chapter, you'll understand how registers hold data, how counters sequence through states, and how the datapath ties it all together with a control unit calling the shots. You're building the foundation for understanding how computers actually compute!

Ready to start counting? Let's shift into high gear!

## Registers: Your Circuit's Notebook

### What is a Register?

A **Register** is a group of flip-flops that work together to store multiple bits of data as a single unit. While a single D flip-flop stores one bit, a register stores an entire binary word—typically 4, 8, 16, 32, or 64 bits wide.

Registers are fundamental building blocks in digital systems. Every piece of data your computer manipulates—from the characters you type to the pixels on your screen—passes through registers at some point.

Key characteristics of registers:

- **Parallel storage**: All flip-flops in the register share the same clock signal
- **Word-oriented**: The register stores and retrieves an entire word at once (or can shift data serially)
- **Controlled access**: Enable, load, and clear signals determine when and how data moves

Here's what an 8-bit register looks like conceptually:

| Bit Position | D₇ | D₆ | D₅ | D₄ | D₃ | D₂ | D₁ | D₀ |
|-------------|----|----|----|----|----|----|----|----|
| Flip-flop | FF₇ | FF₆ | FF₅ | FF₄ | FF₃ | FF₂ | FF₁ | FF₀ |
| Output | Q₇ | Q₆ | Q₅ | Q₄ | Q₃ | Q₂ | Q₁ | Q₀ |

When the clock edge arrives (and the register is enabled), all eight flip-flops simultaneously capture their respective input bits. The stored word is available at the Q outputs until the next load operation.

!!! tip "Registers vs. Memory"
    Registers and RAM both store data, but they serve different purposes. Registers are fast, expensive, and directly connected to the datapath—there are typically only a handful in a CPU. RAM is slower, cheaper per bit, and stores much more data. Think of registers as the items on your desk (immediately accessible) versus RAM as books on your bookshelf (requires walking over to retrieve).

### Control Signals: Enable, Load, and Clear

Registers don't just blindly capture data on every clock edge. They have control signals that determine their behavior:

#### Enable Signal

The **Enable Signal** (sometimes called Clock Enable, CE, or EN) controls whether the register responds to the clock. When enable is inactive, the register ignores clock edges and retains its current value—like putting the register on pause.

\[Q^+ = \begin{cases} D & \text{if } EN = 1 \\ Q & \text{if } EN = 0 \end{cases}\]

Enable is useful when:

- Multiple registers share a clock but should update at different times
- The register should hold its value while other processing occurs
- Power savings are needed (disabled flip-flops don't switch)

#### Load Signal

The **Load Signal** (sometimes called LD or LOAD) tells the register to capture new data from its inputs. This is often combined with enable functionality.

In some designs, load and enable are the same signal. In others, they're separate: enable might gate the clock while load selects between keeping the current value versus accepting new input.

A register with both enable and load might work like this:

| EN | LOAD | Behavior |
|----|------|----------|
| 0 | X | Hold (ignore clock) |
| 1 | 0 | Hold (clock active, no load) |
| 1 | 1 | Load new data |

#### Clear Signal

The **Clear Signal** (sometimes called CLR, RST, or RESET) forces all flip-flops in the register to 0, regardless of the data inputs. Clear can be:

- **Asynchronous**: Happens immediately when clear is asserted, ignoring the clock
- **Synchronous**: Happens on the next clock edge when clear is asserted

Asynchronous clear is essential for system reset—you need to establish a known state when power is applied. Synchronous clear is safer for normal operation since it avoids timing hazards.

\[Q^+ = \begin{cases} 0 & \text{if } CLR = 1 \\ D & \text{if } CLR = 0 \text{ and } LOAD = 1 \\ Q & \text{otherwise} \end{cases}\]

#### Diagram: Register Control Signals

<iframe src="../../sims/register-control-signals/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Register Control Signals Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use enable, load, and clear signals to control when and how a register stores data, predicting the register's behavior for different signal combinations.

Instructional Rationale: Interactive manipulation of control signals with immediate visual feedback on register contents builds intuition for how these signals interact.

Canvas Layout:

- Center: 4-bit register with visible flip-flop states
- Top: Data input switches (4 bits)
- Left: Control signal toggles (Enable, Load, Clear)
- Right: Output display showing stored value
- Bottom: Clock edge button and timing diagram

Interactive Elements:

- 4 toggle switches for data input (D3-D0)
- Enable toggle with indicator
- Load toggle with indicator
- Clear button (momentary)
- Clock edge button to trigger update
- Visual representation of flip-flop states
- Timing diagram showing signal relationships
- Prediction mode: guess output before clicking clock

Data Visibility:

- Current data input value (binary and hex)
- Current register contents (binary and hex)
- Control signal states
- What will happen on next clock edge
- Timing diagram showing history

Visual Style:

- Register shown as connected flip-flops
- Control signals as labeled input lines
- Data flows visualized with arrows
- Clear changes shown immediately vs synchronized
- Color: green=enabled, red=disabled, blue=data

Implementation: p5.js with register simulation and timing diagram
</details>

### Parallel Load Register

A **Parallel Load Register** accepts all input bits simultaneously (in parallel) on a clock edge. This is the most common type of register, used when you need to store a complete word of data at once.

The key feature is that all bits are loaded at the same instant—there's no sequential bit-by-bit transfer. When the load signal is active and the clock edge arrives, every flip-flop captures its corresponding input.

```
           ┌─────────────────────────────────────┐
           │         4-bit Parallel Load         │
D3 ────────┤─────►[D Q]─────────────────────────►│──── Q3
D2 ────────┤─────►[D Q]─────────────────────────►│──── Q2
D1 ────────┤─────►[D Q]─────────────────────────►│──── Q1
D0 ────────┤─────►[D Q]─────────────────────────►│──── Q0
           │          ▲     ▲     ▲              │
LOAD ──────┤──────────┘     │     │              │
CLR ───────┤────────────────┘     │              │
CLK ───────┤──────────────────────┘              │
           └─────────────────────────────────────┘
```

The behavior is straightforward:

| CLR | LOAD | Clock | Action |
|-----|------|-------|--------|
| 1 | X | ↑ | Q ← 0000 (synchronous clear) |
| 0 | 1 | ↑ | Q ← D (load data) |
| 0 | 0 | ↑ | Q ← Q (hold) |

In Verilog, a 4-bit parallel load register is elegantly simple:

```verilog
module parallel_load_reg (
    input wire clk,
    input wire clr,
    input wire load,
    input wire [3:0] d,
    output reg [3:0] q
);
    always @(posedge clk) begin
        if (clr)
            q <= 4'b0000;
        else if (load)
            q <= d;
        // else hold current value (implicit)
    end
endmodule
```

!!! note "Implicit Hold Behavior"
    When neither clear nor load is active, the register simply holds its value. In Verilog, this "else hold" behavior is implicit when you don't specify an else clause—the synthesis tool infers that Q should retain its value.

## Shift Registers: Data on the Move

While parallel load registers move data all at once, **Shift Registers** move data one bit at a time, shifting the contents left or right on each clock cycle. This seemingly simple operation enables an incredible range of applications, from serial communication to multiplication and division.

### The Four Flavors of Shift Registers

Shift registers come in four configurations, depending on how data enters and exits:

#### Serial In Serial Out (SISO)

A **Serial In Serial Out** shift register accepts one bit at a time at one end and outputs one bit at a time at the other end. Data flows through the register like cars in a tunnel—in one end, out the other.

```
Serial In → [D₀] → [D₁] → [D₂] → [D₃] → Serial Out
            ↑       ↑       ↑       ↑
            └───────┴───────┴───────┘
                      CLK
```

SISO registers are used for:

- **Delay lines**: Delay a signal by N clock cycles
- **Serial transmission**: Send data one bit at a time over a single wire
- **Circular buffers**: When output is fed back to input

The data takes N clock cycles to travel through an N-bit register—perfect when you need a precisely timed delay.

#### Serial In Parallel Out (SIPO)

A **Serial In Parallel Out** shift register accepts data one bit at a time but provides access to all stored bits simultaneously as outputs. Data streams in serially, then the complete word is read in parallel.

```
                    Q₃    Q₂    Q₁    Q₀
                     ↓     ↓     ↓     ↓
Serial In → [D₀] → [D₁] → [D₂] → [D₃]
                    ↑      ↑      ↑      ↑
                    └──────┴──────┴──────┘
                              CLK
```

SIPO is essential for:

- **Serial-to-parallel conversion**: Receive serial data (like UART), output parallel word
- **Data collection**: Gather bits over time, then process all at once
- **SPI/I2C receivers**: Accept data from serial bus, present as parallel byte

#### Parallel In Serial Out (PISO)

A **Parallel In Serial Out** shift register loads an entire word at once, then shifts it out one bit at a time. This is the opposite of SIPO—data enters in parallel and leaves serially.

```
           D₃    D₂    D₁    D₀
            ↓     ↓     ↓     ↓
          [D₀] → [D₁] → [D₂] → [D₃] → Serial Out
            ↑      ↑      ↑      ↑
LOAD ───────┴──────┴──────┴──────┘
CLK ───────────────────────────────
```

PISO is used for:

- **Parallel-to-serial conversion**: Take parallel word, transmit serially
- **SPI/UART transmitters**: Load byte to send, shift it out bit by bit
- **Reducing pin count**: Transmit 8 bits over 1 wire instead of 8

#### Parallel In Parallel Out (PIPO)

A **Parallel In Parallel Out** register is essentially the same as our parallel load register—data enters in parallel and exits in parallel. While it can also shift, the primary mode is complete word transfers.

```
           D₃    D₂    D₁    D₀
            ↓     ↓     ↓     ↓
          [FF] ─ [FF] ─ [FF] ─ [FF]
            ↓     ↓     ↓     ↓
           Q₃    Q₂    Q₁    Q₀
```

PIPO with shift capability is essentially a universal shift register (covered soon).

#### Diagram: Shift Register Modes Comparison

<iframe src="../../sims/shift-register-modes/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Shift Register Modes Interactive</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Compare

Learning Objective: Students will be able to compare SISO, SIPO, PISO, and PIPO shift register modes, explaining how data flows in each configuration and identifying appropriate applications.

Instructional Rationale: Side-by-side visualization of all four modes with animated data flow makes the distinctions clear and memorable.

Canvas Layout:

- Four columns, one for each mode (SISO, SIPO, PISO, PIPO)
- Each shows 4-bit register with input/output paths
- Bottom: shared clock control and data input
- Top: mode descriptions and use cases

Interactive Elements:

- Mode selector to highlight one mode at a time
- Clock edge button to shift data
- Serial input bit toggle (for SISO/SIPO)
- Parallel input switches (for PISO/PIPO)
- Animation showing data movement
- Step counter showing clock cycles elapsed
- Reset button

Data Visibility:

- Current register contents in all modes
- Input being entered
- Output being produced
- Clock cycle count
- Comparison of how same data appears in each mode

Visual Style:

- Consistent register representation across all modes
- Data bits as colored boxes moving through register
- Arrows showing data flow direction
- Highlight input and output paths differently
- Animation of bit-by-bit vs parallel transfer

Implementation: p5.js with four register simulations and synchronized clock
</details>

### Bidirectional Shift

A **Bidirectional Shift** register can shift data either left or right based on a direction control signal. This flexibility is valuable for arithmetic operations and data manipulation.

Direction control works like this:

| DIR | Action |
|-----|--------|
| 0 | Shift Right: Each bit moves to lower position, new bit enters at MSB |
| 1 | Shift Left: Each bit moves to higher position, new bit enters at LSB |

The implementation adds a multiplexer at each flip-flop's input:

```
For bit position i:
D[i] = (DIR == 0) ? Q[i+1] : Q[i-1]
```

On shift right, bit i receives the value from bit i+1 (the bit to its left).
On shift left, bit i receives the value from bit i-1 (the bit to its right).

!!! tip "Arithmetic with Shifts"
    Shifting left by one position multiplies by 2 (assuming no overflow). Shifting right by one position divides by 2 (with truncation). A bidirectional shift register can implement fast multiply/divide by powers of 2!

    - 0101 (5) shift left → 1010 (10)
    - 1100 (12) shift right → 0110 (6)

### Universal Shift Register

The **Universal Shift Register** combines all shift register capabilities into one versatile component. It can:

- Hold (no change)
- Load in parallel
- Shift left
- Shift right

This is controlled by a 2-bit mode select input:

| S₁ | S₀ | Mode |
|----|----|----|
| 0 | 0 | Hold (no change) |
| 0 | 1 | Shift Right |
| 1 | 0 | Shift Left |
| 1 | 1 | Parallel Load |

The universal shift register is a workhorse component in datapath design because it handles so many operations with a single piece of hardware.

#### Diagram: Universal Shift Register

<iframe src="../../sims/universal-shift-register/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Universal Shift Register Simulator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate all four modes of a universal shift register (hold, shift left, shift right, parallel load) by setting mode controls and observing the resulting data transformations.

Instructional Rationale: Interactive control over all modes with immediate visual feedback on register contents builds proficiency with this versatile component.

Canvas Layout:

- Center: 4-bit register with visible contents
- Top: Mode selector (4 options)
- Left: Serial inputs (left and right)
- Top-Center: Parallel data inputs
- Right: Outputs (parallel and serial)
- Bottom: Clock control and state history

Interactive Elements:

- Mode selection dropdown or buttons
- Parallel input data entry
- Serial input left bit toggle
- Serial input right bit toggle
- Clock edge button
- Clear button
- History panel showing last 8 states
- Mode indicator showing current operation

Data Visibility:

- Current mode selected
- Input values (parallel and serial)
- Current register contents
- What will happen on next clock edge
- Output values
- Operation history

Visual Style:

- Register as row of connected boxes
- Mode selection highlighted
- Data flow arrows appropriate for current mode
- Serial inputs at left/right ends
- Parallel outputs above each cell
- Animation for shift and load operations

Implementation: p5.js with 74194-style universal shift register simulation
</details>

The 74LS194 is a classic universal shift register IC that implements exactly this functionality. In FPGA and ASIC design, universal shift registers are synthesized from the behavioral description—you write what you want, and the tools figure out the multiplexers and flip-flops.

## Counters: Circuits That Count

Now let's turn to circuits that don't just store data—they sequence through values automatically. A **Counter** is a sequential circuit that goes through a predetermined sequence of states on successive clock pulses.

### What is a Counter?

At its core, a counter is an FSM with a simple, regular structure. Instead of arbitrary transitions between states, counters follow a counting sequence—typically incrementing or decrementing by one on each clock cycle.

Counters have applications everywhere:

- **Event counting**: How many button presses? How many pulses from a sensor?
- **Timing**: Count clock cycles to measure time intervals
- **Sequencing**: Generate control sequences for state machines
- **Address generation**: Step through memory addresses
- **Frequency division**: Clock output toggles at a fraction of input frequency

Key counter parameters:

| Parameter | Description |
|-----------|-------------|
| Modulus (mod-N) | Number of unique states (e.g., mod-8 counts 0-7) |
| Direction | Up, down, or up-down (bidirectional) |
| Type | Binary, BCD, ring, Johnson, etc. |
| Synchronous/Async | All flip-flops clock together or in cascade |

### Binary Counter

A **Binary Counter** counts in standard binary sequence. An n-bit binary counter has \(2^n\) states and counts from 0 to \(2^n - 1\) before wrapping around.

A 4-bit binary counter sequence:

| Clock Cycle | Q₃ | Q₂ | Q₁ | Q₀ | Decimal |
|-------------|----|----|----|----|---------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 2 | 0 | 0 | 1 | 0 | 2 |
| 3 | 0 | 0 | 1 | 1 | 3 |
| ... | ... | ... | ... | ... | ... |
| 14 | 1 | 1 | 1 | 0 | 14 |
| 15 | 1 | 1 | 1 | 1 | 15 |
| 16 | 0 | 0 | 0 | 0 | 0 (wrap) |

Notice how Q₀ toggles every clock cycle, Q₁ toggles every 2 cycles, Q₂ every 4 cycles, and Q₃ every 8 cycles. This is the natural binary counting pattern.

### Up Counter

An **Up Counter** increments its value by one on each clock pulse. Starting from 0, it counts upward: 0, 1, 2, 3, ... until it reaches its maximum value, then wraps back to 0.

The fundamental equation:

\[Count^+ = Count + 1\]

With wraparound:

\[Count^+ = (Count + 1) \mod 2^n\]

where n is the number of bits.

For a synchronous up counter, the design uses T flip-flops (or D flip-flops with XOR feedback):

- **Q₀**: Toggle every clock cycle (T₀ = 1)
- **Q₁**: Toggle when Q₀ = 1 (T₁ = Q₀)
- **Q₂**: Toggle when Q₀Q₁ = 1 (T₂ = Q₀ · Q₁)
- **Q₃**: Toggle when Q₀Q₁Q₂ = 1 (T₃ = Q₀ · Q₁ · Q₂)

The general pattern: bit i toggles when all lower bits are 1.

### Down Counter

A **Down Counter** decrements its value by one on each clock pulse. Starting from its maximum value, it counts downward: 15, 14, 13, ... 1, 0, then wraps to the maximum.

The fundamental equation:

\[Count^+ = Count - 1\]

With wraparound:

\[Count^+ = (Count - 1) \mod 2^n\]

For a down counter, the toggle conditions change:

- **Q₀**: Toggle every clock (same as up counter)
- **Q₁**: Toggle when Q₀ = 0 (T₁ = Q̄₀)
- **Q₂**: Toggle when Q₀Q₁ = 0 (T₂ = Q̄₀ · Q̄₁)
- **Q₃**: Toggle when Q₀Q₁Q₂ = 0 (T₃ = Q̄₀ · Q̄₁ · Q̄₂)

The pattern: bit i toggles when all lower bits are 0 (about to borrow).

### Up-Down Counter

An **Up-Down Counter** (also called a bidirectional counter) can count in either direction, controlled by a direction input (often called UP/DOWN or DIR).

| DIR | Action |
|-----|--------|
| 1 | Count up on clock edge |
| 0 | Count down on clock edge |

The toggle logic combines both conditions:

\[T_i = (DIR \cdot Q_0 \cdot Q_1 \cdots Q_{i-1}) + (\overline{DIR} \cdot \overline{Q_0} \cdot \overline{Q_1} \cdots \overline{Q_{i-1}})\]

This can be simplified using XOR:

\[T_i = Q_0 \oplus \overline{DIR}) \cdot (Q_1 \oplus \overline{DIR}) \cdots (Q_{i-1} \oplus \overline{DIR})\]

!!! note "Direction Changes Mid-Count"
    An up-down counter can reverse direction at any time. If you're counting up: 3, 4, 5... and suddenly change direction, you'll count down: 5, 4, 3... This is useful for applications like position tracking where the direction of motion can reverse.

#### Diagram: Up-Down Counter

<iframe src="../../sims/up-down-counter/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Up-Down Counter Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Practice

Learning Objective: Students will be able to practice operating an up-down counter by changing direction and observing the count sequence, including boundary behavior when wrapping.

Instructional Rationale: Interactive control over direction with visible count sequence and wrap behavior demonstrates bidirectional counting dynamics.

Canvas Layout:

- Center: 4-bit counter display (binary and decimal)
- Left: Direction control toggle (UP/DOWN)
- Right: Count history showing sequence
- Bottom: Clock control with enable

Interactive Elements:

- Direction toggle switch
- Clock step button
- Auto-clock mode with speed control
- Enable toggle to pause counting
- Clear/Reset button
- History panel showing last 16 values
- Visual indicator of count direction

Data Visibility:

- Current count (binary and decimal)
- Current direction
- Next value preview
- Count sequence history
- Overflow/underflow indicators

Visual Style:

- Binary display as row of bits
- Decimal display prominently
- Direction shown with arrow icon
- Count history as scrolling list or graph
- Wrap animation when reaching limits

Implementation: p5.js with bidirectional counter simulation
</details>

### Counter State Diagram

A **Counter State Diagram** shows the sequence of states a counter passes through and the transitions between them. For a simple counter, this forms a cycle.

A 3-bit up counter state diagram:

```
    ┌──────────────────────────────────────────┐
    │                                          │
    ▼                                          │
   000 ─────▶ 001 ─────▶ 010 ─────▶ 011       │
                                    │          │
                                    ▼          │
   111 ◀───── 110 ◀───── 101 ◀───── 100       │
    │                                          │
    └──────────────────────────────────────────┘
```

Every state has exactly one successor (the next count value), and the diagram forms a closed loop—the counter cycles forever.

For an up-down counter, the state diagram shows transitions in both directions, but only one direction is active at any time based on the DIR signal.

### Counter Overflow

**Counter Overflow** occurs when a counter reaches its maximum value and wraps around to zero (for up counters) or when it reaches zero and wraps to the maximum (for down counters).

Overflow is detected by:

- **Terminal count (TC)**: Signal that goes high when counter reaches its maximum
- **Ripple carry (RCO)**: Carry output for cascading counters

For a 4-bit up counter:

\[TC = Q_3 \cdot Q_2 \cdot Q_1 \cdot Q_0\]

TC = 1 only when count = 1111 (15).

For a down counter:

\[TC = \overline{Q_3} \cdot \overline{Q_2} \cdot \overline{Q_1} \cdot \overline{Q_0}\]

TC = 1 only when count = 0000 (0).

!!! warning "Overflow Handling"
    Counter overflow can be either a feature or a bug. For a free-running timer, you want it to wrap. For counting items in a buffer, overflow might indicate an error condition. Always consider what should happen when your counter maxes out!

Overflow detection enables:

- **Counter cascading**: Chain multiple counters for wider range
- **Event triggering**: Signal when a specific count is reached
- **Error detection**: Flag when a counted quantity exceeds limits

### Mod-N Counter

A **Mod-N Counter** counts from 0 to N-1, then resets to 0—it cycles through exactly N states. The "modulus" is the number of states before repeating.

Special cases:

- **Mod-16**: Standard 4-bit binary counter (cycles through 16 states)
- **Mod-10**: Decade counter (counts 0-9)
- **Mod-60**: Seconds or minutes counter (counts 0-59)
- **Mod-24**: Hours counter (counts 0-23)

To create a mod-N counter from a larger binary counter, you need to force a reset when the count reaches N:

```
           ┌─────────────────┐
           │    4-bit Up     │
CLK ───────┤    Counter      ├──── Q₃Q₂Q₁Q₀
           │                 │
   ┌───────┤ CLR             │
   │       └─────────────────┘
   │                │
   └────────────────┴──── When Q₃Q₂Q₁Q₀ = N, pulse CLR
```

For example, a mod-12 counter using a 4-bit counter:

\[CLR = Q_3 \cdot \overline{Q_2} \cdot Q_1 \cdot \overline{Q_0}\]

This detects 1100 (12) and resets the counter to 0000.

!!! tip "Glitch-Free Mod-N Design"
    The self-clearing method can cause a brief glitch (counter shows N for a tiny moment before resetting). For glitch-free operation, use synchronous design where the next-state logic directly computes the wraparound.

### BCD Counter and Decade Counter

A **BCD Counter** counts in Binary-Coded Decimal—each digit is represented by 4 bits, counting 0-9 only. This makes it easy to display counts in decimal.

A **Decade Counter** is a mod-10 counter that counts from 0 to 9, then resets. It's the building block for BCD counters.

Single decade counter sequence:

| Clock | Q₃ | Q₂ | Q₁ | Q₀ | Decimal |
|-------|----|----|----|----|---------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 2 | 0 | 0 | 1 | 0 | 2 |
| ... | ... | ... | ... | ... | ... |
| 9 | 1 | 0 | 0 | 1 | 9 |
| 10 | 0 | 0 | 0 | 0 | 0 (wrap) |

BCD counters cascade to count larger numbers. For a 2-digit display (00-99), you chain two decade counters:

```
CLK ─────┤ Units ├─────┤ Tens ├─────▶
          (0-9)   RCO   (0-9)   RCO
```

When the units counter rolls over from 9 to 0, its ripple carry increments the tens counter.

#### Diagram: BCD Decade Counter

<iframe src="../../sims/bcd-decade-counter/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>BCD Decade Counter with Display</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use BCD decade counters to count in decimal, observing the 0-9 cycle and understanding how the count is displayed.

Instructional Rationale: Visual connection between BCD bits and decimal display reinforces understanding of binary-coded decimal representation.

Canvas Layout:

- Center: 4-bit BCD register with individual bits shown
- Top: 7-segment display showing decimal digit
- Left: Clock control
- Right: Count history
- Bottom: Binary to decimal conversion table

Interactive Elements:

- Clock step button
- Auto-count mode with speed control
- Reset button
- Visual 7-segment display
- BCD bit indicators
- Invalid state indicator (for >9)
- Cascaded mode showing two digits

Data Visibility:

- Current BCD value (4 bits)
- Decimal digit displayed
- Next value preview
- Rollover indication when hitting 9
- Count cycle position (0-9)

Visual Style:

- Classic 7-segment display appearance
- BCD bits as LED-style indicators
- Rollover animation when 9→0
- Clear visual grouping of bits and display
- Color coding for active segments

Implementation: p5.js with decade counter and 7-segment rendering
</details>

### Ring Counter

A **Ring Counter** is a shift register with its output connected back to its input, forming a circular pattern. Only one bit is set to 1 at any time, and this 1 "rotates" around the register.

An 8-bit ring counter sequence:

| Clock | Q₇ | Q₆ | Q₅ | Q₄ | Q₃ | Q₂ | Q₁ | Q₀ |
|-------|----|----|----|----|----|----|----|----|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| 2 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| 3 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| 4 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| 5 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| 6 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| 7 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | (wrap)

Ring counter characteristics:

- **N flip-flops for N states**: Inefficient use of hardware
- **One-hot encoding**: Each state has exactly one bit set
- **Simple decoding**: State = which output is 1
- **Needs initialization**: Must set one bit to 1 at startup

Ring counters are used for:

- **Stepper motor control**: Activate one phase at a time
- **Round-robin arbitration**: Give each requestor a turn
- **Timing generators**: Create sequential timing pulses

### Johnson Counter

A **Johnson Counter** (also called a twisted ring counter or Möbius counter) is a ring counter with the complement of the last bit fed back to the first bit. This doubles the number of states compared to a ring counter.

An 4-bit Johnson counter sequence:

| Clock | Q₃ | Q₂ | Q₁ | Q₀ |
|-------|----|----|----|----|
| 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 |
| 2 | 1 | 1 | 0 | 0 |
| 3 | 1 | 1 | 1 | 0 |
| 4 | 1 | 1 | 1 | 1 |
| 5 | 0 | 1 | 1 | 1 |
| 6 | 0 | 0 | 1 | 1 |
| 7 | 0 | 0 | 0 | 1 |
| 8 | 0 | 0 | 0 | 0 | (wrap)

Johnson counter characteristics:

- **N flip-flops give 2N states**: Better than ring counter
- **Adjacent states differ by one bit**: Gray-code-like
- **Unused states**: N-bit Johnson uses 2N of 2^N possible states
- **Simple feedback**: Just invert the last output

The 2N states cycle through a pattern where 1s "fill in" from left to right, then 0s "fill in" the same way.

#### Diagram: Ring vs Johnson Counter Comparison

<iframe src="../../sims/ring-johnson-counters/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Ring vs Johnson Counter Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will be able to compare ring and Johnson counters, explaining the difference in feedback mechanism, state sequences, and the number of states each provides for a given number of flip-flops.

Instructional Rationale: Side-by-side visualization of both counter types with the same number of flip-flops highlights the key differences in feedback and state utilization.

Canvas Layout:

- Left: 4-bit ring counter with state sequence
- Right: 4-bit Johnson counter with state sequence
- Bottom: Shared clock control
- Center: State count comparison

Interactive Elements:

- Synchronized or independent clock stepping
- Clear/Reset to initial state
- Visual highlighting of feedback connection
- State sequence display (table or circular)
- Unused state indicator for Johnson
- Animation of bit flow

Data Visibility:

- Current state of both counters
- Feedback bit (normal vs inverted)
- Number of valid states (4 vs 8)
- State position in cycle
- State sequence history

Visual Style:

- Registers shown as connected flip-flops
- Feedback path prominently shown
- Inverter visible in Johnson counter path
- Current state highlighted
- State sequence as circular diagram

Implementation: p5.js with both counter simulations side by side
</details>

## Register Files: Organized Storage

A **Register File** is a collection of registers organized as an addressable array. Instead of accessing registers individually by name, you specify a register number (address), and the register file provides access to that register's data.

Register files are essential components in CPUs, where they hold operands for ALU operations. A typical instruction like "ADD R1, R2, R3" means "add the contents of register 2 and register 3, store in register 1."

Register file structure:

```
         ┌─────────────────────────────────┐
Write    │                                 │
Data ────┤ Register 0 (R0)                 │
         │ Register 1 (R1)                 │
Read     │ Register 2 (R2)                 ├──── Read Data A
Addr A ──┤ Register 3 (R3)                 │
         │ ...                             ├──── Read Data B
Read     │ Register N-1                    │
Addr B ──┤                                 │
         │                                 │
Write ───┤ WE (Write Enable)               │
Addr ────┤                                 │
         └─────────────────────────────────┘
```

Key features:

- **Multiple read ports**: Often 2 reads per cycle for two operands
- **One write port**: Typically one register written per cycle
- **Address decoding**: Select which register to access
- **Write enable**: Control when writes actually happen

A register file with 8 registers of 4 bits each:

| Parameter | Value |
|-----------|-------|
| Number of registers | 8 |
| Bits per register | 4 |
| Address width | 3 bits (log₂8) |
| Read ports | 2 |
| Write ports | 1 |

The address decoder selects which register to read or write:

| Address | Register |
|---------|----------|
| 000 | R0 |
| 001 | R1 |
| 010 | R2 |
| ... | ... |
| 111 | R7 |

#### Diagram: Register File

<iframe src="../../sims/register-file/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Register File Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use a register file by reading from two addresses simultaneously and writing to a third, understanding how the address lines select which register is accessed.

Instructional Rationale: Interactive read/write operations with visible address decoding builds understanding of how register files work in processor datapaths.

Canvas Layout:

- Center: Array of 8 registers showing contents
- Left: Read port A controls (address, output)
- Right: Read port B controls (address, output)
- Bottom: Write port controls (address, data, enable)
- Top: Clock and operation status

Interactive Elements:

- Read address A selector (0-7)
- Read address B selector (0-7)
- Write address selector (0-7)
- Write data input
- Write enable toggle
- Clock step button
- Read outputs displayed immediately
- Write happens on clock edge

Data Visibility:

- All register contents visible
- Selected registers highlighted
- Read values shown at ports
- Pending write indication
- Register address labels

Visual Style:

- Registers as row of labeled boxes
- Address selection as highlighting
- Read paths shown as lines from register to output
- Write path shown with data flowing to register
- Decoder represented visually

Implementation: p5.js with 8x4 register file simulation
</details>

## The Datapath: Where Computation Happens

Now we arrive at the grand synthesis: the **Datapath**. The datapath is the part of a digital system that performs data processing operations—arithmetic, logic, shifting, and data movement. It's the "doing" part of the processor.

### Datapath Concept

A **Datapath** consists of:

- **Registers**: Store operands and results
- **Functional units**: ALUs, shifters, multipliers that transform data
- **Interconnects**: Buses and multiplexers that route data between components
- **Control points**: Signals that select operations and data paths

The datapath is directed by the **Control Unit**, which provides the signals telling the datapath what to do each clock cycle.

```
             ┌──────────────────────────────────────────────┐
             │                 DATAPATH                      │
             │                                               │
             │  ┌────────┐      ┌─────┐      ┌────────┐     │
             │  │Register│─────▶│     │─────▶│Register│     │
Control ────▶│  │ File   │      │ ALU │      │  (Dest)│     │
Signals      │  │        │─────▶│     │      │        │     │
             │  └────────┘      └─────┘      └────────┘     │
             │       ▲             ▲              │          │
             │       │             │              │          │
             │       └─────────────┴──────────────┘          │
             │              Result Feedback                  │
             └──────────────────────────────────────────────┘
```

A simple datapath for executing R-type ALU instructions:

1. Read two operands from register file
2. Pass operands through ALU
3. Write result back to register file

All controlled by signals that specify which registers to read, what ALU operation to perform, and where to write the result.

### Control Unit

The **Control Unit** is the FSM that orchestrates the datapath. It generates the control signals that tell each datapath component what to do.

Control unit responsibilities:

- **Decode instructions**: Interpret what operation is requested
- **Sequence operations**: Multi-cycle operations require multiple steps
- **Generate control signals**: Enable registers, select MUX inputs, specify ALU operation
- **Handle special cases**: Branches, exceptions, stalls

The control unit is typically implemented as a finite state machine (as we learned in Chapter 9) or as a lookup table that maps instruction opcodes to control signals.

A simple control signal table:

| Instruction | RegWrite | ALUOp | MemRead | MemWrite |
|-------------|----------|-------|---------|----------|
| ADD | 1 | ADD | 0 | 0 |
| SUB | 1 | SUB | 0 | 0 |
| LOAD | 1 | ADD | 1 | 0 |
| STORE | 0 | ADD | 0 | 1 |

Each row defines the control signals for one instruction type.

!!! tip "Hardwired vs Microprogrammed Control"
    Control units come in two flavors:

    - **Hardwired**: Control logic is combinational logic—fast but inflexible
    - **Microprogrammed**: Control signals stored in a ROM—slower but easily modified

    Modern RISC processors use hardwired control. Complex CISC processors often use microprogrammed control for their complex instructions.

#### Diagram: Datapath with Control Unit

<iframe src="../../sims/datapath-control/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Datapath with Control Unit Visualization</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine how the control unit generates signals that direct data flow through the datapath, tracing the execution of simple operations through registers and functional units.

Instructional Rationale: Animated visualization of data movement through the datapath with highlighted control signals shows the connection between control and data operations.

Canvas Layout:

- Center: Simplified datapath (register file, ALU, multiplexers)
- Top: Instruction input and decode
- Right: Control signal panel showing active signals
- Bottom: Clock control and execution trace

Interactive Elements:

- Instruction selector (ADD, SUB, AND, OR, LOAD, STORE)
- Register file contents display
- Step through execution
- Control signals highlighted as they activate
- Data path highlighting showing active routes
- Result displayed after execution
- Multi-cycle instruction stepping

Data Visibility:

- Current instruction being executed
- Active control signals (color-coded)
- Data values on buses
- Register contents before and after
- ALU operation and result
- Memory address and data (for LOAD/STORE)

Visual Style:

- Block diagram style datapath
- Control signals as labeled lines with active/inactive coloring
- Data buses showing current values
- Active paths highlighted
- Control unit as separate FSM block
- Animation of data movement

Implementation: p5.js with simplified MIPS-style datapath simulation
</details>

## Register Transfer Level (RTL)

### What is RTL?

**Register Transfer Level** (RTL) is an abstraction that describes digital circuits in terms of:

- **Registers**: Storage elements that hold data
- **Transfers**: Movement of data between registers
- **Operations**: Transformations applied during transfer

RTL is the primary abstraction used in hardware description languages like Verilog and VHDL. When you write synthesizable Verilog, you're writing at the RTL level.

RTL abstracts away:

- Specific gate implementations
- Transistor-level details
- Physical placement and routing

RTL specifies:

- What registers exist
- When data transfers occur
- What operations are performed

Example RTL operations:

| RTL Expression | Meaning |
|----------------|---------|
| R1 ← R2 | Copy contents of R2 to R1 |
| R1 ← R2 + R3 | Add R2 and R3, store in R1 |
| R1 ← R1 << 1 | Shift R1 left by 1 bit |
| R1 ← M[R2] | Load memory at address R2 into R1 |

### RTL Notation

**RTL Notation** provides a standardized way to express register transfers:

- **Register names**: R0, R1, ACC, PC, MAR, etc.
- **Transfer operator**: ← (arrow pointing to destination)
- **Conditional transfers**: condition: R1 ← R2
- **Parallel transfers**: Separate with commas
- **Timing**: Transfers in one line happen simultaneously

Basic RTL notation examples:

**Unconditional transfer:**
```
R1 ← R2
```
Copy R2's contents to R1 on the next clock edge.

**Conditional transfer:**
```
Load: R1 ← M[MAR]
```
If Load signal is active, load memory contents at address MAR into R1.

**Transfer with operation:**
```
R1 ← R1 + R2
```
Add R1 and R2, store result in R1.

**Parallel transfers:**
```
R1 ← R2, R2 ← R1
```
Swap R1 and R2 (both transfers happen simultaneously on the same clock edge).

**Compound operations:**
```
T1: MAR ← PC
T2: MBR ← M[MAR], PC ← PC + 1
T3: IR ← MBR
```
Three-step instruction fetch sequence, one step per clock cycle.

!!! note "RTL vs Verilog"
    RTL notation is more abstract than Verilog. RTL says "what" without saying "how." Verilog is RTL notation with syntax strict enough that tools can synthesize hardware from it.

    RTL: `R1 ← R2 + R3`
    Verilog: `always @(posedge clk) R1 <= R2 + R3;`

#### Diagram: RTL Operations Visualizer

<iframe src="../../sims/rtl-operations/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>RTL Operations Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will be able to execute RTL operations step by step, predicting register contents after each transfer and understanding the difference between sequential and parallel transfers.

Instructional Rationale: Step-through execution of RTL statements with visible register state changes makes the abstract notation concrete.

Canvas Layout:

- Left: RTL statement sequence
- Center: Register bank showing current values
- Right: Transfer animation area
- Bottom: Clock control and execution trace

Interactive Elements:

- Select from predefined RTL sequences
- Step through transfers one at a time
- Highlight source and destination registers
- Show data flow animation
- Parallel transfer indicator
- Reset registers
- Edit register initial values

Data Visibility:

- Current RTL statement highlighted
- Source register(s) and values
- Operation being performed
- Destination register
- Before/after register values
- Transfer type (conditional, parallel, etc.)

Visual Style:

- Registers as labeled boxes with values
- Data flow as animated arrows
- Source highlighted in blue
- Destination highlighted in green
- Operation symbol shown on path
- Parallel transfers shown simultaneously

Implementation: p5.js with RTL interpreter and register visualization
</details>

### RTL Design Flow

RTL is the starting point for hardware implementation:

1. **Specification**: Define required behavior in words
2. **RTL description**: Express as register transfers
3. **HDL coding**: Translate RTL to Verilog/VHDL
4. **Synthesis**: Convert HDL to gate-level netlist
5. **Implementation**: Map to FPGA or fabricate as ASIC

This flow allows designers to think at a higher level of abstraction while still producing actual hardware.

## Putting It All Together: A Simple CPU Datapath

Let's see how registers, counters, and datapath concepts combine in a simple CPU:

**Components:**

- **PC (Program Counter)**: Register that holds the address of the next instruction
- **IR (Instruction Register)**: Register that holds the current instruction
- **Register File**: Holds operands and results
- **ALU**: Performs arithmetic and logic operations
- **Control Unit**: FSM that sequences operations

**Simplified fetch-execute cycle in RTL:**

```
// Fetch
T0: MAR ← PC
T1: IR ← M[MAR], PC ← PC + 1

// Decode (combinational, control unit interprets IR)

// Execute (example: ADD R1, R2, R3)
T2: A ← R[IR.rs1], B ← R[IR.rs2]
T3: R[IR.rd] ← A + B
```

This simple sequence shows:

- **Register transfers**: PC to MAR, memory to IR
- **Counter increment**: PC ← PC + 1
- **Parallel operations**: Fetch and increment happen together
- **Datapath routing**: Register file to ALU to register file

The control unit is an FSM that cycles through T0, T1, T2, T3 states, generating the appropriate control signals at each step.

## Summary and Key Takeaways

Congratulations! You've now mastered the building blocks that turn flip-flops into functional computer components. Let's review what you've learned:

**Registers:**

- Groups of flip-flops storing multi-bit words
- Control signals: Enable, Load, Clear
- Parallel load for simultaneous data capture

**Shift Registers:**

- SISO, SIPO, PISO, PIPO configurations
- Serial-to-parallel and parallel-to-serial conversion
- Bidirectional shift for left/right movement
- Universal shift register does it all

**Counters:**

- Up, down, and up-down counting
- Binary counters for standard sequences
- Mod-N counters for custom modulus
- BCD/decade counters for decimal display
- Ring and Johnson counters for special sequences
- Overflow/terminal count detection

**Datapath:**

- Registers + functional units + interconnects
- Controlled by the control unit FSM
- RTL describes register-to-register operations

**Register File:**

- Addressable array of registers
- Multiple read ports, typically one write port
- Foundation of processor register storage

**RTL Abstraction:**

- Describes circuits as register transfers
- Foundation for HDL coding and synthesis
- Bridges behavior and implementation

!!! success "The Big Picture"
    You now understand how simple flip-flops combine into registers that store data, counters that track sequences, and datapaths that process information. These are the building blocks inside every CPU, GPU, and digital system. When you hear "the processor fetched the instruction and incremented the program counter," you know exactly what's happening at the register transfer level!

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
An engaging graphic novel could follow the journey of a single byte of data as it travels through a computer system—from keyboard press to register to memory and back. The narrative could personify the registers as patient librarians, the counters as diligent timekeepers, and the control unit as the orchestra conductor coordinating everything. Key historical figures like Maurice Wilkes (who pioneered microprogramming) and John von Neumann (whose architecture defined the stored-program computer) could appear as mentors explaining why these abstractions matter. The climax could show the first successful execution of a simple program, with all the datapath components working in harmony.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: Shift Register Type"
    A communication receiver needs to accept data one bit at a time from a serial line, then process all 8 bits at once when a complete byte has arrived. Which type of shift register should be used?

    **Solution:**
    This requires a **Serial In Parallel Out (SIPO)** shift register. Data enters serially (one bit per clock), and after 8 clock cycles, all 8 bits are available at the parallel outputs for processing.

??? question "Problem 2: Counter Modulus"
    Design a counter that counts 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ... (mod-6). How many flip-flops are needed, and what value triggers the reset?

    **Solution:**
    A mod-6 counter needs 3 flip-flops (since \(2^2 = 4 < 6 \leq 8 = 2^3\)).

    The counter counts 000 → 001 → 010 → 011 → 100 → 101 → 000...

    Reset is triggered when the count reaches 110 (6 in binary):

    \[RESET = Q_2 \cdot Q_1 \cdot \overline{Q_0}\]

    Wait—that's 110 which is 6. But we want to reset *before* displaying 6. Using synchronous design, when the count is 101 (5), the next state should be 000 instead of 110.

??? question "Problem 3: Ring vs Johnson States"
    Compare the number of states in a 5-bit ring counter versus a 5-bit Johnson counter.

    **Solution:**
    - **5-bit Ring Counter**: 5 states (the single 1 rotates through 5 positions)
    - **5-bit Johnson Counter**: 10 states (2N = 2 × 5)

    The Johnson counter gets twice as many states from the same hardware because it fills with 1s then fills with 0s, creating 2N distinct patterns.

??? question "Problem 4: RTL Expression"
    Write the RTL expression for swapping the contents of registers R1 and R2 without using a temporary register.

    **Solution:**
    ```
    R1 ← R2, R2 ← R1
    ```

    In RTL, transfers listed on the same line (separated by commas) happen simultaneously on the same clock edge. Both R1 and R2 are read before either is written, enabling the swap without a temporary.

??? question "Problem 5: Universal Shift Register Mode"
    A 4-bit universal shift register contains 1010. The mode is set to "shift left" and the left serial input is 1. What is the register contents after one clock cycle?

    **Solution:**
    Shift left: Each bit moves to a higher position, and the serial input enters at the LSB.

    Before: 1010
    After: 0101 (the leftmost 1 shifts out, new 1 enters from right)

    Wait, let me reconsider. Shift left means:
    - Q3 ← Q2 (1 ← 0)
    - Q2 ← Q1 (0 ← 1)
    - Q1 ← Q0 (1 ← 0)
    - Q0 ← Serial_Left (0 ← 1)

    Result: **0101**

??? question "Problem 6: Register File Access"
    A register file has 16 registers and 2 read ports. How many address bits are needed for each read port? If a processor instruction specifies two source registers and one destination register, how many register address bits are in the instruction format?

    **Solution:**
    - Each port needs \(\log_2 16 = 4\) address bits
    - Total register address bits in instruction: 4 + 4 + 4 = **12 bits** (2 source addresses + 1 destination address)

    This is why RISC processors with 32 registers need 5-bit register fields, and instructions that specify 3 registers use 15 bits just for register addressing!

