// scripts/deploy.sh
#!/bin/bash

echo "🚀 Starting secure deployment process..."

# 1. Run security validation
echo "🔍 Running security checks..."
npm run security-check

if [ $? -ne 0 ]; then
    echo "❌ Security validation failed. Deployment aborted."
    exit 1
fi

# 2. Run tests
echo "🧪 Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Deployment aborted."
    exit 1
fi

# 3. Build application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Deployment aborted."
    exit 1
fi

# 4. Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🔗 Your secure application is now live!"
    
    # 5. Run post-deployment security check
    echo "🔍 Running post-deployment verification..."
    # Add your domain verification script here
else
    echo "❌ Deployment failed."
    exit 1
fi