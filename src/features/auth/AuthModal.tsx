import { useEffect, useState } from 'react';
import {
  Box,
  Span,
  Text,
} from '@chakra-ui/react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import CustomModal from '../../components/CustomModal';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
};

export const AuthModal = ({
  open,
  onClose,
  defaultMode = 'login',
}: AuthModalProps) => {
  const [mode, setMode] = useState<
    'login' | 'register'
  >(defaultMode);

  // reset mode whenever modal opens
  useEffect(() => {
    if (open) setMode(defaultMode);
  }, [open, defaultMode]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={
        mode === 'login' ? 'Login' : 'Register'
      }
    >
      {mode === 'login' ? (
        <LoginForm onSuccess={onClose} />
      ) : (
        <RegisterForm
          onSuccess={() => setMode('login')}
        />
      )}

      <Box mt='6'>
        {mode === 'login' ? (
          <Text fontSize='sm'>
            Don’t have an account?{' '}
            <Span
              color='brand800'
              fontWeight='bold'
              cursor='pointer'
              onClick={() => setMode('register')}
            >
              Register
            </Span>
          </Text>
        ) : (
          <Text fontSize='sm'>
            Already have an account?{' '}
            <Span
              color='brand800'
              fontWeight='bold'
              cursor='pointer'
              onClick={() => setMode('login')}
            >
              Login
            </Span>
          </Text>
        )}
      </Box>
    </CustomModal>
  );
};
