---
title: Verilog HDL Fundamentals
description: Introduction to Verilog as a hardware description language for digital circuit design
generated_by: claude skill chapter-content-generator
date: 2026-01-31 14:30:00
version: 0.03
---

# Verilog HDL Fundamentals

## Summary

This chapter introduces Verilog as a hardware description language, emphasizing that HDLs describe hardware behavior rather than software execution. Students will learn the fundamental distinction between HDL and programming languages, Verilog module structure and syntax, port declarations (input, output, inout), data types including wire and reg, parameters for configurable designs, continuous assignments using the assign statement, initial blocks for simulation, and module instantiation for building hierarchical designs. These fundamentals prepare students for behavioral and structural modeling.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Verilog HDL
2. HDL vs Programming
3. Module Definition
4. Port Declaration
5. Input Port
6. Output Port
7. Inout Port
8. Wire Data Type
9. Reg Data Type
10. Parameter
11. Assign Statement
12. Continuous Assignment
13. Initial Block
14. Module Instantiation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Combinational Logic Design Fundamentals](../04-combinational-logic-design/index.md)
- [Chapter 7: Introduction to Sequential Logic](../07-intro-sequential-logic/index.md)
- [Chapter 11: Registers, Counters, and Datapath](../11-registers-counters-datapath/index.md)

---

## Introduction: Speaking Hardware's Native Language

Welcome to the chapter where you stop drawing circuits and start *writing* them. If the previous chapters were about understanding the grammar of digital logic—gates, flip-flops, state machines—this chapter is where you learn to compose entire sentences, paragraphs, and essays in the language that hardware actually understands.

Think of it this way: you've learned how to think about digital circuits, but professionals don't draw thousands of gates by hand. They describe what they want in a **Hardware Description Language (HDL)**, and then sophisticated tools translate those descriptions into actual silicon or FPGA configurations. It's like having a magical translator who can turn your written wishes into real, functioning circuits.

Verilog is one of the two dominant HDLs in the industry (the other being VHDL). It was created at Gateway Design Automation in 1984, became an IEEE standard in 1995, and has been the *lingua franca* of chip design ever since. Every processor in your laptop, every graphics card, every smartphone chip—chances are, Verilog was involved in its creation.

Here's the beautiful irony: Verilog looks like a programming language, feels like a programming language, and will trick you into thinking it *is* a programming language. But it's not. It's something far more interesting. By the end of this chapter, you'll understand why that distinction matters—and why mastering it gives you a superpower that software-only developers simply don't have.

Ready to write some hardware? Let's begin.

## What Is Verilog HDL?

**Verilog HDL** (Hardware Description Language) is a textual language for describing digital circuits. It allows designers to specify the structure and behavior of electronic systems in a way that can be simulated, synthesized into actual hardware, or both.

The key word here is *description*. Verilog describes hardware—it tells the synthesis tools what circuits you want to exist. It's more like an architectural blueprint than a cooking recipe. A recipe says "do this, then do that." A blueprint says "there should be a wall here, a door there, and they should connect like this."

Verilog was created with several goals in mind:

- **Simulation**: Test your design before building it
- **Synthesis**: Automatically generate gate-level circuits from behavioral descriptions
- **Documentation**: Provide a precise, unambiguous specification of circuit behavior
- **Reuse**: Build libraries of components that can be instantiated in multiple designs

A simple Verilog module looks like this:

```verilog
module and_gate(
    input  a,
    input  b,
    output y
);
    assign y = a & b;
endmodule
```

This describes an AND gate. The `module` defines a component named `and_gate` with two inputs (`a` and `b`) and one output (`y`). The `assign` statement says that `y` should always equal `a AND b`. That's it—a complete, synthesizable hardware description.

