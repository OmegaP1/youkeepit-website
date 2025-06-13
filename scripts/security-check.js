// scripts/security-check.js
// Run this before deployment to validate security configuration

const fs = require('fs');
const path = require('path');

class SecurityValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  // Check environment variables
  validateEnvironment() {
    console.log('🔍 Validating Environment Variables...');
    
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
      'ALLOWED_ORIGINS'
    ];

    // Check required variables
    requiredEnvVars.forEach(varName => {
      if (!process.env[varName]) {
        this.errors.push(`❌ Missing required environment variable: ${varName}`);
      } else {
        this.passed.push(`✅ ${varName} is set`);
      }
    });

    // Check optional variables
    optionalEnvVars.forEach(varName => {
      if (!process.env[varName]) {
        this.warnings.push(`⚠️  Optional environment variable not set: ${varName}`);
      } else {
        this.passed.push(`✅ ${varName} is set`);
      }
    });

    // Validate URL format
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && 
        !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://')) {
      this.errors.push('❌ SUPABASE_URL must be a valid HTTPS URL');
    }

    // Check secret strength
    if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
      this.errors.push('❌ NEXTAUTH_SECRET must be at least 32 characters');
    }

    if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
      this.errors.push('❌ SESSION_SECRET must be at least 32 characters');
    }
  }

  // Check for exposed secrets in client code
  validateClientSecurity() {
    console.log('🔍 Scanning for exposed secrets in client code...');
    
    const dangerousPatterns = [
      /SUPABASE_SERVICE_ROLE_KEY/i,
      /service_role/i,
      /eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/,  // JWT pattern
      /sk-[a-zA-Z0-9]{48}/,  // Service key pattern
    ];

    const clientFiles = this.getClientFiles();
    
    clientFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      
      dangerousPatterns.forEach(pattern => {
        if (pattern.test(content)) {
          this.errors.push(`❌ Potential secret exposure in client file: ${filePath}`);
        }
      });
    });

    if (this.errors.filter(e => e.includes('exposure')).length === 0) {
      this.passed.push('✅ No secrets found in client code');
    }
  }

  // Get list of client-side files
  getClientFiles() {
    const clientDirs = [
      'src/components',
      'src/app',
      'src/hooks',
      'src/utils'
    ];

    let files = [];
    
    clientDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        files = files.concat(this.getJSFiles(dir));
      }
    });

    return files;
  }

  // Recursively get JS/TS files
  getJSFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files = files.concat(this.getJSFiles(fullPath));
      } else if (/\.(js|jsx|ts|tsx)$/.test(item)) {
        files.push(fullPath);
      }
    });

    return files;
  }

  // Validate API route security
  validateAPIRoutes() {
    console.log('🔍 Validating API route security...');
    
    const apiDir = 'src/app/api';
    if (!fs.existsSync(apiDir)) {
      this.warnings.push('⚠️  No API routes found');
      return;
    }

    const apiFiles = this.getJSFiles(apiDir);
    
    apiFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for authentication
      if (filePath.includes('admin')) {
        if (!content.includes('validateAdminSession') && 
            !content.includes('session') && 
            !content.includes('auth')) {
          this.warnings.push(`⚠️  Admin API route may lack authentication: ${filePath}`);
        }
      }

      // Check for rate limiting
      if (!content.includes('rate') && !content.includes('limit')) {
        this.warnings.push(`⚠️  API route may lack rate limiting: ${filePath}`);
      }

      // Check for input validation
      if (!content.includes('validate') && !content.includes('sanitize')) {
        this.warnings.push(`⚠️  API route may lack input validation: ${filePath}`);
      }
    });

    if (this.warnings.filter(w => w.includes('API route')).length === 0) {
      this.passed.push('✅ API routes appear to have security measures');
    }
  }

  // Check database configuration
  validateDatabaseConfig() {
    console.log('🔍 Validating database configuration...');
    
    // Check for RLS policies in migration files
    const dbDir = 'database';
    if (fs.existsSync(dbDir)) {
      const migrationFiles = fs.readdirSync(dbDir)
        .filter(file => file.endsWith('.sql'));

      let hasRLS = false;
      let hasPolicies = false;

      migrationFiles.forEach(file => {
        const content = fs.readFileSync(path.join(dbDir, file), 'utf8');
        
        if (content.includes('ENABLE ROW LEVEL SECURITY')) {
          hasRLS = true;
        }
        
        if (content.includes('CREATE POLICY')) {
          hasPolicies = true;
        }
      });

      if (hasRLS) {
        this.passed.push('✅ Row Level Security (RLS) is enabled');
      } else {
        this.errors.push('❌ Row Level Security (RLS) not found in migrations');
      }

      if (hasPolicies) {
        this.passed.push('✅ Database policies are defined');
      } else {
        this.errors.push('❌ No database policies found in migrations');
      }
    } else {
      this.warnings.push('⚠️  No database migration files found');
    }
  }

  // Validate build configuration
  validateBuildConfig() {
    console.log('🔍 Validating build configuration...');
    
    // Check next.config.js
    if (fs.existsSync('next.config.js')) {
      const config = fs.readFileSync('next.config.js', 'utf8');
      
      if (config.includes('headers')) {
        this.passed.push('✅ Security headers configured');
      } else {
        this.warnings.push('⚠️  No security headers found in next.config.js');
      }

      if (config.includes('X-Frame-Options')) {
        this.passed.push('✅ X-Frame-Options header configured');
      }

      if (config.includes('X-Content-Type-Options')) {
        this.passed.push('✅ X-Content-Type-Options header configured');
      }
    } else {
      this.warnings.push('⚠️  next.config.js not found');
    }

    // Check vercel.json
    if (fs.existsSync('vercel.json')) {
      const config = fs.readFileSync('vercel.json', 'utf8');
      
      if (config.includes('headers')) {
        this.passed.push('✅ Vercel security headers configured');
      }
    }

    // Check middleware
    if (fs.existsSync('src/middleware.js') || fs.existsSync('middleware.js')) {
      this.passed.push('✅ Middleware security configured');
    } else {
      this.warnings.push('⚠️  No middleware.js found for route protection');
    }
  }

  // Generate security report
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('🛡️  SECURITY VALIDATION REPORT');
    console.log('='.repeat(60));

    console.log('\n✅ PASSED CHECKS:');
    this.passed.forEach(check => console.log(`  ${check}`));

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(`  ${warning}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS (MUST FIX BEFORE DEPLOYMENT):');
      this.errors.forEach(error => console.log(`  ${error}`));
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 SUMMARY: ${this.passed.length} passed, ${this.warnings.length} warnings, ${this.errors.length} errors`);
    
    if (this.errors.length === 0) {
      console.log('🎉 Security validation PASSED! Safe to deploy.');
      return true;
    } else {
      console.log('🚨 Security validation FAILED! Fix errors before deploying.');
      return false;
    }
  }

  // Run all validations
  runAll() {
    console.log('🚀 Starting security validation...\n');
    
    this.validateEnvironment();
    this.validateClientSecurity();
    this.validateAPIRoutes();
    this.validateDatabaseConfig();
    this.validateBuildConfig();
    
    return this.generateReport();
  }
}

// Usage
if (require.main === module) {
  const validator = new SecurityValidator();
  const isSecure = validator.runAll();
  
  process.exit(isSecure ? 0 : 1);
}

module.exports = SecurityValidator;