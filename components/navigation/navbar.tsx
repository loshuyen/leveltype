import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/modeToggler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import routes from "@/constants/routes"
import { auth, signOut } from "@/auth"

export default async function NavBar() {
  const session = await auth()
  const user = session?.user
  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6">
      <Link href={routes.HOME} className="mr-6 flex items-center">
        <Image src={"/logo.png"} alt="Logo" width={28} height={28} />
        <span className="ml-2 font-semibold text-xl">LevelType</span>
      </Link>
      <div className="ml-auto flex gap-2">
        {
          user ? (
            <>
              <Avatar>
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                </AvatarFallback>
              </Avatar>
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <Button type="submit">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href={routes.SIGNIN}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={routes.SIGNUP}>Sign Up</Link>
              </Button>
            </>
          )
        }
        <ModeToggle />
      </div>
    </header>
  )
}