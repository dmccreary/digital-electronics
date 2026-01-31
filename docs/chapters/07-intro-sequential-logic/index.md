---
title: Introduction to Sequential Logic
description: The conceptual leap from circuits that forget to circuits that remember
generated_by: claude skill chapter-content-generator
date: 2026-01-31 18:00:00
version: 0.03
---

# Introduction to Sequential Logic

## Summary

This chapter marks the conceptual leap from combinational to sequential logic, where circuits can store information and their outputs depend on both current inputs and past history. Students will learn about memory elements, the concept of state, feedback loops in circuits, bistable elements, and latches including SR and D latches. The chapter also covers level-sensitive behavior, timing problems with latches, race conditions, and introduces clock signals as the foundation for synchronous design. Understanding these concepts is essential before studying flip-flops and finite state machines.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Memory Element
2. State Concept
3. Feedback Loop
4. Bistable Element
5. SR Latch
6. SR Latch Truth Table
7. Invalid State Problem
8. Gated SR Latch
9. D Latch
10. Level Sensitive
11. Transparent Latch
12. Latch Timing Problem
13. Race Condition
14. Clock Signal
15. Clock Edge
16. Rising Edge
17. Falling Edge
18. Clock Period
19. Clock Frequency
20. Duty Cycle

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Logic Gates and Digital Signal Properties](../03-logic-gates-digital-signals/index.md)
- [Chapter 4: Combinational Logic Design Fundamentals](../04-combinational-logic-design/index.md)

---

## Introduction: When Circuits Learn to Remember

You've spent the last several chapters mastering combinational logic—circuits that are, frankly, a bit forgetful. Give a combinational circuit an input, it produces an output. Remove the input, and poof! It has absolutely no idea what just happened. It's like a goldfish, but made of transistors.

But here's the thing: real computers need to *remember* things. Your laptop remembers your files. Your phone remembers your contacts. Even your microwave remembers how long to cook that burrito (well, until you unplug it).

Welcome to **sequential logic**—the moment when circuits gain the superpower of memory. This is arguably the most important conceptual leap in digital electronics. After this chapter, you'll understand how it's possible for a circuit made of simple logic gates to actually *store* information.

Fair warning: this chapter is going to feel different. We're not just learning new gates or optimization tricks. We're fundamentally changing how we think about circuits. By the end, the phrase "the output depends on the history of inputs" will make perfect sense, and you'll wonder how you ever thought about digital systems without it.

Let's teach some gates to remember.

## Memory Elements: The Foundation of Sequential Logic

A **memory element** is any circuit that can store one bit of information. That's it. One measly bit—a single 0 or 1. But don't let the simplicity fool you. From this humble beginning springs everything from the registers in your CPU to the gigabytes in your SSD.

What makes a memory element different from combinational logic? Two key properties:

1. **It has a stored value** that persists over time
2. **Its output depends on this stored value**, not just current inputs

Think of a light switch. Flip it up, the light turns on. Flip it down, the light turns off. But here's the important part: let go of the switch, and *it stays where you put it*. The switch "remembers" whether you last pushed it up or down. That's memory!

Compare this to a doorbell button. Press it, the bell rings. Release it, the bell stops. The doorbell has no memory—it only responds to what's happening right now.

| Circuit Type | Example | Output Depends On | Memory? |
|-------------|---------|-------------------|---------|
| Combinational | Doorbell | Current input only | No |
| Sequential | Light switch | Stored state | Yes |

Memory elements are the building blocks we'll use to construct latches, flip-flops, registers, and eventually entire computers. Before we build them, though, we need to understand what we're actually storing.

## The State Concept: What Sequential Circuits Remember

In sequential logic, we use the word **state** to describe what a circuit is remembering at any given moment. The state is like a snapshot of the circuit's internal condition.

For a simple 1-bit memory element, the state is just that single bit: either 0 or 1. For a more complex sequential circuit—say, a counter that counts from 0 to 7—the state might be a 3-bit number representing the current count.

Here's the key insight: **in sequential logic, the output depends on both the current input AND the current state**.

Let's make this concrete with a simple example. Imagine a "lock" circuit with two inputs:

- **Set**: When you pulse this, the output goes to 1
- **Reset**: When you pulse this, the output goes to 0

The output doesn't just depend on what inputs are active right now. It depends on *which input was last pulsed*. If you last pressed Set, the output is 1. If you last pressed Reset, the output is 0. The circuit remembers.

#### Diagram: State Concept Visualizer

<iframe src="../../sims/state-concept/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>State Concept Interactive Demonstration</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain how the state of a sequential circuit determines its behavior, and how the same input can produce different outputs depending on the current state.

Instructional Rationale: Concrete visualization of state transitions helps students grasp the abstract concept of "memory" in circuits. Showing the same input producing different outputs based on state crystallizes understanding.

Canvas Layout:

- Left: Simple sequential circuit symbol (box with Q output)
- Center: State indicator showing current state (0 or 1)
- Right: Input/output history log
- Bottom: Input buttons (Set, Reset) and state transition visualization

Interactive Elements:

