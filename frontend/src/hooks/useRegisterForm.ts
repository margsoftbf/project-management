import { PropertyApi } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function useRegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    privacyConsent: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else {
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password =
          'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.role) {
      newErrors.role = 'Please select your account type';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must accept the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setRegisterError(null);

      await PropertyApi.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        privacyConsent: formData.privacyConsent,
        marketingConsent: formData.marketingConsent,
      });

      toast.success('Account created successfully! Redirecting to login...');

      setTimeout(() => {
        window.location.href = '/login';
      }, 2500);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to register. Please try again.'
      );
      setRegisterError(
        error instanceof Error
          ? error.message
          : 'Failed to register. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    registerError,
    handleChange,
    handleSubmit,
  };
}
