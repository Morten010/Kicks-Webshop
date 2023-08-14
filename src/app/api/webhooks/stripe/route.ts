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
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded);
      // Then define and call a function to handle the event payment_intent.succeeded
      // @ts-ignore
      const ship = paymentIntentSucceeded.shipping.address
      const createAddress = await db.address.create({
        data: {
          city: ship.city,
          country: ship.country,
          line1: ship.line1,
          line2: ship.line2,
          postalcode: ship.postalcode,
          state: ship.state
        }
      })

      const updateOrder = await db.order.update({
        where: {
          // @ts-ignore
          id: paymentIntentSucceeded.id
        },
        data: {
          // @ts-ignore
          addressId: createAddress.id,
          orderStatus: "Paid",
          // @ts-ignore
          email: paymentIntentSucceeded.receipt_email,
          // @ts-ignore
          name: paymentIntentSucceeded.shipping.name,
          // @ts-ignore
        }
      })

      console.log("ORDER UPDATED: ", updateOrder);

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response()
}
