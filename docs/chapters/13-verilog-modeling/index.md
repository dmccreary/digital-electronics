---
title: Verilog Behavioral and Structural Modeling
description: Advanced Verilog constructs for modeling digital systems at various levels of abstraction
generated_by: claude skill chapter-content-generator
date: 2026-01-31 15:00:00
version: 0.03
---

# Verilog Behavioral and Structural Modeling

## Summary

This chapter covers advanced Verilog constructs for modeling digital systems at various levels of abstraction. Students will master the always block and sensitivity lists, understand the critical difference between blocking and non-blocking assignments, use if-else and case statements for decision logic, and write combinational always blocks (with @(*)) and sequential always blocks (with @(posedge clk)). The chapter covers three modeling styles: structural modeling using gate primitives and module instantiation, behavioral modeling using procedural statements, and gate-level Verilog. RTL Verilog and hierarchical design principles complete the coverage.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Always Block
2. Sensitivity List
3. Blocking Assignment
4. Non-Blocking Assignment
5. If-Else in Verilog
6. Case Statement
7. Combinational Always
8. Sequential Always
9. Posedge Keyword
10. Negedge Keyword
11. Structural Modeling
12. Behavioral Modeling
13. Gate-Level Verilog
14. RTL Verilog
15. Hierarchical Design

## Prerequisites

This chapter builds on concepts from:

- [Chapter 12: Verilog HDL Fundamentals](../12-verilog-hdl-fundamentals/index.md)

---

## Introduction: The Art of Describing Hardware

Welcome back, intrepid circuit designer! In Chapter 12, you learned to speak Verilog's basic vocabulary—modules, ports, wires, and continuous assignments. Now it's time to become fluent. This chapter is where Verilog transforms from a simple gate-connection language into a powerful tool for describing *behavior*—what your circuit does, not just how it's wired.

Think of it like the difference between describing a car by listing every bolt and wire versus describing it by saying "when you press the gas pedal, the car accelerates." Both descriptions are valid, but one is a lot easier to write and understand. That's the power of behavioral modeling.

But here's the plot twist: Verilog lets you work at *multiple levels of abstraction* simultaneously. You can describe some parts of your design behaviorally ("when the counter reaches 10, reset it"), some parts structurally ("connect this AND gate to that OR gate"), and some parts at the gate level ("use a NAND gate here"). It's like being able to zoom in and out of a map—sometimes you need to see the whole country, sometimes you need street-level detail.

By the end of this chapter, you'll understand:

- How `always` blocks let you write procedural hardware descriptions
- The crucial (and frequently misunderstood) difference between `=` and `<=`
- When to use `if-else` versus `case` statements
- How to model both combinational and sequential logic behaviorally
- The three abstraction levels: gate-level, RTL, and behavioral

Ready to level up your Verilog game? Let's dive in!

## The Always Block: Where Procedural Meets Parallel

The **Always Block** is the heart of procedural Verilog. While `assign` statements describe continuous, always-active connections (like physical wires), `always` blocks describe *processes* that respond to specific events.

Here's the basic syntax:

```verilog
always @(sensitivity_list) begin
    // procedural statements go here
end
```

The `always` block is called "always" because it runs *forever*—it's not a one-time thing like an `initial` block. Every time the conditions in the sensitivity list are met, the block executes again.

