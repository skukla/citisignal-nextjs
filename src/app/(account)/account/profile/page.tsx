'use client';

import { AccountPage, AccountPageProvider } from '@/components/layout/AccountPage';
import ProfileForm from '@/components/ui/forms/account/ProfileForm';
import { profileConfig, ProfileFormFields } from '@/data/route-groups/account/profile';

export default function ProfilePage() {
  const handleProfileSubmit = async (data: ProfileFormFields) => {
    // TODO: Implement profile update
    // Will use: data
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const pageData = {
    title: profileConfig.personalInfo.title,
    description: profileConfig.personalInfo.description
  };

  return (
    <AccountPageProvider pageData={pageData}>
      <AccountPage.Root>
        <AccountPage.Layout>
          <AccountPage.Navigation />
          
          <AccountPage.Main>
            <AccountPage.Section>
              <AccountPage.Header />
              <AccountPage.Content>
                <ProfileForm onSubmit={handleProfileSubmit} />
              </AccountPage.Content>
            </AccountPage.Section>
          </AccountPage.Main>
        </AccountPage.Layout>
      </AccountPage.Root>
    </AccountPageProvider>
  );
}