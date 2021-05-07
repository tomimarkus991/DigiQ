import { RegisterUserInput } from '../dto/register-user.input';

export const validateRegister = (registerUserInput: RegisterUserInput) => {
  const { username, email, password } = registerUserInput;
  if (username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'Username length has to be greater than 2',
      },
    ];
  }

  if (username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Cannot include an @ sign',
      },
    ];
  }

  if (!email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Invalid email',
      },
    ];
  }

  if (password.length <= 6) {
    return [
      {
        field: 'password',
        message: 'Password length has to be greater than 6',
      },
    ];
  }

  return null;
};
