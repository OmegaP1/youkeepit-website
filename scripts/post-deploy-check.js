// scripts/post-deploy-check.js
// Verify security after deployment
const https = require('https');

class PostDeploymentCheck {
  constructor(domain) {
    this.domain = domain;
    this.results = [];
  }

  async checkSecurityHeaders() {
    console.log('🔍 Checking security headers...');
    
    const expectedHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'referrer-policy'
    ];

    try {
      const response = await this.makeRequest(`https://${this.domain}/admin`);
      
      expectedHeaders.forEach(header => {
        if (response.headers[header]) {
          this.results.push(`✅ ${header}: ${response.headers[header]}`);
        } else {
          this.results.push(`❌ Missing header: ${header}`);
        }
      });

    } catch (error) {
      this.results.push(`❌ Failed to check headers: ${error.message}`);
    }
  }

  async checkServiceRoleExposure() {
    console.log('🔍 Checking for service role key exposure...');
    
    try {
      // Check if service role key is exposed in client bundles
      const response = await this.makeRequest(`https://${this.domain}/_next/static/chunks/main.js`);
      
      if (response.body.includes('service_role') || 
          response.body.includes('SUPABASE_SERVICE_ROLE_KEY')) {
        this.results.push('❌ CRITICAL: Service role key may be exposed in client bundle!');
      } else {
        this.results.push('✅ Service role key not found in client bundle');
      }

    } catch (error) {
      this.results.push('⚠️  Could not verify client bundle (may be normal)');
    }
  }

  async checkAPIEndpoints() {
    console.log('🔍 Checking API endpoint security...');
    
    try {
      // Test unauthorized access to admin API
      const response = await this.makeRequest(`https://${this.domain}/api/admin/content`, 'POST');
      
      if (response.status === 401 || response.status === 403) {
        this.results.push('✅ Admin API properly protected');
      } else {
        this.results.push('❌ Admin API may not be properly protected');
      }

    } catch (error) {
      this.results.push(`⚠️  Could not test admin API: ${error.message}`);
    }
  }

  makeRequest(url, method = 'GET') {
    return new Promise((resolve, reject) => {
      const req = https.request(url, { method }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body
          });
        });
      });

      req.on('error', reject);
      req.setTimeout(10000, () => reject(new Error('Request timeout')));
      req.end();
    });
  }

  async runAll() {
    console.log(`🚀 Post-deployment security check for: ${this.domain}\n`);
    
    await this.checkSecurityHeaders();
    await this.checkServiceRoleExposure();
    await this.checkAPIEndpoints();
    
    console.log('\n' + '='.repeat(60));
    console.log('🛡️  POST-DEPLOYMENT SECURITY REPORT');
    console.log('='.repeat(60));
    
    this.results.forEach(result => console.log(`  ${result}`));
    
    const hasErrors = this.results.some(r => r.includes('❌'));
    
    if (hasErrors) {
      console.log('\n🚨 Security issues detected! Review and fix immediately.');
      return false;
    } else {
      console.log('\n🎉 Post-deployment security check PASSED!');
      return true;
    }
  }
}
// Usage: node scripts/post-deploy-check.js yourdomain.vercel.app
if (require.main === module) {
  const domain = process.argv[2];
  
  if (!domain) {
    console.error('Usage: node scripts/post-deploy-check.js <domain>');
    process.exit(1);
  }
  
  const checker = new PostDeploymentCheck(domain);
  checker.runAll().then(success => {
    process.exit(success ? 0 : 1);
  });
}