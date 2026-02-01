---
title: Testbenches and Simulation
description: Verification and simulation techniques for validating Verilog digital designs before hardware implementation
generated_by: claude skill chapter-content-generator
date: 2026-01-31 16:30:00
version: 0.03
---

# Testbenches and Simulation

## Summary

This chapter covers the verification side of digital design, teaching students to validate their Verilog designs through simulation before hardware implementation. Students will learn to create testbenches, generate stimulus including clock signals and test vectors, build self-checking testbenches for automated verification, run simulations, and interpret results using waveform viewers for debugging. The chapter also covers the synthesis process, distinguishing between synthesizable and non-synthesizable code constructs, preparing students for FPGA implementation.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Testbench
2. Stimulus Generation
3. Clock Generation
4. Test Vector
5. Self-Checking Testbench
6. Simulation
7. Simulation Time
8. Waveform Viewer
9. Debugging Waveforms
10. Synthesis
11. Synthesizable Code
12. Non-Synthesizable Code

## Prerequisites

This chapter builds on concepts from:

- [Chapter 12: Verilog HDL Fundamentals](../12-verilog-hdl-fundamentals/index.md)
- [Chapter 13: Verilog Behavioral and Structural Modeling](../13-verilog-modeling/index.md)

---

## Introduction: Trust, But Verify

Here's a sobering thought: even the world's best digital designers make mistakes. The difference between professionals and amateurs isn't that professionals never introduce bugs—it's that they *find* those bugs before the silicon is cast in stone (or rather, cast in billions of tiny transistors).

In software, a bug means a patch, an update, a "please restart your application." In hardware, a bug discovered after manufacturing can mean millions of dollars in recalls, months of delays, or a very expensive doorstop. That's why verification—proving that your design actually does what you intended—consumes *more than half* of the engineering effort in professional chip design.

Welcome to the world of testbenches and simulation, where paranoia is a virtue!

Think of simulation as a dress rehearsal for your hardware. The design hasn't been built yet—it exists only as Verilog code—but the simulator pretends to execute it, cycle by cycle, checking whether it behaves correctly. If something goes wrong, you fix it in code rather than explaining to management why the chip needs a "metal spin."

This chapter teaches you to become your own worst critic. You'll learn to:

- Create testbenches that exercise every corner of your design
- Generate realistic stimulus patterns automatically
- Build self-checking systems that catch bugs without human intervention
- Read and debug waveform displays like a pro
- Understand what can be synthesized into hardware and what can't

By the end, you'll have the skills to say with confidence: "Yes, I tested that. Thoroughly."

Let's make sure your designs work *before* they become hardware.

## What Is a Testbench?

A **Testbench** is a Verilog module that provides stimulus to your design-under-test (DUT) and observes its outputs. Unlike synthesizable design modules, testbenches exist purely for verification—they're the scaffolding that lets you exercise and examine your circuit before it becomes real hardware.

Think of a testbench like a test fixture for electronics. If you've ever used a breadboard to test an IC by connecting it to switches, buttons, and LEDs, you've essentially built a physical testbench. A Verilog testbench is the same concept, but in simulation—you provide inputs, watch outputs, and decide if the behavior is correct.

Here's a minimal testbench structure:

```verilog
module my_design_tb;  // No ports! Testbenches are self-contained

    // Declare signals to connect to DUT
    reg  clk;
    reg  reset;
    reg  [7:0] data_in;
    wire [7:0] data_out;

    // Instantiate the Device Under Test
    my_design dut(
        .clk(clk),
        .reset(reset),
        .data_in(data_in),
        .data_out(data_out)
    );

    // Generate clock
    initial begin
        clk = 0;
        forever #5 clk = ~clk;  // 100 MHz clock
    end

    // Apply stimulus
    initial begin
        // Initialize inputs
        reset = 1;
        data_in = 8'h00;

        // Release reset after some time
        #20 reset = 0;

        // Apply test patterns
        #10 data_in = 8'hAB;
        #10 data_in = 8'hCD;
        #10 data_in = 8'hEF;

        // End simulation
        #100 $finish;
    end

endmodule
```

Key characteristics of testbenches:

- **No port list**: Testbenches are top-level modules with no external connections
- **reg for inputs**: Signals driving the DUT are declared as `reg` (because we assign them procedurally)
- **wire for outputs**: Signals coming from the DUT are `wire` (because the DUT drives them)
- **Not synthesizable**: Testbenches use constructs that only work in simulation

!!! note "The DUT Convention"
    By convention, we name the instantiated design `dut` (Device Under Test) or `uut` (Unit Under Test). This makes it clear which module is being tested versus which is doing the testing.

#### Diagram: Testbench Architecture

<iframe src="../../sims/testbench-architecture/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Testbench Architecture Visualization</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain the relationship between a testbench and the device under test, understanding how stimulus flows into the DUT and responses flow out to verification logic.

Instructional Rationale: Interactive block diagram showing testbench components (stimulus generator, DUT, response checker) with data flow arrows makes the testbench structure tangible.

Canvas Layout:

- Center: DUT block with ports
- Left: Stimulus generator block
- Right: Response checker block
- Bottom: Shared clock generator
- Arrows showing signal flow

Interactive Elements:

- Hover over components to see descriptions
- Click to highlight signal paths
- Show/hide internal details
- Animation mode showing stimulus flow
- Toggle between simple and self-checking testbench views

Data Visibility:

- Component roles and responsibilities
- Signal connections between blocks
- Input/output relationships
- Verification flow

Visual Style:

- Block diagram with clear boundaries
- Directional arrows for signal flow
- Color coding (blue=stimulus, green=DUT, red=checker)
- Clean, professional appearance
- Responsive to window resize

Implementation: p5.js with interactive block diagram
</details>

The typical testbench flow is:

1. **Initialize**: Set all inputs to known values
2. **Reset**: Assert reset to put DUT in known state
3. **Stimulate**: Apply input patterns over time
4. **Observe**: Watch outputs (manually or automatically)
5. **Complete**: End simulation when testing is done

## Stimulus Generation: Feeding the Beast

**Stimulus Generation** is the art of creating input patterns that thoroughly exercise your design. Good stimulus covers normal operation, edge cases, error conditions, and corner cases—basically, anything that might reveal a bug.

There are several approaches to generating stimulus:

**Direct assignment** (simplest):
```verilog
initial begin
    data = 8'h00;
    #10 data = 8'h55;
    #10 data = 8'hAA;
    #10 data = 8'hFF;
end
```

**Loops** (for repetitive patterns):
```verilog
initial begin
    for (i = 0; i < 256; i = i + 1) begin
        data = i;
        #10;  // Wait between values
    end
end
```

