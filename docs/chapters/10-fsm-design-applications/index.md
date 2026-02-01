---
title: FSM Design and Applications
description: Applying FSM theory to practical design problems from specification to implementation
generated_by: claude skill chapter-content-generator
date: 2026-01-31 21:30:00
version: 0.03
---

# FSM Design and Applications

## Summary

This chapter applies FSM theory to practical design problems, teaching students the complete workflow from specification to implementation. Students will learn to derive next-state and output equations from state tables, follow the systematic FSM design process, and verify FSM designs for correctness. The chapter includes practical applications including sequence detectors with overlapping and non-overlapping detection modes, pattern recognition FSMs, and classic controller examples such as traffic light controllers and vending machine FSMs.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

1. Next State Equation
2. Output Equation
3. FSM Design Process
4. FSM Verification
5. Sequence Detector
6. Pattern Recognition FSM
7. Overlapping Detection
8. Non-Overlapping Detection
9. Traffic Light Controller
10. Vending Machine FSM

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Finite State Machine Fundamentals](../09-fsm-fundamentals/index.md)

---

## Introduction: From Blueprint to Building

In Chapter 9, you learned the vocabulary and grammar of finite state machines—states, transitions, Moore versus Mealy, encoding strategies. You learned to *read* state diagrams like a native speaker. Now it's time to *write* them.

Think of it this way: Chapter 9 taught you what an FSM *is*. This chapter teaches you what you can *do* with one.

Consider your morning routine. You probably have a fairly systematic process: alarm rings, you decide whether to snooze (a decision based on current state and inputs!), eventually you get up, shower, dress, eat, and leave. Each step depends on completing the previous one. You're running a finite state machine in your head—and you've been doing it since before you could spell "sequential logic."

The magic happens when we translate these human-intuitive processes into digital hardware. That's what this chapter is about: taking a word problem ("build me a traffic light controller") and systematically transforming it into flip-flops and gates that actually work.

By the end of this chapter, you'll be able to:

- Derive Boolean equations for next-state and output logic
- Follow a systematic design process from specification to implementation
- Build sequence detectors that find patterns in data streams
- Design real-world controllers like traffic lights and vending machines
- Verify that your FSM actually does what the specification says

Ready to become an FSM architect? Let's build something!

## Next State Equation: The Heart of Sequential Logic

The **next state equation** is a Boolean expression that computes what state the FSM will enter on the next clock edge, based on the current state and inputs.

Remember from Chapter 9 that FSMs have this fundamental structure:

\[S^+ = f(S, I)\]

Where \(S^+\) is the next state, \(S\) is the current state, and \(I\) represents the inputs. The next state equation is simply the Boolean implementation of this function \(f\).

Since states are stored in flip-flops, and we typically use D flip-flops, the next state equation directly gives us the D input for each flip-flop:

\[D_i = f_i(Q_{n-1}, Q_{n-2}, ..., Q_0, inputs)\]

Here's the practical insight: the next state equation is *just combinational logic*. You've been designing combinational circuits since Chapter 4. The only difference is that some of the inputs to this combinational circuit happen to be the outputs of flip-flops.

### Deriving Next State Equations: A Worked Example

Let's derive next state equations for a simple 3-state FSM that detects the input sequence "01":

| State | Encoding (Q1 Q0) | Meaning |
|-------|-----------------|---------|
| IDLE | 00 | Waiting for 0 |
| SAW_0 | 01 | Just saw 0, looking for 1 |
| FOUND | 10 | Pattern detected! |

State transition table:

| Current State | Q1 Q0 | Input X | Next State | Q1+ Q0+ |
|--------------|-------|---------|------------|---------|
| IDLE | 00 | 0 | SAW_0 | 01 |
| IDLE | 00 | 1 | IDLE | 00 |
| SAW_0 | 01 | 0 | SAW_0 | 01 |
| SAW_0 | 01 | 1 | FOUND | 10 |
| FOUND | 10 | 0 | SAW_0 | 01 |
| FOUND | 10 | 1 | IDLE | 00 |

Now we can derive \(Q_1^+\) and \(Q_0^+\) using K-maps or inspection.

For \(Q_1^+\) (when does \(Q_1\) become 1?):

Looking at the table, \(Q_1^+ = 1\) only when we're in SAW_0 (Q1=0, Q0=1) and X=1.

\[Q_1^+ = \overline{Q_1} \cdot Q_0 \cdot X\]

For \(Q_0^+\) (when does \(Q_0\) become 1?):

\(Q_0^+ = 1\) in these cases:

- IDLE with X=0: \(\overline{Q_1} \cdot \overline{Q_0} \cdot \overline{X}\)
- SAW_0 with X=0: \(\overline{Q_1} \cdot Q_0 \cdot \overline{X}\)
- FOUND with X=0: \(Q_1 \cdot \overline{Q_0} \cdot \overline{X}\)

Simplifying (notice \(\overline{X}\) is common to all terms):

\[Q_0^+ = \overline{X}\]

That's a beautiful result—the next value of Q0 is simply the complement of the input!

#### Diagram: Next State Equation Derivation

<iframe src="../../sims/next-state-derivation/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Next State Equation Derivation Tool</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Derive

Learning Objective: Students will be able to derive next-state equations from a state transition table by identifying when each flip-flop output should be 1 and expressing it as a Boolean function of current state and inputs.

Instructional Rationale: Step-by-step derivation with K-map visualization shows how the abstract state table becomes concrete Boolean equations, making the connection between specification and implementation explicit.

Canvas Layout:

- Left panel: Editable state transition table
- Center panel: K-maps for each next-state variable
- Right panel: Derived equations with simplification steps
- Bottom: Generated circuit showing next-state logic

Interactive Elements:

- Edit state table entries and see K-maps update
- Click K-map cells to see corresponding table rows
- Toggle between SOP and POS forms
- Show/hide simplification steps
- Compare unsimplified vs simplified equations
- Verify equation against original table

Data Visibility:

- State table with binary encoding
- K-map with grouped terms highlighted
- Boolean equation in multiple forms
- Gate count for each form
- Verification results

Visual Style:

- Clean tabular display
- K-maps with standard grouping colors
- Equations rendered in readable format
- Circuit schematic with labeled connections
- Color-coded correspondence between table, K-map, and equation

Implementation: p5.js with K-map solver and equation simplification
</details>

