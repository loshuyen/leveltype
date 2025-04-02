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

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>註冊帳號</CardTitle>
          <CardDescription>
            
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  註冊
                </Button>
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground">或者</span>
                  <Separator className="flex-1" />
                </div>
                <Button variant="outline" className="w-full">
                  用 Google 帳號註冊
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              已經有帳號?{" "}
              <a href="/sign-in" className="underline underline-offset-4">
                登入
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