**Random values** (for broader coverage):
```verilog
initial begin
    repeat (100) begin
        data = $random;  // Random 32-bit value
        #10;
    end
end
```

**File-based** (for complex or recorded patterns):
```verilog
initial begin
    $readmemh("test_vectors.hex", test_data);
    for (i = 0; i < TEST_COUNT; i = i + 1) begin
        data = test_data[i];
        #10;
    end
end
```

Good stimulus generation follows these principles:

| Principle | Description | Example |
|-----------|-------------|---------|
| Start known | Begin from a defined state | Assert reset first |
| Cover boundaries | Test at value limits | 0, 1, max-1, max |
| Exercise transitions | Test state changes | All FSM transitions |
| Include invalid | Test error handling | Out-of-range inputs |
| Be reproducible | Same tests, same results | Use seed for random |

!!! tip "The 80/20 Rule of Testing"
    80% of bugs are found by testing boundary conditions and transitions. Don't just test "happy path" scenarios—test what happens when inputs are 0, maximum value, or change rapidly.

Here's a more comprehensive stimulus example for an 8-bit counter:

```verilog
initial begin
    // Initialize
    reset = 1;
    enable = 0;
    load = 0;
    load_value = 8'h00;

    // Test 1: Reset behavior
    #20 reset = 0;

    // Test 2: Enable counting
    #10 enable = 1;
    #100;  // Let it count for a while

    // Test 3: Disable should hold value
    enable = 0;
    #50;  // Verify count doesn't change

    // Test 4: Load functionality
    load = 1;
    load_value = 8'hFE;  // Near max
    #10 load = 0;

    // Test 5: Rollover at max
    enable = 1;
    #50;  // Should roll over from FF to 00

    // Test 6: Reset during operation
    #10 reset = 1;
    #10 reset = 0;

    #50 $finish;
end
```

#### Diagram: Stimulus Pattern Generator

<iframe src="../../sims/stimulus-generator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Stimulus Pattern Generator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate how different stimulus generation techniques produce different input patterns by comparing direct assignment, loops, and random generation.

Instructional Rationale: Interactive comparison of stimulus methods with visible pattern output shows the trade-offs between simplicity, coverage, and reproducibility.

Canvas Layout:

- Left: Stimulus method selector (tabs)
- Center: Generated pattern visualization
- Right: Pattern statistics (coverage, unique values)
- Bottom: Verilog code for selected method

Interactive Elements:

- Tab selection for method type
- Play/pause pattern generation
- Speed control for animation
- Reset to regenerate patterns
- Coverage histogram display
- Export pattern capability

Data Visibility:

- Generated values over time
- Coverage percentage
- Repetition detection
- Pattern characteristics
- Corresponding Verilog code

Visual Style:

- Value display as scrolling list
- Histogram of value distribution
- Color gradient for value magnitude
- Code panel with syntax highlighting
- Responsive layout

Implementation: p5.js with multiple generation engines
</details>

## Clock Generation: The Heartbeat

**Clock Generation** creates the clock signal that synchronizes all sequential logic in your design. Since clocks don't exist in the real world until you create them, your testbench must generate them.

The classic clock generation pattern:

```verilog
initial begin
    clk = 0;
    forever #5 clk = ~clk;  // Toggle every 5 time units
end
```

This creates a clock with a period of 10 time units (5 high + 5 low).

For more control over clock characteristics:

```verilog
parameter CLK_PERIOD = 10;  // 10ns period = 100 MHz

initial begin
    clk = 0;
    forever #(CLK_PERIOD/2) clk = ~clk;
end
```

You can also create clocks with non-50% duty cycles:

```verilog
// 60% duty cycle clock
initial begin
    clk = 0;
    forever begin
        #6 clk = 1;  // High for 6 time units
        #4 clk = 0;  // Low for 4 time units
    end
end
```

Multiple clocks at different frequencies:

```verilog
// Fast clock: 100 MHz
initial begin
    clk_fast = 0;
    forever #5 clk_fast = ~clk_fast;
end

// Slow clock: 10 MHz
initial begin
    clk_slow = 0;
    forever #50 clk_slow = ~clk_slow;
end
```

!!! warning "Clock and Data Alignment"
    Be careful about the timing relationship between your clock and data changes. Changing data exactly at the clock edge can cause race conditions in simulation. Best practice: change data slightly after the clock edge or use non-blocking assignments.

A robust pattern that avoids race conditions:

```verilog
initial begin
    clk = 0;
    forever #5 clk = ~clk;
end

// Change data after clock edge, not exactly at it
initial begin
    reset = 1;
    @(posedge clk);  // Wait for clock edge
    #1;              // Small delay after edge
    reset = 0;       // Now change data

    @(posedge clk);
    #1;
    data = 8'hAB;
end
```

#### Diagram: Clock Waveform Generator

<iframe src="../../sims/clock-generator/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Clock Waveform Generator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use different clock generation parameters to create clocks with specific frequencies, duty cycles, and phases.

Instructional Rationale: Interactive clock generator with adjustable parameters and real-time waveform display makes clock timing relationships concrete.

Canvas Layout:

- Top: Waveform display showing generated clock
- Middle: Parameter controls (period, duty cycle, phase)
- Bottom: Generated Verilog code

Interactive Elements:

- Sliders for period, duty cycle, phase
- Frequency calculator (period ↔ frequency)
- Multiple clock mode (add second clock)
- Show timing measurements
- Copy Verilog code button

Data Visibility:

- Clock waveform with timing markers
- Calculated frequency
- Duty cycle percentage
- Phase relationship (if two clocks)
- Generated Verilog code

Visual Style:

- Clean waveform display
- Measurement annotations
- Real-time update on parameter change
- Professional timing diagram appearance
- Responsive canvas

Implementation: p5.js with parametric clock generation
</details>

## Test Vectors: Organized Test Data

A **Test Vector** is a specific set of input values along with the expected output values for those inputs. Test vectors organize your test cases into a structured format that can be applied systematically and verified automatically.

Simple test vectors in Verilog:

