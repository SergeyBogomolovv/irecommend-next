'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormWrapper from '@/shared/ui/forw-wrapper';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { useSearchParams } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { VerifyAccount, VerifyAccountSchema } from '../model/verify.schema';
import { useMutation } from '@apollo/client';
import { VERIFY_ACCOUNT } from '../graphql/verify.mutation';
import FormError from '@/shared/ui/form-error';

export function VerifyAccountForm() {
  const queryparams = useSearchParams();
  const email = queryparams.get('email') || '';
  const form = useForm<VerifyAccount>({
    resolver: zodResolver(VerifyAccountSchema),
    defaultValues: {
      code: '',
    },
  });
  const [verify, { loading }] = useMutation(VERIFY_ACCOUNT);
  function onSubmit(values: VerifyAccount) {
    verify({ variables: { input: { code: values.code, email } } })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.verify_account.access_token);
      })
      .catch((error) => form.setError('root', { message: error?.message }));
  }

  return (
    <FormWrapper
      header="Подтвердите ваш аккаунт"
      description="Проверьте вашу почту, на нее должен был прийти код подтверждения"
      footer="Назад к регистрации"
      footerHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="mx-auto w-full">
                      <InputOTPSlot className="w-full" index={0} />
                      <InputOTPSlot className="w-full" index={1} />
                      <InputOTPSlot className="w-full" index={2} />
                      <InputOTPSlot className="w-full" index={3} />
                      <InputOTPSlot className="w-full" index={4} />
                      <InputOTPSlot className="w-full" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          <FormError message={form.formState.errors.root?.message} />
          <Button
            isDisabled={loading}
            className="w-full"
            color="primary"
            size="lg"
            type="submit"
          >
            Подтвердить аккаунт
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}