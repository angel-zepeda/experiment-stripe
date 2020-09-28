import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

export const stripe = new Stripe('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', {
  apiVersion: '2020-08-27'
});

export const stripePromise = loadStripe('pk_live_BEmo6Ye1B1y7xLOZF9dmAEMo001HAgmz8j');

export const createSubscription = async (priceId: string) => {
  const stripe = await stripePromise;
  try {
    const result = await stripe.redirectToCheckout({
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
    if (result) {
      console.log("Aqui se va a hacer el FOLLOW", result);
    }
  } catch (error) {
    console.log(error);
  }
};