```verilog
// Test vectors for a 2-bit adder: {a, b, expected_sum}
reg [5:0] test_vectors [0:8];

initial begin
    test_vectors[0] = {2'b00, 2'b00, 2'b00};  // 0 + 0 = 0
    test_vectors[1] = {2'b00, 2'b01, 2'b01};  // 0 + 1 = 1
    test_vectors[2] = {2'b01, 2'b00, 2'b01};  // 1 + 0 = 1
    test_vectors[3] = {2'b01, 2'b01, 2'b10};  // 1 + 1 = 2
    test_vectors[4] = {2'b10, 2'b01, 2'b11};  // 2 + 1 = 3
    test_vectors[5] = {2'b11, 2'b00, 2'b11};  // 3 + 0 = 3
    test_vectors[6] = {2'b11, 2'b01, 2'b00};  // 3 + 1 = 4 (overflow!)
    test_vectors[7] = {2'b11, 2'b11, 2'b10};  // 3 + 3 = 6 (overflow!)
end
```

Loading test vectors from a file is cleaner for large test suites:

```verilog
// test_vectors.hex contains:
// 00_00_00
// 00_01_01
// 01_01_02
// ...

reg [5:0] test_vectors [0:255];
initial $readmemh("test_vectors.hex", test_vectors);
```

Applying test vectors systematically:

```verilog
integer i;
reg [1:0] a_test, b_test, expected_sum;

initial begin
    for (i = 0; i < 8; i = i + 1) begin
        // Extract test vector components
        a_test = test_vectors[i][5:4];
        b_test = test_vectors[i][3:2];
        expected_sum = test_vectors[i][1:0];

        // Apply inputs
        a = a_test;
        b = b_test;

        // Wait for combinational logic to settle
        #5;

        // Check result
        if (sum !== expected_sum) begin
            $display("ERROR: a=%d, b=%d, expected=%d, got=%d",
                     a_test, b_test, expected_sum, sum);
        end
    end

    $display("Test complete!");
    $finish;
end
```

Benefits of test vectors:

- **Organized**: All test cases in one place
- **Reusable**: Can share vectors between testbenches
- **Maintainable**: Easy to add new test cases
- **Portable**: Can be generated by external tools
- **Documented**: The vector file itself documents expected behavior

!!! tip "Golden Reference Model"
    A common practice is to generate test vectors using a software reference model (in Python, C, etc.) that computes the expected outputs. This "golden model" can produce thousands of test cases automatically, which you then verify against your Verilog implementation.

## Self-Checking Testbenches: Automation Is Your Friend

A **Self-Checking Testbench** automatically verifies that the DUT produces correct outputs, reporting errors without human intervention. This is the difference between "I looked at the waveforms and they seemed right" and "I verified 10,000 test cases and they all passed."

The key insight: instead of manually examining waveforms, embed the expected behavior in the testbench itself.

Basic self-checking pattern:

```verilog
// Check after each test
initial begin
    // Apply test
    a = 8'h05;
    b = 8'h03;
    #10;

    // Automatic check
    if (sum !== 8'h08) begin
        $display("FAIL: 5 + 3 should be 8, got %d", sum);
        error_count = error_count + 1;
    end else begin
        $display("PASS: 5 + 3 = 8");
    end
end
```

More sophisticated self-checking with a reference model:

```verilog
// Reference model function
function [7:0] expected_alu_result;
    input [7:0] a, b;
    input [2:0] op;
    begin
        case (op)
            3'b000: expected_alu_result = a + b;
            3'b001: expected_alu_result = a - b;
            3'b010: expected_alu_result = a & b;
            3'b011: expected_alu_result = a | b;
            3'b100: expected_alu_result = a ^ b;
            default: expected_alu_result = 8'h00;
        endcase
    end
endfunction

// Self-checking test loop
integer i, errors;
initial begin
    errors = 0;

    for (i = 0; i < 1000; i = i + 1) begin
        // Random test inputs
        a_in = $random;
        b_in = $random;
        op_in = $random % 5;
        #10;

        // Compare against reference
        if (result !== expected_alu_result(a_in, b_in, op_in)) begin
            $display("ERROR at time %0t: a=%h, b=%h, op=%d",
                     $time, a_in, b_in, op_in);
            $display("  Expected: %h, Got: %h",
                     expected_alu_result(a_in, b_in, op_in), result);
            errors = errors + 1;
        end
    end

    // Final report
    if (errors == 0)
        $display("SUCCESS: All 1000 tests passed!");
    else
        $display("FAILED: %d errors detected", errors);

    $finish;
end
```

#### Diagram: Self-Checking Testbench Flow

<iframe src="../../sims/self-checking-tb/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Self-Checking Testbench Flow</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will be able to compare DUT outputs against expected values automatically, understanding how self-checking testbenches detect and report errors.

Instructional Rationale: Animated testbench execution showing stimulus application, output capture, comparison, and pass/fail reporting demonstrates the complete verification loop.

Canvas Layout:

- Top: Stimulus generator block
- Center: DUT with inputs and outputs
- Right: Reference model computing expected values
- Bottom: Comparator with pass/fail indicators
- Side: Error log display

Interactive Elements:

- Step through test vectors one at a time
- Run all tests automatically
- Inject error into DUT (to see failure detection)
- View error log
- Statistics display (pass/fail counts)
- Reset and rerun

Data Visibility:

- Current test vector
- Applied inputs
- DUT outputs
- Expected outputs
- Comparison result (pass/fail)
- Running totals

Visual Style:

- Flow diagram with animated data movement
- Green checks for pass, red X for fail
- Progress bar for test completion
- Error highlighting
- Professional verification theme

Implementation: p5.js with comparison engine and logging
</details>

Elements of a professional self-checking testbench:

| Element | Purpose | Example |
|---------|---------|---------|
| Error counter | Track total failures | `integer errors = 0;` |
| Test counter | Track coverage | `integer tests = 0;` |
| Timestamps | Locate failures | `$display("Time %0t:", $time);` |
| Verbose mode | Detailed output for debugging | `if (VERBOSE) $display(...);` |
| Summary report | Overall pass/fail | Print at `$finish` |

!!! success "The Professional Standard"
    In industry, designs are often verified with millions of test cycles. No human can check that many waveforms manually. Self-checking testbenches are not optional—they're essential for any serious verification effort.

## Simulation: Running Your Design (Without Hardware)

**Simulation** is the process of executing your Verilog code in a software environment that mimics hardware behavior. The simulator processes your design and testbench, computing signal values at each moment in simulated time.

The simulation process:

1. **Compile**: Parse Verilog files and build internal representation
2. **Elaborate**: Instantiate all modules and resolve hierarchies
3. **Initialize**: Set all signals to their starting values
4. **Execute**: Process events in time order until simulation ends
5. **Report**: Generate output files and waveform data

Common Verilog simulators:

| Simulator | Vendor | Notes |
|-----------|--------|-------|
| ModelSim/Questa | Siemens (Mentor) | Industry standard, powerful |
| VCS | Synopsys | High performance |
| Xcelium | Cadence | Advanced features |
| Icarus Verilog | Open source | Free, good for learning |
| Verilator | Open source | Very fast, converts to C++ |
| Vivado Simulator | AMD (Xilinx) | Built into Vivado |

