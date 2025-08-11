'use client';

import AuthForm from '@/components/ui/forms/AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-[800px] py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}