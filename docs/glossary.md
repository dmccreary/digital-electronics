# Digital Electronics Glossary of Terms

This glossary contains definitions for key concepts in digital electronics, organized alphabetically. Each definition follows ISO 11179 standards: precise, concise, distinct, and non-circular.

#### Absorption Law

A Boolean algebra simplification rule stating that a variable combined with its AND-product or OR-sum with another variable reduces to just the first variable.

The absorption law helps eliminate redundant terms in Boolean expressions. The two forms are: A + AB = A and A(A + B) = A.

**Example:** The expression X + XY simplifies to just X because if X is true, the entire expression is true regardless of Y.

#### Adjacent Cells

Cells in a Karnaugh map that differ by exactly one variable, allowing them to be grouped for simplification.

Adjacent cells share a common edge in the K-map grid. Groups of adjacent cells reduce to simpler product terms by eliminating the changing variable.

**Example:** In a 3-variable K-map, cells for minterms m3 (011) and m7 (111) are adjacent because they differ only in variable A.

#### Algebraic Simplification

The process of reducing Boolean expressions using Boolean algebra laws and theorems.

This manual technique applies rules like De Morgan's theorem, absorption, and distribution to minimize gate count before implementation.

**Example:** ABC + ABC' can be simplified to AB by factoring out AB and applying the complement law.

#### ALU Concept

An arithmetic logic unit that performs arithmetic and bitwise logical operations on binary data.

The ALU is the computational heart of a processor, typically supporting operations like addition, subtraction, AND, OR, and comparison. Control signals select which operation to perform.

**Example:** A simple 4-bit ALU might compute A + B, A - B, A AND B, or A XOR B based on a 2-bit operation selector.

#### Always Block

A Verilog procedural block that executes whenever signals in its sensitivity list change.

Always blocks model both combinational logic (using @(*) sensitivity) and sequential logic (using @(posedge clk) sensitivity). They contain procedural statements like if-else and case.

**Example:** `always @(posedge clk) q <= d;` describes a D flip-flop that captures d on each rising clock edge.

#### Analog vs Digital

The distinction between signals that vary continuously (analog) versus signals with discrete levels (digital).

Analog signals can take any value within a range, while digital signals are restricted to defined logic levels (typically high and low). Digital systems offer better noise immunity and easier processing.

**Example:** A microphone produces an analog voltage proportional to sound pressure, while a digital counter outputs discrete binary values.

#### AND Gate

A logic gate that outputs 1 only when all inputs are 1.

The AND gate implements logical conjunction. For a 2-input AND, the output equals A AND B, written as Y = AB or Y = A · B.

**Example:** A 2-input AND gate with inputs A=1 and B=0 produces output Y=0.

#### AND Operation

A Boolean operation that yields true only when all operands are true.

The AND operation is fundamental to Boolean algebra and digital logic. It corresponds to logical conjunction and multiplication in Boolean algebra.

**Example:** In the expression F = AB, F equals 1 only when both A and B equal 1.

#### Assign Statement

A Verilog statement that creates a continuous connection between an expression and a wire.

Assign statements model combinational logic where the left-hand side continuously reflects changes in the right-hand expression with no storage.

**Example:** `assign sum = a ^ b;` continuously drives sum with the XOR of a and b.

#### Associative Law

A Boolean algebra law stating that the grouping of variables in AND or OR operations does not affect the result.

The associative law allows rearranging parentheses without changing the outcome: (A + B) + C = A + (B + C) and (AB)C = A(BC).

**Example:** (X AND Y) AND Z equals X AND (Y AND Z), so parentheses can be removed.

#### Asynchronous Input

A signal that can change at any time, independent of the system clock.

Asynchronous inputs require synchronization before use in clocked logic to prevent metastability. Common examples include external button presses and sensor signals.

**Example:** A reset button pressed by a user is asynchronous because it has no timing relationship to the system clock.

#### Asynchronous Reset

A reset signal that immediately forces a flip-flop to its initial state regardless of clock.

Asynchronous resets take effect as soon as asserted, without waiting for a clock edge. They provide immediate initialization but can cause timing issues.

**Example:** `always @(posedge clk or posedge reset) if (reset) q <= 0; else q <= d;`

#### Abstraction Levels

Hierarchical layers of design representation ranging from system behavior to physical implementation.

Higher abstraction levels hide implementation details. Common levels include system, behavioral, RTL, gate, and physical. Designers work at the level appropriate for their task.

**Example:** A designer specifies an adder behaviorally as C = A + B, while synthesis tools determine the gate-level implementation.

#### BCD Counter

A counter that counts in binary-coded decimal, cycling from 0 to 9.

A BCD counter requires 4 bits but only uses states 0000 through 1001. It resets to 0 after reaching 9, making it ideal for decimal displays.

**Example:** A decade counter driving a 7-segment display cycles through 0-1-2-3-4-5-6-7-8-9-0...

#### BCD Encoding

A method of representing decimal digits where each digit is encoded as a 4-bit binary number.

BCD simplifies decimal I/O operations by encoding each decimal digit (0-9) separately. It uses only 10 of the 16 possible 4-bit combinations.

**Example:** The decimal number 47 is encoded in BCD as 0100 0111 (4 = 0100, 7 = 0111).

#### Behavioral Modeling

A Verilog modeling style that describes what a circuit does without specifying how it is built.

Behavioral models use high-level constructs like if-else and arithmetic operators. Synthesis tools convert behavioral descriptions to gate-level implementations.

**Example:** `always @(*) if (sel) y = a; else y = b;` behaviorally describes a 2-to-1 multiplexer.

#### Bidirectional Shift

A shift register operation that can shift data left or right based on a control signal.

Bidirectional shift registers add flexibility for applications like multiplication/division by powers of 2 or serial data reversal.

**Example:** A universal shift register with a direction input shifts left when DIR=0 and right when DIR=1.

#### Binary Addition

The arithmetic operation of adding two binary numbers.

Binary addition follows rules: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (sum=0, carry=1). Carries propagate from right to left just as in decimal addition.

**Example:** Adding 1011 + 0110: starting from the right, 1+0=1, 1+1=10 (write 0, carry 1), 0+1+1=10 (write 0, carry 1), 1+0+1=10. Result: 10001.

#### Binary Comparator

A circuit that compares two binary numbers and indicates their relative magnitude.

Comparators output signals indicating whether A>B, A<B, or A=B. They form the basis of conditional operations in digital systems.

**Example:** A 4-bit magnitude comparator comparing A=0101 and B=0011 asserts the A>B output.

#### Binary Counter

A counter that increments through all possible states of its bit width in binary sequence.

An n-bit binary counter has 2^n states, counting from 0 to 2^n - 1 before wrapping to 0. Each flip-flop toggles at half the frequency of the previous stage.

**Example:** A 3-bit binary counter sequences through 000, 001, 010, 011, 100, 101, 110, 111, 000...

#### Binary Encoding

A state encoding method that assigns sequential binary numbers to FSM states.

Binary encoding uses the minimum number of flip-flops (ceiling of log2 of state count) but may require more complex next-state logic than one-hot encoding.

**Example:** A 4-state FSM uses 2-bit binary encoding: S0=00, S1=01, S2=10, S3=11.

#### Binary Number System

A base-2 positional number system using only digits 0 and 1.

Binary is the foundation of digital electronics because electronic circuits can reliably distinguish between two states. Each digit position represents a power of 2.

**Example:** Binary 1101 equals decimal 13 (1×8 + 1×4 + 0×2 + 1×1).

#### Binary Subtraction

The arithmetic operation of subtracting one binary number from another.

Binary subtraction can use direct borrowing or, more commonly, two's complement addition. The latter avoids separate subtraction circuitry.

**Example:** Computing 1010 - 0011 using two's complement: 1010 + 1101 = 10111, discarding the overflow gives 0111 (7).

#### Binary to Decimal Conversion

The process of calculating the decimal value of a binary number.

Multiply each binary digit by its position weight (power of 2) and sum all products. This converts the base-2 representation to base-10.

**Example:** Binary 10110 = 1×16 + 0×8 + 1×4 + 1×2 + 0×1 = 22 in decimal.

#### Bistable Element

A circuit with two stable states that can store one bit of information indefinitely.

Bistable elements remain in their current state until an input forces a change. Cross-coupled inverters or gates create the feedback necessary for bistability.

**Example:** Two inverters connected in a loop form the simplest bistable element, storing either 0 or 1 with no input.

#### Blocking Assignment

A Verilog procedural assignment (=) that executes immediately and blocks subsequent statements.

Blocking assignments execute in order, with each completing before the next begins. They model combinational logic within always blocks.

**Example:** `a = b; c = a;` results in c getting b's value because a is updated before c is assigned.

#### Boolean Algebra

A mathematical system for manipulating logical expressions using operations AND, OR, and NOT.

Boolean algebra provides the theoretical foundation for digital circuit design. Its laws enable systematic simplification and optimization of logic functions.

**Example:** The Boolean expression A + AB simplifies to A using the absorption law.

#### Boolean Constant

A fixed value in Boolean algebra, either 0 (false) or 1 (true).

Boolean constants appear in expressions and truth tables. They interact with variables according to Boolean algebra laws like the identity and null laws.

**Example:** In the expression F = A + 0, the constant 0 has no effect on the output (identity law).

#### Boolean Expression

A combination of Boolean variables, constants, and operators that evaluates to 0 or 1.

Boolean expressions describe logic functions that can be implemented as circuits. They serve as the specification for digital design.

**Example:** F = AB' + BC is a Boolean expression with two product terms combined by OR.

#### Boolean Function

A mapping from Boolean input combinations to Boolean outputs.

A Boolean function defines the input-output behavior of a logic circuit. It can be represented as an expression, truth table, or circuit diagram.

**Example:** The XOR function outputs 1 when exactly one of two inputs is 1: F(A,B) = A'B + AB'.

#### Boolean Proof Technique

A method for verifying Boolean identities by algebraic manipulation or truth table evaluation.

Proofs demonstrate that two expressions are equivalent by transforming one into the other or by showing they have identical truth tables.

**Example:** Proving A + AB = A: Factor to get A(1 + B) = A(1) = A.

#### Boolean to Gates Mapping

The process of converting a Boolean expression to a logic gate circuit.

