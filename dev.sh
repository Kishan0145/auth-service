#!/bin/bash

# Development startup script with proper error handling
echo "🔍 Running TypeScript type check..."

# Run type check first
if ! npm run type-check; then
    echo ""
    echo "❌ TypeScript compilation errors found!"
    echo "Fix the errors above before starting the server."
    echo ""
    exit 1
fi

echo "✅ Type check passed!"
echo "🚀 Starting development server..."
echo ""

# Start the dev server
npm run dev
