# Quiz: Verilog HDL Fundamentals

Test your understanding of Verilog basics, modules, data types, and fundamental constructs.

---

#### 1. What is the fundamental difference between HDL and traditional programming languages?

<div class="upper-alpha" markdown>
1. HDLs are slower to execute
2. HDLs describe concurrent hardware structure, not sequential operations
3. HDLs can only be used for simulation
4. HDLs require more memory
</div>

??? question "Show Answer"
    The correct answer is **B**. Hardware Description Languages describe concurrent hardware—everything happens simultaneously. Traditional programming describes sequential operations executed one at a time. This fundamental difference affects how you think about and write HDL code.

    **Concept Tested:** HDL vs Programming

---

#### 2. What are the essential components of a Verilog module?

<div class="upper-alpha" markdown>
1. Header, variables, and return statement
2. Module name, port list, body, and endmodule
3. Class definition and methods
4. Input buffer, processing core, and output buffer
</div>

??? question "Show Answer"
    The correct answer is **B**. A Verilog module requires a module name (identifier), a port list (the interface), a body (the implementation), and the endmodule keyword. Modules are the fundamental building blocks of Verilog designs.

    **Concept Tested:** Module Definition

---

#### 3. Which port direction allows signals to flow both into and out of a module?

<div class="upper-alpha" markdown>
1. input
2. output
3. inout
4. bidirectional is not supported in Verilog
</div>

??? question "Show Answer"
    The correct answer is **C**. The inout port direction allows bidirectional signals, used for shared buses where multiple devices can drive the line. Inout ports require tristate logic and outputting high-impedance (Z) when not driving.

    **Concept Tested:** Inout Port

---

#### 4. What is the key characteristic of the wire data type in Verilog?

<div class="upper-alpha" markdown>
1. It stores values between clock edges
2. It must be continuously driven and cannot hold values
3. It can only carry single-bit signals
4. It requires explicit initialization
</div>

??? question "Show Answer"
    The correct answer is **B**. A wire represents a physical connection that must be continuously driven. It transmits values from driver to destination but cannot store values. If nothing drives a wire, it has an undefined value (X).

    **Concept Tested:** Wire Data Type

---

#### 5. When does a reg data type synthesize to an actual flip-flop?

<div class="upper-alpha" markdown>
1. Always—reg always means register
2. Only when used in a clocked always block where it may not be assigned
3. Only when declared with the "register" keyword
4. Never—reg is simulation only
</div>

??? question "Show Answer"
    The correct answer is **B**. A reg becomes a flip-flop only when there's a code path where it isn't assigned a new value, requiring the hardware to "remember" the old value. A reg in a clocked always block with conditional assignment synthesizes to storage.

    **Concept Tested:** Reg Data Type

---

#### 6. What is the purpose of a parameter in Verilog?

<div class="upper-alpha" markdown>
1. To define variables that change during simulation
2. To create configurable, reusable modules with values set at instantiation
3. To declare input ports
4. To specify simulation timing
</div>

??? question "Show Answer"
    The correct answer is **B**. Parameters are constants that can be set when a module is instantiated, enabling configurable, reusable designs. Common uses include bus widths, timing values, and array sizes that vary between instances.

    **Concept Tested:** Parameter

---

#### 7. What does an assign statement create in hardware?

<div class="upper-alpha" markdown>
1. A flip-flop
2. A continuous combinational connection
3. A clock signal
4. A memory element
</div>

??? question "Show Answer"
    The correct answer is **B**. An assign statement creates a continuous, always-active combinational connection. The right-hand expression is constantly evaluated, and any input change immediately affects the output—like physical wires and gates.

    **Concept Tested:** Assign Statement

---

#### 8. What is the primary purpose of an initial block in Verilog?

<div class="upper-alpha" markdown>
1. To initialize flip-flops in synthesized hardware
2. To provide simulation-time setup and stimulus generation
3. To define the module interface
4. To create clock signals for synthesis
</div>

??? question "Show Answer"
    The correct answer is **B**. Initial blocks execute once at simulation start (time zero) and are primarily used in testbenches for initialization, clock generation, and stimulus application. They are generally not synthesizable.

    **Concept Tested:** Initial Block

---

#### 9. What does module instantiation accomplish in Verilog?

<div class="upper-alpha" markdown>
1. It compiles the module for simulation
2. It creates instances of modules and connects their ports to signals
3. It defines a new module type
4. It generates documentation
</div>

??? question "Show Answer"
    The correct answer is **B**. Module instantiation creates copies of defined modules and wires their ports to signals in the parent module. This builds hierarchical designs where complex systems are composed of simpler, reusable components.

    **Concept Tested:** Module Instantiation

---

#### 10. In the literal 8'hA5, what do the components represent?

<div class="upper-alpha" markdown>
1. 8 bits, hexadecimal radix, value A5 (165 decimal)
2. 8 bytes, high-speed mode, address 5
3. Module instance 8, port h, signal A5
4. 8-character string "hA5"
</div>

??? question "Show Answer"
    The correct answer is **A**. Verilog number format is size'radix_value. Here: 8 = bit width, h = hexadecimal radix, A5 = value (165 in decimal, 10100101 in binary). Other radixes: b=binary, o=octal, d=decimal.

    **Concept Tested:** Verilog HDL

