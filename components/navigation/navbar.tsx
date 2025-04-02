import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/modeToggler"

export default function Component() {
  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6">
      <Link href="/" className="mr-6 flex items-center">
        <Image src={"/logo.png"} alt="Logo" width={28} height={28} />
        <span className="ml-2 font-semibold text-xl">LevelType</span>
      </Link>
      <div className="ml-auto flex gap-2">
        <Button variant="outline">Sign in</Button>
        <Button>Sign Up</Button>
        <ModeToggle />
      </div>
    </header>
  )
}