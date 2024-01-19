import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/src/lib/db/authOptions";
import { redirect } from "next/navigation";
import LoginForm from "@/src/components/forms/LoginForm";
import Link from "next/link";

export default async function AdminLogin() {
  const session = await getServerSession(authOptions)
  
  if(session && session.user.role){
    redirect("/admin/dashboard")
  }

  return (
    <main
    className=" m-auto w-full h-screen flex"
    >
      <div className="absolute w-2/4 h-full left-0">
        <Image 
        src="/admin-assets/admin-login.jpg"
        alt="admin login"
        className="object-cover"
        fill
        />
      </div>
      <aside
      className="w-2/4 h-screen max-h-screen relative"
      >
        
      </aside>
      <div 
      className="w-2/4 h-full grid place-content-center p-4"
      >
        <h1
          className='text-3xl font-semibold mb-1'
          >
          Login
        </h1>
        <Link 
        href="/"
        className='underline'
        >
          Forgot your Password?
        </Link>

        <div
        className="grid place-content-center"
        >
          <div
          className="max-w-[550px]"
          >
            <LoginForm redirect={"/admin/dashboard"}/>
          </div>
        </div>
      </div>
    </main>
  )
}
