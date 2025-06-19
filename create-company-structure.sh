#!/bin/bash

# Script to create Company Admin Panel file structure for KeepMyKit
# Run this script from your project root directory

echo "🏗️  Creating Company Admin Panel Structure..."

# Create main company directory structure
mkdir -p src/app/company
mkdir -p src/app/company/components/layout
mkdir -p src/app/company/components/ui
mkdir -p src/app/company/components/dashboard
mkdir -p src/app/company/components/offers
mkdir -p src/app/company/components/employees
mkdir -p src/app/company/components/devices
mkdir -p src/app/company/components/transactions
mkdir -p src/app/company/components/reports
mkdir -p src/app/company/components/settings
mkdir -p src/app/company/components/shared

# Create route directories
mkdir -p src/app/company/dashboard
mkdir -p src/app/company/offers
mkdir -p src/app/company/offers/create
mkdir -p src/app/company/offers/\[id\]
mkdir -p src/app/company/offers/\[id\]/edit
mkdir -p src/app/company/offers/components
mkdir -p src/app/company/employees
mkdir -p src/app/company/employees/\[id\]
mkdir -p src/app/company/employees/components
mkdir -p src/app/company/devices
mkdir -p src/app/company/devices/\[id\]
mkdir -p src/app/company/devices/components
mkdir -p src/app/company/transactions
mkdir -p src/app/company/transactions/\[id\]
mkdir -p src/app/company/transactions/components
mkdir -p src/app/company/reports
mkdir -p src/app/company/reports/components
mkdir -p src/app/company/settings
mkdir -p src/app/company/settings/components

# Create API routes
mkdir -p src/app/api/company/offers
mkdir -p src/app/api/company/employees
mkdir -p src/app/api/company/devices
mkdir -p src/app/api/company/transactions
mkdir -p src/app/api/company/reports
mkdir -p src/app/api/company/settings

# Create main component directories
mkdir -p src/components/company

# Create hooks and contexts
mkdir -p src/hooks
mkdir -p src/contexts

# Create utility directories
mkdir -p src/utils

echo "📁 Creating main layout files..."

# Main company layout and page files
touch src/app/company/layout.js
touch src/app/company/page.js
touch src/app/company/loading.js

# Layout components
touch src/app/company/components/layout/CompanyLayout.js
touch src/app/company/components/layout/CompanyHeader.js
touch src/app/company/components/layout/CompanySidebar.js

echo "🎨 Creating UI components..."

# UI components
touch src/app/company/components/ui/LoadingScreen.js
touch src/app/company/components/ui/MessageAlert.js
touch src/app/company/components/ui/StatCard.js
touch src/app/company/components/ui/OfferStatusBadge.js
touch src/app/company/components/ui/ActionButton.js

echo "📊 Creating dashboard components..."

# Dashboard components
touch src/app/company/components/dashboard/DashboardOverview.js
touch src/app/company/components/dashboard/DashboardStats.js
touch src/app/company/components/dashboard/RecentOffers.js
touch src/app/company/components/dashboard/PendingActions.js
touch src/app/company/components/dashboard/QuickActions.js

echo "🛍️ Creating offers components..."

# Offers components
touch src/app/company/components/offers/OffersManager.js
touch src/app/company/components/offers/CreateOfferWizard.js
touch src/app/company/components/offers/OfferPreview.js
touch src/app/company/components/offers/DeviceSelector.js
touch src/app/company/components/offers/PricingCalculator.js

echo "👥 Creating employee components..."

# Employee components
touch src/app/company/components/employees/EmployeesManager.js
touch src/app/company/components/employees/EmployeeTable.js
touch src/app/company/components/employees/EmployeeForm.js
touch src/app/company/components/employees/EmployeeFilters.js

echo "💻 Creating device components..."

# Device components
touch src/app/company/components/devices/DevicesManager.js
touch src/app/company/components/devices/DeviceTable.js
touch src/app/company/components/devices/DeviceForm.js
touch src/app/company/components/devices/DeviceFilters.js

echo "💳 Creating transaction components..."

# Transaction components
touch src/app/company/components/transactions/TransactionsManager.js
touch src/app/company/components/transactions/TransactionTable.js
touch src/app/company/components/transactions/TransactionCard.js
touch src/app/company/components/transactions/TransactionFilters.js

echo "📈 Creating report components..."

# Report components
touch src/app/company/components/reports/ReportsManager.js
touch src/app/company/components/reports/RevenueChart.js
touch src/app/company/components/reports/OfferStats.js
touch src/app/company/components/reports/ComplianceReport.js

echo "⚙️ Creating settings components..."

