"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

export default function ModeTogglerMobile() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>外觀</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>淺色</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>深色</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>自動</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
