# InnerSpace Troubleshooting Guide

## 🚨 Common Issues & Solutions

### Issue 1: Authentication Modal Not Opening
**Symptoms:** Clicking "Sign In" doesn't open the modal

**Solutions:**
1. Check browser console for JavaScript errors
2. Refresh the page
3. Clear browser cache
4. Try a different browser

**Code Check:** Verify `AuthModal` component is imported and `showAuthModal` state is working

### Issue 2: Form Validation Not Working
**Symptoms:** Empty forms submit successfully

**Solutions:**
1. Check if `required` attributes are present
2. Verify form submission is prevented on empty fields
3. Check browser console for errors

### Issue 3: User Profile Not Showing
**Symptoms:** User is logged in but profile doesn't appear

**Solutions:**
1. Check if `user` object exists in AuthContext
2. Verify `UserProfile` component is rendering
3. Check browser console for errors

### Issue 4: Anonymous Mode Not Working
**Symptoms:** Anonymous session doesn't start

**Solutions:**
1. Check Supabase configuration
2. Verify anonymous auth is enabled in Supabase
3. Check browser console for errors

### Issue 5: Data Not Persisting
**Symptoms:** Entries disappear after page refresh

**Solutions:**
1. Check localStorage for saved data
2. Verify data saving functions are working
3. Check if user is properly authenticated

## 🔧 Quick Fixes

### Reset Authentication State:
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Check Authentication Status:
```javascript
// In browser console
console.log('User:', window.supabase?.auth?.getUser());
```

### Force Logout:
```javascript
// In browser console
window.supabase?.auth?.signOut();
```

## 📊 Debug Information

### Test Panel Data:
When logged in, the test panel shows:
- **User ID:** Should be a UUID
- **Email:** Should show email or "Anonymous"
- **Username:** Should show username or "Not set"
- **Provider:** Should show "email" or "anonymous"
- **Session Active:** Should be "Yes" when logged in
- **Loading:** Should be "No" when ready

### Console Errors to Watch For:
- `NEXT_PUBLIC_SUPABASE_URL is not defined`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined`
- Authentication errors from Supabase
- React component errors

## 🛠️ Environment Setup

### Required Environment Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Configuration:
1. **Authentication > Settings:**
   - Enable email confirmations (optional)
   - Configure redirect URLs
   - Enable anonymous auth

2. **Database:**
   - Run the schema from `supabase-schema.sql`
   - Enable Row Level Security (RLS)

## 🎯 Testing Priorities

### High Priority (Must Work):
- [ ] Anonymous mode works
- [ ] Basic authentication flows
- [ ] User interface is responsive
- [ ] No critical errors

### Medium Priority (Should Work):
- [ ] Email verification
- [ ] Password reset
- [ ] Profile updates
- [ ] Data persistence

### Low Priority (Nice to Have):
- [ ] Advanced features
- [ ] Performance optimizations
- [ ] Additional customization

## 📞 Emergency Contacts

If you encounter critical issues:
1. **Check the console** for error messages
2. **Restart the development server** if needed
3. **Clear browser data** if authentication is stuck
4. **Test on different browsers** to isolate issues

## 🚀 Quick Recovery Steps

### If Authentication is Broken:
1. Clear browser data
2. Restart the dev server
3. Test anonymous mode first
4. Check environment variables

### If UI is Broken:
1. Check for JavaScript errors
2. Verify all components are imported
3. Check for missing dependencies
4. Restart the development server

### If Data is Lost:
1. Check localStorage in browser dev tools
2. Verify authentication state
3. Test data saving functionality
4. Check for console errors

## ✅ Pre-Testing Checklist

Before starting user testing:
- [ ] Development server is running
- [ ] No console errors on page load
- [ ] Authentication modal opens
- [ ] Anonymous mode works
- [ ] All navigation links work
- [ ] Test panel appears when logged in
- [ ] Mobile responsiveness works
- [ ] Error messages are clear

## 🎉 Success Indicators

The app is ready for testing when:
- ✅ All authentication flows work smoothly
- ✅ No critical console errors
- ✅ UI is responsive and intuitive
- ✅ Error handling is graceful
- ✅ Data persistence works correctly
- ✅ Privacy features are clear

Good luck with the testing! 🚀 