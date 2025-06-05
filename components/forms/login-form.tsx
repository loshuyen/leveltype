import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
            <form>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    忘記密碼?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full mt-5">
                  登入
                </Button>
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground">或者</span>
                  <Separator className="flex-1" />
                </div>
              </div>
            </form>
            {providerMap.map((provider) => (
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
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full"
                >
                  用 {provider.name} 登入
                </Button>
              </form>
            ))}
          </div>
            
            <div className="mt-4 text-center text-sm">
              還沒有帳號?{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                立即註冊
              </a>
            </div>

          
        </CardContent>
      </Card>
    </div>
  )
}
