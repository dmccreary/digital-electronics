---
title: Logic Minimization and Karnaugh Maps
description: Master advanced techniques for optimizing Boolean functions to create efficient circuit implementations
generated_by: claude skill chapter-content-generator
date: 2026-01-31 17:00:00
version: 0.03
---

# Logic Minimization and Karnaugh Maps

## Summary

This chapter provides advanced techniques for optimizing Boolean functions to create efficient circuit implementations. Students will master 4-variable Karnaugh maps and their grouping rules, learn to identify prime implicants and essential prime implicants, handle don't-care conditions for further optimization, derive minimal SOP and POS expressions, understand the Quine-McCluskey method for larger functions, and design hazard-free circuits. These optimization skills are critical for creating practical, cost-effective digital systems.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. K-Map 4 Variable
2. K-Map Grouping Rules
3. Adjacent Cells
4. Don't Care Condition
5. Prime Implicant
6. Essential Prime Implicant
7. Implicant Cover
8. Minimal SOP
9. Minimal POS
10. Quine-McCluskey Method
11. Hazard
12. Static Hazard
13. Dynamic Hazard
14. Hazard-Free Design

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Combinational Logic Design Fundamentals](../04-combinational-logic-design/index.md)

---

## Introduction: The Quest for the Perfect Circuit

In Chapter 4, you learned to read the K-map like a treasure map—finding gold (simplified expressions) by grouping adjacent 1s. But here's the thing: we only showed you the small maps. A 2-variable K-map has 4 cells. A 3-variable map has 8. That's cute, but real circuits often have 4, 5, or even more input variables.

Welcome to the big leagues.

This chapter is about becoming a *master* of logic minimization. We're talking 4-variable K-maps with 16 cells, wrap-around groupings that would make a pretzel jealous, and fancy concepts like "prime implicants" that sound like characters from a sci-fi movie but are actually just helpful tools for finding the absolute best circuit.

Why does minimization matter so much? Consider this: a chip with one million gates could potentially be reduced to 600,000 gates with proper optimization. That's 40% less silicon, 40% less power, and 40% less heat. In mobile devices and data centers, that's not just nice—it's essential.

By the end of this chapter, you'll be able to look at a 16-cell K-map, spot the optimal groupings like a hawk spotting a mouse, and confidently declare "this is the minimal expression." Let's level up your optimization game!

## K-Map 4 Variable: The Full-Size Map

A **4-variable K-map** has \(2^4 = 16\) cells, arranged in a 4×4 grid. This is the workhorse of manual logic minimization—large enough to handle real problems, but small enough to work with on paper.

The layout follows Gray code ordering on both axes:

```
            CD
           00   01   11   10
        +----+----+----+----+
AB  00  |  0 |  1 |  3 |  2 |
        +----+----+----+----+
    01  |  4 |  5 |  7 |  6 |
        +----+----+----+----+
    11  | 12 | 13 | 15 | 14 |
        +----+----+----+----+
    10  |  8 |  9 | 11 | 10 |
        +----+----+----+----+
```

Each cell number corresponds to the minterm with that decimal value. Cell 13, for instance, is minterm \(m_{13}\), which is \(ABCD\) with A=1, B=1, C=0, D=1 (binary 1101 = 13).

**Critical observation**: Both axes use Gray code order (00, 01, 11, 10). This ensures that every adjacent cell—horizontally, vertically, and *including wrap-around*—differs by exactly one variable.

### The Wrap-Around Nature

Here's where it gets interesting. In a 4-variable K-map:

- The **top row** is adjacent to the **bottom row** (cells 0-3 are adjacent to cells 8-11)
- The **left column** is adjacent to the **right column** (cells 0,4,12,8 are adjacent to cells 2,6,14,10)
- Even the **corners** are all mutually adjacent!

Think of the K-map as a torus (a donut shape). If you rolled it up left-to-right and then top-to-bottom, adjacent cells would touch. This wrap-around property is essential for finding the largest possible groups.

#### Diagram: 4-Variable K-Map Interactive

<iframe src="../../sims/kmap-4var/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>4-Variable Karnaugh Map Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement

Learning Objective: Students will be able to implement 4-variable K-map simplification by correctly identifying and grouping adjacent cells, including wrap-around groups.

Instructional Rationale: The 4-variable K-map requires understanding both horizontal and vertical wrap-around. Interactive grouping with wrap-around visualization builds correct mental models.

Canvas Layout:

- Main: 4×4 K-map grid with Gray code labels on both axes
- Top: Row variable labels (AB)
- Left: Column variable labels (CD)
- Right: Expression builder showing current groups and terms
- Bottom: Control panel with grouping tools

Interactive Elements:

- Click cells to toggle between 0, 1, and don't care (X)
- Click and drag to create groups
- Wrap-around visualization: when group spans edge, show connection on opposite side
- Color-coded groups (up to 6 different colors)
- Auto-solve button to show optimal grouping
- Step-through mode for learning
- Undo/redo for group editing

Data Visibility:

- Cell values with minterm numbers
- Gray code labels clearly shown
- Each group's simplified term displayed
- Final minimized SOP expression
- Literal count comparison (canonical vs. minimal)

