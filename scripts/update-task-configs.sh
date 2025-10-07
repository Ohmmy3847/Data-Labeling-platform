#!/bin/bash

# Script to update all task pages to use TASK_CONFIGS

echo "🔧 Updating task pages to use TASK_CONFIGS..."

# Array of task IDs and their current hardcoded values
declare -A tasks=(
  ["t1"]="0.12"
  ["t2"]="0.15"
  ["t3"]="0.25"
  ["t10"]="0.50"
  ["t11"]="0.25"
  ["t12"]="0.30"
)

for task_id in "${!tasks[@]}"; do
  file="src/app/mobile/labeler/tasks/$task_id/page.tsx"
  
  if [ -f "$file" ]; then
    echo "📝 Processing $file..."
    
    # Add TASK_CONFIGS import if not exists
    if ! grep -q "import { TASK_CONFIGS }" "$file"; then
      # Add import after BottomNavigation import
      sed -i '' '/import BottomNavigation/a\
import { TASK_CONFIGS } from '\''@/config/taskConfig'\'';
' "$file"
      echo "  ✅ Added TASK_CONFIGS import"
    fi
    
    # Replace hardcoded rate values with TASK_CONFIGS
    rate="${tasks[$task_id]}"
    sed -i '' "s/${rate}/TASK_CONFIGS.${task_id}.rate/g" "$file"
    echo "  ✅ Replaced rate values"
    
  else
    echo "⚠️  File not found: $file"
  fi
done

echo "✨ Done! All task pages updated."