Running a simulation typically looks like:

```bash
# Icarus Verilog example
iverilog -o sim.out design.v testbench.v
vvp sim.out

# ModelSim example
vlog design.v testbench.v
vsim work.testbench
run -all
```

The simulator executes concurrent processes (always blocks, continuous assignments) by processing *events* at each moment in time. When a signal changes, all processes sensitive to that signal are evaluated, potentially creating new events.

!!! warning "Simulation Is Not Reality"
    Simulation is an *approximation* of hardware behavior. Real hardware has physical delays, noise, temperature effects, and manufacturing variations that simulators ignore. A design that simulates perfectly might still fail in hardware due to timing issues. That's why we also have *timing simulation* with real delay values—but that comes later in the design flow.

Key simulation concepts:

- **Event**: A signal value change at a specific time
- **Delta cycle**: Time advances in infinitesimal steps to handle concurrent updates
- **Blocking**: Some constructs pause until a condition is met
- **Timescale**: Defines the unit of time (e.g., 1ns/1ps)

Setting the timescale:

```verilog
`timescale 1ns/1ps  // Time unit is 1ns, precision is 1ps

module testbench;
    initial begin
        #10.5;  // Wait 10.5 nanoseconds
        $display("Time is %0t", $time);  // Prints "Time is 10500"
    end
endmodule
```

## Simulation Time: Understanding the `#` Delay

**Simulation Time** is the virtual clock that advances during simulation. It's controlled by delay statements (`#`) and wait statements (`@`), and it has no relationship to how long the simulation takes to run on your computer.

The `#` delay operator suspends execution for a specified number of time units:

```verilog
initial begin
    a = 0;     // Time 0
    #10 a = 1; // Time 10
    #5 a = 0;  // Time 15
    #20 a = 1; // Time 35
end
```

Multiple processes advance in parallel:

```verilog
// Process 1
initial begin
    x = 0;
    #10 x = 1;
    #10 x = 0;
end

// Process 2 (runs simultaneously!)
initial begin
    y = 0;
    #15 y = 1;
    #5 y = 0;
end
```

At each time step, the simulator:

1. Executes all statements that are ready at this time
2. Processes any resulting signal changes
3. Advances time to the next scheduled event

#### Diagram: Simulation Time Visualization

<iframe src="../../sims/simulation-time/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Simulation Time Visualization</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain how simulation time advances through delay statements and concurrent process execution.

Instructional Rationale: Animated timeline showing multiple initial blocks advancing in parallel with delay annotations demonstrates the concurrent-yet-ordered nature of simulation.

Canvas Layout:

- Top: Timeline with time markers
- Center: Multiple process tracks (like Gantt chart)
- Bottom: Current simulation time display
- Side: Event queue visualization

Interactive Elements:

- Step forward in time
- Continuous play mode with speed control
- Pause at interesting moments
- Highlight current executing process
- Show event queue contents
- Reset to time 0

Data Visibility:

- Current simulation time
- Each process's current statement
- Delay values between events
- Concurrent execution visualization
- Event queue contents

Visual Style:

- Timeline with tick marks
- Process bars showing execution
- Delay annotations as arrows
- Current time as moving cursor
- Color coding for different processes

Implementation: p5.js with discrete event simulation
</details>

Important timing system tasks:

| Task | Purpose | Example |
|------|---------|---------|
| `$time` | Current simulation time | `$display("Time: %0t", $time);` |
| `$realtime` | Time as real number | `$display("Time: %0f", $realtime);` |
| `$finish` | End simulation | `#1000 $finish;` |
| `$stop` | Pause simulation | `if (error) $stop;` |

The wait statement (`@`) suspends until an event:

```verilog
initial begin
    @(posedge clk);    // Wait for rising edge
    data = 8'hAB;
    @(negedge reset);  // Wait for reset falling edge
    @(done);           // Wait for any change on 'done'
end
```

Combining delay and events:

```verilog
initial begin
    reset = 1;
    #20;                    // Wait 20 time units
    reset = 0;
    @(posedge clk);         // Wait for clock edge
    #1;                     // Small delay after edge
    data = 8'hFF;
    repeat(10) @(posedge clk);  // Wait for 10 clock cycles
    $finish;
end
```

## Waveform Viewer: Seeing Is Believing

A **Waveform Viewer** displays signal values over time as graphical traces, allowing you to visualize how your design behaves during simulation. It's the oscilloscope of the simulation world.

Waveform viewers show:

- **Digital signals**: Square waves transitioning between 0 and 1
- **Multi-bit buses**: Values as hex or decimal numbers
- **Analog-style**: Stepped plots for data values
- **Hierarchical navigation**: Browse into module instances
- **Time cursors**: Measure timing relationships

To generate waveform data, your testbench typically includes:

```verilog
initial begin
    $dumpfile("simulation.vcd");  // Output file name
    $dumpvars(0, testbench);      // Dump all signals in testbench hierarchy
end
```

The `$dumpvars` parameters control what gets captured:

| Syntax | Effect |
|--------|--------|
| `$dumpvars(0, tb)` | All signals in tb and all sub-modules |
| `$dumpvars(1, tb)` | Only signals directly in tb |
| `$dumpvars(0, tb.dut)` | All signals in dut and sub-modules |
| `$dumpvars(0, tb.dut.alu)` | Just the alu sub-module |

Common waveform viewers:

- **GTKWave**: Free, open source, widely used
- **ModelSim/Questa**: Built into simulator
- **Vivado Simulator**: Integrated viewer
- **WaveTrace**: VS Code extension
- **Surfer**: Modern open source viewer

#### Diagram: Waveform Viewer Interface

<iframe src="../../sims/waveform-viewer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Waveform Viewer Interface</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use waveform viewer features including zoom, pan, cursors, and signal selection to analyze simulation results.

Instructional Rationale: Interactive waveform display with standard viewer controls teaches the mental model of waveform analysis that transfers to professional tools.

Canvas Layout:

- Left: Signal list with hierarchy
- Center: Waveform display area
- Bottom: Time axis with zoom control
- Top: Toolbar with navigation buttons
- Side: Measurement display

Interactive Elements:

- Zoom in/out on time axis
- Pan left/right
- Add/remove signals from view
- Place cursors for measurements
- Hover for value at time
- Click to select time point
- Expand bus signals to bits

Data Visibility:

- Signal names and values
- Time cursor positions
- Delta between cursors
- Value at cursor time
- Signal transitions
- Bus values in hex/decimal

