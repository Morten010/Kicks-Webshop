import { db } from '@/src/lib/db'
import { stripe } from '@/src/lib/stripe'
import { cartItem } from '@prisma/client'
import { headers } from 'next/headers'
import Stripe from "stripe"

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
  const data: any = event.data.object;
  switch (event.type) {
    case "checkout.session.completed": 
      

      break
    case 'payment_intent.succeeded':
      
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
      const customer = await stripe.customers.retrieve(data.customer)
        .then((customer) => {
        console.log(customer);
        return customer as any
      }).catch(err => console.log(err));
      
      console.log(customer.metadata.orderId);

      console.log(data.phone, data.email,);
      console.log(data);
      
      const updateOrder = await db.order.update({
        where: {
          id: parseInt(customer.metadata.orderId)
        },
        data: {
          orderStatus: "Paid",
          addressId: createAddress.id,
          name: data.shipping.name,
          email: customer.email,
          // phone: customer.phone
        }
      })
      
      console.log(updateOrder);
      
      break;
    // ... handle other event types
    case "checkout.session.expired":
      const customerEx = await stripe.customers.retrieve(data.customer)
        .then((customer) => {
        return customer as any
      }).catch(err => console.log(err));

      const updateOrderEx = await db.order.delete({
        where: {
          id: parseInt(customerEx.metadata.orderId)
        }
      })   
      console.log("Deleted order: #", customerEx.metadata.orderId);
      const deleteCustomer = await stripe.customers.del(data.customer)
      console.log("Deleted customer: ", deleteCustomer.deleted);
         
      break
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response()
}
