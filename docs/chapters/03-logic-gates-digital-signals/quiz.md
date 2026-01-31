# Quiz: Logic Gates and Digital Signals

Test your understanding of logic gates, digital signal properties, and gate characteristics with these questions.

---

#### 1. Which logic gate outputs 1 only when ALL inputs are 1?

<div class="upper-alpha" markdown>
1. OR gate
2. AND gate
3. NAND gate
4. NOR gate
</div>

??? question "Show Answer"
    The correct answer is **B**. The AND gate implements logical conjunction—it outputs 1 only when all inputs are 1. If any input is 0, the output is 0. This corresponds to the Boolean AND operation.

    **Concept Tested:** AND Gate

---

#### 2. What makes NAND and NOR gates "universal"?

<div class="upper-alpha" markdown>
1. They can operate at any voltage level
2. They are faster than other gates
3. Any Boolean function can be implemented using only that gate type
4. They use less power than other gates
</div>

??? question "Show Answer"
    The correct answer is **C**. NAND and NOR gates are called universal (or functionally complete) because any Boolean function can be implemented using only NAND gates or only NOR gates. You can build AND, OR, NOT, and any other gate from NANDs alone or NORs alone.

    **Concept Tested:** Universal Gate

---

#### 3. What is the output of an XOR gate when both inputs are 1?

<div class="upper-alpha" markdown>
1. 1
2. 0
3. Undefined
4. High impedance
</div>

??? question "Show Answer"
    The correct answer is **B**. XOR (exclusive OR) outputs 1 when the inputs are different and 0 when they are the same. With both inputs at 1, they are the same, so the output is 0. XOR can be thought of as a "difference detector."

    **Concept Tested:** XOR Gate

---

#### 4. What is propagation delay in a logic gate?

<div class="upper-alpha" markdown>
1. The time to manufacture the gate
2. The time from input change to output change
3. The maximum operating frequency
4. The power consumption during switching
</div>

??? question "Show Answer"
    The correct answer is **B**. Propagation delay is the time between when an input changes and when the corresponding output change appears. It's a fundamental timing characteristic that limits how fast a circuit can operate and must be considered in timing analysis.

    **Concept Tested:** Propagation Delay

---

#### 5. What is fan-out in digital circuits?

<div class="upper-alpha" markdown>
1. The number of inputs a gate can have
2. The number of gate inputs an output can drive
3. The power dissipation of a gate
4. The speed at which a gate operates
</div>

??? question "Show Answer"
    The correct answer is **B**. Fan-out is the number of gate inputs that one gate output can reliably drive. Exceeding the fan-out limit degrades signal quality and timing. Fan-in, by contrast, is the number of inputs to a gate.

    **Concept Tested:** Fan-Out

---

#### 6. Which gate produces the complement of an OR operation?

<div class="upper-alpha" markdown>
1. AND gate
2. NAND gate
3. NOR gate
4. XOR gate
</div>

??? question "Show Answer"
    The correct answer is **C**. A NOR gate produces the complement of OR: Y = (A + B)'. It outputs 1 only when all inputs are 0. The name NOR comes from "NOT OR."

    **Concept Tested:** NOR Gate

---

#### 7. What determines the noise margin in a digital circuit?

<div class="upper-alpha" markdown>
1. The clock frequency
2. The difference between output and input voltage thresholds
3. The number of gates in series
4. The power supply voltage only
</div>

??? question "Show Answer"
    The correct answer is **B**. Noise margin is the voltage difference between the worst-case output levels and the input thresholds. It determines how much noise a signal can tolerate without being misinterpreted. Larger noise margins provide better immunity to electrical interference.

    **Concept Tested:** Noise Margin

---

#### 8. How would you implement an inverter (NOT gate) using only a NAND gate?

<div class="upper-alpha" markdown>
1. Connect both inputs to the signal to be inverted
2. Connect one input to logic 1, the other to the signal
3. Use two NAND gates in series
4. It cannot be done with a single NAND gate
</div>

??? question "Show Answer"
    The correct answer is **A**. To create an inverter from a NAND gate, connect both inputs together. With inputs A and A, the NAND output is (A·A)' = A' (since A·A = A by the Idempotent Law). This is the fundamental building block for NAND-only designs.

    **Concept Tested:** NAND-Only Design

---

#### 9. What is the primary difference between TTL and CMOS logic families?

<div class="upper-alpha" markdown>
1. TTL uses transistors, CMOS uses resistors
2. TTL uses bipolar transistors, CMOS uses MOSFETs
3. TTL is faster than CMOS in all cases
4. CMOS cannot operate at 5V
</div>

??? question "Show Answer"
    The correct answer is **B**. TTL (Transistor-Transistor Logic) uses bipolar junction transistors, while CMOS (Complementary Metal-Oxide-Semiconductor) uses MOSFETs. CMOS offers lower static power consumption and dominates modern digital IC design.

    **Concept Tested:** Logic Family

---

#### 10. An XNOR gate outputs 1 when:

<div class="upper-alpha" markdown>
1. At least one input is 1
2. Exactly one input is 1
3. Both inputs are the same
4. Both inputs are different
</div>

??? question "Show Answer"
    The correct answer is **C**. XNOR (exclusive NOR) is the complement of XOR. It outputs 1 when both inputs are the same (both 0 or both 1) and 0 when they differ. XNOR is also called an equivalence gate because it tests whether inputs are equal.

    **Concept Tested:** XNOR Gate
