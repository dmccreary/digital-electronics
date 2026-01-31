---
title: Finite State Machine Fundamentals
description: The core abstraction for designing sequential digital systems with well-defined behavior
generated_by: claude skill chapter-content-generator
date: 2026-01-31 20:45:00
version: 0.03
---

# Finite State Machine Fundamentals

## Summary

This chapter introduces finite state machines (FSMs), the core abstraction for designing sequential digital systems with well-defined behavior. Students will learn the FSM model including states, transitions, inputs, and outputs, understand the distinction between Moore machines (outputs depend only on state) and Mealy machines (outputs depend on state and inputs), and master state diagram and state table representations. The chapter covers state encoding strategies including binary, one-hot, and Gray code encoding, along with state assignment optimization and state minimization techniques.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Finite State Machine
2. FSM State
3. State Transition
4. Current State
5. Next State
6. Next State Logic
7. Output Logic
8. Moore Machine
9. Moore Output
10. Mealy Machine
11. Mealy Output
12. State Diagram
13. State Diagram Notation
14. State Table
15. State Encoding
16. Binary Encoding
17. One-Hot Encoding
18. Gray Code Encoding
19. State Assignment
20. State Minimization

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Combinational Logic Design Fundamentals](../04-combinational-logic-design/index.md)
- [Chapter 7: Introduction to Sequential Logic](../07-intro-sequential-logic/index.md)
- [Chapter 8: Flip-Flops and Timing](../08-flip-flops-timing/index.md)

---

## Introduction: The Machine That Remembers Where It's Been

Welcome to what might be the most empowering chapter in this entire course. You're about to learn how to design systems that think—well, at least systems that can remember what they're doing and decide what to do next based on what's happened before.

Consider a traffic light. It's not just randomly cycling colors. It *knows* it's currently showing green, it *knows* it should go yellow next, and it *knows* how long to wait. When a pedestrian presses the crossing button, it *knows* to factor that into its decision. That traffic light is running a finite state machine—and by the end of this chapter, you'll be able to design one from scratch.

Or think about your favorite video game. When your character is standing, they can jump, run, or duck. When they're jumping, they can't duck (physics, people!), but they can transition to falling. These relationships between actions form a state machine that governs everything from Mario's platforming to the AI controlling enemy behavior.

Here's the beautiful secret: finite state machines are the bridge between the abstract world of flip-flops and the complex behaviors we see in real digital systems. They're the *lingua franca* of sequential design—the language in which digital designers describe behavior before writing a single line of Verilog.

Ready to speak fluent state machine? Let's go!

## What Is a Finite State Machine?

A **Finite State Machine** (FSM) is a mathematical model of computation that describes a system with a limited number of states, rules for transitioning between states, and (often) outputs that depend on the current state or transitions.

The word "finite" is crucial: the machine can only be in one of a predetermined, countable number of states. Unlike a general-purpose computer that can represent arbitrary amounts of information in memory, an FSM has exactly \(N\) possible states, no more, no less.

Every FSM has five essential components:

1. **States**: The possible configurations the system can be in
2. **Inputs**: External signals that affect transitions
3. **Outputs**: Signals the system produces
4. **Transitions**: Rules for moving between states
5. **Initial state**: Where the system starts

Think of an FSM like a board game where:

- The **states** are the squares on the board
- The **inputs** are the dice rolls or card draws
- The **transitions** are the rules saying "if you're here and you roll this, go there"
- The **outputs** might be "collect $200" or "go to jail"
- The **initial state** is "Start"

!!! tip "The Power of Abstraction"
    FSMs are powerful because they hide complexity. You don't need to think about flip-flops, timing, or gates when designing at the FSM level. You specify *behavior*, and then systematically derive the *implementation*.

Here's a simple example—a coin-operated turnstile:

| Current State | Input | Next State | Output |
|--------------|-------|------------|--------|
| Locked | Push | Locked | Nothing (blocked) |
| Locked | Coin | Unlocked | Allow passage |
| Unlocked | Push | Locked | Person passes through |
| Unlocked | Coin | Unlocked | Nothing (coin returned) |

Two states. Two inputs. Complete specification of behavior. That's the elegance of FSMs.

## FSM State: Snapshots of Your System

An **FSM State** represents a unique configuration of the system—a snapshot of everything the machine needs to remember to determine its future behavior.

States capture memory in its most abstract form. When we say a traffic light is in the "Green" state, we're saying the system remembers it's showing green right now. When we say a vending machine is in the "75 cents deposited" state, it remembers exactly how much money has been inserted.

Key properties of states:

- **Mutually exclusive**: The system is in exactly one state at any moment
- **Collectively exhaustive**: The states cover all possible situations
- **Well-defined**: Each state has clear meaning and implications
- **Finite in number**: There's a countable set of states

States are typically given descriptive names that reflect their meaning:

- Traffic light: `GREEN`, `YELLOW`, `RED`, `WALK_SIGNAL`
- Lock combination: `IDLE`, `FIRST_CORRECT`, `SECOND_CORRECT`, `UNLOCKED`
- Elevator: `STOPPED_FLOOR_1`, `MOVING_UP`, `STOPPED_FLOOR_2`, `MOVING_DOWN`

!!! note "States vs. State Variables"
    We often implement states using flip-flops (state variables). A system with 4 states needs 2 flip-flops (since \(2^2 = 4\)). But conceptually, we think about the *abstract states*, not the flip-flop values. The encoding is a separate concern we'll tackle later.

#### Diagram: FSM State Concept Visualizer

<iframe src="../../sims/fsm-state-concept/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>FSM State Concept Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain what an FSM state represents and how a system can only occupy one state at a time while transitioning between states based on inputs.

Instructional Rationale: Visual representation of states as distinct "locations" with highlighting of the current state reinforces the concept that exactly one state is active at any moment.

Canvas Layout:

- Main area: Multiple state circles arranged visually
- Current state highlighted with distinct color
- Input controls at bottom
- State description panel on side
- Transition arrows showing possible next states

Interactive Elements:

- Multiple input buttons to trigger transitions
- Current state displays its name and description
- Possible transitions highlighted from current state
- Transition animation when input triggers state change
- State history log showing sequence of states visited
- Reset button to return to initial state

Data Visibility:

- Current state name prominently displayed
- State description text
- Available inputs from current state
- Where each input will lead
- History of states visited

Visual Style:

- States as colored circles with names inside
- Current state glowing or highlighted
- Arrows showing transitions with input labels
- Inactive states shown dimmer
- Clean, uncluttered layout emphasizing one-at-a-time nature

Implementation: p5.js with state tracking and transition animation
</details>

How many states do you need? That depends entirely on what your system needs to remember:

- **Remembering one binary choice**: 2 states (e.g., ON/OFF)
- **Remembering a sequence position**: As many states as sequence steps
- **Remembering multiple independent things**: States multiply (3 options × 4 options = 12 states)

A system that needs to track both whether it's powered on (2 choices) and which of 4 modes it's in (4 choices) needs \(2 \times 4 = 8\) states, not 6.

## State Transition: The Rules of Movement

