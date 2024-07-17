import { OrganizationProfile } from '@clerk/nextjs';

export default function OrganizationProfilePage() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <OrganizationProfile path='/organization-profile' />
    </div>
  );
}
