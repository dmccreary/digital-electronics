# Quiz: FSM Design and Applications

Test your understanding of FSM design methodology, sequence detectors, and practical controller examples.

---

#### 1. What is a next-state equation in FSM design?

<div class="upper-alpha" markdown>
1. An equation that calculates the output value
2. A Boolean expression that computes the next state based on current state and inputs
3. A formula for determining the number of flip-flops needed
4. An equation for minimizing the number of states
</div>

??? question "Show Answer"
    The correct answer is **B**. The next-state equation is a Boolean expression that computes what state the FSM will enter on the next clock edge, based on the current state and inputs. These equations become the D inputs to the state register flip-flops.

    **Concept Tested:** Next State Equation

---

#### 2. How do Moore and Mealy machines differ in their output equations?

<div class="upper-alpha" markdown>
1. Moore outputs are faster than Mealy outputs
2. Moore outputs depend only on state; Mealy outputs depend on state AND inputs
3. Moore machines have no outputs
4. Mealy outputs are always registered
</div>

??? question "Show Answer"
    The correct answer is **B**. In a Moore machine, outputs depend ONLY on the current state (Output = g(S)). In a Mealy machine, outputs depend on both current state AND current inputs (Output = h(S, I)), which allows faster response but can introduce glitches.

    **Concept Tested:** Output Equation

---

#### 3. What is the first step in the systematic FSM design process?

<div class="upper-alpha" markdown>
1. Draw the state diagram
2. Choose state encoding
3. Understand the specification and identify inputs/outputs
4. Derive next-state equations
</div>

??? question "Show Answer"
    The correct answer is **C**. The FSM design process begins with understanding the specification—identifying inputs, outputs, required behavior, and whether Moore or Mealy is appropriate. This understanding guides all subsequent steps.

    **Concept Tested:** FSM Design Process

---

#### 4. Why is FSM verification important?

<div class="upper-alpha" markdown>
1. To make the FSM run faster
2. To confirm the implementation correctly matches the specification
3. To reduce the number of states
4. To eliminate the need for simulation
</div>

??? question "Show Answer"
    The correct answer is **B**. FSM verification confirms that the implementation correctly matches its specification. This includes testing every transition, checking reset behavior, and verifying outputs—catching errors before they become bugs in hardware.

    **Concept Tested:** FSM Verification

---

#### 5. What does a sequence detector FSM do?

<div class="upper-alpha" markdown>
1. Counts the total number of 1s in an input stream
2. Monitors an input stream and outputs a signal when a specific pattern is detected
3. Generates random bit sequences
4. Sorts input values in order
</div>

??? question "Show Answer"
    The correct answer is **B**. A sequence detector monitors an input bit stream and asserts an output signal when a specific target pattern (like "101") is detected. States represent partial progress toward matching the complete pattern.

    **Concept Tested:** Sequence Detector

---

#### 6. What is the difference between overlapping and non-overlapping pattern detection?

<div class="upper-alpha" markdown>
1. Overlapping uses more flip-flops
2. In overlapping detection, the suffix of one pattern can be the prefix of the next
3. Non-overlapping detection is always faster
4. Overlapping detection only works with Mealy machines
</div>

??? question "Show Answer"
    The correct answer is **B**. In overlapping detection, after finding a pattern, part of it can count toward the next match. For pattern "101" in stream "10101", overlapping finds TWO matches (positions 0-2 and 2-4) because the final "1" of the first match starts the next pattern.

    **Concept Tested:** Overlapping Detection

---

#### 7. In a traffic light controller FSM, what is the critical safety property?

<div class="upper-alpha" markdown>
1. Lights change as fast as possible
2. Both directions are never green simultaneously
3. Yellow lights last exactly 3 seconds
4. The controller uses minimal flip-flops
</div>

??? question "Show Answer"
    The correct answer is **B**. The critical safety property is that conflicting green lights never occur simultaneously. This is verified by examining each state and confirming that at least one direction always has red (or yellow) when the other has any non-red light.

    **Concept Tested:** Traffic Light Controller

---

#### 8. In a vending machine FSM, what do the states typically represent?

<div class="upper-alpha" markdown>
1. Different products available
2. The accumulated money amount
3. The time since last transaction
4. The number of items dispensed
</div>

??? question "Show Answer"
    The correct answer is **B**. Vending machine FSM states represent the accumulated money amount (0¢, 5¢, 10¢, 15¢, 20¢, etc.). Transitions occur as coins are inserted, and the FSM dispenses the product and returns change when the threshold is reached.

    **Concept Tested:** Vending Machine FSM

---

#### 9. What is a pattern recognition FSM capable of beyond simple sequence detection?

<div class="upper-alpha" markdown>
1. Only detecting single-bit patterns
2. Detecting patterns with multiple inputs, wildcards, or alternative paths
3. Generating pseudo-random numbers
4. Compressing data automatically
</div>

??? question "Show Answer"
    The correct answer is **B**. Pattern recognition FSMs extend sequence detection to handle multiple input bits, don't-care positions (wildcards like "1X1"), alternative patterns (detect "101" OR "110"), counted repetitions, and complex protocol sequences.

    **Concept Tested:** Pattern Recognition FSM

---

#### 10. What is the most common FSM design error when creating state tables?

<div class="upper-alpha" markdown>
1. Using too many states
2. Leaving undefined behavior for some state × input combinations
3. Making the FSM too fast
4. Using one-hot encoding
</div>

??? question "Show Answer"
    The correct answer is **B**. The most common error is leaving holes in the state table—undefined behavior for some state × input combinations. When implemented, these cases will have *some* behavior (often incorrect), leading to hard-to-debug problems.

    **Concept Tested:** FSM Design Process

