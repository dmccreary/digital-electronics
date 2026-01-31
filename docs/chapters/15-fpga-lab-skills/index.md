---
title: FPGA Implementation and Laboratory Skills
description: Bridging theory and practice with FPGA architecture, implementation flow, and hands-on laboratory techniques
generated_by: claude skill chapter-content-generator
date: 2026-01-31 17:00:00
version: 0.03
---

# FPGA Implementation and Laboratory Skills

## Summary

This chapter bridges theory and practice by covering FPGA implementation and hands-on laboratory skills. Students will learn FPGA architecture including look-up tables (LUTs), flip-flops, and routing resources, the FPGA implementation flow, and pin assignment. Laboratory skills include breadboard prototyping, using logic probes and logic analyzers, working with LED indicators and switch inputs, and implementing switch debouncing. The chapter covers design verification approaches including functional and timing verification, design hierarchy and reuse principles, documentation practices, and the complete digital system design workflow.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. FPGA Architecture
2. FPGA LUT
3. FPGA Flip-Flop
4. FPGA Routing
5. FPGA Implementation
6. Pin Assignment
7. Breadboard Prototyping
8. Logic Probe
9. Logic Analyzer
10. LED Indicator
11. Switch Input
12. Debouncing
13. Design Verification
14. Functional Verification
15. Timing Verification
16. Hardware-Software Boundary
17. Abstraction Levels
18. Design Hierarchy
19. Design Reuse
20. Design Documentation
21. Digital System Design

## Prerequisites

This chapter builds on concepts from:

- [Chapter 8: Flip-Flops and Timing](../08-flip-flops-timing/index.md)
- [Chapter 10: FSM Design and Applications](../10-fsm-design-applications/index.md)
- [Chapter 13: Verilog Behavioral and Structural Modeling](../13-verilog-modeling/index.md)
- [Chapter 14: Testbenches and Simulation](../14-testbenches-simulation/index.md)

---

## Introduction: From Simulation to Reality

Here's a confession that every digital designer has made at least once: "It worked in simulation!" These four words, usually spoken with a mixture of frustration and bewilderment, mark the moment when theory meets the unforgiving reality of actual hardware.

Welcome to the chapter where your designs stop living in the comfortable world of perfect simulations and start existing in the messy, wonderful, occasionally smoke-producing world of real electronics. This is where the rubber meets the road—or more accurately, where the Verilog meets the silicon.

Until now, you've been designing circuits that exist only as text files and waveforms. That's like learning to cook by reading recipes and imagining the taste. Now it's time to turn on the stove. FPGAs (Field-Programmable Gate Arrays) are your kitchen, and this chapter teaches you how to use the equipment without burning anything down. (Though if you do smell something burning, unplug it immediately. We'll wait.)

The skills you'll learn here are the bridge between "I understand digital logic" and "I can build working digital systems." By the end of this chapter, you'll understand how FPGAs work internally, how to get your designs running on real hardware, and how to debug the inevitable problems that arise when electrons start flowing through actual circuits.

Ready to make something real? Let's dive in!

## Understanding FPGA Architecture

An **FPGA (Field-Programmable Gate Array)** is an integrated circuit designed to be configured by the customer after manufacturing—hence "field-programmable." Unlike an ASIC (Application-Specific Integrated Circuit), which is manufactured with fixed functionality, an FPGA can be reprogrammed to implement virtually any digital circuit.

Think of an FPGA as a giant canvas of configurable logic. Imagine millions of tiny logic elements that can be connected however you want, like a massive electronic LEGO set. The "programming" of an FPGA isn't really programming in the software sense—it's configuring the connections between these logic elements to create the circuit you designed in Verilog.

The basic architecture of an FPGA consists of three main components:

- **Configurable Logic Blocks (CLBs)**: The computational elements that implement your logic
- **Routing Resources**: The programmable interconnects that connect CLBs together
- **I/O Blocks**: The interface between internal logic and external pins

Modern FPGAs also include specialized blocks for common functions:

| Block Type | Purpose | Example Uses |
|------------|---------|--------------|
| Block RAM (BRAM) | On-chip memory | FIFOs, caches, lookup tables |
| DSP Slices | Arithmetic operations | Multiply-accumulate, filters |
| Clock Management | Clock generation/distribution | PLLs, clock dividers |
| High-Speed I/O | Fast external communication | PCIe, DDR memory interfaces |

!!! note "Why FPGAs Matter"
    FPGAs occupy a unique position between software and custom hardware. They offer the performance of hardware with the flexibility of software (sort of). They're used everywhere from prototyping ASICs to production systems in data centers, telecommunications, and aerospace.

#### Diagram: FPGA Architecture Overview

<iframe src="../../sims/fpga-architecture/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>FPGA Architecture Overview</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain the major components of FPGA architecture including CLBs, routing resources, I/O blocks, and specialized blocks, understanding how they work together to implement digital circuits.

Instructional Rationale: Interactive block diagram showing FPGA architecture with hover-to-explore functionality helps students understand the spatial organization and relationships between components.

Canvas Layout:

- Center: Grid of CLBs representing the logic fabric
- Edges: I/O blocks around the perimeter
- Interconnections: Routing channels between CLBs
- Corner areas: Special blocks (BRAM, DSP, clock management)
- Legend: Component identification

Interactive Elements:

- Hover over any block to see description and purpose
- Click on CLB to zoom into internal structure
- Highlight routing paths when hovering over connections
- Toggle to show different FPGA families
- Show/hide specialized blocks

Data Visibility:

- Block types and their functions
- Relative quantities of each resource
- Connection patterns
- Resource utilization concept

Visual Style:

- Clean grid layout
- Color coding by block type (blue=CLB, green=I/O, orange=BRAM, purple=DSP)
- Routing shown as grid channels
- Professional schematic appearance
- Responsive to window resize

Implementation: p5.js with interactive hover/click regions
</details>

## The Look-Up Table (LUT): The Heart of FPGA Logic

