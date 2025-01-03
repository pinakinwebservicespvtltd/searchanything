import { CredentialsForm } from '@/components/admin/CredentialsForm';

export function Security() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
      <CredentialsForm />
    </div>
  );
}