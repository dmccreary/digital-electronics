# Quiz: Combinational Building Blocks

Test your understanding of multiplexers, decoders, encoders, adders, and other combinational building blocks.

---

#### 1. How many select lines does a 4-to-1 multiplexer require?

<div class="upper-alpha" markdown>
1. 1
2. 2
3. 4
4. 8
</div>

??? question "Show Answer"
    The correct answer is **B**. A 4-to-1 MUX needs 2 select lines because 2² = 4. In general, a 2ⁿ-to-1 multiplexer requires n select lines to choose among the inputs.

    **Concept Tested:** MUX 4-to-1

---

#### 2. What is the output of a 2-to-4 decoder when the input is 10 (binary)?

<div class="upper-alpha" markdown>
1. Y0 = 1, all others 0
2. Y1 = 1, all others 0
3. Y2 = 1, all others 0
4. Y3 = 1, all others 0
</div>

??? question "Show Answer"
    The correct answer is **C**. A 2-to-4 decoder activates exactly one output based on the binary input value. Input 10 (decimal 2) activates output Y2. The decoder converts the binary code to a one-hot output.

    **Concept Tested:** 2-to-4 Decoder

---

#### 3. What is the purpose of a priority encoder?

<div class="upper-alpha" markdown>
1. To convert binary to one-hot encoding
2. To output the code for the highest-priority active input
3. To generate parity bits
4. To add two binary numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. A priority encoder produces a binary code corresponding to the highest-priority active input when multiple inputs are asserted simultaneously. Lower-priority inputs are ignored. It also typically provides a "valid" output.

    **Concept Tested:** Priority Encoder

---

#### 4. In a half adder, what are the two outputs?

<div class="upper-alpha" markdown>
1. AND and OR
2. Sum and Carry
3. Select and Enable
4. Data and Control
</div>

??? question "Show Answer"
    The correct answer is **B**. A half adder has two outputs: Sum (S) and Carry (C). For inputs A and B: Sum = A XOR B, Carry = A AND B. It's called "half" because it cannot accept a carry input from a previous stage.

    **Concept Tested:** Half Adder

---

#### 5. What advantage does a full adder have over a half adder?

<div class="upper-alpha" markdown>
1. It uses fewer gates
2. It can accept a carry input from a previous stage
3. It operates faster
4. It handles negative numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. A full adder has three inputs: A, B, and Carry-in (Cin). This allows full adders to be chained together to build multi-bit adders like ripple-carry adders. A half adder cannot be chained this way.

    **Concept Tested:** Full Adder

---

#### 6. How can a multiplexer implement any Boolean function?

<div class="upper-alpha" markdown>
1. By using the output as a clock
2. By connecting function inputs to select lines and truth table values to data inputs
3. By adding feedback from output to input
4. It cannot implement arbitrary functions
</div>

??? question "Show Answer"
    The correct answer is **B**. A 2ⁿ-to-1 MUX can implement any n-variable function by connecting the input variables to the select lines and connecting the truth table output values (0 or 1) to the corresponding data inputs.

    **Concept Tested:** MUX as Logic Function

---

#### 7. What is carry propagation delay in a ripple-carry adder?

<div class="upper-alpha" markdown>
1. The time for the first bit to compute
2. The time for carries to ripple through all stages
3. The clock period required
4. The delay of a single gate
</div>

??? question "Show Answer"
    The correct answer is **B**. In a ripple-carry adder, each bit position must wait for the carry from the previous position. The total delay is proportional to the bit width, as the carry must "ripple" through all stages sequentially.

    **Concept Tested:** Carry Propagation Delay

---

#### 8. What is the function of a 7-segment decoder?

<div class="upper-alpha" markdown>
1. To decode memory addresses
2. To convert BCD or binary to 7-segment display signals
3. To add seven numbers together
4. To divide a frequency by 7
</div>

??? question "Show Answer"
    The correct answer is **B**. A 7-segment decoder takes a binary or BCD input and generates the seven output signals needed to display the corresponding digit on a 7-segment LED display. Each segment is driven based on which digit is being displayed.

    **Concept Tested:** 7-Segment Decoder

---

#### 9. What does a magnitude comparator output when A > B?

<div class="upper-alpha" markdown>
1. Only the "equal" output is high
2. Only the "A greater than B" output is high
3. All outputs are high
4. All outputs are low
</div>

??? question "Show Answer"
    The correct answer is **B**. A magnitude comparator has three outputs: A>B, A<B, and A=B. Exactly one of these is asserted based on the comparison. When A is greater than B, only the A>B output is high; the others are low.

    **Concept Tested:** Magnitude Comparator

---

#### 10. What is the purpose of an enable input on a decoder?

<div class="upper-alpha" markdown>
1. To increase the number of outputs
2. To control whether any output is active
3. To select between multiple decoders
4. To invert all outputs
</div>

??? question "Show Answer"
    The correct answer is **B**. The enable input controls whether the decoder is active. When disabled, all outputs are deasserted regardless of the input code. This allows building larger decoders from smaller ones and implementing memory address decoding.

    **Concept Tested:** Decoder Enable