A **State Transition** defines how the system moves from one state to another based on inputs. Transitions are the dynamics of your FSM—they answer the question "what happens next?"

Every transition has three components:

1. **Source state**: Where you're coming from
2. **Input condition**: What triggers the transition
3. **Destination state**: Where you're going

We can write transitions in several ways:

**Text notation**: `STATE_A --[input=1]--> STATE_B`

**Table notation**:

| Current State | Input | Next State |
|--------------|-------|------------|
| STATE_A | 1 | STATE_B |
| STATE_A | 0 | STATE_A |

**Equation notation**: If in STATE_A and input=1, then next_state = STATE_B

Important rules for transitions:

- **Deterministic**: For any state and input combination, there's exactly one transition (one next state)
- **Complete**: Every state must have a transition defined for every possible input
- **Self-loops allowed**: A state can transition to itself (stay in place)

What happens if you don't define a transition for some input? That's a design error. The system won't know what to do, and in real hardware, undefined behavior leads to unpredictable results.

!!! warning "Don't Forget the Default Cases"
    When designing FSMs, it's easy to focus on the "interesting" transitions and forget the cases where nothing happens. Always ask: "What should the system do if it's in state X and receives an unexpected input?" Usually, the answer is "stay in state X" (a self-loop).

Consider a simple sequence detector that looks for the pattern "01":

| Current State | Input | Next State | Interpretation |
|--------------|-------|------------|----------------|
| IDLE | 0 | SAW_0 | First 0 seen, looking for 1 |
| IDLE | 1 | IDLE | Wrong start, keep waiting |
| SAW_0 | 0 | SAW_0 | Another 0, still valid start |
| SAW_0 | 1 | DETECTED | Pattern complete! |
| DETECTED | 0 | SAW_0 | Start of new pattern |
| DETECTED | 1 | IDLE | Pattern broken, reset |

Notice how every state-input pair has exactly one outcome. No ambiguity, no missing cases.

## Current State and Next State: Time's Arrow