Each Boolean operator corresponds to a gate: AND for multiplication, OR for addition, NOT for complement. Multi-level expressions create cascaded gates.

**Example:** F = AB + C maps to an AND gate feeding one input of an OR gate, with C feeding the other OR input.

#### Boolean Variable

A symbol representing a logical quantity that can be either 0 or 1.

Boolean variables are named with single letters or descriptive identifiers. They represent inputs, intermediate signals, or outputs in digital systems.

**Example:** In F = A AND B, both A and B are Boolean variables that can each be 0 or 1.

#### Breadboard Prototyping

Building temporary circuits on a solderless breadboard for testing and experimentation.

Breadboards allow rapid circuit construction without soldering. Their internal connection pattern (5-hole rows, power rails) must be understood for correct wiring.

**Example:** A student builds a 4-bit adder on a breadboard using 74LS83 ICs, LEDs, and switches.

#### Buffer Gate

A logic gate that produces an output equal to its input, providing signal conditioning.

Buffers add drive strength, restore signal levels, or introduce intentional delay. Tri-state buffers add an enable input for bus applications.

**Example:** A buffer between a weak sensor output and a long wire ensures proper logic levels at the destination.

#### Bus Architecture

A shared communication pathway allowing multiple components to exchange data.

Bus architectures use tri-state buffers to allow only one driver at a time. They reduce wire count compared to point-to-point connections.

**Example:** An 8-bit data bus connects CPU, memory, and I/O devices, with each device enabled only when addressed.

#### Canonical Form

A standard representation of a Boolean function using all variables in every term.

Canonical forms include sum-of-minterms and product-of-maxterms. They directly correspond to truth table rows and provide a unique expression.

**Example:** F = Σ(1,3,5,7) is the canonical SOP form listing the minterms where F=1.

#### Carry Bit

The output bit generated when a binary addition exceeds the capacity of a single bit position.

Carry bits propagate from less significant to more significant bit positions. Managing carry propagation is crucial for adder performance.

**Example:** Adding 1+1 in binary produces sum=0 with carry=1 to the next position.

#### Carry Lookahead Concept

A fast addition technique that calculates all carry bits simultaneously using generate and propagate logic.

Carry lookahead eliminates the ripple delay by computing carries in parallel. It trades increased logic complexity for reduced delay.

**Example:** A 4-bit carry lookahead adder computes all carries in constant time using G and P signals from each bit position.

#### Carry Propagation Delay

The time required for a carry to ripple through all stages of an adder.

In ripple-carry adders, the worst-case delay grows linearly with bit width. Carry lookahead and other techniques reduce this bottleneck.

**Example:** A 32-bit ripple-carry adder has 32 stages of carry propagation, making it much slower than a carry-lookahead design.

#### Case Statement

A Verilog construct that selects between multiple alternatives based on an expression value.

Case statements efficiently implement multiplexers and decoders in behavioral Verilog. They must cover all possible cases to avoid inferred latches.

**Example:** `case(sel) 2'b00: y = a; 2'b01: y = b; default: y = 0; endcase`

#### Clear Input

A flip-flop control signal that forces the output to 0.

Clear inputs reset flip-flops to a known state. They can be synchronous (effective on clock edge) or asynchronous (immediate effect).

**Example:** A counter uses a clear input to initialize all flip-flops to 0 before counting begins.

#### Clear Signal

A control signal that resets a register or counter to zero.

Clear signals provide initialization capability essential for known starting conditions. The term is often used interchangeably with reset.

**Example:** Asserting CLR on a 4-bit register forces all outputs Q3Q2Q1Q0 to 0000.

#### Clock Edge

The moment when a clock signal transitions between logic levels.

Edge-triggered devices respond only at clock transitions, either rising (0→1) or falling (1→0). This provides precise timing control.

**Example:** A positive-edge-triggered flip-flop samples its D input at each 0-to-1 clock transition.

#### Clock Frequency

The number of clock cycles per second, measured in Hertz.

Clock frequency determines system speed. Higher frequencies allow more operations per second but increase power consumption and timing challenges.

**Example:** A 100 MHz clock completes 100 million cycles per second, with each cycle lasting 10 nanoseconds.

#### Clock Generation

The creation of periodic timing signals in testbenches or circuits.

Clock generation in testbenches uses always blocks with delays. In hardware, crystals, PLLs, or oscillator circuits produce stable clock signals.

**Example:** `always #5 clk = ~clk;` generates a clock with 10-unit period in a Verilog testbench.

#### Clock Period

The time duration of one complete clock cycle.

Clock period is the inverse of frequency. All timing constraints (setup, hold, propagation delay) must fit within the clock period.

**Example:** A 50 MHz clock has a period of 20 nanoseconds (1/50,000,000 seconds).

#### Clock Signal

A periodic waveform that synchronizes operations in a digital system.

The clock provides a timing reference ensuring all flip-flops change state together. It is the heartbeat of synchronous digital systems.

**Example:** A clock oscillating between 0V and 3.3V at 100 MHz synchronizes a microprocessor.

#### Clock-to-Q Delay

The time from a clock edge until a flip-flop output becomes valid.

Clock-to-Q delay is part of the timing path calculation. It adds to the combinational delay between flip-flops to determine maximum operating frequency.

**Example:** If tCQ = 2ns, the flip-flop output becomes stable 2ns after the active clock edge.

#### CMOS Logic

A logic family using complementary pairs of p-type and n-type MOSFETs.

CMOS offers low static power consumption because one transistor is always off. It dominates modern digital IC fabrication.

**Example:** A CMOS inverter uses a PMOS transistor to pull output high and an NMOS transistor to pull output low.

#### Combinational Always

A Verilog always block that models combinational logic using sensitivity to all inputs.

Combinational always blocks use @(*) to trigger on any input change. They must assign outputs for all input combinations to avoid latches.

**Example:** `always @(*) y = a & b;` models an AND gate in behavioral Verilog.

#### Combinational Logic

Logic circuits whose outputs depend only on current input values.

Combinational circuits have no memory or feedback. The same input always produces the same output, with changes appearing after propagation delay.

**Example:** A full adder is combinational because its sum and carry outputs depend only on the three current inputs.

#### Common Term Extraction

A simplification technique that factors out shared variables or terms from a Boolean expression.

Common term extraction reduces redundancy by identifying terms appearing in multiple products. It can lead to fewer gates or levels of logic.

**Example:** ABC + ABD factors to AB(C + D), reducing the implementation from 6 AND gates to 3 gates plus an OR.

#### Commutative Law

A Boolean algebra law stating that the order of operands in AND or OR does not affect the result.

The commutative law allows reordering variables: A + B = B + A and AB = BA. This flexibility aids in expression simplification.

**Example:** XY = YX, so inputs to an AND gate can connect in either order.

#### Complement Law

A Boolean algebra law stating that a variable ORed with its complement equals 1, and ANDed equals 0.

The complement law provides: A + A' = 1 and A · A' = 0. It is fundamental for simplification and implementing logic functions.

**Example:** In the expression A + A', the result is always 1 regardless of A's value.

#### Consensus Theorem

A Boolean simplification rule allowing removal of redundant terms formed by consensus.

The consensus of AB and A'C is BC. The consensus theorem states: AB + A'C + BC = AB + A'C, since BC is redundant.

**Example:** XY + X'Z + YZ simplifies to XY + X'Z because YZ is the consensus term.

#### Continuous Assignment

A Verilog construct that continuously drives a wire based on an expression.

Continuous assignments model combinational logic. The left-hand side updates whenever right-hand side signals change.

**Example:** `assign mux_out = sel ? a : b;` continuously selects between a and b based on sel.

#### Control Unit

The component of a processor that generates control signals based on instructions and state.

The control unit orchestrates datapath operations by enabling registers, selecting ALU functions, and managing memory access.

**Example:** A control unit asserts RegWrite and ALUOp signals based on decoding the current instruction opcode.

#### Counter

A sequential circuit that cycles through a predetermined sequence of states.

Counters implement frequency division, event counting, and timing. They are fundamental building blocks in digital systems.

**Example:** A 4-bit binary up-counter cycles through values 0 to 15, then wraps back to 0.

#### Counter Overflow

The condition when a counter reaches its maximum value and wraps to zero.

Overflow detection indicates that the counter has completed a full cycle. It often generates a carry or terminal count output.

**Example:** An 8-bit counter at 11111111 (255) overflows to 00000000 on the next increment.

#### Counter State Diagram

A graphical representation showing all counter states and their transitions.

Counter state diagrams show the counting sequence and any reset or load behavior. They help verify counter design correctness.

**Example:** A mod-6 counter state diagram shows six circles (0-5) connected in a ring with arrows showing the count sequence.

#### Current State

The present stored value in a sequential circuit.

Current state represents what the circuit "remembers" from past inputs. It is stored in flip-flops and determines output and next-state behavior.

**Example:** If a 2-bit counter currently holds 10, its current state is state 2.

#### D Flip-Flop

An edge-triggered storage element that captures its D input on the active clock edge.

The D flip-flop is the most common sequential element in digital design. It eliminates the invalid state problem of SR flip-flops.

**Example:** On a rising clock edge, Q takes the value present at D. Q' takes the complement.

#### D Latch

A level-sensitive storage element that follows its D input while enabled and holds when disabled.

The D latch is transparent when enable is high, allowing input changes to pass through. When enable goes low, the last value is held.

**Example:** With enable high, Q tracks D. When enable falls while D=1, Q remains 1 until enable goes high again.

#### Datapath Concept

The collection of registers, ALUs, and interconnections that process data in a digital system.

The datapath performs arithmetic, logic, and data transfer operations under control unit direction. It is the "worker" while the control unit is the "manager."

**Example:** A simple datapath might include a register file, ALU, and multiplexers connecting them.

#### De Morgan's Theorem

Two fundamental Boolean identities relating AND, OR, and NOT operations.

De Morgan's theorem states: (A + B)' = A'B' and (AB)' = A' + B'. It enables conversion between AND/OR forms and is essential for NAND/NOR implementations.

**Example:** The complement of A OR B equals (NOT A) AND (NOT B): (A+B)' = A'B'.

#### Debouncing

A technique that eliminates the spurious transitions caused by mechanical switch bounce.

Mechanical contacts bounce for several milliseconds when pressed. Debouncing circuits or software filters ignore transitions until the signal stabilizes.

