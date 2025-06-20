import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/modeToggler"
import routes from "@/constants/routes"
import { auth } from "@/auth"
import UserMenu from "@/components/userMenu"
import { Menu, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModeTogglerMobile from "../modeTogglerMobile"
import { signOut } from "@/auth"

export default async function NavBar() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="sticky top-0 left-0 z-50 dark:bg-black bg-white shadow flex h-15 w-full items-center px-4 md:px-6">
      <Link href={routes.HOME} className="mr-6 flex items-center">
        <Image src={"/logo.png"} alt="Logo" width={28} height={28} />
        <span className="ml-2 font-semibold text-xl">LevelType</span>
      </Link>
      <div className="ml-auto hidden sm:flex items-center">
        {
          user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href={routes.USER_VIDEOS}>
                  練習紀錄
                </Link>
              </Button>
              <UserMenu user={user} />
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href={routes.SIGNIN}>登入</Link>
              </Button>
              <Button asChild>
                <Link href={routes.SIGNUP}>註冊</Link>
              </Button>
            </>
          )
        }
        <ModeToggle />
      </div>
      {/* Mobile Menu */}
      <div className="ml-auto flex gap-1 items-center sm:hidden">
        {
          user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={routes.USER_VIDEOS}>練習紀錄</Link>
                    </DropdownMenuItem>
                    <ModeTogglerMobile />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <form
                          action={async () => {
                          "use server"
                          await signOut()
                          }}
                      >
                        <LogOut />
                        <button type="submit">
                          登出
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="size-8">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={routes.SIGNIN}>登入</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={routes.SIGNUP}>註冊</Link>
                    </DropdownMenuItem>
                    <ModeTogglerMobile />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )
        }
      </div>
    </header>
  )
}