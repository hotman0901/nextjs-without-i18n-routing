'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import HashLoader from 'react-spinners/HashLoader';

import { loginAction } from '@/actions/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginFormSchema,type LoginInputs } from '@/schemas/login';

export default function Login() {
  const [data, setData] = useState<LoginInputs>();
  const [serverError, setServerError] = useState<string>();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  const action: () => void = handleSubmit((values) => {
    startTransition(async () => {
      const response = await loginAction(values);

      // client 已經驗過一次，這裡擋的是繞過表單直接呼叫 action 的情況
      if (!response.success) {
        setServerError(response.error.errors.join(', ') || 'Invalid input');
        return;
      }

      setServerError(undefined);
      reset();
      setData(response.data);
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
          type="password"
          placeholder="password"
          className="rounded-lg"
          {...register('password')}
        />
        {errors.password?.message && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}

        {serverError && (
          <p className="text-sm text-red-400">{serverError}</p>
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