**Example:** A digital debouncer waits 20ms after a transition before accepting the new switch state.

#### Decade Counter

A counter that cycles through 10 states, typically 0 through 9.

Decade counters are BCD counters used in decimal display applications. They use 4 bits but reset after reaching 1001 (9).

**Example:** A cascaded pair of decade counters can count from 00 to 99 for a two-digit display.

#### Decimal to Binary Conversion

The process of converting a base-10 number to base-2 representation.

Repeated division by 2 yields binary digits from least to most significant. The remainders form the binary number read bottom-to-top.

**Example:** Converting 13: 13÷2=6 R1, 6÷2=3 R0, 3÷2=1 R1, 1÷2=0 R1. Reading remainders: 1101.

#### Decoder

A combinational circuit that activates one of 2^n outputs based on an n-bit input code.

Decoders convert binary codes to one-hot outputs. They are essential for address decoding and control signal generation.

**Example:** A 2-to-4 decoder with input 10 asserts output Y2 and deasserts Y0, Y1, Y3.

#### Decoder Enable

An input that controls whether a decoder is active or outputs are all disabled.

Enable inputs allow cascading decoders for larger address spaces and power-saving when the decoder is not needed.

**Example:** A 3-to-8 decoder with enable low produces all outputs at 0 regardless of input.

#### DEMUX 1-to-4

A demultiplexer that routes one input to one of four outputs based on a 2-bit select.

Demultiplexers are the inverse of multiplexers. The selected output receives the input; other outputs remain at 0 (or high-Z).

**Example:** A 1-to-4 DEMUX with input D, select=10, routes D to output Y2 while Y0, Y1, Y3 are 0.

#### Demultiplexer

A circuit that routes a single input to one of multiple outputs based on select lines.

Demultiplexers distribute data from one source to multiple destinations. They function as the inverse of multiplexers.

**Example:** A serial-to-parallel converter uses a demultiplexer to route each bit to the appropriate parallel output.

#### Design Documentation

Written descriptions of design intent, architecture, interfaces, and usage.

Documentation enables maintenance, collaboration, and reuse. It should explain "why" not just "what" and include interface specifications.

**Example:** A module header comment describes purpose, ports, parameters, timing, and an example instantiation.

#### Design Hierarchy

The organization of a digital design into nested modules at multiple levels.

Hierarchical design manages complexity by dividing systems into manageable pieces. Each module has a clear interface and single responsibility.

**Example:** A processor hierarchy: top → CPU → ALU, register file, control unit → individual gates.

#### Design Reuse

The practice of using existing verified modules in new designs.

Reuse saves development time and reduces bugs. Reusable modules should be parameterized, documented, and thoroughly tested.

**Example:** A parameterized FIFO module used across multiple SoC designs without modification.

#### Design Verification

The process of ensuring a design meets its specifications and functions correctly.

Verification uses simulation, formal methods, and hardware testing. It typically consumes more effort than design itself.

**Example:** Running thousands of test vectors through a testbench to verify an ALU handles all edge cases.

#### Digital Signal

A signal that represents data as discrete voltage levels corresponding to binary values.

Digital signals have defined high and low voltage ranges with an undefined region between. They offer noise immunity and easy processing.

**Example:** A 3.3V CMOS signal is high above 2V, low below 0.8V, with values between being indeterminate.

#### Digital System Design

The complete process of creating digital circuits from specification through implementation.

The design flow includes specification, architecture, RTL design, synthesis, verification, and hardware testing. Each stage produces deliverables.

**Example:** Designing a traffic light controller from requirements through working FPGA implementation.

#### Distributive Law

A Boolean algebra law that relates AND and OR operations through factoring.

The distributive law provides: A(B + C) = AB + AC and A + BC = (A + B)(A + C). The second form differs from regular algebra.

**Example:** X(Y + Z) = XY + XZ, allowing a product-of-sums to expand to sum-of-products.

#### Don't Care Condition

An input combination for which the output value is unspecified and can be chosen for optimization.

Don't cares arise when certain inputs never occur or when outputs are ignored for specific inputs. They are marked as X in truth tables.

**Example:** In a BCD-to-7-segment decoder, inputs 1010-1111 are don't cares since they never occur with valid BCD.

#### Double Flop Synchronizer

A metastability mitigation circuit using two flip-flops in series.

The double-flop synchronizer allows the first flip-flop time to resolve metastability before the output propagates. It introduces 1-2 clock cycles of latency.

**Example:** An asynchronous button signal passes through two flip-flops before entering the main state machine logic.

#### Down Counter

A counter that decrements its value on each clock cycle.

Down counters count from a starting value toward zero. They are used in countdown timers and decrementing applications.

**Example:** A 4-bit down counter loaded with 1010 counts: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, then wraps to 15.

#### Dual Expression

A Boolean expression obtained by interchanging AND/OR and 0/1.

The dual of a valid identity is also valid. This principle doubles the number of useful theorems in Boolean algebra.

**Example:** The dual of A + 0 = A (identity law) is A · 1 = A.

#### Duty Cycle

The percentage of time a periodic signal is in the high state.

Duty cycle affects power and behavior in certain applications. A 50% duty cycle means equal high and low times.

**Example:** A clock with 30ns high time and 70ns low time has a 30% duty cycle.

#### Dynamic Hazard

A hazard where multiple output transitions occur during a single input change.

Dynamic hazards appear in multi-level logic circuits. They produce oscillations rather than a single glitch.

**Example:** An output intended to stay at 1 might transition 1→0→1→0→1 due to unequal path delays.

#### Edge Triggered

A flip-flop that samples input only at the moment of a clock transition.

Edge triggering eliminates the transparency problems of latches. Changes at other times have no effect on the output.

**Example:** A positive-edge-triggered D flip-flop ignores D changes except at the exact instant of the clock's rising edge.

#### Enable Signal

A control input that allows or prevents a circuit operation.

Enable signals gate clock inputs, data loads, or output drives. When disabled, the circuit typically holds its current state.

**Example:** A register with EN=0 ignores load commands and retains its stored value.

#### Encoder

A combinational circuit that produces a binary code corresponding to its active input.

Encoders compress one-hot inputs to binary codes. They are the inverse of decoders and require priority handling when multiple inputs are active.

**Example:** An 8-to-3 encoder with input 5 active (00100000) outputs binary 101.

#### Equality Comparator

A circuit that determines whether two binary values are equal.

Equality comparators output 1 when A equals B and 0 otherwise. They use XNOR gates to check each bit pair.

**Example:** An 8-bit equality comparator outputs 1 when both inputs are 01101110.

#### Error Detection

A technique for identifying when data has been corrupted during transmission or storage.

Error detection adds redundant bits (like parity) that allow detecting certain error patterns. It does not correct errors.

**Example:** A byte with even parity has a parity bit added so the total number of 1s is even.

#### Essential Prime Implicant

A prime implicant that covers at least one minterm not covered by any other prime implicant.

Essential prime implicants must be included in any minimal cover. Finding them is a key step in K-map simplification.

**Example:** If minterm m5 is covered only by prime implicant AB', then AB' is essential.

#### Factoring

A Boolean simplification technique that extracts common factors from terms.

Factoring applies the distributive law in reverse to reduce gate count or logic levels.

**Example:** WX + WY + WZ factors to W(X + Y + Z), reducing from 3 AND gates to 1 AND and 1 OR.

#### Fall Time

The time for a signal to transition from high to low logic level.

Fall time affects propagation delay and switching speed. It depends on transistor characteristics and load capacitance.

**Example:** A fall time specification of 3ns means the output takes 3ns to fall from 90% to 10% of its swing.

#### Falling Edge

The transition of a digital signal from high to low.

Falling edge-triggered circuits change state at the 1-to-0 transition. The falling edge is also called the negative edge.

**Example:** A negative-edge-triggered flip-flop samples D at the instant the clock transitions from 1 to 0.

#### Fan-In

The number of inputs to a logic gate.

Fan-in affects gate delay and drive capability. Higher fan-in gates are slower and consume more power.

**Example:** A 4-input NAND gate has a fan-in of 4.

#### Fan-Out

The number of gate inputs that a gate output can drive.

Fan-out is limited by the output drive current and input loading. Exceeding fan-out degrades signal quality and timing.

**Example:** If a gate has fan-out of 10, it can reliably drive up to 10 standard gate inputs.

#### Feedback Loop

A signal path from a circuit's output back to its input.

Feedback creates memory by allowing outputs to influence future states. It is essential for sequential circuits but can cause oscillation if uncontrolled.

**Example:** Cross-coupled NAND gates form an SR latch through feedback from each gate's output to the other's input.

#### Finite State Machine

A sequential circuit model with a finite number of states, transitions, and outputs.

FSMs are the primary design model for sequential logic. They can be Moore machines (output depends on state) or Mealy machines (output depends on state and input).

**Example:** A traffic light controller FSM has states like Green, Yellow, Red with timed transitions.

#### Flip-Flop Symbol

The standard graphical representation of a flip-flop in circuit diagrams.

