'use client';

import { AccountDashboard } from '@/components/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import ProfileForm from '@/components/ui/forms/account/ProfileForm';
import { profileConfig } from '@/data/account/profile';

export default function ProfilePage() {
  const handleProfileSubmit = async (data: any) => {
    // TODO: Implement profile update
    console.log('Profile update:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <AccountDashboard>
      <AccountSection
        title={profileConfig.personalInfo.title}
        description={profileConfig.personalInfo.description}
      >
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <ProfileForm onSubmit={handleProfileSubmit} />
          </div>
        </div>
      </AccountSection>
    </AccountDashboard>
  );
}