!!! tip "Verilog Is Not Just Code—It's a Circuit Specification"
    When you write Verilog, you're not telling a computer what steps to execute. You're telling a synthesis tool what wires and gates to create. Every line of Verilog corresponds to actual hardware that will exist physically (or in an FPGA's configuration).

The name "Verilog" comes from "Verification Logic"—it was originally created for simulation and verification before synthesis became practical. Today, we use it for both.

## HDL vs Programming: The Fundamental Divide

Understanding the difference between **HDL and Programming** is perhaps the most important conceptual leap in this chapter. Get this right, and everything else falls into place. Get it wrong, and you'll spend hours debugging "code" that doesn't work because it was never code in the first place.

**Software programming** (C, Python, Java) describes a *sequence of operations* that a processor executes one at a time. The statements have an order—first this, then that. Variables are memory locations that change over time as the program runs.

**Hardware description** (Verilog, VHDL) describes a *structure of interconnected components* that all exist simultaneously. Everything happens at once. There's no "first this, then that"—there's only "this exists, and that exists, and they're connected."

Let's see the difference with a concrete example:

**Software (Python):**
```python
x = a + b
y = x + c
z = y + d
```

This executes sequentially. First calculate `x`, then use `x` to calculate `y`, then use `y` to calculate `z`. If you swap the lines, the program breaks.

**Hardware (Verilog):**
```verilog
assign x = a + b;
assign y = x + c;
assign z = y + d;
```

These three lines describe three adders that exist *simultaneously*. The order of the lines doesn't matter—they could be reversed, and the same hardware would be generated. All three additions happen at the same time, every nanosecond, forever.

Here's a table highlighting the key differences:

| Aspect | Software Programming | Hardware Description |
|--------|---------------------|---------------------|
| Execution model | Sequential (one thing at a time) | Concurrent (everything at once) |
| Statements describe | Steps to perform | Structure that exists |
| Variables represent | Memory locations | Wires or registers |
| Order matters? | Yes, critically | Not for concurrent statements |
| Time concept | Implicit (program counter) | Explicit (clock edges, delays) |
| Resource usage | Bounded by memory | Bounded by chip area |

!!! warning "The Most Common Mistake"
    New Verilog programmers often write sequential-looking code and expect it to execute like software. For example, they write `x = a; x = b;` and expect `x` to become `a` first, then `b`. In synthesizable Verilog, this often results in only the last assignment being active—because both "happen at once," and only one can drive a wire.

Think of it like this: software is a movie (a sequence of frames shown one after another), while hardware is a photograph (everything captured simultaneously). You can pause a movie at any moment. A photograph has no "moments"—it's all there, all at once.

#### Diagram: HDL vs Programming Mental Model

<iframe src="../../sims/hdl-vs-programming/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>HDL vs Programming Mental Model</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Contrast

Learning Objective: Students will be able to contrast the execution model of software (sequential) with the description model of HDL (concurrent), understanding why statement order matters in one but not the other.

Instructional Rationale: Side-by-side visualization showing software executing step-by-step while hardware operates continuously makes the fundamental difference viscerally clear.

Canvas Layout:

- Left half: Software execution panel
- Right half: Hardware description panel
- Bottom: Shared input controls and comparison table
- Top: Clear labels "Sequential Execution" vs "Concurrent Operation"

Interactive Elements:

- Toggle inputs A, B, C, D with buttons
- Software side shows step-by-step execution with current line highlighted
- Hardware side shows all gates operating simultaneously
- Speed control for software animation
- Reset button
- "Swap line order" button to demonstrate order independence in HDL

Data Visibility:

- Current values of all variables/wires
- Which software line is currently executing
- All hardware outputs updating in parallel
- Timing difference visualization
- Execution trace for software side

Visual Style:

- Software panel: code listing with execution pointer
- Hardware panel: gate diagram with signal values
- Color coding: active operations highlighted
- Timing diagram at bottom showing when values change
- Clear visual for "all at once" vs "one at a time"

Implementation: p5.js with dual simulation engines
</details>

## Module Definition: The Building Block of Verilog

A **Module Definition** is the fundamental unit of hierarchy in Verilog. Every Verilog design is composed of modules, which can contain other modules, creating a hierarchical structure from simple gates up to complete systems.

Think of modules like LEGO bricks. Each brick has a specific shape and function. You can combine bricks to make larger structures, and those structures can become components of even larger creations. The same AND gate module you define once can be used a thousand times throughout your design.

The basic syntax of a module is:

```verilog
module module_name(
    // port list goes here
);
    // module body goes here
endmodule
```

Every module has:

1. **A name**: Unique identifier for this component
2. **A port list**: The module's interface to the outside world
3. **A body**: What the module actually does
4. **An `endmodule` keyword**: Marks the end of the definition

Here's a complete example—a 2-to-1 multiplexer:

```verilog
module mux2to1(
    input  a,      // First data input
    input  b,      // Second data input
    input  sel,    // Selection signal
    output y       // Output
);
    assign y = sel ? b : a;  // If sel=1, output b; else output a
endmodule
```

Key points about modules:

- Module names should be descriptive and follow a consistent naming convention
- Comments (using `//` for single-line or `/* */` for multi-line) help document the design
- The port list defines the module's "pins"—how it connects to the outside world
- The body defines the module's functionality

Modules can be as simple as a single gate or as complex as an entire processor. The key is that each module encapsulates a specific function and exposes a clean interface.

!!! note "Modules Are Like Classes (Sort Of)"
    If you know object-oriented programming, modules are somewhat like classes. They define a template that can be instantiated multiple times. However, unlike classes, modules don't have methods that get called—they describe hardware that continuously exists and operates.

A module can contain:

- Wire and register declarations
- Continuous assignments (`assign` statements)
- Procedural blocks (`always`, `initial`)
- Instantiations of other modules
- Parameters for configurability

We'll explore each of these in this chapter.

## Port Declaration: The Module's Interface

A **Port Declaration** specifies the inputs and outputs of a module—its interface to the external world. Ports are like the pins on an integrated circuit chip. They're how signals get into and out of the module.

Every port has three key properties:

1. **Direction**: Input, output, or bidirectional (inout)
2. **Data type**: Wire or reg (we'll cover these soon)
3. **Width**: Single bit or multi-bit vector

The modern Verilog syntax (ANSI-style) declares ports directly in the module header:

```verilog
module adder(
    input  [3:0] a,      // 4-bit input
    input  [3:0] b,      // 4-bit input
    output [4:0] sum     // 5-bit output (includes carry)
);
    assign sum = a + b;
endmodule
```

The older, pre-ANSI style separates the port list from the declarations:

```verilog
module adder(a, b, sum);
    input  [3:0] a;
    input  [3:0] b;
    output [4:0] sum;

    assign sum = a + b;
endmodule
```

Both styles are valid, but ANSI-style is cleaner and preferred for new designs.

#### Diagram: Port Declaration Anatomy

<iframe src="../../sims/port-declaration-anatomy/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Port Declaration Anatomy</summary>
Type: infographic

Bloom Level: Remember (L1)
Bloom Verb: Identify

Learning Objective: Students will be able to identify the components of a Verilog port declaration including direction, data type, width specification, and port name.

Instructional Rationale: Interactive diagram with hover explanations for each part of a port declaration makes syntax components memorable.

Canvas Layout:

- Center: Enlarged code showing port declaration
- Hover zones over each component (direction, brackets, width, name)
- Right panel: Description of hovered element
- Bottom: Example variations

Interactive Elements:

- Hover over any part of the declaration to see explanation
- Click to lock explanation in place
- Toggle between different declaration examples
- Show/hide optional components (width, data type)
- Quiz mode: identify parts by clicking

Data Visibility:

- Full port declaration syntax
- Component breakdown (direction, type, width, name)
- Legal values for each component
- Common mistakes highlighted

Visual Style:

- Color-coded syntax highlighting
- Smooth hover transitions
- Clean, readable font for code
- Annotation arrows pointing to elements
- Example gallery at bottom

Implementation: p5.js with hover detection and info panels
</details>

Multi-bit ports use vector notation with square brackets:

| Notation | Meaning |
|----------|---------|
| `[7:0]` | 8-bit vector, bit 7 is MSB, bit 0 is LSB |
| `[0:7]` | 8-bit vector, bit 0 is MSB, bit 7 is LSB |
| `[3:0]` | 4-bit vector (nibble) |
| `[31:0]` | 32-bit vector (word) |

By convention, `[high:low]` is most common, with the higher index as the MSB.

## Input Port: Signals Coming In

An **Input Port** is a port that receives signals from outside the module. The module can read from input ports but cannot drive them—they are strictly for receiving data.

Input ports are like the sensors on a robot: they observe the external world but don't change it. The signals come from somewhere else, and the module simply uses them.

```verilog
module voter(
    input a,           // Single-bit input
    input b,           // Single-bit input
    input c,           // Single-bit input
    output majority    // Output: 1 if at least two inputs are 1
);
    assign majority = (a & b) | (b & c) | (a & c);
endmodule
```

Key points about input ports:

- They are implicitly of type `wire` (you can't assign to them with `=` in procedural blocks)
- They can be single-bit or multi-bit vectors
- They cannot appear on the left side of a procedural assignment
- They represent physical connections to external circuits

In hardware terms, an input port is a wire coming into your module from somewhere else. You read the signal, but you don't control it.

!!! tip "Treat Inputs as Read-Only"
    If you try to assign a value to an input port inside your module, you'll get an error. Inputs are read-only. This makes sense—you can't control the signal coming from outside your circuit.

## Output Port: Signals Going Out

An **Output Port** is a port that sends signals from inside the module to the outside world. The module drives output ports; external circuits read them.

Output ports are like the robot's actuators: they affect the external world based on the module's internal decisions.

```verilog
module comparator(
    input  [7:0] a,
    input  [7:0] b,
    output       eq,    // 1 if a == b
    output       lt,    // 1 if a < b
    output       gt     // 1 if a > b
);
    assign eq = (a == b);
    assign lt = (a < b);
    assign gt = (a > b);
endmodule
```

Output ports can be of type `wire` (driven by continuous assignments) or `reg` (driven by procedural blocks). In modern Verilog, you can use `logic` as a universal type, but we'll focus on wire and reg for now.

Different ways to declare outputs:

```verilog
output y;           // Implicitly wire, must use assign
output wire y;      // Explicitly wire, same as above
output reg y;       // Explicitly reg, can use in always blocks
output [7:0] data;  // 8-bit vector output
```

Key points about output ports:

- They are driven from inside the module
- External modules can read them but not drive them
- They represent physical connections to the outside world

## Inout Port: Bidirectional Signals

An **Inout Port** is a bidirectional port that can both send and receive signals. These are relatively rare and are used primarily for shared buses or specific protocols where multiple devices share a single wire.

```verilog
module bus_driver(
    input        enable,
    input  [7:0] data_out,
    output [7:0] data_in,
    inout  [7:0] bus       // Bidirectional bus
);
    // Drive bus when enabled, else high-impedance
    assign bus = enable ? data_out : 8'bz;

    // Always read from bus
    assign data_in = bus;
endmodule
```

The key concept with bidirectional ports is **tristate logic**—the ability to "disconnect" from a wire by outputting a high-impedance value (`z`). When a driver outputs `z`, it effectively removes itself from the bus, allowing other devices to drive it.

!!! warning "Use Inout Sparingly"
    Bidirectional ports are tricky to synthesize and debug. They're necessary for certain interfaces (like I2C, bidirectional data buses, or GPIO pins) but should be avoided when unidirectional alternatives exist. Most internal design uses dedicated input and output ports.

Think of a bidirectional bus like a conversation where multiple people share one microphone. Only one person can talk at a time, and everyone else must stay quiet (high-impedance). If two people try to talk at once, chaos ensues (bus contention).

Key properties of inout ports:

| Property | Description |
|----------|-------------|
| Direction | Can be both input and output (but not simultaneously) |
| Data type | Always `wire` (must use continuous assignment) |
| Tristate | Must output `z` when not driving |
| Contention risk | Multiple drivers can cause undefined behavior |

## Wire Data Type: Physical Connections

The **Wire Data Type** represents a physical connection between components—a literal wire in your circuit. Wires don't store values; they transmit them continuously from their driver to wherever they're connected.

Think of a wire like a pipe carrying water. The water doesn't "stay" in the pipe; it flows through continuously. Whatever the source produces, the wire carries to the destination—instantly and continuously.

```verilog
wire a;           // Single-bit wire
wire [7:0] bus;   // 8-bit bus (collection of 8 wires)
wire [3:0] x, y;  // Multiple wire declarations
```

Key characteristics of wires:

- **Must be driven continuously**: Wires need something actively driving them (a gate output, another module's output, or an assign statement)
- **Cannot hold values**: If nothing drives a wire, it has an undefined value (`x` in simulation)
- **Multiple readers allowed**: Many modules can connect to and read from a wire
- **Single driver (usually)**: Normally, only one thing should drive a wire. Multiple drivers require special handling (tristate logic)

Wires are assigned using `assign` statements (continuous assignment):

```verilog
wire a, b, c;
wire and_result;
wire or_result;

assign and_result = a & b;    // AND gate drives this wire
assign or_result = a | c;     // OR gate drives this wire
```

!!! note "Wire = Pure Combinational"
    Wires represent combinational connections. Their value changes instantaneously when their input changes. There's no memory, no delay (in functional terms), no clock involvement. If you need to remember a value, you need something else—that's where `reg` comes in.

#### Diagram: Wire vs Reg Comparison

<iframe src="../../sims/wire-vs-reg/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Wire vs Reg Interactive Comparison</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Compare

Learning Objective: Students will be able to compare wire and reg data types, understanding that wires carry continuous signals while reg types can hold values across clock cycles.

Instructional Rationale: Side-by-side simulation showing how wires respond immediately to input changes while regs require clock edges to update demonstrates the fundamental behavioral difference.

Canvas Layout:

- Left side: Wire demonstration with input/output
- Right side: Reg demonstration with clock and flip-flop
- Center: Comparison summary
- Bottom: Input controls and clock generator

Interactive Elements:

- Input toggle buttons affecting both sides
- Clock pulse button for reg side
- Continuous vs clocked mode toggle
- Value displays for wire and reg
- Animation showing signal propagation
- Timing diagram building over time

Data Visibility:

- Current wire value (changes immediately with input)
- Current reg value (changes only at clock edge)
- Input values
- Clock state
- History of value changes

Visual Style:

- Wire shown as simple connection line
- Reg shown with flip-flop symbol
- Color change on value transitions
- Timing diagram at bottom
- Clear labels distinguishing the two sides

Implementation: p5.js with wire and reg simulation
</details>

## Reg Data Type: Holding Values

The **Reg Data Type** represents a variable that can hold a value. Despite its name, `reg` does not always synthesize to a register (flip-flop)—it simply means "a thing that can be assigned in a procedural block."

This is one of Verilog's most confusing aspects for beginners, so let's be clear:

- **`reg` is a data type, not a hardware register**
- **Whether a `reg` becomes a flip-flop depends on how you use it**
- **A `reg` used in a combinational `always` block becomes wires**
- **A `reg` used in a clocked `always` block becomes a flip-flop**

```verilog
reg q;            // Single-bit reg
reg [7:0] count;  // 8-bit reg
reg [31:0] data;  // 32-bit reg
```

The key difference from wires:

| Aspect | Wire | Reg |
|--------|------|-----|
| Assignment method | `assign` (continuous) | `=` or `<=` in procedural blocks |
| Value retention | Never (must be driven) | Holds last assigned value |
| Usage context | Continuous assignment | `always` and `initial` blocks |
| Default synthesis | Wires | Wires OR flip-flops (depends on usage) |

Here's the critical insight: a `reg` becomes a flip-flop *only* if there's a code path where it doesn't get assigned a new value. If the hardware needs to "remember" the old value, it synthesizes storage (a flip-flop).

```verilog
// This synthesizes to combinational logic (no flip-flop)
reg y;
always @(*) begin
    y = a & b;  // y is ALWAYS assigned, no memory needed
end

// This synthesizes to a flip-flop
reg q;
always @(posedge clk) begin
    q <= d;  // q gets new value only at clock edge, needs storage
end
```

!!! tip "Modern Alternative: logic"
    SystemVerilog introduced the `logic` type, which can be used instead of both `wire` and `reg`. It's more flexible and less confusing. However, Verilog-2001 (which is commonly taught) uses `wire` and `reg`, so understanding both is essential.

## Parameter: Making Modules Configurable

A **Parameter** is a constant value that can be set when a module is instantiated, allowing you to create configurable, reusable modules. Parameters are like the settings on a machine—they're fixed once the machine is built, but different machines can have different settings.

```verilog
module counter #(
    parameter WIDTH = 8,    // Default: 8-bit counter
    parameter MAX_COUNT = 255
)(
    input              clk,
    input              reset,
    output [WIDTH-1:0] count
);
    // Implementation uses WIDTH and MAX_COUNT
endmodule
```

Parameters are perfect for:

- **Bus widths**: Create 8-bit, 16-bit, or 32-bit versions of the same module
- **Timing values**: Configurable delays or counters
- **Array sizes**: Parameterized memory depths
- **Feature selection**: Enable or disable optional functionality

When instantiating a parameterized module:

```verilog
// 8-bit counter (using default)
counter c1(.clk(clk), .reset(rst), .count(cnt8));

// 16-bit counter (overriding WIDTH)
counter #(.WIDTH(16), .MAX_COUNT(65535)) c2(
    .clk(clk),
    .reset(rst),
    .count(cnt16)
);
```

The `#(...)` syntax provides parameter values during instantiation.

Local parameters (`localparam`) are similar but cannot be overridden:

```verilog
localparam STATE_IDLE = 2'b00;
localparam STATE_RUN  = 2'b01;
localparam STATE_DONE = 2'b10;
```

Use `localparam` for internal constants that shouldn't be changed by users of your module.

!!! tip "Design for Reuse"
    When creating a module, ask yourself: "What might someone want to change when using this?" Make those things parameters. A well-parameterized module can be reused across projects without modification.

## Assign Statement: Continuous Connection

The **Assign Statement** creates a continuous connection between a wire and an expression. It describes combinational logic—the output continuously reflects the inputs, with no memory or clock involved.

```verilog
assign y = a & b;          // AND gate
assign sum = a + b;        // Adder
assign mux_out = sel ? b : a;  // Multiplexer
```

Key properties of assign statements:

- **Continuous evaluation**: The right-hand side is constantly evaluated
- **Instant propagation**: Changes on the right appear on the left immediately
- **No order dependence**: Multiple assign statements execute "simultaneously"
- **Wire outputs only**: The left side must be a wire (or output port)

You can use any valid expression on the right side:

```verilog
// Arithmetic
assign sum = a + b - c;

// Logical
assign result = (a & b) | (~c & d);

// Comparison
assign equal = (a == b);
assign greater = (a > b);

// Conditional (ternary)
assign out = enable ? data : 8'b0;

// Reduction
assign all_ones = &data;  // AND all bits together
assign parity = ^data;    // XOR all bits together
```

#### Diagram: Continuous Assignment Behavior

<iframe src="../../sims/continuous-assignment/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Continuous Assignment Visualization</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate how continuous assignments work by observing that changes in input signals immediately propagate to output signals without requiring clock edges.

Instructional Rationale: Real-time visualization where students toggle inputs and see outputs change instantly reinforces the "continuous" nature of assign statements.

Canvas Layout:

- Top: Verilog code showing assign statement
- Center: Gate-level visualization of the assignment
- Bottom left: Input toggle controls
- Bottom right: Output value display
- Side: Timing trace showing signal history

Interactive Elements:

- Toggle buttons for each input
- Output updates immediately when any input changes
- Highlight which inputs are affecting output
- Gate diagram shows signal flow
- Timing trace builds as inputs change
- Reset button to clear history

Data Visibility:

- Current input values
- Current output value
- Expression being computed
- Gate-level equivalent
- Signal history on timing diagram

Visual Style:

- Clean circuit diagram
- Animated signal propagation through gates
- Color coding for 0/1 values
- Real-time timing diagram
- Code highlighting showing active statement

Implementation: p5.js with real-time signal simulation
</details>

Multiple assign statements can reference the same signals:

```verilog
wire [3:0] a, b;
wire [4:0] sum;
wire carry;
wire zero;

assign sum = a + b;
assign carry = sum[4];
assign zero = (sum == 5'b0);
```

All three assignments exist simultaneously—`sum` is computed, and then both `carry` and `zero` are computed from `sum`, all in one combinational network.

## Continuous Assignment: Always-On Logic

**Continuous Assignment** is the broader concept that assign statements implement. It means the assignment is always active—the output perpetually reflects the current value of the expression.

This is fundamentally different from procedural assignment (like in software) where an assignment happens once and the variable retains that value until explicitly changed.

Consider this contrast:

**Software (procedural):**
```python
y = a + b  # Computed once, when this line executes
# ... later ...
a = 5      # y is NOT updated
```

**Verilog (continuous):**
```verilog
assign y = a + b;  // y ALWAYS equals a+b
// If a changes, y changes automatically
```

The "continuous" in continuous assignment means:

- The relationship is eternal (as long as the circuit exists)
- There's no moment when the assignment "happens"—it just *is*
- Any input change causes immediate output update

Think of it like a formula in a spreadsheet. When you write `=A1+B1` in cell C1, you're not telling the spreadsheet to compute the sum once. You're establishing a *relationship* that the spreadsheet maintains forever. Change A1 or B1, and C1 automatically updates. That's continuous assignment.

!!! note "Synthesis Creates Permanent Hardware"
    Every continuous assignment synthesizes to actual gates that exist permanently in your design. The statement `assign y = a & b;` doesn't run—it creates an AND gate that's always there, always doing its job.

## Initial Block: Setting Up Simulation

An **Initial Block** is a procedural block that executes once at the beginning of simulation (time zero). It's used primarily for testbenches—not for synthesizable design.

```verilog
initial begin
    a = 0;
    b = 0;
    #10 a = 1;   // After 10 time units, set a=1
    #10 b = 1;   // After 10 more time units, set b=1
    #10 a = 0;   // And so on...
    #10 b = 0;
    #20 $finish; // End simulation
end
```

Key points about initial blocks:

- **Simulation only**: Most initial blocks don't synthesize to hardware
- **Executes once**: Runs at simulation start, never again
- **Sequential execution**: Statements execute in order (like software!)
- **Delay control**: The `#` operator pauses for specified time units
- **Testbench use**: Perfect for generating test stimuli

Initial blocks are invaluable for testing your designs:

```verilog
module testbench;
    reg clk;
    reg reset;
    reg [7:0] data_in;
    wire [7:0] data_out;

    // Instantiate device under test
    my_module dut(
        .clk(clk),
        .reset(reset),
        .data_in(data_in),
        .data_out(data_out)
    );

    // Clock generation
    initial begin
        clk = 0;
        forever #5 clk = ~clk;  // Toggle every 5 time units
    end

    // Test sequence
    initial begin
        reset = 1;
        data_in = 8'h00;
        #20 reset = 0;
        #10 data_in = 8'hAB;
        #10 data_in = 8'hCD;
        #100 $finish;
    end
endmodule
```

!!! warning "Initial Blocks and Synthesis"
    While *most* initial blocks aren't synthesizable, some FPGA tools support initial blocks for register initialization. However, this is tool-specific and not portable. For synthesizable reset behavior, use explicit reset signals in `always` blocks instead.

The initial block is where Verilog admits it's a simulation language as well as an HDL. It lets you write sequential, procedural test code—the kind of code that controls *time* rather than describing *structure*.

#### Diagram: Initial Block Timeline

<iframe src="../../sims/initial-block-timeline/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Initial Block Execution Timeline</summary>
Type: timeline

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Learning Objective: Students will be able to interpret how initial blocks execute sequentially at simulation start, understanding delay controls and the difference from synthesizable always blocks.

Instructional Rationale: Animated timeline showing statements executing in sequence with delays makes the procedural, simulation-only nature of initial blocks clear.

Canvas Layout:

- Top: Verilog initial block code
- Center: Timeline showing execution progress
- Bottom: Signal waveforms changing over time
- Right: Current simulation time display

Interactive Elements:

- Play/pause button for execution
- Step-through mode (execute one statement at a time)
- Speed control slider
- Current statement highlighting
- Simulation time counter
- Reset to start button

Data Visibility:

- Current simulation time
- Which statement is executing
- All signal values over time
- Delay durations between statements
- Complete waveform history

Visual Style:

- Code panel with current line highlighted
- Timeline with markers for each statement
- Waveform display synced with timeline
- Delay periods shown as time gaps
- Color coding for signal values

Implementation: p5.js with simulation time engine
</details>

## Module Instantiation: Building Hierarchies

**Module Instantiation** is how you create instances of modules—placing copies of defined components in your design and connecting their ports. This is how you build complex systems from simpler pieces.

Think of it like placing components on a circuit board. You have a library of parts (modules), and instantiation is the act of placing a part and wiring it up.

Basic syntax:

```verilog
module_name instance_name(
    .port_name1(signal1),
    .port_name2(signal2),
    // ...
);
```

Example—building a 4-bit adder from 1-bit full adders:

```verilog
module full_adder(
    input a, b, cin,
    output sum, cout
);
    assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (cin & (a ^ b));
endmodule

module adder_4bit(
    input  [3:0] a,
    input  [3:0] b,
    input        cin,
    output [3:0] sum,
    output       cout
);
    wire c1, c2, c3;  // Internal carry wires

    // Instantiate four full adders
    full_adder fa0(.a(a[0]), .b(b[0]), .cin(cin),  .sum(sum[0]), .cout(c1));
    full_adder fa1(.a(a[1]), .b(b[1]), .cin(c1),   .sum(sum[1]), .cout(c2));
    full_adder fa2(.a(a[2]), .b(b[2]), .cin(c2),   .sum(sum[2]), .cout(c3));
    full_adder fa3(.a(a[3]), .b(b[3]), .cin(c3),   .sum(sum[3]), .cout(cout));
endmodule
```

The `.port_name(signal)` syntax is called **named port connection**. It's explicit about which port connects to which signal.

There's also **positional port connection**:

```verilog
full_adder fa0(a[0], b[0], cin, sum[0], c1);  // Order matters!
```

Named connections are preferred—they're clearer and less error-prone.

#### Diagram: Module Hierarchy Visualization

<iframe src="../../sims/module-hierarchy/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Module Hierarchy Visualization</summary>
Type: infographic

Bloom Level: Analyze (L4)
Bloom Verb: Organize

Learning Objective: Students will be able to organize a hierarchical design by identifying how modules instantiate other modules and how signals connect between levels of hierarchy.

Instructional Rationale: Interactive hierarchy diagram showing parent-child module relationships with zoom into instantiation details makes structural design tangible.

Canvas Layout:

- Main area: Hierarchical tree view of modules
- Clicking a module expands to show internals
- Lines show instantiation relationships
- Side panel: Selected module details and port list

Interactive Elements:

- Click modules to expand/collapse
- Hover to see port connections
- Highlight signal paths through hierarchy
- Zoom in/out of hierarchy levels
- Filter by module type
- Show instance names vs module names

Data Visibility:

- All modules and their instances
- Port connections at each level
- Signal names at boundaries
- Instance count for each module type
- Hierarchical path to any component

Visual Style:

- Tree structure for hierarchy
- Colored boxes for different module types
- Connection lines with signal labels
- Nested views for expanded modules
- Clear parent-child relationships

Implementation: p5.js with interactive tree visualization
</details>

Hierarchical design is powerful because:

- **Divide and conquer**: Build and test small modules, then combine them
- **Reuse**: Write a module once, instantiate it many times
- **Abstraction**: Hide complexity inside modules
- **Parallel development**: Different team members can work on different modules

You can instantiate the same module multiple times:

```verilog
// Create two separate AND gates
and_gate g1(.a(x), .b(y), .y(out1));
and_gate g2(.a(p), .b(q), .y(out2));
```

Each instance (`g1`, `g2`) is a separate piece of hardware with its own signals.

## Bringing It All Together: A Complete Design

Let's combine everything we've learned into a complete, working example—a parameterized shift register with parallel load.

```verilog
// Parameterized shift register with parallel load
module shift_register #(
    parameter WIDTH = 8
)(
    input                  clk,
    input                  reset,
    input                  load,      // 1=parallel load, 0=shift
    input                  shift_in,  // Serial input for shifting
    input      [WIDTH-1:0] data_in,   // Parallel input
    output reg [WIDTH-1:0] data_out,  // Current register contents
    output                 shift_out  // Serial output (MSB)
);

    // Continuous assignment for serial output
    assign shift_out = data_out[WIDTH-1];

    // Sequential logic for the shift register
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            data_out <= {WIDTH{1'b0}};  // Clear all bits
        end else if (load) begin
            data_out <= data_in;         // Parallel load
        end else begin
            data_out <= {data_out[WIDTH-2:0], shift_in};  // Shift left
        end
    end

endmodule
```

This single module demonstrates:

- **Parameters**: `WIDTH` makes the register size configurable
- **Ports**: Inputs, outputs, and vectors
- **Wire (implicit)**: `shift_out` driven by `assign`
- **Reg**: `data_out` assigned in an `always` block
- **Continuous assignment**: For `shift_out`
- **Sequential logic**: Clocked `always` block with reset

And here's a testbench using an initial block:

```verilog
module shift_register_tb;
    reg clk, reset, load, shift_in;
    reg [7:0] data_in;
    wire [7:0] data_out;
    wire shift_out;

    // Instantiate the device under test
    shift_register #(.WIDTH(8)) dut(
        .clk(clk),
        .reset(reset),
        .load(load),
        .shift_in(shift_in),
        .data_in(data_in),
        .data_out(data_out),
        .shift_out(shift_out)
    );

    // Clock generation
    initial begin
        clk = 0;
        forever #5 clk = ~clk;
    end

    // Test sequence
    initial begin
        // Initialize
        reset = 1; load = 0; shift_in = 0; data_in = 8'h00;
        #20 reset = 0;

        // Test parallel load
        load = 1; data_in = 8'hA5;
        #10 load = 0;

        // Test shifting
        shift_in = 1;
        #50;
        shift_in = 0;
        #50;

        $finish;
    end
endmodule
```

## Common Verilog Operators

Here's a quick reference for operators you'll use frequently:

**Bitwise operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `&` | AND | `y = a & b;` |
| `\|` | OR | `y = a \| b;` |
| `^` | XOR | `y = a ^ b;` |
| `~` | NOT | `y = ~a;` |
| `~&` | NAND | `y = ~(a & b);` |
| `~\|` | NOR | `y = ~(a \| b);` |
| `~^` or `^~` | XNOR | `y = a ~^ b;` |

**Reduction operators** (reduce a vector to one bit):

| Operator | Description | Example |
|----------|-------------|---------|
| `&a` | AND all bits | `assign all_ones = &data;` |
| `\|a` | OR all bits | `assign any_one = \|data;` |
| `^a` | XOR all bits (parity) | `assign parity = ^data;` |

**Comparison operators:**

| Operator | Description |
|----------|-------------|
| `==` | Equal |
| `!=` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal |
| `>=` | Greater than or equal |

**Arithmetic operators:**

| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulus |

**Shift operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `<<` | Logical shift left | `y = a << 2;` |
| `>>` | Logical shift right | `y = a >> 2;` |
| `<<<` | Arithmetic shift left | Same as `<<` |
| `>>>` | Arithmetic shift right | Sign extends |

**Concatenation and replication:**

```verilog
{a, b}          // Concatenate a and b
{4{1'b0}}       // Replicate: 4'b0000
{8{1'b1}}       // Replicate: 8'b11111111
{a, 2'b00}      // a followed by two zeros
```

## Number Formats in Verilog

Verilog has a specific syntax for specifying numeric literals:

```
<size>'<radix><value>
```

Where:

- **size**: Number of bits (optional, defaults based on context)
- **radix**: Base (b=binary, o=octal, d=decimal, h=hexadecimal)
- **value**: The number in the specified base

Examples:

| Literal | Value | Bits |
|---------|-------|------|
| `8'b10101010` | 170 | 8 bits binary |
| `8'hAA` | 170 | 8 bits hex |
| `8'd170` | 170 | 8 bits decimal |
| `4'b0101` | 5 | 4 bits binary |
| `1'b0` | 0 | 1 bit |
| `1'b1` | 1 | 1 bit |
| `32'hDEAD_BEEF` | | 32 bits hex (underscores for readability) |

Special values:

- `x` or `X`: Unknown value (used in simulation)
- `z` or `Z`: High-impedance (disconnected)

```verilog
8'bxxxx_xxxx   // All unknown
8'bzzzz_zzzz   // All high-impedance
8'b1010_xxzz   // Mixed
```

## Common Beginner Mistakes

Before we wrap up, let's address some mistakes that trip up almost everyone:

**Mistake 1: Forgetting that Verilog isn't software**
```verilog
// WRONG: Thinking this executes in order
always @(*) begin
    temp = a + b;
    result = temp * c;
end
// This synthesizes to combinational logic, not sequential operations
```

**Mistake 2: Multiple drivers on a wire**
```verilog
// WRONG: Two things driving the same wire
assign y = a & b;
assign y = c | d;  // Error! Which one wins?
```

**Mistake 3: Using reg when wire is needed**
```verilog
// WRONG: Trying to use reg with assign
reg y;
assign y = a & b;  // Error! assign needs wire
```

**Mistake 4: Forgetting sensitivity list**
```verilog
// WRONG: Will not respond to input changes
always @(a) begin  // Missing b!
    y = a & b;
end
// Use @(*) to automatically include all inputs
```

**Mistake 5: Blocking vs non-blocking assignment confusion**
```verilog
// Sequential logic should use <=
always @(posedge clk) begin
    q = d;  // WRONG: Use <= for sequential logic
end

// Correct:
always @(posedge clk) begin
    q <= d;  // Correct non-blocking assignment
end
```

We'll explore the blocking (`=`) vs non-blocking (`<=`) distinction in the next chapter on Verilog modeling styles.

## Summary and Key Takeaways

Congratulations on taking your first steps into the world of Hardware Description Languages. You've learned the fundamental concepts that will carry you through the rest of your Verilog journey.

**Core Concepts:**

- **Verilog HDL** describes hardware structure and behavior in text form
- **HDL vs Programming**: Verilog describes concurrent hardware, not sequential operations
- **Modules** are the building blocks, encapsulating functionality with defined interfaces
- **Ports** (input, output, inout) define how modules connect to the outside world

**Data Types:**

- **Wire**: Continuous connections, must be driven, no storage
- **Reg**: Can hold values, used in procedural blocks
- **Parameters**: Constants that make modules configurable

**Assignment and Blocks:**

- **Continuous assignment** (`assign`): Always-active combinational logic
- **Initial blocks**: Simulation-time sequential code for testbenches
- **Module instantiation**: Creating instances and building hierarchies

**Key Distinctions:**

- Statements don't "execute"—they describe structure
- Order of statements (usually) doesn't matter
- Everything happens concurrently unless explicitly sequenced
- Synthesis creates permanent hardware; simulation runs code

!!! success "The Verilog Mindset"
    The key to mastering Verilog is thinking in hardware. Every line of code you write corresponds to real gates, wires, and flip-flops. When you write `assign y = a & b;`, you're not telling a computer to compute something—you're saying "there exists an AND gate here, forever."

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
An inspiring graphic novel could tell the story of Phil Moorby, the inventor of Verilog at Gateway Design Automation in 1984. Set against the backdrop of the burgeoning chip design industry, the narrative could follow Moorby's insight that designers needed a language to describe hardware, not just draw it. The dramatic tension could build around the challenge of simulating million-gate chips when computers were still relatively primitive, leading to clever optimizations that made Verilog practical. The story could include the acquisition by Cadence, the push to become an IEEE standard, and the eventual rivalry with VHDL—showing how industry politics shaped the tools that would build the modern digital world.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: Module Identification"
    Identify what's wrong with this module definition:
    ```verilog
    module broken(
        input a,
        output b
    )
        assign b = ~a;
    endmodule
    ```

    **Solution:**
    The semicolon is missing after the port list. It should be:
    ```verilog
    module broken(
        input a,
        output b
    );
        assign b = ~a;
    endmodule
    ```

??? question "Problem 2: Wire vs Reg"
    Which data type should be used for `y` in each case?

    Case 1: `assign y = a & b;`
    Case 2: `always @(posedge clk) y <= a;`
    Case 3: `always @(*) y = a | b;`

    **Solution:**
    - Case 1: **wire** (continuous assignment requires wire)
    - Case 2: **reg** (procedural assignment in always block)
    - Case 3: **reg** (procedural assignment in always block)

    Note: In Case 3, even though it's combinational logic, the procedural assignment still requires reg.

??? question "Problem 3: Port Directions"
    A module has a clock input, a reset input, an 8-bit data input, an 8-bit data output, and a bidirectional 8-bit memory bus. Write the port declarations.

    **Solution:**
    ```verilog
    module memory_interface(
        input              clk,
        input              reset,
        input      [7:0]   data_in,
        output reg [7:0]   data_out,
        inout      [7:0]   mem_bus
    );
    ```

??? question "Problem 4: Parameter Usage"
    Modify this fixed-width adder to be parameterized:
    ```verilog
    module adder(
        input  [7:0] a, b,
        output [8:0] sum
    );
        assign sum = a + b;
    endmodule
    ```

    **Solution:**
    ```verilog
    module adder #(
        parameter WIDTH = 8
    )(
        input  [WIDTH-1:0] a, b,
        output [WIDTH:0]   sum
    );
        assign sum = a + b;
    endmodule
    ```

??? question "Problem 5: Continuous vs Procedural"
    Which of these statements will work? Which will cause errors?

    A) `assign y = a & b;` where y is a wire
    B) `assign y = a & b;` where y is a reg
    C) `always @(*) y = a & b;` where y is a wire
    D) `always @(*) y = a & b;` where y is a reg

    **Solution:**
    - A) **Works**: assign with wire is correct
    - B) **Error**: assign cannot drive a reg
    - C) **Error**: procedural assignment cannot target a wire
    - D) **Works**: always block with reg is correct

??? question "Problem 6: Module Instantiation"
    Given this AND gate module:
    ```verilog
    module and2(input a, input b, output y);
        assign y = a & b;
    endmodule
    ```

    Write code to instantiate two AND gates and combine their outputs with an OR to create `result = (x & y) | (p & q)`.

    **Solution:**
    ```verilog
    wire and1_out, and2_out;

    and2 gate1(.a(x), .b(y), .y(and1_out));
    and2 gate2(.a(p), .b(q), .y(and2_out));

    assign result = and1_out | and2_out;
    ```

??? question "Problem 7: Number Formats"
    Express the decimal number 42 in all four Verilog number formats (binary, octal, decimal, hexadecimal) using 8 bits.

    **Solution:**
    - Binary: `8'b00101010`
    - Octal: `8'o52`
    - Decimal: `8'd42`
    - Hexadecimal: `8'h2A`