Visual Style:

- Clear 4×4 grid with proper spacing
- Wrap-around groups shown with matching colors on opposite edges
- Dashed lines indicating wrap-around connections
- Group terms labeled with color matching the group
- "Optimal" indicator when best solution achieved

Implementation: p5.js with 2D wrap-around detection and group validation
</details>

## K-Map Grouping Rules: The Complete Guide

Now that we have the full-size map, let's formalize all the grouping rules. These apply to K-maps of any size, but they become especially important with 4 variables.

### Rule 1: Groups Must Be Powers of 2

Valid group sizes are: 1, 2, 4, 8, or 16 cells. You cannot have groups of 3, 5, 6, or 7 cells. Period.

Why? Because each doubling of group size eliminates one variable from the term. A group of 3 doesn't correspond to any valid Boolean simplification.

| Group Size | Variables Eliminated | Term has... |
|------------|---------------------|-------------|
| 1 cell | 0 | All 4 variables |
| 2 cells | 1 | 3 variables |
| 4 cells | 2 | 2 variables |
| 8 cells | 3 | 1 variable |
| 16 cells | 4 | Just 1 (constant) |

### Rule 2: Groups Must Be Rectangular

Groups must form rectangles (including squares). You cannot have L-shaped, T-shaped, or diagonal groups.

Valid shapes:

- 1×1 (single cell)
- 1×2 or 2×1 (two adjacent cells)
- 1×4, 4×1, or 2×2 (four cells)
- 1×8, 8×1, 2×4, or 4×2 (eight cells—possible in 5+ variable maps)
- 4×4 (all sixteen cells)

### Rule 3: Groups Can Wrap Around

The edges connect! This is the sneakiest rule and the one students most often forget.

- Top edge connects to bottom edge
- Left edge connects to right edge
- All four corners are mutually adjacent

A group of 4 cells occupying the four corners of a 4-variable K-map is perfectly valid!

### Rule 4: Every 1 Must Be Covered

Every cell containing a 1 must be included in at least one group. You can't leave any 1s ungrouped—that would mean missing part of the function.

### Rule 5: Overlapping Is Allowed (and Often Required)

A single cell can belong to multiple groups. In fact, overlapping often leads to better solutions because it allows each group to be as large as possible.

### Rule 6: Maximize Group Size

Always use the largest possible groups. A group of 4 is better than two groups of 2, even if both cover the same cells. Larger groups produce simpler terms.

### Rule 7: Minimize the Number of Groups

After maximizing group sizes, use as few groups as possible. Each group becomes one product term, so fewer groups mean fewer terms in your SOP expression.

#### Diagram: K-Map Grouping Rules Demonstrator

<iframe src="../../sims/kmap-grouping-rules/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>K-Map Grouping Rules Interactive Demonstrator</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Demonstrate

Learning Objective: Students will be able to demonstrate understanding of all K-map grouping rules by identifying valid and invalid groups.

Instructional Rationale: Presenting valid and invalid grouping examples side-by-side with rule explanations helps students internalize the constraints before attempting their own groupings.

Canvas Layout:

- Left: Rule selector (list of 7 rules)
- Center: K-map showing example for selected rule
- Right: Valid vs. invalid comparison
- Bottom: Quiz mode toggle

Interactive Elements:

- Click through rules to see examples of each
- For each rule: valid grouping example vs. invalid violation
- "What's wrong?" quiz: show invalid grouping, student identifies the rule violated
- Animated highlighting of rule violations
- Random example generator for practice

Data Visibility:

- Current rule name and description
- Example K-map with grouping
- Clear valid/invalid indicator
- Explanation of why invalid cases fail

Visual Style:

- Valid groupings in green
- Invalid groupings in red with X overlay
- Rule text prominently displayed
- Animation showing wrap-around connections when relevant

Implementation: p5.js with rule library and example database
</details>

## Adjacent Cells: Understanding Adjacency

The concept of **adjacent cells** is fundamental to K-map operation. Two cells are adjacent if they differ in exactly one variable. This is why Gray code ordering is used—it guarantees that physically adjacent cells on the map are logically adjacent.

Let's trace through the adjacency for cell 5 (minterm \(m_5 = \overline{A}BCD\)):

| Cell | Binary | Adjacent to 5? | Differs in... |
|------|--------|----------------|---------------|
| 4 | 0100 | Yes | D (0→1) |
| 7 | 0111 | Yes | C (0→1) |
| 1 | 0001 | Yes | B (1→0) |
| 13 | 1101 | Yes | A (0→1) |
| 6 | 0110 | No | C and D both differ |

Cell 5 has exactly four adjacent cells: 4, 7, 1, and 13. Notice that 13 is not physically next to 5 on the map, but they're logically adjacent (wrap-around on the AB axis).

!!! tip "Adjacency Test"
    To check if two cells are adjacent, convert their minterm numbers to binary and count how many bits differ. If exactly one bit differs, they're adjacent. If more than one bit differs, they're not adjacent.

### Why Adjacency Matters

When you group adjacent cells, you're exploiting the simplification:

