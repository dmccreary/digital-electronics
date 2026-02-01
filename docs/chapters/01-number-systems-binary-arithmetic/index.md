---
title: Number Systems and Binary Arithmetic
description: The mathematical foundation for digital electronics including binary, hexadecimal, octal, and signed number representations
generated_by: claude skill chapter-content-generator
date: 2026-01-30 14:32:00
version: 0.03
---

# Number Systems and Binary Arithmetic

## Summary

This chapter establishes the mathematical foundation for digital electronics by introducing number systems used in digital design. Students will learn to convert between binary, decimal, hexadecimal, and octal representations, perform binary arithmetic operations, understand signed number representation using two's complement, and work with specialized encoding schemes like BCD and Gray code. These skills are essential for all subsequent work in digital circuit design.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Binary Number System
2. Decimal to Binary Conversion
3. Binary to Decimal Conversion
4. Hexadecimal Numbers
5. Hex to Binary Conversion
6. Octal Numbers
7. Binary Addition
8. Binary Subtraction
9. Two's Complement
10. Signed Binary Numbers
11. Overflow Detection
12. BCD Encoding
13. Gray Code
14. Weighted Codes

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md). Students should have a basic understanding of arithmetic and number representation from prior mathematics courses.

## Introduction: Why Computers Don't Count Like We Do

Here's a fun fact to start your journey into digital electronics: computers are terrible at counting to ten. It's not that they're lazy or didn't pay attention in kindergarten—it's that they physically *can't*. Deep inside every processor, every memory chip, and every digital circuit, there are billions of tiny switches that can only be in one of two states: on or off. That's it. No "sort of on" or "mostly off." Just on and off.

This fundamental limitation (which, as you'll discover, is actually a superpower) means that computers think in **binary**—a number system with only two digits. If you've ever wondered why computer scientists seem obsessed with powers of 2, or why your hard drive has weird capacities like 256 GB instead of a nice round 250 GB, this chapter will give you the answers.

Think of it this way: if you only had two fingers, you'd probably count differently too. Welcome to the world of binary arithmetic, where 10 + 10 = 100, and that's not a typo—it's just how things work around here.

## The Binary Number System

### Understanding Positional Notation

Before diving into binary, let's remind ourselves how our familiar decimal system works. When you write the number 347, each digit's position tells you what it's worth:

- The 3 is in the "hundreds" place: \(3 \times 100 = 300\)
- The 4 is in the "tens" place: \(4 \times 10 = 40\)
- The 7 is in the "ones" place: \(7 \times 1 = 7\)

Add them up: \(300 + 40 + 7 = 347\). Simple enough, right?

Notice that each position is a power of 10:

| Position | 3rd | 2nd | 1st | 0th |
|----------|-----|-----|-----|-----|
| Power | \(10^3\) | \(10^2\) | \(10^1\) | \(10^0\) |
| Value | 1000 | 100 | 10 | 1 |

This is called **positional notation** with base 10 (or radix 10). The magic insight is that we can use *any* base we want—we just happened to evolve with 10 fingers.

### Binary: Base 2

In binary, we use base 2 instead of base 10. This means:

- We only have two digits: 0 and 1 (called **bits**, short for "binary digits")
- Each position represents a power of 2

Here's the binary equivalent of our position table:

| Position | 7th | 6th | 5th | 4th | 3rd | 2nd | 1st | 0th |
|----------|-----|-----|-----|-----|-----|-----|-----|-----|
| Power | \(2^7\) | \(2^6\) | \(2^5\) | \(2^4\) | \(2^3\) | \(2^2\) | \(2^1\) | \(2^0\) |
| Value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

!!! tip "Memorize These Powers of 2"
    Knowing the first 8-10 powers of 2 by heart will make your life in digital electronics *much* easier:
    1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024...

Let's decode the binary number \(10110101_2\) (the subscript 2 tells us it's binary):

| Bit | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 1 |
|-----|---|---|---|---|---|---|---|---|
| Position value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| Contribution | 128 | 0 | 32 | 16 | 0 | 4 | 0 | 1 |

Sum: \(128 + 32 + 16 + 4 + 1 = 181_{10}\)

That's **binary to decimal conversion** in a nutshell—just add up the position values wherever there's a 1.

#### Diagram: Binary Place Value Visualizer

<iframe src="../../sims/binary-place-value/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Binary Place Value Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: interpret, explain

