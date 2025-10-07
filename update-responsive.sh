#!/bin/bash

# Responsive UI Update Script
# Updates all pages to use new responsive components

echo "🚀 Starting responsive UI update..."

# Find all page.tsx files
find src/app/mobile -name "page.tsx" -type f | while read file; do
    echo "📝 Processing: $file"
    
    # Backup original
    cp "$file" "$file.backup"
    
    # Update imports (add responsive components)
    if ! grep -q "ResponsiveContainer" "$file"; then
        # Add imports after existing imports
        sed -i '' "/^import/a\\
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';\\
import ResponsiveHeader from '@/components/layout/ResponsiveHeader';\\
import ResponsivePage from '@/components/layout/ResponsivePage';
" "$file" 2>/dev/null || true
    fi
    
    echo "✅ Updated: $file"
done

echo "🎉 Responsive UI update complete!"
echo "📋 Backup files created with .backup extension"
