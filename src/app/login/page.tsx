'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import HashLoader from 'react-spinners/HashLoader';
import { z } from 'zod';

import { loginAction } from '@/actions/login';
import { loginEntry } from '@/apis/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginFormSchema } from '@/schemas/login';

type Inputs = z.infer<typeof LoginFormSchema>;

export default function Login() {
  const [data, setData] = useState<Inputs>();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await loginEntry(data);

    if (!result) {
      console.log('Something went wrong');
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    }

    reset();
    setData(result.data);
  };

  const action: () => void = handleSubmit(async (data) => {
    startTransition(async () => {
      const response = await loginAction(data);
      reset();
      setData(response?.data);
      console.log(
        '🚀 ~ file: page.tsx ~ line 46 ~ constaction: ~ response',
        response,
      );
    });
  });

  return (
    <section className="flex gap-6">
      <form action={action} className="flex flex-1 flex-col gap-4 sm:w-1/2">
        <Input
          placeholder="name"
          className="rounded-lg"
          {...register('name')}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}

        <Input
          placeholder="password"
          className="rounded-lg"
          {...register('password')}
        />
        {errors.password?.message && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}

        <Button disabled={pending}>Submit</Button>
      </form>

      <div className="flex-1 rounded-lg bg-cyan-800 p-8 text-white">
        {pending ? (
          <HashLoader color="#6ebe7d" />
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </section>
  );
}
