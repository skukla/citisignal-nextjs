'use client';

import Button from '@/components/ui/foundations/Button';
import Input from '@/components/ui/foundations/Input';
import { useAuthContext } from '@/components/ui/layout/Account';

export default function LoginForm() {
  const { login, isLoading, error } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      await login(email, password);
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
        autoComplete="current-password"
      />
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}