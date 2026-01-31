---
title: Combinational Logic Design Fundamentals
description: Learn systematic methodology for designing circuits where outputs depend only on current inputs
generated_by: claude skill chapter-content-generator
date: 2026-01-31 16:30:00
version: 0.03
---

# Combinational Logic Design Fundamentals

## Summary

This chapter introduces the systematic methodology for designing combinational logic circuits where outputs depend only on current inputs. Students will learn the distinction between combinational and sequential logic, how to map Boolean expressions to gate-level implementations, canonical representations including Sum of Products (SOP) and Product of Sums (POS), minterms and maxterms, and the foundations of logic minimization including an introduction to Karnaugh maps. These design techniques form the core workflow for creating digital circuits from specifications.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Combinational Logic
2. Sequential Logic
3. Gate-Level Design
4. Boolean to Gates Mapping
5. Multi-Level Logic
6. Two-Level Logic
7. Sum of Products
8. Product of Sums
9. Minterm
10. Maxterm
11. Canonical Form
12. Standard Form
13. Minimal Form
14. Logic Minimization
15. Algebraic Simplification
16. Factoring
17. Common Term Extraction
18. Karnaugh Map
19. K-Map 2 Variable
20. K-Map 3 Variable

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Boolean Algebra Fundamentals](../02-boolean-algebra-fundamentals/index.md)
- [Chapter 3: Logic Gates and Digital Signal Properties](../03-logic-gates-digital-signals/index.md)

---

## Introduction: The Art of Digital Construction

Imagine you're an architect, but instead of designing buildings, you're designing the logic that powers everything from coffee makers to spacecraft. You've learned the "words" (Boolean variables) and the "grammar" (Boolean algebra laws). You've met the "building materials" (logic gates). Now it's time to learn how to actually *construct* something.

Welcome to combinational logic design—the art and science of turning "what I want the circuit to do" into "here's exactly how to build it." This is where you stop being a tourist in Digital Logic Land and become a licensed contractor.

Here's the exciting part: by the end of this chapter, you'll have a systematic process that can turn *any* truth table into a working circuit. Give me any input-output specification, and you'll know exactly how to implement it. No guessing, no magic—just methodical engineering.

But before we start building, we need to understand what makes combinational logic special, and how it differs from its more complicated cousin: sequential logic.

## Combinational vs. Sequential Logic: The Great Divide

The world of digital logic is divided into two kingdoms, and understanding the boundary between them is crucial.

### Combinational Logic: The Amnesiac

**Combinational logic** circuits have a simple rule: the outputs depend *only* on the current inputs. Nothing else matters—not what happened a nanosecond ago, not what might happen next. Combinational circuits have no memory, no state, no history. They're like that friend who genuinely can't remember what they were talking about five seconds ago.

Change the inputs? The outputs change accordingly. Remove the inputs? The outputs have no idea what they were doing before.

Think of a combinational circuit like a vending machine price display. Put in a candy bar code, it shows $1.50. Put in a soda code, it shows $2.00. The display doesn't remember what the last item was—it just responds to the current input.

Examples of combinational circuits:

- Adders (compute A + B)
- Multiplexers (select one of many inputs)
- Decoders (convert binary code to one-hot)
- Comparators (is A > B?)

### Sequential Logic: The Historian

**Sequential logic** circuits, by contrast, have memory. Their outputs depend on both the current inputs AND the history of past inputs. They remember things. They have *state*.

A sequential circuit is like a combination lock. Entering "5" doesn't open it—you need to have entered the correct sequence of numbers in the right order. The lock "remembers" your previous entries.

We'll explore sequential logic in depth in later chapters. For now, just understand the distinction:

| Feature | Combinational | Sequential |
|---------|--------------|------------|
| Memory | None | Has state |
| Output depends on | Current inputs only | Current inputs + history |
| Time dependency | None (instantaneous*) | Clock-dependent |
| Examples | Adders, MUX, decoders | Counters, registers, FSMs |

*Well, instantaneous after propagation delay, as we learned!

#### Diagram: Combinational vs Sequential Logic

<iframe src="../../sims/comb-vs-seq/main.html" width="100%" height="450" scrolling="no"></iframe>

<details markdown="1">
<summary>Combinational vs Sequential Logic Comparison</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Contrast

Learning Objective: Students will be able to contrast combinational and sequential circuits by observing that combinational outputs respond only to current inputs while sequential outputs depend on input history.

Instructional Rationale: Side-by-side comparison with the same input sequence applied to both circuit types makes the fundamental difference concrete and memorable.

Canvas Layout:

- Split view: Combinational circuit on left, Sequential circuit on right
- Each side has: input controls, circuit symbol, and output display
- Sequence of inputs shown as timeline at bottom
- Clear labels: "No Memory" vs "Has Memory"

