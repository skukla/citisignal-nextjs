'use client';

import Input from '@/components/ui/foundations/Input';
import Button from '@/components/ui/foundations/Button';
import { useForm } from '@/hooks/forms/useForm';
import { profileValidation } from '@/data/account/validation';
import { profileConfig } from '@/data/account/profile';
import type { ProfileFormFields } from '@/data/account/profile';

interface ProfileFormProps {
  onSubmit: (values: ProfileFormFields) => Promise<void>;
}

export default function ProfileForm({ onSubmit }: ProfileFormProps) {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldError,
    isSubmitting,
    touchedFields,
    dirtyFields
  } = useForm<ProfileFormFields>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    validationRules: profileValidation,
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {profileConfig.personalInfo.form.fields.map((field) => {
        const fieldName = field.id as keyof ProfileFormFields;
        // Only show error if field has been touched AND modified
        const error = touchedFields[fieldName] && dirtyFields[fieldName] 
          ? getFieldError(fieldName) 
          : undefined;

        return (
          <div key={field.id} className="space-y-1">
            <Input
              name={field.id}
              label={field.label}
              type={field.type}
              required={field.required}
              value={values[fieldName]}
              error={error}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              onBlur={() => handleBlur(fieldName)}
              className="w-full"
            />
          </div>
        );
      })}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}