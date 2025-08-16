# Documentation Checklist

## 🔴 MANDATORY: After Every Change

**IMPORTANT: Run [Code Review Checklist](./code-review-checklist.md) FIRST, then update docs**

When implementing new functionality or refactoring existing code, ALWAYS:

### 1. Search Existing Documentation
```bash
# Search for references to the changed component/function
grep -r "ComponentName" docs/ CLAUDE.md README.md
```

### 2. Update Affected Documentation
- [ ] Update code examples if implementation changed
- [ ] Update API references if interfaces changed
- [ ] Update architecture decisions if approach changed
- [ ] Update troubleshooting if new issues were discovered

### 3. Create New Documentation When Needed
- [ ] New patterns → Add to code-standards.md
- [ ] New components → Document in component-patterns.md
- [ ] New learnings → Add to relevant docs
- [ ] Bug fixes → Add to troubleshooting.md

### 4. Keep Documentation Current
- [ ] Remove references to deleted code
- [ ] Update version numbers if upgraded
- [ ] Fix broken links if files moved
- [ ] Update examples to match current implementation

## Documentation Update Triggers

**ALWAYS update docs when you:**
- ✅ Fix a bug (add to troubleshooting)
- ✅ Change component behavior (update examples)
- ✅ Refactor code structure (update architecture)
- ✅ Add new features (create/update relevant docs)
- ✅ Remove features (remove from docs)
- ✅ Change API interfaces (update references)
- ✅ Discover gotchas (add to learnings)
- ✅ Optimize performance (document approach)

## Example Workflow

```typescript
// 1. Made a change to LayeredTransition component
// 2. Search docs: grep -r "LayeredTransition" docs/
// 3. Found loading-strategy.md mentions it
// 4. Updated the code example and explanation
// 5. Added note about the improvement
```

## Documentation Locations

- `/CLAUDE.md` - Project overview and quick reference
- `/docs/` - Detailed documentation by topic
- Component files - Inline JSDoc comments
- `/README.md` - Public-facing documentation

## Red Flags (Need Immediate Doc Updates)

- 🚨 Changed function signature
- 🚨 Modified component props
- 🚨 Altered data flow
- 🚨 Fixed critical bug
- 🚨 Changed configuration
- 🚨 Modified build process
- 🚨 Updated dependencies

## Documentation Quality Standards

1. **Accuracy** - Must match current implementation
2. **Completeness** - Cover all important aspects
3. **Clarity** - Easy to understand
4. **Examples** - Show real usage
5. **Currency** - Keep up-to-date

## Self-Check Questions

Before considering any task complete, ask:
1. Did I search for existing documentation about this?
2. Did I update all affected documentation?
3. Should I create new documentation for this?
4. Are my code examples still accurate?
5. Will another developer understand this change?

**Remember: Undocumented changes are technical debt!**