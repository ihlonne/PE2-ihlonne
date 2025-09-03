import React from 'react';
import { toaster } from '../../components/ui/toaster';
import {
  Button,
  Field,
  Flex,
  Input,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  type LoginFormValues,
  type LoginPayload,
} from './schemas';
import axios from 'axios';
import { loginUser } from './api';
import {
  hasErrorArray,
  hasMessage,
} from '../../lib/errorGuards';

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm: React.FC<
  LoginFormProps
> = ({ onSuccess }) => {
  const {
    register: login,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(
    async (values: LoginFormValues) => {
      const { name, email, password } = values;
      const data: LoginPayload = {
        name,
        email,
        password,
      };

      try {
        const res = await loginUser(data);
        console.log(res);

        localStorage.setItem(
          'token',
          res.data.accessToken
        );
        localStorage.setItem(
          'user',
          JSON.stringify(res.data)
        );

        toaster.create({
          title: 'Login successful',
          description: `Welcome, ${name}! Book your next adventure, or list your venue.`,
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
                (e) =>
                  typeof e.message === 'string'
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
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack gap='4'>
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Name</Field.Label>
          <Input
            {...login('name', {
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
            {...login('email', {
              required: 'Email is required',
            })}
            type='email'
            placeholder='example@stud.noroff.no'
          />
          <Field.ErrorText>
            {errors.email?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            {...login('password', {
              required: 'Password is required',
            })}
            name='password'
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
            {...login('confirmPassword')}
            type='password'
            placeholder='********'
          />
          <Field.ErrorText>
            {errors.confirmPassword?.message}
          </Field.ErrorText>
        </Field.Root>

        <Button
          type='submit'
          disabled={isSubmitting}
        >
          Login
        </Button>

        <Separator w='100&' />

        <Flex gap='2'>
          <Text>Don't have an account?</Text>
          <Text>Register</Text>
        </Flex>
      </Stack>
    </form>
  );
};
