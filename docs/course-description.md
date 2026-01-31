---
title: Digital Electronics Course Description
description: A sophomore-level digital electronics course covering ABET-aligned EE curricula
quality_score: 91
---

# Digital Electronics

This is a sophomore-level digital electronics course that covers the ABET-aligned EE curricula
for digital electronics.
This course feeds upper-division computer architecture, VLSI, and embedded systems courses.

Here are the topics covered roughly in the order they are taught.

## Intended Audience
College students that plan on becoming majors in electrical engineering or computer-related fields.

## Prerequisites
Calculus 1 is required for several of the advanced topics in this course.

## 1. Foundations: Boolean Algebra & Binary Logic

### Core concepts

* Binary number system (review, but formalized)
* Boolean variables, constants (0, 1)
* Boolean operators: AND, OR, NOT
* Truth tables as formal specifications
* Boolean expressions vs Boolean functions

### Boolean algebra laws (memorized + applied)

* Identity, Null, Idempotent
* Complement
* Commutative, Associative, Distributive
* Absorption
* De Morgan’s Theorems (very important)

### Why this matters

This is where **logical reasoning becomes mathematical**, and students learn that:

> *Digital circuits are physical realizations of Boolean functions.*

## 2. Logic Gates & Gate-Level Modeling

### Primitive gates

* NOT, AND, OR
* NAND, NOR (emphasized as **functionally complete**)
* XOR, XNOR

### Gate properties

* Functional completeness
* Gate delay (introductory timing intuition)
* Fan-in / fan-out (qualitative)
* Symbol conventions and schematics

### Gate-level abstraction

* Mapping Boolean expressions → gates
* Understanding that **NAND/NOR dominate real hardware**


## 3. Combinational Logic Design

### Canonical representations

* Sum-of-Products (SOP)
* Product-of-Sums (POS)
* Canonical vs minimal forms

### Standard combinational blocks

Students *design and analyze*:

* Multiplexers (MUX)
* Demultiplexers
* Encoders / Decoders
* Priority encoders
* Comparators
* Adders

  * Half adder
  * Full adder
  * Ripple-carry adder (conceptual)

### Design workflow

1. Problem statement
2. Truth table
3. Boolean expression
4. Simplification
5. Gate-level implementation
6. (Later) Verilog model


## 4. Logic Simplification & Optimization

### Algebraic simplification

* Manual application of Boolean laws
* Factoring and common-term extraction

### Karnaugh Maps (K-maps)

* 2-, 3-, and 4-variable K-maps
* Grouping rules
* Don’t-care conditions
* Minimal SOP / POS solutions

### Design tradeoffs

* Gate count vs clarity
* Depth vs width
* Cost, power, and delay (introductory, not transistor-level)


## 5. Introduction to Sequential Logic

This is the **big conceptual leap** of the course.

### Memory & state

* Difference between combinational and sequential logic
* Concept of *state*
* Clocked vs unclocked systems

### Latches

* SR latch
* D latch
* Level-sensitive behavior
* Why latches are dangerous in large designs

## 6. Flip-Flops & Clocked Storage

### Flip-flop types

* D flip-flop (primary focus)
* JK, T flip-flops (often covered conceptually)

### Timing concepts (qualitative)

* Clock edge
* Setup time
* Hold time
* Clock-to-Q delay
* Metastability (introduced, not deeply analyzed)

## 7. Synchronous Sequential Logic Design

This is **the heart of EE 2301**.

### Finite State Machines (FSMs)

* Moore machines
* Mealy machines
* State diagrams
* State tables
* State encoding (binary, one-hot — at least conceptually)

### FSM design process

1. Word problem → states
2. State diagram
3. State table
4. Next-state equations
5. Output equations
6. Implementation with flip-flops + combinational logic

### Common examples

* Counters (mod-N, up/down)
* Sequence detectors
* Controllers (traffic light, vending machine-style problems)

## 8. Registers, Counters, and Datapath Elements

### Registers

* Parallel registers
* Enable signals
* Load vs hold behavior

### Counters

* Synchronous counters
* Reset (synchronous vs asynchronous)
* Modulus control

### Datapath intuition

