// scripts/env-check.js
// Environment variables validation script
const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_SECRET',
  'SESSION_SECRET'
];

const optionalEnvVars = [
  'DB_ENCRYPTION_KEY',
  'RATE_LIMIT_MAX_REQUESTS',
  'RATE_LIMIT_WINDOW_MS',
  'ALLOWED_ORIGINS'
];

console.log('🔍 Checking environment variables...\n');

let hasErrors = false;

// Check required variables
console.log('✅ Required Variables:');
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`  ✅ ${varName}`);
  } else {
    console.log(`  ❌ ${varName} - MISSING`);
    hasErrors = true;
  }
});

// Check optional variables
console.log('\n⚠️  Optional Variables:');
optionalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`  ✅ ${varName}`);
  } else {
    console.log(`  ⚠️  ${varName} - Not set (optional)`);
  }
});

// Validate format
if (process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://')) {
  console.log('\n❌ SUPABASE_URL must be a valid HTTPS URL');
  hasErrors = true;
}

// Check secret strength
if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
  console.log('\n❌ NEXTAUTH_SECRET must be at least 32 characters');
  hasErrors = true;
}

if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
  console.log('\n❌ SESSION_SECRET must be at least 32 characters');
  hasErrors = true;
}

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Environment validation FAILED');
  process.exit(1);
} else {
  console.log('✅ Environment validation PASSED');
  process.exit(0);
}