Think of an `always` block like a watchful guardian. It sits there monitoring certain signals, and whenever those signals change in the specified way, it springs into action. Then it goes back to watching. Forever. (That's some serious dedication!)

```verilog
// This always block responds to ANY change in a or b
always @(a or b) begin
    y = a & b;
end

// This always block responds ONLY to the rising edge of clk
always @(posedge clk) begin
    q <= d;
end
```

Key properties of `always` blocks:

- **Multiple always blocks run concurrently**: Just like multiple `assign` statements, multiple `always` blocks all exist at once, running in parallel
- **Statements inside execute sequentially**: Within a single `always` block, statements execute top-to-bottom (like software)
- **Can only assign to `reg` types**: The left side of assignments in `always` blocks must be declared as `reg`
- **Must have a sensitivity list**: This tells the simulator (and synthesizer) when to evaluate the block

!!! warning "The Order Paradox"
    Here's what trips up beginners: statements *within* an always block are sequential, but *between* always blocks, everything is concurrent. It's like having multiple short programs that all run at the same time, but each program internally executes line by line.

#### Diagram: Always Block Execution Model

<iframe src="../../sims/always-block-execution/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Always Block Execution Model</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain how always blocks execute in response to sensitivity list triggers, understanding that multiple always blocks run concurrently while statements within each block execute sequentially.

Instructional Rationale: Animated visualization showing multiple always blocks responding to signal changes, with internal sequential execution highlighted, clarifies the concurrent-yet-sequential nature of procedural Verilog.

Canvas Layout:

- Left panel: Multiple always blocks shown as separate "process boxes"
- Center: Signal waveforms triggering block execution
- Right panel: Execution trace showing sequential steps within active block
- Bottom: Input controls for triggering signals

Interactive Elements:

- Toggle buttons for input signals
- Clock pulse button
- Highlight which always block is currently active
- Step-through mode showing sequential execution within block
- Concurrent execution indicator for multiple blocks
- Reset button

Data Visibility:

- Current values of all signals
- Which sensitivity list conditions are met
- Execution order within active blocks
- Parallel execution between blocks
- Output values updating

Visual Style:

- Always blocks as colored process rectangles
- Sensitivity list as "trigger condition" above each block
- Internal statements as numbered steps
- Active block highlighted with glow effect
- Waveform display showing signal changes

Implementation: p5.js with multi-process simulation engine
</details>

## Sensitivity List: The Trigger Conditions

The **Sensitivity List** specifies which signal changes cause an `always` block to execute. It's the "wake-up call" for the block—without the right sensitivity list, your block might never run, or might run at the wrong times.

```verilog
// Old-style: explicit signal list
always @(a or b or c) begin
    y = a & b | c;
end

// Verilog-2001 style: automatic sensitivity list
always @(*) begin
    y = a & b | c;
end

// Edge-sensitive: responds to clock edges
always @(posedge clk) begin
    q <= d;
end
```

The `@(*)` syntax (pronounced "at star" or "at splat") is a Verilog-2001 feature that automatically includes all signals read within the block. It's a lifesaver—it prevents the common bug of forgetting a signal in the sensitivity list.

There are two fundamentally different types of sensitivity lists:

| Type | Syntax | Use Case | Synthesizes To |
|------|--------|----------|----------------|
| Level-sensitive | `@(a or b)` or `@(*)` | Combinational logic | Gates/muxes |
| Edge-sensitive | `@(posedge clk)` | Sequential logic | Flip-flops |

!!! tip "Always Use @(*) for Combinational Logic"
    For combinational `always` blocks, *always* use `@(*)`. It automatically includes all the right signals and prevents subtle bugs. The explicit `@(a or b or c)` style is a relic from older Verilog and invites mistakes.

What happens if your sensitivity list is incomplete? Consider this buggy code:

```verilog
// BUG: Missing 'b' in sensitivity list!
always @(a) begin
    y = a & b;
end
```

In simulation, `y` won't update when `b` changes (only when `a` changes). But synthesis might create correct hardware anyway, leading to a mismatch between simulation and hardware. This is one of the most frustrating bugs to track down.

The golden rule: **simulation behavior should match synthesis behavior**. Using `@(*)` ensures this.

## Posedge and Negedge: Catching the Edge

**Posedge** (positive edge) and **Negedge** (negative edge) are keywords that specify edge-triggered sensitivity—the block executes only when a signal transitions.

```verilog
// Trigger on rising edge of clk
always @(posedge clk) begin
    q <= d;
end

// Trigger on falling edge of clk
always @(negedge clk) begin
    q <= d;
end

// Trigger on rising clk OR rising reset (async reset)
always @(posedge clk or posedge reset) begin
    if (reset)
        q <= 1'b0;
    else
        q <= d;
end
```

The difference between level-sensitive and edge-sensitive is crucial:

| Sensitivity | When It Triggers | Hardware Result |
|-------------|------------------|-----------------|
| `@(a)` | Any time `a` changes | Combinational (transparent) |
| `@(posedge a)` | Only when `a` goes 0→1 | Sequential (flip-flop) |
| `@(negedge a)` | Only when `a` goes 1→0 | Sequential (flip-flop) |

#### Diagram: Edge Detection Visualizer

<iframe src="../../sims/edge-detection/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Edge Detection Visualizer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate the difference between posedge, negedge, and level-sensitive triggering by observing when outputs update in response to input transitions.

Instructional Rationale: Interactive waveform showing exactly when each type of sensitivity triggers makes the edge vs. level distinction viscerally clear.

Canvas Layout:

- Top: Input signal waveform with manual control
- Middle: Three parallel circuits (level, posedge, negedge)
- Bottom: Output waveforms for each circuit
- Side: Edge detection indicators

Interactive Elements:

- Toggle button for input signal
- Slow-motion transition mode
- Highlight exact moment of edge detection
- Count of edge triggers
- Comparison mode showing all three simultaneously

Data Visibility:

- Input signal value and transitions
- When each sensitivity type triggers
- Output values for each type
- Edge detection moments marked
- Timing relationship between input and output

Visual Style:

- Clean waveform display
- Edge markers as vertical lines
- Trigger moments highlighted with flash
- Color coding (blue=level, green=posedge, red=negedge)
- Timing cursor for exploration

Implementation: p5.js with waveform animation
</details>

Think of `posedge` like a turnstile that only counts when you push through it. It doesn't matter if you're standing there pushing constantly—it only registers the moment of the push. The clock signal might be high for millions of nanoseconds, but the flip-flop only captures data at that one instant of the rising edge.

Common edge-sensitive patterns:

```verilog
// Synchronous reset (reset checked at clock edge)
always @(posedge clk) begin
    if (reset)
        count <= 4'b0;
    else
        count <= count + 1;
end

// Asynchronous reset (reset is in sensitivity list)
always @(posedge clk or posedge reset) begin
    if (reset)
        count <= 4'b0;
    else
        count <= count + 1;
end
```

!!! note "Synthesis Implications"
    When you use `posedge` or `negedge`, you're telling the synthesizer to create flip-flops. This is the only way to create sequential (memory) elements behaviorally. Level-sensitive always blocks synthesize to combinational logic.

## Blocking Assignment: Sequential Within the Block

**Blocking Assignment** uses the `=` operator and executes sequentially within an `always` block. The assignment "blocks" execution of the next statement until it completes.

```verilog
always @(*) begin
    temp = a + b;      // Step 1: compute a+b, store in temp
    result = temp * c; // Step 2: use temp to compute result
end
```

Think of blocking assignment like a cooking recipe: "First crack the eggs, *then* add flour." You can't add flour before the eggs are cracked. Each step must complete before the next begins.

Key characteristics of blocking assignments:

- **Immediate update**: The variable gets its new value immediately
- **Sequential execution**: Later statements see the new value
- **Order matters**: Swapping lines changes behavior
- **Use for combinational logic**: Appropriate in `@(*)` blocks

Example showing order dependence:

```verilog
// Version A
always @(*) begin
    temp = a;
    result = temp + b;  // result = a + b
end

// Version B (lines swapped - DIFFERENT BEHAVIOR!)
always @(*) begin
    result = temp + b;  // result = OLD temp + b (BUG!)
    temp = a;
end
```

In Version B, `result` uses the *old* value of `temp` because the assignment to `temp` hasn't happened yet. This is why order matters with blocking assignments.

!!! warning "Blocking + Clocked = Trouble"
    Using blocking assignments (`=`) in clocked always blocks is legal but dangerous. It can create race conditions when multiple always blocks interact. The safe rule: **use `=` only in combinational blocks, use `<=` in sequential blocks.**

## Non-Blocking Assignment: Parallel Updates

**Non-Blocking Assignment** uses the `<=` operator and schedules updates to happen simultaneously at the end of the current simulation time step. All right-hand sides are evaluated first, then all left-hand sides are updated together.

```verilog
always @(posedge clk) begin
    a <= b;  // At clock edge: capture b's value for a
    b <= a;  // At clock edge: capture a's value for b (OLD a!)
end
```

This is the magic of non-blocking: the two assignments above *swap* the values of `a` and `b`! Both right-hand sides are evaluated with the *current* values before either assignment takes effect.

Think of non-blocking assignment like a synchronized dance move. Everyone reads their instruction at the same moment, then everyone moves at the same moment. Nobody sees anyone else's new position until the music stops.

#### Diagram: Blocking vs Non-Blocking Comparison

<iframe src="../../sims/blocking-vs-nonblocking/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Blocking vs Non-Blocking Assignment Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students will be able to differentiate between blocking and non-blocking assignment behavior by observing how intermediate values propagate (or don't) within always blocks.

Instructional Rationale: Side-by-side execution of identical code with = vs <= reveals the critical behavioral difference, especially for swap patterns.

Canvas Layout:

- Left panel: Blocking assignment example with step-through
- Right panel: Non-blocking assignment example with step-through
- Center: Value comparison showing differences
- Bottom: Simulation controls

Interactive Elements:

- Clock trigger button
- Step-through execution mode
- Highlight current evaluation phase
- Show scheduled updates for non-blocking
- Value history display
- Reset button

Data Visibility:

- Current values of all variables
- Intermediate values during blocking execution
- Scheduled updates for non-blocking
- Final values comparison
- Execution phase indicator (evaluate vs. update)

Visual Style:

- Two-column comparison layout
- Variable values as prominent displays
- Arrows showing value flow
- Phase indicators (Read, Write, Complete)
- Color-coded differences

Implementation: p5.js with dual simulation engines
</details>

Here's the critical comparison:

| Aspect | Blocking (`=`) | Non-Blocking (`<=`) |
|--------|---------------|---------------------|
| Execution | Sequential within block | Parallel update at end |
| Intermediate values | Visible to later statements | Not visible (old values used) |
| Order dependence | Yes, order matters | No, order doesn't matter |
| Best for | Combinational logic | Sequential logic |
| Swap behavior | No swap (need temp) | Natural swap |

The classic swap example:

```verilog
// Using blocking (DOESN'T swap!)
always @(posedge clk) begin
    a = b;   // a becomes b
    b = a;   // b becomes a, but a is already b, so b stays b!
end

// Using non-blocking (DOES swap!)
always @(posedge clk) begin
    a <= b;  // Schedule: a will become b's current value
    b <= a;  // Schedule: b will become a's current value (original a)
end        // Now both updates happen: SWAP!
```

!!! tip "The Golden Rule of Assignments"
    - Use `=` (blocking) in combinational always blocks (`@(*)`)
    - Use `<=` (non-blocking) in sequential always blocks (`@(posedge clk)`)
    - Never mix them in the same always block
    - When in doubt, use `<=` for sequential logic

## If-Else in Verilog: Decision Making

**If-Else in Verilog** provides conditional execution within always blocks, just like in software programming languages. The syntax is nearly identical to C:

```verilog
always @(*) begin
    if (condition1) begin
        // statements when condition1 is true
    end else if (condition2) begin
        // statements when condition2 is true
    end else begin
        // statements when all conditions are false
    end
end
```

The `begin`...`end` keywords are like curly braces in C—they group multiple statements. For single statements, they're optional but recommended for clarity.

Important rules for synthesizable if-else:

1. **Cover all cases**: Always include a final `else` to avoid creating latches
2. **Priority encoding**: Conditions are checked in order; first match wins
3. **Mutually exclusive is efficient**: Non-overlapping conditions synthesize better

```verilog
// 4-to-1 multiplexer using if-else
always @(*) begin
    if (sel == 2'b00)
        y = a;
    else if (sel == 2'b01)
        y = b;
    else if (sel == 2'b10)
        y = c;
    else  // sel == 2'b11
        y = d;
end
```

#### Diagram: If-Else Priority Chain

<iframe src="../../sims/if-else-priority/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>If-Else Priority Chain Visualization</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate how if-else chains create priority-encoded logic by tracing through condition evaluation order.

Instructional Rationale: Visual flow through if-else conditions with highlighting of which branch is taken reinforces the priority nature of cascaded conditions.

Canvas Layout:

- Left: Condition evaluation flow chart
- Center: Current condition being tested (highlighted)
- Right: Output value based on selected branch
- Bottom: Input controls for conditions

Interactive Elements:

- Toggle buttons for each condition input
- Step-through mode showing evaluation order
- Highlight path taken through chain
- Show synthesized priority encoder
- Multiple examples (mux, priority encoder, etc.)

Data Visibility:

- All condition values
- Evaluation order (1st, 2nd, 3rd...)
- Which condition matched first
- Output value
- Path through decision tree

Visual Style:

- Decision tree/flowchart layout
- Arrows showing evaluation flow
- Green for matched condition
- Gray for skipped conditions
- Output box at each terminal

Implementation: p5.js with decision tree animation
</details>

The hardware synthesized from if-else is a **priority multiplexer chain**. Early conditions have higher priority—if multiple conditions could be true, the first one wins:

```verilog
// Priority encoder: first condition wins
always @(*) begin
    if (req3)           // Highest priority
        grant = 4'b1000;
    else if (req2)
        grant = 4'b0100;
    else if (req1)
        grant = 4'b0010;
    else if (req0)      // Lowest priority
        grant = 4'b0001;
    else
        grant = 4'b0000;
end
```

!!! warning "The Latch Trap"
    If you don't cover all possible input combinations with assignments, synthesis creates a *latch*—a level-sensitive memory element that holds the old value. This is almost always a bug:

    ```verilog
    // BUG: Creates a latch!
    always @(*) begin
        if (enable)
            y = data;  // What happens when enable=0? Latch!
    end

    // FIXED: Cover all cases
    always @(*) begin
        if (enable)
            y = data;
        else
            y = 1'b0;  // Explicit default
    end
    ```

## Case Statement: Multi-Way Selection

The **Case Statement** provides cleaner multi-way selection than long if-else chains, especially when checking one expression against multiple values:

```verilog
always @(*) begin
    case (sel)
        2'b00: y = a;
        2'b01: y = b;
        2'b10: y = c;
        2'b11: y = d;
        default: y = 1'b0;
    endcase
end
```

Case statements are perfect for:

- Multiplexers
- Decoders
- State machine next-state logic
- ALU operation selection
- Instruction decoders

Verilog provides three case variants:

| Variant | Syntax | X and Z handling |
|---------|--------|------------------|
| Standard | `case` | X/Z match literally |
| Casez | `casez` | Z (or ?) treated as don't-care |
| Casex | `casex` | Both X and Z treated as don't-care |

```verilog
// Using casez for don't-care bits
always @(*) begin
    casez (opcode)
        4'b0???: result = a + b;    // Any opcode starting with 0
        4'b10??: result = a - b;    // Opcodes 10xx
        4'b110?: result = a & b;    // Opcodes 110x
        4'b1110: result = a | b;    // Opcode 1110 exactly
        4'b1111: result = ~a;       // Opcode 1111 exactly
        default: result = 8'b0;
    endcase
end
```

!!! tip "Always Include default"
    Even if you think you've covered all cases, include a `default` clause. It prevents latches if you miscounted, documents your intent, and handles unexpected X or Z values in simulation.

#### Diagram: Case Statement Decoder

<iframe src="../../sims/case-statement-decoder/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Case Statement Decoder Visualization</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use case statements to implement decoders and multiplexers by observing the direct mapping between case values and outputs.

Instructional Rationale: Interactive decoder where students set selector inputs and see which case branch activates demonstrates the parallel-selection nature of case statements.

Canvas Layout:

- Left: Case statement code with highlighting
- Center: Selector input controls
- Right: Output display showing selected case
- Bottom: Synthesized hardware view (mux/decoder)

Interactive Elements:

- Binary input for selector value
- Highlight matching case branch
- Show don't-care matching for casez
- Toggle between case/casez/casex
- Display synthesized circuit

Data Visibility:

- Current selector value
- All case values
- Which case matches
- Output value
- Hardware representation

Visual Style:

- Code panel with syntax highlighting
- Selector as binary switches
- Matched case highlighted green
- Output with visual indicator
- Circuit schematic at bottom

Implementation: p5.js with case statement simulator
</details>

Case vs. if-else: which to use?

| Situation | Use Case | Use If-Else |
|-----------|----------|-------------|
| Checking one signal against multiple values | ✓ | |
| Multiple independent conditions | | ✓ |
| Priority needed (first match wins) | | ✓ |
| Equal-priority parallel decode | ✓ | |
| Don't-care bits in patterns | ✓ (casez) | |

## Combinational Always Blocks

A **Combinational Always** block models combinational logic—circuits with no memory, where outputs depend only on current inputs. Use `@(*)` sensitivity and blocking assignments.

```verilog
// Combinational logic: 4-bit adder
always @(*) begin
    sum = a + b;
    carry = (a + b) > 4'hF;
end
```

Rules for combinational always blocks:

1. **Use `@(*)`**: Automatic sensitivity list prevents bugs
2. **Use blocking `=`**: Sequential evaluation is fine for combinational logic
3. **Assign all outputs in all paths**: Prevent latch inference
4. **No feedback**: Don't read a signal you're assigning (unless it's a temporary)

Complete combinational example—an ALU:

```verilog
module alu(
    input  [7:0] a, b,
    input  [2:0] op,
    output reg [7:0] result,
    output reg       zero
);

always @(*) begin
    case (op)
        3'b000: result = a + b;      // ADD
        3'b001: result = a - b;      // SUB
        3'b010: result = a & b;      // AND
        3'b011: result = a | b;      // OR
        3'b100: result = a ^ b;      // XOR
        3'b101: result = ~a;         // NOT
        3'b110: result = a << 1;     // Shift left
        3'b111: result = a >> 1;     // Shift right
        default: result = 8'b0;
    endcase
    zero = (result == 8'b0);
end

endmodule
```

!!! note "Combinational = No Memory"
    Combinational always blocks synthesize to gates, muxes, and arithmetic units—never flip-flops. If you accidentally create a latch (by not assigning in all paths), that's a synthesis error, not a feature.

## Sequential Always Blocks

A **Sequential Always** block models sequential logic—circuits with memory that update on clock edges. Use `@(posedge clk)` and non-blocking assignments.

```verilog
// Sequential logic: D flip-flop
always @(posedge clk) begin
    q <= d;
end
```

Rules for sequential always blocks:

1. **Use edge-sensitive triggers**: `@(posedge clk)` or `@(negedge clk)`
2. **Use non-blocking `<=`**: Prevents race conditions
3. **Not assigning is OK**: Creates "hold" behavior (register keeps value)
4. **Reset is essential**: Provide a way to initialize state

Common sequential patterns:

```verilog
// Register with synchronous reset
always @(posedge clk) begin
    if (reset)
        q <= 8'b0;
    else if (enable)
        q <= d;
    // else: q holds its value (implicit in sequential blocks)
end

// Register with asynchronous reset
always @(posedge clk or posedge reset) begin
    if (reset)
        q <= 8'b0;
    else
        q <= d;
end
```

#### Diagram: Sequential Always Timing

<iframe src="../../sims/sequential-always-timing/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sequential Always Block Timing</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Describe

Learning Objective: Students will be able to describe how sequential always blocks capture input values at clock edges, showing the one-cycle delay between input and output.

Instructional Rationale: Timing diagram with interactive clock control reveals when data is captured versus when it appears at the output.

Canvas Layout:

- Top: Clock waveform with manual control
- Middle: D flip-flop circuit representation
- Bottom: Input D and output Q waveforms
- Side: Current state display

Interactive Elements:

- Manual clock edge button
- Free-running clock toggle with speed control
- Input D toggle
- Reset button
- Highlight capture moment
- Setup/hold time indicators

Data Visibility:

- Clock value and edges
- D input value
- Q output value
- Capture moment highlighted
- One-cycle delay visible

Visual Style:

- Clean waveform display
- Clock edges marked
- Capture points with vertical lines
- D-to-Q delay visible
- State display showing register contents

Implementation: p5.js with clocked simulation
</details>

Counter example with enable and load:

```verilog
module counter #(
    parameter WIDTH = 8
)(
    input                  clk,
    input                  reset,
    input                  enable,
    input                  load,
    input      [WIDTH-1:0] load_value,
    output reg [WIDTH-1:0] count
);

always @(posedge clk or posedge reset) begin
    if (reset)
        count <= {WIDTH{1'b0}};
    else if (load)
        count <= load_value;
    else if (enable)
        count <= count + 1;
    // else: count holds its value
end

endmodule
```

## Structural Modeling: Building from Components

**Structural Modeling** describes a circuit by instantiating and connecting lower-level components. It's like building with LEGO—you specify which pieces to use and how they connect.

```verilog
// Structural: Build 4-bit adder from full adders
module adder_4bit(
    input  [3:0] a, b,
    input        cin,
    output [3:0] sum,
    output       cout
);
    wire c1, c2, c3;

    full_adder fa0(.a(a[0]), .b(b[0]), .cin(cin), .sum(sum[0]), .cout(c1));
    full_adder fa1(.a(a[1]), .b(b[1]), .cin(c1),  .sum(sum[1]), .cout(c2));
    full_adder fa2(.a(a[2]), .b(b[2]), .cin(c2),  .sum(sum[2]), .cout(c3));
    full_adder fa3(.a(a[3]), .b(b[3]), .cin(c3),  .sum(sum[3]), .cout(cout));
endmodule
```

Structural modeling is closest to how hardware actually works—you're literally describing what components exist and how they're wired. It offers:

- **Precise control**: You know exactly what hardware will be generated
- **Reusability**: Instantiate the same module many times
- **Hierarchy**: Build complex systems from simpler parts
- **Clarity**: Easy to see the architecture

The trade-off is verbosity—structural models are longer than behavioral equivalents.

## Behavioral Modeling: Describing What, Not How

**Behavioral Modeling** describes what a circuit *does* without specifying its structure. The synthesizer figures out how to implement it.

```verilog
// Behavioral: Just say what you want
module adder_4bit(
    input  [3:0] a, b,
    input        cin,
    output [4:0] sum
);
    assign sum = a + b + cin;  // One line!
endmodule
```

That single `assign` statement synthesizes to the same ripple-carry adder as the structural version—but it's much shorter to write!

Behavioral modeling uses:

- **Operators**: `+`, `-`, `*`, `&`, `|`, etc.
- **Always blocks**: For procedural descriptions
- **If-else and case**: For conditional logic
- **Loops** (in simulation): For repetitive patterns

#### Diagram: Structural vs Behavioral Comparison

<iframe src="../../sims/structural-vs-behavioral/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Structural vs Behavioral Modeling Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will be able to compare structural and behavioral modeling approaches by observing that both produce equivalent hardware but with different code complexity and design control.

Instructional Rationale: Side-by-side view of structural and behavioral descriptions of the same circuit, with synthesized hardware view, reveals the abstraction trade-off.

Canvas Layout:

- Left panel: Structural code
- Right panel: Behavioral code
- Center: Synthesized hardware (same for both!)
- Bottom: Simulation controls and comparison

Interactive Elements:

- Input value controls
- Simulate both versions
- Compare outputs (should match)
- Toggle hardware view
- Code line highlighting
- Complexity metrics display

Data Visibility:

- Both code versions
- Synthesized circuit
- Input/output values
- Verification that outputs match
- Code complexity comparison (lines, modules)

Visual Style:

- Two-column code display
- Shared circuit schematic
- Matched highlighting between code and hardware
- Difference counter showing code size difference

Implementation: p5.js with dual code panels and shared simulation
</details>

When to use each style:

| Modeling Style | Best For |
|---------------|----------|
| Structural | Precise control, reusing specific components, IP integration |
| Behavioral | Rapid development, high-level specification, arithmetic |
| Mixed | Most real designs—behavioral for logic, structural for hierarchy |

## Gate-Level Verilog: The Primitive Foundation

**Gate-Level Verilog** uses built-in gate primitives to describe circuits at the most fundamental level. It's like assembly language for hardware—rarely written by hand, but important to understand.

```verilog
// Gate-level: Full adder from gates
module full_adder(
    input a, b, cin,
    output sum, cout
);
    wire w1, w2, w3;

    xor g1(w1, a, b);        // w1 = a XOR b
    xor g2(sum, w1, cin);    // sum = w1 XOR cin
    and g3(w2, a, b);        // w2 = a AND b
    and g4(w3, w1, cin);     // w3 = w1 AND cin
    or  g5(cout, w2, w3);    // cout = w2 OR w3
endmodule
```

Verilog includes these gate primitives:

| Primitive | Inputs | Function |
|-----------|--------|----------|
| `and` | 2+ | AND of all inputs |
| `or` | 2+ | OR of all inputs |
| `xor` | 2+ | XOR of all inputs |
| `nand` | 2+ | NAND of all inputs |
| `nor` | 2+ | NOR of all inputs |
| `xnor` | 2+ | XNOR of all inputs |
| `not` | 1 | Inversion |
| `buf` | 1 | Buffer (no inversion) |

Gate primitive syntax:

```verilog
gate_type instance_name(output, input1, input2, ...);

// Examples:
and  my_and(y, a, b);        // y = a & b
or   my_or(y, a, b, c);      // y = a | b | c
xor  my_xor(y, a, b);        // y = a ^ b
nand my_nand(y, a, b, c, d); // y = ~(a & b & c & d)
not  my_not(y, a);           // y = ~a
```

Gate primitives have these characteristics:

- **Output first**: The first port is always the output
- **N-input gates**: `and`, `or`, etc. can have any number of inputs
- **Optional instance names**: `and (y, a, b);` is legal
- **Built-in timing**: Can specify delays for simulation

!!! note "When to Use Gate-Level"
    Gate-level modeling is rarely written by hand today—behavioral Verilog is faster to write and less error-prone. However, you'll encounter gate-level Verilog in:
    - Netlists generated by synthesis tools
    - Timing simulation files
    - Libraries from foundries
    - Educational examples showing hardware correspondence

## RTL Verilog: The Sweet Spot

**RTL Verilog** (Register Transfer Level) is the practical middle ground between high-level behavioral modeling and low-level gate primitives. It describes how data moves between registers through combinational logic.

RTL is defined by:

1. **Registers**: Sequential elements (flip-flops) that store state
2. **Combinational logic**: Operations between registers
3. **Clock-driven updates**: Registers update on clock edges

```verilog
// RTL style: Clear register-to-register flow
module rtl_example(
    input        clk,
    input        reset,
    input  [7:0] data_in,
    output reg [7:0] data_out
);

    reg [7:0] stage1, stage2;  // Pipeline registers

    // Stage 1: Add constant
    always @(posedge clk) begin
        if (reset)
            stage1 <= 8'b0;
        else
            stage1 <= data_in + 8'd10;
    end

    // Stage 2: Multiply by 2
    always @(posedge clk) begin
        if (reset)
            stage2 <= 8'b0;
        else
            stage2 <= stage1 << 1;
    end

    // Output stage
    always @(posedge clk) begin
        if (reset)
            data_out <= 8'b0;
        else
            data_out <= stage2;
    end

endmodule
```

The RTL paradigm matches how synthesis tools work:

1. Identify the registers (sequential always blocks)
2. Extract the combinational logic between registers
3. Map combinational logic to gates
4. Map registers to flip-flops
5. Connect everything with wires

#### Diagram: RTL Datapath Visualization

<iframe src="../../sims/rtl-datapath/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>RTL Datapath Visualization</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine RTL designs by identifying the registers, combinational logic blocks, and data flow paths that define register-transfer-level descriptions.

Instructional Rationale: Interactive pipeline diagram showing data moving through registers on each clock cycle makes the register-transfer model concrete and traceable.

Canvas Layout:

- Top: Pipeline diagram with registers and combinational blocks
- Middle: Data values at each stage
- Bottom: Clock control and waveforms
- Side: Stage-by-stage view

Interactive Elements:

- Input data entry
- Clock step button
- Watch data flow through pipeline
- Highlight current register updates
- Reset button
- Multi-cycle animation mode

Data Visibility:

- Input value
- Each register's contents
- Combinational operations between registers
- Output value
- Pipeline latency demonstration

Visual Style:

- Boxes for registers (blue)
- Clouds for combinational logic (yellow)
- Arrows for data flow
- Values displayed inside elements
- Clock edge animation

Implementation: p5.js with pipeline simulation
</details>

RTL is the standard for synthesizable design because it:

- Maps directly to hardware structures
- Is predictable (you know what you'll get)
- Works with all synthesis tools
- Scales to complex designs

## Hierarchical Design: Divide and Conquer

**Hierarchical Design** organizes complex systems into nested modules, where each module contains instances of other modules. It's the fundamental principle of managing complexity in digital design.

```
                    ┌─────────────────────┐
                    │      Top Level      │
                    │    (System)         │
                    └─────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
         │  CPU    │    │ Memory  │    │  I/O    │
         │ Module  │    │ Module  │    │ Module  │
         └─────────┘    └─────────┘    └─────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
┌───▼───┐ ┌──▼───┐ ┌───▼───┐
│  ALU  │ │ Regs │ │Control│
└───────┘ └──────┘ └───────┘
```

Benefits of hierarchical design:

- **Complexity management**: Divide big problems into smaller ones
- **Reusability**: Write once, instantiate many times
- **Team collaboration**: Different engineers own different modules
- **Testing**: Verify modules independently before integration
- **Maintainability**: Changes are localized to specific modules

Example of hierarchical CPU design:

```verilog
// Top-level module
module simple_cpu(
    input        clk,
    input        reset,
    input  [7:0] instruction,
    output [7:0] result
);
    wire [7:0] alu_a, alu_b, alu_result;
    wire [2:0] alu_op;
    wire       reg_write;

    // Instantiate sub-modules
    register_file regs(
        .clk(clk),
        .reset(reset),
        .write_en(reg_write),
        .write_data(alu_result),
        .read_data_a(alu_a),
        .read_data_b(alu_b)
    );

    alu alu_unit(
        .a(alu_a),
        .b(alu_b),
        .op(alu_op),
        .result(alu_result)
    );

    control_unit ctrl(
        .instruction(instruction),
        .alu_op(alu_op),
        .reg_write(reg_write)
    );

    assign result = alu_result;
endmodule
```

#### Diagram: Hierarchical Design Explorer

<iframe src="../../sims/hierarchical-design/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Hierarchical Design Explorer</summary>
Type: infographic

Bloom Level: Analyze (L4)
Bloom Verb: Organize

Learning Objective: Students will be able to organize complex designs hierarchically by understanding how modules contain instances of other modules, creating a tree structure of design components.

Instructional Rationale: Interactive hierarchy tree with zoom and expand capabilities demonstrates how large designs are decomposed into manageable modules.

Canvas Layout:

- Main area: Expandable hierarchy tree
- Click to zoom into module details
- Breadcrumb navigation showing current location
- Side panel: Selected module code and ports

Interactive Elements:

- Click to expand/collapse modules
- Zoom into module to see internals
- Navigate up/down hierarchy
- Highlight signal paths through hierarchy
- Show instance count at each level
- Search for specific modules

Data Visibility:

- Full hierarchy tree
- Module names and types
- Instance counts
- Port connections
- Signal paths

Visual Style:

- Tree structure with connecting lines
- Color coding by module type
- Expandable nodes
- Breadcrumb navigation
- Module detail panel

Implementation: p5.js with tree visualization
</details>

Design hierarchy guidelines:

1. **Single responsibility**: Each module does one thing well
2. **Clear interfaces**: Ports should be well-defined and documented
3. **Reasonable size**: Modules of 50-200 lines are typical
4. **Consistent naming**: Use clear, descriptive module and port names
5. **Parameterization**: Make modules configurable with parameters

!!! tip "Think Like an Architect"
    Before writing any Verilog, sketch your hierarchy on paper. Draw boxes for modules, arrows for connections. This "architectural thinking" saves hours of debugging later. The best designers spend more time planning than coding.

## Putting It All Together: A Complete Example

Let's build a complete design using multiple modeling styles—a simple UART transmitter:

```verilog
//----------------------------------------------
// UART Transmitter - Mixed Modeling Example
//----------------------------------------------
module uart_tx #(
    parameter CLK_FREQ = 50_000_000,
    parameter BAUD     = 115200
)(
    input        clk,
    input        reset,
    input        start,
    input  [7:0] data,
    output reg   tx,
    output reg   busy
);

    // Derived parameters
    localparam CLKS_PER_BIT = CLK_FREQ / BAUD;
    localparam CNT_WIDTH    = $clog2(CLKS_PER_BIT);

    // State encoding
    localparam IDLE  = 2'b00;
    localparam START = 2'b01;
    localparam DATA  = 2'b10;
    localparam STOP  = 2'b11;

    // Registers
    reg [1:0]           state;
    reg [CNT_WIDTH-1:0] clk_count;
    reg [2:0]           bit_index;
    reg [7:0]           tx_data;

    // Combinational: Next state logic
    reg [1:0] next_state;
    always @(*) begin
        next_state = state;  // Default: stay in current state
        case (state)
            IDLE:  if (start) next_state = START;
            START: if (clk_count == CLKS_PER_BIT-1) next_state = DATA;
            DATA:  if (clk_count == CLKS_PER_BIT-1 && bit_index == 7)
                       next_state = STOP;
            STOP:  if (clk_count == CLKS_PER_BIT-1) next_state = IDLE;
        endcase
    end

    // Sequential: State register and counters
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            state     <= IDLE;
            clk_count <= 0;
            bit_index <= 0;
            tx_data   <= 8'b0;
            tx        <= 1'b1;  // Idle high
            busy      <= 1'b0;
        end else begin
            state <= next_state;

            case (state)
                IDLE: begin
                    tx   <= 1'b1;
                    busy <= 1'b0;
                    if (start) begin
                        tx_data   <= data;
                        clk_count <= 0;
                        busy      <= 1'b1;
                    end
                end

                START: begin
                    tx <= 1'b0;  // Start bit
                    if (clk_count < CLKS_PER_BIT-1)
                        clk_count <= clk_count + 1;
                    else begin
                        clk_count <= 0;
                        bit_index <= 0;
                    end
                end

                DATA: begin
                    tx <= tx_data[bit_index];
                    if (clk_count < CLKS_PER_BIT-1)
                        clk_count <= clk_count + 1;
                    else begin
                        clk_count <= 0;
                        if (bit_index < 7)
                            bit_index <= bit_index + 1;
                    end
                end

                STOP: begin
                    tx <= 1'b1;  // Stop bit
                    if (clk_count < CLKS_PER_BIT-1)
                        clk_count <= clk_count + 1;
                    else
                        clk_count <= 0;
                end
            endcase
        end
    end

endmodule
```

This example demonstrates:

- **Behavioral modeling**: Always blocks for state machine logic
- **Parameterization**: Configurable clock frequency and baud rate
- **RTL style**: Clear separation of combinational and sequential logic
- **State machines**: Proper encoding and transitions
- **Both assignment types**: `=` in combinational, `<=` in sequential

## Summary and Key Takeaways

Congratulations! You've graduated from Verilog basics to professional-level modeling techniques. Let's recap the essential points:

**Always Blocks and Sensitivity:**

- `always @(*)` for combinational logic (level-sensitive)
- `always @(posedge clk)` for sequential logic (edge-sensitive)
- `@(*)` automatically includes all read signals—use it!

**The Assignment Golden Rules:**

- Use `=` (blocking) in combinational always blocks
- Use `<=` (non-blocking) in sequential always blocks
- Never mix them in the same block
- Non-blocking enables safe concurrent updates

**Decision Structures:**

- `if-else` creates priority-encoded logic
- `case` creates parallel selection
- Always cover all cases to avoid latches
- Use `casez` for don't-care matching

**Modeling Styles:**

- **Structural**: Instantiate and connect components
- **Behavioral**: Describe what, let tools figure out how
- **Gate-level**: Use primitive gates (rarely hand-written)
- **RTL**: The practical middle ground for synthesis

**Hierarchical Design:**

- Divide complex systems into manageable modules
- Clear interfaces enable team collaboration
- Reuse modules through instantiation
- Test modules independently

!!! success "The Professional Mindset"
    Real designers use *all* these techniques, mixing them appropriately. Use behavioral modeling for complex logic, structural instantiation for reusable components, and always think hierarchically. The best Verilog code is readable, synthesizable, and maintainable.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
A compelling graphic novel could follow the journey of a chip design team at a startup in the late 1990s, racing to tape out their first ASIC before funding runs dry. The protagonist, a young engineer fresh from university, must master RTL design under pressure while dealing with the classic tensions: simulation vs. synthesis mismatches, timing closure nightmares, and the eternal blocking vs. non-blocking debugging session at 3 AM. The dramatic climax comes when a critical bug is discovered days before tape-out—traced back to a missing signal in a sensitivity list. The resolution shows the team adopting `@(*)` and better coding standards, transforming their chaotic codebase into a maintainable design that launches successfully.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: Sensitivity List Debugging"
    What's wrong with this code, and how would you fix it?
    ```verilog
    always @(a) begin
        y = a & b | c;
    end
    ```

    **Solution:**
    The sensitivity list only includes `a`, but the block also reads `b` and `c`. In simulation, `y` won't update when `b` or `c` changes. Fix:
    ```verilog
    always @(*) begin
        y = a & b | c;
    end
    ```
    Always use `@(*)` for combinational logic to automatically include all inputs.

??? question "Problem 2: Blocking vs Non-Blocking"
    What values will `a` and `b` have after the clock edge if they both start at 0 and `x=5`, `y=3`?

    Version A:
    ```verilog
    always @(posedge clk) begin
        a = x;
        b = a + y;
    end
    ```

    Version B:
    ```verilog
    always @(posedge clk) begin
        a <= x;
        b <= a + y;
    end
    ```

    **Solution:**
    - Version A (blocking): `a=5`, `b=8` (5+3). Blocking means `b` sees the new value of `a`.
    - Version B (non-blocking): `a=5`, `b=3` (0+3). Non-blocking means `b` sees the old value of `a`.

    Version B is the correct style for sequential logic, but produces different results!

??? question "Problem 3: Latch Detection"
    Will this code create a latch? If so, fix it.
    ```verilog
    always @(*) begin
        if (sel)
            y = a;
        else if (mode)
            y = b;
    end
    ```

    **Solution:**
    Yes, this creates a latch! When `sel=0` AND `mode=0`, `y` is not assigned, so it must retain its old value (latch behavior).

    Fix:
    ```verilog
    always @(*) begin
        if (sel)
            y = a;
        else if (mode)
            y = b;
        else
            y = 1'b0;  // Default case
    end
    ```

??? question "Problem 4: Case Statement Design"
    Write a Verilog module for a 3-to-8 decoder using a case statement. The output should have exactly one bit high based on the 3-bit input.

    **Solution:**
    ```verilog
    module decoder_3to8(
        input      [2:0] sel,
        output reg [7:0] out
    );

    always @(*) begin
        case (sel)
            3'b000: out = 8'b00000001;
            3'b001: out = 8'b00000010;
            3'b010: out = 8'b00000100;
            3'b011: out = 8'b00001000;
            3'b100: out = 8'b00010000;
            3'b101: out = 8'b00100000;
            3'b110: out = 8'b01000000;
            3'b111: out = 8'b10000000;
            default: out = 8'b00000000;
        endcase
    end

    endmodule
    ```

??? question "Problem 5: Edge Type Selection"
    For each scenario, choose the appropriate sensitivity list:

    A) A flip-flop that captures data on rising clock edge
    B) A combinational MUX
    C) A flip-flop with asynchronous active-low reset
    D) An SR latch (level-sensitive)

    **Solution:**
    - A) `@(posedge clk)`
    - B) `@(*)`
    - C) `@(posedge clk or negedge reset_n)`
    - D) `@(s or r)` or `@(*)` — but note: SR latches are generally avoided in synthesis

