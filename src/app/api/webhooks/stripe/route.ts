import { db } from '@/src/lib/db'
import { stripe } from '@/src/lib/stripe'
import { headers } from 'next/headers'
import type Stripe from "stripe"

export async function POST(req: Request, res: Response) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") ?? ""

  let event: Stripe.Event
  console.log();

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 400 }
    )
  }

  // Handle The event
  switch (event.type) {
    case "checkout.session.completed": 
      

      break
    case 'payment_intent.succeeded':
      const data: any = event.data.object;
      
      //Create shipping address
      // @ts-ignore
      const ship = data.shipping.address
      console.log("SHIPPING: ", ship);
      
      const createAddress = await db.address.create({
        data: {
          city: ship.city,
          country: ship.country,
          line1: ship.line1 ,
          line2: ship.line2 ? ship.line2 === null ? undefined : ship.line2 : undefined,
          postalcode: ship.postal_code,
          state: ship.state
        }
      })

      //get customer
      const customer = await stripe.customers.retrieve(data.customer).then((customer) => {
        console.log(customer);
        return customer as any
      }).catch(err => console.log(err))
      console.log(data.amount_total);
      
      console.log(data);

      console.log(JSON.parse(customer.metadata.cart));
      
      //Create order
      const newOrder = await db.order.create({
          data: {
              addressId: 1,
              email: "itismorten@outlook.com",
              name: data.shipping.name,
              userId: JSON.parse(customer.metadata.userId),
              stripePaymentIntentId: data.id,
              stripePaymentIntentStatus: data.status,
              orderStatus: data.status,
              orderItems: {
                  createMany: {
                      data: JSON.parse(customer.metadata.cart)
                  }
              },
              total: data.amount
          }
      })
      console.log(newOrder);
      
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response()
}