* Registers + combinational logic + control
* Early exposure to CPU-style thinking

## 9. Verilog HDL Modeling

This is where **software-thinking students shine**.

### Verilog basics

* Modules
* Ports (input/output)
* Wire vs reg
* Continuous assignments (`assign`)
* Procedural blocks (`always`)

### Modeling styles

* Combinational logic (`always @(*)`)
* Sequential logic (`always @(posedge clk)`)
* Structural vs behavioral modeling

### Testbenches

* Stimulus generation
* Observing outputs
* Simulation as verification

### Key learning outcome

Students learn that:

> **HDLs describe hardware behavior, not software execution.**

## 10. Design, Simulation, and Verification Flow

### Typical toolchain

* Verilog editor
* Simulator (ModelSim / Questa / similar)
* FPGA or logic lab hardware

### Concepts emphasized

* Separation of design and verification
* Debugging with waveforms
* Functional correctness before optimization

## 11. Integral Laboratory Component

The lab is *not optional or cosmetic*.

### Labs

* Breadboarding simple gate circuits (early)
* Using logic analyzers or FPGA boards
* Implementing combinational logic modules
* FSM implementations in Verilog
* Testing with switches, LEDs, clocks

### Skills developed

* Translating theory → working hardware
* Debugging timing and logic errors
* Working within constraints (pins, clocks, resets)

## 12. Professional & Programmatic Outcomes

By the end of EE 2301, students can:

* Think in **Boolean abstractions**
* Design **correct, clocked digital systems**
* Read and write **Verilog**
* Understand how **hardware differs fundamentally from software**
* Prepare for:

  * Computer architecture
  * Embedded systems
  * VLSI / FPGA design
  * Operating systems (indirectly)

## Topics Not Covered

Important boundary clarification:

* ❌ No transistor-level CMOS design
* ❌ No asynchronous circuit theory
* ❌ No advanced timing closure or synthesis
* ❌ No CPU pipeline design

These topics will come later — this course builds the **mental scaffolding**.

## Why EE 2301 Is a Pivot Course

This course is where students stop thinking:

> "The computer just runs code"

…and start thinking:

> "The computer *is* a carefully synchronized state machine built from logic."

## Learning Objectives

After completing this course, students will be able to:

### Remember

- Recall the truth tables for all primitive logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)
- List the fundamental Boolean algebra laws (Identity, Null, Idempotent, Complement, Commutative, Associative, Distributive, Absorption)
- State De Morgan's Theorems
- Identify the symbols for standard logic gates
- Name the timing parameters for flip-flops (setup time, hold time, clock-to-Q delay)

### Understand

- Explain the difference between combinational and sequential logic
- Describe how Boolean expressions map to physical gate implementations
- Interpret truth tables and state diagrams
- Distinguish between Moore and Mealy state machines
- Explain why NAND and NOR gates are functionally complete
- Describe the concept of metastability in digital systems

### Apply

- Use Karnaugh maps to simplify Boolean expressions up to 4 variables
- Apply Boolean algebra laws to reduce logic expressions
- Implement combinational circuits using standard blocks (MUX, decoders, adders)
- Design finite state machines from word problem specifications
- Write synthesizable Verilog code for combinational and sequential logic
- Use simulation tools to verify digital designs

### Analyze

- Analyze timing diagrams to identify setup and hold violations
- Decompose complex digital systems into combinational and sequential components
- Trace signal propagation through multi-level logic circuits
- Debug logic errors using waveform analysis
- Examine FSM state transitions for correctness and completeness

### Evaluate

- Compare design tradeoffs between gate count, propagation delay, and power consumption
- Assess whether a circuit implementation meets functional specifications
- Critique state encoding choices (binary vs. one-hot) for specific applications
- Judge the quality of Verilog code for clarity and synthesizability
- Evaluate when to use latches versus flip-flops in a design

### Create

- Design complete synchronous digital systems from specifications
- Construct testbenches to verify Verilog module functionality
- Develop FSM-based controllers for real-world applications (traffic lights, vending machines)
- Build working circuits on breadboards and FPGA platforms
- Synthesize optimized gate-level implementations from behavioral descriptions