The **FPGA LUT (Look-Up Table)** is the fundamental building block for implementing combinational logic in an FPGA. A LUT is essentially a small memory that can be programmed to implement any Boolean function of its inputs.

Here's the clever insight: any Boolean function of N inputs can be represented as a truth table with \(2^N\) entries. A LUT stores this truth table directly. When you apply inputs, the LUT simply looks up the output value—no gates needed!

Consider a 4-input LUT (the most common size):

- It has 4 inputs (A, B, C, D) and 1 output
- It can store \(2^4 = 16\) bits of configuration data
- Those 16 bits define the output for every possible input combination
- It can implement ANY 4-input Boolean function

For example, to implement \(F = AB + CD\), the LUT would be programmed with:

| A | B | C | D | F (stored in LUT) |
|---|---|---|---|-------------------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

The beauty of LUTs is their universality—the same physical structure implements an AND gate, an XOR gate, a multiplexer, or any other function you can imagine. The FPGA tools figure out how to program each LUT to create your circuit.

Modern FPGAs typically use 6-input LUTs (LUT6), which can implement any 6-input function. Some architectures allow a LUT6 to be split into two independent LUT5s for better resource utilization.

#### Diagram: LUT Function Implementation

<iframe src="../../sims/lut-function/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>LUT Function Implementation</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate how a LUT implements any Boolean function by programming truth table values and observing input-output behavior.

Instructional Rationale: Interactive LUT simulator where students can program the truth table and toggle inputs shows the direct relationship between stored values and function behavior.

Canvas Layout:

- Left: 4-input LUT schematic with input toggles
- Center: 16-entry truth table (editable)
- Right: Output display with current function description
- Bottom: Preset function buttons (AND, OR, XOR, MUX, custom)

Interactive Elements:

- Toggle buttons for each input (A, B, C, D)
- Clickable truth table cells to set 0/1
- Preset function buttons to load common functions
- Boolean expression display showing current function
- Animation showing lookup process
- Clear and random fill buttons

Data Visibility:

- Current input values
- Current output value
- Complete truth table
- Derived Boolean expression
- LUT utilization note

Visual Style:

- Clean schematic representation
- Color-coded inputs (different colors)
- Highlight active truth table row
- Output prominently displayed
- Professional look matching vendor tools

Implementation: p5.js with truth table editor and evaluation
</details>

## FPGA Flip-Flops: The Storage Elements

**FPGA Flip-Flops** are the storage elements that implement sequential logic. Each CLB contains not just LUTs but also flip-flops, allowing it to implement both combinational and sequential circuits.

A typical FPGA CLB contains several flip-flops, often one per LUT. These flip-flops are usually D-type with configurable features:

- **Clock input**: Connected to the FPGA's clock distribution network
- **Clock enable (CE)**: Allows selective updating
- **Set/Reset**: Can be synchronous or asynchronous
- **Initial value**: Can be configured to 0 or 1 at power-up

The relationship between LUTs and flip-flops in a CLB:

```
          ┌─────────────┐
Inputs ──▶│    LUT4     │──┬──▶ Combinational Output
          └─────────────┘  │
                           ▼
                      ┌────────┐
              Clock ──┤   D    │──▶ Registered Output
                 CE ──┤  FF    │
              Reset ──┤        │
                      └────────┘
```

This architecture is powerful because it lets each CLB produce either:

1. **Combinational output**: The LUT output bypasses the flip-flop
2. **Registered output**: The LUT output is captured by the flip-flop

The choice is made during FPGA configuration. Your Verilog code determines which is used:

```verilog
// Combinational - uses LUT only
assign y = a & b;

// Sequential - uses LUT + FF
always @(posedge clk)
    q <= a & b;
```

!!! tip "Resource Efficiency"
    Good FPGA designs balance LUT and flip-flop usage. If you use all your LUTs but few flip-flops (or vice versa), you're leaving resources underutilized. The synthesis tools try to optimize this, but design choices matter.

## FPGA Routing: Connecting the Pieces

**FPGA Routing** refers to the programmable interconnect resources that connect CLBs, I/O blocks, and specialized blocks together. Routing is often the limiting factor in FPGA design—not logic resources.

The routing architecture typically includes:

- **Local interconnects**: Short connections within and between adjacent CLBs
- **General routing**: Longer connections spanning multiple CLBs
- **Global routing**: Very long connections for signals like clocks and resets
- **Switch boxes**: Programmable connection points where routes can turn or cross

Here's why routing matters so much:

| Factor | Impact |
|--------|--------|
| Signal delay | Longer routes = more delay |
| Timing closure | Congested areas may fail timing |
| Resource usage | Routes consume real silicon area |
| Power | Signals switching through routes consume power |

The FPGA implementation tools spend significant effort on routing. The process involves:

1. **Placement**: Deciding where each CLB's logic goes
2. **Routing**: Finding paths to connect everything
3. **Timing analysis**: Checking if delays meet requirements
4. **Iteration**: Moving things around to fix problems

!!! warning "The 80% Utilization Trap"
    A common mistake is designing until the FPGA is nearly full. FPGAs become very difficult to route above about 80% utilization because the remaining routing resources are scattered and fragmented. Leave headroom!

#### Diagram: FPGA Routing Visualization

<iframe src="../../sims/fpga-routing/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>FPGA Routing Visualization</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Describe

Learning Objective: Students will be able to describe how routing resources connect logic blocks in an FPGA and explain why routing congestion affects timing.

Instructional Rationale: Animated visualization of signal routing through switch boxes and wire segments demonstrates the physical path signals take and how congestion develops.

Canvas Layout:

- Main area: Grid of CLBs with routing channels
- Routing channels shown between CLBs
- Switch boxes at intersections
- Highlighted signal paths
- Congestion heat map overlay option

Interactive Elements:

- Click two CLBs to route a signal between them
- Show/hide congestion overlay
- Toggle between different routing scenarios
- Animation of signal propagation
- Slider for utilization level
- Clear routes button

