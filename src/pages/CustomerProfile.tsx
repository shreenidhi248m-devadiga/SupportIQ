import React, { useState } from 'react';
import UserLayout from '../components/customer/UserLayout';
import { User, Mail, Phone, ShieldCheck, CheckCircle2, Edit2, Save, X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import userApi from '../services/userApi';

export const CustomerProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      // Simulate API call to update profile
      const updatedUser = await userApi.updateProfile({ name, phone });
      
      // Update the AuthContext user
      updateUser({ ...user, name: updatedUser.name, phone: updatedUser.phone } as any);
      
      setIsEditing(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
    setIsEditing(false);
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#102A56] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
              <User className="w-6 h-6 text-[#2563EB]" />
              Customer Profile
            </h1>
            <p className="text-xs text-gray-600 dark:text-[#A8B3C7] mt-1">View and manage your personal account settings.</p>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] text-[#102A56] dark:text-[#F8FAFC] text-xs font-bold rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors shadow-sm"
            >
              <Edit2 className="w-3.5 h-3.5 text-[#2563EB]" /> Edit Profile
            </button>
          )}
        </div>

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
          </div>
        )}

        <div className="p-8 rounded-3xl bg-white dark:bg-[#0D1428] border border-[#E5E7EB] dark:border-[#111A33] shadow-xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-2xl shadow-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#102A56] dark:text-[#F8FAFC]">{user?.name}</h2>
                <p className="text-xs font-mono text-[#2563EB] dark:text-brand-cyan">Verified Customer Account</p>
              </div>
            </div>
            
            {isEditing && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                  title="Cancel"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || (!name.trim())}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl transition-colors shadow-md disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E5E7EB] dark:border-[#111A33] font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] space-y-1 transition-all focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/20">
              <span className="text-gray-500 dark:text-[#A8B3C7] text-[10px] uppercase">Full Name</span>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none outline-none font-bold text-[#102A56] dark:text-[#F8FAFC] text-sm p-0 focus:ring-0"
                  placeholder="Your Full Name"
                />
              ) : (
                <p className="font-bold text-[#102A56] dark:text-[#F8FAFC] text-sm">{user?.name}</p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] space-y-1">
              <span className="text-gray-500 dark:text-[#A8B3C7] text-[10px] uppercase">Email Address (Non-editable)</span>
              <p className="font-bold text-[#102A56] dark:text-[#F8FAFC] text-sm opacity-80">{user?.email}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] space-y-1 transition-all focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/20">
              <span className="text-gray-500 dark:text-[#A8B3C7] text-[10px] uppercase">Phone Number</span>
              {isEditing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border-none outline-none font-bold text-[#102A56] dark:text-[#F8FAFC] text-sm p-0 focus:ring-0"
                  placeholder="+1 (555) 000-0000"
                />
              ) : (
                <p className="font-bold text-[#102A56] dark:text-[#F8FAFC] text-sm">{user?.phone || 'Not provided'}</p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] space-y-1">
              <span className="text-gray-500 dark:text-[#A8B3C7] text-[10px] uppercase">Account Role</span>
              <p className="font-bold text-[#2563EB] dark:text-emerald-400 text-sm uppercase">Customer</p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CustomerProfile;
