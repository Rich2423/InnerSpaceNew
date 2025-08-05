#!/bin/bash

# InnerSpace Beta Deployment Script
echo "🚀 Starting InnerSpace Beta Deployment..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your Supabase credentials:"
    echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ready for beta"
else
    echo "📝 Committing changes..."
    git add .
    git commit -m "Update for beta deployment"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy to Vercel:"
echo "   - Go to vercel.com"
echo "   - Connect your GitHub repo"
echo "   - Add environment variables"
echo "   - Deploy!"
echo ""
echo "3. Or deploy to Netlify:"
echo "   - Go to netlify.com"
echo "   - Connect your GitHub repo"
echo "   - Add environment variables"
echo "   - Deploy!"
echo ""
echo "4. Test the deployed app thoroughly"
echo "5. Share with your beta test group"
echo ""
echo "📋 Don't forget to:"
echo "- Test authentication on live deployment"
echo "- Verify all features work correctly"
echo "- Check mobile responsiveness"
echo "- Set up feedback collection"
echo ""
echo "Good luck with your beta launch! 🚀" 