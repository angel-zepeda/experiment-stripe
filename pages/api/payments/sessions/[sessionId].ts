import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getSessionById(req, res);
    default:
      break;
  }
};

const getSessionById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId as string);
  res.status(200);
  return res.json({data: session})
};
