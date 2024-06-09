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
import { Login, LoginSchema } from '../model/login-schema';
import { Input } from '@nextui-org/input';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/login.mutation';
import FormError from '@/shared/ui/form-error';
import { Button } from '@nextui-org/react';

export function LoginForm() {
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { loading }] = useMutation(LOGIN);

  function onSubmit(input: Login) {
    login({ variables: { input } })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.login.access_token);
      })
      .catch((error) => form.setError('root', { message: error?.message }));
  }

  return (
    <FormWrapper
      header="Рады видеть вас снова!"
      description="Войдите в аккаунт, чтобы продолжить пользоваться IRecommend"
      footer="Еще не зарегистрированы?"
      footerHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Ваша почта" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Введите пароль" {...field} type="password" />
                </FormControl>
                <FormMessage />
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
            Вход
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}