Data Visibility:

- Number of routing segments used
- Estimated signal delay
- Congestion level indicator
- Path length in CLB hops
- Alternative routes count

Visual Style:

- Grid layout matching FPGA architecture
- Color-coded congestion (green=low, red=high)
- Animated signal flow
- Switch box detail on hover
- Professional FPGA tool aesthetic

Implementation: p5.js with pathfinding and animation
</details>

## The FPGA Implementation Flow

**FPGA Implementation** is the complete process of transforming your Verilog code into a working FPGA configuration. Understanding this flow helps you write better code and debug problems more effectively.

The implementation flow consists of these major steps:

1. **Synthesis**: Converts Verilog to a generic netlist of gates and flip-flops
2. **Technology Mapping**: Maps the generic netlist to FPGA primitives (LUTs, FFs)
3. **Placement**: Assigns each logic element to a specific CLB location
4. **Routing**: Creates the physical connections between placed elements
5. **Bitstream Generation**: Creates the file that configures the FPGA

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   Verilog     │────▶│   Synthesis   │────▶│   Netlist     │
│   Source      │     │               │     │   (generic)   │
└───────────────┘     └───────────────┘     └───────────────┘
                                                   │
                                                   ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  Bitstream    │◀────│    Route      │◀────│    Place      │
│   (.bit)      │     │               │     │               │
└───────────────┘     └───────────────┘     └───────────────┘
         │
         ▼
   ┌───────────┐
   │   FPGA    │
   │  Hardware │
   └───────────┘
```

Each step produces reports that help you understand your design:

| Step | Key Reports | What to Look For |
|------|-------------|------------------|
| Synthesis | Resource utilization | LUTs, FFs, BRAM used |
| Synthesis | Inference messages | What structures were inferred |
| Place | Placement report | Critical paths, utilization by region |
| Route | Timing report | Setup/hold slack, failing paths |
| Route | Power estimate | Static and dynamic power |

!!! tip "Read the Reports!"
    The implementation reports contain gold. A 5-minute review of the synthesis report can reveal problems that would take hours to debug otherwise. Always check for unexpected latches, high fan-out signals, and inference warnings.

#### Diagram: FPGA Implementation Flow

<iframe src="../../sims/fpga-impl-flow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>FPGA Implementation Flow</summary>
Type: workflow

Bloom Level: Understand (L2)
Bloom Verb: Summarize

Learning Objective: Students will be able to summarize the major stages of FPGA implementation and identify the inputs and outputs of each stage.

Instructional Rationale: Interactive flowchart with clickable stages reveals details about each step, helping students understand the transformation from Verilog to hardware.

Canvas Layout:

- Horizontal workflow with major stages
- Input/output files shown at each stage
- Arrows showing data flow
- Detail panel for selected stage
- Progress indicator

Interactive Elements:

- Click each stage to see details
- Hover to see brief description
- Show example reports for each stage
- Animation showing data transformation
- Link to common problems at each stage

Data Visibility:

- Stage name and purpose
- Input and output file types
- Key transformations performed
- Common issues at each stage
- Estimated time proportion

Visual Style:

- Clean flowchart layout
- Color-coded stages (synthesis=blue, place=green, route=orange)
- Document icons for reports
- Professional appearance
- Responsive design

Implementation: p5.js with interactive workflow visualization
</details>

## Pin Assignment: Connecting to the Real World

**Pin Assignment** is the process of mapping your design's I/O signals to specific physical pins on the FPGA package. This is where your digital design meets the physical world—and where many first-time mistakes happen.

Pin assignment involves specifying:

- **Which pin**: The physical location (e.g., "A3", "C5", "PIN_AA14")
- **I/O standard**: The voltage levels and signaling (e.g., LVCMOS33, LVDS)
- **Drive strength**: How much current the pin can source/sink
- **Slew rate**: How fast the signal transitions
- **Pull-up/down**: Internal resistors for unconnected states

Here's a typical pin assignment in a constraints file (XDC format for Xilinx):

```tcl
# Clock input
set_property PACKAGE_PIN W5 [get_ports clk]
set_property IOSTANDARD LVCMOS33 [get_ports clk]

# LED outputs
set_property PACKAGE_PIN U16 [get_ports {led[0]}]
set_property PACKAGE_PIN E19 [get_ports {led[1]}]
set_property PACKAGE_PIN U19 [get_ports {led[2]}]
set_property PACKAGE_PIN V19 [get_ports {led[3]}]
set_property IOSTANDARD LVCMOS33 [get_ports {led[*]}]

# Push button inputs
set_property PACKAGE_PIN T18 [get_ports btn_center]
set_property IOSTANDARD LVCMOS33 [get_ports btn_center]
```

Critical pin assignment considerations:

| Consideration | Why It Matters |
|---------------|----------------|
| Bank compatibility | I/O pins are organized into banks with shared voltage |
| Voltage matching | Must match the voltage of external circuits |
| Current limits | Each bank has total current limits |
| Special pins | Some pins have dedicated functions (clocks, config) |
| PCB routing | Physical location affects board layout |

!!! warning "The Magic Smoke Rule"
    Never connect a 3.3V FPGA pin directly to a 5V signal. The FPGA will not appreciate it, and you may discover that electronics contain "magic smoke" that escapes when things go wrong. Always check voltage compatibility!

Common development board pin functions:

- **Clocks**: Crystal oscillator input (typically 100 MHz)
- **LEDs**: Visual indicators for debugging
- **Switches/Buttons**: User input for testing
- **Seven-segment displays**: Numeric output
- **GPIO headers**: Connection to external circuits
- **USB/UART**: Communication with computer

## Breadboard Prototyping: Building Circuits by Hand

**Breadboard Prototyping** is the art of building temporary circuits for testing and experimentation. Before committing to PCB fabrication, engineers prototype on breadboards to verify their designs work correctly.

A solderless breadboard consists of:

- **Terminal strips**: Rows of connected holes for component insertion
- **Power rails**: Long strips for power distribution (usually marked + and -)
- **Center gap**: Divides the board, separating IC pin rows

The internal connections follow this pattern:

```
Power Rails    Terminal Strips    Power Rails
  + -        a b c d e  f g h i j    + -
  │ │        ═════════  ═════════    │ │
  │ │        ═════════  ═════════    │ │
  │ │        ═════════  ═════════    │ │
  │ │           gap                  │ │
