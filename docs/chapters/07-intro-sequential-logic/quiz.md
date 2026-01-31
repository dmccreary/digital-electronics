# Quiz: Introduction to Sequential Logic

Test your understanding of memory elements, latches, clocks, and the foundations of sequential logic.

---

#### 1. What distinguishes sequential logic from combinational logic?

<div class="upper-alpha" markdown>
1. Sequential logic uses only NAND gates
2. Sequential logic has memory and outputs depend on past inputs
3. Sequential logic operates faster
4. Sequential logic uses fewer transistors
</div>

??? question "Show Answer"
    The correct answer is **B**. Sequential logic circuits have memory—their outputs depend on both current inputs AND the history of past inputs (stored as state). Combinational logic has no memory; outputs depend only on current inputs.

    **Concept Tested:** Sequential Logic

---

#### 2. What is the "state" of a sequential circuit?

<div class="upper-alpha" markdown>
1. The physical location of the circuit
2. The stored information that affects future behavior
3. The power consumption level
4. The number of inputs
</div>

??? question "Show Answer"
    The correct answer is **B**. State represents the internal stored information that the circuit "remembers." It determines how the circuit responds to inputs and what outputs it produces. State is stored in memory elements like latches and flip-flops.

    **Concept Tested:** State Concept

---

#### 3. What problem occurs when S=1 and R=1 in a basic SR latch?

<div class="upper-alpha" markdown>
1. The latch operates normally
2. The outputs become unpredictable (invalid state)
3. The latch resets to 0
4. The latch sets to 1
</div>

??? question "Show Answer"
    The correct answer is **B**. When both S and R are 1, both outputs try to be 0, violating the complementary relationship (Q and Q' should be opposites). When S and R return to 0, the final state is unpredictable, depending on which input changes first.

    **Concept Tested:** Invalid State Problem

---

#### 4. What is the behavior of a "transparent" latch?

<div class="upper-alpha" markdown>
1. It has no visible output
2. Input changes pass through to output while enabled
3. It only works with glass substrates
4. It inverts all inputs
</div>

??? question "Show Answer"
    The correct answer is **B**. A transparent latch allows input changes to propagate directly to the output while the enable is active. The output "follows" the input during this transparent phase and holds its value when enable goes inactive.

    **Concept Tested:** Transparent Latch

---

#### 5. What creates memory in a basic latch circuit?

<div class="upper-alpha" markdown>
1. A capacitor storing charge
2. A feedback loop from outputs to inputs
3. A battery backup
4. Extra ground connections
</div>

??? question "Show Answer"
    The correct answer is **B**. Feedback loops from gate outputs back to inputs create bistability—the circuit can maintain one of two stable states indefinitely. Cross-coupled gates (like NAND or NOR) form the fundamental memory element.

    **Concept Tested:** Feedback Loop

---

#### 6. What is the purpose of the clock signal in digital systems?

<div class="upper-alpha" markdown>
1. To measure elapsed time
2. To synchronize all state changes to defined moments
3. To power the circuit
4. To generate random numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. The clock signal provides a timing reference that synchronizes when flip-flops can change state. All state changes occur at clock edges, making timing predictable and preventing race conditions in large designs.

    **Concept Tested:** Clock Signal

---

#### 7. What is the relationship between clock period and clock frequency?

<div class="upper-alpha" markdown>
1. Period = Frequency × 2
2. Period = 1 / Frequency
3. Period = Frequency²
4. They are the same thing
</div>

??? question "Show Answer"
    The correct answer is **B**. Clock period (T) and frequency (f) are inversely related: T = 1/f. A 100 MHz clock has a period of 10 nanoseconds (1 / 100,000,000 seconds). Higher frequency means shorter period.

    **Concept Tested:** Clock Frequency

---

#### 8. What is a rising edge of a clock signal?

<div class="upper-alpha" markdown>
1. The high voltage level
2. The transition from low to high
3. The maximum voltage reached
4. The average voltage
</div>

??? question "Show Answer"
    The correct answer is **B**. The rising edge (positive edge) is the transition moment when the clock changes from 0 to 1. Many sequential circuits are "positive-edge-triggered," meaning they sample inputs and update state at this transition.

    **Concept Tested:** Rising Edge

---

#### 9. Why are level-sensitive latches problematic in large designs?

<div class="upper-alpha" markdown>
1. They consume too much power
2. They are too slow
3. Signals can propagate through multiple stages during one enable period
4. They require too many transistors
</div>

??? question "Show Answer"
    The correct answer is **C**. When a latch is transparent, input changes pass through immediately. In a chain of latches with the same enable, a signal could propagate through multiple stages in one enable period, causing unpredictable behavior (race conditions).

    **Concept Tested:** Latch Timing Problem

---

#### 10. What is a bistable element?

<div class="upper-alpha" markdown>
1. An element that oscillates between two states
2. An element with exactly two stable states that persists without input
3. An element that requires two power supplies
4. An element with two outputs
</div>

??? question "Show Answer"
    The correct answer is **B**. A bistable element has exactly two stable states (typically representing 0 and 1) and will remain in its current state indefinitely without external input. Latches and flip-flops are bistable elements that form the basis of digital memory.

    **Concept Tested:** Bistable Element
