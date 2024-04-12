import { formatPrice } from '@/src/app/utils/formatPrice';
import { db } from '@/src/lib/db';


export default async function DashBoard() {

  const data = await db.order.findMany({
    where: {
      orderStatus: "Paid"
    }
  })

  let total = 0;

  data.map(order => {
    total += order.total;
  })
  
  return (
    <div>
      <h1
      className='text-2xl font-bold'
      >
        Dashboard
      </h1>
      <div
      className='border bg-white p-3 rounded-xl w-52'
      >
        <h2
        className='text-xl font-bold'
        >
          Total sales:
        </h2>
        <p
        className='text-green-600 font-bold text-xl'
        >
          {formatPrice(total)}
        </p>
      </div>
    </div>
  )
}
