# Stripe Setup Guide for InnerSpace Donations

## 🔑 Required Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Publishable Key (Client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Stripe Secret Key (Server-side)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## 🚀 Getting Your Stripe Keys

### Step 1: Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up for a free account
3. Complete account verification

### Step 2: Get Your API Keys
1. In Stripe Dashboard, go to **Developers** → **API Keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### Step 3: Test Mode vs Live Mode
- **Test Mode**: Use for development (keys start with `pk_test_` and `sk_test_`)
- **Live Mode**: Use for production (keys start with `pk_live_` and `sk_live_`)

## 💳 Testing Donations

### Test Card Numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`

### Test Details:
- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

## 🔒 Security Notes

1. **Never commit secret keys** to version control
2. **Use environment variables** for all keys
3. **Test thoroughly** before going live
4. **Monitor transactions** in Stripe Dashboard

## 📊 Tracking Donations

In your Stripe Dashboard, you can:
- View all donations in **Payments** section
- Set up webhooks for real-time notifications
- Generate reports and analytics
- Handle refunds if needed

## 🎯 Next Steps

1. **Add environment variables** to `.env.local`
2. **Test the donation flow** with test cards
3. **Deploy to production** with live keys
4. **Set up webhooks** for donation notifications

## 💰 Pricing

- **Stripe fees**: 2.9% + 30¢ per successful transaction
- **No monthly fees** for basic usage
- **Free for first $1M** in annual volume

## 🆘 Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)
- [Stripe Community](https://community.stripe.com/) 