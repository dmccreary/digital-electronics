# Digital Electronics Frequently Asked Questions

This FAQ covers common questions about the Digital Electronics course, organized by category to help you find answers quickly.

## Getting Started Questions

### What is this course about?

This is a sophomore-level digital electronics course covering the ABET-aligned electrical engineering curriculum. You'll learn how digital circuits work, from basic logic gates to complete synchronous systems. The course bridges the gap between abstract Boolean algebra and physical hardware implementation, preparing you for upper-division courses in computer architecture, VLSI design, and embedded systems. See the [course description](course-description.md) for complete details.

### Who is this course designed for?

This course is designed for college students majoring in electrical engineering or computer-related fields. It's typically taken in the sophomore year after completing introductory circuits and Calculus 1. If you're curious about how computers actually work at the hardware level, this course will transform your understanding from "the computer runs code" to "the computer is a carefully synchronized state machine built from logic."

### What prerequisites do I need?

Calculus 1 is required for several advanced topics in this course. You should also have basic familiarity with algebra and logical reasoning. Prior programming experience is helpful but not required—in fact, one key learning outcome is understanding how hardware description languages differ fundamentally from software programming.

### How is the course structured?

The course follows a carefully scaffolded progression through 15 chapters. You'll start with number systems and Boolean algebra, progress through logic gates and combinational circuits, then make the conceptual leap to sequential logic with flip-flops and state machines. The final chapters cover Verilog HDL, simulation, and hands-on FPGA implementation. See the [chapter list](chapters/index.md) for the complete outline.

### What software and tools will I need?

You'll need access to a Verilog simulator (such as ModelSim, Icarus Verilog, or similar), a text editor or IDE for writing Verilog code, and ideally an FPGA development board for the laboratory component. The specific tools may vary by institution. For schematic capture and analysis, any digital logic simulator will work.

### How much time should I expect to spend on this course?

Plan for significant time investment beyond lecture hours. Digital electronics requires practice—working through Boolean simplifications, designing state machines, and debugging Verilog code. The laboratory component alone involves substantial hands-on time. Most students find this course more time-intensive than typical sophomore courses due to its practical nature.

### What makes this course different from a programming course?

This is perhaps the most important mindset shift. In programming, you write sequential instructions that execute one after another. In digital electronics, you're describing hardware that operates in parallel—everything happens simultaneously. When you write Verilog, you're not writing a program; you're describing circuits. This fundamental difference catches many students off guard initially.

### How does this course connect to future courses?

Digital Electronics is a pivot course that prepares you for computer architecture (how CPUs are built), embedded systems (interfacing hardware and software), VLSI design (custom chip design), and even operating systems (understanding hardware-software interaction). The concepts of clocked state machines and timing constraints appear throughout advanced EE curriculum.

### What should I do if I'm struggling with the material?

Start by identifying whether you're struggling with concepts (understanding what something is), mathematics (Boolean algebra, timing calculations), or practical skills (Verilog coding, debugging). Each requires different approaches. Form study groups—explaining concepts to others reinforces your own understanding. Use the [glossary](glossary.md) to ensure you understand terminology. Most importantly, practice: work through problems until the patterns become familiar.

### Is there a laboratory component?

Yes, and it's essential—not optional. The lab is where theory meets reality. You'll build circuits on breadboards, program FPGAs, debug with logic analyzers, and experience firsthand why timing constraints matter. The skills developed in lab—translating theory to hardware, debugging timing errors, working within physical constraints—are what employers value most.

## Core Concept Questions

### What is the difference between combinational and sequential logic?

Combinational logic circuits produce outputs based solely on current inputs—like a vending machine's price display responding to button presses. Sequential logic circuits have memory and produce outputs based on both current inputs AND past history—like the vending machine tracking how much money you've inserted. This distinction is fundamental: combinational circuits are stateless, sequential circuits have state. See [Chapter 4](chapters/04-combinational-logic-design/index.md) for combinational logic and [Chapter 7](chapters/07-intro-sequential-logic/index.md) for the sequential logic introduction.

### What is a truth table and why is it important?

