import { db } from '@/src/lib/db';
import { CartProduct } from '@/types';
import Stripe from 'stripe';
import { headers } from 'next/headers'
import { stripe_countries } from '@/src/constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/db/authOptions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
    typescript: true,
  })

  type StripeBodyProps = {
    cart: CartProduct[],
    userId: string | undefined
  }

export async function POST(req: Request) {
    const headersList = headers()
    const body: StripeBodyProps = await req.json()
    try {
        //get session user
        const user = await getServerSession(authOptions)
        
        //create order for checkout
        const cart = body.cart
        const newCart = cart.map(c => {
            return {
                name: c.name ,
                quantity: c.amount,
                size: c.size,
            }
        })
        const userId = user?.user.id ? user?.user.id : undefined
        let total = 0
        cart.map(c => {
            total = total + c.price
        })
        const newOrder = await db.order.create({
            data: {
                userId: userId,
                total: total,
                orderStatus: "Processing",
            }
        })

        //create customer
        const customer = await stripe.customers.create({
            metadata: {
                orderId: newOrder.id
            }
        })

        // Create products to input to cart
        const productsPromises = cart.map((p: CartProduct) => {
            const img = p.productImage[0].fileUrl;
            
            return {
                price_data: { 
                  currency: 'usd',
                  product_data: { 
                    name: `${p.name} - size ${p.size}`,
                    images: [img],
                  },
                  unit_amount: p.price
                },
                quantity: p.amount
            }        
        })
        // resolve promises in productPromises
        const products = await Promise.all(productsPromises)
        console.log(products)
        

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            mode: "payment",
            shipping_address_collection: {
                allowed_countries: stripe_countries,
            },
            phone_number_collection: {
                enabled: true
            },
            metadata: {
                user: user?.user.email as string
            },
            customer: customer.id,
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {shipping_rate: "shr_1Nb8plGJ42b0MBo2QKyaae6M"},
                {shipping_rate: "shr_1Nb8qpGJ42b0MBo2Rl6cYZ2o"},
            ],
            line_items: products,
            success_url: `${req.headers.get("origin")}/cart/success?success=true`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        });   

        return new Response(JSON.stringify(session), {status: 200})
    } catch (err: any) {
        console.log("err message: ", err.message);
        return new Response(err.statusCode || 500, {status: err.statusCode || 500,});
    }
}