# Settings components
touch src/app/company/components/settings/SettingsManager.js
touch src/app/company/components/settings/CompanyProfile.js
touch src/app/company/components/settings/TeamManagement.js
touch src/app/company/components/settings/IntegrationSettings.js

echo "🔧 Creating shared components..."

# Shared components
touch src/app/company/components/shared/DataTable.js
touch src/app/company/components/shared/SearchFilter.js
touch src/app/company/components/shared/DatePicker.js
touch src/app/company/components/shared/ExportButton.js

echo "📄 Creating route pages..."

# Route pages
touch src/app/company/dashboard/page.js
touch src/app/company/offers/page.js
touch src/app/company/offers/create/page.js
touch src/app/company/offers/\[id\]/page.js
touch src/app/company/offers/\[id\]/edit/page.js
touch src/app/company/employees/page.js
touch src/app/company/employees/\[id\]/page.js
touch src/app/company/devices/page.js
touch src/app/company/devices/\[id\]/page.js
touch src/app/company/transactions/page.js
touch src/app/company/transactions/\[id\]/page.js
touch src/app/company/reports/page.js
touch src/app/company/settings/page.js

echo "🔗 Creating offer components..."

# Offer specific components
touch src/app/company/offers/components/OfferTable.js
touch src/app/company/offers/components/OfferForm.js
touch src/app/company/offers/components/OfferFilters.js
touch src/app/company/offers/components/OfferCard.js

echo "👤 Creating employee components..."

# Employee specific components  
touch src/app/company/employees/components/EmployeeTable.js
touch src/app/company/employees/components/EmployeeForm.js
touch src/app/company/employees/components/EmployeeFilters.js

echo "💻 Creating device components..."

# Device specific components
touch src/app/company/devices/components/DeviceTable.js
touch src/app/company/devices/components/DeviceForm.js
touch src/app/company/devices/components/DeviceFilters.js

echo "💳 Creating transaction components..."

# Transaction specific components
touch src/app/company/transactions/components/TransactionTable.js
touch src/app/company/transactions/components/TransactionCard.js
touch src/app/company/transactions/components/TransactionFilters.js

echo "📊 Creating report components..."

# Report specific components
touch src/app/company/reports/components/RevenueChart.js
touch src/app/company/reports/components/OfferStats.js
touch src/app/company/reports/components/ComplianceReport.js

echo "⚙️ Creating settings components..."

# Settings specific components
touch src/app/company/settings/components/CompanyProfile.js
touch src/app/company/settings/components/TeamManagement.js
touch src/app/company/settings/components/IntegrationSettings.js

echo "🌐 Creating API routes..."

# API routes
touch src/app/api/company/offers/route.js
touch src/app/api/company/employees/route.js
touch src/app/api/company/devices/route.js
touch src/app/api/company/transactions/route.js
touch src/app/api/company/reports/route.js
touch src/app/api/company/settings/route.js

echo "🎯 Creating main components..."

# Main components
touch src/components/company/CompanyDashboard.js
touch src/components/company/CompanyAuth.js
touch src/components/company/CompanyProvider.js

echo "🪝 Creating hooks..."

# Hooks
touch src/hooks/useCompany.js
touch src/hooks/useOffers.js
touch src/hooks/useEmployees.js
touch src/hooks/useCompanyAuth.js
touch src/hooks/useMessage.js

echo "🔄 Creating contexts..."

# Contexts
touch src/contexts/CompanyContext.js

echo "🛠️ Creating utilities..."

# Utilities
touch src/utils/companyConstants.js
touch src/utils/offerHelpers.js
touch src/utils/deviceHelpers.js

echo "✅ Company Admin Panel structure created successfully!"
echo ""
echo "📁 Created directories:"
echo "   - src/app/company/ (main app routes)"
echo "   - src/app/company/components/ (component library)" 
echo "   - src/app/api/company/ (API endpoints)"
echo "   - src/components/company/ (main components)"
echo "   - src/hooks/ (custom hooks)"
echo "   - src/contexts/ (React contexts)"
echo "   - src/utils/ (utility functions)"
echo ""
echo "📝 Created files:"
echo "   - Layout components (header, sidebar, main layout)"
echo "   - UI components (cards, badges, alerts, loading)"
echo "   - Feature managers (offers, employees, devices, etc.)"
echo "   - Route pages for each section"
echo "   - API route handlers"
echo "   - Hooks and utilities"
echo ""
echo "🚀 Next steps:"
echo "   1. Copy the component code from the artifacts into these files"
echo "   2. Update import paths as needed"
echo "   3. Connect to your database/API"
echo "   4. Customize styling and branding"
echo ""
echo "💡 File structure follows the same pattern as your existing admin panel!"