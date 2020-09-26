import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getPaymentMethodByCustomerId(req, res);
    case 'POST':
    default:
      break;
  }
};

const getPaymentMethodByCustomerId = async (req, res) => {
  const { customerId } = req.query;
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    res.status(200);
    return res.json({ method: paymentMethods });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};