Learning Objective: Students will be able to explain how positional notation works in binary by interactively toggling bits and observing the resulting decimal value.

Canvas Layout:
- Width: 700px, Height: 400px
- Top section: 8 large toggle buttons representing bits (positions 7 through 0)
- Middle section: Display showing power of 2 labels under each bit ($2^7$, $2^6$, etc.)
- Bottom section: Running calculation showing which position values are "active" and the total decimal result

Visual Elements:
- 8 square toggle buttons (80x80px each) arranged horizontally
- Each button shows "0" or "1" in large font
- Active bits (1s) highlighted in bright blue, inactive bits (0s) in gray
- Position values displayed beneath each button
- Calculation line shows: "128 + 32 + 16 + 4 + 1 = 181"
- Large decimal result display at bottom

Interactive Controls:
- Click any bit to toggle between 0 and 1
- "Clear All" button sets all bits to 0
- "Random" button generates a random 8-bit number
- "Challenge Mode" button shows a target decimal for student to create

Behavior:
- When a bit is toggled, immediately recalculate and display the new decimal value
- Active bits visually "light up" with animation
- Calculation line updates dynamically to show only active terms

Instructional Rationale: Toggle-based exploration with immediate feedback is appropriate because students need to see the concrete relationship between bit positions and values. The step-by-step calculation display makes the addition process explicit.

Implementation: p5.js with responsive canvas
</details>

### Why Binary Matters

You might be thinking, "This seems inconvenient. Why not just use decimal?" Great question! Here's why binary is perfect for computers:

1. **Reliability**: It's easy to distinguish between "on" and "off," but hard to reliably distinguish between 10 different voltage levels
2. **Noise immunity**: If electrical noise corrupts a signal slightly, a 1 is still a 1
3. **Simple logic**: AND, OR, NOT operations map directly to physical circuits
4. **Mathematical elegance**: Boolean algebra makes circuit design systematic

As we'll see in later chapters, this binary foundation enables everything from adding two numbers to running complex operating systems.

## Converting Between Binary and Decimal

### Binary to Decimal: The Position-Value Method

We already saw this method in action. Here's the systematic process:

1. Write out the binary number
2. Label each bit with its position value (right to left, starting at 1)
3. Multiply each bit by its position value
4. Sum the results

**Example**: Convert \(1101011_2\) to decimal.

| Bit position | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|--------------|---|---|---|---|---|---|---|
| Position value | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| Binary digit | 1 | 1 | 0 | 1 | 0 | 1 | 1 |
| Contribution | 64 | 32 | 0 | 8 | 0 | 2 | 1 |

Result: \(64 + 32 + 8 + 2 + 1 = 107_{10}\)

### Decimal to Binary: The Repeated Division Method

Going the other direction requires a different approach. The most reliable method is **repeated division by 2**:

1. Divide the decimal number by 2
2. Record the remainder (0 or 1)
3. Use the quotient as the new dividend
4. Repeat until the quotient is 0
5. Read the remainders from bottom to top

**Example**: Convert \(107_{10}\) to binary.

| Division | Quotient | Remainder |
|----------|----------|-----------|
| 107 ÷ 2 | 53 | 1 |
| 53 ÷ 2 | 26 | 1 |
| 26 ÷ 2 | 13 | 0 |
| 13 ÷ 2 | 6 | 1 |
| 6 ÷ 2 | 3 | 0 |
| 3 ÷ 2 | 1 | 1 |
| 1 ÷ 2 | 0 | 1 |

Reading remainders from bottom to top: \(1101011_2\) ✓

!!! note "The Remainder Trick"
    Why does this work? Each remainder tells you whether that power of 2 "fits" into the remaining value. The first remainder tells you if the number is odd (needs a \(2^0 = 1\)), the second tells you about \(2^1\), and so on.

#### Diagram: Decimal to Binary Conversion Stepper

<iframe src="../../sims/decimal-to-binary-stepper/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Decimal to Binary Conversion Stepper</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: execute, calculate

Learning Objective: Students will be able to apply the repeated division method to convert any decimal number to binary by stepping through the algorithm interactively.

Canvas Layout:
- Width: 700px, Height: 450px
- Left side: Input field for decimal number
- Center: Step-by-step division display showing quotient and remainder at each step
- Right side: Growing binary result (built from remainders)

