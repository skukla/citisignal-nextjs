# Cleanup Plan for Legacy Components and Files

## **🚨 IDENTIFIED CLEANUP ISSUES**

### **Files to Delete Immediately:**

#### **1. Temporary Files**
- `src/app/phones/page.refactored.tsx` ❌
  - **Reason**: Temporary file from refactoring, no longer needed
  - **Action**: Delete immediately

#### **2. Potentially Orphaned Analysis Files**
Need to audit these analysis files to ensure their corresponding components still exist and are current:

**Content Components:**
- `docs/analysis/ui/content/BenefitCard.analysis.md`
- `docs/analysis/ui/content/CheckmarkFeatureList.analysis.md`  
- `docs/analysis/ui/content/FeaturedTool.analysis.md`
- `docs/analysis/ui/content/PrivacyNotice.analysis.md`
- `docs/analysis/ui/content/ProductBadge.analysis.md`
- `docs/analysis/ui/content/ProductImagePlaceholder.analysis.md`
- `docs/analysis/ui/content/PromoTag.analysis.md`
- `docs/analysis/ui/content/SimplePlanCard.analysis.md`
- `docs/analysis/ui/content/StatsCard.analysis.md`
- `docs/analysis/ui/content/ToolCard.analysis.md`

**Duplicate Analysis Files:**
- `docs/analysis/ui/layout/Breadcrumb.analysis.md`
- `docs/analysis/ui/navigation/Breadcrumb.analysis.md`
  - **Issue**: Two analysis files for same component
  - **Action**: Keep one, delete the other

#### **3. Components that may be deprecated or replaced**
Need to audit usage:

- `src/components/ui/ProductImagePlaceholder.tsx`
  - **Has TODO comment**: "Use next/image when implementing real Commerce API images"
  - **Need to check**: Is this still actively used or can it be updated?

### **4. TODO Comments to Address**
- `src/app/plans/page.tsx` lines 135, 139, 143 - TODO placeholders for navigation logic
- `src/components/ui/ProductImagePlaceholder.tsx` line 1 - TODO for next/image integration

---

## **🔍 AUDIT REQUIRED**

### **Component Usage Verification:**
Run usage checks for these potentially underutilized components:

```bash
# Check if these are still being imported/used
grep -r "ProductImagePlaceholder" src/
grep -r "CheckmarkFeatureList" src/
grep -r "PrivacyNotice" src/
grep -r "PromoTag" src/
grep -r "SimplePlanCard" src/
```

### **Analysis File Validation:**
Verify each analysis file has a corresponding component that's actively maintained.

---

## **✅ CLEANUP ACTIONS**

### **Immediate (Safe to delete):**
1. Delete `src/app/phones/page.refactored.tsx`
2. Review and consolidate duplicate Breadcrumb analysis files

### **Audit Required:**
1. Verify component usage before any deletions
2. Update TODO comments or convert to proper implementations
3. Standardize analysis file organization

### **Future Cleanup:**
1. Review ProductImagePlaceholder for next/image migration
2. Address TODO placeholders in plans page
3. Consider archiving unused analysis files

---

## **⚠️ SAFETY NOTES**

- **Never delete without verification**: Always check imports/usage first
- **Test after deletions**: Ensure no broken imports
- **Update documentation**: Remove references to deleted components
- **Commit changes incrementally**: Small, focused cleanup commits

This cleanup will prevent confusion and potential conflicts during future refactoring work.