```

Key prototyping tips:

1. **Plan before building**: Sketch your circuit layout first
2. **Use color-coded wires**: Red for power, black for ground, other colors for signals
3. **Keep wires short**: Long wires add noise and look messy
4. **Test incrementally**: Verify each section before adding more
5. **Document connections**: Take photos or notes as you build

#### Diagram: Breadboard Layout Guide

<iframe src="../../sims/breadboard-guide/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Breadboard Layout Guide</summary>
Type: infographic

Bloom Level: Remember (L1)
Bloom Verb: Identify

Learning Objective: Students will be able to identify the internal connection patterns of a solderless breadboard and correctly place components for proper connectivity.

Instructional Rationale: Interactive breadboard visualization where students can explore connections by clicking helps build intuition for physical circuit construction.

Canvas Layout:

- Main area: Realistic breadboard representation
- Connection highlighting on hover
- Component insertion demonstration
- Power rail identification
- Wiring examples

Interactive Elements:

- Click any hole to highlight connected holes
- Drag components (resistors, LEDs, ICs) onto board
- Toggle power rail connections
- Show/hide internal wiring
- Example circuits to load (LED circuit, IC placement)

Data Visibility:

- Which holes are connected
- Power rail status
- Component pin connections
- Correct vs incorrect placement examples

Visual Style:

- Realistic breadboard appearance
- Clear hole pattern
- Color-coded power rails (red/blue)
- Component outlines when dragging
- Responsive design

Implementation: p5.js with grid-based interaction
</details>

Common prototyping components and their uses:

| Component | Purpose | Tips |
|-----------|---------|------|
| LEDs | Visual indicators | Always use current-limiting resistor (220Ω-1kΩ) |
| Push buttons | User input | Connect between signal and ground, use pull-up |
| Resistors | Current limiting, pull-ups | Read color codes or measure with multimeter |
| Capacitors | Decoupling, filtering | Place near IC power pins (0.1µF typical) |
| 74-series ICs | Logic functions | Check pinout diagram, note pin 1 orientation |

## Logic Probes and Logic Analyzers

When debugging digital circuits, you need tools to observe signal behavior. **Logic Probes** and **Logic Analyzers** are essential instruments for this purpose.

A **Logic Probe** is a simple, pen-shaped tool that indicates the logic level of a single signal:

- **High indicator**: LED lights when signal is logic 1
- **Low indicator**: Different LED for logic 0
- **Pulse detector**: Indicates transitions (catches brief pulses)
- **Threshold**: Usually set for TTL or CMOS levels

Logic probes are perfect for quick checks: "Is this signal stuck high?" "Is the clock running?"

A **Logic Analyzer** is much more powerful, capturing multiple digital signals over time:

- **Multiple channels**: 8, 16, 32, or more simultaneous signals
- **Triggering**: Capture based on specific signal conditions
- **Protocol decoding**: Interpret I²C, SPI, UART, and other protocols
- **Deep memory**: Store long capture sequences
- **Timing analysis**: Measure pulse widths, frequencies, delays

Comparison of debugging tools:

| Feature | Logic Probe | Logic Analyzer | Oscilloscope |
|---------|-------------|----------------|--------------|
| Channels | 1 | 8-32+ | 2-4 |
| Signal type | Digital only | Digital only | Analog + digital |
| Cost | $10-50 | $100-10,000+ | $300-50,000+ |
| Best for | Quick checks | Protocol debug | Signal integrity |
| Portability | Handheld | Bench/USB | Bench |

!!! tip "The Budget Option"
    Affordable USB logic analyzers (like those compatible with Sigrok) cost $10-50 and are excellent for learning. They connect to your computer and use free software for display and protocol decoding.

#### Diagram: Logic Analyzer Interface

<iframe src="../../sims/logic-analyzer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Logic Analyzer Interface</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use logic analyzer features including multi-channel capture, triggering, and timing measurements to debug digital signals.

Instructional Rationale: Simulated logic analyzer interface teaches the mental model of capture-based debugging without requiring physical equipment.

Canvas Layout:

- Top: Toolbar with controls (Run, Stop, Trigger settings)
- Main area: Waveform display with multiple channels
- Left: Channel labels with color coding
- Bottom: Time scale and cursor controls
- Side panel: Measurements display

Interactive Elements:

- Run/Stop capture button
- Set trigger conditions (rising edge, pattern)
- Zoom in/out on time scale
- Place cursors for measurements
- Add/remove channels
- Adjust sample rate
- Protocol decode toggle

Data Visibility:

- Multiple signal waveforms
- Trigger point marker
- Cursor positions and delta time
- Frequency measurements
- Decoded protocol data

Visual Style:

- Dark theme matching real analyzers
- Color-coded channels
- Grid lines for timing reference
- Professional measurement tool appearance
- Responsive to window resize

Implementation: p5.js with simulated signal generation and capture
</details>

## LED Indicators and Switch Inputs

**LED Indicators** and **Switch Inputs** are the most basic human interface elements in digital systems. Despite their simplicity, using them correctly requires understanding some important electrical principles.

**LED Indicators** require current limiting:

An LED is a current device—you must limit the current flowing through it to prevent damage. The typical forward voltage is 1.8-3.3V depending on color, and safe operating current is 5-20mA.

The current-limiting resistor value is calculated as:

\[R = \frac{V_{supply} - V_{LED}}{I_{LED}}\]

For a typical case with 3.3V supply, 2V LED drop, and 10mA current:

\[R = \frac{3.3V - 2V}{10mA} = 130\Omega\]

A 220Ω resistor is commonly used as a safe choice for most situations.

LEDs can be connected in two configurations:

| Configuration | Active | Current Path | Verilog |
|---------------|--------|--------------|---------|
| Active high | LED on when output = 1 | FPGA → LED → resistor → GND | `led = 1'b1;` |
| Active low | LED on when output = 0 | VCC → LED → resistor → FPGA | `led = 1'b0;` |

