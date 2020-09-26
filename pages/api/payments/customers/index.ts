import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getAllCustomers(req, res);
    case 'POST':
      return createCustomer(req, res);
    default:
      break;
  }
};

const getAllCustomers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit } = req.query;

  try {
    const { data } = await stripe.customers.list({ limit: limit ? parseInt(limit[0]) : undefined});
    res.status(200);
    return res.json({ customers: [...data] });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

const createCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customer } = req.body;
  try {
    const newCustomer = await stripe.customers.create({
      ...customer
    });
    res.status(201);
    return res.json({ customer: newCustomer, message: 'Customer created' });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};
