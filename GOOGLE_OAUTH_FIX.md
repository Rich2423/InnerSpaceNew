# Google OAuth Sign-In Fix Guide

## 🚨 Current Issue
Google sign-in is not working for users, which is critical for user adoption.

## 🔧 Complete Fix Process

### Step 1: Supabase Google OAuth Configuration

#### 1.1 Enable Google Provider in Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `bwegsjtluxqnlployjlf`
3. Navigate to **Authentication** → **Providers**
4. Find **Google** and click **Enable**
5. You'll need to configure Google OAuth credentials

#### 1.2 Configure Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** or **Google Identity API**
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth 2.0 Client IDs**
6. Choose **Web application**
7. Set **Authorized JavaScript origins**:
   ```
   https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app
   http://localhost:3006
   http://localhost:3000
   ```
8. Set **Authorized redirect URIs**:
   ```
   https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app/auth/callback
   http://localhost:3006/auth/callback
   http://localhost:3000/auth/callback
   ```
9. Copy the **Client ID** and **Client Secret**

#### 1.3 Configure Supabase with Google Credentials
1. Back in Supabase Dashboard
2. Go to **Authentication** → **Providers** → **Google**
3. Enter your **Client ID** and **Client Secret** from Google Cloud
4. Set **Redirect URL** to: `https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app/auth/callback`
5. Click **Save**

### Step 2: Update Supabase Site Settings

#### 2.1 Site URL Configuration
1. In Supabase Dashboard, go to **Authentication** → **Settings**
2. Set **Site URL** to: `https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app`
3. Add **Redirect URLs**:
   ```
   https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app/auth/callback
   https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app
   ```

### Step 3: Test the Configuration

#### 3.1 Development Testing
1. Start local development: `npm run dev`
2. Go to `http://localhost:3006`
3. Click **Sign In** → **Continue with Google**
4. Should redirect to Google OAuth
5. After authorization, should redirect back to InnerSpace

#### 3.2 Production Testing
1. Go to live site: `https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app`
2. Click **Sign In** → **Continue with Google**
3. Should work seamlessly

### Step 4: Common Issues and Solutions

#### Issue 1: "redirect_uri_mismatch"
**Solution:**
- Check Google Cloud Console redirect URIs
- Ensure exact match with Supabase redirect URL
- Include both HTTP and HTTPS versions for development

#### Issue 2: "Invalid client"
**Solution:**
- Verify Client ID and Secret in Supabase
- Check that Google OAuth is enabled in Supabase
- Ensure Google Cloud project is active

#### Issue 3: "Access blocked"
**Solution:**
- Check Google Cloud Console OAuth consent screen
- Ensure app is published or in testing
- Add test users if in testing mode

#### Issue 4: No redirect after Google auth
**Solution:**
- Verify Supabase Site URL is correct
- Check that auth callback page exists
- Ensure redirect URLs are properly configured

### Step 5: Environment Variables

Make sure your `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=https://bwegsjtluxqnlployjlf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 6: Code Verification

The Google OAuth code should look like this:
```typescript
const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Google OAuth error:', error);
      return { error };
    }
    
    return { error: null };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { error: err };
  }
};
```

### Step 7: Testing Checklist

#### ✅ Pre-Test Checklist:
- [ ] Google OAuth enabled in Supabase
- [ ] Google Cloud credentials configured
- [ ] Supabase Site URL set correctly
- [ ] Redirect URLs configured
- [ ] Auth callback page exists
- [ ] Environment variables set

#### ✅ Test Flow:
1. [ ] Click "Continue with Google"
2. [ ] Redirects to Google OAuth
3. [ ] User authorizes the app
4. [ ] Redirects back to InnerSpace
5. [ ] User is signed in
6. [ ] All features accessible

### Step 8: Debugging

#### Console Logs to Check:
- `🔍 Starting Google OAuth sign-in...`
- `🔍 Google OAuth response:`
- `✅ Google OAuth initiated successfully`

#### Network Tab:
- Check for OAuth requests to Google
- Verify redirect URLs in requests
- Look for any CORS errors

### Step 9: Production Deployment

After configuration:
1. Deploy to Vercel: `vercel --prod`
2. Test on live site
3. Monitor for any errors
4. Update Google Cloud redirect URIs if needed

## 🎯 Success Indicators

When working correctly:
- ✅ Google sign-in button works
- ✅ Redirects to Google OAuth
- ✅ User can authorize the app
- ✅ Redirects back to InnerSpace
- ✅ User is automatically signed in
- ✅ All features are accessible
- ✅ No console errors

## 🚀 Quick Fix Summary

1. **Enable Google OAuth** in Supabase
2. **Configure Google Cloud** credentials
3. **Update Supabase** Site URL and redirect URLs
4. **Test locally** first
5. **Deploy and test** on production
6. **Monitor** for any issues

This should resolve the Google sign-in issue completely! 