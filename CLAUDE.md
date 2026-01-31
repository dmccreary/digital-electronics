# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an intelligent textbook for a sophomore-level digital electronics course (ABET-aligned EE curricula). The site uses MkDocs with Material theme and includes interactive MicroSims built with p5.js for visualizing logic gates, flip-flops, and sequential circuits.

## Content Generation Guidelines

When generating any content, the tone of this book is light-hearted and positive.
Feel free to throw in a joke or pun to keep the reading interesting.
Use metaphors and stories when it would make the reading interesting.
Our goal is to make this a fun book that also promotes critical thinking and helps students spot misinformation in social media.  The ability to find patterns in the world is key.
Feel free to use the <details markdown="1"><summary>Graphic Novel Suggestion</summary></details> block to suggest a graphic novel about the history of digital electronics to accompany the text.
Use the metaphors that understanding digital electronics is a superpower that will help you understand the world around you.
We look for ways to not just memorize facts but to promote higher order thinking (Bloom Levels 4,5 and 6, Analyze, Evaluate and Create).

## Build Commands

```bash
# Activate conda environment
conda activate mkdocs

# Local development server (runs at http://localhost:8000)
mkdocs serve

# Build static site (outputs to site/ folder)
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## Environment Setup

```bash
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"

# Mac-specific for social cards (Apple Silicon)
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

## Project Structure

- `docs/` - All markdown content and MicroSims
  - `lessons/` - Course lesson content (Boolean algebra, logic gates)
  - `sims/` - Interactive p5.js simulations
  - `course-description.md` - Full course syllabus with 12 topic areas
- `mkdocs.yml` - Site configuration and navigation
- `site/` - Generated static site (gitignored)

## MicroSim Development

MicroSims use p5.js and follow a standard structure:
- Each sim has its own folder under `docs/sims/`
- Contains: `index.md`, JavaScript file(s), and HTML file for embedding

### Logic Gate Library (`docs/sims/logic-gates/logic-gate-lib.js`)

Shared library for drawing gates with consistent API:
```javascript
// All gate functions: drawGate(x, y, w, h, l)
// x, y: upper-left corner position
// w, h: gate dimensions (excluding wires)
// l: wire length for inputs/outputs

drawBuffer(x, y, w, h, l);
drawInverter(x, y, w, h, l);
drawAND(x, y, w, h, l);
drawNAND(x, y, w, h, l);
drawOR(x, y, w, h, l);
drawNOR(x, y, w, h, l);
drawXOR(x, y, w, h, l);
drawXNOR(x, y, w, h, l);
```

The library uses `push()`/`pop()` to preserve drawing context around fills.

### Embedding MicroSims in Markdown

Use iframes without style attributes:
```html
<iframe src="URL" width="400" height="370" scrolling="no"></iframe>
```

### LaTeX Equations

Use `\(` and `\)` for inline equations, and `\[` and `\]` for display (block) equations. Do NOT use `$...$` or `$$...$$` notation.

**Inline example:**
```markdown
The identity law states that \(A + 0 = A\).
```

**Display example:**
```markdown
\[F(A, B, C) = A \cdot B + \overline{C}\]
```

## Course Content Areas

Topics covered (in teaching order):
1. Boolean Algebra & Binary Logic
2. Logic Gates & Gate-Level Modeling
3. Combinational Logic Design
4. Logic Simplification (K-maps)
5. Sequential Logic Introduction
6. Flip-Flops & Clocked Storage
7. Synchronous Sequential Logic (FSMs)
8. Registers, Counters, Datapath Elements
9. Verilog HDL Modeling
10. Design, Simulation, Verification
11. Laboratory Component
12. Professional Outcomes
