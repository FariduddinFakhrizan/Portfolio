#!/usr/bin/env node

/**
 * Build-time verification script to ensure all required pages exist
 * This prevents 404 errors by catching missing pages during build
 */

const fs = require('fs');
const path = require('path');

const requiredPages = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/blog/[slug]/page.tsx',
  'src/app/case-studies/page.tsx',
  'src/app/case-studies/[project]/page.tsx',
  'src/app/now/page.tsx',
  'src/app/testimonials/page.tsx',
  'src/app/projects/page.tsx',
  'src/app/projects/[id]/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/technologies/page.tsx',
];

const rootDir = process.cwd();
let hasErrors = false;

console.log('🔍 Verifying all required pages exist...\n');

requiredPages.forEach(pagePath => {
  const fullPath = path.join(rootDir, pagePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${pagePath}`);
  } else {
    console.error(`❌ MISSING: ${pagePath}`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.error('\n❌ Build failed: Some required pages are missing!');
  process.exit(1);
} else {
  console.log('\n✅ All required pages verified successfully!');
  process.exit(0);
}
