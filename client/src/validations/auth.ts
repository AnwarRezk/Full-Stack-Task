import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Please enter a valid email address (e.g., user@example.com)')
    .required('Email is required'),
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Please enter a valid email address (e.g., user@example.com)')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
}); 