'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInYears, format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import useAuth from '@/hooks/useAuth';
import useLoadingStatus from '@/hooks/useLoadingStatus';

import { Button } from '@/components/atoms/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select';

import axios from '@/utils/axios';
import getHoroscope from '@/utils/horoscope';
import getZodiacSign from '@/utils/zodiac';

const interestSchema = z.object({
  image: z.any(),
  // .refine((file) => file?.size <= 2000000, 'Max size is 2MB.')
  // .refine(
  //   (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file?.type),
  //   'Please only input valid image.'
  // ),
  name: z.string(),
  gender: z.string(),
  birthday: z.string(),
  horoscope: z.string(),
  zodiac: z.string(),
  height: z.number(),
  weight: z.number(),
});

const AboutForm = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [profileImagePreview, setProfileImagePreview] = useState<ArrayBuffer | string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const methods = useForm<z.infer<typeof interestSchema>>({
    resolver: zodResolver(interestSchema),
  });
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { isLoading, startLoading, stopLoading } = useLoadingStatus();

  const { user, refreshProfile } = useAuth();

  const onSubmit = async (data: z.infer<typeof interestSchema>) => {
    try {
      startLoading();

      // const blob = await (await fetch(data.image)).blob();

      const body = {
        ...data,
        // image: blob.type !== 'image/jpeg' ? null : blob,
      };

      // const formData = new FormData();
      // for (const [key, value] of Object.entries(data)) {
      //   formData.append(key, value);
      // }
      // if (data.image.type !== 'image/jpeg') {
      //   formData.append('image', data.image, data.image.name);
      // }

      const response = await axios.put('api/updateProfile', body, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });

      console.log('res', response.data.data);

      toast.success(response.data.message);
      localStorage.setItem('youapp-profile', JSON.stringify(response.data.data));
      refreshProfile();
      setIsEdit(false);
    } catch (err) {
      console.error(err);
    } finally {
      stopLoading();
    }
  };

  const handleProfileChange = async (file: File | undefined) => {
    try {
      if (file) {
        setValue('image', file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) => {
          if (event.target?.result) {
            setProfileImagePreview(event.target.result);
          }
        };
      }
    } catch (err) {
      console.error(err);
    }
  };

  // assign default values to form
  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [reset, user]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form {...methods}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg font-semibold">About</p>

            {isEdit ? (
              <div className="flex items-center space-x-2">
                {isLoading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
                <Button
                  type="submit"
                  variant="ghost"
                  className={cn(['cursor-pointer', isLoading ? 'text-gray-600' : 'text-gradient'])}
                >
                  Save & Update
                </Button>
              </div>
            ) : (
              <PencilSquareIcon onClick={() => setIsEdit(true)} className="h-6 w-6 cursor-pointer" />
            )}
          </div>

          {isEdit ? (
            <div className="space-y-2">
              <FormField
                control={control}
                name="image"
                rules={{
                  required: {
                    value: true,
                    message: 'Display name is required.',
                  },
                }}
                render={() => (
                  <FormItem className="flex items-center space-x-4">
                    <FormControl>
                      <div className="relative">
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className="relative flex h-[80px] w-[80px] cursor-pointer items-center justify-center overflow-hidden rounded-[32px] border-none bg-[#2c2f33] text-[#f8f9fa] outline-none hover:bg-[#40444b]"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            {profileImagePreview ? (
                              <Image
                                fill
                                alt="profile-image"
                                src={String(profileImagePreview)}
                                className="object-cover"
                              />
                            ) : (
                              <PlusIcon className="h-12 w-12 text-[#F8FAE5]" />
                            )}
                          </button>
                          <p>{profileImagePreview ? 'Change' : 'Add'} image</p>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          max={2000000}
                          accept="image/jpeg"
                          onChange={(event) => handleProfileChange(event.target.files?.[0])}
                          className="hidden"
                        />
                      </div>
                    </FormControl>
                    {errors?.image ? <FormMessage>{errors?.image.message as string}</FormMessage> : null}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="name"
                rules={{
                  required: {
                    value: true,
                    message: 'Display name is required.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel className="basis-[30%] whitespace-nowrap text-base text-[#FFFFFF54]">
                      Display name:
                      {errors?.name ? <FormMessage>{errors?.name.message}</FormMessage> : null}
                    </FormLabel>
                    <FormControl className="min-h-[45px] basis-[70%] border-none bg-white/[6%] !p-4 focus:outline-none">
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter name"
                        className="text-right text-lg placeholder:text-gray-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="gender"
                rules={{
                  required: {
                    value: true,
                    message: 'Gender is required.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel className="basis-[30%] whitespace-nowrap text-base text-[#FFFFFF54]">
                      Gender:
                      {errors?.gender ? <FormMessage>{errors?.gender.message}</FormMessage> : null}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="min-h-[45px] basis-[70%] border-none bg-white/[6%] !p-4 focus:outline-none">
                        <SelectTrigger
                          className={cn(['justify-end text-lg', field.value ? 'text-white' : 'text-gray-600'])}
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="birthday"
                rules={{
                  required: {
                    value: true,
                    message: 'Birthday is required.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel className="basis-[30%] whitespace-nowrap text-base text-[#FFFFFF54]">
                      Birthday:
                      {errors?.birthday ? <FormMessage>{errors?.birthday.message}</FormMessage> : null}
                    </FormLabel>
                    <FormControl className="h-[45px] basis-[70%] rounded border-none bg-white/[6%] !p-4 focus:outline-none">
                      <input
                        {...field}
                        type="date"
                        value={String(field.value)}
                        onChange={(event) => {
                          const zodiac = getZodiacSign(
                            new Date(event.target.value).getDate(),
                            new Date(event.target.value).getMonth()
                          );

                          const horoscope = getHoroscope(
                            new Date(event.target.value).getDate(),
                            new Date(event.target.value).getMonth()
                          );

                          if (zodiac && horoscope) {
                            setValue('zodiac', zodiac);
                            setValue('horoscope', horoscope);
                          }

                          field.onChange(event.target.value);
                        }}
                        className={cn(['appearance-none text-right', field.value ? 'text-white' : 'text-gray-600'])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="horoscope"
                rules={{
                  required: {
                    value: true,
                    message: 'Horoscope is required.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel className="basis-[30%] whitespace-nowrap text-base text-[#FFFFFF54]">
                      Horoscope:
                      {errors?.horoscope ? <FormMessage>{errors?.horoscope.message}</FormMessage> : null}
                    </FormLabel>
                    <FormControl className="min-h-[45px] basis-[70%] border-none bg-white/[6%] !p-4 focus:outline-none">
                      <Input
                        {...field}
                        readOnly
                        type="text"
                        placeholder="--"
                        className="text-right text-lg placeholder:text-gray-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="zodiac"
                rules={{
                  required: {
                    value: true,
                    message: 'Zodiac is required.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel className="basis-[30%] whitespace-nowrap text-base text-[#FFFFFF54]">
                      Zodiac:
                      {errors?.zodiac ? <FormMessage>{errors?.zodiac.message}</FormMessage> : null}
                    </FormLabel>
                    <FormControl className="min-h-[45px] basis-[70%] border-none bg-white/[6%] !p-4 focus:outline-none">
                      <Input
                        {...field}
                        readOnly
                        type="text"
                        placeholder="--"
                        className="text-right text-lg placeholder:text-gray-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="height"
                rules={{
                  required: {
                    value: true,
                    message: 'Height is required.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel className="basis-[30%] whitespace-nowrap text-base text-[#FFFFFF54]">
                      Height:
                      {errors?.height ? <FormMessage>{errors?.height.message}</FormMessage> : null}
                    </FormLabel>
                    <FormControl className="min-h-[45px] basis-[70%] border-none bg-white/[6%] !p-4 focus:outline-none">
                      <Input
                        {...field}
                        type="number"
                        placeholder="Add height"
                        className="text-right text-lg placeholder:text-gray-600"
                        onChange={(event) => field.onChange(event.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="weight"
                rules={{
                  required: {
                    value: true,
                    message: 'Weight is required.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel className="basis-[30%] whitespace-nowrap text-base text-[#FFFFFF54]">
                      Weight:
                      {errors?.weight ? <FormMessage>{errors?.weight.message}</FormMessage> : null}
                    </FormLabel>
                    <FormControl className="min-h-[45px] basis-[70%] border-none bg-white/[6%] !p-4 focus:outline-none">
                      <Input
                        {...field}
                        type="number"
                        placeholder="Add weight"
                        className="text-right text-lg placeholder:text-gray-600"
                        onChange={(event) => field.onChange(event.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ) : user?.birthday ? (
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">
                  Birthday:
                  <span className="text-white">
                    {' '}
                    {format(new Date(user.birthday), 'dd / MM / yyyy') +
                      ` (Age ${differenceInYears(new Date(), user.birthday)})`}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  Horoscope:
                  <span className="text-white"> {user.horoscope}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  Zodiac:
                  <span className="text-white"> {user.zodiac}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  Height:
                  <span className="text-white"> {user.height ?? 0} cm</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  Weight:
                  <span className="text-white"> {user.weight ?? 0} kg</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Add in your your to help others know you better</p>
          )}
        </Form>
      </form>
    </>
  );
};

export default AboutForm;