!!! tip "K-maps Are Your Best Friend"
    For FSMs with 2-4 state variables and a few inputs, K-maps are the fastest way to derive minimized next-state equations. For larger FSMs, let synthesis tools do the heavy lifting—but understanding K-maps helps you verify the tools are giving you good results.

## Output Equation: Speaking to the Outside World

The **output equation** computes the FSM's outputs based on the current state (for Moore machines) or the current state and inputs (for Mealy machines).

For a Moore machine:

\[Output = g(S)\]

For a Mealy machine:

\[Output = h(S, I)\]

Just like next-state equations, output equations are pure combinational logic. The only difference is what they depend on.

### Moore Output Equations

For our sequence detector, let's make it a Moore machine where the output Z indicates "pattern found":

| State | Encoding (Q1 Q0) | Output Z |
|-------|-----------------|----------|
| IDLE | 00 | 0 |
| SAW_0 | 01 | 0 |
| FOUND | 10 | 1 |

The output equation is simply:

\[Z = Q_1 \cdot \overline{Q_0}\]

Or, since we're only using encoding 10 for FOUND (and 11 is unused), we could simplify to:

\[Z = Q_1\]

This works because the only state where Q1=1 is FOUND.

### Mealy Output Equations

If we redesign as a Mealy machine, we can output Z=1 *during* the transition from SAW_0 to FOUND, not after:

| Current State | Q1 Q0 | Input X | Output Z |
|--------------|-------|---------|----------|
| IDLE | 00 | 0 | 0 |
| IDLE | 00 | 1 | 0 |
| SAW_0 | 01 | 0 | 0 |
| SAW_0 | 01 | 1 | 1 |
| FOUND | 10 | 0 | 0 |
| FOUND | 10 | 1 | 0 |

The output equation:

\[Z = \overline{Q_1} \cdot Q_0 \cdot X\]

Notice how the Mealy output depends on the input X as well as the state. The output activates *immediately* when we're in SAW_0 and see a 1, rather than waiting for the next clock cycle.

#### Diagram: Moore vs Mealy Output Timing

<iframe src="../../sims/moore-mealy-output-timing/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Moore vs Mealy Output Timing Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will be able to compare the timing behavior of Moore and Mealy output equations by observing when outputs change relative to clock edges and input changes.

Instructional Rationale: Side-by-side timing diagrams of the same FSM implemented as both Moore and Mealy clearly demonstrates the one-clock-cycle latency difference.

Canvas Layout:

- Top: Shared input waveform and clock
- Middle: Moore implementation with state and output waveforms
- Bottom: Mealy implementation with state and output waveforms
- Right: Equation display for each implementation

Interactive Elements:

- Play/pause simulation
- Step through clock cycles
- Toggle input values
- Highlight the timing difference when pattern is detected
- Show output equations for each type
- Marker showing the one-cycle difference

Data Visibility:

- Clock waveform
- Input X waveform
- Moore: state waveform, output waveform (synchronized to clock)
- Mealy: state waveform, output waveform (reacts to input)
- Annotations showing cause of each output change

Visual Style:

- Standard timing diagram format
- Color coding: clock (black), input (blue), state (green), output (red)
- Vertical dotted lines at clock edges
- Highlight boxes around timing differences
- Equations displayed alongside waveforms

Implementation: p5.js with synchronized timing diagram animation
</details>

## The FSM Design Process: Your Recipe for Success

The **FSM design process** is a systematic methodology for transforming a word problem into a working digital circuit. Following this process consistently helps you avoid errors and ensures your design is complete.

Here's the step-by-step recipe:

**Step 1: Understand the Specification**

- What are the inputs? (names, meanings, timing)
- What are the outputs? (names, meanings, when they should activate)
- What behavior is required? (sequences, conditions, edge cases)
- Moore or Mealy? (do outputs need immediate response?)

**Step 2: Define the States**

- What does the system need to "remember"?
- Each distinct memory configuration is a state
- Give states meaningful names
- Identify the initial/reset state

**Step 3: Draw the State Diagram**

- Draw circles for each state
- Add transitions with input conditions
- Label outputs (inside states for Moore, on arrows for Mealy)
- Mark the initial state with an arrow

**Step 4: Create the State Table**

- List every state × input combination
- Fill in next state for each combination
- Fill in outputs (checking Moore vs Mealy)
- Verify every row is complete—no missing cases!

**Step 5: Choose State Encoding**

- Binary: minimum flip-flops, more complex logic
- One-hot: one flip-flop per state, simpler logic
- Gray: single-bit transitions, good for certain patterns
- Consider synthesis target (ASIC vs FPGA)

**Step 6: Derive Next-State Equations**

- Create K-maps or truth tables for each flip-flop D input
- Minimize the equations
- Verify against original state table

**Step 7: Derive Output Equations**

- Create K-maps from output columns
- Moore: function of state bits only
- Mealy: function of state bits AND inputs
- Minimize the equations

**Step 8: Implement the Circuit**

- D flip-flops for state register
- Combinational logic for next-state equations
- Combinational logic for output equations
- Reset logic for initialization

**Step 9: Verify the Design**

- Simulate with test vectors
- Check every transition
- Verify reset behavior
- Test edge cases and error conditions

#### Diagram: FSM Design Process Flowchart

<iframe src="../../sims/fsm-design-process/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive FSM Design Process</summary>
Type: workflow

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will be able to execute the complete FSM design process by following the systematic workflow from specification through implementation, producing a verified circuit design.

Instructional Rationale: An interactive workflow that guides students through each design step, with validation at each stage, builds confidence and reinforces the systematic approach.

Canvas Layout:

- Left sidebar: Process steps (9 steps) with progress indicators
- Main area: Current step workspace
- Right sidebar: Accumulated design artifacts
- Bottom: Navigation and validation controls

Interactive Elements:

- Select from example problems or enter custom specification
- Guided workspace for each step
- Automatic validation before advancing
- View and edit previous steps
- Generate artifacts (state diagram, table, equations, circuit)
- Final verification simulation

Data Visibility:

- Current step requirements and guidance
- Design artifacts generated so far
- Validation status for each step
- Consistency checks between artifacts
- Error messages with hints

Visual Style:

- Clean step-by-step interface
- Progress bar showing completion
- Checkmarks for validated steps
- Artifacts displayed with clear formatting
- Final circuit schematic at completion

