import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

export const stripe = new Stripe('sk_test_hXFoNLZDusCqpkxxIX8HBHE400mixX2KfE', {
  apiVersion: '2020-08-27'
});

export const stripePromise = loadStripe('pk_test_i0VJrkb1Dseh0fTIu903sis7001a5I25Vd');

export const createSubscription = async (priceId: string) => {
  const stripe = await stripePromise;
  stripe
    .redirectToCheckout({
      lineItems: [
        {
          price: 'price_1HWUbZFPKxn5Y7HWXzYmlaS5',
          quantity: 1
        }
      ],
      mode: 'subscription',
      successUrl: 'https://experiment-stripe.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'https://example.com/cancel',
    })
    .then((result) => {
      console.log('Aqui se va a hacer el FOLLOW', result);
    });
};
