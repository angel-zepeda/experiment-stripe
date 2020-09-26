import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    default:
      break;
  }
};

const getAllProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit } = req.query;
  try {
    const { data } = await stripe.products.list({ limit: limit ? parseInt(limit[0]) : undefined });
    res.status(200);
    return res.json({ products: [...data] });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product } = req.body;
  try {
    const newProduct = await stripe.products.create({
      ...product
    });
    res.status(201);
    return res.json({ customer: newProduct, message: 'Product created' });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};
