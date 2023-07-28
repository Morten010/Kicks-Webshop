import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../../api/auth/[...nextauth]/route";
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
    className="max-w-screen-xl m-auto w-full h-screen flex"
    >
      <aside
      className="w-2/4 h-full relative"
      >
        <Image 
        src="/admin-assets/admin-login.jpg"
        alt="admin login"
        className="object-cover"
        fill
        />
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

        <LoginForm redirect={"/admin/dashboard"}/>
      </div>
    </main>
  )
}
