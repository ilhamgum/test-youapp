'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ArrowPathIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Creatable from 'react-select/creatable';
import { toast } from 'sonner';
import { z } from 'zod';

import useAuth from '@/hooks/useAuth';
import useLoadingStatus from '@/hooks/useLoadingStatus';

import { Form, FormControl, FormField, FormItem } from '@/components/atoms/form';

import axios from '@/utils/axios';

const interestSchema = z.object({
  interest: z.any().array(),
});

const Interest = () => {
  const { push } = useRouter();

  const methods = useForm<z.infer<typeof interestSchema>>({
    resolver: zodResolver(interestSchema),
  });
  const { control, setValue, handleSubmit } = methods;

  const { isLoading, startLoading, stopLoading } = useLoadingStatus();

  const { user, refreshProfile } = useAuth();

  const onSubmit = async (data: z.infer<typeof interestSchema>) => {
    try {
      startLoading();

      console.log(data);
      const body = {
        ...data,
      };

      const response = await axios.put('api/updateProfile', body);

      toast.success(response.data.message);
      refreshProfile();
      push('/');
    } catch (err) {
      console.error(err);
    } finally {
      stopLoading();
    }
  };

  // assign default values to form
  useEffect(() => {
    if (user?.interest) {
      setValue('interest', user.interest);
    }
  }, [setValue, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form {...methods}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-white">
              <ChevronLeftIcon className="h-6 w-6" />
              <Link href={'/'}>
                <p className="font-semibold">Back</p>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              {isLoading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
              <button
                type="submit"
                onClick={() => {
                  console.log('first');
                  handleSubmit(onSubmit);
                }}
                className="cursor-pointer bg-gradient-to-r from-[#ABFFFD] to-[#AADAFF] bg-clip-text text-lg text-transparent"
              >
                Save
              </button>
            </div>
          </div>

          <div className="mb-8 ml-4 mt-16">
            <p className="text-gradient text-lg font-semibold">Tell everyone about yourself</p>
            <h1 className="mt-2 text-2xl font-bold text-white">What interest you?</h1>
          </div>

          <FormField
            control={control}
            name="interest"
            rules={{
              required: {
                value: true,
                message: 'Display name is required.',
              },
            }}
            render={({ field }) => (
              <FormItem className="flex w-full items-center space-x-4">
                <FormControl className="w-full">
                  <Creatable
                    {...field}
                    isMulti
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    onChange={(option) => field.onChange(option)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    styles={{
                      control: (base) => ({
                        ...base,
                        padding: '10px',
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#FFFFFF1A',
                        borderRadius: '5px',
                        marginRight: '5px',
                      }),
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Form>
    </form>
  );
};

export default Interest;
