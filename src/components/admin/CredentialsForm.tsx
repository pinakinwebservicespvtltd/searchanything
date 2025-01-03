import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCredentials, getCredentials } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export function CredentialsForm() {
  const { toast } = useToast();
  const currentCredentials = getCredentials();
  const [username, setUsername] = useState(currentCredentials.username);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    saveCredentials({ username, password });
    toast({
      title: 'Success',
      description: 'Credentials updated successfully',
    });
    
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Username</label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">New Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Confirm Password</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit">Update Credentials</Button>
    </form>
  );
}