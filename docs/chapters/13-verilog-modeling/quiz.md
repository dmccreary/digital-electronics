# Quiz: Verilog Behavioral and Structural Modeling

Test your understanding of always blocks, assignments, modeling styles, and design abstraction levels.

---

#### 1. What determines when an always block executes?

<div class="upper-alpha" markdown>
1. The module instantiation order
2. The sensitivity list specifying trigger conditions
3. The compiler optimization settings
4. The system clock frequency
</div>

??? question "Show Answer"
    The correct answer is **B**. The sensitivity list (@(...)) specifies which signal changes or events trigger the always block to execute. It can be level-sensitive (@(*) or @(a or b)) or edge-sensitive (@(posedge clk)).

    **Concept Tested:** Sensitivity List

---

#### 2. What is the key difference between blocking (=) and non-blocking (<=) assignments?

<div class="upper-alpha" markdown>
1. Blocking is faster in simulation
2. Blocking updates immediately; non-blocking schedules updates for the end of the time step
3. Non-blocking uses less hardware
4. Blocking only works in initial blocks
</div>

??? question "Show Answer"
    The correct answer is **B**. Blocking (=) updates the variable immediately, so later statements see the new value. Non-blocking (<=) schedules updates to happen simultaneously at the end of the time step, so all assignments see the old values.

    **Concept Tested:** Blocking Assignment

---

#### 3. What golden rule should be followed for assignment types in always blocks?

<div class="upper-alpha" markdown>
1. Always use blocking for all assignments
2. Use blocking (=) for combinational logic, non-blocking (<=) for sequential logic
3. Use non-blocking for all assignments
4. Mix them freely based on preference
</div>

??? question "Show Answer"
    The correct answer is **B**. Use blocking (=) in combinational always blocks (@(*)) and non-blocking (<=) in sequential always blocks (@(posedge clk)). Never mix them in the same block. This prevents race conditions and matches simulation to synthesis.

    **Concept Tested:** Non-Blocking Assignment

---

#### 4. What happens if you don't cover all cases in a combinational always block?

<div class="upper-alpha" markdown>
1. The compiler reports an error
2. A latch is inferred to hold the previous value
3. The output defaults to zero
4. The block is optimized away
</div>

??? question "Show Answer"
    The correct answer is **B**. If any code path doesn't assign a value, synthesis infers a latch—a level-sensitive memory element that holds the old value. This is almost always a bug. Always include default cases or else clauses.

    **Concept Tested:** If-Else in Verilog

---

#### 5. When is a case statement preferred over an if-else chain?

<div class="upper-alpha" markdown>
1. When testing one expression against multiple specific values
2. When implementing priority logic
3. When dealing with floating-point numbers
4. When the conditions are interdependent
</div>

??? question "Show Answer"
    The correct answer is **A**. Case statements are ideal for checking one signal against multiple specific values (like opcodes or state encodings). They create parallel selection logic, while if-else creates priority-encoded logic.

    **Concept Tested:** Case Statement

---

#### 6. What does @(*) in a sensitivity list mean?

<div class="upper-alpha" markdown>
1. Trigger on all clock edges
2. Automatically include all signals read in the block
3. Trigger on all output changes
4. Disable the sensitivity list
</div>

??? question "Show Answer"
    The correct answer is **B**. The @(*) syntax (Verilog-2001) automatically includes all signals read within the block in the sensitivity list. This prevents bugs from forgetting signals and ensures simulation matches synthesis.

    **Concept Tested:** Combinational Always

---

#### 7. What keyword detects a rising clock edge in a sequential always block?

<div class="upper-alpha" markdown>
1. rising
2. posedge
3. clockup
4. positive
</div>

??? question "Show Answer"
    The correct answer is **B**. The posedge keyword specifies a positive (rising) edge trigger—when the signal transitions from 0 to 1. It's the standard trigger for synchronous sequential logic: always @(posedge clk).

    **Concept Tested:** Posedge Keyword

---

#### 8. What is structural modeling in Verilog?

<div class="upper-alpha" markdown>
1. Using comments to document the structure
2. Describing a circuit by instantiating and connecting lower-level components
3. Writing code that compiles faster
4. Organizing files in a directory structure
</div>

??? question "Show Answer"
    The correct answer is **B**. Structural modeling explicitly describes a circuit by instantiating components (gates or modules) and connecting their ports with wires. It provides precise control over what hardware is generated.

    **Concept Tested:** Structural Modeling

---

#### 9. What characterizes RTL (Register Transfer Level) Verilog?

<div class="upper-alpha" markdown>
1. It only uses gate primitives
2. It describes data moving between registers through combinational logic
3. It cannot be synthesized
4. It requires a specific vendor's tools
</div>

??? question "Show Answer"
    The correct answer is **B**. RTL Verilog describes systems in terms of registers (storage), combinational logic (operations), and clock-driven transfers. It's the practical abstraction level for synthesizable design, matching how synthesis tools work.

    **Concept Tested:** RTL Verilog

---

#### 10. What is the main benefit of hierarchical design in Verilog?

<div class="upper-alpha" markdown>
1. Faster simulation speed
2. Managing complexity through modular decomposition and reuse
3. Smaller file sizes
4. Automatic documentation generation
</div>

??? question "Show Answer"
    The correct answer is **B**. Hierarchical design divides complex systems into manageable modules, enables reuse of verified components, allows team collaboration, and supports independent testing. It's essential for any non-trivial design.

    **Concept Tested:** Hierarchical Design

