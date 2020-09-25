import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';
import { v4 } from 'uuid';

const uuid = v4();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      const { amount } = req.body;
      try {
        const stripeAmount = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: 'mxn',
          metadata: {
            order_id: uuid
          }
        });
        return res.json({ message: 'Success', clientSecret: stripeAmount.client_secret });
      } catch (err) {
        res.status(500);
        console.error('error', err);
        return res.json({ error: err.message });
      }
    default:
      res.statusCode = 500;
      return res.json({ error: 'no se puede procesar la petición' });
  }
};