**Switch Inputs** require pull-up or pull-down resistors:

A mechanical switch creates an open or closed circuit, but the FPGA input needs a defined logic level at all times. Pull resistors ensure this:

```
         VCC                           FPGA Pin
          │                              │
          ├──[Pull-up 10kΩ]──┬──────────┤
          │                  │          │
         ─┴─                 │         ─┴─
        /   \  (switch)     ─┴─       Input
       ─     ─              GND       Buffer
          │
         GND
```

When the switch is open: input sees VCC through resistor (logic 1)
When the switch is closed: input sees GND directly (logic 0)

!!! tip "FPGA Internal Pull-ups"
    Most FPGAs have configurable internal pull-up resistors. You can enable them in your constraints file, eliminating the need for external resistors on push buttons.

## Debouncing: Taming Mechanical Switches

**Debouncing** is the technique of cleaning up the noisy signals produced by mechanical switches. When a switch closes or opens, the mechanical contacts bounce, producing multiple rapid transitions instead of a clean edge.

A typical switch bounce looks like this in time:

```
Switch pressed:
                   bounce period
                   ◀───────▶
Ideal:    ────────┐         ┌────────────
                  └─────────┘

Actual:   ────────┐┌┐┌┐┌┐   ┌────────────
                  └┘└┘└┘└───┘
```

This bounce period typically lasts 1-10 milliseconds. Without debouncing, a single button press might register as 5-50 presses!

There are two main approaches to debouncing:

**Hardware debouncing** uses an RC filter and Schmitt trigger:

```
Switch ──┬──[R]──┬──▷o── Debounced output
         │       │      (Schmitt trigger)
        ─┴─     ─┬─
        GND      C
                 │
                GND
```

**Software/digital debouncing** samples the input and waits for stability:

```verilog
module debounce #(
    parameter DELAY = 1000000  // Clock cycles to wait (20ms at 50MHz)
)(
    input  wire clk,
    input  wire btn_in,
    output reg  btn_out
);

    reg [19:0] counter;
    reg        btn_sync1, btn_sync2;  // Synchronizer

    // Synchronize input to clock domain
    always @(posedge clk) begin
        btn_sync1 <= btn_in;
        btn_sync2 <= btn_sync1;
    end

    // Debounce logic
    always @(posedge clk) begin
        if (btn_sync2 != btn_out) begin
            counter <= counter + 1;
            if (counter >= DELAY) begin
                btn_out <= btn_sync2;
                counter <= 0;
            end
        end else begin
            counter <= 0;
        end
    end

endmodule
```

#### Diagram: Switch Debouncing Visualization

<iframe src="../../sims/debouncing/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Switch Debouncing Visualization</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will be able to compare raw bouncing switch signals with debounced outputs, understanding why debouncing is necessary and how different debounce delays affect response.

Instructional Rationale: Side-by-side display of raw and debounced signals with adjustable parameters demonstrates the problem and solution interactively.

Canvas Layout:

- Top: Virtual switch button
- Middle: Dual waveform display (raw vs debounced)
- Bottom: Parameter controls
- Side: Counter showing detected presses

Interactive Elements:

- Clickable switch button (simulates mechanical press)
- Slider for bounce duration
- Slider for debounce delay
- Counter for raw transitions
- Counter for debounced transitions
- Reset button
- Show/hide ideal signal overlay

Data Visibility:

- Raw switch signal with bounce
- Debounced signal
- Number of false triggers (raw)
- Clean trigger count (debounced)
- Current debounce delay value
- Time annotations

Visual Style:

- Waveform display similar to logic analyzer
- Clear distinction between raw (red) and clean (green)
- Bounce region highlighted
- Debounce period shaded
- Responsive layout

Implementation: p5.js with bounce simulation and digital filter
</details>

Choosing debounce parameters:

| Application | Suggested Delay | Reasoning |
|-------------|-----------------|-----------|
| User button | 10-20 ms | Fast enough to feel responsive |
| Toggle switch | 20-50 ms | Longer travel = more bounce |
| Limit switch | 5-10 ms | May need faster response |
| Rotary encoder | 1-5 ms | High-speed rotation needs quick response |

## Design Verification: Ensuring Correctness

**Design Verification** is the process of ensuring your design works correctly before (and after) implementation. Verification catches bugs that would be expensive to fix in hardware.

Verification happens at multiple levels:

1. **Pre-synthesis simulation**: Functional testing with testbenches
2. **Post-synthesis simulation**: Verify synthesis didn't change behavior
3. **Post-implementation timing simulation**: Include real delays
4. **Hardware testing**: In-system verification

The verification strategy should be planned:

| Phase | What to Verify | Tools |
|-------|----------------|-------|
| Module level | Individual block functionality | Unit testbenches |
| Integration | Blocks work together | System testbenches |
| Timing | Meets timing constraints | Static timing analysis |
| Physical | Works in actual FPGA | LEDs, logic analyzer, UART |

**Functional Verification** confirms logical correctness:

- Does the design produce correct outputs for all inputs?
- Do state machines traverse states correctly?
- Are edge cases handled properly?
- Do reset sequences work?

**Timing Verification** confirms timing correctness:

- Are setup times met at all flip-flops?
- Are hold times met after all clock edges?
- Do clock domains interact safely?
- Does the design meet frequency targets?

```
Setup Time Check:
              ◀──Setup Time──▶
              │               │
Data:  ───────╱ new value ╲───│─────────────
              │               │
Clock: ───────┐               │ Rising Edge
              │               │

The data must be stable BEFORE the clock edge by at least tSU
```