Implementation: p5.js with multi-stage design environment
</details>

The design process might seem like a lot of steps, but each step is straightforward on its own. The key is to be systematic and complete each step fully before moving to the next. Skipping steps or combining them often leads to errors that are hard to track down later.

!!! warning "Complete Every Row"
    The most common FSM design error is leaving holes in the state table—undefined behavior for some state × input combination. When you implement the circuit, these cases will have *some* behavior (probably not what you wanted). Always check that every row is filled in!

## FSM Verification: Trust but Verify

**FSM verification** is the process of confirming that an FSM implementation correctly matches its specification. Verification catches errors before they become bugs in silicon.

Verification happens at multiple levels:

### Specification-Level Verification

Before you even start implementing, verify your state diagram/table against the original requirements:

- Does the FSM handle every input condition?
- Are all edge cases covered?
- Is the reset behavior correct?
- Do the outputs match what's expected?

### Implementation Verification

After deriving equations and implementing the circuit:

- **Equation checking**: Do the next-state equations produce the correct next state for every table row?
- **Output checking**: Do output equations produce correct outputs for every state (Moore) or state+input (Mealy)?
- **Coverage**: Have you tested every transition, not just the "interesting" ones?

### Simulation Verification

Create test vectors that exercise the FSM:

1. **Reset test**: Apply reset, verify initial state
2. **All-transitions test**: Visit every transition at least once
3. **Sequence tests**: Apply known input sequences, verify output sequences
4. **Corner case tests**: What happens with unusual input patterns?

A useful verification approach is **exhaustive testing** for small FSMs: apply every possible input sequence up to some length and verify correct behavior. For a 4-state FSM with 1 input, there are only \(4 \times 2 = 8\) state-input combinations to test.

#### Diagram: FSM Verification Simulator

<iframe src="../../sims/fsm-verification/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>FSM Verification and Testing Tool</summary>
Type: microsim

Bloom Level: Evaluate (L5)
Bloom Verb: Validate

Learning Objective: Students will be able to validate an FSM implementation by applying test vectors, comparing actual behavior to expected behavior, and identifying any discrepancies between specification and implementation.

Instructional Rationale: Interactive verification where students can test their own FSM designs builds debugging skills and reinforces the importance of systematic testing.

Canvas Layout:

- Left: FSM specification (state diagram or table)
- Center: Test vector input area and simulation controls
- Right: Results display with pass/fail indicators
- Bottom: Detailed trace showing expected vs actual

Interactive Elements:

- Enter or load FSM specification
- Input test vectors manually or auto-generate
- Run single test or batch test
- Compare expected output to actual output
- Highlight failing tests
- Show transition trace for debugging
- Coverage report showing tested transitions

Data Visibility:

- Test vector (input sequence)
- Expected state sequence
- Actual state sequence
- Expected output sequence
- Actual output sequence
- Pass/fail status for each vector
- Overall coverage metrics

Visual Style:

- Clear tabular test results
- Green/red highlighting for pass/fail
- State diagram with tested transitions highlighted
- Coverage percentage display
- Detailed error messages for failures

Implementation: p5.js with FSM simulator and test framework
</details>

### Formal Verification (Brief Introduction)

For critical applications (aerospace, medical, automotive), simulation isn't enough. **Formal verification** uses mathematical techniques to *prove* that the implementation matches the specification for *all* possible inputs, not just the ones you tested.

Tools like model checkers can verify properties such as:

- "The FSM never enters state X if input Y has been seen"
- "From every reachable state, the FSM can eventually return to IDLE"
- "Output Z is never asserted for more than 3 consecutive cycles"

Formal verification is beyond the scope of this course, but knowing it exists is valuable. When you're designing the braking system for a car, "we tested it a bunch and it seemed to work" isn't good enough!

!!! tip "Test the Transitions, Not Just the States"
    A common verification mistake is testing that the FSM can reach each state, without testing all the transitions. An FSM might correctly reach states A, B, and C, but have a bug in the transition from B to C when input X=1. Test every edge in the state diagram.

## Sequence Detector: Finding Patterns in Data Streams

A **sequence detector** is an FSM that monitors an input stream and outputs a signal when a specific pattern is detected. Sequence detectors are fundamental building blocks in:

- Serial communication (detecting start bits, patterns, framing)
- Pattern matching (searching data for signatures)
- Protocol decoding (recognizing command sequences)
- Security (detecting attack signatures)

The basic structure of a sequence detector:

- **One input bit** (the data stream)
- **One output bit** (asserted when pattern found)
- **States** representing "how much of the pattern we've seen"

Let's design a detector for the pattern "101":

**States:**

- S0 (IDLE): Haven't matched anything useful
- S1: Just saw "1"
- S2: Just saw "10"
- S3: Just saw "101" — pattern found!

The key insight is that each state represents *partial progress* toward the complete pattern. We need to track how many bits of the target pattern we've successfully matched.

**State Diagram:**

```
        ┌─0─┐                            ┌─1─┐
        │   ▼                            │   ▼
   ┌─────────┐    1    ┌─────────┐   0   ┌─────────┐   1   ┌─────────┐
──▶│   S0    │────────▶│   S1    │──────▶│   S2    │──────▶│   S3    │
   │  out=0  │         │  out=0  │       │  out=0  │       │  out=1  │
   └─────────┘         └─────────┘       └─────────┘       └─────────┘
        ▲                   │ 1              ▲ 0               │
        │                   │                │                 │
        │                   └── stays ───────┘                 │
        └──────────────────────────────────────────────────────┘
```

Wait—that diagram has a problem! What happens after we detect the pattern? We need to define transitions from S3 back into the pattern matching process. This brings us to an important distinction...

## Overlapping Detection vs Non-Overlapping Detection

When designing sequence detectors, you must decide: after detecting the pattern, can a new pattern *overlap* with the one just found?

### Non-Overlapping Detection

In **non-overlapping detection**, after detecting a pattern, the FSM resets and starts looking for a completely new occurrence. No part of the just-detected pattern can be used for the next detection.

For pattern "101" with non-overlapping detection:

Input stream: `1 0 1 0 1 0 1`
             `  ↑---↑     ↑---↑`
             `  First     Second`
             `  detect    detect`

The FSM resets after each detection, so "101**01**" doesn't count as two overlapping "101" patterns.

### Overlapping Detection