Visual Elements:
- Large input field for decimal number (0-255)
- Division steps displayed as rows: "107 ÷ 2 = 53 remainder 1"
- Arrow pointing to remainder at each step
- Binary result building from right to left as remainders are collected
- Final result highlighted in a bordered box

Interactive Controls:
- Text input for decimal number (with validation 0-255)
- "Step" button advances to next division
- "Complete" button shows all steps at once
- "Reset" button clears and starts over
- Speed slider for auto-step mode

Behavior:
- Each click of "Step" performs one division and highlights the new remainder
- Remainders stack up to form the binary representation
- Visual animation shows remainder "moving" to binary result area
- Auto-step mode animates through all steps with adjustable delay

Data Visibility Requirements:
- Stage 1: Show decimal input value
- Stage 2: Show first division with quotient and remainder highlighted
- Stage 3-N: Show successive divisions with running binary result
- Final: Show complete binary number with verification (convert back)

Instructional Rationale: Step-by-step progression allows students to predict each remainder before revealing it, reinforcing understanding of the algorithm rather than just memorizing results.

Implementation: p5.js
</details>

## Hexadecimal: Binary's Best Friend

Typing out long strings of 1s and 0s gets tedious fast. Imagine debugging a 32-bit value: $11010110111010001001010011110000_2$. Your eyes are already glazing over, aren't they?

Enter **hexadecimal** (hex for short): base 16. Hex uses digits 0-9 plus letters A-F to represent values 0-15:

| Decimal | Binary | Hex |
|---------|--------|-----|
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |

### Why Hex Works So Well

Here's the clever bit: \(16 = 2^4\). This means every hex digit corresponds *exactly* to four binary digits. That messy 32-bit number from earlier? In hex, it's just:

\(11010110111010001001010011110000_2 = \text{D6E894F0}_{16}\)

Much more manageable! Here's how the conversion works:

1. Group binary digits into sets of 4 (from the right)
2. Convert each group to its hex equivalent

**Example**: Convert \(10110111_2\) to hex.

| Group | 1011 | 0111 |
|-------|------|------|
| Hex digit | B | 7 |

Result: \(\text{B7}_{16}\)

To go back to binary, just reverse the process—each hex digit becomes four binary digits.

!!! tip "Hex Notation Conventions"
    You'll see hex numbers written in several ways:

    - With subscript: \(\text{B7}_{16}\)
    - With 0x prefix: 0xB7 (common in programming)
    - With h suffix: B7h (common in assembly language)

#### Diagram: Number Base Converter

<iframe src="../../sims/number-base-converter/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Number Base Converter</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate, use

Learning Objective: Students will be able to convert between binary, decimal, and hexadecimal representations fluently by practicing with an interactive converter that shows equivalent representations simultaneously.

Canvas Layout:
- Width: 700px, Height: 350px
- Three large display panels arranged horizontally: Binary, Decimal, Hex
- Input mode selector to choose which base to type in
- Grouped binary digits with hex alignment indicators

Visual Elements:
- Binary display: 8 bits shown with grouping lines every 4 bits
- Decimal display: numeric value with leading zeros option
- Hex display: 2 hex digits with 0x prefix
- Visual grouping lines connecting binary groups to hex digits
- Active input field highlighted with cursor

Interactive Controls:
- Radio buttons to select input mode (Binary, Decimal, or Hex)
- Text input field for entering numbers in selected base
- "Random" button generates a random 8-bit value
- Bit width selector: 4, 8, 16, or 32 bits

Behavior:
- Entering a value in one base immediately updates the other two
- Invalid input (non-binary digits in binary mode, etc.) shows error highlight
- Grouping lines animate to show correspondence between bases
- Overflow warning if value exceeds selected bit width

Implementation: p5.js with responsive layout
</details>

## Octal: The Retro Alternative

While we're on alternative bases, let's briefly cover **octal** (base 8). Octal uses digits 0-7, and since \(8 = 2^3\), each octal digit represents exactly three binary digits.

| Decimal | Binary | Octal |
|---------|--------|-------|
| 0 | 000 | 0 |
| 1 | 001 | 1 |
| 2 | 010 | 2 |
| 3 | 011 | 3 |
| 4 | 100 | 4 |
| 5 | 101 | 5 |
| 6 | 110 | 6 |
| 7 | 111 | 7 |