!!! warning "Timing Failures Are Subtle"
    A design that fails timing might work... sometimes. It might work on one FPGA but not another. It might work at room temperature but fail when hot. Timing failures are the gremlins of digital design—take timing reports seriously!

## The Hardware-Software Boundary

The **Hardware-Software Boundary** is the interface between digital hardware (running on FPGA) and software (running on a processor). Understanding this boundary is essential for system design.

In a typical embedded system:

```
┌────────────────────────────────────────────────────┐
│                     Software                        │
│  ┌──────────────────────────────────────────────┐  │
│  │  Application Code (C/C++)                     │  │
│  │  - User interface                             │  │
│  │  - High-level algorithms                      │  │
│  │  - Data processing                            │  │
│  └──────────────────────────────────────────────┘  │
│                        │                           │
│                  Memory-Mapped I/O                 │
│                        │                           │
├────────────────────────┼───────────────────────────┤
│                     Hardware                        │
│  ┌──────────────────────────────────────────────┐  │
│  │  FPGA Logic (Verilog)                         │  │
│  │  - Register interfaces                        │  │
│  │  - High-speed processing                      │  │
│  │  - Real-time control                          │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

Key decisions at the hardware-software boundary:

| Factor | Favor Hardware | Favor Software |
|--------|----------------|----------------|
| Speed | Real-time, deterministic | Millisecond tolerance OK |
| Parallelism | Many things at once | Sequential is fine |
| Flexibility | Fixed algorithm | Frequent changes |
| Complexity | Simple operations | Complex decisions |
| I/O | High-speed, many pins | Standard interfaces |
| Development | Expertise available | Faster iteration |

Example: An audio processor might implement:

- **In hardware**: High-speed ADC/DAC interface, FFT computation, filtering
- **In software**: User interface, preset management, network communication

The interface between hardware and software typically uses:

- **Memory-mapped registers**: Software reads/writes specific addresses
- **Interrupts**: Hardware signals events to software
- **DMA**: Hardware moves data directly to memory
- **FIFOs**: Buffered data transfer between domains

## Abstraction Levels in Digital Design

**Abstraction Levels** help manage complexity by hiding details. Digital design uses multiple abstraction levels, from transistors to systems.

The typical abstraction hierarchy:

```
                    ┌───────────────────┐
    Highest         │ System Level      │  ← "What should it do?"
    Abstraction     │ (Architecture)    │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │ Algorithmic Level │  ← "How does it compute?"
                    │ (Behavioral)      │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │ RTL Level         │  ← "What registers? What logic?"
                    │ (Register Transfer)│
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │ Gate Level        │  ← "Which gates?"
                    │ (Logic)           │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
    Lowest          │ Physical Level    │  ← "Which transistors? Where?"
    Abstraction     │ (Layout)          │
                    └───────────────────┘
```

Each level has its purpose:

| Level | Focus | Verilog Style | Who Works Here |
|-------|-------|---------------|----------------|
| System | Specifications, interfaces | N/A (documents) | Architects |
| Behavioral | Algorithms | High-level `always` blocks | Algorithm designers |
| RTL | Registers, state machines | Synthesizable Verilog | RTL designers |
| Gate | Specific gates | Netlist, gate primitives | Synthesis tools |
| Physical | Transistors, wires | N/A (layout tools) | Physical designers |

As digital designers, you primarily work at the RTL level, with the synthesis tools handling gate-level and below.

!!! tip "Think RTL, Not Code"
    Always visualize the hardware your Verilog implies. If you can't draw the circuit, you probably don't understand what you're describing. This RTL thinking is the key skill that separates novice and expert digital designers.

## Design Hierarchy: Divide and Conquer

**Design Hierarchy** organizes complex systems into manageable modules. A well-structured hierarchy makes designs easier to understand, test, and maintain.

Principles of good hierarchy:

1. **Single responsibility**: Each module does one thing well
2. **Appropriate granularity**: Not too big, not too small
3. **Clean interfaces**: Clear, minimal port lists
4. **Reusability**: Design for reuse where possible
5. **Testability**: Each module can be verified independently

Example hierarchy for a simple processor:

```
                        ┌─────────────┐
                        │   Top       │
                        │   (SoC)     │
                        └──────┬──────┘
               ┌───────────────┼───────────────┐
               │               │               │
        ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
        │    CPU      │ │   Memory    │ │   I/O       │
        │   Core      │ │ Controller  │ │  Bridge     │
        └──────┬──────┘ └─────────────┘ └─────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼───┐ ┌───▼───┐ ┌────▼────┐
│ Fetch │ │Decode │ │ Execute │
└───────┘ └───────┘ └────┬────┘
                         │
                   ┌─────┼─────┐
                   │     │     │
               ┌───▼─┐ ┌─▼─┐ ┌─▼──┐
               │ ALU │ │Reg│ │LSU │
               └─────┘ └───┘ └────┘
```

Good module sizing guidelines:

| Module Size | Comment |
|-------------|---------|
| < 50 lines | Probably too small (exception: simple primitives) |
| 50-200 lines | Sweet spot for most modules |
| 200-500 lines | Getting large, consider splitting |
| > 500 lines | Almost certainly should be split |

## Design Reuse: Don't Reinvent the Wheel

**Design Reuse** is the practice of using existing, verified modules in new designs. Good reuse saves time, reduces bugs, and leverages proven implementations.

Types of reusable components:

- **Soft IP**: Verilog/VHDL source code (most flexible)
- **Firm IP**: Synthesized but not placed/routed
- **Hard IP**: Complete layout (least flexible, best performance)

Sources of reusable designs:

| Source | Examples | Considerations |
|--------|----------|----------------|
| Vendor IP | DDR controllers, PCIe, transceivers | Licensed, optimized for target |
| Open source | OpenCores, PULP, LiteX | Free, quality varies |
| Commercial IP | Arm cores, encryption blocks | Licensed, well-supported |
| Your own library | Previous projects | Know it well, can modify |

Building a reusable module checklist:

- **Parameterized**: Use parameters for configurable values
- **Well-documented**: Clear port descriptions and behavior
- **Self-contained**: Minimal external dependencies
- **Thoroughly tested**: Comprehensive testbench included
- **Version controlled**: Track changes and history

Example of a reusable UART transmitter with good practices:

```verilog
// File: uart_tx.v
// Description: UART transmitter with configurable baud rate
// Author: Your Name
// Version: 1.0
// Parameters:
//   CLK_FREQ - System clock frequency in Hz (default 50000000)
//   BAUD     - Baud rate (default 115200)