Interactive Elements:

- Shared input buttons that apply to both circuits
- "Apply Input" button triggers input change
- Combinational side: output changes immediately based on current input
- Sequential side: output depends on sequence of previous inputs
- History display showing past inputs for sequential side
- Reset button to clear sequential state

Data Visibility:

- Current input prominently displayed
- Current output for each circuit type
- Input history log for sequential circuit
- State indicator for sequential circuit

Visual Style:

- Combinational: simple gate symbol (cloud shape)
- Sequential: gate symbol with feedback loop and state bubble
- Color coding: inputs blue, combinational output green, sequential output purple
- Timeline showing input history

Implementation: p5.js with state tracking for sequential demonstration
</details>

!!! tip "Why This Matters"
    This distinction is fundamental. When someone shows you a circuit and asks "Is it combinational or sequential?", look for memory elements (latches, flip-flops, feedback loops). If there are none, it's combinational. If the output can be different for the same current input (depending on what happened before), it's sequential.

## Gate-Level Design: From Equations to Circuits

Now let's talk about the core skill of this chapter: **gate-level design**—the process of implementing Boolean functions using actual logic gates.

The good news is that this is remarkably straightforward once you understand the mapping. Every Boolean operation corresponds to a logic gate:

| Boolean Operation | Gate | Symbol Description |
|-------------------|------|-------------------|
| \(\overline{A}\) | NOT | Triangle with bubble |
| \(A \cdot B\) | AND | D-shape |
| \(A + B\) | OR | Shield shape |
| \(\overline{A \cdot B}\) | NAND | D-shape with bubble |
| \(\overline{A + B}\) | NOR | Shield with bubble |

### Boolean to Gates Mapping

Here's the systematic process for converting any Boolean expression to a gate circuit:

1. **Identify the operations** in the expression
2. **Draw gates** for each operation
3. **Connect inputs** according to the expression structure
4. **Wire the outputs** to create the final output

Let's walk through an example. Consider the expression:

\[F = A \cdot B + \overline{C}\]

This expression has:

- An AND operation: \(A \cdot B\)
- A NOT operation: \(\overline{C}\)
- An OR operation: combining the two results

So we need: one AND gate, one NOT gate (inverter), and one OR gate.

The wiring flows from left to right:

1. A and B feed into the AND gate → produces \(A \cdot B\)
2. C feeds into the NOT gate → produces \(\overline{C}\)
3. Both results feed into the OR gate → produces \(F\)

#### Diagram: Boolean to Gates Mapper

<iframe src="../../sims/bool-to-gates-mapper/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Boolean Expression to Gate Circuit Mapper</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will be able to execute the transformation from a Boolean expression to a gate-level circuit by parsing the expression and selecting appropriate gates.

Instructional Rationale: Interactive mapping with step-by-step visualization helps students internalize the direct correspondence between Boolean operations and physical gates.

Canvas Layout:

- Top: Text input for Boolean expression with example buttons
- Middle: Parse tree visualization showing operation hierarchy
- Bottom: Resulting gate circuit with labeled connections
- Side panel: Legend showing operation-to-gate mapping

Interactive Elements:

- Text input field accepting expressions (*, +, ! for NOT)
- Example expression buttons: "A*B", "A+B", "!A", "A*B+!C", "(A+B)*C"
- Step-through mode: see expression parsed into operations, then gates placed
- Final circuit is interactive—toggle inputs to verify output
- Clear button to start over

Data Visibility:

- Original expression displayed
- Parsed operations highlighted in sequence
- Each gate labeled with its Boolean sub-expression
- Truth table verification for the expression

Visual Style:

- Clean gate symbols using logic-gate-lib style
- Connection wires animated as they're drawn
- Color coding: AND gates blue, OR gates orange, NOT gates gray
- Parse tree with rounded boxes for operations

Implementation: p5.js with expression parser and gate layout algorithm
</details>

## Two-Level vs. Multi-Level Logic

When designing circuits, you have a choice about how to organize your gates. This choice affects cost, speed, and complexity.

### Two-Level Logic

**Two-level logic** implementations have at most two levels of gates between inputs and output (not counting inverters on inputs). This typically means:

- First level: AND gates (computing product terms)
- Second level: One OR gate (combining the products)

Or the dual:

- First level: OR gates (computing sum terms)
- Second level: One AND gate (combining the sums)

Two-level logic has a major advantage: **predictable and minimal delay**. Every signal path goes through exactly two gates (plus any input inversions). This makes timing analysis simple.

### Multi-Level Logic

**Multi-level logic** uses more than two levels of gates. This usually results from factoring an expression to reduce the total gate count.

Consider the expression:

\[F = A \cdot C + A \cdot D + B \cdot C + B \cdot D\]