In **overlapping detection**, the suffix of one detected pattern can be the prefix of the next. This is useful when patterns can share characters.

For pattern "101" with overlapping detection:

Input stream: `1 0 1 0 1`
             `  ↑---↑`
             `  First detect`
             `      ↑---↑`
             `      Second detect!`

After detecting "101", we've already seen "1"—the start of another potential "101"! The overlapping detector recognizes this and immediately starts matching from S1, not S0.

### Implementation Differences

The difference is in the transitions *from* the detection state:

**Non-overlapping (S3 always goes back to start):**

| From S3 | Input | Next State |
|---------|-------|------------|
| S3 | 0 | S0 |
| S3 | 1 | S0 |

**Overlapping (S3 considers the input as potentially starting new pattern):**

| From S3 | Input | Next State |
|---------|-------|------------|
| S3 | 0 | S2 (we just saw "1", now "10") |
| S3 | 1 | S1 (the "1" starts a new pattern) |

In the overlapping case, the "1" at the end of "101" is *reused* as the beginning of the next potential "101".

#### Diagram: Overlapping vs Non-Overlapping Detector

<iframe src="../../sims/overlap-detection-compare/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Overlapping vs Non-Overlapping Sequence Detection</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students will be able to differentiate between overlapping and non-overlapping sequence detection by comparing how each approach handles input streams where patterns share prefix/suffix characters.

Instructional Rationale: Side-by-side comparison with the same input stream shows exactly when and why the two approaches produce different outputs.

Canvas Layout:

- Top: Input stream display with editable bits
- Middle-left: Non-overlapping detector state diagram and trace
- Middle-right: Overlapping detector state diagram and trace
- Bottom: Output comparison showing detection events

Interactive Elements:

- Edit input stream or use preset patterns
- Step through one bit at a time
- Run automatically
- Highlight current state in both diagrams
- Show when outputs differ
- Count total detections for each type
- Choose different patterns to detect

Data Visibility:

- Input bit stream with position marker
- Current state for both detectors
- Output signal for both detectors
- Detection count for both
- Visual highlighting when they differ
- Transition history

Visual Style:

- Parallel state diagrams with current state highlighted
- Input stream as horizontal bit sequence
- Output waveforms below each detector
- Color coding when outputs differ
- Detection markers on input stream

Implementation: p5.js with dual FSM simulation
</details>

Here's a practical example. Searching a string for all occurrences of "AA":

- In "AAA", non-overlapping finds ONE match (positions 0-1), then resets
- In "AAA", overlapping finds TWO matches (positions 0-1 AND positions 1-2)

Which one you use depends on the application. For searching DNA sequences, you probably want overlapping. For framing serial data, you probably want non-overlapping.

!!! note "Overlap Requires Careful Transition Design"
    The tricky part of overlapping detection is figuring out where to go after detecting the pattern. You need to ask: "After seeing the complete pattern, what state would I be in if this last portion had been the start of a new pattern?" The answer often requires reusing suffix as prefix.

## Pattern Recognition FSM: Beyond Simple Sequences

A **pattern recognition FSM** extends the sequence detector concept to more complex patterns, possibly with multiple input bits, wildcards, or alternative paths.

While simple sequence detectors look for a fixed string like "101", pattern recognition FSMs can handle:

- **Multiple input bits**: Pattern "AB" where A and B are different inputs
- **Don't-care positions**: Pattern "1X1" matching "101" or "111"
- **Alternative patterns**: Detect "101" OR "110"
- **Counted repetitions**: Detect "1" repeated 3 or more times
- **Complex protocols**: Handshake sequences with acknowledgments

### Example: Detecting "Rising Edge"

A simple but useful pattern recognizer detects a "rising edge"—the input transitioning from 0 to 1.

**States:**

- LOW: Input was 0 on last cycle
- HIGH: Input was 1 on last cycle

**Transitions and Outputs (Mealy):**

| State | Input | Next State | Output (edge detected) |
|-------|-------|------------|------------------------|
| LOW | 0 | LOW | 0 |
| LOW | 1 | HIGH | 1 ← Edge detected! |
| HIGH | 0 | LOW | 0 |
| HIGH | 1 | HIGH | 0 |

This 2-state FSM produces a one-cycle pulse whenever the input transitions from 0 to 1. Simple, useful, and found in countless digital designs.

### Example: Detecting Either "00" or "11"

Let's design a pattern FSM that detects two consecutive identical bits:

**States:**

- IDLE: Just started or just detected (waiting)
- SAW_0: Last bit was 0
- SAW_1: Last bit was 1

**Transitions (Moore machine):**

| State | Input | Next State | Output |
|-------|-------|------------|--------|
| IDLE | 0 | SAW_0 | 0 |
| IDLE | 1 | SAW_1 | 0 |
| SAW_0 | 0 | IDLE | 1 (detected "00") |
| SAW_0 | 1 | SAW_1 | 0 |
| SAW_1 | 0 | SAW_0 | 0 |
| SAW_1 | 1 | IDLE | 1 (detected "11") |

This FSM has *two paths* to the detection output—one through SAW_0 and one through SAW_1. Pattern FSMs often have this multi-path structure.

#### Diagram: Pattern Recognition FSM Builder

<iframe src="../../sims/pattern-fsm-builder/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Pattern Recognition FSM Design Tool</summary>
Type: microsim

Bloom Level: Create (L6)
Bloom Verb: Design

