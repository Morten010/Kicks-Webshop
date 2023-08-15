import { db } from '@/src/lib/db';
import { CartProduct } from '@/types';
import Stripe from 'stripe';
import { headers } from 'next/headers'
import { stripe_countries } from '@/src/constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

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
        // Create Checkout Sessions from body params.
        const productsPromises = body.cart.map(async (p: CartProduct) => {
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
        const user = await getServerSession(authOptions)

        
        const customer = await stripe.customers.create({
            metadata: {
                cart: JSON.stringify(body.cart.map((cartItem: CartProduct) => {
                    return {
                        id: cartItem.id,
                        size: cartItem.size ,
                        quantity: cartItem.amount
                    }
                })),
                userId: JSON.stringify(body.userId)
            }
        })

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
        
        // type OrderProductsModel = {
        //     name: string
        //     quantity: number
        //     size: number
        // }[]
        // const orderedProducts: OrderProductsModel = body.cart.map((p: CartProduct) =>  {
        //     return {
        //         name: p.name, 
        //         quantity: p.amount,
        //         size: p.size
        //     }
        // })
        
        // const newOrder = await db.order.create({
        //     data: {
        //         addressId: 1,
        //         email: "itismorten@outlook.com",
        //         name: "jordan belfort",
        //         userId: "clkiqtwow0000vj2ogbe7f9if",
        //         stripePaymentIntentId: session.id as string,
        //         stripePaymentIntentStatus: session.payment_status as string,
        //         total: session.amount_total!,
        //         orderStatus: session.payment_status as string,
        //         checkoutUrl: session.url,
        //         orderItems: {
        //             createMany: {
        //                 data: [
        //                     ...orderedProducts
        //                 ]
        //             }
        //         },
        //     }
        // })
        
        // console.log("New Order", newOrder);
        

        return new Response(JSON.stringify(session), {status: 200})
    } catch (err: any) {
        console.log("err message: ", err.message);
        return new Response(err.statusCode || 500, {status: err.statusCode || 500,});
    }
}