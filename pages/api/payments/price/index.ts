import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return createPrice(req, res);
    case 'GET':
      return getAllPrices(req, res);
    default:
      break;
  }
};

const getAllPrices = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prices = await stripe.prices.list({ expand: ['data.product'] });
    res.status(200);
    return res.json({ prices });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

const createPrice = async (req: NextApiRequest, res: NextApiResponse) => {
  const { productId, unitAmount, interval } = req.body;
  try {
    const price = await stripe.prices.create({
      unit_amount: unitAmount,
      currency: 'usd',
      recurring: { interval },
      product: productId
    });

    res.status(201);
    return res.json({ price, message: 'Price created' });
  } catch (error) {
    res.status(500);
    res.json({ error: error.message });
  }
};
