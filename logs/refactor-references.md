# Refactor: Separate References Files

**Date:** 2026-01-31

## Summary

Refactored chapter references from inline sections to separate files for improved token efficiency when using AI agents for maintenance tasks.

## Motivation

When references were embedded at the end of each chapter (1000-1700 lines), updating references required reading the entire chapter file. This was inefficient:

| Task | Before (Inline) | After (Separate) |
|------|-----------------|------------------|
| Read references | ~6,000 tokens | ~150 tokens |
| Update all 15 chapters | ~90,000 tokens | ~2,500 tokens |
| Edit chapter + refs | ~6,000 tokens | ~6,150 tokens |

**Result:** ~97% token reduction for reference-only maintenance tasks.

## Changes Made

### Created 15 New Files

```
docs/chapters/01-number-systems-binary-arithmetic/references.md
docs/chapters/02-boolean-algebra-fundamentals/references.md
docs/chapters/03-logic-gates-digital-signals/references.md
docs/chapters/04-combinational-logic-design/references.md
docs/chapters/05-logic-minimization-kmaps/references.md
docs/chapters/06-combinational-building-blocks/references.md
docs/chapters/07-intro-sequential-logic/references.md
docs/chapters/08-flip-flops-timing/references.md
docs/chapters/09-fsm-fundamentals/references.md
docs/chapters/10-fsm-design-applications/references.md
docs/chapters/11-registers-counters-datapath/references.md
docs/chapters/12-verilog-hdl-fundamentals/references.md
docs/chapters/13-verilog-modeling/references.md
docs/chapters/14-testbenches-simulation/references.md
docs/chapters/15-fpga-lab-skills/references.md
```

### Modified 15 Chapter Files

Replaced the `## References` section (with 5 numbered references) with a single link:

```markdown
[See Annotated References](./references.md)
```

## New Structure

Each chapter folder now contains:

```
docs/chapters/XX-chapter-name/
├── index.md          # Chapter content (~1000-1700 lines)
└── references.md     # References only (~15 lines)
```

## Reference Format

Each references.md file follows this structure:

```markdown
# References: [Chapter Title]

1. [Wikipedia Article](url) - Wikipedia - Description.

2. [Wikipedia Article 2](url) - Wikipedia - Description.

3. Textbook Title - Author - Publisher - Description.

4. [Online Resource](url) - Source - Description.

5. [Online Resource 2](url) - Source - Description.
```

Wikipedia links are listed first for reliability, followed by textbooks (without URLs that may break), then online tutorials.

## Benefits

1. **Agent Efficiency:** AI agents can glob `**/references.md` and batch-process all references without loading chapter content
2. **Model Selection:** Simple reference tasks can use lighter models (e.g., Haiku)
3. **Separation of Concerns:** Chapter content edits don't risk breaking references
4. **Easier Validation:** Reference files can be checked for broken links independently
5. **Reduced Context:** When asking about references, only ~150 tokens needed per chapter instead of ~6,000

## Future Considerations

- References render as separate pages in MkDocs
- Can optionally add to `mkdocs.yml` nav for explicit navigation
- Could use `--8<-- "references.md"` snippet include if inline rendering desired