module uart_tx #(
    parameter CLK_FREQ = 50_000_000,
    parameter BAUD     = 115200
)(
    input  wire       clk,
    input  wire       rst,
    input  wire       start,
    input  wire [7:0] data,
    output reg        tx,
    output wire       busy
);
    // Implementation...
endmodule
```

## Design Documentation: Writing for Humans

**Design Documentation** captures the intent, structure, and usage of your designs. Good documentation is essential for maintenance, team collaboration, and your future self.

Essential documentation elements:

1. **Design specification**: What the design does (requirements)
2. **Architecture document**: How it's organized (block diagrams)
3. **Interface specification**: Port descriptions, timing, protocols
4. **Verification plan**: How it will be tested
5. **User guide**: How to use/integrate the design

Documentation in code:

```verilog
//=============================================================================
// Module: counter_mod_n
// Description: Modulo-N counter with enable and synchronous reset
//
// Parameters:
//   N     - Count modulus (default 10)
//   WIDTH - Counter width, should be ceil(log2(N))
//
// Ports:
//   clk    - System clock (rising edge active)
//   rst    - Synchronous reset (active high)
//   en     - Count enable (active high)
//   count  - Current count value (0 to N-1)
//   wrap   - Pulses high when count wraps from N-1 to 0
//
// Timing:
//   All outputs registered, valid one cycle after input change
//
// Example instantiation:
//   counter_mod_n #(.N(60)) second_counter (
//       .clk(clk), .rst(rst), .en(tick_1hz),
//       .count(seconds), .wrap(minute_tick)
//   );
//=============================================================================
```

What to document where:

| Location | What to Document |
|----------|------------------|
| File header | Module purpose, author, version, license |
| Port list | Each port's function and timing |
| Parameters | Valid ranges, defaults, dependencies |
| Complex logic | Why, not what (what is in the code) |
| Workarounds | Why the weird code is necessary |
| TODO/FIXME | Known issues and planned changes |

!!! tip "Document the Why, Not the What"
    Comments like `// increment counter` are useless—the code already says that. Document *why* you're incrementing: `// Count clock cycles for 1ms timeout`. The "why" survives code changes; the "what" becomes stale.

## The Complete Digital System Design Flow

**Digital System Design** follows a structured flow from concept to working hardware. Understanding this flow helps you work effectively and avoid common pitfalls.

