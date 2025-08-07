'use client';

import { useState } from 'react';
import Button from '@/components/ui/foundations/Button';
import Input from '@/components/ui/foundations/Input';
import { useAuthContext } from '@/components/ui/layout/Account';

export default function SignupForm() {
  const { signup, isLoading, error: authError } = useAuthContext();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password);
    } catch {
      // Error is handled by auth context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        name="email"
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        required
        autoComplete="new-password"
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        required
        autoComplete="new-password"
      />
      {(error || authError) && (
        <div className="text-red-600 text-sm">{error || authError}</div>
      )}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}