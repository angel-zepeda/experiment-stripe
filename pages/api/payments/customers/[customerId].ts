import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getCustomerById(req, res);
    default:
      break;
  }
};

const getCustomerById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customerId } = req.query;
  try {
    const customer = await stripe.customers.retrieve(`${customerId}`);
    return res.json({ customer });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};
