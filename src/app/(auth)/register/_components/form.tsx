'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import useLoadingStatus from '@/hooks/useLoadingStatus';

import { Button } from '@/components/atoms/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';

import axios from '@/utils/axios';

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, context) => {
    if (password !== passwordConfirmation) {
      context.addIssue({
        code: 'custom',
        message: 'Password did not match.',
        path: ['passwordConfirmation'],
      });
    }
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const router = useRouter();

  const methods = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const { isLoading, startLoading, stopLoading } = useLoadingStatus();

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      startLoading();

      const response = await axios.post('api/register', data);

      if (!response.data?.error) {
        toast.success(response.data?.message);
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong! ERROR: ' + err);
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form {...methods}>
        <FormField
          control={control}
          name="email"
          rules={{
            required: {
              value: true,
              message: 'Email is required.',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="min-h-[60px] w-full border-none bg-white/[6%] !p-4 text-lg text-white placeholder-white focus:outline-none"
                />
              </FormControl>
              {errors?.email ? <FormMessage>{errors?.email.message}</FormMessage> : null}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="username"
          rules={{
            required: {
              value: true,
              message: 'username is required.',
            },
          }}
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel />
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="johndoe"
                  className="min-h-[60px] w-full border-none bg-white/[6%] !p-4 text-lg text-white placeholder-white focus:outline-none"
                />
              </FormControl>
              {errors?.username ? <FormMessage>{errors?.username.message}</FormMessage> : null}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          rules={{
            required: {
              value: true,
              message: 'Password is required.',
            },
          }}
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel />
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create password"
                    className="min-h-[60px] w-full border-none bg-white/[6%] !p-4 text-lg text-white placeholder-white focus:outline-none"
                  />

                  {showPassword ? (
                    <EyeSlashIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute bottom-[%25] right-0 top-[25%] mr-4 h-8 w-8 text-[#F8FAE5]"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute bottom-[%25] right-0 top-[25%] mr-4 h-8 w-8 text-[#F8FAE5]"
                    />
                  )}
                </div>
              </FormControl>
              {errors?.password ? <FormMessage>{errors?.password.message}</FormMessage> : null}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="passwordConfirmation"
          rules={{
            required: {
              value: true,
              message: 'Password confirmation is required.',
            },
          }}
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel />
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    placeholder="Password confirmation"
                    className="min-h-[60px] w-full border-none bg-white/[6%] !p-4 text-lg text-white placeholder-white focus:outline-none"
                  />

                  {showPasswordConfirmation ? (
                    <EyeSlashIcon
                      onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                      className="absolute bottom-[%25] right-0 top-[25%] mr-4 h-8 w-8 text-[#F8FAE5]"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                      className="absolute bottom-[%25] right-0 top-[25%] mr-4 h-8 w-8 text-[#F8FAE5]"
                    />
                  )}
                </div>
              </FormControl>
              {errors?.passwordConfirmation ? <FormMessage>{errors?.passwordConfirmation.message}</FormMessage> : null}
            </FormItem>
          )}
        />

        <Button
          disabled={
            !Boolean(watch('email') && watch('username') && watch('password') && watch('passwordConfirmation')) ||
            isLoading
          }
          type="submit"
          className="mt-8 min-h-[60px] w-full bg-gradient-to-r from-[#62CDCB] to-[#4599DB] text-2xl font-bold shadow-none transition-shadow duration-300 hover:shadow-[0px_10px_10px_0px_rgba(98,205,203,0.3),0px_10px_10px_0px_rgba(69,153,219,0.3)]"
        >
          {isLoading ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : 'Register'}
        </Button>
      </Form>
    </form>
  );
};

export default RegisterForm;
