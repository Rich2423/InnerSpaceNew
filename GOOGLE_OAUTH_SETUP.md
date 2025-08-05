# Google OAuth Setup Guide for InnerSpace

This guide will help you set up Google OAuth authentication for the InnerSpace application using Supabase.

## Prerequisites

1. A Supabase project with authentication enabled
2. A Google Cloud Console account
3. The InnerSpace application running locally

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

### 1.2 Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Fill in the required information:
   - App name: "InnerSpace"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `openid`
   - `email`
   - `profile`
5. Add test users (your email) if in testing mode

### 1.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set the name: "InnerSpace Web Client"
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://your-domain.com/auth/callback` (for production)
6. Copy the Client ID and Client Secret

## Step 2: Supabase Configuration

### 2.1 Enable Google Provider
1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Providers"
3. Find "Google" and click "Enable"
4. Enter the Google OAuth credentials:
   - Client ID: Your Google OAuth Client ID
   - Client Secret: Your Google OAuth Client Secret
5. Save the configuration

### 2.2 Configure Redirect URLs
1. In Supabase, go to "Authentication" > "URL Configuration"
2. Set the Site URL to your domain:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`

## Step 3: Environment Variables

Create or update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Database Schema Updates

Make sure your users table can handle Google OAuth data. The current schema should work, but you might want to add:

```sql
-- Optional: Add Google-specific fields if needed
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

## Step 5: Testing

1. Start your development server: `npm run dev`
2. Navigate to your application
3. Click "Sign In" and then "Continue with Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you should be redirected back to your app

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**
   - Check that the redirect URI in Google Cloud Console matches exactly
   - Ensure the URI is added to both Google Cloud Console and Supabase

2. **"OAuth provider not enabled" error**
   - Verify Google provider is enabled in Supabase
   - Check that Client ID and Secret are correctly entered

3. **"Redirect URI mismatch" error**
   - Ensure the redirectTo URL in the code matches your Supabase configuration
   - Check for trailing slashes or protocol mismatches

4. **Session not persisting**
   - Verify the auth callback route is working correctly
   - Check browser console for any errors

### Debug Steps:

1. Check browser console for errors
2. Verify Supabase logs in the dashboard
3. Test with a simple OAuth flow first
4. Ensure all environment variables are set correctly

## Production Deployment

When deploying to production:

1. Update Google Cloud Console redirect URIs to include your production domain
2. Update Supabase site URL and redirect URLs
3. Ensure environment variables are set in your hosting platform
4. Test the OAuth flow in production environment

## Security Considerations

1. Never commit Client Secret to version control
2. Use environment variables for all sensitive data
3. Regularly rotate OAuth credentials
4. Monitor OAuth usage in Google Cloud Console
5. Implement proper error handling for OAuth failures

## Additional Features

Once Google OAuth is working, you can enhance the user experience by:

1. **Profile Sync**: Automatically sync Google profile data (name, avatar)
2. **Account Linking**: Allow users to link multiple OAuth providers
3. **Email Verification**: Skip email verification for Google users
4. **Avatar Integration**: Use Google profile pictures as avatars

## Support

If you encounter issues:

1. Check the Supabase documentation on OAuth
2. Review Google Cloud Console logs
3. Test with the Supabase OAuth examples
4. Check the application logs for detailed error messages 