Visual Style:

- Classic waveform viewer appearance
- Green/red for 1/0 values
- Yellow for unknown (X)
- Blue for high-impedance (Z)
- Professional, tool-like interface
- Responsive to window resize

Implementation: p5.js with VCD parser and waveform rendering
</details>

Typical waveform analysis tasks:

1. **Verify timing**: Check setup/hold relationships
2. **Trace signals**: Follow data through pipeline stages
3. **Find glitches**: Look for unexpected transitions
4. **Debug logic**: Find where signals take wrong values
5. **Measure latency**: Count cycles from input to output

!!! tip "Waveform Debugging Strategy"
    When debugging, start at the output that's wrong and work backward. Add signals to the waveform display as you trace the data path. Eventually, you'll find the point where correct input produces incorrect output—that's your bug location.

## Debugging Waveforms: Finding the Bug

**Debugging Waveforms** is the systematic process of using waveform displays to locate and understand design errors. It's part detective work, part pattern recognition, and part stubbornness.

The debugging process:

1. **Identify symptom**: What's wrong with the output?
2. **Hypothesize cause**: What could make this happen?
3. **Add signals**: Display relevant internal signals
4. **Trace backward**: Find where correct becomes incorrect
5. **Understand bug**: Why did this happen?
6. **Fix and verify**: Correct the code and re-simulate

Common bug patterns visible in waveforms:

| Pattern | Appears As | Likely Cause |
|---------|------------|--------------|
| Signal stuck at X | Red/unknown trace | Uninitialized register, unconnected wire |
| Signal stuck at 0/1 | Flat line | Missing assignment, wrong sensitivity list |
| Off-by-one timing | Correct value, wrong cycle | Clock domain error, pipeline miscount |
| Glitch | Brief spike | Combinational race, missing register |
| Wrong value | Incorrect but stable | Logic error, wrong operator |

Example: Debugging a counter that counts incorrectly:

```verilog
// Buggy counter - counts by 2 instead of 1!
always @(posedge clk) begin
    if (reset)
        count <= 0;
    else if (enable)
        count <= count + 2;  // BUG: Should be + 1
end
```

In the waveform, you'd see count jumping: 0, 2, 4, 6... instead of 0, 1, 2, 3... The waveform makes this pattern immediately obvious, whereas a wrong single value might be missed.

#### Diagram: Debug Workflow Visualization

<iframe src="../../sims/debug-workflow/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Debug Workflow Visualization</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine waveforms systematically to trace incorrect outputs back to their root cause.

Instructional Rationale: Interactive debugging scenario with guided trace-back process teaches the systematic approach professionals use.

Canvas Layout:

- Top: Waveform display with bug symptom visible
- Center: Signal path diagram showing data flow
- Bottom: Hints and guidance panel
- Side: Signal selector for adding to view

Interactive Elements:

- Identify the incorrect output
- Add internal signals to trace
- Follow the data path backward
- Find the bug source
- View corrected code
- Reset for new scenario

Data Visibility:

- Initial waveform showing bug symptom
- Internal signals as added
- Correct vs incorrect values
- Path from source to output
- Bug location when found

Visual Style:

- Waveform with error highlighting
- Signal path arrows
- "Aha!" moment visualization
- Before/after comparison
- Progressive disclosure

Implementation: p5.js with guided debugging tutorial
</details>

Key debugging techniques:

1. **Binary search**: If the design has many stages, add signals in the middle first to narrow down which half has the bug

2. **Known pattern**: Apply simple, predictable inputs (like counting pattern) so expected outputs are easy to calculate

3. **Reset trace**: Always verify reset works correctly before testing normal operation

4. **Edge focus**: Many bugs occur at transitions—state changes, counter rollovers, edge cases

5. **Compare to spec**: Have the expected waveform in mind (or on paper) before looking at actual

!!! warning "The Two Most Common Verilog Bugs"
    1. **Wrong sensitivity list**: Combinational block doesn't include all inputs, works in synthesis but not simulation
    2. **Blocking vs non-blocking confusion**: Using `=` instead of `<=` in sequential logic causes race conditions

## Synthesis: From Code to Hardware

**Synthesis** is the process of translating your Verilog RTL code into actual hardware—a netlist of gates, flip-flops, and other primitive elements that can be implemented in an FPGA or ASIC.

The synthesis flow:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Verilog RTL    │────▶│    Synthesis    │────▶│    Gate-Level   │
│  (Your Code)    │     │      Tool       │     │     Netlist     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                        ┌─────────────────┐
                        │  Technology     │
                        │    Library      │
                        └─────────────────┘
```

What synthesis does:

1. **Parses** your Verilog code
2. **Infers** hardware structures (registers, muxes, adders)
3. **Optimizes** for area, speed, or power
4. **Maps** to available primitives in the target technology
5. **Outputs** a netlist of connected components

Synthesis tools include:

- **Vivado Synthesis** (AMD/Xilinx FPGAs)
- **Quartus** (Intel FPGAs)
- **Design Compiler** (Synopsys, for ASICs)
- **Genus** (Cadence, for ASICs)
- **Yosys** (Open source)

The synthesis tool reads your behavioral Verilog and figures out what hardware to build:

| You Write | Synthesis Infers |
|-----------|------------------|
| `assign y = a & b;` | AND gate |
| `always @(posedge clk) q <= d;` | D flip-flop |
| `if (sel) y = a; else y = b;` | Multiplexer |
| `y = a + b;` | Adder circuit |
| FSM with state register | State encoding + logic |

!!! note "Synthesis Is Not Simulation"
    Simulation runs your code. Synthesis *transforms* your code into hardware. Code that simulates correctly might not synthesize correctly (or at all) if it uses non-synthesizable constructs.

## Synthesizable Code: What Can Become Hardware

**Synthesizable Code** is Verilog code that synthesis tools can convert into actual hardware. Not all valid Verilog is synthesizable—some constructs exist only for simulation.

Guidelines for synthesizable code:

**Always blocks must have proper sensitivity:**
```verilog
// Synthesizable: complete sensitivity
always @(posedge clk) begin
    q <= d;
end

always @(*) begin
    y = a & b;
end

// NOT synthesizable: incomplete sensitivity (simulation only)
always @(a) begin
    y = a & b;  // What about b?
end
```

**Use correct assignment types:**
```verilog
// Synthesizable: proper blocking for combinational
always @(*) begin
    temp = a + b;
    result = temp * 2;
end

// Synthesizable: proper non-blocking for sequential
always @(posedge clk) begin
    stage1 <= data_in;
    stage2 <= stage1;
