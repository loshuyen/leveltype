import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/auth"
import { LogOut, CircleUser } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const UserMenu = ({ user }: {user: User}) => {
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          { user?.image ? <Image src={user.image} alt='avatar'/> : <CircleUser />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu