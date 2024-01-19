import { db } from '@/src/lib/db';
import { Order} from '@prisma/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/db/authOptions';
import SignoutButton from '@/src/components/profile/SignoutButton';

const initialUser : {
  id?: any;
  firstName?: any;
  lastName?: string | undefined;
  gender?: string | undefined;
  email?: string | undefined;
  role?: any;
} = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  role: ''
} 




export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user!;


  // const orders = await db.order.findMany({
  //   where: {
  //     userId: user.id
  //   },
  //   include: {
  //     orderItems: true
  //   }
  // })

  // console.log(orders);
  
  
  return (
    <div
    className='flex flex-col gap-2'
    >
      {/* profile details */}
      {user.email && <div>
        <h1
        className='text-4xl font-semibold'
        >
          Profile
        </h1>

        {/* email */}
        <div
        className='mt-4'
        >
          <h3
          className='font-semibold text-lg'
          >
            Email
          </h3>
          <p>
            {user.email}
          </p>
        </div>

        {/* first name and last name */}
        <div
        className='mt-4 flex capitalize'
        >
          <div
          className='w-1/3'
          >
            <h3
            className='font-semibold text-lg'
            >
              First Name
            </h3>
            <p>
              {user.firstName ? user.firstName : "none found"}
            </p>
          </div>
          <div
          className='w-1/3'
          >
            <h3
            className='font-semibold text-lg'
            >
              Last Name
            </h3>
            <p>
              {user.lastName ? user.lastName : "none found"}
            </p>
          </div>
          <div
          className='w-1/3'
          >
            <h3
            className='font-semibold text-lg'
            >
              gender
            </h3>
            <p>
              {user.gender ? user.gender : "None Found"}
            </p>
          </div>
        </div>

      </div>}

      <div>
        <h2
        className='font-semibold text-2xl mb-2'
        >
          orders
        </h2>
        <div>
          {/* orders here */}
        </div>
      </div>
      {/* end of profile details */}

      {/* signout button */}
      <SignoutButton />
      {/* end of signout button */}
    </div>
  )
}
