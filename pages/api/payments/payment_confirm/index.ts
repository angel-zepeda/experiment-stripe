import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return confirmPaymentIntent(req, res);
    default:
      break;
  }
};

const confirmPaymentIntent = async (req: NextApiRequest, res: NextApiResponse) => {
  let { paymentIntentId, paymentMethodId } = req.query;
  const paymentIntent: string = paymentIntentId as string;
  const payment_method: string = paymentMethodId as string;
  try {
    const confirmPayment = await stripe.paymentIntents.confirm(paymentIntent, {
      payment_method
    });
    res.status(201);
    res.json({ data: confirmPayment });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};