end
```

**Avoid latches (unless intentional):**
```verilog
// Creates latch (usually unintended)
always @(*) begin
    if (enable)
        y = data;
    // Missing else - y must hold value
end

// Fixed: no latch
always @(*) begin
    if (enable)
        y = data;
    else
        y = 1'b0;
end
```

Synthesizable constructs:

| Construct | Synthesizable | Notes |
|-----------|---------------|-------|
| `module`, `endmodule` | Yes | Design hierarchy |
| `input`, `output`, `inout` | Yes | Port declarations |
| `wire`, `reg` | Yes | Signal declarations |
| `assign` | Yes | Combinational logic |
| `always @(posedge clk)` | Yes | Sequential logic |
| `always @(*)` | Yes | Combinational logic |
| `if`, `else` | Yes | Multiplexers, priority |
| `case` | Yes | Parallel selection |
| `+`, `-`, `*` | Yes | Arithmetic |
| `&`, `\|`, `^` | Yes | Logic gates |
| `parameter`, `localparam` | Yes | Constants |
| `for` (with fixed bounds) | Yes | Unrolled at synthesis |

!!! tip "Think Hardware First"
    Before writing code, ask: "What hardware do I want?" If you can't visualize the gates and flip-flops, reconsider your approach. Synthesizable code describes hardware structures, not algorithms.

## Non-Synthesizable Code: Simulation Only

**Non-Synthesizable Code** includes Verilog constructs that work in simulation but cannot be translated into hardware. These constructs are essential for testbenches but must be kept out of your design modules.

Common non-synthesizable constructs:

| Construct | Purpose | Example |
|-----------|---------|---------|
| `initial` | Set starting values | `initial clk = 0;` |
| `#` delay | Simulation timing | `#10 a = 1;` |
| `$display`, `$write` | Print messages | `$display("Hello");` |
| `$finish`, `$stop` | Control simulation | `#1000 $finish;` |
| `$random` | Generate random values | `data = $random;` |
| `$time`, `$realtime` | Get simulation time | `$display("T=%0t", $time);` |
| `$dumpfile`, `$dumpvars` | Waveform output | `$dumpfile("test.vcd");` |
| `$readmemh`, `$readmemb` | Load memory from file | `$readmemh("data.hex", mem);` |
| `forever` | Infinite loop | `forever #5 clk = ~clk;` |
| `force`, `release` | Override signals | `force wire_x = 1;` |

These constructs have no hardware equivalent:

```verilog
// Non-synthesizable - only for testbenches!
initial begin
    $display("Starting simulation...");
    clk = 0;
    forever #5 clk = ~clk;
end

initial begin
    data = $random;
    #100;
    if (result !== expected)
        $display("ERROR: mismatch at time %0t", $time);
    $finish;
end
```

#### Diagram: Synthesizable vs Non-Synthesizable

<iframe src="../../sims/synth-vs-nonsynth/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Synthesizable vs Non-Synthesizable Code</summary>
Type: infographic

Bloom Level: Evaluate (L5)
Bloom Verb: Classify

Learning Objective: Students will be able to classify Verilog constructs as synthesizable or non-synthesizable, understanding which belong in design modules versus testbenches.

Instructional Rationale: Interactive classification exercise with immediate feedback trains the critical distinction between design code and verification code.

Canvas Layout:

- Left: Code snippets to classify
- Center: Drag zone for synthesizable
- Right: Drag zone for non-synthesizable
- Bottom: Score and explanation panel

Interactive Elements:

- Drag code snippets to categories
- Immediate feedback on correctness
- Explanation of why each is/isn't synthesizable
- Score tracking
- Hint system
- Reset for practice

Data Visibility:

- Code snippets
- Correct categorization
- Explanation for each
- Running score
- Common mistakes highlighted

Visual Style:

- Clean card-based code snippets
- Color feedback (green=correct, red=wrong)
- Explanation tooltips
- Progress indicator
- Responsive layout

Implementation: p5.js with drag-and-drop interaction
</details>

The key rule: **Design modules must be synthesizable. Testbenches need not be.**

Keep your code organized:

```verilog
// design.v - Only synthesizable code!
module my_design(
    input clk, reset,
    input [7:0] data_in,
    output reg [7:0] data_out
);
    always @(posedge clk) begin
        if (reset)
            data_out <= 8'b0;
        else
            data_out <= data_in + 1;
    end
endmodule

// testbench.v - Non-synthesizable is fine here
module testbench;
    reg clk, reset;
    reg [7:0] data_in;
    wire [7:0] data_out;

    my_design dut(...);

    initial begin  // Non-synthesizable
        $dumpfile("test.vcd");
        $dumpvars(0, testbench);
        clk = 0;
        forever #5 clk = ~clk;
    end

    initial begin
        #100 $finish;  // Non-synthesizable
    end
endmodule
```

!!! warning "Don't Mix Design and Testbench"
    Never put `$display`, `#` delays, or `initial` blocks (except for ROM initialization) in modules you intend to synthesize. Keep simulation-only constructs in separate testbench files.

## Bringing It All Together: A Complete Verification Example

Let's build a complete testbench for a simple FIFO (First-In-First-Out) buffer:

```verilog
//============================================
// FIFO Design (Synthesizable)
//============================================
module fifo #(
    parameter WIDTH = 8,
    parameter DEPTH = 4
)(
    input                  clk,
    input                  reset,
    input                  wr_en,
    input                  rd_en,
    input      [WIDTH-1:0] wr_data,
    output reg [WIDTH-1:0] rd_data,
    output                 full,
    output                 empty
);

    // Memory and pointers
    reg [WIDTH-1:0] mem [0:DEPTH-1];
    reg [$clog2(DEPTH):0] wr_ptr, rd_ptr;  // Extra bit for full/empty detection

    // Full/empty logic
    assign full  = (wr_ptr[$clog2(DEPTH)] != rd_ptr[$clog2(DEPTH)]) &&
                   (wr_ptr[$clog2(DEPTH)-1:0] == rd_ptr[$clog2(DEPTH)-1:0]);
    assign empty = (wr_ptr == rd_ptr);

    // Write logic
    always @(posedge clk) begin
        if (reset)
            wr_ptr <= 0;
        else if (wr_en && !full) begin
            mem[wr_ptr[$clog2(DEPTH)-1:0]] <= wr_data;
            wr_ptr <= wr_ptr + 1;
        end
    end

    // Read logic
    always @(posedge clk) begin
        if (reset)
            rd_ptr <= 0;
        else if (rd_en && !empty) begin
            rd_data <= mem[rd_ptr[$clog2(DEPTH)-1:0]];
            rd_ptr <= rd_ptr + 1;
        end
    end

endmodule

//============================================
// FIFO Testbench (Non-Synthesizable)
//============================================
`timescale 1ns/1ps

