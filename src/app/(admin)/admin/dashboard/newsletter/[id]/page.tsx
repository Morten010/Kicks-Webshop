import { FC } from 'react'
import { Resend } from 'resend';

interface pageProps {
  params: {
    id: string
  }
}

const page: FC<pageProps> = async ({params: { id }}) => {
    const resend = new Resend(process.env.RESEND);
    
    const {data: audience} = await resend.audiences.get(id);

    
  return (
    <div>
        <div>
            <h1
            className='text-2xl font-semibold leading-3'
            >
                Audience: <br />
                <span
                className='text-lg font-normal'
                >
                    {audience?.name} 
                </span>
            </h1>
        </div>
    </div>
  )
}

export default page