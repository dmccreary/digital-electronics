# Quiz: FSM Fundamentals

Test your understanding of finite state machines, Moore and Mealy models, and state encoding strategies.

---

#### 1. What are the five essential components of a finite state machine?

<div class="upper-alpha" markdown>
1. Clock, data, address, control, power
2. States, inputs, outputs, transitions, initial state
3. Flip-flops, gates, wires, clock, reset
4. Encoder, decoder, register, counter, mux
</div>

??? question "Show Answer"
    The correct answer is **B**. Every FSM has: states (possible configurations), inputs (external signals affecting behavior), outputs (signals produced), transitions (rules for moving between states), and an initial state (starting configuration).

    **Concept Tested:** Finite State Machine

---

#### 2. In a Moore machine, what determines the outputs?

<div class="upper-alpha" markdown>
1. Only the current inputs
2. Only the current state
3. Both current state and current inputs
4. The previous outputs
</div>

??? question "Show Answer"
    The correct answer is **B**. In a Moore machine, outputs depend ONLY on the current state. Outputs are associated with states, not transitions. This means outputs change only when the state changes (at clock edges), providing clean, glitch-free timing.

    **Concept Tested:** Moore Machine

---

#### 3. How does a Mealy machine differ from a Moore machine?

<div class="upper-alpha" markdown>
1. Mealy machines have more states
2. Mealy outputs depend on both state AND inputs
3. Mealy machines are faster
4. Mealy machines don't need flip-flops
</div>

??? question "Show Answer"
    The correct answer is **B**. In a Mealy machine, outputs depend on both the current state AND the current inputs. This means outputs can change asynchronously (whenever inputs change), potentially responding faster than Moore machines but with more complex timing.

    **Concept Tested:** Mealy Machine

---

#### 4. What information does a state diagram convey?

<div class="upper-alpha" markdown>
1. The physical layout of the circuit
2. States, transitions, conditions, and outputs
3. The timing of clock signals
4. The power consumption per state
</div>

??? question "Show Answer"
    The correct answer is **B**. A state diagram is a graphical representation showing states as circles, transitions as arrows, conditions on the arrows (input values), and outputs (either in states for Moore or on arrows for Mealy).

    **Concept Tested:** State Diagram

---

#### 5. What is one-hot encoding for state machines?

<div class="upper-alpha" markdown>
1. Using one flip-flop for all states
2. Using one flip-flop per state with exactly one active
3. Encoding states as consecutive binary numbers
4. Using temperature to determine state
</div>

??? question "Show Answer"
    The correct answer is **B**. In one-hot encoding, each state has its own flip-flop, and exactly one flip-flop is "hot" (set to 1) at any time. This uses more flip-flops but simplifies next-state and output logic, often beneficial in FPGAs.

    **Concept Tested:** One-Hot Encoding

---

#### 6. What is the advantage of binary encoding over one-hot encoding?

<div class="upper-alpha" markdown>
1. Simpler next-state logic
2. Fewer flip-flops required
3. Faster operation
4. Lower power consumption
</div>

??? question "Show Answer"
    The correct answer is **B**. Binary encoding uses log₂(N) flip-flops for N states, compared to N flip-flops for one-hot. For 8 states, binary uses 3 flip-flops; one-hot uses 8. However, binary encoding typically requires more complex next-state decoding logic.

    **Concept Tested:** Binary Encoding

---

#### 7. What is the purpose of state minimization?

<div class="upper-alpha" markdown>
1. To make the state machine run faster
2. To reduce the number of states while preserving behavior
3. To use fewer input signals
4. To eliminate the clock signal
</div>

??? question "Show Answer"
    The correct answer is **B**. State minimization identifies and merges equivalent states—states that produce identical outputs and have identical transitions for all inputs. Fewer states means fewer flip-flops and potentially simpler logic.

    **Concept Tested:** State Minimization

---

#### 8. In state diagram notation, what do the arrows represent?

<div class="upper-alpha" markdown>
1. Power supply connections
2. State transitions with their conditions
3. Clock signals
4. Data flow between flip-flops
</div>

??? question "Show Answer"
    The correct answer is **B**. Arrows in state diagrams represent transitions between states. They are labeled with the input condition(s) that cause the transition and, for Mealy machines, the output produced during that transition.

    **Concept Tested:** State Diagram Notation

---

#### 9. What does a state table contain?

<div class="upper-alpha" markdown>
1. Only the current state values
2. Current state, input combinations, next state, and outputs
3. Only the flip-flop excitation equations
4. The physical coordinates of each state
</div>

??? question "Show Answer"
    The correct answer is **B**. A state table systematically lists every combination of current state and input, showing the resulting next state and outputs for each. It's equivalent to a state diagram but in tabular form, making it easier to derive logic equations.

    **Concept Tested:** State Table

---

#### 10. Why might Gray code encoding be chosen for state machines?

<div class="upper-alpha" markdown>
1. It uses the fewest flip-flops
2. Only one bit changes between adjacent states, reducing glitches
3. It's required by Verilog synthesis tools
4. It produces the fastest circuits
</div>

??? question "Show Answer"
    The correct answer is **B**. Gray code encoding ensures only one flip-flop changes during each state transition. This reduces switching noise, power consumption, and hazards—particularly useful for FSMs with outputs decoded from state bits or when crossing clock domains.

    **Concept Tested:** Gray Code Encoding
