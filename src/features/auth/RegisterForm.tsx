import React from 'react';
import { toaster } from '../../components/ui/toaster';
import {
  Button,
  Field,
  Flex,
  Input,
  Separator,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import {
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormValues,
  type RegisterPayload,
} from './schemas';
import axios from 'axios';
import { registerUser } from './api';
import {
  hasErrorArray,
  hasMessage,
} from '../../lib/errorGuards';

type RegisterFormProps = {
  onSuccess?: () => void;
};

export const RegisterForm: React.FC<
  RegisterFormProps
> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      venueManager: false,
    },
  });

  // RHF value for the switch
  const vm = watch('venueManager');

  const onValid: SubmitHandler<
    RegisterFormValues
  > = async (values) => {
    const {
      name,
      email,
      password,
      venueManager,
    } = values;
    const data: RegisterPayload = {
      name,
      email,
      password,
      venueManager: !!venueManager,
    };

    try {
      console.log('submitted:', values);
      const res = await registerUser(data);
      console.log('Registered:', res);

      toaster.create({
        title: 'Registration successful',
        description: `Welcome, ${name}! Log in to fully access Holidaze.`,
        type: 'success',
        duration: 4000,
      });

      onSuccess?.();
    } catch (err: unknown) {
      let message = 'Something went wrong';

      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (typeof data === 'string') {
          message = data;
        } else if (hasErrorArray(data)) {
          message =
            data.errors.find(
              (e) => typeof e.message === 'string'
            )?.message ?? err.message;
        } else if (hasMessage(data)) {
          message = data.message;
        } else {
          message = err.message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      toaster.create({
        title: 'Registration failed',
        description: message,
        type: 'error',
        duration: 4000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Stack gap='4'>
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Name</Field.Label>
          <Input
            {...register('name', {
              required: 'Name is required',
            })}
            placeholder='Your name'
          />
          <Field.ErrorText>
            {errors.name?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input
            {...register('email', {
              required: 'Email is required',
            })}
            type='email'
            placeholder='example@stud.noroff.no'
          />
          <Field.ErrorText>
            {errors.email?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            {...register('password', {
              required: 'Password is required',
            })}
            type='password'
            placeholder='********'
          />
          <Field.ErrorText>
            {errors.password?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root
          invalid={!!errors.confirmPassword}
        >
          <Field.Label>
            Confirm password
          </Field.Label>
          <Input
            {...register('confirmPassword')}
            type='password'
            placeholder='********'
          />
          <Field.ErrorText>
            {errors.confirmPassword?.message}
          </Field.ErrorText>
        </Field.Root>

        {/* Venue manager toggle — Chakra v3 slot API + RHF */}
        <Field.Root>
          <Field.Label>
            Register as a venue manager
          </Field.Label>
          <Switch.Root
            checked={!!vm}
            onCheckedChange={(e) =>
              setValue(
                'venueManager',
                e.checked,
                { shouldDirty: true }
              )
            }
            colorPalette='cyan'
          >
            {/* keep RHF registered via HiddenInput */}
            <Switch.HiddenInput
              {...register('venueManager')}
            />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label />
          </Switch.Root>
          <Field.ErrorText>
            {errors.venueManager?.message}
          </Field.ErrorText>
        </Field.Root>

        <Button
          type='submit'
          disabled={isSubmitting}
          bg='brand700'
          color='white'
          fontWeight='600'
          mt='4'
        >
          Register
        </Button>

        <Separator w='100%' my='4' />

        <Flex gap='2'>
          <Text>Already got an account?</Text>
          <Text>Sign in</Text>
        </Flex>
      </Stack>
    </form>
  );
};
