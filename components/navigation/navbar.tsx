import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/modeToggler"
import routes from "@/constants/routes"
import { auth } from "@/auth"
import UserMenu from "@/components/userMenu"

export default async function NavBar() {
  const session = await auth()
  const user = session?.user
  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6">
      <Link href={routes.HOME} className="mr-6 flex items-center">
        <Image src={"/logo.png"} alt="Logo" width={28} height={28} />
        <span className="ml-2 font-semibold text-xl">LevelType</span>
      </Link>
      <div className="ml-auto flex gap-5 items-center">
        {
          user ? (
            <>
              <Link href={routes.USER_VIDEOS}>
                My videos
              </Link>
              <UserMenu user={user} />
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