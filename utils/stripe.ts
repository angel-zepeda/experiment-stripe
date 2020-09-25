import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

export const stripe = new Stripe('sk_test_hXFoNLZDusCqpkxxIX8HBHE400mixX2KfE', {
  apiVersion: '2020-08-27'
});

export const stripePromise = loadStripe('pk_live_BEmo6Ye1B1y7xLOZF9dmAEMo001HAgmz8j');

export const createSubscription = async (priceId: string) => {
  const stripe = await stripePromise;
  try {
    await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });
  } catch (error) {
    console.log(error);
  }
}