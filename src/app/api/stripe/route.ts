import { db } from '@/src/lib/db';
import { CartProduct } from '@/types';
import Stripe from 'stripe';
import { headers } from 'next/headers'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
    typescript: true,
  })

export async function POST(req: Request) {
    const headersList = headers()
    const body = await req.json()
    console.log(req.headers.get("origin"));
    try {
        // Create Checkout Sessions from body params.
        const productsPromises = body.map(async (p: CartProduct) => {
            const img = p.productImage[0].fileUrl;

            const product = await db.product.findUnique({
                where: {
                    id: p.id,
                },
            })
            
            return {
                price_data: { 
                  currency: 'usd',
                  product_data: { 
                    name: `${p.name} - size ${p.size}`,
                    images: [img],
                  },
                  unit_amount: product?.price
                },
                quantity: p.amount
            }        
        })

        const products = await Promise.all(productsPromises)

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {shipping_rate: "shr_1Nb8plGJ42b0MBo2QKyaae6M"},
                {shipping_rate: "shr_1Nb8qpGJ42b0MBo2Rl6cYZ2o"},
            ],
            line_items: products,
            success_url: `${req.headers.get("origin")}/cart/success?success=true`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        }
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params as any);

        return new Response(JSON.stringify(session), {status: 200})
    } catch (err: any) {
        console.log(err.message);
        return new Response(err.statusCode || 500, {status: err.statusCode || 500,});
    }
}

// If no default handler is set, it will redirect to 404 page
export function Default() {
    // Handle requests that are not GET or POST requests
    return new Response('Method not allowed!', { status: 405 });
}