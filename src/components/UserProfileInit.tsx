import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createUserProfile, getUserProfile } from '@/services/firestore';

export const UserProfileInit: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    const initProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          // Only auto-create profile if it doesn't exist (for legacy users)
          // New users will have profile created during registration
          if (!profile) {
            await createUserProfile(user.uid, user.email || '', 'User', 'Account');
          }
        } catch (error) {
          console.error('Error initializing user profile:', error);
        }
      }
    };

    initProfile();
  }, [user]);

  return null;
};
