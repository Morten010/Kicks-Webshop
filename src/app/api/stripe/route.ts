import { NextApiResponse, NextApiRequest } from 'next'
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
    typescript: true,
  })

export async function POST(req: NextApiRequest, res: NextApiResponse, next) {
    if (req.method === 'POST') {
        try {
            console.log(req.body);
            
          // Create Checkout Sessions from body params.
          const params = {
            submit_type: "pay",
            mode: "payment",
            PaymentMethod: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {shipping_rate: "shr_1Nb8plGJ42b0MBo2QKyaae6M"},
                {shipping_rate: "shr_1Nb8qpGJ42b0MBo2Rl6cYZ2o"},
            ],
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          }
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (error: any) {
            res.status(500).json({statusCode: 500, message: error.message})
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}