\[X \cdot Y + X \cdot \overline{Y} = X\]

Two adjacent cells differ by one variable, so that variable cancels out when they're grouped. Four adjacent cells (differing in two variables) cancel two variables. This is the mathematical magic behind K-map simplification.

## Don't Care Conditions: Free Optimization

In real designs, certain input combinations might never occur—or if they do occur, we don't care what the output is. These are called **don't care conditions**, and they're optimization gold.

Don't cares are marked with an "X" (or sometimes "d") in truth tables and K-maps. The key insight:

> **You can treat don't cares as either 0 or 1, whichever gives you a better grouping.**

### Why Don't Cares Exist

Don't cares arise in several situations:

1. **Physically impossible inputs**: In a BCD (Binary Coded Decimal) system, inputs 10-15 can never occur because BCD only uses 0-9.

2. **Illegal input states**: A system might have constraints that make certain combinations impossible (e.g., "A and B are never both 1").

3. **Outputs we don't care about**: Sometimes the output doesn't matter for certain inputs (e.g., we only care about the display during normal operation, not during reset).

### Using Don't Cares

When simplifying, treat each don't care as either 0 or 1, choosing whichever helps you:

- Make groups larger
- Make fewer groups
- Simplify the final expression

You don't have to be consistent—one X might be treated as 1 (included in a group) while another X is treated as 0 (left out).

!!! example "Don't Care Example"
    Consider a function with: \(F = \sum m(1, 3, 7) + d(0, 5)\)

    The 1s are at cells 1, 3, 7. The don't cares are at cells 0 and 5.

    Without don't cares, we might group {1, 3} and {3, 7}, getting: \(\overline{A}D + BC\)

    With don't cares, we could include cell 5 with cells 1, 3, 7 (if positions allow) to make a larger group. The X at cell 0 might let us extend another group.

#### Diagram: Don't Care Optimization

<iframe src="../../sims/dont-care/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Don't Care Condition Optimizer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will be able to use don't care conditions to create larger K-map groups and achieve more minimal expressions.

Instructional Rationale: Interactive comparison showing minimization with and without don't cares demonstrates the tangible benefit of treating don't cares strategically.

Canvas Layout:

- Left: K-map with 1s, 0s, and Xs
- Right: Split view showing:
  - Top: Minimal expression ignoring don't cares
  - Bottom: Minimal expression using don't cares optimally
- Bottom: Literal count comparison

Interactive Elements:

- Click cells to cycle through 0, 1, X
- Automatic grouping shown for both approaches
- Highlight which Xs are treated as 1s in optimal solution
- Toggle: Show/hide how each X is being used
- Example problems demonstrating significant savings

Data Visibility:

- Both expressions displayed
- Gate count for both solutions
- Literal count comparison
- Which don't cares are used vs. ignored

Visual Style:

- X cells in distinct color (purple or gray)
- Groups that include X cells show X with green highlight
- X cells not used shown with gray highlight
- Comparison metrics as bar chart

Implementation: p5.js with dual minimization engine
</details>

## Prime Implicants: The Building Blocks

Now we get into the formal terminology that makes you sound like a real digital designer (and helps you pass exams).

A **prime implicant** is a product term that:

1. Covers (is true for) one or more minterms of the function
2. Cannot be combined with another implicant to form a simpler term

In K-map terms, a prime implicant is a **group that cannot be made any larger**. It's "maxed out."

