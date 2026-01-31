# Quiz: FPGA Implementation and Laboratory Skills

Test your understanding of FPGA architecture, implementation flow, and hands-on laboratory techniques.

---

#### 1. What is the fundamental building block for implementing combinational logic in an FPGA?

<div class="upper-alpha" markdown>
1. Flip-flop
2. Look-Up Table (LUT)
3. Routing switch
4. I/O buffer
</div>

??? question "Show Answer"
    The correct answer is **B**. A Look-Up Table (LUT) stores a truth table and can implement any Boolean function of its inputs (typically 4-6 inputs). The FPGA tools program each LUT's contents to create your circuit's combinational logic.

    **Concept Tested:** FPGA LUT

---

#### 2. What happens during the "place and route" phase of FPGA implementation?

<div class="upper-alpha" markdown>
1. Verilog is converted to gates
2. Logic elements are assigned locations and routing connections are made
3. The bitstream is loaded into the FPGA
4. Simulation waveforms are generated
</div>

??? question "Show Answer"
    The correct answer is **B**. Place and route assigns each logic element to a specific CLB location (placement) and creates the programmable interconnect paths between them (routing). This physical mapping determines actual signal delays.

    **Concept Tested:** FPGA Routing

---

#### 3. What is pin assignment in FPGA design?

<div class="upper-alpha" markdown>
1. Choosing which programming algorithm to use
2. Mapping design I/O signals to specific physical pins on the FPGA package
3. Assigning register addresses in memory
4. Setting the clock frequency
</div>

??? question "Show Answer"
    The correct answer is **B**. Pin assignment maps your design's I/O signals to specific physical pins. This includes specifying the pin location, I/O voltage standard, drive strength, and other electrical characteristics needed to interface with external circuits.

    **Concept Tested:** Pin Assignment

---

#### 4. Why is switch debouncing necessary in digital designs?

<div class="upper-alpha" markdown>
1. To make switches respond faster
2. To eliminate false triggers from mechanical contact bounce
3. To reduce power consumption
4. To increase the switch lifespan
</div>

??? question "Show Answer"
    The correct answer is **B**. Mechanical switches bounce when pressed, producing multiple rapid transitions instead of a clean edge. Debouncing filters these bounces so a single button press registers as one event, not 5-50 events.

    **Concept Tested:** Debouncing

---

#### 5. What is the typical utilization threshold above which FPGA routing becomes problematic?

<div class="upper-alpha" markdown>
1. 50%
2. 65%
3. 80%
4. 95%
</div>

??? question "Show Answer"
    The correct answer is **C**. FPGAs become difficult to route above about 80% utilization because remaining routing resources are scattered and fragmented. Designs should leave headroom to allow the tools to find efficient routing paths.

    **Concept Tested:** FPGA Implementation

---

#### 6. What must you use with an LED connected to an FPGA output?

<div class="upper-alpha" markdown>
1. A voltage regulator
2. A current-limiting resistor
3. A pull-down resistor
4. An optocoupler
</div>

??? question "Show Answer"
    The correct answer is **B**. LEDs require current limiting to prevent damage. A typical value is 220Ω-330Ω, calculated from: R = (Vsupply - VLED) / ILED. Without this resistor, excessive current can damage the LED or FPGA output.

    **Concept Tested:** LED Indicator

---

#### 7. What tool captures and displays multiple digital signals over time?

<div class="upper-alpha" markdown>
1. Multimeter
2. Logic analyzer
3. Oscilloscope
4. Spectrum analyzer
</div>

??? question "Show Answer"
    The correct answer is **B**. A logic analyzer captures multiple digital signals (8, 16, 32+ channels) over time, with triggering and protocol decoding capabilities. It's essential for debugging digital systems and communication protocols.

    **Concept Tested:** Logic Analyzer

---

#### 8. What does timing verification check in an FPGA design?

<div class="upper-alpha" markdown>
1. Whether the design uses the correct pin assignments
2. Whether setup and hold time requirements are met at all flip-flops
3. Whether the power consumption is acceptable
4. Whether the simulation runs correctly
</div>

??? question "Show Answer"
    The correct answer is **B**. Timing verification checks that data signals meet setup time (stable before clock edge) and hold time (stable after clock edge) requirements at all flip-flops. Timing failures cause intermittent, hard-to-debug problems.

    **Concept Tested:** Timing Verification

---

#### 9. At which abstraction level do digital designers primarily work when writing synthesizable Verilog?

<div class="upper-alpha" markdown>
1. Transistor level
2. Gate level
3. Register Transfer Level (RTL)
4. System level
</div>

??? question "Show Answer"
    The correct answer is **C**. Designers work primarily at the Register Transfer Level (RTL), describing data movement between registers through combinational logic. Synthesis tools handle the conversion to gate level and below.

    **Concept Tested:** Abstraction Levels

---

#### 10. What is the primary benefit of design reuse in digital design?

<div class="upper-alpha" markdown>
1. Smaller file sizes
2. Faster clock speeds
3. Saving time and reducing bugs by leveraging verified components
4. Better documentation
</div>

??? question "Show Answer"
    The correct answer is **C**. Design reuse saves development time and reduces bugs by leveraging existing, verified modules. Parameterized, well-documented, and thoroughly tested modules can be reliably reused across projects.

    **Concept Tested:** Design Reuse

