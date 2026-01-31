# Quiz: Logic Minimization and K-Maps

Test your understanding of Karnaugh maps, logic simplification, and optimization techniques with these questions.

---

#### 1. What is the primary purpose of a Karnaugh map?

<div class="upper-alpha" markdown>
1. To implement circuits on breadboards
2. To visually simplify Boolean expressions
3. To generate Verilog code automatically
4. To measure propagation delay
</div>

??? question "Show Answer"
    The correct answer is **B**. A Karnaugh map (K-map) is a graphical method for simplifying Boolean expressions. It arranges truth table values in a grid where adjacent cells differ by one variable, making it easy to identify and group terms for simplification.

    **Concept Tested:** Karnaugh Map

---

#### 2. In a K-map, what property must adjacent cells have?

<div class="upper-alpha" markdown>
1. They must both contain 1s
2. They must differ by exactly one variable
3. They must be in the same row
4. They must have the same output value
</div>

??? question "Show Answer"
    The correct answer is **B**. Adjacent cells in a K-map differ by exactly one variable (one bit of the input). This adjacency property is what allows grouping—when you group adjacent 1s, the variable that changes is eliminated from the resulting term.

    **Concept Tested:** Adjacent Cells

---

#### 3. How many cells does a 4-variable K-map contain?

<div class="upper-alpha" markdown>
1. 4
2. 8
3. 16
4. 32
</div>

??? question "Show Answer"
    The correct answer is **C**. A K-map has one cell for each possible input combination. With 4 variables, there are 2⁴ = 16 combinations, so the K-map has 16 cells arranged in a 4×4 grid.

    **Concept Tested:** K-Map 4 Variable

---

#### 4. What is a "don't care" condition in a K-map?

<div class="upper-alpha" markdown>
1. An error in the truth table
2. An input combination that cannot occur or whose output doesn't matter
3. A cell that must always be 0
4. A grouping that cannot be simplified
</div>

??? question "Show Answer"
    The correct answer is **B**. Don't care conditions (marked X or d) represent input combinations where the output is unspecified—either because those inputs never occur or because the output value doesn't affect system behavior. They can be treated as 0 or 1 to help form larger groups.

    **Concept Tested:** Don't Care Condition

---

#### 5. What is a prime implicant?

<div class="upper-alpha" markdown>
1. The smallest possible group in a K-map
2. A group that cannot be combined with any other group to form a larger group
3. A group that contains only 1s
4. The first group identified in a K-map
</div>

??? question "Show Answer"
    The correct answer is **B**. A prime implicant is a product term (group of 1s) that cannot be combined with another term to eliminate a variable—it's maximal. You cannot make it larger while still covering only 1s.

    **Concept Tested:** Prime Implicant

---

#### 6. What makes a prime implicant "essential"?

<div class="upper-alpha" markdown>
1. It covers the most minterms
2. It is required to complete the design
3. It covers at least one minterm not covered by any other prime implicant
4. It uses the fewest variables
</div>

??? question "Show Answer"
    The correct answer is **C**. An essential prime implicant covers at least one minterm that no other prime implicant covers. It must be included in any minimal solution because there's no alternative way to cover that minterm.

    **Concept Tested:** Essential Prime Implicant

---

#### 7. What is the valid group size in a K-map?

<div class="upper-alpha" markdown>
1. Any number of cells
2. Only 1, 2, 4, 8, or 16 (powers of 2)
3. Only even numbers
4. Only odd numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. K-map groups must contain 2ⁿ cells (1, 2, 4, 8, 16, etc.) and must be rectangular. This constraint ensures that each grouping eliminates exactly n variables from the product term.

    **Concept Tested:** K-Map Grouping Rules

---

#### 8. What is a static hazard in a combinational circuit?

<div class="upper-alpha" markdown>
1. A circuit that never changes output
2. A momentary glitch when the output should remain constant
3. A permanent manufacturing defect
4. A circuit with no inputs
</div>

??? question "Show Answer"
    The correct answer is **B**. A static hazard occurs when an output that should remain constant (either 0 or 1) momentarily glitches to the opposite value during an input transition. This happens due to unequal propagation delays through different circuit paths.

    **Concept Tested:** Static Hazard

---

#### 9. In K-map minimization, can groups wrap around edges?

<div class="upper-alpha" markdown>
1. No, groups must be contained within the grid
2. Yes, because edge cells are logically adjacent
3. Only in 4-variable K-maps
4. Only for don't care conditions
</div>

??? question "Show Answer"
    The correct answer is **B**. K-map edges wrap around because cells on opposite edges differ by only one variable. The top row is adjacent to the bottom row, and the leftmost column is adjacent to the rightmost column. Corner cells can even form a group of 4.

    **Concept Tested:** K-Map Grouping Rules

---

#### 10. What is the advantage of the Quine-McCluskey method over K-maps?

<div class="upper-alpha" markdown>
1. It produces better results
2. It is faster for 2-variable functions
3. It can handle functions with more than 4-6 variables
4. It requires no computation
</div>

??? question "Show Answer"
    The correct answer is **C**. While K-maps become impractical beyond 5-6 variables, the Quine-McCluskey algorithm is a tabular, systematic method that works for any number of variables. It's also easier to automate in software.

    **Concept Tested:** Quine-McCluskey Method
