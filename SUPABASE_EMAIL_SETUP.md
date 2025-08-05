# Supabase Email Confirmation Setup Guide

## 🚨 Current Issue
Users are unable to verify their email addresses after signing up. This is likely due to incorrect Supabase project configuration.

## 🔧 Required Supabase Configuration

### Step 1: Access Your Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your InnerSpace project (`bwegsjtluxqnlployjlf`)

### Step 2: Configure Site URL
1. Navigate to **Authentication** → **Settings**
2. Set **Site URL** to:
   ```
   https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app
   ```

### Step 3: Configure Redirect URLs
1. In the same **Authentication** → **Settings** page
2. Add these **Redirect URLs**:
   ```
   https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app/auth/callback
   https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app
   ```

### Step 4: Enable Email Confirmations
1. In **Authentication** → **Settings**
2. Ensure **Enable email confirmations** is **ON**
3. Set **Secure email change** to **ON** (optional but recommended)

### Step 5: Configure Email Templates (Optional)
1. Go to **Authentication** → **Email Templates**
2. Click on **Confirm signup** template
3. Customize the email content to include InnerSpace branding
4. Save the template

### Step 6: Test Email Delivery
1. Go to **Authentication** → **Users**
2. Create a test user or check existing users
3. Verify that confirmation emails are being sent

## 🧪 Testing the Fix

### Test 1: Sign Up Flow
1. Go to the live site: `https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app`
2. Click **Sign In** → **Create Account**
3. Enter email, password, and username
4. Click **Sign Up**
5. Check email for confirmation link
6. Click the confirmation link
7. Should redirect to InnerSpace with success message

### Test 2: Check Console Logs
1. Open browser developer tools (F12)
2. Go to **Console** tab
3. Sign up and check for these logs:
   - `Auth callback - Session data:`
   - `Auth callback - User authenticated successfully`
   - `Auth callback - Setting session from URL params`

## 🔍 Troubleshooting

### Issue 1: Email Not Received
- Check **Spam/Junk** folder
- Verify email address is correct
- Check Supabase **Email Templates** are configured

### Issue 2: Link Doesn't Work
- Verify **Site URL** is correct in Supabase
- Check **Redirect URLs** include the callback URL
- Ensure the live URL matches exactly

### Issue 3: Redirect Loop
- Clear browser cache and cookies
- Check that callback page is working
- Verify Supabase project is the correct one

### Issue 4: Session Not Set
- Check browser console for errors
- Verify Supabase client is using correct project
- Ensure environment variables are set correctly

## 📋 Environment Variables Check

Make sure your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=https://bwegsjtluxqnlployjlf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🚀 Production Deployment

After configuring Supabase:
1. The live site will automatically use the correct settings
2. Email confirmations should work immediately
3. Users will see success messages upon confirmation

## 📞 Support

If issues persist:
1. Check Supabase project logs
2. Verify all URLs are HTTPS
3. Test with different email providers
4. Check browser console for errors

## ✅ Success Indicators

When working correctly:
- ✅ User receives confirmation email
- ✅ Email link redirects to InnerSpace
- ✅ User sees "Email confirmed successfully!" message
- ✅ User is automatically signed in
- ✅ All features are accessible 