**Example**: Convert \(10110111_2\) to octal.

First, group into threes from the right (adding a leading zero if needed):

| Group | 010 | 110 | 111 |
|-------|-----|-----|-----|
| Octal digit | 2 | 6 | 7 |

Result: \(267_8\)

Octal was popular in early computing when machines used 12-bit, 24-bit, or 36-bit words (all divisible by 3). Today, hex dominates because 8-bit bytes (divisible by 4) are universal. However, you'll still encounter octal in Unix file permissions (chmod 755, anyone?) and some programming contexts.

## Binary Addition: The Foundation of Arithmetic

Now that we can represent numbers in binary, let's learn to do math with them. Binary addition follows the same principles as decimal addition, but with simpler rules because there are only two digits.

### The Four Addition Rules

Here's everything you need to know about adding two binary digits:

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

The last row is the interesting one: \(1 + 1 = 10_2\) (which is 2 in decimal). We write down 0 and carry the 1, just like in decimal when \(5 + 5 = 10\).

### Multi-Bit Addition

Let's add \(1011_2 + 1101_2\) step by step:

```
  Carries:  1 1 1
            1 0 1 1
          + 1 1 0 1
          ---------
          1 1 0 0 0
```

Working from right to left:

1. Position 0: \(1 + 1 = 10_2\), write 0, carry 1
2. Position 1: \(1 + 0 + 1 = 10_2\), write 0, carry 1
3. Position 2: \(1 + 1 + 1 = 11_2\), write 1, carry 1
4. Position 3: \(1 + 1 + 1 = 11_2\), write 1, carry 1
5. Carry out becomes the 5th bit

Verification: \(11_{10} + 13_{10} = 24_{10}\), and \(11000_2 = 24_{10}\) ✓

#### Diagram: Binary Addition Practice Tool

<iframe src="../../sims/binary-addition-practice/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Binary Addition Practice Tool</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate, practice

Learning Objective: Students will be able to perform binary addition correctly, including managing carries, by practicing with immediate feedback and step-by-step visualization.

Canvas Layout:
- Width: 700px, Height: 450px
- Center: Traditional vertical addition layout with carry row, two operands, and result
- Right side: Feedback panel showing current step and hints
- Bottom: Score tracker for practice mode

Visual Elements:
- Carry row at top (initially hidden, revealed as carries occur)
- Two 8-bit operand rows with editable fields in practice mode
- Sum row where student enters answers (or shows result in demo mode)
- Column highlighting to show current position being calculated
- Green checkmarks for correct digits, red X for incorrect

Interactive Controls:
- "Demo Mode" / "Practice Mode" toggle
- In Demo: "Step" button advances column by column, "Auto" button animates
- In Practice: Student clicks on result bits to toggle them, "Check" validates
- "New Problem" button generates random addends
- Difficulty slider: 4-bit, 8-bit, or 16-bit problems

Behavior:
- Demo mode: Steps through addition column by column, showing carry logic
- Practice mode: Student fills in carries and sum bits, gets immediate feedback
- Incorrect answers highlight red with hint about what went wrong
- Score tracks correct/incorrect for gamification

Data Visibility Requirements:
- Stage 1: Show two operands
- Stage 2-N: Highlight current column, show addition of two bits plus carry
- Show carry-out when it occurs
- Final: Complete sum with all carries visible

Instructional Rationale: Immediate feedback during practice helps students self-correct errors in carry handling, the most common mistake in binary addition.

Implementation: p5.js
</details>

## Binary Subtraction and Two's Complement

Subtraction in binary is where things get interesting. While you *can* do it with borrowing (just like decimal subtraction), computers use a clever trick that lets them subtract using the same addition circuits. This trick is called **two's complement**.

### The Concept of Complements

A complement is basically the "opposite" of a number within a given range. For example, if we're working with single decimal digits (0-9), the complement of 3 is 7, because $3 + 7 = 10$.

In binary, we have two useful complements:

- **One's complement**: Flip all the bits (0 becomes 1, 1 becomes 0)
- **Two's complement**: One's complement plus 1

**Example**: Find the two's complement of \(01011001_2\)

1. Original: $01011001$
2. One's complement (flip bits): $10100110$
3. Two's complement (add 1): $10100111$

### The Magic of Two's Complement