In two-level form, this needs four AND gates and one OR gate—5 gates total with 8 inputs.

But wait! We can factor:

\[F = A \cdot (C + D) + B \cdot (C + D) = (A + B) \cdot (C + D)\]

Now we need only two OR gates and one AND gate—3 gates with 4 inputs. That's a significant savings!

The tradeoff? The factored version might have three levels of gates (OR → OR → AND), which could mean more delay.

| Approach | Advantages | Disadvantages |
|----------|------------|---------------|
| Two-Level | Predictable delay, simple timing | May need more gates |
| Multi-Level | Often fewer gates | Variable delay, harder timing |

!!! info "Designer's Choice"
    In practice, designers choose based on constraints. Need fastest possible circuit? Favor two-level. Need minimum chip area? Favor multi-level with factoring. Modern synthesis tools explore many options automatically.

#### Diagram: Two-Level vs Multi-Level Comparison

<iframe src="../../sims/two-vs-multi-level/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Two-Level vs Multi-Level Logic Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will be able to compare two-level and multi-level implementations of the same function, analyzing the tradeoffs in gate count and propagation delay.

Instructional Rationale: Side-by-side comparison with metrics display helps students develop intuition for the engineering tradeoffs in circuit design.

Canvas Layout:

- Top: Shared Boolean expression display
- Left panel: Two-level implementation
- Right panel: Multi-level (factored) implementation
- Bottom: Metrics comparison (gate count, input count, max delay)

Interactive Elements:

- Expression selector with examples that can be factored
- Toggle inputs to verify both circuits produce same output
- Highlight critical path (longest delay path) in each implementation
- Metrics update automatically when expression changes
- Animation showing signal propagation through both circuits

Data Visibility:

- Gate count for each implementation
- Total inputs (fan-in sum)
- Critical path delay (in gate delays)
- Verification: both outputs should always match

Visual Style:

- Clean circuit diagrams with aligned outputs
- Critical path highlighted in orange
- Metrics displayed as comparison bars
- Expression shown with original and factored forms

Implementation: p5.js with dual circuit rendering and delay calculation
</details>

## Canonical Forms: The Standard Representations

When we specify a Boolean function, we need a standard way to represent it—a "canonical form" that's unique for each function. This makes comparison, simplification, and implementation straightforward.

There are two main canonical forms, and they're duals of each other.

### Sum of Products (SOP)

**Sum of Products (SOP)** is an OR of AND terms. In Boolean notation, "sum" means OR and "product" means AND. So SOP is:

\[F = (\text{product}_1) + (\text{product}_2) + (\text{product}_3) + ...\]

Each product term is an AND of literals (variables or their complements).

Example SOP expression:

\[F = A \cdot \overline{B} \cdot C + A \cdot B \cdot \overline{C} + \overline{A} \cdot B \cdot C\]

This has three product terms, OR-ed together. Each product term has all three variables (either normal or complemented).

**SOP leads to a two-level AND-OR implementation:**

- Level 1: AND gates compute each product term
- Level 2: OR gate combines the products

### Product of Sums (POS)

**Product of Sums (POS)** is an AND of OR terms. It's the dual of SOP:

\[F = (\text{sum}_1) \cdot (\text{sum}_2) \cdot (\text{sum}_3) \cdot ...\]

Each sum term is an OR of literals.

Example POS expression:

\[F = (A + \overline{B} + C) \cdot (A + B + \overline{C}) \cdot (\overline{A} + B + C)\]

This has three sum terms, AND-ed together.

**POS leads to a two-level OR-AND implementation:**

- Level 1: OR gates compute each sum term
- Level 2: AND gate combines the sums

Here's the beautiful thing: **any Boolean function can be expressed in either SOP or POS form**. They're both complete representations. Which one you choose often depends on which leads to a simpler expression.

## Minterms and Maxterms: The Building Blocks

To fully understand canonical forms, we need to meet minterms and maxterms—the fundamental building blocks.

### Minterms

A **minterm** is a product term that includes every variable exactly once (either normal or complemented). For a function of variables A, B, C, a minterm might be:

- \(A \cdot B \cdot C\) (all normal)
- \(A \cdot \overline{B} \cdot C\) (B complemented)
- \(\overline{A} \cdot \overline{B} \cdot \overline{C}\) (all complemented)

The key property of a minterm: **it equals 1 for exactly one input combination and 0 for all others**.

For example, \(A \cdot \overline{B} \cdot C\) equals 1 only when A=1, B=0, C=1.

We name minterms using subscript notation based on the binary value they represent:

| A | B | C | Minterm | Symbol |
|---|---|---|---------|--------|
| 0 | 0 | 0 | \(\overline{A} \cdot \overline{B} \cdot \overline{C}\) | \(m_0\) |
| 0 | 0 | 1 | \(\overline{A} \cdot \overline{B} \cdot C\) | \(m_1\) |
| 0 | 1 | 0 | \(\overline{A} \cdot B \cdot \overline{C}\) | \(m_2\) |
| 0 | 1 | 1 | \(\overline{A} \cdot B \cdot C\) | \(m_3\) |
| 1 | 0 | 0 | \(A \cdot \overline{B} \cdot \overline{C}\) | \(m_4\) |
| 1 | 0 | 1 | \(A \cdot \overline{B} \cdot C\) | \(m_5\) |
| 1 | 1 | 0 | \(A \cdot B \cdot \overline{C}\) | \(m_6\) |
| 1 | 1 | 1 | \(A \cdot B \cdot C\) | \(m_7\) |

**Memory trick**: The minterm \(m_i\) equals 1 when the inputs spell out the binary number \(i\). So \(m_5\) (which is 101 in binary) equals 1 when A=1, B=0, C=1.

### Maxterms

A **maxterm** is the dual concept—a sum term that includes every variable exactly once. For variables A, B, C:

- \(A + B + C\) (all normal)
- \(A + \overline{B} + C\) (B complemented)

The key property of a maxterm: **it equals 0 for exactly one input combination and 1 for all others**.

Maxterms are named \(M_i\), but with a twist: the complement is applied *oppositely* compared to minterms. Maxterm \(M_i\) equals 0 when the inputs spell binary \(i\).

| A | B | C | Maxterm | Symbol |
|---|---|---|---------|--------|
| 0 | 0 | 0 | \(A + B + C\) | \(M_0\) |
| 0 | 0 | 1 | \(A + B + \overline{C}\) | \(M_1\) |
| 0 | 1 | 0 | \(A + \overline{B} + C\) | \(M_2\) |
| 1 | 1 | 1 | \(\overline{A} + \overline{B} + \overline{C}\) | \(M_7\) |

Notice the pattern: in a maxterm, a variable appears complemented if its corresponding input bit is 1, and normal if its bit is 0. (This is opposite of minterms!)

#### Diagram: Minterm and Maxterm Explorer

<iframe src="../../sims/minterm-maxterm/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Minterm and Maxterm Explorer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will be able to explain how minterms and maxterms are constructed from input combinations and how they relate to truth table rows.

Instructional Rationale: Interactive exploration with immediate feedback helps students see the pattern in minterm/maxterm construction without memorization.

Canvas Layout:

- Left: Input variable selectors (A, B, C values)
- Center: Visual construction showing how minterm/maxterm is built
- Right: Truth table with current combination highlighted
- Bottom: Symbol notation and the constructed expression

Interactive Elements:

- Three toggle buttons for A, B, C input values
- Live construction showing variable → literal transformation
- Toggle between minterm and maxterm view
- Truth table row highlighting matching current selection
- Animation showing "why" the term equals 1/0 for that input

Data Visibility:

- Current input combination prominently displayed
- Step-by-step construction of the term
- Resulting minterm/maxterm with proper notation
- Evaluation verification (term = 1 or 0)

Visual Style:

- Variables shown with overline or normal based on rules
- Arrow diagram: input bit → how variable appears in term
- Highlighted truth table cell
- Clear minterm (m) vs maxterm (M) labeling

Implementation: p5.js with dynamic expression construction
</details>

## Canonical SOP and POS Forms

Now we can define the true canonical forms:

### Canonical SOP (Sum of Minterms)

The **canonical SOP** is the OR of all minterms for which the function equals 1. If a function F(A,B,C) equals 1 for inputs (0,1,1), (1,0,1), and (1,1,0), then:

\[F = m_3 + m_5 + m_6 = \sum m(3, 5, 6)\]

The \(\sum m\) notation is shorthand for "sum of minterms."

### Canonical POS (Product of Maxterms)

The **canonical POS** is the AND of all maxterms for which the function equals 0. For the same function:

\[F = M_0 \cdot M_1 \cdot M_2 \cdot M_4 \cdot M_7 = \prod M(0, 1, 2, 4, 7)\]

The \(\prod M\) notation means "product of maxterms."

Here's the magic: these two forms represent the same function! SOP tells us "when is it 1?" POS tells us "when is it not 0?"

!!! example "Converting a Truth Table to Canonical Forms"
    Given this truth table:

    | A | B | C | F |
    |---|---|---|---|
    | 0 | 0 | 0 | 0 |
    | 0 | 0 | 1 | 1 |
    | 0 | 1 | 0 | 0 |
    | 0 | 1 | 1 | 1 |
    | 1 | 0 | 0 | 1 |
    | 1 | 0 | 1 | 1 |
    | 1 | 1 | 0 | 0 |
    | 1 | 1 | 1 | 0 |

    **Canonical SOP**: F=1 for rows 1, 3, 4, 5:
    \[F = m_1 + m_3 + m_4 + m_5 = \overline{A}\overline{B}C + \overline{A}BC + A\overline{B}\overline{C} + A\overline{B}C\]

    **Canonical POS**: F=0 for rows 0, 2, 6, 7:
    \[F = M_0 \cdot M_2 \cdot M_6 \cdot M_7 = (A+B+C)(A+\overline{B}+C)(\overline{A}+\overline{B}+C)(\overline{A}+\overline{B}+\overline{C})\]