??? question "Problem 6: Structural vs Behavioral"
    Write TWO versions of a 2-input XOR gate: one structural (using gates) and one behavioral.

    **Solution:**
    Structural:
    ```verilog
    module xor_structural(input a, b, output y);
        wire nota, notb, and1, and2;
        not  g1(nota, a);
        not  g2(notb, b);
        and  g3(and1, a, notb);
        and  g4(and2, nota, b);
        or   g5(y, and1, and2);
    endmodule
    ```

    Behavioral:
    ```verilog
    module xor_behavioral(input a, b, output y);
        assign y = a ^ b;
    endmodule
    ```
    Both synthesize to equivalent hardware, but behavioral is much simpler!

??? question "Problem 7: Complete Module Design"
    Design a 4-bit up/down counter with synchronous load and enable:
    - When `load=1`: Load `data_in` into counter
    - When `enable=1` and `up=1`: Count up
    - When `enable=1` and `up=0`: Count down
    - When `enable=0`: Hold current value

    **Solution:**
    ```verilog
    module up_down_counter(
        input        clk,
        input        reset,
        input        load,
        input        enable,
        input        up,
        input  [3:0] data_in,
        output reg [3:0] count
    );

    always @(posedge clk or posedge reset) begin
        if (reset)
            count <= 4'b0;
        else if (load)
            count <= data_in;
        else if (enable) begin
            if (up)
                count <= count + 1;
            else
                count <= count - 1;
        end
        // else: count holds (implicit in sequential blocks)
    end

    endmodule
    ```

[See Annotated References](./references.md)
