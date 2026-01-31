# Quiz: Boolean Algebra Fundamentals

Test your understanding of Boolean algebra, logic operations, and simplification laws with these questions.

---

#### 1. What is the result of the Boolean expression A + 1?

<div class="upper-alpha" markdown>
1. A
2. 1
3. 0
4. A'
</div>

??? question "Show Answer"
    The correct answer is **B**. According to the Null Law (also called the Dominance Law), any variable ORed with 1 equals 1. This makes sense because if either input to an OR is true, the output is true—and 1 is always true.

    **Concept Tested:** Null Law

---

#### 2. Which Boolean law states that A + AB = A?

<div class="upper-alpha" markdown>
1. Identity Law
2. Distributive Law
3. Absorption Law
4. Complement Law
</div>

??? question "Show Answer"
    The correct answer is **C**. The Absorption Law states that A + AB = A and A(A + B) = A. It allows us to "absorb" redundant terms. The intuition: if A is true, the whole expression is true regardless of B.

    **Concept Tested:** Absorption Law

---

#### 3. What does De Morgan's Theorem state about (A + B)'?

<div class="upper-alpha" markdown>
1. (A + B)' = A' + B'
2. (A + B)' = A'B'
3. (A + B)' = AB'
4. (A + B)' = A'B
</div>

??? question "Show Answer"
    The correct answer is **B**. De Morgan's Theorem states that the complement of a sum equals the product of the complements: (A + B)' = A'B'. Similarly, (AB)' = A' + B'. This theorem is fundamental for converting between AND/OR forms and implementing circuits with NAND/NOR gates.

    **Concept Tested:** De Morgan's Theorem

---

#### 4. In a truth table for a 3-input Boolean function, how many rows are required?

<div class="upper-alpha" markdown>
1. 3
2. 6
3. 8
4. 16
</div>

??? question "Show Answer"
    The correct answer is **C**. A truth table must include all possible input combinations. For n inputs, there are 2ⁿ combinations. With 3 inputs, there are 2³ = 8 rows, covering all combinations from 000 to 111.

    **Concept Tested:** Truth Table

---

#### 5. Which expression is equivalent to A ⊕ B (XOR)?

<div class="upper-alpha" markdown>
1. AB + A'B'
2. A'B + AB'
3. (A + B)'
4. A'B'
</div>

??? question "Show Answer"
    The correct answer is **B**. XOR (exclusive OR) outputs 1 when exactly one input is 1. The expression A'B + AB' captures this: either A is 0 and B is 1, or A is 1 and B is 0. Option A describes XNOR (equivalence), not XOR.

    **Concept Tested:** Boolean Expression

---

#### 6. What is the Commutative Law of Boolean algebra?

<div class="upper-alpha" markdown>
1. A + (B + C) = (A + B) + C
2. A + B = B + A
3. A + A = A
4. A + 0 = A
</div>

??? question "Show Answer"
    The correct answer is **B**. The Commutative Law states that the order of operands doesn't matter: A + B = B + A and AB = BA. Option A is the Associative Law, option C is the Idempotent Law, and option D is the Identity Law.

    **Concept Tested:** Commutative Law

---

#### 7. Simplify the expression ABC + ABC' using Boolean algebra.

<div class="upper-alpha" markdown>
1. ABC
2. AB
3. AC
4. A
</div>

??? question "Show Answer"
    The correct answer is **B**. Factor out AB: ABC + ABC' = AB(C + C'). By the Complement Law, C + C' = 1. Therefore, AB(1) = AB. This is a common simplification pattern where a variable and its complement appear in adjacent terms.

    **Concept Tested:** Algebraic Simplification

---

#### 8. What is a Boolean function?

<div class="upper-alpha" markdown>
1. A circuit made of logic gates
2. A mapping from Boolean input combinations to Boolean outputs
3. A variable that can only be 0 or 1
4. A type of arithmetic operation
</div>

??? question "Show Answer"
    The correct answer is **B**. A Boolean function is a mathematical mapping that takes Boolean input combinations (each variable being 0 or 1) and produces a Boolean output (0 or 1). It defines the relationship between inputs and outputs, which can then be implemented as a circuit.

    **Concept Tested:** Boolean Function

---

#### 9. According to the Distributive Law, what is A(B + C)?

<div class="upper-alpha" markdown>
1. AB + C
2. AB + AC
3. A + BC
4. ABC
</div>

??? question "Show Answer"
    The correct answer is **B**. The Distributive Law states A(B + C) = AB + AC. This is similar to distribution in regular algebra. Boolean algebra also has a unique dual form: A + BC = (A + B)(A + C), which differs from standard algebra.

    **Concept Tested:** Distributive Law

---

#### 10. What does the Complement Law state about A · A'?

<div class="upper-alpha" markdown>
1. A · A' = 1
2. A · A' = 0
3. A · A' = A
4. A · A' = A'
</div>

??? question "Show Answer"
    The correct answer is **B**. The Complement Law states that A · A' = 0 (a variable ANDed with its complement is always 0) and A + A' = 1 (a variable ORed with its complement is always 1). This makes sense: A and A' can never both be true simultaneously.

    **Concept Tested:** Complement Law