Learning Objective: Students will be able to design pattern recognition FSMs by specifying target patterns (including multi-bit inputs, alternatives, and don't-cares) and generating the corresponding state diagram and implementation.

Instructional Rationale: Creative tool for designing custom pattern FSMs lets students explore how different pattern requirements affect FSM complexity and structure.

Canvas Layout:

- Top: Pattern specification input (with syntax for alternatives, wildcards)
- Center: Generated state diagram
- Right: State table for the pattern
- Bottom: Test area to verify pattern detection

Interactive Elements:

- Enter pattern specification
- Generate FSM automatically
- Manually edit/adjust generated FSM
- Test with sample input streams
- Show all paths that lead to detection
- Export as Verilog or truth table

Data Visibility:

- Pattern specification
- Number of states required
- State diagram with labeled transitions
- State table
- Test results

Visual Style:

- Pattern input with syntax highlighting
- Clean state diagram layout
- Multiple detection paths highlighted differently
- Test simulation with step-through

Implementation: p5.js with pattern parser and FSM generator
</details>

## The Traffic Light Controller: A Classic Example

The **traffic light controller** is the "Hello World" of FSM design. Every digital design course teaches it, and for good reason—it's practical, relatable, and complex enough to illustrate real FSM design challenges.

### Problem Specification

Design a controller for a simple intersection with:

- Two traffic lights: Main Street (NS) and Side Street (EW)
- Inputs:
  - CLK: System clock (assume 1 Hz for simplicity)
  - SENSOR: 1 if a car is waiting on the side street
- Outputs:
  - NS_GREEN, NS_YELLOW, NS_RED
  - EW_GREEN, EW_YELLOW, EW_RED
- Requirements:
  - Main street is normally green
  - If sensor detects a car on side street, eventually switch
  - Yellow lights last 3 seconds
  - Green lights last at least 10 seconds
  - Never have both directions green simultaneously!

### State Design

What does the controller need to remember?

- Which direction currently has right-of-way
- Whether we're in green, yellow, or red phase
- How long we've been in the current phase (for timing)

We could encode the timer as part of the state, but that would create many states (NS_GREEN_1, NS_GREEN_2, ... NS_GREEN_10). A better approach: use a separate counter and just track the phase.

**States:**

- NS_GREEN: Main street has green, side street has red
- NS_YELLOW: Main street has yellow (about to go red)
- EW_GREEN: Side street has green, main street has red
- EW_YELLOW: Side street has yellow (about to go red)

### Timing Logic

For timing, we use a counter that counts clock cycles. The FSM receives a TIMER_DONE signal from the counter and can RESET the timer on state transitions.

This is a common pattern: separate the FSM (state transitions) from the datapath (counting). The FSM becomes simpler because it doesn't need to track every count value—just "timer done" or "timer not done."

### State Diagram

```
                         ┌────────────────┐
                         │   NS_GREEN     │
                         │ NS=G, EW=R     │◀───────────────────┐
                         │ Timer=10s      │                    │
                         └───────┬────────┘                    │
                                 │ Timer_done AND Sensor       │
                                 ▼                             │
                         ┌────────────────┐                    │
                         │   NS_YELLOW    │                    │
                         │ NS=Y, EW=R     │                    │
                         │ Timer=3s       │                    │
                         └───────┬────────┘                    │
                                 │ Timer_done                  │
                                 ▼                             │
                         ┌────────────────┐                    │
                         │   EW_GREEN     │                    │
                         │ NS=R, EW=G     │                    │
                         │ Timer=10s      │                    │
                         └───────┬────────┘                    │
                                 │ Timer_done                  │
                                 ▼                             │
                         ┌────────────────┐                    │
                         │   EW_YELLOW    │                    │
                         │ NS=R, EW=Y     │                    │
                         │ Timer=3s       │                    │
                         └───────┴────────────────────────────┘
                                   Timer_done
```

### State Table

| State | Timer_done | Sensor | Next State | NS Light | EW Light |
|-------|------------|--------|------------|----------|----------|
| NS_GREEN | 0 | X | NS_GREEN | G | R |
| NS_GREEN | 1 | 0 | NS_GREEN | G | R |
| NS_GREEN | 1 | 1 | NS_YELLOW | Y | R |
| NS_YELLOW | 0 | X | NS_YELLOW | Y | R |
| NS_YELLOW | 1 | X | EW_GREEN | R | G |
| EW_GREEN | 0 | X | EW_GREEN | R | G |
| EW_GREEN | 1 | X | EW_YELLOW | R | Y |
| EW_YELLOW | 0 | X | EW_YELLOW | R | Y |
| EW_YELLOW | 1 | X | NS_GREEN | G | R |

### Output Logic (Moore)

With binary encoding (NS_GREEN=00, NS_YELLOW=01, EW_GREEN=10, EW_YELLOW=11):

\[NS\_GREEN = \overline{Q_1} \cdot \overline{Q_0}\]
\[NS\_YELLOW = \overline{Q_1} \cdot Q_0\]
\[NS\_RED = Q_1\]
\[EW\_GREEN = Q_1 \cdot \overline{Q_0}\]
\[EW\_YELLOW = Q_1 \cdot Q_0\]
\[EW\_RED = \overline{Q_1}\]

Or more simply:

\[NS\_RED = Q_1\]
\[EW\_RED = \overline{Q_1}\]

These equations guarantee the safety property: exactly one direction has red when the other doesn't.

#### Diagram: Traffic Light Controller Simulator

<iframe src="../../sims/traffic-light-controller/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Traffic Light Controller</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement

Learning Objective: Students will be able to implement and operate a traffic light controller FSM by observing how sensor inputs trigger state transitions and how timing constraints are maintained through the FSM structure.

Instructional Rationale: Visual simulation of traffic lights responding to sensor inputs makes the abstract FSM tangible and shows why proper sequencing matters for safety.

Canvas Layout:

- Center: Intersection visualization with traffic lights and cars
- Right: State diagram with current state highlighted
- Bottom: Timeline showing state transitions and light changes
- Left: Control panel (sensor simulation, speed control)

Interactive Elements:

- Toggle car sensor on/off
- Adjust simulation speed
- Pause and step through transitions
- Show timing countdown
- Highlight safety properties (never both green)
- Inject faults to see what goes wrong

Data Visibility:

- Current state name
- Timer value
- Sensor status
- Light colors for both directions
- Transition about to occur
- Safety property verification

Visual Style:

- Realistic intersection with colored lights
- Cars appearing/disappearing on side street
- Timer countdown display
- State diagram with animated transitions
- Safety indicators (green checkmark when safe)

Implementation: p5.js with intersection graphics and FSM simulation
</details>

### Safety Analysis

A key property of traffic light controllers is **safety**: never allow conflicting green lights. How do we verify this?

Looking at our states:

- NS_GREEN: NS=G, EW=R ✓
- NS_YELLOW: NS=Y, EW=R ✓
- EW_GREEN: NS=R, EW=G ✓
- EW_YELLOW: NS=R, EW=Y ✓

Every state has at least one direction red. Safety property: verified!

But wait—what about *during* transitions? In real hardware, there might be a brief moment when flip-flops are switching. Could we have NS=G and EW=G for a glitch?

This is why we use synchronous design (all changes on clock edges) and often add an "all-red" state during transitions. Real traffic controllers are carefully designed and tested for these edge cases.

!!! warning "Real Traffic Controllers Are More Complex"
    The example here is simplified for teaching. Real traffic controllers handle pedestrian signals, left turn arrows, emergency vehicle preemption, adaptive timing based on traffic flow, failure modes (flash red), and much more. But they're still FSMs at heart—just bigger ones!

## The Vending Machine FSM: Money In, Product Out

The **vending machine FSM** is another classic example that demonstrates FSMs handling cumulative input (counting money) and producing actions (dispensing product, giving change).

### Problem Specification

Design a vending machine controller for:

- Product price: 25 cents
- Accepted coins: Nickel (5¢), Dime (10¢), Quarter (25¢)
- Inputs:
  - N: Nickel inserted
  - D: Dime inserted
  - Q: Quarter inserted
- Outputs:
  - DISPENSE: Release the product
  - CHANGE_5: Return a nickel
  - CHANGE_10: Return a dime

Assume only one coin can be inserted per clock cycle.

### State Design

States represent accumulated money:

| State | Amount | Encoding |
|-------|--------|----------|
| S0 | 0¢ | 000 |
| S5 | 5¢ | 001 |
| S10 | 10¢ | 010 |
| S15 | 15¢ | 011 |
| S20 | 20¢ | 100 |

When we reach 25¢ or more, we dispense and return to S0 (giving change if overpaid).

### State Transitions

| Current | Coin | Next | Dispense | Change |
|---------|------|------|----------|--------|
| S0 | None | S0 | 0 | 0 |
| S0 | N | S5 | 0 | 0 |
| S0 | D | S10 | 0 | 0 |
| S0 | Q | S0 | 1 | 0 |
| S5 | None | S5 | 0 | 0 |
| S5 | N | S10 | 0 | 0 |
| S5 | D | S15 | 0 | 0 |
| S5 | Q | S0 | 1 | 5¢ |
| S10 | None | S10 | 0 | 0 |
| S10 | N | S15 | 0 | 0 |
| S10 | D | S20 | 0 | 0 |
| S10 | Q | S0 | 1 | 10¢ |
| S15 | None | S15 | 0 | 0 |
| S15 | N | S20 | 0 | 0 |
| S15 | D | S0 | 1 | 0 |
| S15 | Q | S0 | 1 | 15¢ |
| S20 | None | S20 | 0 | 0 |
| S20 | N | S0 | 1 | 0 |
| S20 | D | S0 | 1 | 5¢ |
| S20 | Q | S0 | 1 | 20¢ |

### Moore vs Mealy Consideration

Should the vending machine be Moore or Mealy?

**Moore approach**: Separate states for "dispense and give change" conditions. Would need additional states like "S25_NO_CHANGE", "S30_RETURN_5", etc.

**Mealy approach**: Output depends on state AND coin input. Dispense and change happen on the transition that reaches/exceeds 25¢.

The Mealy approach is cleaner here—we avoid extra states and the outputs are naturally associated with the "purchase complete" transitions.

#### Diagram: Vending Machine Simulator

<iframe src="../../sims/vending-machine-fsm/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Vending Machine FSM</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will be able to execute vending machine transactions by inserting coins and observing how the FSM tracks accumulated value, triggers product dispensing at the threshold, and calculates correct change.

Instructional Rationale: Interactive vending simulation makes the cumulative nature of the FSM clear—students see how partial payments are tracked and how different coin combinations reach the same goal.

Canvas Layout:

- Left: Vending machine graphic with coin slot and product display
- Center: State diagram with current state and balance highlighted
- Right: Transaction log showing coins inserted, dispensed product, change returned
- Bottom: Coin insertion buttons (N, D, Q) and reset

Interactive Elements:

- Insert coins with button clicks
- Watch balance accumulate
- See product dispense animation
- See change returned animation
- View state transitions in real time
- Try different coin combinations
- See total transactions completed

Data Visibility:

- Current balance
- Current state
- What each coin will do (preview)
- Product dispensed count
- Change given breakdown
- State transition about to occur

Visual Style:

- Colorful vending machine graphic
- Animated coin insertion
- Animated product drop
- Animated change return
- State diagram with glowing current state
- Balance display (like real machine)

Implementation: p5.js with vending machine graphics and FSM simulation
</details>

### Deriving the Equations

Let's derive some key equations. For the DISPENSE output (Mealy):

DISPENSE = 1 when:

- S0 and Q (25¢ reached exactly)
- S5 and Q (30¢ reached)
- S10 and Q (35¢ reached)
- S10 and D (reaching 20¢... wait, that's not 25¢)

Let me recalculate. DISPENSE when total ≥ 25¢:

- S0 + Q = 25¢ ✓
- S5 + D + D = 25¢... but we can only insert one coin at a time
- S5 + Q = 30¢ ✓
- S10 + D + N = 25¢... two coins
- S10 + Q = 35¢ ✓
- S15 + D = 25¢ ✓
- S15 + Q = 40¢ ✓
- S20 + N = 25¢ ✓
- S20 + D = 30¢ ✓
- S20 + Q = 45¢ ✓

Using encoding (S0=000, S5=001, S10=010, S15=011, S20=100):

\[DISPENSE = Q + (Q_2 \cdot \overline{Q_1} \cdot \overline{Q_0}) + ...\]

The full equation gets complex, but that's okay—K-maps and synthesis tools handle it.

!!! tip "Let the Tools Help"
    For FSMs with more than 4-5 states and multiple inputs, manually deriving equations is error-prone. Use truth tables, K-maps, or (best of all) Verilog with synthesis tools. The concepts matter; the arithmetic can be automated.

## Putting It All Together: The Design Flow in Action

Let's walk through a complete design example from start to finish.

### Problem: Garage Door Controller

Design an FSM for a garage door controller:

- Inputs:
  - BTN: Button pressed (1 = pressed this cycle)
  - TOP: Door reached top limit sensor
  - BOT: Door reached bottom limit sensor
- Outputs:
  - MOTOR_UP: Run motor to raise door
  - MOTOR_DOWN: Run motor to lower door
- Behavior:
  - Door starts closed (at bottom)
  - Press button once: door opens until TOP sensor
  - Press button while opening: door stops
  - Press button when stopped (middle): door closes
  - Press button while closing: door stops
  - Press button when stopped (middle): door opens
  - Press button when fully open: door closes

### Step 1: Define States

What must the system remember?

- Is the door moving? Which direction?
- Is the door stopped? Where was it going before it stopped?
- Is the door fully open or closed?

**States:**

- CLOSED: Door at bottom, not moving
- OPENING: Door moving up
- OPEN: Door at top, not moving
- CLOSING: Door moving down
- STOPPED_GOING_UP: Stopped mid-travel, was opening
- STOPPED_GOING_DOWN: Stopped mid-travel, was closing

### Step 2: State Diagram

```
                     ┌──────────────────────────────────────┐
                     │                BTN                   │
                     ▼                                      │
              ┌────────────┐                         ┌──────┴─────┐
              │   CLOSED   │────────BTN─────────────▶│  OPENING   │
              │ Motor=OFF  │                         │ Motor=UP   │
              └────────────┘                         └────────────┘
                     ▲                                     │  │
                     │                               TOP   │  │ BTN
                     │                                     ▼  ▼
              ┌──────┴─────┐                         ┌────────────┐
              │  CLOSING   │◀────────BTN─────────────│    OPEN    │
              │ Motor=DOWN │                         │ Motor=OFF  │
              └────────────┘                         └────────────┘
                │    │                                     ▲
            BOT │    │ BTN                                 │
                ▼    ▼                                     │
           ┌────────────┐         BTN              ┌───────┴────┐
           │   CLOSED   │◀─────────────────────────│STOPPED_DOWN│
           │            │                          │ Motor=OFF  │
           └────────────┘                          └────────────┘
                                                          ▲
                                                          │ BTN
                                                   ┌──────┴─────┐
                                                   │STOPPED_UP  │
                                                   │ Motor=OFF  │
                                                   └────────────┘
```

(This diagram is simplified; the complete version includes all transitions.)

### Step 3: Complete State Table

| State | BTN | TOP | BOT | Next State | MOTOR |
|-------|-----|-----|-----|------------|-------|
| CLOSED | 0 | X | X | CLOSED | OFF |
| CLOSED | 1 | X | X | OPENING | UP |
| OPENING | 0 | 0 | X | OPENING | UP |
| OPENING | 0 | 1 | X | OPEN | OFF |
| OPENING | 1 | X | X | STOPPED_UP | OFF |
| OPEN | 0 | X | X | OPEN | OFF |
| OPEN | 1 | X | X | CLOSING | DOWN |
| CLOSING | 0 | X | 0 | CLOSING | DOWN |
| CLOSING | 0 | X | 1 | CLOSED | OFF |
| CLOSING | 1 | X | X | STOPPED_DOWN | OFF |
| STOPPED_UP | 0 | X | X | STOPPED_UP | OFF |
| STOPPED_UP | 1 | X | X | CLOSING | DOWN |
| STOPPED_DOWN | 0 | X | X | STOPPED_DOWN | OFF |
| STOPPED_DOWN | 1 | X | X | OPENING | UP |

### Step 4: Choose Encoding

6 states → need 3 flip-flops (minimum). Using binary:

| State | Q2 Q1 Q0 |
|-------|----------|
| CLOSED | 000 |
| OPENING | 001 |
| OPEN | 010 |
| CLOSING | 011 |
| STOPPED_UP | 100 |
| STOPPED_DOWN | 101 |

### Step 5: Derive Equations

From the state table:

**MOTOR_UP** (when in OPENING):

\[MOTOR\_UP = \overline{Q_2} \cdot \overline{Q_1} \cdot Q_0\]

**MOTOR_DOWN** (when in CLOSING):

\[MOTOR\_DOWN = \overline{Q_2} \cdot Q_1 \cdot Q_0\]

The next-state equations would follow similarly, using K-maps to minimize.

### Step 6: Implementation

The circuit consists of:

- 3 D flip-flops for state storage
- Combinational logic for next-state (inputs: Q2, Q1, Q0, BTN, TOP, BOT)
- Combinational logic for outputs (inputs: Q2, Q1, Q0)
- Reset logic to initialize to CLOSED (000)

### Step 7: Verify

Test vectors should include:

- Normal operation: closed → open → closed
- Stop and reverse: start opening, stop, then close
- Limit switch behavior: motor stops at limits
- Multiple button presses in sequence
- Button press at each state

!!! success "Design Complete!"
    We've taken a word problem (garage door controller) through the entire FSM design process to equations ready for implementation. This same process works for any FSM—simple or complex.

## Common Design Patterns and Tips

Here are some patterns you'll see repeatedly in FSM design:

### The Debounce FSM

Mechanical buttons "bounce"—rapidly switching between on and off when pressed. An FSM can filter this:

```
IDLE ──(btn=1)──▶ MAYBE_1 ──(btn=1)──▶ MAYBE_2 ──(btn=1)──▶ PRESSED
         ▲                    │                    │
         └─────(btn=0)────────┴────────────────────┘
```

Only after seeing button=1 for 3+ consecutive cycles do we register a press. Random bounces reset to IDLE.

### The Handshake FSM

For coordinating between systems with request/acknowledge:

```
IDLE ──(req)──▶ ACTIVE ──(ack)──▶ WAIT ──(~req)──▶ IDLE
```

The FSM ensures proper sequencing: request must come before acknowledge, and request must drop before the next transaction.

### The Watchdog FSM

Monitors for timeouts or hung conditions:

```
NORMAL ──(no_activity)──▶ WARNING ──(timeout)──▶ RESET
    ▲                         │
    └────(activity)───────────┘
```

If there's activity, stay normal. If no activity for too long, issue a warning, then reset the system.

### Tips for Clean FSM Design

1. **Name states clearly**: Use descriptive names (WAIT_FOR_ACK not S3)

2. **Start with the happy path**: Design the normal operation first, then add error handling

3. **Don't forget reset**: Every FSM needs a well-defined initial state

4. **Check for dead ends**: Ensure every state has an exit path

5. **Verify completeness**: Every state × input combination must be defined

6. **Keep it simple**: If you have more than 10-15 states, consider hierarchical FSMs

7. **Document the FSM**: State diagrams are great documentation—keep them updated!

## Summary and Key Takeaways

Congratulations—you now have the complete toolkit for designing finite state machines from concept to implementation!

**Equations Are Just Combinational Logic:**

- Next-state equations compute D flip-flop inputs
- Output equations compute FSM outputs
- Both use standard Boolean minimization techniques

**The Design Process Is Systematic:**

1. Understand the specification
2. Define states and draw the state diagram
3. Create a complete state table
4. Choose encoding and derive equations
5. Implement and verify

**Sequence Detectors Are Everywhere:**

- Track partial pattern matches as states
- Choose overlapping or non-overlapping based on application
- Pattern FSMs extend to complex multi-pattern recognition

**Classic Examples Teach Universal Patterns:**

- Traffic lights: Safety-critical timing with phase sequences
- Vending machines: Cumulative inputs leading to actions
- Garage doors: User interface with stop/reverse logic

**Verification Is Essential:**

- Test every transition, not just every state
- Check edge cases and error conditions
- For critical systems, consider formal verification

The FSMs you've learned to design are the building blocks of all complex digital systems. The controller in your phone, the protocol handlers in your network interface, the timing logic in your display—all FSMs. Master these fundamentals, and you have the tools to design any sequential digital system.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
An engaging graphic novel could follow a team of engineers designing the controller for a Mars rover, where every FSM must be perfect because there's no "oops, let me fix that" when you're 140 million miles from the nearest repair shop. The narrative could show how they used formal verification to prove that the rover's movement FSM would never allow driving while the drill was deployed, how they tested every transition through simulation, and the tense moment when a real mission anomaly was traced to an FSM they'd verified but implemented with a subtle encoding bug. The lesson: FSMs are powerful, but verification is everything.
</details>

## Practice Problems

Test your mastery of FSM design with these exercises:

??? question "Problem 1: Derive Next-State Equations"
    Given this state table for a 2-state, 1-input FSM:

    | Q | X | Q+ |
    |---|---|---|
    | 0 | 0 | 0 |
    | 0 | 1 | 1 |
    | 1 | 0 | 1 |
    | 1 | 1 | 0 |

    Derive the next-state equation for D.

    **Solution:**
    Looking at when Q+ = 1:
    - Q=0, X=1
    - Q=1, X=0

    These are the two cases where Q and X differ, so:

    \[D = Q \oplus X = \overline{Q} \cdot X + Q \cdot \overline{X}\]

    This is XOR—the FSM toggles when X=1.

??? question "Problem 2: Overlapping vs Non-Overlapping"
    For the pattern "101", how many times would each detector type output 1 for input "10101"?

    **Solution:**

    **Non-overlapping:**
    - 101 found at positions 0-2, output 1
    - Reset, look for new pattern starting at position 3
    - Only "01" remaining, no complete pattern
    - **Total: 1 detection**

    **Overlapping:**
    - 101 found at positions 0-2, output 1
    - The "01" is reused as start of new pattern
    - 101 found at positions 2-4, output 1
    - **Total: 2 detections**

??? question "Problem 3: Traffic Light Safety"
    Prove that the traffic light controller from this chapter never has both directions green simultaneously.

    **Solution:**
    Examining each state:
    - NS_GREEN: NS=Green, EW=Red ✓
    - NS_YELLOW: NS=Yellow, EW=Red ✓
    - EW_GREEN: NS=Red, EW=Green ✓
    - EW_YELLOW: NS=Red, EW=Yellow ✓

    In every state, at least one direction is Red or Yellow. There is no state where both are Green. Therefore, the FSM is safe by design.

    The key is that we have 4 distinct states, each with a fixed output assignment, and we verified all 4.

??? question "Problem 4: Vending Machine Change"
    In the vending machine FSM, what change should be returned if a quarter is inserted when the machine is in state S15 (15¢ accumulated)?

    **Solution:**
    S15 + Quarter = 15¢ + 25¢ = 40¢

    Product costs 25¢, so:
    - Dispense product (25¢ value given)
    - Return 40¢ - 25¢ = 15¢ in change

    15¢ = 10¢ + 5¢, so:
    - CHANGE_10 = 1 (return a dime)
    - CHANGE_5 = 1 (return a nickel)

??? question "Problem 5: Complete FSM Design"
    Design an FSM that outputs 1 for exactly one clock cycle after seeing the input sequence "110". Use overlapping detection.

    **Solution:**

    **States:**
    - S0: Initial/haven't matched anything useful
    - S1: Saw "1"
    - S2: Saw "11"
    - S3: Saw "110" → output 1

    **State Table (overlapping):**

    | State | Input X | Next State | Output Z |
    |-------|---------|------------|----------|
    | S0 | 0 | S0 | 0 |
    | S0 | 1 | S1 | 0 |
    | S1 | 0 | S0 | 0 |
    | S1 | 1 | S2 | 0 |
    | S2 | 0 | S3 | 0 |
    | S2 | 1 | S2 | 0 |
    | S3 | 0 | S0 | 1 |
    | S3 | 1 | S1 | 1 |

    Note: In S3, we output 1. For overlapping:
    - If X=1 after "110", the new "1" could start another "110", so go to S1
    - If X=0 after "110", reset to S0 (the "0" can't help start "110")

    **Encoding (Q1 Q0):** S0=00, S1=01, S2=10, S3=11

    **Next-state equations:**

    \[Q_1^+ = Q_0 \cdot X + Q_1 \cdot \overline{X}\]

    \[Q_0^+ = \overline{Q_1} \cdot X + Q_1 \cdot Q_0 \cdot X\]

    **Output equation (Moore):**

    \[Z = Q_1 \cdot Q_0\]

??? question "Problem 6: Design Challenge"
    Design an FSM for a combination lock with the sequence 1-2-1 (three inputs: buttons 0, 1, 2). Output UNLOCK=1 when correct sequence entered. Include a wrong-input reset.

    **Solution Sketch:**

    **States:**
    - LOCKED: Waiting for first correct input
    - SAW_1: First "1" received correctly
    - SAW_12: Sequence "1-2" received correctly
    - UNLOCKED: Full sequence "1-2-1" received

    **Transitions:**
    - LOCKED: button 1 → SAW_1; button 0 or 2 → LOCKED
    - SAW_1: button 2 → SAW_12; button 0 or 1 → LOCKED
    - SAW_12: button 1 → UNLOCKED; button 0 or 2 → LOCKED
    - UNLOCKED: any button → LOCKED (auto-relock)

    This gives a 4-state FSM with 2 flip-flops. The wrong-input reset is handled by transitions back to LOCKED from any intermediate state.

[See Annotated References](./references.md)
