# Next.js 15.5 Migration Guide

## Quick Start

Migrate your Next.js project to version 15.5 in 3 simple steps:

### 1. Install NeuroLint CLI
```bash
npm install -g @neurolint/cli
```

### 2. Preview Migration Changes
```bash
neurolint migrate-nextjs-15.5 . --dry-run --verbose
```

### 3. Apply Migration
```bash
neurolint migrate-nextjs-15.5 . --apply --create-rollback
```

## What Gets Migrated

### Server Actions Enhancement
**Before:**
```typescript
'use server';
export async function submitForm(formData: FormData) {
  const data = await processForm(formData);
  return data;
}
```

**After:**
```typescript
'use server';
export async function submitForm(formData: FormData) {
  try {
    const data = await processForm(formData);
    return { success: true, data };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error: error.message };
  }
}
```

### Metadata API Modernization
**Before:**
```typescript
export async function generateMetadata({ params }) {
  return { title: `Page ${params.id}` };
}
```

**After:**
```typescript
export async function generateMetadata({ 
  params 
}: { 
  params: Record<string, string> 
}) {
  return { title: `Page ${params.id}` };
}
```

### Caching Optimization
**Before:**
```typescript
const data = await fetch('/api/users');
```

**After:**
```typescript
const data = await fetch('/api/users', {
  cache: 'force-cache'
});
```

### Turbopack Integration
Automatically configures Next.js 15+ for optimal performance:

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build --turbo"
  }
}
```

## Migration Features

- **✅ Server Actions Enhancement**: Automatic error handling and validation
- **✅ Metadata API Modernization**: Stricter TypeScript typing
- **✅ Deprecation Detection**: Warns about outdated patterns
- **✅ Caching Optimization**: Smart suggestions for performance
- **✅ Turbopack Integration**: Automatic configuration for Next.js 15+
- **✅ Rollback Safety**: Automatic backup and rollback plans
- **✅ Dry Run Mode**: Preview changes before applying
- **✅ Version Validation**: Ensures compatibility with Next.js 13.4-15.5

## Command Options

```bash
# Preview changes (recommended first step)
neurolint migrate-nextjs-15.5 . --dry-run

# Apply changes with rollback safety
neurolint migrate-nextjs-15.5 . --apply --create-rollback

# Verbose output for detailed information
neurolint migrate-nextjs-15.5 . --dry-run --verbose

# Target specific directory
neurolint migrate-nextjs-15.5 src/ --dry-run
```

## Example Output - ACTUAL RESULTS

```bash
[INFO] Starting Next.js 15.5 migration for: .
[INFO] Mode: Dry Run
[PROCESSING] Validating project compatibility...[COMPLETE] Project validation passed
[INFO] Current Next.js version: 13.4.0
[INFO] Supported range: 13.4.0 - 15.5.0
[PROCESSING] Discovering files to process...[COMPLETE] Found 250 files to process
[PROCESSING] Processing files through Layer 5...
[SUCCESS] Layer 5 identified 21 Next.js 15.5 fixes (dry-run)
[INFO] Found 8 optimization suggestions
[WARNING] Found 8 deprecation warnings

Migration Summary:
  Files processed: 250
  Successfully processed: 18
  Files with changes: 8
  Files already compatible: 46
  Incompatible files (skipped): 162
  Failed to process: 0
  Total changes: 21
  Total warnings: 8
  Execution time: 9305ms
```

## Safety Features

### Automatic Rollback
When using `--create-rollback`, the migration creates a rollback script:

```bash
# Rollback script location
.neurolint-rollback-1755846145081.sh

# Execute rollback
bash .neurolint-rollback-1755846145081.sh
```

### Dry Run Mode
Always preview changes before applying:
```bash
neurolint migrate-nextjs-15.5 . --dry-run --verbose
```

### Version Validation
The migration automatically checks your Next.js version and ensures compatibility.

## Best Practices

1. **Always use dry-run first** to preview changes
2. **Create rollback plans** for production migrations
3. **Test after migration** by running your test suite
4. **Review changes** to understand what was modified
5. **Incremental migration** for large projects

## Troubleshooting

### Version Compatibility
If you see a version error:
```bash
# Upgrade to supported version first
npm install next@13.4.0
neurolint migrate-nextjs-15.5 . --dry-run
```

### File Processing Issues
If files fail to process:
- Check for syntax errors in the files
- Ensure files are valid TypeScript/JavaScript
- Review the files manually before migration

### Permission Errors
If you encounter permission issues:
```bash
# Check file permissions
ls -la

# Fix permissions if needed
chmod 644 filename.tsx
```

## Support

- **Documentation**: [https://neurolint.dev/docs](https://neurolint.dev/docs)
- **GitHub**: [https://github.com/neurolint/cli](https://github.com/neurolint/cli)
- **NPM**: [https://www.npmjs.com/package/@neurolint/cli](https://www.npmjs.com/package/@neurolint/cli)
- **Support**: migration@neurolint.dev

## Migration Checklist

### Pre-Migration
- [ ] Backup your project
- [ ] Check Next.js version compatibility
- [ ] Run existing tests to establish baseline

### During Migration
- [ ] Run dry-run to preview changes
- [ ] Review migration report
- [ ] Apply changes with rollback plan

### Post-Migration
- [ ] Run test suite
- [ ] Build project successfully
- [ ] Start development server
- [ ] Review changed files
- [ ] Deploy to staging environment

---

**Ready to migrate?** Start with: `neurolint migrate-nextjs-15.5 . --dry-run` 