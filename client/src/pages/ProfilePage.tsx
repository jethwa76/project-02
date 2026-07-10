import { useRef, useState } from 'react';
import { Camera, Check, KeyRound, Loader2, UserRound } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import * as profileService from '../services/profile';

export function ProfilePage() {
  const { user, signIn } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Avatar upload state
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [avatarMsg, setAvatarMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarMsg(null);
    setAvatarUploading(true);
    try {
      const updatedUser = await profileService.uploadAvatar(file);
      setAvatarUrl(updatedUser.avatarUrl || '');
      setAvatarMsg({ type: 'success', text: 'Avatar uploaded successfully!' });
    } catch (error) {
      setAvatarMsg({ type: 'error', text: error instanceof Error ? error.message : 'Upload failed' });
    } finally {
      setAvatarUploading(false);
      // Reset file input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileSaving(true);
    try {
      await profileService.updateProfile({ name: profileName, email: profileEmail });
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setProfileMsg({ type: 'error', text: error instanceof Error ? error.message : 'Update failed' });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters' });
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setPasswordMsg({ type: 'error', text: 'New password must include an uppercase letter' });
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setPasswordMsg({ type: 'error', text: 'New password must include a number' });
      return;
    }

    setPasswordSaving(true);
    try {
      await profileService.changePassword({ currentPassword, newPassword });
      setPasswordMsg({ type: 'success', text: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setPasswordMsg({ type: 'error', text: error instanceof Error ? error.message : 'Password update failed' });
    } finally {
      setPasswordSaving(false);
    }
  };

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const fullAvatarUrl = avatarUrl ? (avatarUrl.startsWith('http') ? avatarUrl : `${apiBase.replace('/api', '')}${avatarUrl}`) : '';

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <div className="flex items-center gap-4">
          {fullAvatarUrl ? (
            <img
              src={fullAvatarUrl}
              alt={user?.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-lg bg-cyan-600 text-2xl font-black text-white">
              {user?.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold dark:text-white">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="mt-2 inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200">{user?.role}</span>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <Button
          className="mt-6 w-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
          onClick={handleAvatarClick}
          disabled={avatarUploading}
        >
          {avatarUploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
          {avatarUploading ? 'Uploading...' : 'Upload avatar'}
        </Button>

        {avatarMsg && (
          <p className={`mt-2 text-sm ${avatarMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
            {avatarMsg.type === 'success' && <Check size={14} className="mr-1 inline" />}
            {avatarMsg.text}
          </p>
        )}
      </Card>

      <Card className="grid gap-6">
        {/* Profile settings */}
        <form onSubmit={handleProfileSave}>
          <div className="mb-4 flex items-center gap-2 font-bold dark:text-white"><UserRound size={18} /> Profile settings</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Name"
            />
            <Input
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          {profileMsg && (
            <p className={`mt-2 text-sm ${profileMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
              {profileMsg.type === 'success' && <Check size={14} className="mr-1 inline" />}
              {profileMsg.text}
            </p>
          )}
          <Button className="mt-4" type="submit" disabled={profileSaving}>
            {profileSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {profileSaving ? 'Saving...' : 'Save profile'}
          </Button>
        </form>

        {/* Change password */}
        <form onSubmit={handlePasswordChange} className="border-t border-slate-200 pt-6 dark:border-slate-800">
          <div className="mb-4 flex items-center gap-2 font-bold dark:text-white"><KeyRound size={18} /> Change password</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {passwordMsg && (
            <p className={`mt-2 text-sm ${passwordMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
              {passwordMsg.type === 'success' && <Check size={14} className="mr-1 inline" />}
              {passwordMsg.text}
            </p>
          )}
          <Button className="mt-4" type="submit" disabled={passwordSaving}>
            {passwordSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {passwordSaving ? 'Updating...' : 'Update password'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
