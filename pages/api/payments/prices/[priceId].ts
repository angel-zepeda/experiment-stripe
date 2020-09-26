import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getProductById(req, res);
    default:
      break;
  }
};

const getProductById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { priceId } = req.query;
  try {
    const price = await stripe.prices.retrieve(`${priceId}`, { expand: ['product'] });
    res.status(200);
    return res.json({ price, message: 'Get price by id success' });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};
