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
  const { productId } = req.query;

  try {
    const product = await stripe.products.retrieve(productId.toString());
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(500);
    res.json({ error: error.message });
  }
};
