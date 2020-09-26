import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

export const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export const createSubscription = async (priceId: string) => {
  const stripe = await stripePromise;
  try {
    await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel'
    });
  } catch (error) {
    console.log(error);
  }
};
