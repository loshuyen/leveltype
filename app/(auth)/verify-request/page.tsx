import React from 'react'
import { Mail } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Image from 'next/image'
import Link from 'next/link'

const VerifyRequestPage = () => {
  return (
    <div className="grid w-full max-w-xl gap-4">
        <Alert>
            <Mail />
            <AlertTitle>請確認電子郵件</AlertTitle>
            <AlertDescription>
                <p>
                已寄出至您的信箱<br/>
                點擊郵件內的登入連結以完成登入
                </p>
                <div className='flex items-center gap-1 mt-2'>
                    <Image src='/logo.png' alt='logo' width={16} height={16}/>
                    <Link href="/">LevelType</Link>
                </div>
            </AlertDescription>
        </Alert>
    </div>
  )
}

export default VerifyRequestPage