# Environment Variables Template

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Development Settings
NODE_ENV=development
```

## Important Notes:

1. **Google OAuth credentials** are configured directly in the Supabase dashboard, not in environment variables
2. **Never commit** your `.env.local` file to version control
3. **Production deployment** requires setting these variables in your hosting platform
4. **Google OAuth setup** requires configuration in both Google Cloud Console and Supabase dashboard

## Getting Supabase Credentials:

1. Go to your Supabase project dashboard
2. Navigate to "Settings" > "API"
3. Copy the "Project URL" and "anon public" key
4. Paste them in your `.env.local` file

## Security:

- Keep your environment variables secure
- Use different credentials for development and production
- Regularly rotate your Supabase keys
- Monitor your OAuth usage in Google Cloud Console 