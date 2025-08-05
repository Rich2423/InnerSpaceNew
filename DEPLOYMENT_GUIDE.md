# InnerSpace Beta Deployment Guide

## 🚀 Quick Start for Beta Testing

### Step 1: Set Up Supabase (Required for Beta)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/login and create a new project
   - Note your project URL and anon key

2. **Configure Environment Variables**
   - Create `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Update Supabase Client**
   - The app will automatically use real Supabase when env vars are set
   - Remove mock system by commenting out the mock import in `src/lib/supabase.ts`

### Step 2: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for beta testing"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

### Step 3: Alternative Deployment Options

#### Option A: Netlify
- Connect GitHub repo to Netlify
- Add environment variables in Netlify dashboard
- Deploy automatically

#### Option B: Railway
- Connect GitHub repo to Railway
- Add environment variables
- Deploy automatically

### Step 4: Configure Domain (Optional)
- Add custom domain in your hosting platform
- Set up SSL certificate (automatic with Vercel/Netlify)

## 📋 Pre-Beta Checklist

### ✅ Technical Setup
- [ ] Supabase project created and configured
- [ ] Environment variables set up
- [ ] App deployed to hosting platform
- [ ] All features tested on live deployment
- [ ] Authentication working with real Supabase
- [ ] Data persistence working correctly

### ✅ User Experience
- [ ] Navigation works on all pages
- [ ] Authentication flow smooth
- [ ] Journal entries save properly
- [ ] Progress tracking accurate
- [ ] Wellness activities functional
- [ ] Data export/import working

### ✅ Beta Testing Setup
- [ ] Create feedback collection system
- [ ] Set up user onboarding flow
- [ ] Prepare bug reporting process
- [ ] Create user testing scenarios

## 🧪 Beta Testing Plan

### Phase 1: Internal Testing (1-2 days)
- Test all features on live deployment
- Verify authentication works
- Check data persistence
- Test on different devices/browsers

### Phase 2: Small Group Testing (1 week)
- Share with 5-10 trusted users
- Collect initial feedback
- Fix critical bugs
- Refine user experience

### Phase 3: Expanded Beta (2-4 weeks)
- Open to larger group (20-50 users)
- Monitor usage patterns
- Collect detailed feedback
- Iterate based on user input

## 📊 Feedback Collection Strategy

### 1. In-App Feedback
- Add feedback button in app
- Simple rating system
- Quick bug report form

### 2. External Tools
- Google Forms for detailed feedback
- Discord/Slack for real-time support
- Email for longer feedback

### 3. Analytics (Optional)
- Google Analytics for usage patterns
- Hotjar for user behavior
- Custom event tracking

## 🔧 Quick Deployment Commands

```bash
# 1. Set up environment variables
echo "NEXT_PUBLIC_SUPABASE_URL=your_url" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" >> .env.local

# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Deploy to Vercel (if using Vercel CLI)
vercel --prod
```

## 🎯 Beta Launch Checklist

### Before Sharing:
- [ ] App deployed and accessible
- [ ] Authentication working
- [ ] All core features functional
- [ ] Mobile responsive design
- [ ] Error handling in place
- [ ] Loading states implemented
- [ ] User onboarding clear

### Beta Launch Day:
- [ ] Send access link to test group
- [ ] Provide clear instructions
- [ ] Set up feedback channels
- [ ] Monitor for issues
- [ ] Be ready to respond quickly

## 📈 Success Metrics

### Technical Metrics:
- App load time < 3 seconds
- Authentication success rate > 95%
- Data save success rate > 99%
- Error rate < 1%

### User Experience Metrics:
- User retention after first week
- Feature adoption rates
- User satisfaction scores
- Bug report frequency

## 🚨 Emergency Procedures

### If Critical Issues Found:
1. Immediately disable affected features
2. Communicate with beta users
3. Deploy hotfix within 24 hours
4. Provide alternative solutions

### Rollback Plan:
- Keep previous deployment as backup
- Document all changes made
- Have quick rollback procedure ready

## 📞 Support Setup

### For Beta Users:
- Create support email/contact
- Set up FAQ document
- Prepare common issue solutions
- Establish response time expectations

### For You:
- Monitor app performance
- Check error logs regularly
- Respond to feedback promptly
- Document all issues and solutions

---

**Ready to launch your beta! 🚀**

The app is feature-complete and ready for real users. Follow this guide to get it deployed and start collecting valuable feedback from your test group. 