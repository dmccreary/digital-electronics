# Quiz: Number Systems and Binary Arithmetic

Test your understanding of number systems, binary arithmetic, and encoding schemes with these questions.

---

#### 1. What is the decimal equivalent of the binary number 10110?

<div class="upper-alpha" markdown>
1. 18
2. 22
3. 26
4. 30
</div>

??? question "Show Answer"
    The correct answer is **B**. To convert binary 10110 to decimal, add the position values where there is a 1: 16 + 4 + 2 = 22. The positions are (from right to left): 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16.

    **Concept Tested:** Binary to Decimal Conversion

---

#### 2. Which number system uses base 16 and digits 0-9 plus A-F?

<div class="upper-alpha" markdown>
1. Binary
2. Octal
3. Hexadecimal
4. BCD
</div>

??? question "Show Answer"
    The correct answer is **C**. Hexadecimal (hex) is a base-16 number system that uses digits 0-9 for values 0-9 and letters A-F for values 10-15. It provides a compact way to represent binary values since each hex digit corresponds to exactly 4 binary bits.

    **Concept Tested:** Hexadecimal Numbers

---

#### 3. What is the result of the binary addition 1011 + 0110?

<div class="upper-alpha" markdown>
1. 10001
2. 10010
3. 10011
4. 10101
</div>

??? question "Show Answer"
    The correct answer is **A**. Adding 1011 (11) + 0110 (6) = 10001 (17). Working right to left: 1+0=1, 1+1=10 (write 0, carry 1), 0+1+1=10 (write 0, carry 1), 1+0+1=10 (write 0, carry 1), carry 1.

    **Concept Tested:** Binary Addition

---

#### 4. In two's complement representation using 8 bits, what decimal value does 11111111 represent?

<div class="upper-alpha" markdown>
1. 255
2. -1
3. -127
4. 0
</div>

??? question "Show Answer"
    The correct answer is **B**. In two's complement, 11111111 represents -1. The MSB (leftmost bit) being 1 indicates a negative number. To find the magnitude, invert all bits (00000000) and add 1 (00000001 = 1), so the value is -1.

    **Concept Tested:** Two's Complement

---

#### 5. What is the primary advantage of Gray code over standard binary?

<div class="upper-alpha" markdown>
1. It uses fewer bits to represent the same values
2. Only one bit changes between consecutive values
3. It can represent larger numbers
4. It is easier to convert to decimal
</div>

??? question "Show Answer"
    The correct answer is **B**. Gray code is designed so that consecutive values differ by exactly one bit. This property eliminates multi-bit transition errors in applications like rotary encoders and reduces glitches when crossing clock domains.

    **Concept Tested:** Gray Code

---

#### 6. How would you convert decimal 45 to binary using repeated division by 2?

<div class="upper-alpha" markdown>
1. Divide by 2 repeatedly and read remainders top to bottom
2. Divide by 2 repeatedly and read remainders bottom to top
3. Multiply by 2 repeatedly and record the integer parts
4. Subtract powers of 2 starting from the largest
</div>

??? question "Show Answer"
    The correct answer is **B**. To convert decimal to binary, repeatedly divide by 2 and record the remainders. The remainders, read from bottom to top (last to first), form the binary number. For 45: 45÷2=22 R1, 22÷2=11 R0, 11÷2=5 R1, 5÷2=2 R1, 2÷2=1 R0, 1÷2=0 R1. Reading bottom to top: 101101.

    **Concept Tested:** Decimal to Binary Conversion

---

#### 7. In BCD (Binary-Coded Decimal), how is the decimal number 59 represented?

<div class="upper-alpha" markdown>
1. 00111011
2. 0101 1001
3. 111011
4. 0011 1011
</div>

??? question "Show Answer"
    The correct answer is **B**. In BCD, each decimal digit is encoded separately using 4 bits. Decimal 5 = 0101 and decimal 9 = 1001, so 59 in BCD is 0101 1001. BCD is not a direct binary conversion—it encodes each digit independently.

    **Concept Tested:** BCD Encoding

---

#### 8. What condition indicates overflow in signed binary addition?

<div class="upper-alpha" markdown>
1. The result has more bits than the operands
2. The carry out of the MSB is 1
3. Two positive numbers produce a negative result (or vice versa)
4. The sum equals zero
</div>

??? question "Show Answer"
    The correct answer is **C**. Overflow in signed addition occurs when the sign of the result is incorrect—specifically, when adding two positive numbers yields a negative result, or adding two negative numbers yields a positive result. This happens when the result exceeds the representable range.

    **Concept Tested:** Overflow Detection

---

#### 9. What is the hexadecimal equivalent of binary 11010110?

<div class="upper-alpha" markdown>
1. D6
2. B6
3. 6D
4. DA
</div>

??? question "Show Answer"
    The correct answer is **A**. To convert binary to hex, group bits into sets of 4 from the right: 1101 0110. Then convert each group: 1101 = D (13), 0110 = 6. So 11010110 binary = D6 hexadecimal.

    **Concept Tested:** Hex to Binary Conversion

---

#### 10. Which statement correctly describes the relationship between octal and binary?

<div class="upper-alpha" markdown>
1. Each octal digit represents 2 binary bits
2. Each octal digit represents 3 binary bits
3. Each octal digit represents 4 binary bits
4. Octal and binary have no direct relationship
</div>

??? question "Show Answer"
    The correct answer is **B**. Octal is base 8, and since 8 = 2³, each octal digit represents exactly 3 binary bits. For example, octal 7 = binary 111, octal 5 = binary 101. This makes conversion between octal and binary straightforward by grouping bits in threes.

    **Concept Tested:** Octal Numbers