Flip-flop symbols show a rectangle with labeled inputs (D, CLK, RST) and outputs (Q, Q'). Clock inputs have triangular edge indicators.

**Example:** A D flip-flop symbol shows D input on left, Q/Q' outputs on right, and clock with triangle on bottom.

#### FPGA Architecture

The internal structure of an FPGA including logic blocks, routing, and I/O.

FPGA architecture determines capacity, speed, and power characteristics. Understanding it helps optimize designs for the target device.

**Example:** Xilinx 7-series FPGAs contain CLBs with LUT6 elements, flip-flops, and carry chains.

#### FPGA Flip-Flop

A configurable storage element within an FPGA logic block.

FPGA flip-flops are typically D-type with optional clock enable, set, and reset. They work with LUTs to implement sequential logic.

**Example:** Each Xilinx CLB slice contains 8 flip-flops that can be used for registers and state storage.

#### FPGA Implementation

The process of mapping, placing, and routing a design onto an FPGA.

Implementation transforms synthesized netlists to bitstreams that configure FPGA resources. It includes optimization and timing closure.

**Example:** Running Vivado implementation converts Verilog to a bitfile that programs the FPGA.

#### FPGA LUT

A look-up table that implements combinational logic by storing truth table values.

FPGA LUTs can implement any Boolean function of their inputs. Modern FPGAs typically use 6-input LUTs.

**Example:** A LUT6 stores 64 bits representing all outputs for a 6-input function like F = ABC + DEF.

#### FPGA Routing

The programmable interconnection resources that connect logic blocks in an FPGA.

Routing resources consume significant FPGA area and affect timing. Congestion can prevent timing closure.

**Example:** Switch boxes and routing channels connect LUT outputs to flip-flop inputs across the FPGA fabric.

#### FSM Design Process

The systematic procedure for designing finite state machines from specifications.

The process includes: define states, draw state diagram, create state table, choose encoding, derive next-state and output equations, implement with flip-flops.

**Example:** Designing a coin-operated lock: identify states, transitions for correct/wrong combinations, output to unlock.

#### FSM State

A distinct condition of a finite state machine representing stored information.

Each FSM state corresponds to a unique flip-flop combination. States represent what the machine "remembers" about input history.

**Example:** A vending machine FSM has states for 0¢, 25¢, 50¢, 75¢ representing accumulated payment.

#### FSM Verification

The process of ensuring a finite state machine correctly implements its specification.

Verification checks all state transitions, outputs, and edge cases. It uses simulation, formal verification, and test vectors.

**Example:** Testing a sequence detector by applying all possible input patterns and checking outputs.

#### Full Adder

A combinational circuit that adds three input bits and produces a sum and carry output.

Full adders handle the carry from a previous stage, enabling multi-bit addition. They chain together to form ripple-carry adders.

**Example:** A full adder with inputs A=1, B=1, Cin=1 produces Sum=1 and Cout=1.

#### Functional Completeness

The property of a gate set being able to implement any Boolean function.

A functionally complete set can express all possible logic functions. NAND alone and NOR alone are each functionally complete.

**Example:** Any circuit can be built using only NAND gates because NAND is functionally complete.

#### Functional Verification

Verification that a design produces correct outputs for all valid inputs.

Functional verification ignores timing and focuses on logical correctness. It typically uses simulation with comprehensive test vectors.

**Example:** Verifying an ALU produces correct results for all opcodes across a range of operand values.

#### Gate Delay

The time for a signal change to propagate through a single logic gate.

Gate delay limits circuit speed and causes timing hazards. It varies with gate type, technology, and loading.

**Example:** A NAND gate with 2ns delay produces its output 2ns after inputs change.

#### Gate Symbol

The standardized graphical shape representing a logic gate in schematics.

Gate symbols convey function at a glance. Different standards (ANSI, IEEE, IEC) use different shapes.

**Example:** The AND gate uses a flat-backed D shape; OR uses a curved back with pointed output.

#### Gate-Level Design

Creating circuits by interconnecting individual logic gates.

Gate-level design is the lowest abstraction above transistors. It maps directly to physical implementation.

**Example:** Drawing an XOR gate as two ANDs, two inverters, and an OR gate connected together.

#### Gate-Level Verilog

Verilog code that explicitly instantiates primitive gate components.

Gate-level modeling directly represents the physical circuit structure. It is generated by synthesis tools or used for small designs.

**Example:** `and g1(y, a, b);` instantiates a 2-input AND gate with output y and inputs a, b.

#### Gated SR Latch

An SR latch with an enable input that controls when changes can occur.

The gate (enable) input prevents state changes when low, providing a form of clock control. It is a precursor to flip-flops.

**Example:** A gated SR latch with E=0 ignores S and R inputs, holding its current Q value.

#### Gray Code

A binary code where consecutive values differ by exactly one bit.

Gray code eliminates multi-bit transitions, preventing glitches in position encoders and reducing errors in asynchronous domain crossings.

**Example:** 3-bit Gray code sequence: 000, 001, 011, 010, 110, 111, 101, 100.

#### Gray Code Encoding

Using Gray code values to represent FSM states.

Gray encoding ensures only one flip-flop changes per transition, reducing power and glitches. It is useful for asynchronous interfaces.

**Example:** A 4-state FSM using Gray encoding: S0=00, S1=01, S2=11, S3=10.

#### Half Adder

A combinational circuit that adds two input bits and produces a sum and carry.

Half adders handle single-bit addition without an incoming carry. They serve as the first stage of ripple-carry adders.

**Example:** A half adder with A=1 and B=1 produces Sum=0 and Carry=1.

#### Hardware-Software Boundary

The interface between hardware logic and software processing in a digital system.

The boundary determines what functionality is implemented in FPGA/ASIC versus processor code. It affects performance, flexibility, and development time.

**Example:** Video decompression in hardware for speed, user interface in software for flexibility.

#### Hazard

A momentary incorrect output caused by unequal propagation delays in a circuit.

Hazards create glitches that can cause problems in asynchronous circuits or when outputs directly drive state machines.

**Example:** An output that should remain at 1 glitches to 0 briefly due to different path delays.

#### Hazard-Free Design

Circuit design techniques that eliminate or mask unwanted glitches.

Hazard elimination adds redundant terms to cover transition boundaries. Hazard-free design is critical for asynchronous circuits.

**Example:** Adding term AC to F = AB + B'C eliminates the hazard when B transitions.

#### HDL vs Programming

The distinction between hardware description languages and software programming languages.

HDLs describe hardware structure and behavior; they do not execute sequentially. Understanding this difference is critical for digital designers.

**Example:** In Verilog, two always blocks execute concurrently, unlike sequential function calls in C.

#### Hex to Binary Conversion

Converting hexadecimal digits to their 4-bit binary equivalents.

Each hex digit directly maps to 4 binary bits, making conversion straightforward. This is faster than decimal conversion.

**Example:** Hex A3 converts to binary 1010 0011 (A=1010, 3=0011).

#### Hexadecimal Numbers

A base-16 number system using digits 0-9 and letters A-F.

Hexadecimal provides a compact representation of binary values. Each hex digit represents exactly 4 bits.

**Example:** The 8-bit binary 11101010 is written as hex EA.

#### Hierarchical Design

Organizing complex systems as nested modules at multiple abstraction levels.

Hierarchical design enables divide-and-conquer approaches, code reuse, and team collaboration. Each module has defined interfaces.

**Example:** A CPU module contains submodules for ALU, registers, and control, each defined separately.

#### Hold Time

The minimum time a flip-flop input must remain stable after the clock edge.

Hold violations cause data to be captured incorrectly. They typically result from fast paths between flip-flops.

**Example:** With a hold time of 0.5ns, the D input must remain stable for 0.5ns after the clock edge.

#### Idempotent Law

A Boolean law stating that applying an operation to identical operands yields the same operand.

The idempotent law gives: A + A = A and A · A = A. It eliminates redundant terms in expressions.

**Example:** In X + X + X, the idempotent law reduces this to simply X.

#### Identity Law

A Boolean law stating that a variable combined with the identity element remains unchanged.

For OR, the identity is 0: A + 0 = A. For AND, the identity is 1: A · 1 = A.

**Example:** X AND 1 = X, so ANDing with 1 has no effect on the value.

#### IEEE Gate Symbols

Logic gate symbols following IEEE/IEC 60617 standard using rectangular shapes.

IEEE symbols use rectangles with function indicators (& for AND, ≥1 for OR). They differ from the curved ANSI symbols.

**Example:** An IEEE AND gate is a rectangle with "&" inside and inputs on the left.

#### If-Else in Verilog

A conditional construct for selecting between alternatives in procedural blocks.

If-else statements model priority encoders and conditional logic. Incomplete coverage can infer latches.

**Example:** `if (sel) y = a; else y = b;` implements a 2-to-1 multiplexer.

#### Implicant Cover

A set of product terms whose OR equals a Boolean function.

Finding a minimal cover (fewest terms) is the goal of logic minimization. K-maps and Quine-McCluskey find minimum covers.

**Example:** For F = Σ(0,1,2,3), the cover {A'B', A'B, AB', AB} reduces to just {1}.

#### Initial Block

A Verilog procedural block that executes once at time zero.

Initial blocks set up testbench conditions and are not synthesizable. They initialize signals and launch stimulus generation.

**Example:** `initial begin clk = 0; reset = 1; #10 reset = 0; end`

#### Inout Port

A Verilog port declaration for bidirectional signals.

Inout ports connect to tri-state drivers for bus interfaces. They require careful handling to avoid driver conflicts.

**Example:** `inout wire [7:0] data_bus;` declares an 8-bit bidirectional bus.

#### Input Port

A Verilog port that receives signals from outside the module.

Input ports are read-only within the module. They connect to wires or expressions in instantiating modules.

**Example:** `input wire clk, reset;` declares clock and reset as input signals.

#### Invalid State Problem

The condition in an SR latch where both set and reset are active simultaneously.

When S=R=1, an SR latch produces Q=Q'=0, violating the complementary relationship. This state is forbidden.

**Example:** An SR latch with S=1, R=1 followed by S=0, R=0 produces an unpredictable output.

#### JK Flip-Flop

A flip-flop with J and K inputs that provides set, reset, hold, and toggle functions.

The JK flip-flop eliminates the invalid state of SR latches. When J=K=1, it toggles on each clock edge.

**Example:** JK flip-flop: J=0,K=0 holds; J=1,K=0 sets; J=0,K=1 resets; J=1,K=1 toggles.

#### JK Toggle Mode

The operating mode of a JK flip-flop when both J and K are high.

Toggle mode inverts the output on each clock edge. It enables frequency division and counter design.

**Example:** A JK flip-flop with J=K=1 toggles: 0→1→0→1 on successive clock edges.

#### Johnson Counter

A shift register counter that produces overlapping decoded outputs.

A Johnson (twisted ring) counter shifts inverted feedback, creating 2n states from n flip-flops. States are easily decoded.

**Example:** A 4-bit Johnson counter sequences: 0000, 1000, 1100, 1110, 1111, 0111, 0011, 0001, 0000...

#### K-Map 2 Variable

A Karnaugh map with 4 cells for minimizing 2-variable Boolean functions.

The 2x2 grid arranges cells by Gray code ordering. Adjacent cells differ by one variable.

**Example:** A 2-variable K-map has cells for A'B', A'B, AB', AB arranged in a 2x2 square.

#### K-Map 3 Variable

A Karnaugh map with 8 cells for minimizing 3-variable Boolean functions.

The 2x4 grid maintains adjacency including wraparound. Groups of 1, 2, 4, or 8 cells form simplified terms.

**Example:** A 3-variable K-map covers minterms m0-m7 in cells arranged by Gray code for AB (columns) and C (rows).

#### K-Map 4 Variable

A Karnaugh map with 16 cells for minimizing 4-variable Boolean functions.

The 4x4 grid provides adjacency in both dimensions with wraparound. It is the largest K-map size commonly used manually.

**Example:** A 4-variable K-map arranges 16 minterms by Gray code for AB (rows) and CD (columns).

#### K-Map Grouping Rules

The rules for forming valid groups of cells in a Karnaugh map.

Groups must be rectangular, contain 2^n cells, and include only 1s (for SOP) or 0s (for POS). Larger groups yield simpler terms.

**Example:** Valid groups are 1, 2, 4, 8, or 16 cells. Groups can wrap around edges and corners.

#### Karnaugh Map

A graphical method for simplifying Boolean expressions using a grid of cells.

K-maps arrange minterms so adjacent cells differ by one variable. Grouping adjacent 1s visually identifies simplified product terms.

**Example:** In a K-map, grouping four adjacent cells eliminates two variables from the product term.

#### Latch Timing Problem

Difficulties arising from the level-sensitive behavior of latches.

Transparent latches allow input changes to propagate during enable, causing race conditions and timing unpredictability.

**Example:** A D latch enabled during logic changes may capture an intermediate value rather than the intended final value.

#### LED Indicator

A light-emitting diode used to display digital output states.

LEDs provide visual feedback for debugging and status display. They require current-limiting resistors to prevent damage.

**Example:** An FPGA output drives an LED through a 220Ω resistor to indicate when a signal is high.

#### Level Sensitive

Storage element behavior where output tracks input while enable is active.

Level-sensitive latches are transparent when enabled. Changes at input pass directly to output without waiting for a clock edge.

**Example:** A D latch with enable high shows any D changes immediately at Q.

#### Load Signal

A control input that commands a register to capture new data.

Load signals, when asserted with the clock, cause registers to store the value at their data inputs. Otherwise the register holds its value.

**Example:** With LD=1, a register captures input data on the clock edge; with LD=0, it retains its value.

#### Logic Analyzer

A test instrument that captures and displays multiple digital signals over time.

Logic analyzers show timing relationships between signals and can decode protocols. They are essential for debugging digital systems.

**Example:** A 16-channel logic analyzer captures SPI bus transactions showing clock, data, and chip select timing.

#### Logic Family

A group of integrated circuits with compatible electrical characteristics.

Logic families (TTL, CMOS, etc.) define voltage levels, speed, and power characteristics. Interfacing between families may require level conversion.

**Example:** 74HC series is a CMOS logic family compatible with TTL input levels.

#### Logic Gate

A fundamental circuit element that implements a Boolean operation.

Logic gates are the building blocks of digital circuits. They combine to form all digital functions from simple AND to complex processors.

**Example:** A NAND gate implements the function Y = (AB)', outputting 0 only when both inputs are 1.

#### Logic Levels

The defined voltage ranges representing logic 0 and logic 1.

Logic levels specify valid high and low voltage ranges. The gap between them provides noise margin.

**Example:** 3.3V CMOS defines logic low as 0-0.8V and logic high as 2.0-3.3V.

#### Logic Minimization

The process of reducing a Boolean expression to fewer terms or literals.

Minimization reduces gate count, improving cost, speed, and power. K-maps and Quine-McCluskey are common methods.

**Example:** F = AB + AB' + A'B minimizes to F = A + A'B = A + B.

#### Logic Probe

A simple test tool that indicates the logic level at a circuit point.

Logic probes show high, low, or pulsing conditions. They provide quick verification without complex instruments.

**Example:** Touching a logic probe to a clock pin shows a blinking LED indicating oscillation.

#### Magnitude Comparator

A circuit that determines whether A is greater than, less than, or equal to B.

Magnitude comparators produce three outputs (A>B, A<B, A=B) for complete ordering. They cascade for wider comparisons.

**Example:** A 4-bit magnitude comparator outputs A>B=1 when A=1010 and B=0111.

#### Master-Slave Flip-Flop

A flip-flop constructed from two latches where one captures while the other holds.

The master latch captures input during one clock phase while the slave latch output remains stable. Roles swap on the clock edge.

**Example:** In a master-slave D flip-flop, the master captures D when CLK is high; the slave updates Q when CLK falls.

#### Maxterm

A sum term in which each variable appears exactly once in true or complemented form.

Maxterms are the product-of-sums equivalent of minterms. A maxterm equals 0 for exactly one input combination.

**Example:** For 3 variables ABC, maxterm M5 (for 101) is A'+B+C' = 0 only when A=1, B=0, C=1.

#### Mealy Machine

A finite state machine whose outputs depend on both current state and current inputs.

Mealy machines can react faster than Moore machines because outputs can change immediately with inputs, not just at state transitions.

**Example:** A Mealy sequence detector outputs 1 as soon as the final pattern bit arrives, not on the next clock.

#### Mealy Output

An FSM output that depends on both current state and current inputs.

Mealy outputs can change asynchronously with inputs within a clock cycle. They enable faster response but may have glitches.

**Example:** In a Mealy machine, output Z = state × input means Z can change when input changes, even mid-cycle.

#### Memory Element

A circuit capable of storing one bit of information.

Memory elements form the foundation of sequential logic. They retain their state until explicitly changed by inputs or power loss.

**Example:** A D flip-flop is a memory element that stores one bit, captured on each clock edge.

#### Metastability

An unstable intermediate state when a flip-flop samples a transitioning input.

Metastability produces an unpredictable output that takes random time to resolve. It occurs when setup/hold times are violated.

**Example:** Sampling an asynchronous signal may cause the flip-flop output to hover between 0 and 1 momentarily.

#### Minimal Form

A Boolean expression with the fewest possible terms and literals.

Minimal forms reduce implementation cost. They are found through K-maps, Quine-McCluskey, or synthesis tools.

**Example:** F = AB + AB' + A'B has minimal form F = A + B.

#### Minimal POS

The simplified product-of-sums form of a Boolean function.

Minimal POS is derived by grouping 0s in a K-map. It may use fewer gates than minimal SOP for some functions.

**Example:** F(A,B,C) with 0s at m0,m2,m4 has minimal POS form (A+B)(A+C).

#### Minimal SOP

The simplified sum-of-products form of a Boolean function.

Minimal SOP has the fewest possible product terms. It is derived by grouping 1s in a K-map.

**Example:** F = A'BC + AB'C + ABC' + ABC minimizes to F = AC + BC + AB.

#### Minterm

A product term in which each variable appears exactly once in true or complemented form.

Minterms correspond to single rows in a truth table. A minterm equals 1 for exactly one input combination.

**Example:** For 3 variables ABC, minterm m5 (for 101) is AB'C.

#### Mod-N Counter

A counter that cycles through exactly N states before repeating.

Mod-N counters divide frequency by N. They use N states regardless of the number of flip-flops.

**Example:** A mod-6 counter counts 0,1,2,3,4,5,0,1,2,3,4,5... using 3 flip-flops.

#### Module Definition

The Verilog construct that encapsulates a design unit with ports and internal logic.

Modules define interface (ports) and implementation (statements). They are the basic unit of hierarchy in Verilog.

**Example:** `module adder(input a, b, output sum, cout);` begins a 1-bit adder module definition.

#### Module Instantiation

Creating an instance of a module within another module in Verilog.

Instantiation connects module ports to signals in the parent module. It enables hierarchical design and component reuse.

**Example:** `adder u1(.a(x), .b(y), .sum(s), .cout(c));` instantiates adder module u1.

#### Moore Machine

A finite state machine whose outputs depend only on the current state.

Moore machine outputs are associated with states, not transitions. They change only when state changes, providing more predictable timing.

**Example:** A Moore traffic light controller output (Green/Yellow/Red) depends only on which state it's in.

#### Moore Output

An FSM output that depends solely on the current state.

Moore outputs are stable throughout a state and change only with state transitions. This simplifies timing analysis.

**Example:** In a Moore FSM, output Z is assigned to states, so Z only changes at clock edges when state changes.

#### MTBF Concept

Mean Time Between Failures, used to quantify metastability risk.

MTBF for synchronizers depends on clock frequency, data rate, and flip-flop characteristics. Higher MTBF means better reliability.

**Example:** A synchronizer with MTBF of 100 years is expected to fail from metastability once per century on average.

#### Multi-Level Logic

Logic circuits with more than two levels of gates between inputs and outputs.

Multi-level logic trades delay for reduced gate count. It can implement complex functions more efficiently than two-level forms.

**Example:** F = (A + B)(C + D) is two-level; F = ((A + B) · C) + D is three-level.

#### Multiplexer

A combinational circuit that selects one of multiple inputs to pass to the output.

Multiplexers route data based on select signals. An n-input MUX requires log2(n) select lines.

**Example:** A 4-to-1 MUX with select=10 passes input I2 to output Y.

#### MUX 2-to-1

A multiplexer that selects between two inputs based on one select line.

The simplest multiplexer, 2-to-1 MUX outputs I0 when S=0 and I1 when S=1.

**Example:** `assign y = sel ? i1 : i0;` implements a 2-to-1 MUX in Verilog.

#### MUX 4-to-1

A multiplexer that selects one of four inputs based on a 2-bit select code.

A 4-to-1 MUX uses two select bits to choose among I0-I3.

**Example:** MUX 4-to-1 with S1S0=10 outputs I2.

#### MUX 8-to-1

A multiplexer that selects one of eight inputs based on a 3-bit select code.

An 8-to-1 MUX uses three select bits to choose among I0-I7.

**Example:** MUX 8-to-1 with S2S1S0=101 outputs I5.

#### MUX as Logic Function

Using a multiplexer to implement any Boolean function directly.

A 2^n-to-1 MUX with variables on select lines and constants on data inputs implements an n-variable function without other gates.

**Example:** A 4-to-1 MUX implements F(A,B) by connecting truth table outputs to data inputs and AB to select.

#### MUX Tree

A cascade of multiplexers used to select from many inputs.

MUX trees build large multiplexers from smaller ones. They enable efficient implementation of wide select functions.

**Example:** Two 4-to-1 MUXes feeding a 2-to-1 MUX create an 8-to-1 MUX tree.

#### NAND Gate

A logic gate that outputs 0 only when all inputs are 1.

NAND implements the complement of AND. It is functionally complete, meaning any circuit can be built from NAND gates alone.

**Example:** A 2-input NAND with A=1, B=1 outputs Y=0; any other input combination outputs Y=1.

#### NAND-Only Design

Implementing a circuit using exclusively NAND gates.

Since NAND is functionally complete, any Boolean function can be realized with NAND gates only. This simplifies manufacturing.

**Example:** An inverter using NAND: connect both inputs of a 2-input NAND together.

#### Negedge Keyword

The Verilog keyword specifying sensitivity to falling clock edges.

Negedge triggers always blocks on the 1-to-0 transition, enabling negative-edge-triggered sequential logic.

**Example:** `always @(negedge clk) q <= d;` creates a falling-edge-triggered flip-flop.

#### Negative Edge Triggered

A flip-flop that samples input at the falling clock transition.

Negative edge triggering uses the 1-to-0 clock transition as the sampling point.

**Example:** A negative-edge D flip-flop captures D when clock falls from 1 to 0.

#### Next State

The state a sequential circuit will enter on the next clock edge.

Next state is computed from current state and inputs. Next-state logic is the combinational circuitry that determines it.

**Example:** In state S1 with input X=1, the next state might be S3 based on state transition rules.

#### Next State Equation

A Boolean equation defining the next-state value for each flip-flop.

Next-state equations drive flip-flop D inputs. They implement the state transition table in combinational logic.

**Example:** For a 2-bit counter, D1 = Q1 XOR Q0 (next state of bit 1 depends on current state).

#### Next State Logic

The combinational circuit that computes the next state from current state and inputs.

Next-state logic implements the state transition function. Its complexity depends on encoding and FSM structure.

**Example:** In a Moore FSM, next-state logic takes current state flip-flop outputs and inputs to produce D inputs.

#### Noise Margin

The voltage difference between worst-case output and worst-case input thresholds.

Larger noise margins provide better immunity to electrical interference. They define how much noise a signal can tolerate.

**Example:** If output-low max is 0.4V and input-low max is 0.8V, the low noise margin is 0.4V.

#### Non-Blocking Assignment

A Verilog procedural assignment (<=) that schedules updates for the end of the time step.

Non-blocking assignments model synchronous register transfers. All right-hand sides are evaluated before any updates occur.

**Example:** `a <= b; b <= a;` swaps a and b because both read old values before updating.

#### Non-Overlapping Detection

A sequence detection mode where a pattern cannot share bits with the next instance.

Non-overlapping detectors reset fully after finding a pattern. The detector must see an entirely new pattern before triggering again.

**Example:** Detecting "101" non-overlapping in "10101" triggers only once, not twice.

#### Non-Synthesizable Code

Verilog constructs that cannot be converted to hardware by synthesis tools.

Delays, initial blocks, and $display are simulation-only. Using them in synthesizable code causes errors or is ignored.

**Example:** `#10 x = 1;` is non-synthesizable because hardware cannot implement arbitrary time delays.

#### NOR Gate

A logic gate that outputs 1 only when all inputs are 0.

NOR implements the complement of OR. Like NAND, it is functionally complete.

**Example:** A 2-input NOR with A=0, B=0 outputs Y=1; any input being 1 outputs Y=0.

#### NOR-Only Design

Implementing a circuit using exclusively NOR gates.

NOR gates alone can implement any Boolean function. This provides manufacturing flexibility similar to NAND-only design.

**Example:** An inverter using NOR: connect both inputs of a 2-input NOR together.

#### NOT Gate

A logic gate that outputs the complement of its input.

NOT implements logical negation. It is also called an inverter.

**Example:** A NOT gate with input A=1 outputs Y=0.

#### NOT Operation

A Boolean operation that inverts its operand.

NOT is a unary operation returning the complement: 0 becomes 1, 1 becomes 0.

**Example:** NOT 1 = 0; NOT 0 = 1.

#### Null Law

A Boolean law stating that combining a variable with a null element yields the null element.

For OR with 1 (null for OR): A + 1 = 1. For AND with 0 (null for AND): A · 0 = 0.

**Example:** X OR 1 always equals 1, regardless of X.

#### Octal Numbers

A base-8 number system using digits 0-7.

Octal groups binary digits in threes, providing more compact notation than binary. It was historically important but less common than hexadecimal today.

**Example:** Binary 110100 is octal 64 (110=6, 100=4).

#### One-Hot Encoding

A state encoding method using one flip-flop per state, with exactly one flip-flop active.

One-hot simplifies state decoding and next-state logic at the cost of more flip-flops. It is often efficient in FPGAs.

**Example:** A 4-state FSM uses 4 flip-flops: S0=0001, S1=0010, S2=0100, S3=1000.

#### OR Gate

A logic gate that outputs 1 when any input is 1.

The OR gate implements logical disjunction. Its output is 0 only when all inputs are 0.

**Example:** A 2-input OR with A=0, B=1 outputs Y=1.

#### OR Operation

A Boolean operation that yields true when any operand is true.

The OR operation is fundamental to Boolean algebra, corresponding to logical disjunction and addition in Boolean algebra.

**Example:** In the expression F = A + B, F equals 1 when A or B (or both) equal 1.

#### Output Equation

A Boolean equation defining FSM outputs as a function of state (and inputs for Mealy).

Output equations implement the output function. Moore outputs depend only on state; Mealy outputs also use inputs.

**Example:** For a Moore machine, output Z = Q1 AND Q0' means Z is high in state 01.

#### Output Logic

The combinational circuit that generates FSM outputs from state (and inputs).

Output logic produces external signals based on internal state. Its complexity depends on the number and nature of outputs.

**Example:** A traffic light controller's output logic decodes state bits to drive red, yellow, and green lights.

#### Output Port

A Verilog port that sends signals outside the module.

Output ports can be wire (continuous) or reg (procedural) type depending on how they are driven.

**Example:** `output reg [7:0] data_out;` declares an 8-bit output driven by procedural statements.

#### Overflow Detection

Identifying when an arithmetic result exceeds the representable range.

Overflow in two's complement occurs when the sign of the result is incorrect. It is detected by comparing carry-in and carry-out of the MSB.

**Example:** Adding 0111 (7) + 0001 (1) = 1000 (-8 in two's complement) overflows because positive + positive = negative.

#### Overflow in Addition

The condition when the sum of two numbers exceeds the bit width's representable range.

Unsigned overflow is detected by carry-out; signed overflow requires comparing carries into and out of the sign bit.

**Example:** 8-bit unsigned addition of 255 + 1 = 0 with overflow.

#### Parallel In Parallel Out

A register configuration where all bits are loaded and read simultaneously.

PIPO registers provide simple storage with parallel access. They form the basis for CPU registers and data latches.

**Example:** A PIPO register loads 8 bits on one clock edge and makes all 8 available simultaneously.

#### Parallel In Serial Out

A shift register configuration that loads parallel data and shifts it out serially.

PISO registers convert parallel data to serial format for transmission. They are essential for serial communication transmitters.

**Example:** A PISO register loads a byte, then shifts out one bit per clock for serial transmission.

#### Parallel Load Register

A register that captures all input bits simultaneously on the active clock edge.

Parallel load registers store data words for processing. An enable or load signal controls when updates occur.

**Example:** An 8-bit parallel load register captures D[7:0] when LOAD is asserted at the clock edge.

#### Parameter

A Verilog constant that makes modules configurable at instantiation.

Parameters allow reusable modules with different bit widths, delay values, or other configurable aspects.

**Example:** `module counter #(parameter WIDTH = 8)` creates a counter with configurable bit width.

#### Parity Bit

An extra bit added to data to make the total number of 1s even or odd.

Parity provides single-bit error detection. Even parity makes the total count of 1s even; odd parity makes it odd.

**Example:** Data 1011 with even parity adds 1, giving 10111 (four 1s, which is even).

#### Parity Checker

A circuit that verifies whether received data maintains correct parity.

Parity checkers XOR all bits including the parity bit. For even parity, the result should be 0 if no errors occurred.

**Example:** Checking 10111 with even parity: XOR all bits = 0, indicating no detectable error.

#### Parity Generator

A circuit that computes the parity bit for a data word.

Parity generators XOR all data bits to produce a parity bit that achieves the desired even or odd parity.

**Example:** For data 1011 with even parity, the generator produces 1 (since 1 XOR 0 XOR 1 XOR 1 = 1).

#### Pattern Recognition FSM

A finite state machine designed to detect specific input sequences.

Pattern recognition FSMs track progress through a target sequence, triggering an output when the pattern completes.

**Example:** An FSM detecting "1101" has states tracking how much of the pattern has been seen.

#### Pin Assignment

Mapping design signals to specific physical FPGA pins.

Pin assignment considers I/O standards, voltage banks, timing, and PCB layout. Constraints specify these mappings.

**Example:** `set_property PACKAGE_PIN W5 [get_ports clk]` assigns the clock to pin W5.

#### Port Declaration

Specifying the direction and type of module interface signals in Verilog.

Port declarations define how modules communicate. They specify input, output, or inout direction and optionally width.

**Example:** `input wire [7:0] data, output reg valid` declares ports with different types and widths.

#### Posedge Keyword

The Verilog keyword specifying sensitivity to rising clock edges.

Posedge triggers always blocks on the 0-to-1 transition, enabling positive-edge-triggered sequential logic.

**Example:** `always @(posedge clk)` executes the block contents on each rising clock edge.

#### Positive Edge Triggered

A flip-flop that samples input at the rising clock transition.

Positive edge triggering is the most common clocking scheme. Inputs are captured when clock rises from 0 to 1.

**Example:** A positive-edge D flip-flop captures D when clock rises from 0 to 1.

#### Preset Input

A flip-flop control signal that forces the output to 1.

Preset inputs initialize flip-flops to the set state. They can be synchronous or asynchronous.

**Example:** A flip-flop with asynchronous preset goes to Q=1 immediately when PRE is asserted.

#### Prime Implicant

A product term that covers one or more minterms and cannot be further combined.

Prime implicants are the largest possible groups in a K-map. They form the candidate terms for minimal covers.

**Example:** In a 3-variable K-map, covering m3 and m7 produces prime implicant BC.

#### Priority Encoder

An encoder that outputs the code for the highest-priority active input.

When multiple inputs are active, priority encoders select one based on predetermined ranking. They include a valid output.

**Example:** A 4-to-2 priority encoder with inputs 0110 outputs 10 (for I2, the highest active input).

#### Product of Sums

A Boolean expression format as an AND of OR terms.

POS form consists of maxterms or simplified sum terms ANDed together. It is the dual of sum-of-products.

**Example:** F = (A+B)(A+C)(B'+C) is in product-of-sums form.

#### Propagation Delay

The time from an input change until the corresponding output change.

Propagation delay limits circuit speed. It includes both gate delays and routing delays.

**Example:** A gate with 5ns propagation delay shows output changes 5ns after input changes.

#### Quine-McCluskey Method

An algorithmic approach to finding minimal Boolean expressions.

Quine-McCluskey systematically finds all prime implicants and selects a minimal cover. It works for any number of variables.

**Example:** For a 5-variable function too large for K-maps, Quine-McCluskey finds the minimal expression.

#### Race Condition

A situation where circuit behavior depends on which signal changes first.

Race conditions cause unpredictable results in asynchronous circuits. Proper synchronous design eliminates races.

**Example:** In an SR latch, releasing S and R simultaneously can produce different results depending on slight timing differences.

#### Reg Data Type

A Verilog data type for signals assigned in procedural blocks.

Reg variables hold values between assignments. Despite the name, they don't always imply registers—they can model combinational logic.

**Example:** `reg [7:0] count;` declares an 8-bit variable for procedural assignment.

#### Register

A group of flip-flops that store a multi-bit value.

Registers hold data words for processing. They include control inputs like load, clear, and clock enable.

**Example:** An 8-bit register stores one byte of data, updated on clock edges when load is enabled.

#### Register File

An array of registers with address-based read and write access.

Register files provide fast, multi-port storage for CPU architectures. They typically support multiple simultaneous reads.

**Example:** A 32x32 register file stores 32 registers of 32 bits each, with two read ports and one write port.

#### Register Transfer Level

A design abstraction describing data movement between registers through combinational logic.

RTL is the primary design level for synthesizable digital circuits. It describes what happens each clock cycle.

**Example:** RTL statement "R1 ← R2 + R3" means register 1 receives the sum of registers 2 and 3.

#### Ring Counter

A shift register where the output feeds back to the input in a ring.

Ring counters have n states for n flip-flops. They require initialization and produce decoded outputs directly.

**Example:** A 4-bit ring counter sequences: 1000, 0100, 0010, 0001, 1000...

#### Ripple Carry Adder

A multi-bit adder built by cascading full adders.

The carry output of each stage feeds the carry input of the next. Delay increases linearly with bit width.

**Example:** A 4-bit ripple carry adder chains four full adders, with total delay of 4 × (carry propagation delay).

#### Rise Time

The time for a signal to transition from low to high logic level.

Rise time affects propagation delay and signal integrity. Fast rise times reduce delay but may increase noise.

**Example:** A rise time of 2ns means output takes 2ns to rise from 10% to 90% of its swing.

#### Rising Edge

The transition of a digital signal from low to high.

Rising edge-triggered circuits change state at the 0-to-1 transition. The rising edge is also called the positive edge.

**Example:** A positive-edge-triggered flip-flop samples D at the instant the clock transitions from 0 to 1.

#### RTL Notation

A symbolic notation for describing register transfers and operations.

RTL notation specifies data movement concisely. Common forms use arrows (←) or assignment operators.

**Example:** "PC ← PC + 1" means the program counter is incremented.

#### RTL Verilog

Verilog code at the register transfer level, suitable for synthesis.

RTL Verilog describes behavior in terms of registers and combinational logic. It avoids non-synthesizable constructs.

**Example:** `always @(posedge clk) if (load) reg_out <= data_in;` is RTL Verilog describing a loadable register.

#### Self-Checking Testbench

A testbench that automatically verifies design outputs against expected values.

Self-checking testbenches compare actual outputs to golden references, reporting errors without manual waveform inspection.

**Example:** `if (actual !== expected) $error("Mismatch at time %t", $time);`

#### Sensitivity List

The list of signals that trigger execution of a Verilog always block.

Sensitivity lists specify when procedural blocks execute. Using @(*) automatically includes all read signals.

**Example:** `always @(a or b or sel)` triggers when a, b, or sel change.

#### Sequence Detector

A finite state machine that identifies specific patterns in an input stream.

Sequence detectors output a signal when a target bit pattern is received. They can use overlapping or non-overlapping detection.

**Example:** A sequence detector for "1011" outputs 1 after receiving that four-bit pattern.

#### Sequential Always

A Verilog always block triggered by clock edges for sequential logic.

Sequential always blocks model flip-flops and registers. They use non-blocking assignments for proper hardware semantics.

**Example:** `always @(posedge clk) q <= d;` describes a D flip-flop.

#### Sequential Logic

Logic circuits whose outputs depend on current inputs and stored state.

Sequential circuits have memory and feedback. Their behavior depends on input history, not just current inputs.

**Example:** A counter is sequential because its output depends on how many clock pulses have occurred.

#### Serial In Parallel Out

A shift register configuration that receives bits serially and outputs them in parallel.

SIPO registers convert serial data streams to parallel format. They are essential for serial communication receivers.

**Example:** A SIPO register receives 8 bits one at a time, then presents all 8 simultaneously.

#### Serial In Serial Out

A shift register configuration that shifts data through sequentially.

SISO registers introduce delay and can form delay lines. Data enters serially and exits serially after n clock cycles.

**Example:** A 4-bit SISO register delays input by 4 clock cycles.

#### Setup Time

The minimum time a flip-flop input must be stable before the clock edge.

Setup time violations cause unreliable data capture. Meeting setup time is critical for correct operation.

**Example:** With a setup time of 2ns, D must be stable at least 2ns before the clock edge.

#### Shift Register

A register that shifts stored bits by one position on each clock.

Shift registers support serial-to-parallel conversion, delay lines, and rotation operations.

**Example:** A 4-bit right-shift register changes 1100 to 0110 on one clock edge.

#### Signal Integrity

The quality of electrical signals in maintaining proper logic levels and timing.

Signal integrity issues include crosstalk, reflections, and power supply noise. They can cause functional failures.

**Example:** A long PCB trace without proper termination may ring, causing false clock edges.

#### Signed Binary Numbers

Binary representation of both positive and negative integers.

Signed binary typically uses two's complement where the MSB indicates sign. Operations work correctly for both signs.

**Example:** In 8-bit two's complement, 11111111 represents -1 and 00000001 represents +1.

#### Simulation

Running a design model to observe behavior without physical implementation.

Simulation verifies functionality before hardware implementation. It uses testbenches to provide stimulus and check responses.

**Example:** Simulating a counter in ModelSim shows waveforms of clock, reset, and count output.

#### Simulation Time

The virtual time tracked during simulation, advanced by delay statements.

Simulation time is controlled by #delay constructs and does not correspond to real time.

**Example:** `#100` in Verilog advances simulation time by 100 time units.

#### SR Latch

A bistable element with set and reset inputs.

The SR latch stores one bit. S=1 sets Q=1, R=1 sets Q=0. The S=R=1 condition is forbidden.

**Example:** An SR latch made from cross-coupled NOR gates has active-high S and R inputs.

#### SR Latch Truth Table

The input-output table showing SR latch behavior.

The truth table shows: S=0,R=0 (hold); S=1,R=0 (set); S=0,R=1 (reset); S=1,R=1 (invalid).

**Example:** SR latch with S=1, R=0: Q becomes 1, Q' becomes 0.

#### Standard Form

A Boolean expression in sum-of-products or product-of-sums format without necessarily using all variables.

Standard forms simplify implementation but may not be unique. They differ from canonical forms which include all variables.

**Example:** F = AB + C is in standard SOP form with the second term having only one variable.

#### State Assignment

Choosing binary codes for FSM states.

State assignment affects next-state logic complexity and power consumption. Options include binary, Gray, and one-hot encoding.

**Example:** Assigning states S0=00, S1=01, S2=11, S3=10 uses Gray code to minimize transitions.

#### State Concept

The internal condition of a sequential circuit that influences its future behavior.

State represents what a circuit "remembers" about its input history. It is stored in flip-flops and determines response to inputs.

**Example:** A traffic light controller's state indicates which light is currently on.

#### State Diagram

A graphical representation of FSM states and transitions.

State diagrams show states as circles and transitions as arrows labeled with conditions. They visualize FSM behavior.

**Example:** A state diagram for a counter shows numbered circles connected by arrows in sequence.

#### State Diagram Notation

The conventions for drawing and labeling state diagrams.

Notation includes state names in circles, transition labels showing input/output (Mealy) or just input (Moore), and Moore outputs inside states.

**Example:** A Mealy transition labeled "X/Z" means on input X, output Z and take this transition.

#### State Encoding

The binary representation chosen for FSM states.

Encoding choices include binary (fewest flip-flops), one-hot (simplest logic), and Gray code (minimum transitions).

**Example:** 8 states need 3 bits with binary encoding but 8 flip-flops with one-hot encoding.

#### State Minimization

Reducing the number of FSM states while preserving input-output behavior.

State minimization combines equivalent states that have identical outputs and transitions. It reduces flip-flops needed.

**Example:** Two states producing identical outputs for all input sequences can be merged into one.

#### State Table

A tabular representation of FSM behavior showing next state and output for each state-input combination.

State tables provide a systematic format for implementing FSMs. They contain current state, input, next state, and output columns.

**Example:** A state table row might show: State=S1, Input=1, NextState=S3, Output=0.

#### State Transition

The change from one FSM state to another.

Transitions occur on clock edges when input conditions are met. They are shown as arrows in state diagrams.

**Example:** In a sequence detector, receiving the correct bit transitions from "matched 2 bits" to "matched 3 bits" state.

#### Static Hazard

A hazard where an output should remain constant but glitches momentarily.

Static hazards occur when two paths to an output have different delays. Adding redundant terms can eliminate them.

**Example:** In F = AB + A'C, changing A when B=C=1 causes a glitch as one term turns off before the other turns on.

#### Stimulus Generation

Creating input patterns to test a design during simulation.

Stimulus generation in testbenches provides inputs that exercise design functionality. It should cover normal and edge cases.

**Example:** `initial begin a = 0; b = 0; #10 a = 1; #10 b = 1; end` generates simple stimulus.

#### Structural Modeling

A Verilog modeling style that explicitly instantiates and connects components.

Structural models describe how modules interconnect. They specify the design hierarchy explicitly.

**Example:** Instantiating AND and OR gates and connecting them with wires is structural modeling.

#### Sum Bit

The lower bit of a binary addition result.

The sum bit of A+B+Cin equals the XOR of the three inputs. It represents the single-bit result of addition.

**Example:** A full adder with A=1, B=1, Cin=0 produces Sum=0.

#### Sum of Products

A Boolean expression format as an OR of AND terms.

SOP form consists of minterms or simplified product terms ORed together. It maps directly to AND-OR circuit implementations.

**Example:** F = AB + A'C + BC is in sum-of-products form.

#### Switch Input

A mechanical switch used to provide digital input signals.

Switch inputs require pull resistors for defined logic levels and debouncing for clean transitions.

**Example:** A push button with a pull-up resistor provides logic 1 when released and logic 0 when pressed.

#### Synchronizer Circuit

A circuit that safely transfers signals between asynchronous clock domains.

Synchronizers reduce metastability risk by allowing time for unstable signals to resolve. They add latency.

**Example:** A two-flop synchronizer delays an asynchronous signal by two clock cycles while resolving metastability.

#### Synchronous Reset

A reset that takes effect only on the active clock edge.

Synchronous resets are easier to time than asynchronous resets but require the clock to be running.

**Example:** `always @(posedge clk) if (reset) q <= 0; else q <= d;` implements synchronous reset.

#### Synchronous System

A digital system where all state changes occur on clock edges.

Synchronous design simplifies timing analysis by ensuring all flip-flops change together. It is the dominant design methodology.

**Example:** A synchronous processor updates all registers on the same clock edge.

#### Synthesis

The process of converting HDL code to a gate-level netlist.

Synthesis tools interpret Verilog behaviorally and produce equivalent logic. The result can be mapped to specific technologies.

**Example:** Synthesizing `assign y = a & b;` produces an AND gate.

#### Synthesizable Code

Verilog constructs that synthesis tools can convert to hardware.

Synthesizable code avoids delays, file I/O, and other simulation-only features. It describes implementable hardware.

**Example:** `always @(posedge clk) count <= count + 1;` is synthesizable as a counter.

#### T Flip-Flop

A flip-flop that toggles its output when the T input is high.

T flip-flops simplify counter design. With T=1, output inverts each clock; with T=0, output holds.

**Example:** A T flip-flop with T=1 changes: Q=0→1→0→1 on successive clock edges.

#### Testbench

A Verilog module that provides stimulus to and observes responses from a design under test.

Testbenches simulate designs by generating inputs and checking outputs. They are not synthesizable.

**Example:** A testbench instantiates a module, generates clock and test vectors, and reports results.

#### Test Vector

A set of input values applied to a circuit for testing.

Test vectors exercise design functionality. Complete testing requires vectors that achieve high coverage of possible behaviors.

**Example:** Test vector A=0,B=1,C=1 applied to an AND gate should produce output 0.

#### Timing Constraint

A specification of required timing relationships in a digital design.

Timing constraints define clock periods, input/output delays, and false paths. They guide synthesis and implementation.

**Example:** `create_clock -period 10 [get_ports clk]` constrains the clock to 100 MHz.

#### Timing Diagram

A graphical display of signal values over time.

Timing diagrams show digital waveforms and their relationships. They verify timing requirements and debug sequential behavior.

**Example:** A timing diagram shows clock, input, and output signals aligned vertically with time on the horizontal axis.

#### Timing Verification

Verification that a design meets timing constraints at all flip-flops.

Timing analysis checks setup and hold times for all paths. Violations must be fixed for reliable operation.

**Example:** Static timing analysis reports slack on every path, flagging negative slack as timing violations.

#### Timing Violation

Failure to meet setup or hold time requirements at a flip-flop.

Timing violations cause unpredictable behavior. Setup violations occur when data arrives too late; hold violations when it changes too early.

**Example:** A path with 12ns delay to a flip-flop with 10ns clock period and 2ns setup time violates setup time.

#### Traffic Light Controller

A common FSM example implementing traffic signal sequencing.

Traffic light controllers demonstrate FSM design with multiple states, timed transitions, and multiple outputs.

**Example:** A traffic light FSM has states for green, yellow, red with timer-based transitions.

#### Transparent Latch

A latch whose output follows its input while enabled.

Transparency allows changes to propagate through immediately. This differs from edge-triggered behavior.

**Example:** A D latch with enable high is transparent: Q changes whenever D changes.

#### Tri-State Buffer

A buffer with an enable input that can disconnect its output.

Tri-state buffers create high-impedance outputs when disabled, allowing multiple drivers on a shared bus.

**Example:** `assign bus = enable ? data : 8'bz;` implements a tri-state buffer in Verilog.

#### Truth Table

A tabular listing of all input combinations and their corresponding outputs.

Truth tables completely specify combinational functions. They serve as specifications for circuit design.

**Example:** A 2-input AND truth table has 4 rows: 00→0, 01→0, 10→0, 11→1.

#### TTL Logic

A logic family using bipolar junction transistors.

TTL (Transistor-Transistor Logic) defined voltage standards still referenced today. It has been largely replaced by CMOS.

**Example:** 74LS series ICs are TTL logic with low-power Schottky technology.

#### Two-Level Logic

Logic circuits with exactly two levels of gates between inputs and outputs.

Two-level logic directly implements SOP (AND-OR) or POS (OR-AND) forms. It minimizes delay but may require many gates.

**Example:** F = AB + CD is two-level: AND gates at level 1, OR gate at level 2.

#### Two's Complement

A method for representing signed integers where negative values are the complement plus one.

Two's complement allows addition/subtraction using the same hardware. The MSB indicates sign (0=positive, 1=negative).

**Example:** In 8-bit two's complement, -5 is represented as 11111011 (invert 00000101 and add 1).

#### Universal Gate

A gate from which all other gates can be constructed.

NAND and NOR are universal gates. Any Boolean function can be implemented using only one type of universal gate.

**Example:** An AND gate is made from a NAND followed by another NAND used as an inverter.

#### Universal Shift Register

A shift register with selectable modes: hold, shift left, shift right, and parallel load.

Universal shift registers combine all shift register functions in one device. A 2-bit mode select chooses the operation.

**Example:** The 74194 is a 4-bit universal shift register with all four modes.

#### Up Counter

A counter that increments its value on each clock cycle.

Up counters increase from 0 toward their maximum value, then wrap to 0. They are the most common counter type.

**Example:** A 4-bit up counter sequences: 0000, 0001, 0010, 0011, ..., 1111, 0000...

#### Up-Down Counter

A counter that can count in either direction based on a control input.

Up-down counters increment or decrement based on a direction signal. They are useful for bidirectional position tracking.

**Example:** With UP=1, counter increments; with UP=0, counter decrements.

#### Vending Machine FSM

A common FSM example implementing a coin-operated dispenser.

Vending machine FSMs track accumulated payment and dispense when sufficient coins are inserted. They demonstrate state-based control.

**Example:** A vending machine FSM has states for 0¢, 25¢, 50¢, with transitions for nickel, dime, quarter inputs.

#### Verilog HDL

A hardware description language for modeling and designing digital systems.

Verilog describes both behavior and structure of digital circuits. It is used for simulation and synthesis.

**Example:** `assign y = a & b;` describes an AND gate in Verilog.

#### Voltage Threshold

The input voltage level at which a gate transitions between logic states.

Threshold voltages define the boundary between high and low inputs. They affect noise margins and switching behavior.

**Example:** A CMOS gate with VDD=3.3V might have a threshold around 1.65V.

#### Waveform Viewer

A software tool that displays signal values over time from simulation.

Waveform viewers show digital and analog traces. They enable visual debugging of timing and logic.

**Example:** GTKWave displays VCD files showing all signals over simulation time.

#### Weighted Codes

Binary codes where each bit position has an assigned weight contributing to the total value.

Weighted codes enable direct arithmetic interpretation. BCD and regular binary are weighted; Gray code is not.

**Example:** BCD uses weights 8-4-2-1, so 0110 represents 6 (0×8 + 1×4 + 1×2 + 0×1).

#### Wire Data Type

A Verilog data type for signals driven by continuous assignments or module outputs.

Wires represent physical connections without storage. They continuously reflect the value of their drivers.

**Example:** `wire [7:0] sum;` declares an 8-bit wire that can be driven by an assign statement.

#### XNOR Gate

A logic gate that outputs 1 when inputs have the same value.

XNOR is the complement of XOR. It functions as an equality detector for two bits.

**Example:** A 2-input XNOR with A=1, B=1 outputs Y=1.

#### XOR Gate

A logic gate that outputs 1 when an odd number of inputs are 1.

XOR (exclusive OR) outputs 1 when inputs differ. It is essential for arithmetic, parity, and comparison circuits.

**Example:** A 2-input XOR with A=1, B=0 outputs Y=1.

#### 2-to-4 Decoder

A decoder that activates one of four outputs based on a 2-bit input.

The 2-to-4 decoder converts 2 binary bits to 4 one-hot outputs. With input 10, output Y2 is active.

**Example:** A 2-to-4 decoder with A1A0=01 asserts output Y1 and deasserts Y0, Y2, Y3.

#### 3-to-8 Decoder

A decoder that activates one of eight outputs based on a 3-bit input.

The 3-to-8 decoder expands 3 binary bits to 8 one-hot outputs. It is commonly used for address decoding.

**Example:** A 3-to-8 decoder with A2A1A0=101 asserts output Y5.

#### 7-Segment Decoder

A circuit that converts a binary code to signals for displaying a digit.

7-segment decoders drive the seven LED segments to show digits 0-9. They take BCD input and output segment enables.

**Example:** BCD input 0111 (7) activates segments a, b, c to display the digit 7.

#### 7-Segment Display

An electronic display using seven LED segments to show digits.

Each segment is labeled a-g. Different combinations display digits 0-9 and some letters.

**Example:** Segments a, b, c, d, e, f lit with g off displays the digit 0.