## Standard Form vs. Canonical Form vs. Minimal Form

These terms can be confusing, so let's clarify:

### Canonical Form

**Canonical form** is the "complete" representation where every term contains all variables. There's exactly one canonical SOP and one canonical POS for each function. It's unique but usually not minimal.

### Standard Form

**Standard form** is a relaxed version—an SOP or POS where terms don't need to contain all variables. Standard form is usually simpler than canonical but still systematic.

Examples of standard SOP:

- \(A + BC\) (first term has one variable, second has two)
- \(AB + C\) (different term sizes)

### Minimal Form

**Minimal form** has the fewest literals (variable occurrences) possible while still being in SOP or POS form. Finding the minimal form is the goal of logic minimization.

| Form | Description | Example for same function |
|------|-------------|--------------------------|
| Canonical SOP | All minterms where F=1 | \(\overline{A}BC + A\overline{B}C + AB\overline{C} + ABC\) |
| Standard SOP | Any valid SOP | \(BC + AC + AB\) |
| Minimal SOP | Fewest literals | \(AB + BC + AC\) or simpler |

## Logic Minimization: Why and How

Why do we want to minimize logic? Several reasons:

- **Fewer gates** = less hardware cost
- **Fewer inputs** = smaller chip area
- **Shorter paths** = less power consumption
- **Simpler circuits** = easier debugging

Logic minimization finds the simplest expression that implements a given function. There are two main approaches.

### Algebraic Simplification

**Algebraic simplification** uses the Boolean algebra laws you learned in Chapter 2 to reduce an expression. This is an art as much as a science—you need experience to spot which laws to apply.

Let's work through an example:

\[F = A\overline{B}C + A\overline{B}\overline{C} + \overline{A}BC\]

Step 1: Factor \(A\overline{B}\) from the first two terms:
\[F = A\overline{B}(C + \overline{C}) + \overline{A}BC\]

Step 2: Apply complement law (\(C + \overline{C} = 1\)):
\[F = A\overline{B}(1) + \overline{A}BC\]

Step 3: Apply identity law:
\[F = A\overline{B} + \overline{A}BC\]

We reduced from 9 literals to 5 literals. Not bad!

### Common Simplification Techniques

Here are the most useful techniques:

**Factoring**: Pull out common terms
\[AB + AC = A(B + C)\]

**Common Term Extraction**: Identify shared sub-expressions
\[ABC + \overline{A}BC = BC(A + \overline{A}) = BC\]

**Absorption**: Remove redundant terms
\[A + AB = A\]

**Consensus**: Remove the consensus term
\[AB + \overline{A}C + BC = AB + \overline{A}C\]

#### Diagram: Algebraic Simplification Stepper

<iframe src="../../sims/algebraic-simplify/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>Algebraic Simplification Step-by-Step Demonstrator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Apply

Learning Objective: Students will be able to apply Boolean algebra laws to simplify expressions step by step, identifying which law is used at each stage.

Instructional Rationale: Guided step-through with law identification helps students internalize the simplification process and recognize simplification opportunities.

Canvas Layout:

- Top: Starting expression and current expression display
- Middle: Applicable laws shown as clickable options
- Bottom: History panel showing all steps taken
- Sidebar: Gate count comparison (before/after)

Interactive Elements:

- Select from applicable simplification laws
- Click to apply selected law
- Undo button to step back
- Hint button to suggest next step
- Reset to start with new expression
- Example expressions as quick-start buttons

Data Visibility:

- Original expression preserved at top
- Current simplified expression highlighted
- Each step logged with the law applied
- Running literal count

Visual Style:

- Laws color-coded by type (factoring, absorption, De Morgan, etc.)
- Current simplification highlighted
- Reduction shown as crossed-out terms
- Progress indicator showing simplification percentage

Implementation: p5.js with expression parsing and law matching engine
</details>

## Karnaugh Maps: Visual Simplification

Algebraic simplification is powerful but requires insight and experience. Is there a more systematic approach?

Enter the **Karnaugh Map** (K-map), invented by Maurice Karnaugh in 1953. A K-map is a visual tool that makes simplification almost mechanical. Instead of algebraically manipulating expressions, you spot patterns in a grid.