In FSM design, we constantly distinguish between **Current State** (where we are now) and **Next State** (where we'll be after the clock edge).

This distinction maps directly to our flip-flop knowledge from Chapter 8:

- **Current state** is stored in flip-flops (the \(Q\) outputs)
- **Next state** is computed by combinational logic (feeds the \(D\) inputs)
- At each **clock edge**, next state becomes current state

```
                    ┌──────────────────────┐
Current State ──────┤                      │
(Q outputs)         │   Combinational      ├──── Next State
                    │   (Next State        │     (D inputs)
Inputs ─────────────┤    Logic)            │
                    └──────────────────────┘
                              │
                              └──── fed back to flip-flops
```

This is the fundamental FSM equation in action:

\[S^+ = f(S, I)\]

Where:

- \(S^+\) is the next state
- \(S\) is the current state
- \(I\) is the current inputs
- \(f\) is the next-state function (defined by your transition table)

At every clock edge, the flip-flops perform the update:

\[S \leftarrow S^+\]

The separation between current and next state is what makes FSMs *synchronous*—all state changes happen simultaneously at clock edges, not whenever some random signal changes.

#### Diagram: Current State to Next State Flow

<iframe src="../../sims/current-next-state/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Current State to Next State Flow</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Describe

Learning Objective: Students will be able to describe how the next state is computed from the current state and inputs, and how the clock edge causes the transition to occur.

Instructional Rationale: Animating the flow from current state through next-state logic to next state, with clock edge triggering the update, makes the synchronous nature of FSMs concrete.

Canvas Layout:

- Left: Current state register (flip-flops) with Q outputs
- Center: Next-state logic cloud with inputs feeding in
- Right: Next state values (D inputs to flip-flops)
- Bottom: Clock waveform with trigger button
- Top: Visual of current vs next state values

Interactive Elements:

- Input toggles to change external inputs
- Current state display
- Next state preview (computed but not yet latched)
- Clock edge button to trigger state update
- Animation showing data flow through the system
- Step-by-step mode vs continuous clock mode
- State equation display

Data Visibility:

- Current state (binary and symbolic name)
- All inputs
- Next state computation (shows logic)
- Next state result
- Comparison of current vs next

Visual Style:

- Flip-flops shown as storage elements
- Combinational logic as cloud/box
- Data flow shown with animated arrows
- Clock edge as rising pulse
- State change animation at edge
- Color distinction between current (blue) and next (orange)

Implementation: p5.js with synchronized state updates and flow animation
</details>

Think of it this way: the current state is like your bank balance right now. The next state is what your balance will be after the next transaction (computed but not yet posted). The clock edge is when the bank "posts" the transaction and your balance actually changes.

## Next State Logic: The Decision Maker

**Next State Logic** is the combinational circuit that computes what the next state should be based on the current state and inputs. It's the "brain" of your FSM.

The next state logic implements the transition table we've been drawing. For each combination of current state and inputs, it produces the next state.

Here's how it fits in the FSM architecture:

```
           ┌─────────────────────────────────────┐
           │                                     │
           ▼                                     │
    ┌────────────┐     ┌───────────────┐    ┌───┴───┐
    │   Next     │     │    State      │    │ Output │
    │   State    │────▶│   Register    │───▶│  Logic │──▶ Outputs
    │   Logic    │     │  (Flip-Flops) │    │        │
    └────────────┘     └───────────────┘    └────────┘
           ▲                   │
           │                   │
    Inputs │                   │ Current State
           │                   │
           └───────────────────┘
```

Designing next state logic:

1. **Start with the transition table**
2. **Assign binary codes to states** (state encoding)
3. **Write Boolean equations for each flip-flop input**
4. **Simplify using K-maps or Boolean algebra**
5. **Implement with gates**

Example: For a 2-bit state register (states encoded as 00, 01, 10, 11), you need equations for \(D_1\) and \(D_0\):

\[D_1 = f_1(Q_1, Q_0, inputs)\]
\[D_0 = f_0(Q_1, Q_0, inputs)\]

These are just combinational logic functions—the same kind you've been designing since Chapter 4!

!!! tip "Next State Logic Is Just Combinational Logic"
    Don't let the FSM terminology intimidate you. The "next state logic" is simply combinational logic that you already know how to design. The inputs are state bits and external inputs. The outputs are the D inputs to your flip-flops.

## Output Logic: Speaking to the World

**Output Logic** is the combinational circuit that generates the FSM's outputs based on current state (and possibly inputs). It's how your FSM communicates its decisions to the outside world.

Outputs might include:

- **Control signals**: Enable a counter, start a motor, trigger an alarm
- **Status indicators**: LEDs, displays, ready/busy flags
- **Data selects**: Mux controls, memory addresses
- **Handshaking**: Request, acknowledge, valid signals

Output logic comes in two flavors, depending on whether outputs depend only on state (Moore) or on state plus inputs (Mealy). We'll explore this distinction shortly.

The position of output logic in the architecture:

```
                                    ┌──────────────┐
Current State ─────────────────────▶│              │
                                    │   Output     │──▶ Outputs
Inputs ─────────────────────────────▶│   Logic     │
(only for Mealy machines)           │              │
                                    └──────────────┘
```

Like next state logic, output logic is purely combinational. You derive it from the output specifications in your state table.

Example output equations for a traffic light controller:

\[RED = Q_1 \cdot Q_0\]
\[YELLOW = Q_1 \cdot \overline{Q_0}\]
\[GREEN = \overline{Q_1} \cdot Q_0 + \overline{Q_1} \cdot \overline{Q_0}\]

These equations turn on the appropriate light based on the encoded state value.

## Moore Machine: Outputs Depend Only on State

A **Moore Machine** is an FSM where outputs depend *only* on the current state—not on the inputs.

Named after Edward Moore who formalized this model in 1956, Moore machines have a clean separation between what you're doing (state) and what you're reacting to (inputs).

Key characteristics:

- Outputs change only when state changes
- Outputs are "associated with" states, not transitions
- Output logic uses only state bits as inputs
- Outputs are synchronous to the clock (change at clock edges)

Moore machine architecture:

```
           ┌─────────────────────────────────────┐
           │                                     │
           ▼                                     │
    ┌────────────┐     ┌───────────────┐    ┌───┴───────┐
    │   Next     │     │    State      │    │  Output   │
    │   State    │────▶│   Register    │───▶│   Logic   │──▶ Outputs
    │   Logic    │     │  (Flip-Flops) │    │ (f of S)  │
    └────────────┘     └───────────────┘    └───────────┘
           ▲                   │
    Inputs │                   │
           └───────────────────┘
```

Notice: Inputs feed into next state logic but NOT into output logic.

In state diagrams, Moore outputs are written *inside* the state circles:

```
        ┌─────────────┐
        │   STATE_A   │
        │  Out=1      │
        └─────────────┘
```

**Advantages of Moore machines:**

- Outputs are glitch-free (change only at clock edges)
- Easier to debug (output tells you the state)
- Cleaner timing analysis
- More predictable for interface design

**Disadvantages:**

- Often need more states to achieve same functionality as Mealy
- Outputs respond one clock cycle later to input changes

!!! example "Moore Machine Example: Traffic Light"
    A traffic light controller is naturally a Moore machine. The light color (output) depends only on the state (which phase we're in), not on the inputs (car sensors). When you're in the GREEN state, the green light is on—period. Input sensors affect transitions but not outputs.

## Moore Output: The State Speaks

The **Moore Output** is defined as a function of state only:

\[Output = g(S)\]

Where \(S\) is the current state and \(g\) is the output function.

Since there's no input dependency, the output is stable for the entire time the machine is in a given state. It changes only when the state changes (at clock edges).

#### Diagram: Moore Machine Simulator

<iframe src="../../sims/moore-machine/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Moore Machine Simulator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate how Moore machine outputs depend only on the current state by manipulating inputs and observing that outputs change only when state changes, not when inputs change.

Instructional Rationale: Interactive exploration where students change inputs and observe that outputs remain stable until the next clock edge (when state might change) reinforces the Moore machine definition.

Canvas Layout:

- Left: State diagram with states and transitions
- Center: Current state highlighted with output displayed
- Right: Timing diagram showing inputs, state, and outputs
- Bottom: Input controls and clock trigger

Interactive Elements:

- Input toggle buttons
- Clock edge button
- Current state indicator
- Output value display
- Timing diagram that builds over time
- Highlight showing output comes from state, not inputs
- "Why didn't output change?" callouts when input changes but output doesn't

Data Visibility:

- Current state and its associated outputs
- Input values
- When outputs change (only at state transitions)
- Output equation showing state-only dependency
- Timing relationship between clock, state, and outputs

Visual Style:

- State diagram with outputs shown inside states
- Current state glowing
- Output values prominently displayed
- Timing diagram with clear cause-effect marking
- Arrows from state to output (not from inputs to output)

Implementation: p5.js with Moore machine simulation and timing diagram
</details>

Consider a simple 2-state Moore machine:

| State | State Encoding | Output |
|-------|---------------|--------|
| IDLE | 0 | 0 |
| ACTIVE | 1 | 1 |

The output equation is trivially:

\[Output = Q\]

For a more complex Moore machine with 4 states and 2 outputs:

| State | Encoding (Q1 Q0) | LED_A | LED_B |
|-------|-----------------|-------|-------|
| OFF | 00 | 0 | 0 |
| STANDBY | 01 | 0 | 1 |
| RUNNING | 10 | 1 | 0 |
| ERROR | 11 | 1 | 1 |

Output equations:

\[LED\_A = Q_1\]
\[LED\_B = Q_0\]

Simple, clean, and glitch-free.

## Mealy Machine: Outputs React Immediately

A **Mealy Machine** is an FSM where outputs depend on *both* the current state and the current inputs.

Named after George Mealy who described this model in 1955, Mealy machines can produce outputs that react immediately to inputs, without waiting for a clock edge.

Key characteristics:

- Outputs can change whenever inputs change (even between clock edges)
- Outputs are "associated with" transitions, not just states
- Output logic uses both state bits and inputs
- Outputs are asynchronous with respect to the clock

Mealy machine architecture:

```
           ┌─────────────────────────────────────┐
           │                                     │
           ▼                                     │
    ┌────────────┐     ┌───────────────┐         │
    │   Next     │     │    State      │         │
    │   State    │────▶│   Register    │─────────┘
    │   Logic    │     │  (Flip-Flops) │
    └────────────┘     └───────────────┘
           ▲                   │
    Inputs │                   │
           │                   ▼
           │            ┌─────────────┐
           └───────────▶│   Output    │──▶ Outputs
                        │ Logic (f of │
                        │  S AND I)   │
                        └─────────────┘
```

In state diagrams, Mealy outputs are written *on the transition arrows*:

```
        ┌─────────┐   Input/Output   ┌─────────┐
        │ STATE_A │ ───────────────▶ │ STATE_B │
        │         │      1/Y         │         │
        └─────────┘                  └─────────┘
```

**Advantages of Mealy machines:**

- Often fewer states needed for same functionality
- Outputs respond to inputs within the same clock cycle
- More "reactive" behavior

**Disadvantages:**

- Outputs can glitch if inputs are noisy or glitchy
- Timing analysis more complex
- Outputs may have combinational delay after input changes

!!! warning "Mealy Output Glitches"
    Because Mealy outputs depend on combinational logic from inputs, they can produce glitches—brief incorrect values during input transitions. If your outputs drive other sequential logic, these glitches might get captured, causing errors. Register Mealy outputs if this is a concern.

## Mealy Output: React and Respond

The **Mealy Output** is defined as a function of both state and inputs:

\[Output = h(S, I)\]

Where \(S\) is the current state, \(I\) is the inputs, and \(h\) is the output function.

#### Diagram: Mealy Machine Simulator

<iframe src="../../sims/mealy-machine/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mealy Machine Simulator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate how Mealy machine outputs depend on both current state AND inputs by observing output changes that occur immediately when inputs change, without waiting for a clock edge.

Instructional Rationale: Contrasting Mealy behavior with Moore behavior (where outputs don't change between clock edges) makes the distinction clear and memorable.

Canvas Layout:

- Left: State diagram with transitions labeled Input/Output
- Center: Current state with live output calculation
- Right: Timing diagram showing immediate output response
- Bottom: Input controls and clock trigger

Interactive Elements:

- Input toggle buttons (outputs change immediately!)
- Clock edge button (for state transitions)
- Current state indicator
- Output value display (updates asynchronously to inputs)
- Timing diagram showing output changes between clock edges
- Side-by-side comparison mode with equivalent Moore machine
- Glitch simulation option

Data Visibility:

- Current state
- Input values
- Output values (computed from state AND inputs)
- Output equation showing both dependencies
- When outputs change (can be between clock edges)
- Highlight showing output reacts to input changes

Visual Style:

- State diagram with Input/Output on transitions
- Current transition highlighted when triggered
- Output values update immediately with input changes
- Timing diagram shows asynchronous output behavior
- Clear visual difference from Moore simulator

Implementation: p5.js with Mealy machine simulation and immediate output updates
</details>

Example: Consider a Mealy machine for a door access controller

| State | Input | Output | Next State |
|-------|-------|--------|------------|
| LOCKED | correct_code=0 | unlock=0 | LOCKED |
| LOCKED | correct_code=1 | unlock=1 | UNLOCKED |
| UNLOCKED | timeout=0 | unlock=1 | UNLOCKED |
| UNLOCKED | timeout=1 | unlock=0 | LOCKED |

In the LOCKED state with correct_code=1, the door unlocks *immediately* (before the next clock edge), then the state transitions to UNLOCKED.

The output equation:

\[unlock = (LOCKED \cdot correct\_code) + (UNLOCKED \cdot \overline{timeout})\]

Or in terms of state bits:

\[unlock = (\overline{Q} \cdot correct\_code) + (Q \cdot \overline{timeout})\]

Notice how the output changes immediately when `correct_code` goes high, without waiting for a clock edge. This is the defining characteristic of Mealy machines.

## Moore vs Mealy: The Great Debate

Here's a side-by-side comparison to help you choose:

| Feature | Moore Machine | Mealy Machine |
|---------|---------------|---------------|
| Outputs depend on | State only | State AND inputs |
| Output timing | Synchronous (at clock edges) | Asynchronous (can change anytime) |
| Output glitches | None (clean) | Possible (need care) |
| Number of states | Usually more | Usually fewer |
| Response latency | One clock cycle | Same clock cycle |
| State diagrams | Outputs inside states | Outputs on transitions |
| Debugging | Easier (state = output) | Harder (need inputs too) |

**When to use Moore:**

- Outputs must be glitch-free
- Interfacing with other synchronous systems
- Simpler debugging is valuable
- One clock cycle latency is acceptable

**When to use Mealy:**

- Minimum state count is important
- Immediate response to inputs required
- Outputs are registered before use anyway
- State machine is simple enough that glitches aren't a concern

!!! tip "The Hybrid Approach"
    Many real designs use registered Mealy outputs—compute outputs as Mealy (from state and inputs) but register them through flip-flops before sending them out. This gives you the state efficiency of Mealy with the clean timing of Moore.

Here's a classic example showing the state difference:

**Sequence detector for "11" (detect when two 1s in a row)**

Moore version (3 states):

- S0: Haven't seen anything useful
- S1: Saw one 1
- S2: Saw two 1s in a row → output = 1

Mealy version (2 states):

- S0: Haven't seen a 1 recently
- S1: Just saw a 1 → if input=1, output=1 (detecting the pattern right now!)

The Mealy machine needs one fewer state because it can output the detection signal *during* the second 1, rather than waiting for a dedicated "detected" state.

## State Diagram: A Picture Worth a Thousand Gates

A **State Diagram** is the graphical representation of an FSM, showing states as circles (or rounded rectangles) and transitions as arrows between them.

State diagrams are the most common way to specify FSM behavior during the design phase. They're intuitive, compact, and catch missing transitions at a glance.

Elements of a state diagram:

- **States**: Circles or ovals with state name inside
- **Initial state**: Indicated by an arrow from nowhere (or filled dot)
- **Transitions**: Arrows from source state to destination state
- **Transition labels**: Input conditions that trigger the transition
- **Outputs**: Inside states (Moore) or on transitions (Mealy)

#### Diagram: State Diagram Builder

<iframe src="../../sims/state-diagram-builder/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive State Diagram</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine state diagrams to trace execution paths, verify completeness, and identify potential design issues such as missing transitions or unreachable states.

Instructional Rationale: Interactive state diagram with animation of current state and transition highlighting builds intuition for how FSMs execute over time.

Canvas Layout:

- Main area: State diagram canvas with draggable states
- Current state highlighted with animation
- Input sequence panel at bottom
- Execution trace panel on right
- Validation messages for completeness

Interactive Elements:

- Click states to view details
- Hover transitions to see conditions
- Input sequence entry (type binary string)
- Play/step through execution
- Highlight current state and taken transition
- Warning indicators for incomplete transitions
- Reachability analysis button

Data Visibility:

- All states with names and outputs
- All transitions with conditions
- Current state (highlighted)
- Input sequence being processed
- Execution trace (state history)
- Completeness check results

Visual Style:

- Clean state diagram with standard notation
- Current state with glow/pulse animation
- Active transition arrow highlighted
- Input/output labeling consistent with selected mode (Moore/Mealy)
- Grid snap for neat layout
- Color coding by state type (initial, accepting, normal)

Implementation: p5.js with state machine execution engine
</details>

Here's an example state diagram for a simple counter that counts 0→1→2→3→0:

```
        ┌─────────────────────────────────┐
        │                                 │
        ▼                                 │
   ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
──▶│  S0     │────▶│   S1    │────▶│   S2    │────▶│   S3    │
   │ count=0 │     │ count=1 │     │ count=2 │     │ count=3 │
   └─────────┘     └─────────┘     └─────────┘     └─────────┘
        │
        └── Initial state arrow
```

(All transitions are unconditional on clock edge)

For a more complex example with conditional transitions:

```
            Input=0              Input=0
         ┌─────────┐          ┌─────────┐
         │         ▼          │         ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
──▶│  IDLE   │─Input=1─▶│ SAW_1   │─Input=1─▶│DETECTED │
   │  out=0  │          │  out=0  │          │  out=1  │
   └─────────┘          └─────────┘          └─────────┘
                              │                   │
                              │    Input=0        │
                              ▼                   │
                         (back to IDLE)◀──────────┘
```

State diagrams make it easy to verify:

- **Completeness**: Every state has a transition for every input
- **Reachability**: Can every state be reached from the initial state?
- **No dead ends**: Can the machine escape from every state?

## State Diagram Notation: Speaking the Language

**State Diagram Notation** refers to the specific conventions used to represent states, transitions, and outputs in a state diagram.

While there's no single universal standard, common conventions include:

**State representation:**

```
┌──────────────┐
│ STATE_NAME   │  ← State name
│ Output=value │  ← Moore outputs (optional here)
└──────────────┘
```

**Transition representation:**

```
──── Input_condition ────▶
          │
    Input/Output  ← Mealy notation (Input/Output)
```

**Common notations for transitions:**

| Notation | Meaning |
|----------|---------|
| `X=1` | Transition when input X equals 1 |
| `X` | Same as X=1 (shorthand) |
| `X'` or `~X` | Transition when X equals 0 |
| `XY` | Transition when X AND Y are both 1 |
| `X+Y` | Transition when X OR Y is 1 |
| `*` | Always (unconditional transition) |
| `else` | Any input not covered by other transitions |

**Moore notation example:**

```
┌─────────┐           ┌─────────┐
│  GREEN  │───tmr────▶│ YELLOW  │
│ light=G │           │ light=Y │
└─────────┘           └─────────┘
```

**Mealy notation example:**

```
┌─────────┐           ┌─────────┐
│  IDLE   │──req/ack─▶│ ACTIVE  │
└─────────┘           └─────────┘
```

The `req/ack` means: when input `req`=1, transition and output `ack`=1.

**Initial state indicators:**

- Arrow from nowhere pointing to initial state
- Filled circle with arrow to initial state
- Double-circle around initial state
- Label "START" or "RESET"

**Multiple transitions with same destination:**

```
        ┌─────┐
        │     │
    X=0 │     │ X=1
        ▼     ▼
    ┌─────────────┐
    │   NEXT      │
    └─────────────┘
```

Or combined:

```
    ─── X=0, X=1 ───▶ (meaning "always")
```

!!! note "Notation Varies by Industry"
    EE courses often use the simple notation shown here. Industrial tools like Simulink or Quartus may use different conventions. The concepts are the same—just learn the specific notation required for your tools.

## State Table: The Complete Specification

A **State Table** is a tabular representation of an FSM that explicitly lists every combination of current state and inputs, along with the resulting next state and outputs.

State tables are more verbose than state diagrams but are essential for:

- Systematic derivation of Boolean equations
- Verification that all cases are covered
- Input to CAD tools that synthesize hardware

A complete state table has columns for:

- Current state
- Each input (or input combination)
- Next state
- Each output

**Moore machine state table format:**

| Current State | Input | Next State | Output |
|--------------|-------|------------|--------|
| (determined by state only) |

Note: In a Moore table, output can be listed separately since it depends only on current state.

**Mealy machine state table format:**

| Current State | Input | Next State | Output |
|--------------|-------|------------|--------|
| (output varies with input combination) |

Example: Sequence detector for "01" pattern

**Moore-style state table:**

| Current State | State Encoding | Input X | Next State | Output Z |
|--------------|----------------|---------|------------|----------|
| IDLE | 00 | 0 | SAW_0 | 0 |
| IDLE | 00 | 1 | IDLE | 0 |
| SAW_0 | 01 | 0 | SAW_0 | 0 |
| SAW_0 | 01 | 1 | FOUND | 0 |
| FOUND | 10 | 0 | SAW_0 | 1 |
| FOUND | 10 | 1 | IDLE | 1 |

From this table, we can derive:

**Next state equations:**

\[Q_1^+ = Q_0 \cdot X\]

\[Q_0^+ = \overline{X}\]

**Output equation:**

\[Z = Q_1\]

#### Diagram: State Table to Circuit

<iframe src="../../sims/state-table-circuit/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>State Table to Circuit Derivation</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement

Learning Objective: Students will be able to implement an FSM circuit from a state table by deriving next-state and output equations and connecting them to flip-flops.

Instructional Rationale: Step-by-step derivation from state table through Boolean equations to circuit implementation makes the design process concrete and repeatable.

Canvas Layout:

- Left: Editable state table
- Center: K-map or equation derivation area
- Right: Generated circuit schematic
- Bottom: Simulation controls to verify the design

Interactive Elements:

- Edit state table entries
- Auto-generate K-maps for next state and outputs
- Highlight which row of table applies to current state/input
- Step through: table → K-map → equation → circuit
- Simulate the resulting circuit
- Compare simulation results to table specification

Data Visibility:

- State table with all entries
- Derived Boolean equations
- K-maps showing minimization
- Circuit schematic
- Current state/input/output during simulation
- Match/mismatch indicator between spec and implementation

Visual Style:

- Clean tabular display
- K-maps with standard formatting
- Circuit schematic with D flip-flops and gates
- Highlighting to show derivation steps
- Animation of simulation through the circuit

Implementation: p5.js with K-map solver and circuit rendering
</details>

The beauty of state tables is their completeness—every possible combination is explicitly defined, leaving no ambiguity.

## State Encoding: Giving States Binary Names

**State Encoding** is the process of assigning binary codes (flip-flop values) to abstract states. Since flip-flops store binary values, we need to translate state names like "IDLE" and "RUNNING" into patterns like "00" and "01".

For an FSM with \(N\) states, we need at least \(\lceil \log_2 N \rceil\) flip-flops.

| Number of States | Minimum Flip-Flops Needed |
|-----------------|---------------------------|
| 2 | 1 |
| 3-4 | 2 |
| 5-8 | 3 |
| 9-16 | 4 |
| 17-32 | 5 |

The encoding choice significantly affects:

- **Circuit complexity**: Some encodings lead to simpler next-state logic
- **Hazards and glitches**: Some encodings minimize output glitches
- **Speed**: More flip-flops mean wider datapaths but potentially simpler logic
- **Power consumption**: One-hot encoding has more flip-flops but fewer transitions

Common encoding strategies:

1. **Binary encoding**: Minimum flip-flops, states numbered 0, 1, 2, ...
2. **One-hot encoding**: One flip-flop per state, exactly one is hot
3. **Gray code encoding**: Adjacent states differ by only one bit

Let's explore each in detail.

## Binary Encoding: The Compact Choice

**Binary Encoding** (also called dense encoding) uses the minimum number of flip-flops by assigning sequential binary numbers to states.

For 4 states:

| State | Binary Code |
|-------|-------------|
| S0 | 00 |
| S1 | 01 |
| S2 | 10 |
| S3 | 11 |

**Advantages:**

- Minimum number of flip-flops
- Natural if states represent a count
- Commonly supported by synthesis tools

**Disadvantages:**

- Next-state logic can be complex
- Multiple bits may change simultaneously (glitch potential)
- Decoding state requires logic

Binary encoding example for a 3-state FSM:

| State | Code (Q1 Q0) |
|-------|-------------|
| IDLE | 00 |
| PROCESS | 01 |
| DONE | 10 |

Code "11" is unused—a "don't care" that can simplify next-state logic.

#### Diagram: State Encoding Comparison

<iframe src="../../sims/state-encoding-compare/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>State Encoding Comparison Tool</summary>
Type: microsim

Bloom Level: Evaluate (L5)
Bloom Verb: Compare

Learning Objective: Students will be able to compare binary, one-hot, and Gray code encodings for the same FSM, evaluating trade-offs in flip-flop count, next-state logic complexity, and transition behavior.

Instructional Rationale: Side-by-side comparison of the same FSM with different encodings reveals how encoding choice affects implementation complexity and circuit behavior.

Canvas Layout:

- Top: FSM state diagram (same for all encodings)
- Center: Three columns showing Binary, One-Hot, and Gray encodings
- Each column shows: encoding table, flip-flop count, logic complexity estimate
- Bottom: Transition animation showing bit changes

Interactive Elements:

- Select different FSMs to encode
- Cycle through states to see bit patterns
- Count simultaneous bit transitions
- Toggle between encodings
- Show/hide derived logic equations
- Complexity metric comparison

Data Visibility:

- All state encodings side by side
- Number of flip-flops for each
- Number of gates (estimated) for each
- Bit transitions per state change
- Which encoding is "best" for different criteria

Visual Style:

- Clean comparison table layout
- Color-coded encodings
- Transition visualization showing changing bits
- Complexity bar chart comparison
- Highlight differences between encodings

Implementation: p5.js with encoding generator and complexity estimator
</details>

## One-Hot Encoding: One Bit Per State

**One-Hot Encoding** uses one flip-flop per state. Exactly one flip-flop is "1" (hot) at any time, identifying the current state.

For 4 states:

| State | One-Hot Code |
|-------|-------------|
| S0 | 0001 |
| S1 | 0010 |
| S2 | 0100 |
| S3 | 1000 |

**Advantages:**

- Very simple next-state logic (often just AND-OR)
- Easy to decode current state (just read the hot bit)
- Simple output logic
- Only one bit changes per transition (no glitches)

**Disadvantages:**

- Many more flip-flops (one per state)
- Wasted encoding space (\(2^N\) codes, only \(N\) used)
- Invalid states possible if multiple bits become hot

One-hot is especially popular in FPGAs where flip-flops are abundant but complex logic is expensive.

**Next-state equations are trivial:**

To set state S2 hot:

\[Q_{S2}^+ = (\text{S1 hot AND transition\_to\_S2}) + (\text{S0 hot AND transition\_to\_S2}) + ...\]

Each equation is just an OR of the incoming transition conditions.

!!! tip "FPGAs Love One-Hot"
    Modern FPGAs have lots of flip-flops but limited routing and logic resources. One-hot encoding trades flip-flops for simpler logic, often resulting in faster and smaller designs on FPGAs. Many synthesis tools default to one-hot for FSMs.

## Gray Code Encoding: Smooth Transitions

**Gray Code Encoding** assigns codes so that adjacent states (states connected by transitions) differ by only one bit.

Standard Gray code for 4 states:

| State | Gray Code |
|-------|-----------|
| S0 | 00 |
| S1 | 01 |
| S2 | 11 |
| S3 | 10 |

Notice: S0→S1→S2→S3→S0 each changes only one bit.

**Advantages:**

- Only one bit changes per transition (minimal switching)
- Reduces glitches on outputs
- Lower power consumption (fewer transistor switches)
- Avoids hazards in asynchronous interfaces

**Disadvantages:**

- Only works perfectly for cyclic sequences
- Irregular FSMs may not benefit
- Can't always achieve single-bit transitions for all state pairs

Gray code is particularly useful for:

- Counters (where states are sequential)
- Asynchronous domain crossings (single-bit changes are safer)
- Low-power designs
- ADC/DAC encoder wheels

Example: Gray-coded 3-bit counter

| Count | Binary | Gray |
|-------|--------|------|
| 0 | 000 | 000 |
| 1 | 001 | 001 |
| 2 | 010 | 011 |
| 3 | 011 | 010 |
| 4 | 100 | 110 |
| 5 | 101 | 111 |
| 6 | 110 | 101 |
| 7 | 111 | 100 |

Binary 3→4 changes THREE bits (011→100). Gray 3→4 changes ONE bit (010→110). Much safer for asynchronous reads!

## State Assignment: Optimizing the Encoding

**State Assignment** is the process of choosing which specific binary code to assign to each state to optimize the circuit for some criterion (usually minimum gate count or maximum speed).

Beyond the basic encoding strategies, you can further optimize by:

1. **Analyzing transition patterns**: Put frequently transitioning states close together (differ by fewer bits)
2. **Output-oriented assignment**: States with same outputs get similar codes
3. **Don't-care exploitation**: Unused codes can simplify logic
4. **Adjacent encoding**: States that share transitions get adjacent codes

Classical state assignment rules (heuristics):

- **Rule 1**: States with the same next state should be adjacent (differ by one bit)
- **Rule 2**: States that are next states of the same state should be adjacent
- **Rule 3**: States with the same output should be adjacent (for Moore machines)

These rules help group 1s together in K-maps, enabling larger groupings and simpler equations.

Example: Consider two possible encodings for the same 4-state FSM:

**Encoding A (arbitrary):**
| State | Code |
|-------|------|
| IDLE | 00 |
| READ | 01 |
| WRITE | 10 |
| DONE | 11 |

**Encoding B (optimized based on transitions):**
| State | Code |
|-------|------|
| IDLE | 00 |
| READ | 01 |
| DONE | 11 |
| WRITE | 10 |

If IDLE→READ and READ→DONE are the most common transitions, Encoding B keeps them adjacent (one bit change).

!!! note "Let the Tools Help"
    Modern synthesis tools have sophisticated state assignment algorithms. For small FSMs, manual optimization is educational. For large FSMs, let the tools do the heavy lifting—they can evaluate millions of possible assignments.

## State Minimization: Fewer States, Simpler Circuits

**State Minimization** is the process of reducing the number of states in an FSM without changing its external behavior.

Why minimize states?

- Fewer states = fewer flip-flops
- Simpler next-state and output logic
- Faster circuits
- Lower power consumption

Two states are **equivalent** if:

1. They produce the same outputs for all inputs
2. They transition to equivalent next states for all inputs

If two states are equivalent, we can merge them into one.

**Algorithm for state minimization:**

1. **Group states by outputs**: States with different outputs can't be equivalent
2. **Refine by next-state behavior**: Split groups where states go to non-equivalent next states
3. **Repeat until stable**: When no more splitting is needed, remaining groups contain equivalent states
4. **Merge equivalent states**: Replace each group with a single state

Example of minimizable FSM:

Original (4 states):

| State | Input=0 | Input=1 | Output |
|-------|---------|---------|--------|
| A | B | C | 0 |
| B | B | C | 0 |
| C | D | C | 1 |
| D | D | C | 1 |

Analysis:

- A and B have same outputs (0) and same transitions → EQUIVALENT
- C and D have same outputs (1) and same transitions → EQUIVALENT

Minimized (2 states):

| State | Input=0 | Input=1 | Output |
|-------|---------|---------|--------|
| AB | AB | CD | 0 |
| CD | CD | CD | 1 |

We went from 4 states (2 flip-flops) to 2 states (1 flip-flop)!

#### Diagram: State Minimization Visualizer

<iframe src="../../sims/state-minimization/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>State Minimization Step-by-Step</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students will be able to differentiate between equivalent and non-equivalent states by applying the state minimization algorithm and identifying which states can be merged.

Instructional Rationale: Step-by-step visualization of the partitioning algorithm, showing how groups are split based on distinguishing sequences, makes the abstract algorithm concrete.

Canvas Layout:

- Left: Original state table
- Center: Partitioning process visualization
- Right: Minimized state table
- Bottom: Step-by-step controls and explanation

Interactive Elements:

- Step through minimization algorithm
- Highlight current partition groups
- Show why groups split (distinguishing input sequences)
- Compare original and minimized FSM
- Verify equivalence through simulation
- Try custom FSMs

Data Visibility:

- Original states and transitions
- Current partition (equivalent state groups)
- Reason for each split
- Final equivalence classes
- Minimized FSM
- State count reduction

Visual Style:

- Color-coded equivalence classes
- Partition tree showing splits
- Before/after state diagrams
- Clear step indicators
- Merge animation for equivalent states

Implementation: p5.js with partition refinement algorithm
</details>

State minimization is especially important when:

- The FSM was specified without concern for redundancy
- Converting from one representation to another introduced extra states
- Multiple designers contributed states that duplicate functionality

!!! tip "Minimize Before Encoding"
    Always minimize your FSM before choosing a state encoding. There's no point optimizing the encoding for states you'll end up eliminating!

## The FSM Design Process: From Words to Gates

Let's put everything together with a complete FSM design flow:

**Step 1: Understand the problem**

- What are the inputs and outputs?
- What sequence of operations is needed?
- What must the system "remember"?

**Step 2: Draw the state diagram**

- Identify the states (distinct situations)
- Draw transitions (what causes state changes)
- Label outputs (Moore: inside states; Mealy: on transitions)
- Mark the initial state

**Step 3: Create the state table**

- List all state-input combinations
- Fill in next states and outputs
- Verify completeness (no missing entries)

**Step 4: Minimize states (optional but recommended)**

- Find and merge equivalent states
- Simplify the state table

**Step 5: Choose state encoding**

- Select binary, one-hot, Gray, or custom
- Assign codes to each state

**Step 6: Derive next-state equations**

- Use K-maps or Boolean algebra
- Simplify the equations

**Step 7: Derive output equations**

- Moore: Function of state only
- Mealy: Function of state and inputs

**Step 8: Implement the circuit**

- D flip-flops for state storage
- Combinational logic for next-state and outputs
- Don't forget the reset!

**Step 9: Verify**

- Simulate with test inputs
- Check all transitions
- Verify timing requirements

#### Diagram: Complete FSM Design Flow

<iframe src="../../sims/fsm-design-flow/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Complete FSM Design Workflow</summary>
Type: workflow

Bloom Level: Create (L6)
Bloom Verb: Design

Learning Objective: Students will be able to design a complete FSM from a word problem by following the systematic design flow from problem statement through state diagram, state table, encoding, equations, to circuit implementation.

Instructional Rationale: Guided workflow that takes students through each step of FSM design, with verification at each stage, builds confidence in the complete design process.

Canvas Layout:

- Main area: Current design stage with workspace
- Left sidebar: Stage navigation (8 steps)
- Right sidebar: Design artifacts (state diagram, table, equations)
- Bottom: Verification and navigation controls

Interactive Elements:

- Select from example problems or enter custom
- Draw/edit state diagram
- Edit state table entries
- Choose encoding strategy
- Derive equations (auto-check for errors)
- Generate circuit schematic
- Simulate the result
- Verify against original specification

Data Visibility:

- Current design stage
- All artifacts created so far
- Consistency checks between stages
- Error indicators
- Simulation results vs. expected behavior

Visual Style:

- Workflow progress indicator
- Clean workspace for each stage
- Artifacts persist in sidebar as you progress
- Verification checkmarks
- Final circuit with highlighted correspondence to earlier stages

Implementation: p5.js with multi-stage design environment
</details>

## Example: Designing a Vending Machine Controller

Let's design a simple vending machine FSM from scratch. The machine:

- Accepts nickels (5¢) and dimes (10¢)
- Dispenses a 15¢ item when enough money is inserted
- Gives change if overpaid (20¢ inserted)

**Step 1: Inputs and Outputs**

Inputs:

- N: Nickel inserted
- D: Dime inserted

Outputs:

- DISPENSE: Release the item
- CHANGE: Give a nickel back

**Step 2: State Diagram**

```
                    ┌─N/─┐
                    │    ▼
              ┌─────────────┐
              │     0¢      │
   ───────────│  (start)    │
              │ DISP=0,CH=0 │
              └─────────────┘
                    │ D
              ┌─────┴─────┐ N
              │           ├────────┐
              ▼           │        ▼
        ┌───────────┐     │  ┌───────────┐
        │    10¢    │     │  │     5¢    │
        │ DISP=0    │     │  │ DISP=0    │
        │ CH=0      │     │  │ CH=0      │
        └───────────┘     │  └───────────┘
              │           │        │
           N  │ D         │ N      │ D
              │           │        │
        ┌─────┴───────────┴────────┴─────┐
        │                                │
        ▼           ▼                    ▼
   ┌───────────┐  ┌───────────┐    ┌───────────┐
   │   15¢     │  │   20¢     │    │   15¢     │
   │ DISP=1    │  │ DISP=1    │    │ DISP=1    │
   │ CH=0      │  │ CH=1      │    │ CH=0      │
   └───────────┘  └───────────┘    └───────────┘
        │              │                │
        └──────────────┴────────────────┘
                       │
                       ▼
                  (back to 0¢)
```

Actually, let me simplify this with a cleaner state table approach.

**States:**

| State | Amount Collected | Encoding |
|-------|-----------------|----------|
| S0 | 0¢ | 00 |
| S5 | 5¢ | 01 |
| S10 | 10¢ | 10 |
| S15 | 15¢ (dispense!) | 11 |

**Step 3: State Table (Mealy-style for immediate dispense)**

| Current | N | D | Next | DISPENSE | CHANGE |
|---------|---|---|------|----------|--------|
| S0 | 0 | 0 | S0 | 0 | 0 |
| S0 | 1 | 0 | S5 | 0 | 0 |
| S0 | 0 | 1 | S10 | 0 | 0 |
| S5 | 0 | 0 | S5 | 0 | 0 |
| S5 | 1 | 0 | S10 | 0 | 0 |
| S5 | 0 | 1 | S0 | 1 | 0 |
| S10 | 0 | 0 | S10 | 0 | 0 |
| S10 | 1 | 0 | S0 | 1 | 0 |
| S10 | 0 | 1 | S0 | 1 | 1 |

**Step 4-5: Already minimized, using binary encoding above**

**Step 6-7: Derive equations**

Next-state equations:

\[Q_1^+ = \overline{Q_1} \cdot Q_0 \cdot N + \overline{Q_1} \cdot \overline{Q_0} \cdot D + Q_1 \cdot \overline{Q_0} \cdot \overline{N} \cdot \overline{D}\]

\[Q_0^+ = \overline{Q_1} \cdot \overline{Q_0} \cdot N + \overline{Q_1} \cdot Q_0 \cdot \overline{N} \cdot \overline{D}\]

Output equations:

\[DISPENSE = Q_0 \cdot D + Q_1 \cdot N + Q_1 \cdot D\]

\[CHANGE = Q_1 \cdot \overline{Q_0} \cdot D\]

**Step 8: Circuit Implementation**

Two D flip-flops, AND-OR logic for next state and outputs, and we're done!

## Common FSM Design Patterns

Here are some patterns you'll see repeatedly:

**Counter FSM:**
States represent count values; transitions increment on clock edge.

**Sequence Detector:**
States track progress through a target pattern; output activates when pattern complete.

**Controller:**
States represent phases of operation; transitions based on completion signals.

**Protocol Handler:**
States represent protocol stages (idle, request, acknowledge, data, done).

**Debouncer:**
States filter out rapid bounces from mechanical switches.

!!! example "Pattern: The Debounce FSM"
    Mechanical buttons bounce—they make and break contact multiple times when pressed. An FSM can filter this by requiring the button to be stable for several clock cycles before registering a press:

    States: IDLE → COUNT_1 → COUNT_2 → COUNT_3 → PRESSED

    Only after three consecutive cycles of button=1 do we acknowledge the press. Random bounces reset back to IDLE.

## Summary and Key Takeaways

Congratulations! You've just acquired one of the most powerful tools in digital design. Finite state machines are everywhere—from the microcode controlling your CPU to the protocol handlers managing your network traffic.

**Core Concepts:**

- **FSM**: A mathematical model with finite states, inputs, outputs, and transitions
- **State**: A snapshot of what the system remembers
- **Transition**: Movement from one state to another based on inputs
- **Current vs Next state**: The synchronous update model

**Two Flavors:**

- **Moore machines**: Outputs depend only on state (clean, predictable)
- **Mealy machines**: Outputs depend on state and inputs (reactive, fewer states)

**Design Representations:**

- **State diagrams**: Visual, intuitive, good for design
- **State tables**: Complete, systematic, good for implementation

**Encoding Choices:**

- **Binary**: Minimum flip-flops, compact
- **One-hot**: Simple logic, fast, FPGA-friendly
- **Gray code**: Single-bit transitions, glitch-free

**Optimization:**

- **State minimization**: Eliminate equivalent states
- **State assignment**: Choose codes to minimize logic

**The Design Flow:**

1. Understand the problem
2. Draw state diagram
3. Create state table
4. Minimize states
5. Choose encoding
6. Derive equations
7. Implement circuit
8. Verify!

!!! success "The Big Picture"
    FSMs bridge the gap between abstract behavior ("count up, then reset") and concrete implementation (flip-flops and gates). Master FSM design, and you can implement any well-defined sequential behavior in hardware.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
An engaging graphic novel could tell the story of Edward Moore and George Mealy, the two researchers who formalized the mathematical models of sequential machines in the 1950s. Set against the backdrop of the early computing era at Bell Labs and IBM, the narrative could follow their parallel journeys to understanding how to describe systems that remember. The dramatic tension could build around the question: "Can any computation be described as a finite state machine?"—leading to the profound realization that while FSMs are powerful, they have fundamental limits (cue: the pumping lemma and the Chomsky hierarchy). The climax could show how their seemingly theoretical work became the foundation for everything from traffic light controllers to the protocol stacks that power the internet.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: Moore vs Mealy Identification"
    A system outputs a 1 whenever it sees the input sequence "10". Identify whether the following description is Moore or Mealy:

    "In the state after seeing '1', if the input is '0', output 1 immediately while transitioning to the initial state."

    **Solution:**
    This is a **Mealy machine**. The output (1) depends on both the current state ("after seeing 1") AND the current input ("input is 0"). In a Moore machine, the output would have to wait for the next state.

??? question "Problem 2: State Counting"
    How many states are needed for an FSM that remembers the last 3 bits of input?

    **Solution:**
    Each bit can be 0 or 1, so 3 bits have \(2^3 = 8\) possible combinations. The FSM needs **8 states** to remember all possible 3-bit histories: 000, 001, 010, 011, 100, 101, 110, 111.

??? question "Problem 3: Encoding Selection"
    A 6-state FSM will be implemented on an FPGA with abundant flip-flops but expensive routing. Which encoding would you recommend?

    **Solution:**
    **One-hot encoding** is ideal for FPGAs with many flip-flops but limited logic/routing resources. One-hot uses 6 flip-flops (instead of 3 for binary) but has simpler next-state logic that requires less routing. Each next-state equation is just an OR of incoming transitions.

??? question "Problem 4: Next State Equation Derivation"
    Given this state table, derive the next-state equation for Q (using D flip-flop):

    | Current Q | Input X | Next Q |
    |-----------|---------|--------|
    | 0 | 0 | 0 |
    | 0 | 1 | 1 |
    | 1 | 0 | 1 |
    | 1 | 1 | 0 |

    **Solution:**
    Looking at when Next Q = 1:
    - Q=0, X=1 → 1
    - Q=1, X=0 → 1

    The equation is:
    \[D = \overline{Q} \cdot X + Q \cdot \overline{X} = Q \oplus X\]

    This is a T flip-flop behavior—toggle when X=1!

??? question "Problem 5: State Minimization"
    States A and B both have output = 0. A goes to C on input 0 and D on input 1. B goes to C on input 0 and D on input 1. Are A and B equivalent?

    **Solution:**
    Yes, **A and B are equivalent**:
    1. Same outputs (0)
    2. Same next states for all inputs (both go to C on 0, both go to D on 1)

    They can be merged into a single state.

??? question "Problem 6: Complete FSM Design"
    Design an FSM that outputs 1 whenever the total number of 1s seen so far is a multiple of 3 (including 0). Show the state diagram and derive the next-state equations using binary encoding.

    **Solution:**

    **States** (count mod 3):
    - S0: Count ≡ 0 (mod 3), Output = 1
    - S1: Count ≡ 1 (mod 3), Output = 0
    - S2: Count ≡ 2 (mod 3), Output = 0

    **Transitions:**
    - From any state, input 0 → stay in same state
    - From S0, input 1 → S1
    - From S1, input 1 → S2
    - From S2, input 1 → S0

    **Encoding:** S0=00, S1=01, S2=10

    **State Table:**

    | Q1 Q0 | X | Q1+ Q0+ |
    |-------|---|---------|
    | 00 | 0 | 00 |
    | 00 | 1 | 01 |
    | 01 | 0 | 01 |
    | 01 | 1 | 10 |
    | 10 | 0 | 10 |
    | 10 | 1 | 00 |

    **Next-state equations:**

    \[Q_1^+ = \overline{Q_1} \cdot Q_0 \cdot X + Q_1 \cdot \overline{Q_0} \cdot \overline{X}\]

    \[Q_0^+ = \overline{Q_1} \cdot \overline{Q_0} \cdot X + \overline{Q_1} \cdot Q_0 \cdot \overline{X}\]

    **Output equation:**

    \[Y = \overline{Q_1} \cdot \overline{Q_0}\]

