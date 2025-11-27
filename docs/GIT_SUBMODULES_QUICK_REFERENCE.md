# Git Submodules - Quick Reference

Quick reference for common Git submodule operations in this project.

## Common Commands

### Initial Setup

```bash
# Clone repo WITH submodules (first time)
git clone --recurse-submodules <repo-url>

# Initialize submodules (if cloned without --recurse-submodules)
git submodule update --init --recursive
```

### Daily Workflow

```bash
# Pull latest changes (parent repo and submodules)
git pull origin main
git submodule update --init --recursive

# Check submodule status
git submodule status

# See what changed in submodule
cd src/demo-inspector
git status
git log --oneline -5
cd ../..
```

### Updating Submodule to Latest

```bash
# Update to latest version from remote
git submodule update --remote src/demo-inspector

# Commit the update
git add src/demo-inspector
git commit -m "chore: update demo-inspector to latest"
git push origin main
```

### Making Changes to Submodule

```bash
# Navigate into submodule
cd src/demo-inspector

# Create feature branch
git checkout -b feature/my-changes

# Make changes, commit
git add .
git commit -m "feat: my changes"
git push origin feature/my-changes

# Go back to parent repo
cd ../..

# Update pointer
git add src/demo-inspector
git commit -m "chore: update demo-inspector submodule"
git push origin main
```

### Switching Branches

```bash
# Switch branch in parent repo
git checkout feature/my-feature

# Update submodules to match branch
git submodule update --init --recursive
```

### Checking Submodule Info

```bash
# See submodule configuration
cat .gitmodules

# See which commit submodule points to
git ls-tree main src/demo-inspector

# See submodule remote URL
cd src/demo-inspector
git remote -v
cd ../..
```

## Troubleshooting

### Submodule is Empty

```bash
git submodule update --init --recursive
```

### Submodule Shows Modified Content

```bash
cd src/demo-inspector
git status  # See what's different
git diff    # See actual changes

# If you want to keep changes:
git add .
git commit -m "fix: your message"
git push origin main

# If you want to discard changes:
git checkout .
cd ../..
```

### Detached HEAD in Submodule

This is normal! Submodules track specific commits, not branches.

```bash
# If you need to make changes:
cd src/demo-inspector
git checkout main
git pull origin main
# make changes...
cd ../..
git add src/demo-inspector
git commit -m "chore: update demo-inspector"
```

### Submodule Out of Sync

```bash
# Reset to the commit tracked by parent repo
git submodule update --init --recursive

# Or update to latest from remote
git submodule update --remote src/demo-inspector
```

## File Locations

| Path                               | Description                        |
| ---------------------------------- | ---------------------------------- |
| `.gitmodules`                      | Submodule configuration            |
| `src/demo-inspector/`              | Demo Inspector submodule directory |
| `.git/modules/src/demo-inspector/` | Submodule's actual .git directory  |

## Important Notes

⚠️ **Never manually edit `.gitmodules` unless you know what you're doing**

⚠️ **Always commit submodule changes before updating parent repo**

⚠️ **Run `git submodule update --init --recursive` after pulling**

✅ **Submodules are just pointers to specific commits**

✅ **Each developer needs to initialize submodules separately**

✅ **Submodule changes are tracked in two repos (demo-inspector and citisignal-nextjs)**

## Advanced

### Remove Submodule (if needed)

```bash
# 1. De-initialize
git submodule deinit -f src/demo-inspector

# 2. Remove from working tree and .gitmodules
git rm -f src/demo-inspector

# 3. Commit
git commit -m "chore: remove demo-inspector submodule"

# 4. Clean up
rm -rf .git/modules/src/demo-inspector
```

### Change Submodule URL

```bash
# 1. Edit .gitmodules
# Change url = ...

# 2. Sync
git submodule sync

# 3. Update
git submodule update --init --recursive
```

### Clone Specific Submodule Commit

```bash
cd src/demo-inspector
git fetch
git checkout <commit-hash>
cd ../..
git add src/demo-inspector
git commit -m "chore: pin demo-inspector to specific version"
```

## Resources

- [Git Submodules Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [Atlassian Submodules Tutorial](https://www.atlassian.com/git/tutorials/git-submodule)
- [Demo Inspector Repository](https://github.com/skukla/demo-inspector)