The complete design flow:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. SPECIFICATION                                            │
│    • Define requirements                                    │
│    • Create block diagram                                   │
│    • Identify interfaces                                    │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. ARCHITECTURE                                             │
│    • Partition into modules                                 │
│    • Define interfaces between modules                      │
│    • Create verification plan                               │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. RTL DESIGN                                               │
│    • Write Verilog for each module                          │
│    • Create testbenches                                     │
│    • Simulate and debug                                     │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. SYNTHESIS & IMPLEMENTATION                               │
│    • Synthesize design                                      │
│    • Review reports, fix issues                             │
│    • Place and route                                        │
│    • Verify timing                                          │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. HARDWARE VERIFICATION                                    │
│    • Program FPGA                                           │
│    • Test functionality                                     │
│    • Debug with logic analyzer                              │
│    • Verify in system context                               │
└────────────────────────┬────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. DOCUMENTATION & RELEASE                                  │
│    • Complete documentation                                 │
│    • Archive design files                                   │
│    • Create release notes                                   │
└─────────────────────────────────────────────────────────────┘
```

#### Diagram: Digital Design Flow

<iframe src="../../sims/design-flow/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Digital Design Flow</summary>
Type: workflow

Bloom Level: Understand (L2)
Bloom Verb: Summarize

Learning Objective: Students will be able to summarize the complete digital design flow from specification through hardware verification, identifying key activities and deliverables at each stage.

Instructional Rationale: Interactive flow diagram with expandable stages helps students understand the iterative nature of design and the connections between stages.

Canvas Layout:

- Vertical flow with major stages
- Expandable detail for each stage
- Feedback loops shown
- Deliverables at each stage
- Time estimate indicators

Interactive Elements:

- Click stages to expand details
- Show deliverables for each stage
- Highlight feedback loops
- Show common iteration paths
- Progress tracking for lab projects
- Checklist view option

Data Visibility:

- Stage descriptions
- Key activities at each stage
- Expected deliverables
- Common problems and solutions
- Iteration patterns

Visual Style:

- Clean flowchart layout
- Color-coded stages
- Clear flow direction
- Professional appearance
- Responsive design

Implementation: p5.js with expandable workflow visualization
</details>

Common iteration patterns:

| Discovery | Iterate Between |
|-----------|-----------------|
| Simulation finds bug | RTL Design ↔ Simulation |
| Timing failure | Synthesis ↔ RTL (or constraints) |
| Hardware doesn't match simulation | Simulation ↔ Hardware test |
| Requirements misunderstood | Specification ↔ Any stage |

## Summary and Key Takeaways

Congratulations! You've learned the essential skills for bridging the gap between digital design theory and working hardware. Let's recap the key points:

**FPGA Architecture:**

- FPGAs use LUTs to implement any Boolean function
- Flip-flops in CLBs provide storage elements
- Routing resources connect everything together
- Specialized blocks (BRAM, DSP) handle common tasks efficiently

**Implementation Flow:**

- Synthesis converts Verilog to gates
- Place and route creates the physical layout
- Timing analysis verifies the design meets constraints
- Bitstream programs the actual FPGA

**Laboratory Skills:**

- Pin assignment maps signals to physical pins
- Breadboards enable quick prototyping
- Logic analyzers capture and display digital signals
- LEDs and switches provide basic I/O
- Debouncing is essential for mechanical inputs

**Verification:**

- Functional verification confirms logical correctness
- Timing verification ensures signals meet timing requirements
- Hardware testing catches issues simulation missed

**Design Practices:**

- Hierarchy manages complexity
- Reuse leverages existing work
- Documentation enables maintenance and collaboration
- A structured design flow improves quality

!!! success "The Practitioner's Mindset"
    You've now crossed the threshold from student to practitioner. You understand not just how digital circuits work, but how to build them in real hardware. This is the difference between knowing about bridges and knowing how to build one. Your circuits can now blink LEDs, respond to buttons, and interact with the physical world.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
A compelling graphic novel could tell the story of Ross Freeman, the inventor of the FPGA at Xilinx in 1984. Set against the backdrop of Silicon Valley in the early 1980s, the narrative follows Freeman's insight that a programmable array of logic blocks could revolutionize digital design. The tension builds as established semiconductor companies dismiss the idea—why would anyone want programmable logic when they could just make a custom chip? The story could show the early struggles to achieve sufficient logic density, the breakthrough moment when the first Xilinx XC2064 worked, and the gradual realization that FPGAs would become essential to modern electronics. The irony: the very flexibility that critics doubted would now power everything from data centers to spacecraft.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: LUT Implementation"
    A 4-input LUT needs to implement the function F = AB + CD. How many bits of configuration data are stored in the LUT, and what are the values for the first four entries (ABCD = 0000, 0001, 0010, 0011)?

    **Solution:**
    A 4-input LUT stores \(2^4 = 16\) bits of configuration data.

    For F = AB + CD:
    - ABCD = 0000: F = 0·0 + 0·0 = 0
    - ABCD = 0001: F = 0·0 + 0·1 = 0
    - ABCD = 0010: F = 0·0 + 1·0 = 0
    - ABCD = 0011: F = 0·0 + 1·1 = 1

??? question "Problem 2: Current Limiting Resistor"
    Calculate the current-limiting resistor needed for a red LED (forward voltage 2.0V) connected to a 3.3V FPGA output, with a target current of 8mA.

    **Solution:**
    Using the formula R = (Vsupply - VLED) / I:

    \[R = \frac{3.3V - 2.0V}{8mA} = \frac{1.3V}{0.008A} = 162.5\Omega\]

    Use the next standard value up: 180Ω or 220Ω.

??? question "Problem 3: Debounce Delay"
    If your FPGA runs at 100 MHz and you want a 20ms debounce delay, how many clock cycles should the debounce counter wait?

    **Solution:**
    Clock period = 1/100MHz = 10ns

    Cycles needed = 20ms / 10ns = 20 × 10⁻³ / 10 × 10⁻⁹ = 2,000,000 cycles

    So the counter should count to 2,000,000 (or use a 21-bit counter since 2²¹ = 2,097,152).

??? question "Problem 4: FPGA Resource Usage"
    A design uses 5,000 LUTs and 3,000 flip-flops on an FPGA with 20,000 LUTs and 40,000 flip-flops. What is the utilization percentage for each resource? Is routing likely to be a problem?

    **Solution:**
    LUT utilization: 5,000/20,000 = 25%
    FF utilization: 3,000/40,000 = 7.5%

    Both utilization levels are well under 80%, so routing should not be a problem. However, the design is unbalanced—it uses relatively few flip-flops compared to LUTs, which might indicate a very combinational design.

??? question "Problem 5: Pin Assignment"
    You're connecting an FPGA (3.3V I/O) to a sensor that outputs 5V signals. What problem will occur, and how can you solve it?

    **Solution:**
    Problem: The 5V signal exceeds the FPGA's maximum input voltage (typically 3.3V + 0.3V = 3.6V absolute max). This can damage the FPGA.

    Solutions:
    1. Use a voltage level shifter IC
    2. Use a resistor divider to reduce 5V to 3.3V (but slows signal)
    3. Use a 5V-tolerant FPGA I/O bank if available
    4. Add a series resistor and rely on input protection diodes (not recommended for high-speed signals)

??? question "Problem 6: Hardware-Software Partition"
    A system needs to process video at 60 frames per second (1920×1080 resolution) and overlay text graphics. Which parts should be implemented in FPGA hardware vs. software, and why?

    **Solution:**
    **FPGA Hardware:**
    - Video input interface (HDMI/MIPI receiver) - high-speed, real-time
    - Pixel processing pipeline - 60fps × 1920 × 1080 = 124M pixels/sec
    - Frame buffer controller - continuous memory access
    - Video output interface - deterministic timing required

    **Software:**
    - Text rendering engine - complex algorithms, infrequent updates
    - User interface logic - needs flexibility
    - Content management - high-level decisions
    - Network communication - protocol stacks are complex

    The division follows the principle: hardware for high-speed, deterministic, parallel operations; software for complex, changing, sequential logic.

??? question "Problem 7: Design Hierarchy"
    A traffic light controller design has the following modules: top_level, light_controller, timer_module, button_debounce, seven_segment_display, and pedestrian_crossing. Sketch a reasonable hierarchy and explain why you organized it that way.

    **Solution:**
    ```
    top_level
    ├── light_controller
    │   ├── timer_module (for light timing)
    │   └── pedestrian_crossing
    │       └── button_debounce (for pedestrian button)
    └── seven_segment_display (shows countdown)
    ```

    Reasoning:
    - light_controller is the main FSM, so it's at a high level
    - timer_module is used by light_controller for timing sequences
    - pedestrian_crossing is a sub-FSM that interacts with lights
    - button_debounce serves pedestrian_crossing specifically
    - seven_segment_display is independent I/O, parallel to controller
    - top_level connects everything and handles I/O pads
