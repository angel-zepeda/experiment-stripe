import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';
import { v4 } from 'uuid';

const uuid = v4();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return createDonation(req, res);
    default:
      break;
  }
};

const createDonation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, customerId } = req.body;
  try {
    const stripeAmount = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      customer: customerId,
      metadata: {
        order_id: uuid
      }
    });
    return res.json({ message: 'Success', data: stripeAmount });
  } catch (err) {
    res.status(500);
    console.error('error', err);
    return res.json({ error: err.message });
  }
};