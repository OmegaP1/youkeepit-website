#!/bin/bash

# Company Admin Panel Cleanup Script
# This script removes unused files and folders from the project

echo "🧹 Starting Company Admin Panel Cleanup..."
echo "======================================"

# Create backup directory
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Remove unused component files that are empty or placeholders
echo "🎨 Removing unused component files..."
unused_components=(
    "src/app/company/components/employees/EmployeeTable.js"
    "src/app/company/components/employees/EmployeeForm.js"
    "src/app/company/components/employees/EmployeeFilters.js"
    "src/app/company/components/employees/EmployeesManager.js"
    "src/app/company/components/devices/DeviceTable.js"
    "src/app/company/components/devices/DeviceForm.js"
    "src/app/company/components/devices/DeviceFilters.js"
    "src/app/company/components/devices/DevicesManager.js"
    "src/app/company/components/transactions/TransactionTable.js"
    "src/app/company/components/transactions/TransactionCard.js"
    "src/app/company/components/transactions/TransactionFilters.js"
    "src/app/company/components/transactions/TransactionsManager.js"
    "src/app/company/components/reports/RevenueChart.js"
    "src/app/company/components/reports/OfferStats.js"
    "src/app/company/components/reports/ComplianceReport.js"
    "src/app/company/components/reports/ReportsManager.js"
    "src/app/company/components/settings/CompanyProfile.js"
    "src/app/company/components/settings/TeamManagement.js"
    "src/app/company/components/settings/IntegrationSettings.js"
)

for file in "${unused_components[@]}"; do
    if [ -f "$file" ]; then
        echo "  📁 Backing up and removing: $file"
        # Create directory structure in backup
        backup_path="$BACKUP_DIR/$(dirname "$file")"
        mkdir -p "$backup_path"
        cp "$file" "$BACKUP_DIR/$file" 2>/dev/null
        rm "$file"
    fi
done

# Remove unused API route files
echo "🌐 Removing unused API routes..."
unused_api_routes=(
    "src/app/api/company/employees/route.js"
    "src/app/api/company/devices/route.js"
    "src/app/api/company/transactions/route.js"
    "src/app/api/company/reports/route.js"
)

for route in "${unused_api_routes[@]}"; do
    if [ -f "$route" ]; then
        echo "  🔗 Backing up and removing: $route"
        backup_path="$BACKUP_DIR/$(dirname "$route")"
        mkdir -p "$backup_path"
        cp "$route" "$BACKUP_DIR/$route" 2>/dev/null
        rm "$route"
    fi
done

# Remove empty directories
echo "📂 Removing empty directories..."
find src/app/company/components -type d -empty -delete 2>/dev/null
find src/app/api/company -type d -empty -delete 2>/dev/null

# Remove the old combined UI components file if it exists with multiple components
if [ -f "src/app/company/components/ui/LoadingScreen.js" ]; then
    if grep -q "MessageAlert\|StatCard\|OfferStatusBadge" "src/app/company/components/ui/LoadingScreen.js"; then
        echo "📁 Backing up and removing old combined UI components file..."
        backup_path="$BACKUP_DIR/src/app/company/components/ui"
        mkdir -p "$backup_path"
        cp "src/app/company/components/ui/LoadingScreen.js" "$backup_path/" 2>/dev/null
        rm "src/app/company/components/ui/LoadingScreen.js"
    fi
fi

# Remove duplicate or temporary files
echo "🗑️  Removing temporary files..."
find src/app/company -name "*.temp" -delete 2>/dev/null
find src/app/company -name "*.bak" -delete 2>/dev/null
find src/app/company -name "*~" -delete 2>/dev/null

# Remove old company dashboard if it exists in wrong location
if [ -f "src/components/company/CompanyDashboard.js" ]; then
    echo "📁 Backing up and removing old dashboard location..."
    backup_path="$BACKUP_DIR/src/components/company"
    mkdir -p "$backup_path"
    cp "src/components/company/CompanyDashboard.js" "$backup_path/" 2>/dev/null
    rm "src/components/company/CompanyDashboard.js"
    rmdir "src/components/company" 2>/dev/null
    rmdir "src/components" 2>/dev/null
fi

# Clean up build caches
echo "📦 Cleaning build caches..."
if [ -d ".next" ]; then
    echo "  - Clearing Next.js build cache"
    rm -rf ".next"
fi

if [ -d "node_modules/.cache" ]; then
    echo "  - Clearing Node modules cache"
    rm -rf "node_modules/.cache"
fi

echo ""
echo "✅ Cleanup completed!"
echo "===================="
echo ""
echo "📋 Summary:"
echo "   - Removed unused component files"
echo "   - Removed unused API routes"
echo "   - Removed empty directories"
echo "   - Removed temporary files"
echo "   - Cleared build caches"
echo "   - Created backup in: $BACKUP_DIR"
echo ""
echo "🔧 Next Steps:"
echo "   1. Run the updated OffersManager component"
echo "   2. Test the Create New Offer modal functionality"
echo "   3. Remove backup directory if everything works: rm -rf $BACKUP_DIR"
echo ""
echo "🚀 Your Company admin panel is now clean and ready!"