module fifo_tb;

    // Parameters
    parameter WIDTH = 8;
    parameter DEPTH = 4;
    parameter CLK_PERIOD = 10;

    // Testbench signals
    reg                  clk;
    reg                  reset;
    reg                  wr_en;
    reg                  rd_en;
    reg      [WIDTH-1:0] wr_data;
    wire     [WIDTH-1:0] rd_data;
    wire                 full;
    wire                 empty;

    // For self-checking
    reg [WIDTH-1:0] expected_data [0:DEPTH-1];
    integer wr_count, rd_count, errors;

    // Instantiate DUT
    fifo #(.WIDTH(WIDTH), .DEPTH(DEPTH)) dut(
        .clk(clk),
        .reset(reset),
        .wr_en(wr_en),
        .rd_en(rd_en),
        .wr_data(wr_data),
        .rd_data(rd_data),
        .full(full),
        .empty(empty)
    );

    // Clock generation
    initial begin
        clk = 0;
        forever #(CLK_PERIOD/2) clk = ~clk;
    end

    // Waveform dump
    initial begin
        $dumpfile("fifo_tb.vcd");
        $dumpvars(0, fifo_tb);
    end

    // Main test sequence
    initial begin
        // Initialize
        reset = 1;
        wr_en = 0;
        rd_en = 0;
        wr_data = 0;
        wr_count = 0;
        rd_count = 0;
        errors = 0;

        // Wait for reset
        repeat(3) @(posedge clk);
        reset = 0;
        @(posedge clk);

        // Test 1: Verify empty after reset
        if (!empty) begin
            $display("ERROR: FIFO not empty after reset!");
            errors = errors + 1;
        end

        // Test 2: Write until full
        $display("\n=== Test 2: Fill FIFO ===");
        while (!full) begin
            @(posedge clk);
            wr_en = 1;
            wr_data = $random;
            expected_data[wr_count % DEPTH] = wr_data;
            $display("  Writing: %h", wr_data);
            wr_count = wr_count + 1;
        end
        @(posedge clk);
        wr_en = 0;

        // Verify full
        if (!full) begin
            $display("ERROR: FIFO not full after %d writes!", wr_count);
            errors = errors + 1;
        end

        // Test 3: Read and verify data
        $display("\n=== Test 3: Read and Verify ===");
        while (!empty) begin
            @(posedge clk);
            rd_en = 1;
        end
        @(posedge clk);
        rd_en = 0;

        // Wait for last read to complete
        @(posedge clk);

        // Test 4: Mixed read/write
        $display("\n=== Test 4: Mixed Operations ===");
        repeat(20) begin
            @(posedge clk);
            wr_en = ($random % 2) && !full;
            rd_en = ($random % 2) && !empty;
            wr_data = $random;

            if (wr_en)
                $display("  Write: %h", wr_data);
            if (rd_en)
                $display("  Read: %h", rd_data);
        end
        @(posedge clk);
        wr_en = 0;
        rd_en = 0;

        // Final report
        repeat(5) @(posedge clk);
        $display("\n========================================");
        if (errors == 0)
            $display("SUCCESS: All tests passed!");
        else
            $display("FAILED: %d errors detected", errors);
        $display("========================================\n");

        $finish;
    end

    // Timeout watchdog
    initial begin
        #10000;
        $display("ERROR: Simulation timeout!");
        $finish;
    end

endmodule
```

This testbench demonstrates:

- Clock generation with parameterized period
- Reset sequence
- Multiple test phases
- Random stimulus
- Self-checking logic
- Waveform generation
- Timeout protection
- Clear pass/fail reporting

## Summary and Key Takeaways

Congratulations! You've learned the essential skills of digital design verification. Let's recap the key points:

**Testbench Fundamentals:**

- Testbenches are non-synthesizable modules that test your design
- They provide stimulus, generate clocks, and observe outputs
- The DUT (Device Under Test) is instantiated inside the testbench

**Stimulus and Vectors:**

- Generate stimulus through direct assignment, loops, random, or files
- Test vectors organize inputs and expected outputs
- Cover edge cases, boundaries, and error conditions

**Clock and Timing:**

- Generate clocks with `initial` and `forever` blocks
- Use `#` delays for timing control
- Be careful about clock-data alignment (add small delays)

**Self-Checking:**

- Compare DUT outputs against expected values automatically
- Use error counters and summary reports
- Reference models help verify complex logic

**Simulation:**

- Simulators execute your design in virtual time
- Use `$dumpfile` and `$dumpvars` for waveforms
- Waveform viewers are essential for debugging

**Synthesizable Code:**

- Only synthesizable constructs go in design modules
- `initial`, `#` delays, and `$` tasks are simulation only
- Keep testbench code separate from design code

!!! success "The Verification Mindset"
    Think of yourself as trying to break your design, not prove it works. Every test that passes without finding a bug is a missed opportunity. The goal isn't to write tests that pass—it's to write tests that would *fail* if the design had a bug.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
An engaging graphic novel could follow the dramatic story of the Pentium FDIV bug of 1994, where a flaw in Intel's Pentium processor's floating-point division unit caused incorrect calculations. The narrative could show the verification engineers who—in hindsight—see where additional test vectors might have caught the bug. The tension builds as the bug is discovered by a mathematics professor, Intel initially dismisses it, and the eventual recall costs $475 million. The moral: "Every test you don't run is a bug you might not find." The story could end with modern verification practices that emerged from this disaster, showing how the industry transformed testing from an afterthought to a primary engineering discipline.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: Testbench Structure"
    What's wrong with this testbench?
    ```verilog
    module my_tb(
        output reg clk,
        output reg reset
    );
        my_design dut(.clk(clk), .reset(reset));

        initial begin
            clk = 0;
            forever #5 clk = ~clk;
        end
    endmodule
    ```

    **Solution:**
    Testbenches should NOT have a port list! They are self-contained top-level modules. The `output reg clk` and `output reg reset` declarations are wrong. Fix:
    ```verilog
    module my_tb;  // No ports!
        reg clk;
        reg reset;
        // ...
    ```

??? question "Problem 2: Clock Generation"
    Write clock generation code for a 50 MHz clock (20ns period).

    **Solution:**
    ```verilog
    parameter CLK_PERIOD = 20;  // 20ns = 50 MHz

    initial begin
        clk = 0;
        forever #(CLK_PERIOD/2) clk = ~clk;
    end
    ```
    Or more explicitly:
    ```verilog
    initial begin
        clk = 0;
        forever #10 clk = ~clk;  // 10ns high, 10ns low = 20ns period
    end
    ```

