import React, {
  useState,
  useEffect,
} from 'react';
import { toaster } from '../../components/ui/toaster';
import {
  Button,
  Field,
  Input,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
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
    setValue,
    formState: { errors, isSubmitting },
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

  // Local state for the switch (Profile-style)
  const [vm, setVm] = useState(false);

  // Sync local state with RHF field
  useEffect(() => {
    setValue('venueManager', vm, {
      shouldValidate: true,
    });
  }, [vm, setValue]);

  const onSubmit = handleSubmit(
    async (values: RegisterFormValues) => {
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
    },
    (errors) => {
      console.log(
        '❌ Validation errors:',
        errors
      );
      toaster.create({
        title: 'Form validation failed',
        description:
          'Please check the highlighted fields.',
        type: 'error',
        duration: 3000,
      });
    }
  );

  return (
    <form onSubmit={onSubmit}>
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

        {/* Venue manager toggle — Profile-style */}
        <Field.Root>
          <Field.Label>
            Register as a venue manager
          </Field.Label>
          <Switch.Root
            colorPalette='cyan'
            checked={vm}
            onCheckedChange={(details) =>
              setVm(details.checked)
            }
          >
            <Switch.HiddenInput />
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
      </Stack>
    </form>
  );
};
