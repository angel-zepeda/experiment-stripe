import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getAllPlans(req, res);
    case 'POST':
      return createPlan(req, res);
    default:
      break;
  }
};

const getAllPlans = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit } = req.query;
  try {
    const { data } = await stripe.plans.list({ limit: parseInt(limit[0]) });
    res.status(200);
    return res.json({ plans: [...data] });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

const createPlan = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, interval, product } = req.body;
  try {
    const plan = await stripe.plans.create({
      amount,
      currency: 'usd',
      interval,
      product
    });
    res.status(201);
    return res.json({ plan, message: 'Plan created' });
  } catch (error) {
    console.log(error.message);
    res.status(500);
    return res.json({ error: error.message });
  }
};