??? question "Problem 3: Self-Checking Logic"
    Add self-checking to verify this AND gate:
    ```verilog
    module and_gate_tb;
        reg a, b;
        wire y;

        and_gate dut(.a(a), .b(b), .y(y));

        initial begin
            // Test all input combinations
            a = 0; b = 0; #10;
            a = 0; b = 1; #10;
            a = 1; b = 0; #10;
            a = 1; b = 1; #10;
            $finish;
        end
    endmodule
    ```

    **Solution:**
    ```verilog
    module and_gate_tb;
        reg a, b;
        wire y;
        integer errors = 0;

        and_gate dut(.a(a), .b(b), .y(y));

        initial begin
            // Test all input combinations
            a = 0; b = 0; #10;
            if (y !== 0) begin errors = errors + 1; $display("FAIL: 0&0"); end

            a = 0; b = 1; #10;
            if (y !== 0) begin errors = errors + 1; $display("FAIL: 0&1"); end

            a = 1; b = 0; #10;
            if (y !== 0) begin errors = errors + 1; $display("FAIL: 1&0"); end

            a = 1; b = 1; #10;
            if (y !== 1) begin errors = errors + 1; $display("FAIL: 1&1"); end

            if (errors == 0)
                $display("PASS: All tests passed");
            else
                $display("FAIL: %d errors", errors);
            $finish;
        end
    endmodule
    ```

??? question "Problem 4: Synthesizable Check"
    Which of these code fragments are synthesizable?

    A) `initial q = 0;`
    B) `always @(posedge clk) q <= d;`
    C) `#10 a = 1;`
    D) `assign y = a & b;`
    E) `$display("Value: %d", x);`

    **Solution:**
    - A) **Generally No** (some FPGAs support for initialization, but not portable)
    - B) **Yes** (D flip-flop)
    - C) **No** (`#` delays are simulation only)
    - D) **Yes** (AND gate)
    - E) **No** (`$display` is simulation only)

??? question "Problem 5: Debug Scenario"
    Your counter counts 0, 2, 4, 6 instead of 0, 1, 2, 3. What bug would you look for in the waveform?

    **Solution:**
    Look for:
    1. The increment value - it's probably `count + 2` instead of `count + 1`
    2. Double clock edges - maybe posedge AND negedge triggering
    3. Enable signal toggling at unexpected times
    4. Count register being loaded from wrong source

    In the waveform, trace the count value backward to the increment operation to find the wrong constant or the clock issue.

??? question "Problem 6: Test Vector Design"
    Design test vectors for a 2-bit comparator with outputs `eq` (equal), `lt` (less than), `gt` (greater than).

    **Solution:**
    ```verilog
    // Test vectors: {a[1:0], b[1:0], expected_eq, expected_lt, expected_gt}
    reg [6:0] vectors [0:15];

    initial begin
        // All combinations of 2-bit inputs
        vectors[0]  = {2'b00, 2'b00, 1'b1, 1'b0, 1'b0};  // 0 == 0
        vectors[1]  = {2'b00, 2'b01, 1'b0, 1'b1, 1'b0};  // 0 < 1
        vectors[2]  = {2'b00, 2'b10, 1'b0, 1'b1, 1'b0};  // 0 < 2
        vectors[3]  = {2'b00, 2'b11, 1'b0, 1'b1, 1'b0};  // 0 < 3
        vectors[4]  = {2'b01, 2'b00, 1'b0, 1'b0, 1'b1};  // 1 > 0
        vectors[5]  = {2'b01, 2'b01, 1'b1, 1'b0, 1'b0};  // 1 == 1
        vectors[6]  = {2'b01, 2'b10, 1'b0, 1'b1, 1'b0};  // 1 < 2
        vectors[7]  = {2'b01, 2'b11, 1'b0, 1'b1, 1'b0};  // 1 < 3
        vectors[8]  = {2'b10, 2'b00, 1'b0, 1'b0, 1'b1};  // 2 > 0
        vectors[9]  = {2'b10, 2'b01, 1'b0, 1'b0, 1'b1};  // 2 > 1
        vectors[10] = {2'b10, 2'b10, 1'b1, 1'b0, 1'b0};  // 2 == 2
        vectors[11] = {2'b10, 2'b11, 1'b0, 1'b1, 1'b0};  // 2 < 3
        vectors[12] = {2'b11, 2'b00, 1'b0, 1'b0, 1'b1};  // 3 > 0
        vectors[13] = {2'b11, 2'b01, 1'b0, 1'b0, 1'b1};  // 3 > 1
        vectors[14] = {2'b11, 2'b10, 1'b0, 1'b0, 1'b1};  // 3 > 2
        vectors[15] = {2'b11, 2'b11, 1'b1, 1'b0, 1'b0};  // 3 == 3
    end
    ```

??? question "Problem 7: Complete Testbench"
    Write a complete self-checking testbench for a 4-bit binary to BCD converter. The module converts binary 0-9 to BCD, and outputs 9 for inputs > 9.

    **Solution:**
    ```verilog
    `timescale 1ns/1ps

    module bin_to_bcd_tb;
        reg [3:0] bin;
        wire [3:0] bcd;
        integer i, errors;

        // Expected BCD values
        reg [3:0] expected [0:15];

        // DUT
        bin_to_bcd dut(.bin(bin), .bcd(bcd));

        // Initialize expected values
        initial begin
            for (i = 0; i <= 9; i = i + 1)
                expected[i] = i;
            for (i = 10; i <= 15; i = i + 1)
                expected[i] = 9;  // Saturate at 9
        end

        // Test all values
        initial begin
            $dumpfile("bin_to_bcd_tb.vcd");
            $dumpvars(0, bin_to_bcd_tb);

            errors = 0;

            for (i = 0; i <= 15; i = i + 1) begin
                bin = i;
                #10;

                if (bcd !== expected[i]) begin
                    $display("ERROR: bin=%d, expected bcd=%d, got=%d",
                             bin, expected[i], bcd);
                    errors = errors + 1;
                end else begin
                    $display("PASS: bin=%d -> bcd=%d", bin, bcd);
                end
            end

            $display("\n========================================");
            if (errors == 0)
                $display("SUCCESS: All 16 tests passed!");
            else
                $display("FAILED: %d errors", errors);
            $display("========================================");

            $finish;
        end

    endmodule
    ```

[See Annotated References](./references.md)