Here's the beautiful trick: if you want to calculate \(A - B\), you can instead calculate \(A + (\text{two's complement of } B)\). The hardware that does addition can also do subtraction!

**Example**: Calculate \(10010110_2 - 01011001_2\)

Instead of subtracting, we'll add the two's complement of \(01011001_2\):

1. Two's complement of \(01011001_2 = 10100111_2\) (from above)
2. Add: \(10010110_2 + 10100111_2\)

```
    Carries: 1 1 1 1 1 1 1
             1 0 0 1 0 1 1 0
           + 1 0 1 0 0 1 1 1
           -----------------
           1 0 0 1 1 1 1 0 1
```

3. Discard the carry-out (overflow bit): \(00111101_2\)
4. Check: \(150_{10} - 89_{10} = 61_{10}\), and \(00111101_2 = 61_{10}\) ✓

#### Diagram: Two's Complement Visualizer

<iframe src="../../sims/twos-complement-visualizer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Two's Complement Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain, interpret

Learning Objective: Students will be able to explain how two's complement representation works and why it enables subtraction using addition hardware.

Canvas Layout:
- Width: 700px, Height: 430px
- Top: Original binary number display (8 bits)
- Middle: Step-by-step transformation showing one's complement and two's complement
- Bottom: Decimal interpretation panel showing signed vs unsigned values

Visual Elements:
- 8-bit binary display with bit position labels
- Arrow showing transformation from original to one's complement
- Arrow showing +1 step to two's complement
- Color coding: original bits in blue, flipped bits in orange, final +1 in green
- Number line visualization showing negative number position

Interactive Controls:
- 8 toggle buttons for inputting a binary number
- "Calculate Complement" button triggers step-by-step animation
- "Show Number Line" checkbox reveals circular number line representation
- Signed/Unsigned toggle for decimal display

Behavior:
- Clicking "Calculate Complement" animates bit flipping one position at a time
- The +1 step shows carry propagation if applicable
- Number line view shows how positive and negative numbers wrap around

Data Visibility Requirements:
- Stage 1: Show original 8-bit value with decimal equivalent
- Stage 2: Show one's complement (all bits flipped) with intermediate value
- Stage 3: Show two's complement (after +1) with final value
- Stage 4: Show verification that original + complement = 0 (with overflow discarded)

Instructional Rationale: Seeing each step separately helps students understand WHY two's complement works, not just HOW to calculate it.

Implementation: p5.js
</details>

## Signed Binary Numbers

So far, we've only represented positive numbers (unsigned values). But real-world computation needs negative numbers too. How do we represent -42 in binary?

### The Sign-Magnitude Approach (Not Used Much)

The obvious approach: reserve one bit for the sign (0 = positive, 1 = negative) and use the rest for magnitude.

$+5 = 0000 0101$
$-5 = 1000 0101$

This seems intuitive, but it causes problems:

- We have two representations of zero (+0 and -0)
- Addition hardware doesn't work directly—we need to check signs first
- It's wasteful and complicated

### Two's Complement Representation (The Standard)

Modern computers use **two's complement for signed integers**. The most significant bit (MSB) indicates sign:

- MSB = 0: positive number (interpret normally)
- MSB = 1: negative number (value is \(-2^{n-1} + \text{remaining bits}\))

For 8-bit two's complement:

| Binary | Unsigned Value | Signed Value |
|--------|---------------|--------------|
| 0000 0000 | 0 | 0 |
| 0000 0001 | 1 | +1 |
| 0111 1111 | 127 | +127 |
| 1000 0000 | 128 | -128 |
| 1111 1111 | 255 | -1 |

!!! note "The Asymmetry"
    Notice something odd? With 8 bits, we can represent -128 through +127. There's one more negative number than positive! This is because we "use up" the all-zeros pattern for zero itself. In n-bit two's complement:

    - Minimum value: \(-2^{n-1}\)
    - Maximum value: \(2^{n-1} - 1\)

### Why Two's Complement Is Brilliant

The beauty of two's complement is that **addition works the same whether numbers are signed or unsigned**. The hardware doesn't need to know which interpretation you're using! This is why it became the universal standard for integer arithmetic.

**Example**: \((-3) + 5\) in 8-bit two's complement

