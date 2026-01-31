# Quiz: Flip-Flops and Timing

Test your understanding of flip-flop types, timing parameters, and synchronous design principles.

---

#### 1. What distinguishes a flip-flop from a latch?

<div class="upper-alpha" markdown>
1. Flip-flops use more transistors
2. Flip-flops are edge-triggered rather than level-sensitive
3. Flip-flops can only store 1, not 0
4. Flip-flops require higher voltage
</div>

??? question "Show Answer"
    The correct answer is **B**. Flip-flops are edge-triggered—they sample input and update output only at clock transitions (rising or falling edge). Latches are level-sensitive—they pass input to output during the entire enable period. Edge triggering provides precise timing control.

    **Concept Tested:** Edge Triggered

---

#### 2. For a D flip-flop, what value does Q take after a clock edge?

<div class="upper-alpha" markdown>
1. Always 0
2. Always 1
3. The value of D at the clock edge
4. The complement of D
</div>

??? question "Show Answer"
    The correct answer is **C**. A D flip-flop captures the value present at its D input at the active clock edge and holds it until the next active edge. "D" stands for "data"—whatever data is at D appears at Q after the clock.

    **Concept Tested:** D Flip-Flop

---

#### 3. What is setup time?

<div class="upper-alpha" markdown>
1. The time to power on the chip
2. The time data must be stable before the clock edge
3. The time from clock edge to valid output
4. The total time to configure the circuit
</div>

??? question "Show Answer"
    The correct answer is **B**. Setup time (tsu) is the minimum time the data input must be stable BEFORE the active clock edge. Violating setup time can result in incorrect data capture or metastability.

    **Concept Tested:** Setup Time

---

#### 4. What is hold time?

<div class="upper-alpha" markdown>
1. The time the circuit holds its state without power
2. The time data must remain stable after the clock edge
3. The maximum operating time
4. The time between clock edges
</div>

??? question "Show Answer"
    The correct answer is **B**. Hold time (th) is the minimum time the data input must remain stable AFTER the active clock edge. If data changes too quickly after the edge, the flip-flop may capture incorrect or metastable values.

    **Concept Tested:** Hold Time

---

#### 5. What is metastability?

<div class="upper-alpha" markdown>
1. A stable state between 0 and 1
2. An unstable condition when setup/hold times are violated
3. A type of flip-flop design
4. Normal operating behavior
</div>

??? question "Show Answer"
    The correct answer is **B**. Metastability occurs when a flip-flop captures an input that is changing during the setup/hold window. The flip-flop may enter an intermediate state between 0 and 1, taking unpredictable time to resolve. It can cause system failures.

    **Concept Tested:** Metastability

---

#### 6. What is the JK flip-flop's behavior when J=1 and K=1?

<div class="upper-alpha" markdown>
1. Q becomes 0
2. Q becomes 1
3. Q toggles (inverts)
4. Invalid state
</div>

??? question "Show Answer"
    The correct answer is **C**. When both J and K are 1, the JK flip-flop toggles its output on each clock edge. This is the "toggle mode" that distinguishes JK from other flip-flops. Unlike the SR latch, J=K=1 is a valid, useful state.

    **Concept Tested:** JK Toggle Mode

---

#### 7. What is clock-to-Q delay?

<div class="upper-alpha" markdown>
1. The delay from input D to output Q
2. The delay from active clock edge to stable output
3. The time between two clock cycles
4. The setup time plus hold time
</div>

??? question "Show Answer"
    The correct answer is **B**. Clock-to-Q delay (tcq) is the time from the active clock edge until the flip-flop output becomes stable and valid. It's a key timing parameter that affects the maximum operating frequency of synchronous circuits.

    **Concept Tested:** Clock-to-Q Delay

---

#### 8. What is the purpose of an asynchronous reset on a flip-flop?

<div class="upper-alpha" markdown>
1. To clock the flip-flop faster
2. To immediately force the output to a known state regardless of clock
3. To increase power consumption
4. To disable the clock input
</div>

??? question "Show Answer"
    The correct answer is **B**. An asynchronous reset forces the flip-flop output to 0 (or 1 for preset) immediately when asserted, without waiting for a clock edge. It provides instant initialization but requires careful timing analysis.

    **Concept Tested:** Asynchronous Reset

---

#### 9. What is a synchronous reset?

<div class="upper-alpha" markdown>
1. A reset that takes effect immediately
2. A reset that takes effect only on the active clock edge
3. A reset shared by multiple flip-flops
4. A reset that varies with temperature
</div>

??? question "Show Answer"
    The correct answer is **B**. A synchronous reset only takes effect at the active clock edge, just like a normal data input. The reset signal is gated with the clock. This simplifies timing analysis but requires the clock to be running.

    **Concept Tested:** Synchronous Reset

---

#### 10. What is a T flip-flop, and how is it commonly used?

<div class="upper-alpha" markdown>
1. A flip-flop with temperature sensing, used in thermal protection
2. A flip-flop that toggles when T=1, used in counters
3. A flip-flop with timing output, used in clocks
4. A flip-flop with test mode, used in debugging
</div>

??? question "Show Answer"
    The correct answer is **B**. A T (Toggle) flip-flop inverts its output when T=1 and holds when T=0. It's commonly used in counter design because binary counting involves toggling bits at different rates. A JK flip-flop with J=K becomes a T flip-flop.

    **Concept Tested:** T Flip-Flop