The key insight: **adjacent cells in a K-map differ by exactly one variable**. This means adjacent 1s can always be combined using the simplification rule \(XY + X\overline{Y} = X\).

### K-Map Structure

A K-map is a grid where:

- Each cell represents one minterm
- Cells are arranged so adjacent cells differ by one variable
- The edges "wrap around" (left connects to right, top to bottom)

### K-Map 2 Variable

The simplest K-map has 2 variables and 4 cells:

```
        B=0   B=1
      +-----+-----+
A=0   |  0  |  1  |
      +-----+-----+
A=1   |  2  |  3  |
      +-----+-----+
```

Each cell corresponds to a minterm: cell 0 is \(m_0 = \overline{A}\overline{B}\), cell 1 is \(m_1 = \overline{A}B\), etc.

To use the K-map:

1. Fill in 1s for each minterm where F=1
2. Group adjacent 1s into rectangles of size 1, 2, or 4
3. Each group becomes one term in the simplified expression
4. Larger groups = simpler terms

#### Diagram: 2-Variable K-Map Interactive

<iframe src="../../sims/kmap-2var/main.html" width="100%" height="450" scrolling="no"></iframe>

<details markdown="1">
<summary>2-Variable Karnaugh Map Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use a 2-variable K-map to find simplified SOP expressions by identifying and grouping adjacent 1s.

Instructional Rationale: Starting with 2 variables allows students to focus on the grouping concept without the complexity of larger maps. Interactive grouping with immediate feedback builds correct technique.

Canvas Layout:

- Main: 2x2 K-map grid with clickable cells
- Left: Variable labels (A rows, B columns)
- Right: Current expression display (updates as groups are made)
- Bottom: Grouping tools and verification

Interactive Elements:

- Click cells to toggle between 0, 1, and don't care (X)
- Draw rectangles to create groups
- Automatic group validation (must be power of 2, rectangular)
- Show resulting term for each valid group
- "Check" button verifies grouping is optimal
- "Auto-solve" to demonstrate correct grouping

Data Visibility:

- Cell values clearly displayed
- Group outlines in distinct colors
- Each group's simplified term shown
- Final combined expression

Visual Style:

- Clean grid with clear cell boundaries
- Groups shown as colored overlays
- Variable labels on all edges
- Gray-code ordering visualization option

Implementation: p5.js with group detection and expression generation
</details>

### K-Map 3 Variable

A 3-variable K-map has 8 cells arranged in a 2×4 grid:

```
          BC=00  BC=01  BC=11  BC=10
        +------+------+------+------+
A=0     |  0   |  1   |  3   |  2   |
        +------+------+------+------+
A=1     |  4   |  5   |  7   |  6   |
        +------+------+------+------+
```

**Important**: The columns are in Gray code order (00, 01, 11, 10), not binary order! This ensures adjacent columns differ by only one bit.

The wrap-around principle: the leftmost column is adjacent to the rightmost column. This can create groups that span the "edges" of the map.

Grouping rules for 3-variable K-maps:

- Groups must be rectangular (1×1, 1×2, 1×4, 2×1, 2×2, 2×4)
- Group size must be a power of 2 (1, 2, 4, 8)
- Larger groups are better (fewer literals in the term)
- Each 1 must be covered by at least one group
- Overlapping groups are allowed (and often necessary)

#### Diagram: 3-Variable K-Map Interactive

<iframe src="../../sims/kmap-3var/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>3-Variable Karnaugh Map Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Solve

Learning Objective: Students will be able to solve 3-variable minimization problems using K-maps, correctly applying Gray code ordering and wrap-around grouping.

Instructional Rationale: The 3-variable K-map introduces Gray code ordering and wrap-around grouping—key concepts that must be mastered before tackling 4-variable maps.

Canvas Layout:

- Main: 2×4 K-map grid with Gray code column labels
- Left: Row variable label (A)
- Top: Column variable labels (BC)
- Right: Expression builder showing terms
- Bottom: Control panel and verification

Interactive Elements:

