#!/bin/bash

# Company Admin Panel Cleanup Script
# This script removes unused files and folders from the project

echo "🧹 Starting Company Admin Panel Cleanup..."

# Remove the old combined UI components file if it exists
if [ -f "src/app/company/components/ui/LoadingScreen.js" ]; then
    # Check if it contains multiple components (old file)
    if grep -q "MessageAlert\|StatCard\|OfferStatusBadge" "src/app/company/components/ui/LoadingScreen.js"; then
        echo "📁 Removing old combined UI components file..."
        rm "src/app/company/components/ui/LoadingScreen.js"
    fi
fi

# Remove any duplicate or temporary files
echo "🗑️  Removing duplicate and temporary files..."

# Remove any .temp, .bak, or duplicate files
find src/app/company -name "*.temp" -delete 2>/dev/null
find src/app/company -name "*.bak" -delete 2>/dev/null
find src/app/company -name "*~" -delete 2>/dev/null

# Remove empty directories
echo "📂 Removing empty directories..."
find src/app/company -type d -empty -delete 2>/dev/null

# Remove any unused API route files that don't have content
echo "🌐 Checking API routes..."
api_routes=(
    "src/app/api/company/offers/route.js"
    "src/app/api/company/employees/route.js"
    "src/app/api/company/devices/route.js"
    "src/app/api/company/transactions/route.js"
    "src/app/api/company/reports/route.js"
    "src/app/api/company/settings/route.js"
)

for route in "${api_routes[@]}"; do
    if [ -f "$route" ] && [ ! -s "$route" ]; then
        echo "  - Removing empty API route: $route"
        rm "$route"
    fi
done

# Remove unused component files that are empty or contain only comments
echo "🎨 Checking component files..."
component_files=(
    "src/app/company/components/employees/EmployeeTable.js"
    "src/app/company/components/employees/EmployeeForm.js"
    "src/app/company/components/employees/EmployeeFilters.js"
    "src/app/company/components/devices/DeviceTable.js"
    "src/app/company/components/devices/DeviceForm.js"
    "src/app/company/components/devices/DeviceFilters.js"
    "src/app/company/components/transactions/TransactionTable.js"
    "src/app/company/components/transactions/TransactionCard.js"
    "src/app/company/components/transactions/TransactionFilters.js"
    "src/app/company/components/reports/RevenueChart.js"
    "src/app/company/components/reports/OfferStats.js"
    "src/app/company/components/reports/ComplianceReport.js"
    "src/app/company/components/settings/CompanyProfile.js"
    "src/app/company/components/settings/TeamManagement.js"
    "src/app/company/components/settings/IntegrationSettings.js"
)

for file in "${component_files[@]}"; do
    if [ -f "$file" ] && [ ! -s "$file" ]; then
        echo "  - Removing empty component: $file"
        rm "$file"
    fi
done

# Remove unused utility files
echo "🛠️  Checking utility files..."
utility_files=(
    "src/utils/companyConstants.js"
    "src/utils/offerHelpers.js"
    "src/utils/deviceHelpers.js"
)

for file in "${utility_files[@]}"; do
    if [ -f "$file" ] && [ ! -s "$file" ]; then
        echo "  - Removing empty utility: $file"
        rm "$file"
    fi
done

# Remove unused context files
echo "🔄 Checking context files..."
if [ -f "src/contexts/CompanyContext.js" ] && [ ! -s "src/contexts/CompanyContext.js" ]; then
    echo "  - Removing empty context file"
    rm "src/contexts/CompanyContext.js"
fi

# Clean up any node_modules cache if needed
echo "📦 Cleaning package cache..."
if [ -d "node_modules/.cache" ]; then
    rm -rf "node_modules/.cache"
fi

# Clean up Next.js cache
if [ -d ".next" ]; then
    echo "  - Clearing Next.js build cache"
    rm -rf ".next"
fi

echo ""
echo "✅ Cleanup completed!"
echo ""
echo "📋 Summary of cleanup:"
echo "   - Removed temporary and backup files"
echo "   - Removed empty directories"
echo "   - Removed empty component files"
echo "   - Removed empty API routes"
echo "   - Cleared build caches"
echo ""
echo "🚀 Your project is now clean and ready for the new UI!"
