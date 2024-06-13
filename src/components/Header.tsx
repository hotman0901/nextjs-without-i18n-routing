'use client';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'


export default function Header() {
  const router = useRouter()
  const changeLanguage = (lan: string) => {
    setCookie('x-locale', lan)
    router.refresh()
  }
  return (
    <div>
      <h3>Change Language</h3>
      <button onClick={() => changeLanguage('en')}>en</button>
      <button onClick={() => changeLanguage('de')}>de</button>
    </div>
  )
}