- "Set" button to pulse the set input
- "Reset" button to pulse the reset input
- Current state prominently displayed
- History log showing sequence of inputs and resulting states
- Highlight when same input gives different result (won't happen here but sets up concept)
- "What determines Q?" question with answer based on history

Data Visibility:

- Current state Q displayed large
- Previous state shown faded
- Input history as timeline
- Output history aligned with inputs
- Annotation: "Q depends on LAST input, not current"

Visual Style:

- Clean state diagram with two states (Q=0, Q=1)
- Arrows showing transitions on Set/Reset
- Current state highlighted
- History log scrolls as interactions occur

Implementation: p5.js with state machine and history tracking
</details>

### State Diagrams: Visualizing Memory

We often draw **state diagrams** to visualize sequential circuits. A state diagram shows:

- **States** as circles (or bubbles)
- **Transitions** as arrows between states
- **Labels** on arrows showing what input causes each transition

For our Set/Reset example, the state diagram would have two states (Q=0 and Q=1), with arrows showing how Set moves you to Q=1 and Reset moves you to Q=0.

State diagrams will become your best friend when we reach finite state machines in later chapters. For now, just understand that they're a visual way to represent what a circuit remembers and how its memory changes.

## Feedback Loops: How Memory Happens

So how does a circuit actually remember? The secret ingredient is **feedback**—connecting an output back to an input.

A **feedback loop** occurs when the output of a circuit is routed back and used as one of its inputs. This creates a cycle where the circuit can influence its own future behavior.

Consider what happens with a simple inverter (NOT gate) whose output is connected to its input. If the output is 1, the input becomes 1, so the output becomes 0. But now the input is 0, so the output becomes 1 again. And around and around we go! This circuit would actually oscillate rapidly (it's the basis of a ring oscillator), which isn't memory—it's instability.

But what if we use *two* inverters in a loop?

```
       +---[NOT]---+
       |           |
   Q ←-+           +→ Q̄
       |           |
       +---[NOT]---+
```

Now something interesting happens. If Q is 1, the top inverter outputs 0 (which is \(\overline{Q}\)), and the bottom inverter outputs 1 (which matches Q). The circuit is stable! Similarly, if Q is 0, the top inverter outputs 1, and the bottom inverter outputs 0. Also stable!

We've just created a circuit with two stable states. It can sit happily at Q=0 or Q=1, and it will stay there until something forces it to change. This is the essence of memory.

!!! tip "The Feedback Principle"
    Memory in digital circuits comes from feedback. By connecting outputs back to inputs, a circuit can maintain its state indefinitely. The challenge is designing feedback loops that are stable and controllable.

## Bistable Elements: The Two-State Building Block

A **bistable element** is a circuit with exactly two stable states. "Bi" means two, and "stable" means the circuit will happily remain in either state without external forcing.

The two-inverter loop we just discussed is a bistable element. It can be in state Q=0 (with \(\overline{Q}\)=1) or state Q=1 (with \(\overline{Q}\)=0). Once it's in one of these states, it stays there.

But there's a problem with our simple two-inverter loop: we have no way to control which state it's in! We can't set it to 1 or reset it to 0. The circuit has memory, but we can't write to that memory.

What we need is a bistable element with *inputs* that let us control the state. That's where latches come in.

Think of a bistable element like a ball in a valley between two hills. The ball can rest in either valley (two stable states), but it won't stay on top of a hill (those would be unstable states). To move the ball from one valley to the other, you need to give it a push—that's what the inputs will do.

#### Diagram: Bistable Element Concept

<iframe src="../../sims/bistable-element/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Bistable Element Ball-and-Valley Analogy</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Describe

Learning Objective: Students will be able to describe how a bistable element maintains one of two stable states using the ball-and-valley physical analogy.

Instructional Rationale: Physical analogies make abstract circuit concepts tangible. The ball-and-valley metaphor is widely used and builds intuition for stability in feedback systems.

Canvas Layout:

- Top: Cross-section showing two valleys with hill between
- Ball that can rest in either valley
- Labels for "State 0" and "State 1" valleys
- Bottom: Circuit diagram showing cross-coupled inverters or NOR gates
- Side: State indicator matching ball position

Interactive Elements:

- Click in valley to move ball to that state
- Ball animates rolling to stable position
- Corresponding circuit diagram highlights matching state
- "Push left" and "Push right" buttons for controlled transitions
- Show ball wobbling if placed on unstable hill point

Data Visibility:

- Current state clearly displayed
- Ball position matches circuit state
- "Stable" indicator when ball is in valley
- "Unstable" warning if ball is on hill

Visual Style:

- Smooth 2D side-view of energy landscape
- Ball with physics-based rolling animation
- Circuit diagram synchronized with ball position
- Valleys labeled as 0 and 1

Implementation: p5.js with simple physics for ball animation
</details>

## The SR Latch: Your First Real Memory Circuit

Time to build something practical! The **SR latch** (also called Set-Reset latch) is the simplest memory element with controllable inputs. It has two inputs:

- **S (Set)**: Makes the output go to 1
- **R (Reset)**: Makes the output go to 0

And two outputs:

- **Q**: The stored state
- **\(\overline{Q}\)**: The complement of Q

The SR latch can be built from two cross-coupled NOR gates:

```
    S ──┬──[NOR]──┬── Q̄
        │         │
        └────┬────┘
             │
        ┌────┴────┐
        │         │
    R ──┴──[NOR]──┴── Q
```

Wait, let me draw that more clearly. Each NOR gate has two inputs: one from the external input (S or R) and one from the output of the other NOR gate. This cross-coupling creates the feedback loop that enables memory.

How does it work? Let's trace through the logic:

**When S=0 and R=0 (Hold mode):**
The latch remembers its previous state. If Q was 1, it stays 1. If Q was 0, it stays 0. This is the memory state!

**When S=1 and R=0 (Set mode):**
The S input forces the upper NOR gate output (\(\overline{Q}\)) to 0 (because any 1 input to NOR produces 0). This means the lower NOR gate sees R=0 and \(\overline{Q}\)=0, so it outputs 1. Q becomes 1.

**When S=0 and R=1 (Reset mode):**
By similar logic, Q becomes 0 and \(\overline{Q}\) becomes 1.

**When S=1 and R=1 (Forbidden!):**
Both NOR outputs are forced to 0. So Q=0 and \(\overline{Q}\)=0. But wait... Q and \(\overline{Q}\) are supposed to be complements! This is the invalid state, and we'll discuss why it's problematic soon.

#### Diagram: SR Latch Interactive

<iframe src="../../sims/sr-latch/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>SR Latch NOR Gate Implementation</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate how an SR latch stores and changes state by manipulating the Set and Reset inputs and observing the feedback behavior.

Instructional Rationale: Interactive manipulation of S and R inputs with real-time circuit simulation builds operational understanding of how the latch responds to different input combinations.

Canvas Layout:

- Center: Circuit diagram with two cross-coupled NOR gates
- Left: S and R input toggles
- Right: Q and Q̄ output displays
- Bottom: Current mode indicator (Hold, Set, Reset, Invalid)
- Top: State history timeline

Interactive Elements:

- Toggle buttons for S and R inputs
- Real-time signal propagation animation through gates
- Output values update as inputs change
- Mode indicator shows current operation
- Warning indicator when S=R=1
- Animation showing signal flow through feedback path
- "Trace signal" mode to follow logic step by step

Data Visibility:

- Current S, R values
- Current Q, Q̄ values
- Previous Q value (for hold comparison)
- Mode name displayed
- Invalid state warning when applicable

Visual Style:

- Standard NOR gate symbols
- Signal wires show logic levels as colors (blue=0, orange=1)
- Feedback paths clearly visible
- Invalid state shown with red warning overlay
- Smooth transitions when state changes

Implementation: p5.js with gate-level simulation and animation
</details>

## SR Latch Truth Table: The Complete Behavior

Let's formalize the SR latch behavior with a truth table. But this truth table is different from combinational logic tables—we need to include the *previous* state because the output depends on history.

| S | R | Q (next) | \(\overline{Q}\) (next) | Operation |
|---|---|----------|------------------------|-----------|
| 0 | 0 | Q (no change) | \(\overline{Q}\) (no change) | Hold |
| 0 | 1 | 0 | 1 | Reset |
| 1 | 0 | 1 | 0 | Set |
| 1 | 1 | 0 | 0 | Invalid! |

The notation "Q (no change)" means the output stays whatever it was before. This is the memory behavior.

You can also write this using the notation \(Q^+\) for "next state of Q":

\[Q^+ = S + \overline{R} \cdot Q\]

This equation says: the next state is 1 if you're setting (S=1) OR if you're not resetting (R=0) AND you're already at 1 (Q=1).

!!! warning "The S=R=1 Problem"
    When both S and R are 1 simultaneously, the SR latch enters an invalid state where both outputs are 0. This violates the fundamental property that Q and \(\overline{Q}\) should be complements. Even worse, when both inputs return to 0, the final state is unpredictable—it depends on which input goes to 0 first and the exact gate delays. This is a race condition, which we'll explore soon.

## The Invalid State Problem: When Memory Gets Confused

The **invalid state problem** is a fundamental issue with the basic SR latch: what happens when you simultaneously tell it to set AND reset?

When S=R=1:

1. Both NOR gates have at least one input at 1
2. So both NOR gates output 0
3. Q=0 and \(\overline{Q}\)=0 (violating the complementary relationship)

This is bad, but it gets worse. What happens when you release both inputs (S=R=0)?

Both NOR gates now see 0 from their external input and 0 from the other gate (since both outputs are currently 0). According to NOR logic, 0 NOR 0 = 1. So both gates try to output 1!

But wait—if both outputs become 1, each gate now sees a 1 from the other gate, so both outputs become 0 again. We're in an unstable oscillation.

In reality, perfect symmetry doesn't exist. One gate is always slightly faster. Whichever gate "wins" the race determines the final state. This is non-deterministic behavior—the circuit might end up in either state, and we can't predict which.

This is unacceptable for reliable digital design. The solution? Don't allow S=R=1. We can either:

1. Trust the designer never to apply this condition (risky!)
2. Add logic to prevent it (gated latches)
3. Use a different latch design that doesn't have this problem (D latch)

#### Diagram: Invalid State Demonstration

<iframe src="../../sims/invalid-state/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>SR Latch Invalid State and Race Condition</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine what happens during and after the S=R=1 condition, understanding why this creates unpredictable behavior due to race conditions.

Instructional Rationale: Seeing the race condition in action—with randomized "winner"—makes the problem concrete and explains why this input combination must be avoided.

Canvas Layout:

- Center: SR latch circuit with gate delay simulation
- Top: Input controls for S and R
- Right: Race animation when both inputs go high then low
- Bottom: Results log showing random outcomes of repeated races
- Side: Explanation panel

Interactive Elements:

- Set S=R=1 button to demonstrate invalid state
- "Release both" button to trigger race condition
- Randomized race outcome (different each time)
- Slow-motion playback of gate propagation
- Statistics counter for race outcomes over many trials
- Reset to clear statistics

Data Visibility:

- Current Q and Q̄ values
- Gate propagation delays (with slight random variation)
- Race winner highlighted
- Statistics: how many times each state won
- Invalid state warning

Visual Style:

- Animated signal propagation with timing
- Racing signals shown as moving pulses
- Winner/loser highlighted when race completes
- Statistics as bar chart
- Warning colors for invalid condition

Implementation: p5.js with randomized timing and race simulation
</details>

## The Gated SR Latch: Adding Control

The **gated SR latch** (also called enabled SR latch or clocked SR latch) adds an enable input that controls when the latch responds to S and R.

When Enable=0, the latch ignores S and R completely—it just holds its current state.
When Enable=1, the latch responds to S and R normally.

This is implemented by ANDing the S and R inputs with the Enable signal before they reach the basic SR latch:

```
S ──[AND]──┐
     ↑     │
Enable─────┤    [Basic SR Latch]──→ Q, Q̄
     ↓     │
R ──[AND]──┘
```

Now we have control over *when* the latch is allowed to change. This is a stepping stone toward clock-controlled circuits.

| Enable | S | R | Q (next) | Operation |
|--------|---|---|----------|-----------|
| 0 | X | X | Q (hold) | Disabled—inputs ignored |
| 1 | 0 | 0 | Q (hold) | Enabled—hold |
| 1 | 0 | 1 | 0 | Enabled—reset |
| 1 | 1 | 0 | 1 | Enabled—set |
| 1 | 1 | 1 | ? | Enabled—still invalid! |

The X means "don't care"—when Enable=0, it doesn't matter what S and R are.

!!! info "The Enable Signal"
    The Enable input is sometimes called G (for Gate), EN, or even CLK (when used with a clock). Regardless of name, its purpose is the same: control when the latch is allowed to change state.

## The D Latch: Eliminating the Invalid State

The **D latch** (Data latch) is a brilliant solution to the invalid state problem. Instead of having separate Set and Reset inputs, it has just one data input: D.

The idea is simple: connect D directly to where S would go, and connect \(\overline{D}\) (the complement of D) to where R would go.

```
D ──[AND]──────┐
     ↑         │
Enable─────────┤    [Basic SR Latch]──→ Q, Q̄
     ↓         │
D ──[NOT]──[AND]──┘
```

Now look at what happens:

- When Enable=0: Latch holds (as before)
- When Enable=1 and D=1: S gets 1, R gets 0 → Q becomes 1
- When Enable=1 and D=0: S gets 0, R gets 1 → Q becomes 0

The outputs Q simply follows D when enabled! And here's the magic: S and R can *never* both be 1 at the same time because they're derived from D and \(\overline{D}\), which are always complements.

Invalid state? Problem solved!

| Enable | D | Q (next) | Operation |
|--------|---|----------|-----------|
| 0 | X | Q (hold) | Disabled—hold current state |
| 1 | 0 | 0 | Enabled—Q follows D |
| 1 | 1 | 1 | Enabled—Q follows D |

The characteristic equation is beautifully simple:

\[Q^+ = D \cdot Enable + Q \cdot \overline{Enable}\]

Or in words: "The next state equals D if enabled, otherwise stay at current Q."

#### Diagram: D Latch Operation

<iframe src="../../sims/d-latch/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>D Latch Interactive Demonstration</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use a D latch to store a bit value by controlling the Enable signal and observing how Q follows D only when enabled.

Instructional Rationale: Interactive manipulation with timing diagram output helps students understand the temporal relationship between D, Enable, and Q.

Canvas Layout:

- Left: D latch circuit diagram (gates visible)
- Center: D and Enable input controls
- Right: Q output display with comparison to D
- Bottom: Rolling timing diagram showing D, Enable, Q over time

Interactive Elements:

- Toggle for D input (0 or 1)
- Toggle for Enable input
- Real-time timing diagram that scrolls
- Highlight when Q changes vs. holds
- "Capture D" animation when Enable goes high
- Comparison panel: "D at last enable" vs "current Q"

Data Visibility:

- Current D, Enable, Q values
- Timing diagram with time axis
- "Q follows D" indicator when enabled
- "Q holding" indicator when disabled
- Value that Q captured when last enabled

Visual Style:

- Clean D latch symbol and gate implementation
- Timing diagram with standard waveform look
- Color coding: D in blue, Enable in green, Q in orange
- Arrows showing causation (Enable rising → Q captures D)

Implementation: p5.js with real-time timing diagram generation
</details>

## Level Sensitive Behavior: When the Gate is Open

The D latch exhibits **level-sensitive** behavior, meaning its ability to change depends on the *level* (high or low) of the Enable signal, not on transitions.

When Enable is high (1), the latch is said to be **transparent**—any changes to D pass straight through to Q. It's like having a window open: whatever's outside (D) appears inside (Q) immediately.

When Enable is low (0), the latch is **opaque**—it ignores D completely and holds its stored value. The window is closed; Q maintains whatever value it had when the window closed.

This level sensitivity has important implications:

- While Enable=1, Q follows every change in D (even glitches!)
- The value stored is whatever D was at the moment Enable goes from 1 to 0
- If D changes while Enable is low, Q doesn't notice

The term **transparent latch** comes from this behavior—when enabled, the latch is "transparent" to the data signal.

!!! example "Transparency in Action"
    Imagine Enable=1 and D switches from 0 → 1 → 0 → 1 → 0 rapidly. Q would follow every single transition! The latch "sees" all these changes. Only when Enable drops to 0 does Q freeze at whatever D happened to be at that instant.

## The Transparent Latch: A Feature and a Problem

The transparency of level-sensitive latches is both useful and dangerous.

**Useful because:**

- Simple to understand—Q equals D when enabled
- Good for simple data capture applications
- Forms the basis of more sophisticated storage elements

**Dangerous because:**

- Any noise or glitch on D while Enable is high goes straight to Q
- In complex systems, data might race through multiple latches in a single enable period
- Timing becomes tricky when you have multiple latches in sequence

Here's a troubling scenario: Imagine two latches in series, both enabled by the same signal. Data enters the first latch and appears at its Q output. But that Q is connected to the second latch's D input, and the second latch is also enabled! The data might "race through" both latches in a single enable period.

This is not what we want. We want data to move one stage at a time, in a controlled fashion. Level-sensitive latches make this difficult.

#### Diagram: Transparent Latch Timing

<iframe src="../../sims/transparent-latch/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Transparent Latch Behavior Visualization</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students will be able to differentiate between transparent and opaque modes of a latch, understanding how the level of the enable signal affects whether changes in D affect Q.

Instructional Rationale: Side-by-side comparison of D and Q with explicit transparency window marking helps students understand when the latch is "open" vs "closed."

Canvas Layout:

- Top: D input waveform with controls
- Middle: Enable signal with high period clearly marked
- Bottom: Q output showing response
- Right: Transparency indicator panel
- Overlay: "Transparent window" highlighting

Interactive Elements:

- Programmable D pattern (sequence of changes)
- Enable duration control
- Play/pause animation
- Step through time
- Highlight transparency window on waveform
- Show exactly what value Q captures at Enable falling edge

Data Visibility:

- D, Enable, Q waveforms aligned
- Transparency window shaded on Enable high period
- Captured value indicator at Enable falling edge
- "Glitches pass through" warning when applicable

Visual Style:

- Standard timing diagram appearance
- Transparency window as semi-transparent green overlay
- Capture moment marked with vertical line
- Glitches in D shown in red if they appear in Q

Implementation: p5.js with waveform animation and timing analysis
</details>

## Latch Timing Problems: When Level Sensitivity Hurts

The **latch timing problem** refers to the challenges of using level-sensitive latches in systems with multiple storage elements.

Consider a simple two-stage register where data should shift from Stage 1 to Stage 2 on each clock cycle:

```
D_in → [Latch 1] → [Latch 2] → D_out
          ↑           ↑
          Enable ─────┘
```

Both latches share the same Enable. When Enable goes high:

1. D_in enters Latch 1 and appears at its output
2. But that output is connected to Latch 2's input!
3. So the data immediately passes through to Latch 2's output
4. Both latches have captured the same new value!

We wanted data to move one stage per clock cycle, but it moved two stages. This is called **data race-through**, and it's a serious problem.

The fundamental issue is that level-sensitive latches are transparent for the entire duration of the enable pulse. If that duration is long enough for data to propagate through the circuit, unwanted behavior results.

Solutions to the latch timing problem:

1. **Use very short enable pulses**: But this is unreliable and hard to guarantee
2. **Use two-phase non-overlapping clocks**: Complex but workable
3. **Use edge-triggered flip-flops**: This is the standard solution (next chapter!)

## Race Conditions: When Timing Creates Chaos

A **race condition** occurs when the behavior of a circuit depends on the relative timing of different signal paths. If small timing differences change the outcome, you have a race.

We saw one race condition in the SR latch's invalid state: when S and R both go from 1 to 0, which gate wins determines the final state.

In latch-based systems, race conditions appear in several forms:

**Data race-through**: As we just discussed, data racing through multiple transparent latches.

**Hold time violations**: If data changes too soon after the enable falls, the captured value might be corrupted.

**Setup time violations**: If data hasn't been stable long enough before enable falls, the captured value might be wrong.

**Feedback races**: In circuits with feedback, the order of signal arrival can determine behavior.

Race conditions are nasty because they're non-deterministic. A circuit might work perfectly in the lab but fail in the field due to temperature changes, voltage variations, or manufacturing differences affecting timing.

!!! danger "Racing is for Cars, Not Circuits"
    Race conditions are among the hardest bugs to find and fix. The circuit might work 99.99% of the time, then mysteriously fail. Worse, adding debug probes might change the timing enough to make the race condition disappear! This is sometimes called a "Heisenbug"—it disappears when you try to observe it.

#### Diagram: Race Condition Demonstration

<iframe src="../../sims/race-condition/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Race Condition in Two-Stage Latch System</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine how race conditions occur in latch-based systems and why data can race through multiple transparent latches during a single enable period.

Instructional Rationale: Visual animation of data racing through stages makes the abstract timing problem concrete and motivates the need for edge-triggered flip-flops.

Canvas Layout:

- Top: Two D latches in series with connecting wire
- Middle: Shared Enable signal display
- Bottom: Timing diagram showing D1, Q1, Q2 waveforms
- Side: Race condition indicator and explanation

Interactive Elements:

- Input data toggle
- Enable pulse trigger
- Adjustable enable pulse width
- Step-through mode showing propagation
- Highlight data path as it races through
- Counter: "Stages traversed in one enable"

Data Visibility:

- Current values at each stage
- Enable duration vs. propagation delay
- Number of stages data traveled
- "Race detected" warning when data passes through multiple stages
- Timing margins displayed

Visual Style:

- Data shown as colored pulse moving through circuit
- Enable window clearly marked
- Race path highlighted in red
- Timing diagram with propagation delays marked

Implementation: p5.js with configurable timing and race detection
</details>

## Clock Signals: The Heartbeat of Digital Systems

Enter the **clock signal**—the regular, periodic pulse that synchronizes everything in a digital system. The clock is like the heartbeat of your circuit, telling all the sequential elements when to "tick."

A clock signal is simply a square wave that alternates between high (1) and low (0) at regular intervals:

```
     ┌───┐   ┌───┐   ┌───┐   ┌───┐
CLK: │   │   │   │   │   │   │   │
     ┘   └───┘   └───┘   └───┘   └───
     ←T→
```

The clock provides:

- **Synchronization**: All elements update at the same time
- **Predictability**: We know exactly when state changes occur
- **Noise immunity**: Changes only happen at clock edges, reducing sensitivity to glitches

In a **synchronous** digital system (which is what almost all modern digital systems are), all sequential elements are controlled by the same clock. This makes timing analysis tractable and behavior predictable.

!!! success "Why Clocks Matter"
    The introduction of clocked synchronous design in the 1950s was revolutionary. It transformed digital design from a timing nightmare into a manageable engineering discipline. Instead of worrying about every signal's timing, you only need to ensure signals are stable at clock edges.

## Clock Edges: The Moments That Matter

When using clocks, we care about specific moments called **clock edges**—the transitions between low and high (or vice versa).

A **clock edge** is the instant when the clock signal changes value. There are two types:

- **Rising edge** (positive edge): Clock goes from 0 to 1
- **Falling edge** (negative edge): Clock goes from 1 to 0

In edge-triggered circuits (which we'll study next chapter), state changes occur *only* at clock edges, not during the entire high or low period. This solves the transparency problem of level-sensitive latches.

```
         Rising    Falling   Rising
         Edge      Edge      Edge
           ↓         ↓         ↓
     ┌─────┐     ┌─────┐     ┌─────
CLK: │     │     │     │     │
─────┘     └─────┘     └─────┘
```

Most digital systems use rising-edge triggering because it's slightly easier to implement, but falling-edge triggering works equally well.

#### Diagram: Clock Signal and Edges

<iframe src="../../sims/clock-signal/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Clock Signal Properties Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Identify

Learning Objective: Students will be able to identify rising and falling edges in a clock signal and understand how these edges serve as triggering events for sequential circuits.

Instructional Rationale: Interactive clock visualization with highlighted edges helps students recognize the precise moments when state changes occur in edge-triggered systems.

Canvas Layout:

- Center: Large clock waveform display
- Markers highlighting rising and falling edges
- Bottom: Clock parameters (period, frequency, duty cycle)
- Side: Edge counter and edge type indicators

Interactive Elements:

- Adjustable clock frequency (slow for visualization)
- Rising edge highlight toggle
- Falling edge highlight toggle
- Click on edge to see "trigger event" indicator
- Edge counter incrementing with each edge
- Pause/play clock

Data Visibility:

- Current clock level (high/low)
- Time since last edge
- Edge type of most recent edge
- Running count of rising and falling edges
- Clock parameters (period, frequency, duty cycle)

Visual Style:

- Clean square wave with smooth animation
- Rising edges marked with upward arrow
- Falling edges marked with downward arrow
- Current portion of waveform highlighted
- Edge counts displayed as tickers

Implementation: p5.js with animated clock generation
</details>

## Rising Edge and Falling Edge: Which One Wins?

The **rising edge** (also called positive edge) is the transition from logic low (0) to logic high (1). Think of it as the clock "rising up" from 0 to 1.

The **falling edge** (also called negative edge) is the transition from logic high (1) to logic low (0). The clock is "falling down" from 1 to 0.

In circuit diagrams and datasheets, you'll often see:

- A small triangle at the clock input indicating edge-triggered behavior
- Sometimes a bubble before the triangle indicating falling-edge triggering

| Trigger Type | Symbol | Active On | Use Case |
|-------------|--------|-----------|----------|
| Rising edge | Triangle | 0→1 | Most common default |
| Falling edge | Bubble + Triangle | 1→0 | When needed for timing |

Why would you choose one over the other? Usually it's about timing relationships with other signals. If your data arrives and stabilizes during the clock high period, rising edge triggering gives you the entire high period for propagation. Different systems have different timing needs.

The good news: from a functional standpoint, rising and falling edge triggered circuits work identically. It's just a matter of *when* during the clock cycle the action happens.

## Clock Period: The Duration of One Cycle

The **clock period** (T) is the time it takes for the clock to complete one full cycle—from rising edge to the next rising edge (or falling edge to the next falling edge).

\[T = \text{time for one complete clock cycle}\]

The period is typically measured in nanoseconds (ns) for modern digital systems:

- 1 ns = 0.000000001 seconds = \(10^{-9}\) seconds
- A 1 GHz clock has a period of 1 ns
- A 100 MHz clock has a period of 10 ns

The clock period determines how much time you have for:

1. **Computation**: Logic gates must produce their outputs
2. **Propagation**: Signals must travel through wires
3. **Setup**: Data must be stable before the next clock edge
4. **Hold**: Data must remain stable after the clock edge

If your logic takes too long, you need a slower clock (longer period). This is why clock frequency is such an important specification for processors—it tells you how many operations per second the chip can perform.

## Clock Frequency: How Fast the Heart Beats

The **clock frequency** (f) is the reciprocal of the period—it tells you how many clock cycles occur per second.

\[f = \frac{1}{T}\]

Frequency is measured in Hertz (Hz):

- 1 Hz = 1 cycle per second
- 1 MHz = 1,000,000 cycles per second
- 1 GHz = 1,000,000,000 cycles per second

The clock frequency of a processor is one of its defining characteristics:

| Device | Typical Clock Frequency | Period |
|--------|------------------------|--------|
| Arduino (ATmega328) | 16 MHz | 62.5 ns |
| Raspberry Pi (ARM Cortex-A72) | 1.5 GHz | 0.67 ns |
| Modern desktop CPU | 3-5 GHz | 0.2-0.33 ns |
| DDR5 memory | 4.8-6.4 GHz | 0.15-0.2 ns |

Higher frequency means more operations per second, which generally means faster performance. But higher frequency also means:

- More power consumption (power ∝ frequency)
- More heat generation
- Tighter timing margins
- More challenging circuit design

The quest for higher clock speeds drove processor development for decades, until power and heat limits led to the multi-core revolution around 2005.

#### Diagram: Period and Frequency Relationship

<iframe src="../../sims/clock-period-frequency/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Clock Period and Frequency Calculator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will be able to calculate clock frequency from period and vice versa, understanding the reciprocal relationship between these quantities.

Instructional Rationale: Interactive calculator with visual waveform reinforces the mathematical relationship while connecting to concrete clock behavior.

Canvas Layout:

- Top: Clock waveform with period marked
- Middle: Dual sliders for period and frequency (reciprocally linked)
- Bottom: Calculation display showing f = 1/T
- Side: Common clock speeds for reference

Interactive Elements:

- Period slider (adjusts frequency automatically)
- Frequency slider (adjusts period automatically)
- Input fields for exact values
- Unit converter (ns, µs, ms for period; Hz, kHz, MHz, GHz for frequency)
- Preset buttons for common clock speeds
- Visual waveform updates to match current period

Data Visibility:

- Current period with unit
- Current frequency with unit
- Calculation shown: f = 1/T
- Reference comparison to common devices
- Number of cycles in a fixed time window

Visual Style:

- Waveform scales appropriately with period
- Sliders logarithmic for wide range
- Clean calculation display
- Reference chart for common frequencies

Implementation: p5.js with reciprocal calculation and unit conversion
</details>

## Duty Cycle: The Balance of High and Low

The **duty cycle** describes what fraction of each clock period the signal spends high. It's expressed as a percentage.

\[\text{Duty Cycle} = \frac{T_{high}}{T} \times 100\%\]

For an ideal square wave clock, the duty cycle is 50%—equal time high and low. But clocks don't have to be 50%:

- 50% duty cycle: \(T_{high} = T_{low}\) (symmetric)
- 25% duty cycle: High for 1/4 of period, low for 3/4
- 75% duty cycle: High for 3/4 of period, low for 1/4

Why does duty cycle matter?

1. **Power**: Some circuits consume more power when clock is high
2. **Timing margins**: Asymmetric clocks can provide more time for certain operations
3. **Multi-phase clocks**: Non-overlapping clocks need specific duty cycles
4. **Clock distribution**: Duty cycle can drift in long clock networks

Most synchronous systems use 50% duty cycle because it provides equal time for operations on rising and falling edges. But specialized applications might use different duty cycles.

!!! example "Duty Cycle in Practice"
    LED dimming often uses PWM (Pulse Width Modulation) where the duty cycle directly controls brightness. A 25% duty cycle means the LED is on only 25% of the time, appearing 1/4 as bright. The "clock" in this case might be a few hundred Hz—too fast for your eye to notice the blinking, but slow enough to easily control.

#### Diagram: Duty Cycle Visualizer

<iframe src="../../sims/duty-cycle/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Clock Duty Cycle Interactive</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Describe

Learning Objective: Students will be able to describe how duty cycle affects the proportion of time a clock signal spends in the high state versus the low state.

Instructional Rationale: Visual adjustment of duty cycle with real-time waveform and percentage display makes this timing concept intuitive.

Canvas Layout:

- Center: Clock waveform with variable duty cycle
- Top: Duty cycle slider (0% to 100%)
- Bottom: Time breakdown (T_high, T_low, percentage)
- Side: Applications of different duty cycles

Interactive Elements:

- Duty cycle slider
- Preset buttons (25%, 50%, 75%)
- Waveform updates in real-time
- Display of T_high and T_low durations
- Visual bar showing proportion of high vs. low
- Animation showing one complete cycle

Data Visibility:

- Current duty cycle percentage
- T_high duration
- T_low duration
- Total period T
- Ratio display

Visual Style:

- Waveform clearly shows high and low regions
- Color coding: high period in one color, low in another
- Proportional bar below waveform
- Clean percentage display

Implementation: p5.js with adjustable duty cycle waveform
</details>

## Putting It All Together: From Gates to Memory

Let's step back and appreciate what we've learned. Starting from simple logic gates, we've discovered how to build circuits that remember.

**The Journey:**

1. **Feedback** creates the possibility of memory
2. **Bistable elements** provide two stable states
3. **SR latches** give us control over which state to choose
4. **D latches** eliminate the invalid state problem
5. **Clock signals** provide synchronization
6. **Clock edges** will give us precise triggering (next chapter!)

**Key Equations:**

SR Latch: \(Q^+ = S + \overline{R} \cdot Q\) (with constraint S·R=0)

D Latch: \(Q^+ = D \cdot Enable + Q \cdot \overline{Enable}\)

Clock Frequency: \(f = \frac{1}{T}\)

Duty Cycle: \(\frac{T_{high}}{T} \times 100\%\)

**The Big Ideas:**

| Concept | Why It Matters |
|---------|---------------|
| State | Circuits can remember |
| Feedback | Enables memory in logic |
| Latches | Controllable memory elements |
| Level sensitivity | Transparency can cause problems |
| Clocks | Synchronization for reliable operation |

## Common Mistakes to Avoid

As you begin working with sequential logic, watch out for these pitfalls:

1. **Treating latches like combinational logic**: Remember, the output depends on history! The same inputs can produce different outputs depending on the current state.

2. **Forgetting the invalid state in SR latches**: Never apply S=R=1 to a basic SR latch. If you can't guarantee this, use a D latch instead.

3. **Ignoring the transparency window**: When a D latch is enabled, Q follows every change in D. Glitches matter!

4. **Confusing level-sensitive with edge-triggered**: Latches respond to levels; flip-flops respond to edges. We'll cover flip-flops next chapter, but don't mix up the terminology.

5. **Neglecting timing**: Sequential circuits are all about *when* things happen. A circuit that's logically correct might still fail due to timing issues.

6. **Forgetting that clock frequency and period are reciprocals**: If someone says "100 MHz" you should immediately think "10 ns period."

## Summary and Key Takeaways

Congratulations! You've crossed the threshold from combinational to sequential logic. This is a fundamental shift in how we think about digital circuits.

**Core Concepts:**

- **Sequential logic** circuits have memory—outputs depend on both current inputs and past history
- **State** is what the circuit remembers
- **Feedback loops** enable memory by routing outputs back to inputs
- **Bistable elements** have two stable states

**Latches:**

- **SR latch** uses Set and Reset inputs (invalid when S=R=1)
- **Gated SR latch** adds an Enable input for control
- **D latch** uses a single data input, eliminating invalid states
- **Level-sensitive** (transparent) behavior can cause timing problems

**Clocking:**

- **Clock signals** provide regular synchronization pulses
- **Rising edge**: 0→1 transition
- **Falling edge**: 1→0 transition
- **Period** (T): time for one complete cycle
- **Frequency** (f = 1/T): cycles per second
- **Duty cycle**: percentage of time spent high

!!! success "The Key Insight"
    Memory comes from feedback, but useful memory requires control. The evolution from raw feedback loops to gated latches to clocked systems is the story of gaining ever more precise control over when and how state changes. Next chapter, we'll see how edge-triggered flip-flops solve the level-sensitivity problem once and for all.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
A compelling graphic novel could tell the story of the engineers who first grappled with building reliable memory circuits in the 1940s and 1950s. The drama would center on the "race condition" problem—circuits that worked sometimes but failed mysteriously. We could follow the development of the flip-flop from early vacuum tube implementations through to transistor versions, with tension building around the discovery that edge-triggering could solve problems that had plagued level-sensitive designs. The climax could feature the moment when synchronous design principles finally made reliable large-scale digital systems possible.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: State Identification"
    A sequential circuit has output Q that is currently 1. If you apply S=0, R=0 to an SR latch, what is the next state of Q?

    **Solution:**
    With S=0 and R=0, the SR latch is in "hold" mode. The output Q remains at whatever value it currently has. Since Q is currently 1, Q stays 1.

??? question "Problem 2: D Latch Behavior"
    A D latch has Enable=1, D=0, and Q=1. What happens to Q? Then Enable goes to 0 while D changes to 1. What is Q now?

    **Solution:**
    Step 1: Enable=1, D=0 → The latch is transparent, so Q follows D. Q becomes 0.
    Step 2: Enable goes to 0 → The latch holds its current value (Q=0).
    Step 3: D changes to 1 while Enable=0 → The latch ignores D since it's disabled. Q remains 0.

??? question "Problem 3: Clock Calculations"
    A processor has a 2.5 GHz clock. What is the clock period? How many clock cycles occur in 1 microsecond?

    **Solution:**
    Period: \(T = \frac{1}{f} = \frac{1}{2.5 \times 10^9} = 0.4 \times 10^{-9} = 0.4\) ns = 400 ps

    Cycles in 1 µs: \(\frac{1 \times 10^{-6}}{0.4 \times 10^{-9}} = 2500\) cycles

??? question "Problem 4: Invalid State"
    Why can't S and R both be 1 in an SR latch built from NOR gates? What happens to Q and \(\overline{Q}\)?

    **Solution:**
    When S=R=1 in a NOR-based SR latch, both NOR gates have at least one input at 1, so both outputs become 0. This means Q=0 and \(\overline{Q}\)=0, which violates the requirement that they be complements. Additionally, when both inputs return to 0, the circuit enters an unstable race condition where the final state depends on which gate's input drops first—making the behavior unpredictable.

??? question "Problem 5: Duty Cycle"
    A clock has a period of 20 ns and is high for 8 ns. What is the duty cycle? If the frequency is doubled while maintaining the same duty cycle, how long is the high time?

    **Solution:**
    Duty cycle: \(\frac{8}{20} \times 100\% = 40\%\)

    If frequency doubles, period halves to 10 ns.
    With 40% duty cycle: \(T_{high} = 0.4 \times 10 = 4\) ns

??? question "Problem 6: Timing Analysis"
    A D latch has Enable=1 continuously. D starts at 0, then goes to 1, then to 0, then to 1. What is the final value of Q?

    **Solution:**
    With Enable=1 continuously, the latch is transparent. Q follows every change in D:
    - D=0 → Q=0
    - D=1 → Q=1
    - D=0 → Q=0
    - D=1 → Q=1

    Final Q = 1. The latch captures every transition while transparent.
