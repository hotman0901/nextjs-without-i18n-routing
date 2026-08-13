'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useMemo,useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { loginAction } from '@/actions/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLoginSchema,type LoginInputs } from '@/schemas/login';

export default function Login() {
  const t = useTranslations('Auth');
  const tValidation = useTranslations('Validation');

  const [serverError, setServerError] = useState<string>();
  const [pending, startTransition] = useTransition();

  // schema 帶著翻譯建立，錯誤訊息才會跟著語系走
  const schema = useMemo(
    () => createLoginSchema(tValidation),
    [tValidation]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(schema),
  });

  const action: () => void = handleSubmit((values) => {
    startTransition(async () => {
      // 成功時 action 會設定 cookie 並導向 /dashboard，不會回傳
      const response = await loginAction(values);

      if (response && !response.success) {
        setServerError(response.error.errors.join(', ') || t('title'));
      }
    });
  });

  return (
    <section className="mx-auto flex max-w-sm flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">{t('title')}</h1>
        <p className="text-sm text-muted-foreground">{t('hint')}</p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            className="rounded-lg"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name?.message && (
            <p id="name-error" role="alert" className="text-sm text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            id="password"
            type="password"
            className="rounded-lg"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          {errors.password?.message && (
            <p id="password-error" role="alert" className="text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <p role="alert" className="text-sm text-red-400">{serverError}</p>
        )}

        <Button disabled={pending}>{t('submit')}</Button>
      </form>
    </section>
  );
}