Consider a group of 2 cells. If you could expand it to 4 cells (by including two more adjacent 1s or don't cares), then the 2-cell group is *not* a prime implicant—it's not maximal. Only when a group cannot grow further is it a prime implicant.

### Finding Prime Implicants

To find all prime implicants:

1. Start with each 1 in the K-map
2. For each 1, find the largest group containing it
3. The collection of all such maximal groups gives you the prime implicants

Some 1s might be covered by multiple different maximal groups, which is fine—all of those groups are prime implicants.

!!! info "Prime vs. Implicant"
    An **implicant** is any product term that implies the function (is true only when F=1). An implicant doesn't have to be maximal.

    A **prime implicant** is a maximal implicant—one that can't be simplified further.

    Think of it like: all prime implicants are implicants, but not all implicants are prime.

## Essential Prime Implicants: The Must-Haves

Here's where optimization gets interesting. An **essential prime implicant** is a prime implicant that covers at least one minterm *not covered by any other prime implicant*.

In other words, if a minterm can only be covered by one prime implicant, that prime implicant is essential—you *must* include it in your final expression.

### Finding Essential Prime Implicants

The process:

1. Identify all prime implicants
2. For each minterm, list which prime implicants cover it
3. If a minterm is covered by only one prime implicant, that prime implicant is essential
4. All essential prime implicants must be in the final solution

### The Selection Process

After including all essential prime implicants, you may still have minterms that aren't covered. For these, you need to select additional prime implicants. The goal: cover all remaining minterms with the fewest additional prime implicants (preferably the largest ones).

This is where the problem can get tricky—sometimes there are multiple equally good solutions.

#### Diagram: Prime Implicant Finder

<iframe src="../../sims/prime-implicants/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>Prime and Essential Prime Implicant Identifier</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Identify

Learning Objective: Students will be able to identify all prime implicants and essential prime implicants in a K-map, distinguishing between required and optional implicants.

Instructional Rationale: Visual identification of which minterms are covered by which prime implicants builds understanding of why certain implicants are essential while others are optional.

Canvas Layout:

- Left: K-map with all 1s and don't cares marked
- Center: List of all prime implicants with their coverage
- Right: Essential prime implicant selection panel
- Bottom: Final minimal expression construction

Interactive Elements:

- Click cells to set up function
- "Find All Prime Implicants" button
- Prime implicants shown as colored groups
- Hover over minterm to see which PIs cover it
- Essential PIs highlighted automatically
- Step-through mode showing selection process
- "Why essential?" explanation on hover

Data Visibility:

- All prime implicants listed with their terms
- Coverage matrix: which PIs cover which minterms
- Essential PIs marked with star
- Uncovered minterms highlighted
- Final selection with justification

Visual Style:

- Prime implicants in distinct colors
- Essential PIs with bold outlines
- Minterms with single coverage highlighted
- Coverage lines from minterms to PIs
- Selection checkboxes for non-essential PIs

Implementation: p5.js with prime implicant finding algorithm
</details>

## Implicant Cover: Finding the Complete Solution

An **implicant cover** is a set of prime implicants that, together, cover all minterms of the function. The goal is to find the *minimum cover*—the smallest set of prime implicants that covers everything.

### The Covering Algorithm

1. **Start with essential prime implicants**: These must be in every valid cover
2. **Remove covered minterms**: Mark all minterms covered by essential PIs
3. **Cover remaining minterms**: Select additional prime implicants to cover any uncovered minterms
4. **Minimize**: If multiple choices exist, prefer larger PIs (fewer literals) and fewer PIs (fewer terms)

### When Multiple Covers Exist

Sometimes there are multiple minimal covers with the same cost. For example, if you have two remaining minterms and two different PIs could each cover one, you might have choices:

- Cover minterm A with PI-1, minterm B with PI-2
- Or use a different combination

Both might give the same number of literals. In such cases, any minimal cover is correct.

!!! tip "Practical Hint"
    When you have options, also consider:

    - Gate fan-in limits (wider gates may not be available)
    - Signal timing (some paths may be more critical)
    - Physical layout (some groupings may route better)

    In practice, synthesis tools evaluate many factors beyond just literal count.

## Minimal SOP: The Simplest AND-OR Form

The **minimal SOP** (Sum of Products) is the SOP expression with the fewest literals. This is what all our K-map work has been building toward.

To find the minimal SOP:

1. Draw the K-map for the function
2. Mark all 1s (and don't cares if available)
3. Find all prime implicants
4. Identify essential prime implicants
5. Select a minimum cover
6. Write the SOP expression from the selected implicants

Each selected prime implicant becomes one product term. The OR of all these terms is your minimal SOP.

### Reading Terms from the K-Map

Remember from Chapter 4: for each group, identify which variables are constant:

- Variable always 1 in group → include as-is
- Variable always 0 in group → include complemented
- Variable varies within group → omit (it's been simplified out)

!!! example "Minimal SOP Example"
    For \(F(A,B,C,D) = \sum m(0, 2, 5, 7, 8, 10, 13, 15)\):

    The K-map reveals groups:

    - Cells 0, 2, 8, 10 form a 4-cell group: \(\overline{B}\overline{D}\)
    - Cells 5, 7, 13, 15 form a 4-cell group: \(BD\)

    Both are essential (each covers cells not covered by the other).

    Minimal SOP: \(F = \overline{B}\overline{D} + BD\)

    This is beautifully symmetric—and much simpler than the 8-term canonical form!

## Minimal POS: The Simplest OR-AND Form

The **minimal POS** (Product of Sums) is the dual approach—an AND of OR terms with the fewest literals.

To find the minimal POS using K-maps:

1. Draw the K-map
2. Mark all the **0s** (instead of 1s)
3. Group the 0s using the same rules
4. Each group of 0s becomes a sum term (maxterm-style)
5. AND the sum terms together

Alternatively, you can find the minimal SOP for \(\overline{F}\) (the complement), then apply De Morgan's theorem to convert to POS form for \(F\).

### When to Use POS vs. SOP

Use the form that's simpler for your function:

- If the function has more 1s than 0s → POS might be simpler (fewer 0s to group)
- If the function has more 0s than 1s → SOP might be simpler (fewer 1s to group)
- If they're equal → compute both and compare

| Function | SOP Groups | POS Groups | Choose... |
|----------|------------|------------|-----------|
| F with 12 ones, 4 zeros | Groups of 1s (12) | Groups of 0s (4) | POS likely simpler |
| F with 4 ones, 12 zeros | Groups of 1s (4) | Groups of 0s (12) | SOP likely simpler |

#### Diagram: SOP vs POS Comparison

<iframe src="../../sims/sop-vs-pos/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Minimal SOP vs Minimal POS Comparison</summary>
Type: microsim

Bloom Level: Evaluate (L5)
Bloom Verb: Compare

Learning Objective: Students will be able to compare minimal SOP and minimal POS forms and evaluate which is more efficient for a given function.

Instructional Rationale: Side-by-side visualization of both minimization approaches helps students understand when each form is preferable.

Canvas Layout:

- Center: Shared K-map showing the function
- Left panel: SOP minimization (grouping 1s)
- Right panel: POS minimization (grouping 0s)
- Bottom: Comparison metrics

Interactive Elements:

- Toggle cells to define function
- Automatic grouping for both SOP and POS
- Highlight which form is more efficient
- Show gate-level implementation for both
- Switch between "Show 1s" and "Show 0s" views

Data Visibility:

- Both expressions displayed
- Literal count for each
- Gate count for each
- Winner indicator
- Implementation cost comparison

Visual Style:

- SOP groups in warm colors (orange, red)
- POS groups in cool colors (blue, green)
- More efficient form highlighted with gold border
- Gate diagrams sized proportionally to complexity

Implementation: p5.js with dual minimization and comparison engine
</details>

## The Quine-McCluskey Method: When Maps Aren't Enough

K-maps work great for 4 variables. With 5 variables, you can use a stacked pair of 4-variable maps. With 6 variables, you need four stacked maps. Beyond that? It gets unwieldy.

Enter the **Quine-McCluskey method** (also called the tabular method)—an algorithmic approach to logic minimization that works for any number of variables. It's systematic, deterministic, and can be programmed into a computer.

The Quine-McCluskey method was developed in the 1950s by Willard Van Orman Quine and extended by Edward McCluskey. It's essentially doing what K-maps do, but using tables instead of visual patterns.

### The Basic Algorithm

**Step 1: List all minterms in binary**

Group minterms by the number of 1s in their binary representation.

**Step 2: Compare and combine**

Compare minterms that differ by exactly one bit. When two minterms combine:

- Replace the differing bit with a dash (–)
- Mark both original minterms as "used"

**Step 3: Repeat**

Continue combining terms with dashes. Two terms can combine if they have dashes in the same positions and differ in exactly one other bit.

**Step 4: Identify prime implicants**

Terms that cannot be combined further are prime implicants.

**Step 5: Build the coverage table**

Create a table showing which prime implicants cover which minterms.

**Step 6: Select minimum cover**

Find essential prime implicants, then select additional PIs to cover remaining minterms.

### Example Walkthrough

For \(F = \sum m(0, 1, 2, 5, 6, 7)\) with 3 variables:

**Step 1**: Group by number of 1s:

| Group 0 (zero 1s) | Group 1 (one 1) | Group 2 (two 1s) | Group 3 (three 1s) |
|-------------------|-----------------|------------------|-------------------|
| 0: 000 | 1: 001, 2: 010 | 5: 101, 6: 110 | 7: 111 |

**Step 2**: Combine adjacent groups:

- 0,1: 00– (differ in bit 0)
- 0,2: 0–0 (differ in bit 1)
- 1,5: –01 (differ in bit 2)
- 2,6: –10 (differ in bit 2)
- 5,7: 1–1 (differ in bit 1)
- 6,7: 11– (differ in bit 0)

**Step 3**: Combine again:

- 0,1,2,?: Cannot extend 00– or 0–0 further with remaining terms
- Looking for patterns...

**Step 4**: Prime implicants are the terms that can't combine further.

This systematic process guarantees finding all prime implicants, which is why it's used in computer-aided design tools.

#### Diagram: Quine-McCluskey Visualizer

<iframe src="../../sims/quine-mccluskey/main.html" width="100%" height="600" scrolling="no"></iframe>

<details markdown="1">
<summary>Quine-McCluskey Method Step-by-Step</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will be able to execute the Quine-McCluskey algorithm step by step to find prime implicants and minimal cover.

Instructional Rationale: Step-by-step visualization demystifies the tabular method and shows how it parallels K-map grouping conceptually.

Canvas Layout:

- Top: Minterm input (enter list or select from K-map)
- Center: Tabular display showing groups and combinations
- Left: Current step indicator
- Right: Prime implicant list (builds as algorithm progresses)
- Bottom: Coverage table and minimum cover selection

Interactive Elements:

- Enter minterms as comma-separated list
- "Next Step" button advances algorithm
- "Auto Run" to see full execution
- Highlight active comparisons during combination step
- Click to see why two terms can/cannot combine
- Interactive coverage table for minimum cover selection

Data Visibility:

- All minterms grouped by 1s count
- Combination history with checkmarks for used terms
- Dash notation clearly shown
- Prime implicants accumulated
- Coverage matrix
- Final minimal expression

Visual Style:

- Table-based layout matching textbook presentation
- Color coding: combined terms in green, prime implicants in blue
- Arrows showing which terms combined
- Coverage table with X marks
- Essential PIs highlighted

Implementation: p5.js with Quine-McCluskey algorithm engine
</details>

## Hazards: When Logic Lies (Briefly)

Everything we've discussed assumes ideal gates that switch instantly. In reality, gates have propagation delay. This can cause temporary incorrect outputs called **hazards**.

A **hazard** is a momentary wrong output that occurs when inputs change, even though the steady-state output should remain unchanged.

### Why Hazards Occur

Consider the function \(F = A\overline{B} + AB\), which simplifies to \(F = A\). When B changes from 0 to 1 (with A=1):

- Before: \(A\overline{B} = 1 \cdot 1 = 1\), \(AB = 1 \cdot 0 = 0\), so \(F = 1\)
- After: \(A\overline{B} = 1 \cdot 0 = 0\), \(AB = 1 \cdot 1 = 1\), so \(F = 1\)

The output should stay at 1. But here's the problem:

Due to gate delays, the \(\overline{B}\) signal might propagate faster than the B signal through the different paths. There could be a tiny moment when:

- \(A\overline{B}\) has already become 0 (the inverter is fast)
- \(AB\) hasn't yet become 1 (the AND gate is still switching)
- Result: F momentarily becomes 0!

This "glitch" is a hazard.

## Static Hazards: The 1-0-1 and 0-1-0 Glitches

A **static hazard** occurs when an output that should remain constant briefly flips to the opposite value.

- **Static-1 hazard**: Output should stay 1, but momentarily goes to 0
- **Static-0 hazard**: Output should stay 0, but momentarily goes to 1

Static hazards occur in SOP circuits when two adjacent minterms are covered by different product terms (with no overlap). The gap between the groups in the K-map is where the hazard lurks.

### Detecting Static Hazards

In a K-map, a static-1 hazard exists if:

1. Two adjacent 1-cells are in different groups
2. No group covers both cells

The hazard occurs when the input changes from one cell to the adjacent cell.

### Example of Static-1 Hazard

For \(F = \overline{A}C + AB\):

On a K-map, cells \(m_3\) (\(\overline{A}BC\)) and \(m_7\) (\(ABC\)) are adjacent. If:

- \(m_3\) is covered by \(\overline{A}C\)
- \(m_7\) is covered by \(AB\)

Then changing from \(\overline{A}BC\) (cell 3) to \(ABC\) (cell 7)—i.e., A going from 0 to 1—can cause a glitch.

When A changes from 0 to 1 (with B=1, C=1):

- \(\overline{A}C\) goes from 1 to 0
- \(AB\) goes from 0 to 1
- If \(\overline{A}C\) falls before \(AB\) rises: F glitches to 0!

#### Diagram: Static Hazard Visualizer

<iframe src="../../sims/static-hazard/main.html" width="100%" height="500" scrolling="no"></iframe>

<details markdown="1">
<summary>Static Hazard Detection and Visualization</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will be able to examine a K-map grouping to identify where static hazards can occur and understand the timing conditions that cause them.

Instructional Rationale: Animated timing diagrams showing the glitch as it would appear on an oscilloscope connects the abstract K-map concept to real circuit behavior.

Canvas Layout:

- Top left: K-map with current grouping
- Top right: Gate-level circuit diagram
- Bottom: Timing diagram showing input transitions and output response
- Side: Hazard indicator and explanation

Interactive Elements:

- Toggle cells to define function
- Draw groups (deliberately creating or avoiding hazards)
- "Find Hazards" button highlights hazard-prone transitions
- Click on hazard location to see timing animation
- Adjustable gate delay to show how timing affects glitch width
- Play/pause timing simulation

Data Visibility:

- K-map with groups highlighted
- Adjacent cells in different groups marked as hazard points
- Timing diagram with glitch visible
- Gate delays labeled on circuit
- Explanation of which transition causes hazard

Visual Style:

- Hazard points shown with warning icon
- Timing diagram with classic oscilloscope look
- Glitch shown as brief dip (for static-1) or spike (for static-0)
- Circuit paths color-coded to show timing differences

Implementation: p5.js with timing simulation engine
</details>

## Dynamic Hazards: Multiple Glitches

A **dynamic hazard** occurs when an output that should change once (0→1 or 1→0) instead oscillates multiple times before settling.

For example, instead of a clean 0→1 transition, you might see: 0→1→0→1

Dynamic hazards are more complex than static hazards and occur in multi-level circuits where signals can arrive at different times via multiple paths.

### When Dynamic Hazards Occur

Dynamic hazards require:

1. A multi-level circuit (more than two levels of logic)
2. Multiple paths from an input to the output
3. Paths with different delays

They're less common than static hazards but can occur in complex circuits, especially those with XOR gates or complementary paths.

!!! warning "Dynamic Hazards Are Tricky"
    Dynamic hazards can be hard to predict and debug. If you see oscillating outputs during transitions, suspect a dynamic hazard. The solution often involves redesigning the circuit to reduce path differences or adding synchronization.

## Hazard-Free Design: Eliminating the Glitches

So how do we prevent hazards? The key insight is in the K-map.

### Eliminating Static-1 Hazards

To make a circuit free of static-1 hazards:

1. Find all pairs of adjacent 1-cells that are in different groups
2. Add redundant groups to cover these "gap" transitions
3. Include these redundant terms in the final expression

Yes, this means the expression won't be minimal—but it will be glitch-free.

### The Redundant Term

In the earlier example with \(F = \overline{A}C + AB\), the hazard occurred between cells 3 and 7. To fix it:

1. Add a group covering both cells 3 and 7: this is \(BC\)
2. New expression: \(F = \overline{A}C + AB + BC\)

The term \(BC\) is logically redundant (it doesn't add any new minterms), but it bridges the timing gap:

- When A changes, \(BC\) stays 1 throughout the transition
- No glitch occurs because \(BC\) "holds" the output high

This is called a **consensus term** or **redundant cover**.

### Eliminating Static-0 Hazards

For POS circuits, static-0 hazards can occur. The solution is similar:

1. Find adjacent 0-cells in different groups
2. Add redundant sum terms to cover the gaps

### When Hazards Matter

Not all circuits need hazard-free design:

- **Clocked synchronous circuits**: The clock samples outputs after they've settled. Glitches between clock edges don't matter.
- **Asynchronous circuits**: Glitches can cause serious problems—hazard-free design is essential.
- **Level-sensitive latches**: Glitches during enable can cause wrong values to be stored.

#### Diagram: Hazard-Free Design Tool

<iframe src="../../sims/hazard-free/main.html" width="100%" height="550" scrolling="no"></iframe>

<details markdown="1">
<summary>Hazard-Free Design Interactive Tool</summary>
Type: microsim

Bloom Level: Create (L6)
Bloom Verb: Design

Learning Objective: Students will be able to design hazard-free circuits by identifying and adding redundant terms to eliminate static hazards.

Instructional Rationale: Interactive before/after comparison with timing simulation shows how redundant terms eliminate glitches, even though they increase gate count.

Canvas Layout:

- Left: K-map with grouping controls
- Top right: Minimal (potentially hazardous) circuit
- Bottom right: Hazard-free circuit with redundant terms
- Bottom: Timing comparison of both circuits

Interactive Elements:

- Set up function by clicking cells
- Initial grouping shows minimal solution
- "Find Hazards" marks gap transitions
- "Add Redundant Terms" automatically adds consensus groups
- Compare timing diagrams for both versions
- Toggle between minimal and hazard-free views

Data Visibility:

- Minimal expression and gate count
- Hazard-free expression and gate count
- Overhead cost (extra terms/gates)
- Hazardous transitions highlighted on K-map
- Timing diagrams showing glitch vs. clean transition

Visual Style:

- Redundant groups shown in dotted outline
- Original groups in solid outline
- Timing diagram: hazardous version with visible glitch
- Hazard-free version with clean transition
- Cost comparison as bar chart

Implementation: p5.js with hazard detection and redundant term generation
</details>

## Putting It All Together: The Complete Optimization Workflow

Let's consolidate everything into a comprehensive optimization workflow:

1. **Specify the function** (truth table, minterms, or Boolean expression)
2. **Draw the K-map** (4 variables = 4×4 grid)
3. **Mark 1s, 0s, and don't cares**
4. **Find all prime implicants** (maximal groups)
5. **Identify essential prime implicants** (cover unique minterms)
6. **Select minimum cover** (essential PIs + minimum additional PIs)
7. **Check for hazards** (adjacent cells in different groups)
8. **Add redundant terms if needed** (for hazard-free design)
9. **Write the final expression** (SOP or POS)
10. **Verify** (check against truth table)

For larger functions (5+ variables), use the Quine-McCluskey method or let CAD tools handle it.

## Common Mistakes to Avoid

As you practice advanced optimization, watch out for these pitfalls:

1. **Forgetting wrap-around in 4-variable maps**: All four edges connect. The corners are all mutually adjacent. Don't miss groups that span the edges!

2. **Not using don't cares**: If you have don't cares, USE them. They're free optimization.

3. **Confusing prime implicants with essential prime implicants**: All essentials are prime, but not all primes are essential. Essentials cover unique minterms.

4. **Stopping at the first valid cover**: There might be multiple minimum covers. Compare them before choosing.

5. **Ignoring hazards in asynchronous designs**: For clocked circuits, minimal is fine. For async circuits, add redundant terms.

6. **Wrong Gray code order**: Rows are 00, 01, 11, 10. Columns are 00, 01, 11, 10. Not 00, 01, 10, 11!

7. **Making non-rectangular groups**: Groups must be rectangles. No L-shapes, no diagonals, no creative geometry.

## Summary and Key Takeaways

Congratulations! You've mastered the advanced art of logic minimization. Here's what you've learned:

**K-Map Mastery:**

- **4-variable K-maps** have 16 cells in a 4×4 grid with Gray code ordering
- **Wrap-around** applies in all directions—edges and corners connect
- **Grouping rules**: powers of 2, rectangular, maximal size, minimum number

**Formal Terminology:**

- **Prime implicant**: A maximal group that can't be expanded
- **Essential prime implicant**: A PI that covers a minterm no other PI covers
- **Implicant cover**: Set of PIs that cover all minterms

**Optimization Techniques:**

- **Don't care conditions** are free optimization—use them strategically
- **Minimal SOP**: Group 1s for the simplest AND-OR expression
- **Minimal POS**: Group 0s for the simplest OR-AND expression
- **Quine-McCluskey**: Algorithmic method for 5+ variable functions

**Hazard-Free Design:**

- **Static hazards**: Momentary glitches when output should stay constant
- **Dynamic hazards**: Multiple transitions when only one should occur
- **Fix hazards** by adding redundant terms to cover gap transitions

!!! success "Key Insight"
    Logic minimization is about finding the sweet spot between simplicity and correctness. The minimal expression uses the fewest gates, but sometimes you need redundant logic for reliable operation. Understanding both goals—and when each applies—makes you a complete digital designer.

<details markdown="1">
<summary>Graphic Novel Suggestion</summary>
A graphic novel could follow the parallel stories of Willard Van Orman Quine (a philosopher at Harvard) and Edward McCluskey (an engineer at Bell Labs) as they independently work toward systematic logic minimization in the 1950s. The visual narrative could contrast Quine's abstract philosophical approach with McCluskey's practical engineering focus, showing how their collaboration created an algorithm that still powers modern CAD tools. Dramatic tension could come from the race to publish and the challenge of convincing the engineering community that a philosopher's method had practical value.
</details>

## Practice Problems

Test your mastery with these challenges:

??? question "Problem 1: 4-Variable K-Map"
    Minimize \(F(A,B,C,D) = \sum m(0, 2, 4, 5, 6, 7, 8, 10, 13, 15)\) using a 4-variable K-map.

    **Solution:**

    Drawing the K-map and grouping:

    - Cells 0, 2, 4, 6 form a 4-cell group (column with C=0, D=0): \(\overline{D}\overline{B}\) wait, let me recalculate...
    - Cells 0, 2, 8, 10 (wrap-around corners, D=0): \(\overline{C}\overline{D}\)
    - Cells 4, 5, 6, 7 (row AB=01): \(\overline{A}B\)
    - Cells 5, 7, 13, 15 (column CD=01 and CD=11 with B=1): \(BD\)

    Minimal SOP: \(F = \overline{C}\overline{D} + \overline{A}B + BD\)

??? question "Problem 2: Using Don't Cares"
    Given \(F = \sum m(1, 3, 5, 7) + d(0, 2, 6)\), find the minimal SOP.

    **Solution:**

    The 1s are at cells 1, 3, 5, 7 (these all have D=1 in a 3-variable map).

    With don't cares at 0, 2, 6:

    - Include don't care 0 with cells 1, 3, 5, 7? No, cell 0 is not adjacent to all.
    - Group 1, 3, 5, 7: These form a vertical stripe with D=1

    Actually, cells 1, 3, 5, 7 all have the last bit D=1. This is just \(D\)!

    Minimal SOP: \(F = D\)

??? question "Problem 3: Essential Prime Implicants"
    For \(F = \sum m(0, 4, 5, 7, 8, 9, 13, 15)\), identify all prime implicants and which are essential.

    **Solution:**

    Drawing the 4-variable K-map:

    Prime implicants:

    - \(m_0, m_4\): \(\overline{B}\overline{C}\overline{D}\)
    - \(m_4, m_5\): \(\overline{A}B\overline{C}\)
    - \(m_5, m_7, m_13, m_15\): \(BD\)
    - \(m_8, m_9\): \(A\overline{B}\overline{C}\)

    Essential analysis:

    - \(m_0\) only covered by \(\overline{B}\overline{C}\overline{D}\) → Essential
    - \(m_7\) only covered by \(BD\) → Essential
    - etc.

??? question "Problem 4: Hazard Detection"
    For \(F = \overline{A}B + AC\), identify any static-1 hazards and add terms to eliminate them.

    **Solution:**

    The two groups (\(\overline{A}B\) and \(AC\)) cover adjacent cells but have a gap where A changes while B=C=1.

    When A goes from 0 to 1 with B=1, C=1:

    - \(\overline{A}B\) goes from 1 to 0
    - \(AC\) goes from 0 to 1
    - Hazard possible!

    To fix: Add the consensus term \(BC\).

    Hazard-free expression: \(F = \overline{A}B + AC + BC\)

??? question "Problem 5: Quine-McCluskey"
    Use the Quine-McCluskey method to find prime implicants for \(F = \sum m(0, 1, 2, 8, 10, 11)\) with 4 variables.

    **Solution:**

    **Group by 1s count:**

    - Group 0: 0 (0000)
    - Group 1: 1 (0001), 2 (0010), 8 (1000)
    - Group 2: 10 (1010)
    - Group 3: 11 (1011)

    **Combine adjacent groups:**

    - 0,1: 000– (differ in D)
    - 0,2: 00–0 (differ in C)
    - 0,8: –000 (differ in A)
    - 8,10: 10–0 (differ in C)
    - 10,11: 101– (differ in D)

    **Combine again:**

    - 0,2,8,10: –0–0 (combining 00–0 and 10–0)

    **Prime implicants:**

    - –0–0: \(\overline{B}\overline{D}\)
    - 000–: \(\overline{A}\overline{B}\overline{C}\)
    - 101–: \(A\overline{B}C\)

    Coverage analysis would determine which are essential.
