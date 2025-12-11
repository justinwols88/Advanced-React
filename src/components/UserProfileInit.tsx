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
          if (!profile) {
            await createUserProfile(user.uid, user.email || '');
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
