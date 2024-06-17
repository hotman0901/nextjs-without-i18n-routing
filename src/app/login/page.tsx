'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { loginAction } from '@/actions/login'
import { loginEntry } from '@/apis/login'
import { LoginFormSchema } from '@/schemas/login'


type Inputs = z.infer<typeof LoginFormSchema>

export default function Login() {
  const [data, setData] = useState<Inputs>()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormSchema)
  })

  // const processForm: SubmitHandler<Inputs> = async data => {
  //   const result = await loginEntry(data)

  //   if (!result) {
  //     console.log('Something went wrong')
  //     return
  //   }

  //   if (result.error) {
  //     // set local error state
  //     console.log(result.error)
  //     return
  //   }

  //   reset()
  //   setData(result.data)
  // }

  const action: () => void = handleSubmit(async (data) => {
    const response = await loginAction(data);
    console.log("🚀 ~ file: page.tsx ~ line 46 ~ constaction: ~ response", response)
  });

  return (
    <section className='flex gap-6'>
      <form
        action={action}
        className='flex flex-1 flex-col gap-4 sm:w-1/2'
      >
        <input
          placeholder='name'
          className='rounded-lg'
          {...register('name')}
        />
        {errors.name?.message && (
          <p className='text-sm text-red-400'>{errors.name.message}</p>
        )}

        <input
          placeholder='password'
          className='rounded-lg'
          {...register('password')}
        />
        {errors.password?.message && (
          <p className='text-sm text-red-400'>{errors.password.message}</p>
        )}

        <button className='rounded-lg bg-black py-2 text-white'>Submit</button>
      </form>

      <div className='flex-1 rounded-lg bg-cyan-600 p-8 text-white'>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  )
}
