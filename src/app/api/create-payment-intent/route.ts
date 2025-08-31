import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';



export async function POST(request: NextRequest) {
  try {
    // Debug: Check if secret key is loaded
    console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY ? 'Loaded' : 'Not loaded');
    
    // Use environment variable for Stripe key
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      return NextResponse.json(
        { error: 'Stripe configuration missing' },
        { status: 500 }
      );
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2025-07-30.basil',
    });
    
    const { amount } = await request.json();

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        purpose: 'donation',
        app: 'innerspace',
      },
      description: `InnerSpace Donation - $${amount}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 