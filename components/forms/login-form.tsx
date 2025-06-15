import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { signIn, providerMap } from "@/auth"
import routes from "@/constants/routes"
import { LoadingButton } from "@/components/buttons/loadingButton"

type LoginFormProps = React.ComponentProps<"div"> & {
  searchParams?: { callbackUrl?: string }
}

export function LoginForm({ className, searchParams, ...props }: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>登入</CardTitle>
          <CardDescription>
            
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {providerMap.map((provider) => {
              if (provider.id === "resend") return;
              return (
                <form 
                  key={provider.id}
                  action={async () => {
                    "use server"
                    await signIn(
                      provider.id, {
                      redirectTo: searchParams?.callbackUrl ?? "",
                    })
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="outline"
                    className="w-full"
                  >
                    用 {provider.name} 登入
                  </LoadingButton>
                </form>
            )})}
            
            <div className="flex items-center gap-4 mt-3">
              <Separator className="flex-1" />
              <span className="text-muted-foreground">或者</span>
              <Separator className="flex-1" />
            </div>

            <form
              action={async (formData) => {
                "use server"
                await signIn("resend", formData)
              }}
              className="grid w-full max-w-sm items-center gap-3"
            >
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" placeholder="Email" required/>
              <LoadingButton
                type="submit"
                variant="outline"
                className="w-full"
              >登入</LoadingButton>
            </form>
            
          </div>
            
          <div className="mt-4 text-center text-sm">
            還沒有帳號?
            <a href={routes.SIGNUP} className="underline underline-offset-4">
              立即註冊
            </a>
          </div>

          
        </CardContent>
      </Card>
    </div>
  )
}