- Click cells to set values (0, 1, X for don't care)
- Draw groups by clicking and dragging
- Wrap-around highlight when group spans edges
- Auto-complete: suggest optimal grouping
- Step-through mode: watch optimal grouping process
- Example problems with known solutions

Data Visibility:

- Cell values and minterm numbers
- Gray code labels on columns
- Groups with color coding
- Each group's simplified term
- Final minimized expression
- Comparison with canonical form (literal count)

Visual Style:

- Clear Gray code ordering visual
- Wrap-around groups shown with matching colors on both edges
- Group expressions labeled
- "Optimal" indicator when best grouping achieved

Implementation: p5.js with Gray code layout and wrap-around detection
</details>

### K-Map Grouping Rules Summary

Here are the rules for valid K-map groups:

1. **Groups must contain 1, 2, 4, 8, 16... cells** (powers of 2)
2. **Groups must be rectangular** (including squares)
3. **Groups can wrap around edges** (left↔right, top↔bottom)
4. **Every 1 must be in at least one group**
5. **Groups can overlap** (same cell in multiple groups is fine)
6. **Larger groups are preferable** (they produce simpler terms)
7. **Fewer groups are preferable** (fewer terms in final expression)

### Reading Terms from Groups

Once you've identified groups, read the simplified term:

1. Look at which variables are **constant** across the entire group
2. If a variable is always 0 in the group → include as \(\overline{X}\)
3. If a variable is always 1 in the group → include as \(X\)
4. If a variable is both 0 and 1 in the group → **omit it** (it's been simplified away!)

!!! example "K-Map Example"
    For the function \(F = \sum m(0, 1, 2, 5, 7)\) with variables A, B, C:

    ```
          BC=00  BC=01  BC=11  BC=10
        +------+------+------+------+
    A=0 |  1   |  1   |  0   |  1   |
        +------+------+------+------+
    A=1 |  0   |  1   |  1   |  0   |
        +------+------+------+------+
    ```

    Groups:

    - Cells 0, 1 (group of 2): A=0, C varies, B=0 → term: \(\overline{A}\overline{B}\)
    - Cells 1, 5, 3, 7 (group of 4? No—cells 3 is 0): Invalid
    - Let's try: cells 1, 5 (column 01): B=0, C=1, A varies → term: \(\overline{B}C\)
    - Cell 0, 2 (wrap around columns 00 and 10): A=0, C=0, B varies → term: \(\overline{A}\overline{C}\)
    - Wait, let me reconsider for optimal grouping...

    The optimal solution is:
    \[F = \overline{A}\overline{C} + \overline{B}C\]

## Putting It All Together: The Design Workflow

Let's consolidate everything into a systematic design workflow for combinational logic:

1. **Start with the specification** (truth table or word description)
2. **Write the canonical SOP** (from the truth table)
3. **Simplify using K-maps** (or algebraic methods)
4. **Draw the gate-level circuit**
5. **Verify** (trace through with test inputs)

#### Diagram: Complete Design Flow

<iframe src="../../sims/design-workflow/main.html" width="100%" height="600" scrolling="no"></iframe>

<details markdown="1">
<summary>Complete Combinational Logic Design Workflow</summary>
Type: workflow

Bloom Level: Create (L6)
Bloom Verb: Design

Learning Objective: Students will be able to design combinational logic circuits from specification to implementation by following the systematic workflow.

Instructional Rationale: A complete end-to-end example reinforces how all the concepts connect and provides a template students can follow for their own designs.

Workflow Steps:

1. Specification: Enter truth table or word description
2. Canonical Form: Generate SOP from truth table
3. K-Map: Visualize function in K-map format
4. Simplification: Group terms for minimal expression
5. Gate Circuit: Map simplified expression to gates
6. Verification: Test circuit against truth table

Canvas Layout:

- Vertical workflow with expandable panels for each step
- Left: Progress indicator showing current step
- Center: Active step content
- Right: Running example maintained throughout

Interactive Elements:

- Editable truth table input
- Automatic canonical SOP generation
- Interactive K-map grouping
- Gate circuit auto-generated from expression
- Input toggles on final circuit for verification
- Navigation: Next/Previous step buttons

Data Visibility:

- Truth table visible throughout
- Expression at each stage of simplification
- K-map with final groupings
- Gate count and literal count metrics
- Verification results for all input combinations

Visual Style:

- Workflow arrows connecting steps
- Each step in distinct colored panel
- Current step highlighted/expanded
- Checkmarks for completed steps
- Final circuit prominently displayed

Implementation: p5.js with multi-stage state management
</details>

## Common Mistakes to Avoid

As you practice combinational logic design, watch out for these pitfalls:

1. **Confusing canonical and minimal forms**: Canonical is complete (all variables in each term), minimal is simplest. They're usually different!

2. **Wrong Gray code order in K-maps**: Columns must be 00, 01, 11, 10—not 00, 01, 10, 11. Getting this wrong means adjacent cells don't differ by one bit, and your groupings will be invalid.

3. **Forgetting wrap-around**: The edges of K-maps connect! A group can span from the leftmost to rightmost column.

4. **Invalid group sizes**: Groups must be powers of 2. You can't make a group of 3 cells.

5. **Missing 1s**: Every 1 in the K-map must be covered by at least one group.

6. **Not using largest possible groups**: Larger groups give simpler terms. Always try to make groups as large as possible.

7. **Confusing SOP and POS**: SOP groups 1s and uses minterms. POS groups 0s and uses maxterms. Don't mix them up!

## Summary and Key Takeaways

Congratulations! You've learned the systematic methodology for designing combinational logic circuits. Here's what you've mastered:

**Core Concepts:**

- **Combinational logic** has no memory—outputs depend only on current inputs
- **Sequential logic** has memory and state (we'll tackle this later)
- **Gate-level design** maps Boolean operations directly to physical gates

**Canonical Forms:**

- **Sum of Products (SOP)** = OR of AND terms (minterms)
- **Product of Sums (POS)** = AND of OR terms (maxterms)
- **Minterms** (\(m_i\)) equal 1 for exactly one input combination
- **Maxterms** (\(M_i\)) equal 0 for exactly one input combination

**Circuit Structures:**

- **Two-level logic** has predictable delay (AND-OR or OR-AND)
- **Multi-level logic** can reduce gate count through factoring

**Simplification:**

- **Algebraic simplification** applies Boolean laws manually
- **Karnaugh maps** provide visual, systematic simplification
- **Grouping rules**: powers of 2, rectangular, wrap-around allowed
- Larger groups = simpler terms

**The Design Workflow:**

1. Specification → Truth table
2. Truth table → Canonical SOP
3. Canonical SOP → K-map
4. K-map grouping → Minimal expression
5. Minimal expression → Gate circuit
6. Verify!

!!! success "Key Insight"
    Combinational logic design is fundamentally about translation: from what you want (truth table) to how to build it (gates). The canonical forms give you a starting point, and simplification techniques help you find the most efficient implementation. Master this workflow, and you can implement any Boolean function.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
A compelling graphic novel could tell the story of Maurice Karnaugh, a Bell Labs engineer in the 1950s who was frustrated watching his colleagues struggle with algebraic simplification. The visual medium would perfectly capture the "aha moment" when Karnaugh realized that arranging a truth table spatially—where adjacent cells differ by one bit—would make simplification patterns visible at a glance. The climax could show the K-map technique spreading through the engineering world, revolutionizing digital design education and practice.
</details>

## Practice Problems

Test your understanding with these exercises:

??? question "Problem 1: Identify the Type"
    Is a 4-bit binary adder combinational or sequential? Explain your reasoning.

    **Solution:**
    A 4-bit binary adder is **combinational**. The outputs (sum and carry) depend only on the current input values (the two 4-bit numbers to be added). There's no memory of previous additions—change the inputs, and the outputs immediately reflect the new sum. No clock is needed, and no state is maintained.

??? question "Problem 2: Write Canonical SOP"
    Given the truth table where F(A,B,C) = 1 for inputs (0,0,1), (0,1,1), (1,1,0), and (1,1,1), write the canonical SOP expression.

    **Solution:**
    The function equals 1 for minterms 1, 3, 6, and 7:
    \[F = m_1 + m_3 + m_6 + m_7\]
    \[F = \overline{A}\overline{B}C + \overline{A}BC + AB\overline{C} + ABC\]

??? question "Problem 3: Simplify Using a K-Map"
    Simplify \(F(A,B) = \sum m(0, 1, 2)\) using a 2-variable K-map.

    **Solution:**
    ```
            B=0   B=1
          +-----+-----+
    A=0   |  1  |  1  |  ← Group (cells 0,1): term = Ā
          +-----+-----+
    A=1   |  1  |  0  |
          +-----+-----+
    ```
    Group cells 0, 2 (column B=0): term = \(\overline{B}\)
    Group cells 0, 1 (row A=0): term = \(\overline{A}\)

    Minimal SOP: \(F = \overline{A} + \overline{B}\)

??? question "Problem 4: Multi-Level vs Two-Level"
    The expression \(F = AC + AD + BC + BD\) can be factored to \(F = (A+B)(C+D)\). Compare the two implementations in terms of gate count and maximum delay (in gate delays).

    **Solution:**

    **Two-level (unfactored):**

    - 4 AND gates (for AC, AD, BC, BD)
    - 1 OR gate with 4 inputs
    - Total: 5 gates, 2 levels of delay

    **Multi-level (factored):**

    - 2 OR gates (for A+B and C+D)
    - 1 AND gate
    - Total: 3 gates, 2 levels of delay

    The factored version uses 2 fewer gates with the same delay. In this case, multi-level wins on both metrics.

??? question "Problem 5: Convert Between Forms"
    If \(F = \sum m(1, 4, 5, 6, 7)\) for a 3-variable function, write the equivalent \(\prod M\) expression.

    **Solution:**
    If F=1 for minterms 1, 4, 5, 6, 7, then F=0 for minterms 0, 2, 3.

    The POS uses maxterms for where F=0:
    \[F = \prod M(0, 2, 3) = M_0 \cdot M_2 \cdot M_3\]
    \[F = (A+B+C)(A+\overline{B}+C)(A+\overline{B}+\overline{C})\]
