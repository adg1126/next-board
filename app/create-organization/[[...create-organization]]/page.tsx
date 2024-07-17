import { CreateOrganization } from '@clerk/nextjs';

export default function CreateOrganizationPage() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <CreateOrganization path='/create-organization' />
    </div>
  );
}
