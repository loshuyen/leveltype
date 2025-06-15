"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { Loader2Icon } from "lucide-react"

export function LoadingButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button {...props} disabled={pending}>
      {pending ? (
        <>
          <Loader2Icon className="animate-spin" />
          請稍候...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