A truth table is a complete specification of a logic function, listing every possible input combination and its corresponding output. It's important because it provides an unambiguous definition of circuit behavior—there's no guessing about edge cases. Truth tables form the foundation for both circuit design (deriving Boolean expressions) and verification (checking that your implementation matches the specification). See [Chapter 2](chapters/02-boolean-algebra-fundamentals/index.md) for truth table fundamentals.

### What is Boolean algebra?

Boolean algebra is the mathematical system for manipulating logical expressions using AND, OR, and NOT operations. Unlike regular algebra with infinite real numbers, Boolean algebra works with just two values: 0 and 1. Its laws (identity, complement, De Morgan's, etc.) allow systematic simplification of logic expressions and form the theoretical foundation for all digital circuit design.

### What are De Morgan's Theorems and why are they important?

De Morgan's theorems state that (A + B)' = A'B' and (AB)' = A' + B'. In words: the complement of an OR equals the AND of the complements, and vice versa. These theorems are critical because they allow conversion between AND/OR forms and enable implementing any circuit using only NAND gates or only NOR gates. You'll use De Morgan's constantly in simplification and design.

### What is a logic gate?

A logic gate is a physical electronic circuit that implements a Boolean operation. Gates are the fundamental building blocks of digital systems. The basic gates—AND, OR, NOT—directly implement Boolean operations, while derived gates like NAND, NOR, XOR, and XNOR provide convenience and efficiency. Understanding gate symbols, behavior, and properties (delay, fan-in, fan-out) is essential. See [Chapter 3](chapters/03-logic-gates-digital-signals/index.md) for complete coverage.

### Why are NAND and NOR gates called "universal gates"?

NAND and NOR are functionally complete, meaning any Boolean function can be implemented using only that one gate type. You can build an inverter, AND, OR—any gate—from NANDs alone or NORs alone. This is practically important because manufacturing a single gate type is simpler and cheaper than manufacturing multiple types. Real integrated circuits often use NAND-only or NOR-only designs.

### What is a Karnaugh map?

A Karnaugh map (K-map) is a graphical method for simplifying Boolean expressions. It arranges truth table outputs in a grid where adjacent cells differ by exactly one variable, making grouping of terms visual and intuitive. K-maps work well for 2, 3, or 4 variables. For more variables, algorithmic methods like Quine-McCluskey are used. See [Chapter 5](chapters/05-logic-minimization-kmaps/index.md) for K-map techniques.

### What is a multiplexer?

A multiplexer (MUX) is a combinational circuit that selects one of several inputs to pass to the output, based on select lines. A 4-to-1 MUX has 4 data inputs, 2 select lines, and 1 output. Multiplexers are fundamental building blocks—they can implement any Boolean function, route data in datapaths, and form the basis of programmable logic. See [Chapter 6](chapters/06-combinational-building-blocks/index.md) for multiplexer design.

### What is a flip-flop?

A flip-flop is an edge-triggered storage element that captures and holds one bit of data. Unlike latches (which are level-sensitive), flip-flops only change state at the clock edge—either rising or falling. The D flip-flop is most common: on the active clock edge, Q takes the value present at D. Flip-flops are the building blocks of registers, counters, and state machines. See [Chapter 8](chapters/08-flip-flops-timing/index.md) for flip-flop details.

### What is the difference between a latch and a flip-flop?

A latch is level-sensitive—it's "transparent" and passes input to output while enabled. A flip-flop is edge-triggered—it samples input only at the clock transition. This difference is crucial: latches can cause timing problems in complex designs because changes propagate through multiple stages within one clock period. Flip-flops provide predictable behavior by updating only at discrete clock edges.

### What is a finite state machine (FSM)?

A finite state machine is a sequential circuit with a finite number of states, rules for transitioning between states, and outputs that depend on the current state (and possibly inputs). FSMs are the primary model for designing sequential logic. Common examples include counters, sequence detectors, and controllers. See [Chapter 9](chapters/09-fsm-fundamentals/index.md) and [Chapter 10](chapters/10-fsm-design-applications/index.md) for FSM design.

### What is the difference between Moore and Mealy machines?

In a Moore machine, outputs depend only on the current state—outputs are associated with states. In a Mealy machine, outputs depend on both the current state AND current inputs—outputs are associated with transitions. Moore machines have more predictable timing (outputs change only with state), while Mealy machines can respond faster (outputs can change immediately with inputs).

### What is Verilog?

Verilog is a hardware description language (HDL) used to model and design digital systems. Unlike programming languages that describe sequential execution, Verilog describes concurrent hardware behavior. It supports multiple abstraction levels: gate-level (explicit gates), RTL (register-transfer level), and behavioral (algorithmic). Verilog is used for both simulation and synthesis to actual hardware. See [Chapter 12](chapters/12-verilog-hdl-fundamentals/index.md) for Verilog basics.

### What is the difference between wire and reg in Verilog?

Wire represents a physical connection driven by continuous assignment or module outputs. Reg represents a variable that holds a value and is assigned in procedural blocks (always, initial). Importantly, reg does NOT necessarily mean a physical register—it's just Verilog syntax. A reg assigned in a combinational always block synthesizes to combinational logic, not a register.

### What is synthesis?

Synthesis is the process of converting HDL code (Verilog) into a netlist of logic gates and flip-flops that can be implemented in hardware. Synthesis tools interpret your behavioral description and produce an equivalent gate-level circuit. Not all Verilog constructs are synthesizable—delays, initial blocks, and file I/O are simulation-only. See [Chapter 14](chapters/14-testbenches-simulation/index.md) for synthesis details.

### What is an FPGA?

An FPGA (Field-Programmable Gate Array) is an integrated circuit designed to be configured after manufacturing. It contains an array of configurable logic blocks (CLBs), programmable routing, and I/O blocks. Unlike ASICs with fixed functionality, FPGAs can be reprogrammed to implement virtually any digital circuit. They're used for prototyping, low-volume production, and applications requiring reconfigurability. See [Chapter 15](chapters/15-fpga-lab-skills/index.md) for FPGA architecture.

## Technical Detail Questions

### What is propagation delay?

Propagation delay is the time from when an input changes until the corresponding output change appears. Every gate and wire has propagation delay. In combinational circuits, total delay equals the sum of delays along the longest path. Propagation delay limits circuit speed—the clock period must be longer than the worst-case path delay plus setup time.

### What are setup time and hold time?

Setup time is the minimum time data must be stable BEFORE the clock edge. Hold time is the minimum time data must remain stable AFTER the clock edge. Violating these requirements causes unreliable operation—the flip-flop may capture incorrect data or enter metastability. Meeting timing constraints is essential for correct synchronous design.

### What is metastability?

Metastability occurs when a flip-flop samples an input that's changing at the exact moment of the clock edge, violating setup or hold time. The flip-flop enters an unstable intermediate state and takes unpredictable time to resolve to 0 or 1. This is particularly problematic for asynchronous inputs crossing clock domains. Synchronizer circuits (typically two flip-flops in series) mitigate metastability risk.

### What is the difference between synchronous and asynchronous reset?

Synchronous reset takes effect only at the clock edge—the flip-flop resets on the next active edge after reset is asserted. Asynchronous reset takes effect immediately when asserted, regardless of the clock. Synchronous resets are easier to analyze for timing but require the clock to be running. Asynchronous resets provide immediate initialization but can cause timing issues.

### What are blocking and non-blocking assignments in Verilog?

Blocking assignments (=) execute immediately and in order—each completes before the next begins. Non-blocking assignments (<=) schedule updates for the end of the time step—all right-hand sides are evaluated before any updates occur. Use blocking for combinational logic, non-blocking for sequential logic. Mixing them incorrectly causes simulation/synthesis mismatches.

### What is two's complement?

Two's complement is the standard representation for signed integers in digital systems. Positive numbers have a leading 0; negative numbers are formed by inverting all bits and adding 1. The key advantage: addition and subtraction use the same hardware regardless of sign. In 8-bit two's complement, values range from -128 to +127.

### What is a don't care condition?

A don't care condition occurs when an output value is unspecified for certain input combinations—either because those inputs never occur (like BCD codes 1010-1111) or because the output is ignored. Don't cares are marked as X in truth tables and can be treated as either 0 or 1 during minimization, allowing more simplification.

### What is gray code and when is it used?

Gray code is a binary code where consecutive values differ by exactly one bit. This property eliminates multi-bit transition glitches. Gray code is used in rotary encoders (to prevent position errors), FSM state encoding (to reduce switching noise), and crossing clock domains (to prevent metastability from multiple bits changing).

### What is fan-in and fan-out?

Fan-in is the number of inputs to a gate; fan-out is the number of gate inputs that a gate output can drive. Higher fan-in increases gate delay and power consumption. Exceeding fan-out limits degrades signal quality and timing. Both are important considerations for physical implementation.

### What is a hazard in digital circuits?

A hazard is a momentary incorrect output caused by unequal propagation delays through different paths. Static hazards produce a glitch when the output should remain constant. Dynamic hazards produce multiple glitches during a single transition. Hazards matter in asynchronous circuits and when outputs directly drive state machine inputs.

### What is RTL (Register Transfer Level)?

RTL is a design abstraction describing data movement between registers through combinational logic. It specifies what happens each clock cycle: which registers update, what values they receive, what operations are performed. RTL is the primary design level for synthesizable digital circuits—high enough to be readable, detailed enough for synthesis.

### What is a testbench?

A testbench is Verilog code that tests a design by providing stimulus and checking responses. Testbenches instantiate the design under test, generate input sequences, and verify outputs. They use non-synthesizable constructs (delays, $display, $monitor) for simulation only. Self-checking testbenches automatically compare actual outputs to expected values.

## Common Challenge Questions

### Why does my combinational always block infer a latch?

This happens when not all outputs are assigned for all input combinations. If you have an if-statement without an else, or a case statement without default, the synthesis tool infers a latch to hold the previous value for unspecified cases. Solution: ensure every path assigns every output, use else clauses, and include default in case statements.

### Why do my simulation and synthesis results differ?

Common causes include: using blocking assignments in sequential logic or non-blocking in combinational logic; race conditions from improper sensitivity lists; delays in synthesizable code (synthesis ignores them); or incomplete case/if coverage. The synthesis tool interprets your code differently than the simulator. Always use @(*) for combinational logic and non-blocking assignments for sequential logic.

### How do I debug timing violations?

Timing violations mean signals don't meet setup or hold requirements. For setup violations: the combinational path is too long—simplify logic, add pipeline stages, or reduce clock frequency. For hold violations: the path is too short—add buffers to slow the signal. Use timing reports to identify the failing paths and their slack values.

### Why doesn't my state machine work correctly?

Common FSM bugs include: incomplete state transitions (missing input conditions), incorrect output assignments, improper reset handling, or wrong state encoding assumptions. Debug systematically: verify the state diagram is correct, check that state registers reset properly, trace specific input sequences through your code, and use simulation waveforms to observe state transitions.

### What causes metastability and how do I prevent it?

Metastability occurs when flip-flops sample signals that violate setup/hold times—typically asynchronous inputs or signals crossing clock domains. Prevention: use synchronizer circuits (two flip-flops in series) for all asynchronous inputs. The first flip-flop may go metastable, but it has a full clock period to resolve before the second flip-flop samples it.

### Why is my counter skipping states or glitching?

This usually indicates timing problems or incorrect logic. Check that outputs are registered (not combinational decodes of state bits which can glitch). Verify synchronous vs. asynchronous reset usage. Ensure the clock is clean and stable. For multi-bit comparisons used in terminal count detection, check for glitches during bit transitions.

### How do I properly debounce a mechanical switch?

Mechanical switches bounce—the contacts make and break multiple times over 1-10ms. Without debouncing, a single press may register as many presses. Solutions: hardware (RC filter with Schmitt trigger) or digital (sample the input, wait for it to be stable for 10-20ms before accepting the new value). See the debouncing code in [Chapter 15](chapters/15-fpga-lab-skills/index.md).

### Why won't my Verilog code synthesize?

Common non-synthesizable constructs: #delays, initial blocks, $display/$monitor system tasks, file I/O operations, and divide/modulo by non-power-of-2 values. Also check for: latches from incomplete assignments, multiply-driven nets, unsupported operators, or feedback loops without registers. Read the synthesis tool's error messages carefully—they usually identify the problem.

### How do I choose between binary and one-hot encoding for state machines?

Binary encoding uses fewer flip-flops (log2 of state count) but requires more decoding logic for next-state and output equations. One-hot encoding uses one flip-flop per state but has simpler logic because each state is directly represented. In FPGAs with abundant flip-flops, one-hot is often preferred. For ASICs or when flip-flops are scarce, binary may be better.

### Why is my ripple-carry adder so slow?

Ripple-carry adders have delay proportional to bit width because the carry must propagate through all stages sequentially. For fast addition, use carry-lookahead techniques that compute all carries in parallel. Modern synthesis tools often automatically optimize adders, but understanding the fundamental tradeoff between area and delay is important.

## Best Practice Questions

### What makes Verilog code good quality?

Good Verilog is: consistent in style (naming conventions, indentation); well-documented with header comments explaining purpose, ports, and behavior; synthesizable where intended; thoroughly tested with self-checking testbenches; hierarchical with clean module interfaces; and parameterized for reuse. Avoid clever tricks that obscure intent—clarity beats cleverness.

### When should I use structural vs. behavioral modeling?

Use behavioral modeling for most design work—it's more readable and lets synthesis tools optimize implementation. Use structural modeling when you need explicit control over the circuit structure (instantiating specific modules, building hierarchies) or when connecting pre-defined blocks. Most real designs mix both styles appropriately.

### How do I design a state machine from a word problem?

Follow this systematic process: (1) Identify the states—what distinct conditions must the system remember? (2) Determine transitions—what inputs cause changes between states? (3) Define outputs—what does each state produce (Moore) or each transition produce (Mealy)? (4) Draw the state diagram. (5) Create the state table. (6) Choose encoding. (7) Derive next-state and output equations. (8) Implement and verify.

### How should I approach debugging digital circuits?

Debug systematically: (1) Verify the simplest possible case works. (2) Add complexity incrementally. (3) Use simulation before hardware—it's faster to iterate. (4) Examine waveforms to understand actual behavior. (5) Check reset and initialization. (6) Verify timing constraints are met. (7) Use assertions to catch unexpected conditions. (8) Divide and conquer—isolate the problem to the smallest possible scope.

### What are common pitfalls when learning Verilog?

The biggest pitfall: thinking in software. Verilog describes parallel hardware, not sequential execution. Other common issues: confusing wire and reg usage; misusing blocking vs. non-blocking assignments; creating unintended latches; forgetting sensitivity list signals; assuming specific execution order in concurrent blocks; and ignoring synthesis warnings.

### How should I organize a larger Verilog project?

Create a hierarchy matching the conceptual structure: top-level module instantiates major subsystems, which instantiate smaller modules. Keep modules focused on single responsibilities. Use consistent file naming (one module per file, filename matches module name). Maintain separate directories for source and testbenches. Use parameters for configurable values. Document interfaces clearly.

### When should I add pipeline stages to a design?

Add pipeline stages when: the combinational path is too long to meet timing (setup violations); you need higher throughput even at the cost of latency; or the critical path analysis shows a clear bottleneck. Each pipeline stage adds one clock cycle of latency but can significantly increase maximum clock frequency. Balance throughput, latency, and complexity.

### How do I make designs reusable?

Parameterize everything that might vary: bit widths, depths, delays, thresholds. Use clear, generic port names. Document thoroughly: what the module does, port descriptions, parameter ranges, timing requirements. Include a testbench. Minimize dependencies on external signals or specific contexts. Make interfaces clean and standard. Test with various parameter values.

## Laboratory Skills Questions

### What safety precautions should I take in the digital electronics lab?

Digital circuits operate at low voltages (typically 3.3V or 5V), so electrical shock is minimal risk. However: never connect FPGA pins directly to voltages above their rating—this can damage the chip. Use current-limiting resistors with LEDs. Handle ICs carefully to avoid static damage. Keep liquids away from equipment. Don't leave powered equipment unattended.

### How do I read a breadboard layout?

Breadboards have internal connections: terminal strips have 5-hole rows connected horizontally, power rails run vertically along the edges. The center gap separates the two halves (important for IC placement—pins span the gap). Plan your layout before building. Use color-coded wires (red for power, black for ground). Keep wires short and neat for easier debugging.

### How do I use a logic analyzer effectively?

Set up triggers to capture the behavior you want to observe—rising edge on a signal, specific patterns, etc. Adjust sample rate based on your clock frequency (sample at least 4x the highest frequency of interest). Use protocol decoders for standard interfaces (SPI, I2C, UART). Learn to set cursors for timing measurements. Save captures for documentation.

### What should I check first when a circuit doesn't work?

Check power and ground connections first—many problems are simply missing or wrong power. Verify clock signal is present and at expected frequency. Check reset behavior. Measure actual voltages at key points—don't assume they're correct. Look for obvious wiring errors. Test small portions independently. Compare expected vs. actual behavior systematically.

### How do I connect LEDs properly to FPGA outputs?

LEDs require current-limiting resistors (typically 220-330 ohms for standard LEDs at 3.3V). Connect in series: FPGA pin → resistor → LED → ground (active-high) or VCC → LED → resistor → FPGA pin (active-low). Check LED polarity (longer lead is anode/positive). Verify the FPGA output can sink or source sufficient current (usually not a problem for single LEDs).

### What's the proper way to connect buttons to FPGA inputs?

Use pull-up or pull-down resistors to ensure a defined logic level when the button is not pressed. Typical configuration: connect button between FPGA pin and ground, with 10K pull-up resistor from pin to VCC. When pressed: input is low. When released: input is high. Many FPGAs have internal pull-ups that can be enabled, eliminating the external resistor.

### How do I create proper pin constraints for my FPGA?

Refer to your FPGA board's documentation for pin mappings to LEDs, buttons, and headers. Create a constraints file (XDC for Xilinx, SDC for Intel/Altera) specifying PACKAGE_PIN for each signal and IOSTANDARD for voltage compatibility. Verify bank voltage compatibility. Assign timing constraints for clocks. Double-check every assignment before programming.

## Advanced Topics Questions

### What happens after this course?

This course prepares you for computer architecture (understanding CPU design), embedded systems (hardware-software co-design), VLSI design (custom chip design at transistor level), and FPGA-based system design. The concepts of synchronous design, state machines, and timing analysis apply throughout. Your Verilog skills transfer directly to industry tools.

### What is ASIC design and how does it differ from FPGA design?

An ASIC (Application-Specific Integrated Circuit) is a custom chip manufactured for a specific purpose, unlike the reconfigurable FPGA. ASIC design involves similar RTL methodology but adds physical design steps (placement, routing, timing closure) and requires expensive manufacturing. ASICs offer higher performance, lower power, and lower unit cost at high volumes, but have high upfront costs and no reconfigurability.

### What topics are beyond the scope of this course?

This course does not cover: transistor-level CMOS design (how gates are built from transistors), asynchronous circuit theory (clock-free design), advanced timing closure and physical design, or CPU pipeline architecture. These topics require the foundation this course provides and are covered in upper-division courses.

### How do clock domain crossings work?

When signals move between different clock domains, careful synchronization is required to prevent metastability. Use synchronizer flip-flops for single-bit signals. For multi-bit data, use FIFOs with asynchronous read and write clocks, or use Gray code encoding to ensure only one bit changes per transition. Never pass unsynchronized signals between domains.

### What is formal verification?

Formal verification uses mathematical techniques to prove that a design meets its specifications for all possible input sequences—not just test cases. It can find bugs that simulation might miss. Techniques include model checking and equivalence checking. While powerful, formal verification requires expertise and computational resources, so it complements rather than replaces simulation.

### How do I estimate power consumption of my design?

Power in digital circuits comes from: static power (leakage current) and dynamic power (switching activity). Dynamic power dominates in most designs: P = CV²f × activity factor. Reduce power by: lowering voltage (quadratic effect), reducing clock frequency, minimizing switching activity (clock gating, operand isolation), and using low-power design techniques. Synthesis tools provide power estimates.

### What is design for testability (DFT)?

DFT techniques make manufactured chips easier to test for defects. Scan chains allow internal flip-flops to be loaded and observed. Built-in self-test (BIST) adds on-chip test generation and checking. JTAG provides standardized debug access. DFT adds area overhead but is essential for manufacturing yield. Your synthesizable designs should follow DFT-friendly practices.

### How does high-level synthesis differ from traditional RTL design?

High-level synthesis (HLS) converts C/C++ algorithms directly to hardware, automatically determining scheduling, allocation, and binding. It accelerates design but provides less control over implementation. Traditional RTL design requires explicitly describing cycle-by-cycle behavior but offers more optimization opportunities. Many designers use HLS for complex algorithms while using RTL for critical paths.
