import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return handleWebhook(req, res);
    default:
      break;
  }
};

const handleWebhook = (req: NextApiRequest, res: NextApiResponse) => {
  const event = req.body;
  switch (event.type) {
    case 'product.created':
      res.status(201);
      console.log('Webhook: Se creo un nuevo precio ');
      return res.json({ message: 'Webhook: Se creo un nuevo precio ' });
    default:
      break;
  }
}