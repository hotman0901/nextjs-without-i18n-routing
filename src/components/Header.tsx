'use client';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"


export default function Header() {
  const router = useRouter()
  const changeLanguage = (lan: string) => {
    setCookie('x-locale', lan)
    router.refresh()
  }
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Change Language</h2>
      <Button onClick={() => changeLanguage('en')}>en</Button>
      <Button onClick={() => changeLanguage('de')}>de</Button>
    </div>
  )
}