\(-3_{10} = 11111101_2\) (two's complement of 3)
\(+5_{10} = 00000101_2\)

```
    11111101
  + 00000101
  ----------
  1 00000010
```

Discarding the carry-out: \(00000010_2 = 2_{10}\) ✓

## Overflow Detection

When arithmetic results exceed the range a given number of bits can represent, we get **overflow**. This is one of the sneakiest bugs in digital systems—everything *looks* normal, but the answer is completely wrong.

### Unsigned Overflow

For unsigned numbers, overflow occurs when a carry-out propagates beyond the most significant bit. Adding \(11111111_2 + 00000001_2\) (255 + 1) gives \(100000000_2\), which needs 9 bits. If we only have 8, the result wraps around to 0.

### Signed Overflow

For signed numbers, overflow is trickier. It occurs when:

- Adding two positive numbers gives a negative result
- Adding two negative numbers gives a positive result

The key insight: **signed overflow occurs when the carry into the MSB differs from the carry out of the MSB**.

**Example of signed overflow**: \(01111111_2 + 00000001_2\) (+127 + 1)

```
    Carries: 1 1 1 1 1 1 1 0
             0 1 1 1 1 1 1 1   (+127)
           + 0 0 0 0 0 0 0 1   (+1)
           -----------------
             1 0 0 0 0 0 0 0   (-128 ???)
```

The result \(10000000_2\) is interpreted as -128 in signed representation. That's clearly wrong! The carry into the MSB was 1, but the carry out was 0—they differ, signaling overflow.

#### Diagram: Overflow Detection Simulator

<iframe src="../../sims/overflow-detection/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Overflow Detection Simulator</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine

Learning Objective: Students will be able to differentiate between situations that cause overflow and those that don't by examining carry patterns in signed addition.

Canvas Layout:
- Width: 700px, Height: 450px
- Top: Two 8-bit input panels for operands with signed decimal display
- Middle: Addition visualization with carry chain highlighted
- Bottom: Result panel with overflow indicator and explanation

Visual Elements:
- 8-bit operand displays with MSB visually emphasized (larger, colored differently)
- Carry chain showing all 9 carry bits explicitly
- Carry-in to MSB and carry-out from MSB specially highlighted
- XOR gate icon between the two critical carries
- Overflow LED: green (no overflow) or red (overflow)
- Explanation text describing why overflow did/didn't occur

Interactive Controls:
- Toggle buttons for each operand bit
- Quick-select buttons for interesting cases: "+127 + 1", "-128 + (-1)", "50 + 50"
- Signed/Unsigned interpretation toggle
- "Test Random" button for practice

Behavior:
- Changing any operand bit immediately recalculates everything
- Carry chain animates to show propagation
- Overflow detection shows carry-in vs carry-out comparison
- Explanation updates based on current numbers

Data Visibility Requirements:
- Show both operands with signed decimal interpretation
- Highlight carry-in to bit 7 and carry-out from bit 7
- Show XOR of these two carries
- Display overflow flag result

Instructional Rationale: By explicitly showing the two critical carries and their XOR, students can verify the overflow detection rule rather than just memorizing it.

Implementation: p5.js
</details>

## BCD Encoding: When Decimal Display Matters

**Binary-Coded Decimal (BCD)** represents each decimal digit separately in 4 bits. Instead of converting the whole number to binary, we convert each digit independently.

**Example**: Encode \(47_{10}\) in BCD

- 4 in binary: 0100
- 7 in binary: 0111
- BCD result: 0100 0111

Compare to pure binary: \(47_{10} = 00101111_2\)

### Why BCD Exists

BCD seems wasteful (we're using 8 bits to store a number that fits in 6), so why use it? Several practical reasons:

1. **Easy decimal display**: Each 4-bit group directly maps to a display digit
2. **Exact decimal arithmetic**: No binary rounding errors for financial calculations
3. **Legacy hardware**: Seven-segment displays, calculators, and some industrial equipment expect BCD

BCD addition requires special handling when a group exceeds 9. If adding two BCD digits produces a result from 10-15, we add 6 to "fix" it:

**Example**: \(27_{BCD} + 35_{BCD}\)

```
    0010 0111
  + 0011 0101
  -----------
    0101 1100
```

The second group is \(1100_2 = 12_{10}\), which is invalid BCD. Add 6:

```
    0101 1100
  + 0000 0110
  -----------
    0110 0010
```

Result: \(0110 0010_{BCD} = 62_{10}\) ✓

## Gray Code: When Only One Bit Should Change

Here's a puzzle: what happens if you're reading a binary counter right at the moment it transitions from 0111 to 1000? All four bits change simultaneously—but in real hardware, they don't change at *exactly* the same instant. For a brief moment, you might read garbage like 0000 or 1111.

**Gray code** solves this by ensuring only one bit changes between consecutive values:

| Decimal | Binary | Gray Code |
|---------|--------|-----------|
| 0 | 0000 | 0000 |
| 1 | 0001 | 0001 |
| 2 | 0010 | 0011 |
| 3 | 0011 | 0010 |
| 4 | 0100 | 0110 |
| 5 | 0101 | 0111 |
| 6 | 0110 | 0101 |
| 7 | 0111 | 0100 |

Notice how each step changes exactly one bit. This makes Gray code perfect for:

- Position encoders (rotary and linear)
- Analog-to-digital converters
- State machine encoding to avoid glitches
- Communication systems where bit errors should be minimized

### Converting Binary to Gray Code

The conversion is surprisingly simple using XOR:

\(G_n = B_n\) (copy the MSB)
\(G_i = B_{i+1} \oplus B_i\) (XOR each bit with the one above it)

**Example**: Convert \(1011_2\) to Gray code

- \(G_3 = B_3 = 1\)
- \(G_2 = B_3 \oplus B_2 = 1 \oplus 0 = 1\)
- \(G_1 = B_2 \oplus B_1 = 0 \oplus 1 = 1\)
- \(G_0 = B_1 \oplus B_0 = 1 \oplus 1 = 0\)

Gray code: \(1110\)

#### Diagram: Gray Code vs Binary Counter Animation

<iframe src="../../sims/gray-code-counter/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gray Code vs Binary Counter Animation</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: compare, contrast

Learning Objective: Students will be able to contrast Gray code and binary counting by observing how many bits change during each transition in both systems.

Canvas Layout:
- Width: 700px, Height: 400px
- Left side: 4-bit binary counter display
- Right side: 4-bit Gray code counter display
- Bottom: Bit-change histogram and transition indicators

Visual Elements:
- Two columns of 4 large bits each, showing binary and Gray code
- Bits that will change on next count highlighted in yellow
- Counter showing decimal value (0-15)
- Bar graph showing "bits changed" history for each encoding
- Transition arrows between bit patterns

Interactive Controls:
- "Step" button advances both counters by one
- "Auto" toggle for continuous counting with speed slider
- "Reset" button returns to zero
- "Show Hazard" checkbox simulates what happens during transitions

Behavior:
- Each step highlights which bits are about to change BEFORE the transition
- Animation shows bits flipping (binary often has cascading effect, Gray has single flip)
- Hazard mode shows how binary can produce brief invalid outputs during multi-bit transitions
- Histogram tracks average bits changed over time

Data Visibility Requirements:
- Current value in both encodings with decimal equivalent
- Highlighted bits that will change on next increment
- Count of bits changing per transition
- Running average comparison

Instructional Rationale: Side-by-side comparison makes the single-bit-change property of Gray code immediately visible and memorable.

Implementation: p5.js
</details>

## Weighted Codes and Other Representations

Binary and Gray code are just two of many possible codes. A **weighted code** is one where each bit position has a specific "weight" that determines its contribution to the value.

### Standard Binary: 8-4-2-1 Weighted

Regular binary is a weighted code with weights 8, 4, 2, 1 for a 4-bit number. But other weight combinations are possible and sometimes useful.

### 2-4-2-1 Code

This code uses weights 2, 4, 2, 1 (notice the repeated weights). It's useful because it's **self-complementing**: to get the 9's complement of a BCD digit, just flip all bits.

| Decimal | 2-4-2-1 |
|---------|---------|
| 0 | 0000 |
| 1 | 0001 |
| 2 | 0010 |
| 3 | 0011 |
| 4 | 0100 |
| 5 | 1011 |
| 6 | 1100 |
| 7 | 1101 |
| 8 | 1110 |
| 9 | 1111 |

To find the 9's complement of 3 (which is 6): flip \(0011 \rightarrow 1100\) ✓

### Excess-3 Code

Excess-3 is BCD with 3 added to each value. It's also self-complementing and was popular in early computers.

| Decimal | BCD | Excess-3 |
|---------|-----|----------|
| 0 | 0000 | 0011 |
| 1 | 0001 | 0100 |
| 2 | 0010 | 0101 |
| 3 | 0011 | 0110 |
| 4 | 0100 | 0111 |
| 5 | 0101 | 1000 |
| 6 | 0110 | 1001 |
| 7 | 0111 | 1010 |
| 8 | 1000 | 1011 |
| 9 | 1001 | 1100 |

#### Diagram: Weighted Codes Comparison Table

<iframe src="../../sims/weighted-codes-table/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Weighted Codes Comparison Table</summary>
Type: infographic

Bloom Level: Remember (L1)
Bloom Verb: identify, list

Learning Objective: Students will be able to identify different weighted code representations for decimal digits by comparing multiple encoding schemes in an interactive table.

Canvas Layout:
- Width: 700px, Height: 350px
- Interactive table showing multiple encoding schemes
- Header row with column selectors
- Hover reveals calculation for each code

Visual Elements:
- Table with columns: Decimal, 8-4-2-1 BCD, 2-4-2-1, Excess-3, Gray
- Each cell shows 4-bit value
- Hover on cell shows calculation breakdown (e.g., "2×1 + 4×0 + 2×0 + 1×1 = 3")
- Self-complement pairs highlighted with matching colors

Interactive Controls:
- Column visibility checkboxes to show/hide encoding schemes
- Decimal digit selector (0-9) to highlight a specific row
- "Show Complements" toggle to highlight 9's complement pairs
- "Verify Weight" mode: click any cell to see weight calculation

Behavior:
- Hovering a cell shows how the weights produce the decimal value
- Clicking a row highlights it across all visible columns
- Complement mode draws lines connecting 0↔9, 1↔8, 2↔7, etc.

Implementation: HTML/CSS table with JavaScript interactivity
</details>

## Practical Applications

Let's tie these concepts together with real-world examples you'll encounter in digital design.

### Memory Addressing

Computer memory is addressed using binary numbers. A 16-bit address bus can access \(2^{16} = 65,536\) memory locations. This is why you see memory sizes like 64K, 256K, or 4G—they're all powers of 2.

### Color Representation

RGB colors use 8 bits per channel (red, green, blue), giving 24-bit color with over 16 million possibilities. That's \(2^{24} = 16,777,216\) colors. Web colors like #FF5733 are just three hex values packed together.

### Digital Signal Processing

Audio samples are typically 16-bit signed integers, ranging from -32,768 to +32,767. This gives enough precision for high-quality sound while fitting nicely into 2 bytes.

### Error Detection

Parity bits add a single bit to detect single-bit errors in transmission. Even parity means the total number of 1s (including the parity bit) is always even. It's a simple application of binary counting.

## Key Takeaways

As we wrap up this chapter, let's summarize the essential concepts:

1. **Binary is the language of digital circuits** because it maps directly to physical on/off states
2. **Positional notation** works the same regardless of base—only the base value changes
3. **Hexadecimal is binary's shorthand**, with each hex digit representing exactly 4 bits
4. **Two's complement enables subtraction using addition**, simplifying hardware design
5. **Overflow must be detected** to avoid silent calculation errors
6. **Gray code prevents glitches** during counter transitions
7. **Different codes serve different purposes**—there's no single "best" representation

These fundamentals will appear constantly throughout your digital electronics journey. When you're debugging a circuit and see 0xDEADBEEF in memory, you'll know exactly what you're looking at (and appreciate the programmer's sense of humor).

??? question "Self-Check: Can you convert 200 to binary using repeated division?"
    $200 \div 2 = 100$ remainder 0
    $100 \div 2 = 50$ remainder 0
    $50 \div 2 = 25$ remainder 0
    $25 \div 2 = 12$ remainder 1
    $12 \div 2 = 6$ remainder 0
    $6 \div 2 = 3$ remainder 0
    $3 \div 2 = 1$ remainder 1
    $1 \div 2 = 0$ remainder 1

    Reading bottom to top: \(11001000_2\)

??? question "Self-Check: What is the 8-bit two's complement of 100?"
    Original: \(01100100_2\)
    One's complement: \(10011011_2\)
    Two's complement (add 1): \(10011100_2\)

    Interpretation: This represents \(-100\) in signed 8-bit format.

In the next chapter, we'll put these number systems to work as we explore Boolean algebra—the mathematical framework that governs all digital logic.

[See Annotated References](./references.md)
