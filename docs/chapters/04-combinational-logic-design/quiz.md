# Quiz: Combinational Logic Design

Test your understanding of combinational circuit design, canonical forms, and standard representations with these questions.

---

#### 1. What defines a combinational logic circuit?

<div class="upper-alpha" markdown>
1. It uses only NAND and NOR gates
2. Its outputs depend only on current inputs, with no memory
3. It requires a clock signal to operate
4. It can store data between clock cycles
</div>

??? question "Show Answer"
    The correct answer is **B**. Combinational logic circuits produce outputs based solely on the current input values. They have no memory or feedback—the same inputs always produce the same outputs. This contrasts with sequential logic, which depends on input history.

    **Concept Tested:** Combinational Logic

---

#### 2. What is a minterm?

<div class="upper-alpha" markdown>
1. The smallest possible Boolean expression
2. A product term where each variable appears exactly once
3. A sum term where each variable appears exactly once
4. The simplified form of a Boolean function
</div>

??? question "Show Answer"
    The correct answer is **B**. A minterm is a product (AND) term in which every variable of the function appears exactly once, either in true or complemented form. Each minterm corresponds to exactly one row of the truth table where the output is 1.

    **Concept Tested:** Minterm

---

#### 3. In Sum of Products (SOP) form, what operation connects the product terms?

<div class="upper-alpha" markdown>
1. AND
2. OR
3. XOR
4. NAND
</div>

??? question "Show Answer"
    The correct answer is **B**. In Sum of Products form, individual product terms (ANDs) are combined using OR operations. The name reflects this structure: "sum" refers to OR (Boolean addition), and "products" are AND terms.

    **Concept Tested:** Sum of Products

---

#### 4. What is the canonical SOP form for a function with minterms m1, m3, and m7?

<div class="upper-alpha" markdown>
1. F = Σ(1, 3, 7)
2. F = Π(1, 3, 7)
3. F = m1 · m3 · m7
4. F = Σ(0, 2, 4, 5, 6)
</div>

??? question "Show Answer"
    The correct answer is **A**. Canonical SOP is written as F = Σ(list of minterms). The sigma (Σ) notation indicates a sum (OR) of the specified minterms. Option B uses Π, which is Product of Sums notation for maxterms.

    **Concept Tested:** Canonical Form

---

#### 5. How does a two-level logic implementation differ from multi-level?

<div class="upper-alpha" markdown>
1. Two-level uses only two gates total
2. Two-level has at most two gates between input and output
3. Two-level is always slower than multi-level
4. Two-level cannot implement all functions
</div>

??? question "Show Answer"
    The correct answer is **B**. Two-level logic has at most two gates between any input and the output (typically AND-OR for SOP or OR-AND for POS). Multi-level logic uses more gate stages, which can reduce total gate count at the cost of increased delay.

    **Concept Tested:** Two-Level Logic

---

#### 6. What is the relationship between minterms and maxterms for the same function?

<div class="upper-alpha" markdown>
1. They are identical
2. Minterms list where F=1; maxterms list where F=0
3. Minterms use AND; maxterms use XOR
4. There is no relationship
</div>

??? question "Show Answer"
    The correct answer is **B**. Minterms identify input combinations where the function equals 1 (for SOP form), while maxterms identify combinations where the function equals 0 (for POS form). For a given function, if minterm mi makes F=1, then maxterm Mi makes F=0.

    **Concept Tested:** Maxterm

---

#### 7. What is the first step in the standard combinational design workflow?

<div class="upper-alpha" markdown>
1. Draw the K-map
2. Write the Verilog code
3. Create the truth table from the problem specification
4. Build the circuit on a breadboard
</div>

??? question "Show Answer"
    The correct answer is **C**. The standard workflow begins with understanding the problem and creating a complete truth table that specifies outputs for all input combinations. This formal specification then guides Boolean expression derivation, simplification, and implementation.

    **Concept Tested:** Gate-Level Design

---

#### 8. In Product of Sums form, what are the individual sum terms called?

<div class="upper-alpha" markdown>
1. Minterms
2. Maxterms
3. Prime implicants
4. Implicant covers
</div>

??? question "Show Answer"
    The correct answer is **B**. In POS form, the individual sum (OR) terms are called maxterms. Each maxterm contains every variable once, and the maxterms are combined using AND. A maxterm equals 0 for exactly one input combination.

    **Concept Tested:** Product of Sums

---

#### 9. What distinguishes a minimal form from a canonical form?

<div class="upper-alpha" markdown>
1. Minimal form uses more gates
2. Minimal form may not include all variables in each term
3. Canonical form is always incorrect
4. There is no difference
</div>

??? question "Show Answer"
    The correct answer is **B**. Canonical forms include every variable in each term (minterms or maxterms), while minimal forms eliminate redundant variables through simplification. Minimal forms use fewer gates but express the same function.

    **Concept Tested:** Minimal Form

---

#### 10. When mapping a Boolean expression to gates, which gate type implements a product term?

<div class="upper-alpha" markdown>
1. OR gate
2. AND gate
3. XOR gate
4. NOR gate
</div>

??? question "Show Answer"
    The correct answer is **B**. A product term (variables combined with AND) is implemented using AND gates. In SOP implementations, AND gates create the products, and an OR gate sums them. Variables with complements require inverters.

    **Concept Tested:** Boolean to Gates Mapping
