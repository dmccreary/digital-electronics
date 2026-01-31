# Quiz: Registers, Counters, and Datapath

Test your understanding of registers, shift registers, counters, and datapath concepts.

---

#### 1. What is the purpose of the enable signal on a register?

<div class="upper-alpha" markdown>
1. To increase the register's storage capacity
2. To control whether the register responds to clock edges
3. To reset the register to zero
4. To select between multiple input sources
</div>

??? question "Show Answer"
    The correct answer is **B**. The enable signal controls whether the register responds to clock edges. When enable is inactive, the register ignores clock edges and retains its current value, allowing selective updates.

    **Concept Tested:** Enable Signal

---

#### 2. Which shift register type accepts data serially and provides all bits as parallel outputs?

<div class="upper-alpha" markdown>
1. SISO (Serial In Serial Out)
2. SIPO (Serial In Parallel Out)
3. PISO (Parallel In Serial Out)
4. PIPO (Parallel In Parallel Out)
</div>

??? question "Show Answer"
    The correct answer is **B**. A Serial In Parallel Out (SIPO) shift register accepts data one bit at a time but provides access to all stored bits simultaneously as outputs. It's essential for serial-to-parallel conversion in communication interfaces.

    **Concept Tested:** Serial In Parallel Out

---

#### 3. What makes a universal shift register "universal"?

<div class="upper-alpha" markdown>
1. It works with any clock frequency
2. It can hold, shift left, shift right, or parallel load
3. It automatically adapts to any data width
4. It works without a clock signal
</div>

??? question "Show Answer"
    The correct answer is **B**. A universal shift register combines all shift register capabilities—hold (no change), shift left, shift right, and parallel load—controlled by mode select inputs. This versatility makes it useful for many datapath operations.

    **Concept Tested:** Universal Shift Register

---

#### 4. What is counter overflow?

<div class="upper-alpha" markdown>
1. When the counter uses too much power
2. When the counter reaches its maximum and wraps to zero (or vice versa)
3. When two counters are connected together
4. When the counter runs too fast
</div>

??? question "Show Answer"
    The correct answer is **B**. Counter overflow occurs when an up-counter reaches its maximum value (all 1s) and wraps around to zero, or when a down-counter reaches zero and wraps to its maximum. Terminal count signals detect this condition.

    **Concept Tested:** Counter Overflow

---

#### 5. A mod-12 counter counts through how many unique states?

<div class="upper-alpha" markdown>
1. 11 states (0 to 10)
2. 12 states (0 to 11)
3. 13 states (0 to 12)
4. 16 states (0 to 15)
</div>

??? question "Show Answer"
    The correct answer is **B**. A mod-N counter counts through exactly N unique states. A mod-12 counter cycles through states 0, 1, 2, ... 11, then resets to 0—a total of 12 distinct states.

    **Concept Tested:** Mod-N Counter

---

#### 6. How many states does a 4-bit ring counter have?

<div class="upper-alpha" markdown>
1. 4 states
2. 8 states
3. 16 states
4. 2 states
</div>

??? question "Show Answer"
    The correct answer is **A**. A ring counter has N states for N flip-flops. Only one bit is set to 1 at any time, and this 1 rotates around the register. A 4-bit ring counter has 4 states (one-hot encoding).

    **Concept Tested:** Ring Counter

---

#### 7. What advantage does a Johnson counter have over a ring counter with the same number of flip-flops?

<div class="upper-alpha" markdown>
1. It runs at twice the speed
2. It provides twice as many states (2N states from N flip-flops)
3. It uses less power
4. It requires no initialization
</div>

??? question "Show Answer"
    The correct answer is **B**. A Johnson counter (twisted ring counter) provides 2N states from N flip-flops, compared to N states for a standard ring counter. The inverted feedback doubles the state count while maintaining simple decoding.

    **Concept Tested:** Johnson Counter

---

#### 8. What does a register file provide that individual registers do not?

<div class="upper-alpha" markdown>
1. Higher storage capacity per bit
2. Addressable access to multiple registers through port addresses
3. Faster clock speeds
4. Built-in arithmetic operations
</div>

??? question "Show Answer"
    The correct answer is **B**. A register file organizes multiple registers as an addressable array. By specifying a register address, you can read from or write to a specific register, essential for processor datapaths where instructions specify register numbers.

    **Concept Tested:** Register File

---

#### 9. What does RTL notation R1 ← R2 + R3 describe?

<div class="upper-alpha" markdown>
1. Three registers are connected in series
2. Add contents of R2 and R3, store result in R1
3. Move data from R1 to R2 to R3
4. Compare R2 and R3, set flag in R1
</div>

??? question "Show Answer"
    The correct answer is **B**. RTL (Register Transfer Level) notation uses the arrow (←) to show the destination on the left receiving the result of the operation on the right. R1 ← R2 + R3 means add R2 and R3, store in R1 on the next clock edge.

    **Concept Tested:** RTL Notation

---

#### 10. What is the relationship between the control unit and the datapath?

<div class="upper-alpha" markdown>
1. They are the same component
2. The control unit generates signals that direct datapath operations
3. The datapath controls when the control unit updates
4. They operate completely independently
</div>

??? question "Show Answer"
    The correct answer is **B**. The control unit is an FSM that orchestrates the datapath by generating control signals. These signals tell the datapath components what to do each clock cycle—which registers to read, what ALU operation to perform, where to write results.

    **Concept Tested:** Control Unit

