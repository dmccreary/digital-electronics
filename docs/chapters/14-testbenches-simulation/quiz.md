# Quiz: Testbenches and Simulation

Test your understanding of verification, simulation, and synthesizable versus non-synthesizable Verilog.

---

#### 1. What is the purpose of a testbench in Verilog?

<div class="upper-alpha" markdown>
1. To synthesize the design faster
2. To provide stimulus and observe outputs for verifying design correctness
3. To reduce power consumption
4. To generate documentation
</div>

??? question "Show Answer"
    The correct answer is **B**. A testbench is a Verilog module that provides stimulus to the device under test (DUT), observes its outputs, and verifies correct behavior. Testbenches exist purely for verification and are not synthesized.

    **Concept Tested:** Testbench

---

#### 2. What is the standard way to generate a clock signal in a testbench?

<div class="upper-alpha" markdown>
1. assign clk = 1;
2. initial begin clk = 0; forever #5 clk = ~clk; end
3. always @(clk) clk = ~clk;
4. wire clk = oscillator;
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard pattern uses an initial block with forever and delay to toggle the clock: initial begin clk = 0; forever #5 clk = ~clk; end. This creates a clock with period 10 time units.

    **Concept Tested:** Clock Generation

---

#### 3. What is a test vector?

<div class="upper-alpha" markdown>
1. A direction indicator in the simulation
2. A set of input values paired with expected output values
3. A graphical display of signals
4. A type of Verilog module
</div>

??? question "Show Answer"
    The correct answer is **B**. A test vector is a specific set of input values along with the expected output values for those inputs. Test vectors organize test cases into a structured format for systematic, automated verification.

    **Concept Tested:** Test Vector

---

#### 4. What makes a testbench "self-checking"?

<div class="upper-alpha" markdown>
1. It automatically fixes bugs in the design
2. It compares DUT outputs against expected values and reports errors
3. It verifies its own correctness
4. It runs without user intervention
</div>

??? question "Show Answer"
    The correct answer is **B**. A self-checking testbench automatically compares DUT outputs against expected values (from a reference model or test vectors) and reports pass/fail without requiring manual waveform inspection.

    **Concept Tested:** Self-Checking Testbench

---

#### 5. What does the # delay operator do in Verilog simulation?

<div class="upper-alpha" markdown>
1. Generates a clock signal
2. Suspends execution for a specified number of time units
3. Creates a hardware delay element
4. Prioritizes signal assignments
</div>

??? question "Show Answer"
    The correct answer is **B**. The # delay operator suspends execution for the specified number of time units. For example, #10 waits 10 time units before the next statement executes. This is for simulation only—not synthesizable.

    **Concept Tested:** Simulation Time

---

#### 6. What Verilog construct creates waveform output files for viewing?

<div class="upper-alpha" markdown>
1. $display and $write
2. $dumpfile and $dumpvars
3. $monitor and $strobe
4. assign and always
</div>

??? question "Show Answer"
    The correct answer is **B**. $dumpfile("name.vcd") specifies the output file, and $dumpvars(0, module_name) specifies which signals to capture. The resulting VCD file can be viewed in waveform viewers like GTKWave.

    **Concept Tested:** Waveform Viewer

---

#### 7. What is the first step when debugging a waveform showing incorrect outputs?

<div class="upper-alpha" markdown>
1. Rewrite the entire design
2. Start at the wrong output and trace backward to find where correct becomes incorrect
3. Add more test vectors
4. Change the clock frequency
</div>

??? question "Show Answer"
    The correct answer is **B**. Debug by starting at the incorrect output and tracing backward through the signal path. Add internal signals to the display until you find the point where correct input produces incorrect output—that's your bug location.

    **Concept Tested:** Debugging Waveforms

---

#### 8. What does synthesis do to Verilog code?

<div class="upper-alpha" markdown>
1. Runs the simulation faster
2. Converts RTL Verilog into a gate-level netlist for hardware implementation
3. Checks for syntax errors only
4. Generates documentation
</div>

??? question "Show Answer"
    The correct answer is **B**. Synthesis transforms RTL Verilog into a netlist of gates, flip-flops, and other primitives that can be implemented in an FPGA or ASIC. It infers hardware structures from behavioral descriptions.

    **Concept Tested:** Synthesis

---

#### 9. Which Verilog construct is NOT synthesizable?

<div class="upper-alpha" markdown>
1. always @(posedge clk)
2. initial begin ... end with # delays
3. assign y = a & b;
4. if-else statements
</div>

??? question "Show Answer"
    The correct answer is **B**. Initial blocks with # delays are simulation-only constructs—they cannot be synthesized into hardware. The # delay has no hardware equivalent. Always, assign, and if-else are all synthesizable.

    **Concept Tested:** Non-Synthesizable Code

---

#### 10. What is the key rule for separating design and testbench code?

<div class="upper-alpha" markdown>
1. Use different file extensions
2. Keep all $system tasks, # delays, and initial blocks in testbenches only
3. Write testbenches in a different language
4. Never use modules in testbenches
</div>

??? question "Show Answer"
    The correct answer is **B**. Design modules must contain only synthesizable code. Non-synthesizable constructs ($display, $finish, # delays, most initial blocks) belong in testbench files only. This separation ensures designs can be synthesized.

    **Concept Tested:** Synthesizable Code

