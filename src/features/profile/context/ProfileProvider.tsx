import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { readUser } from '@app/services/localStorage.service';
import { Profile } from '@app/api/profile.api';

interface ProfileContextType {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const defaultProfileContextValue = {
  id: 0,
  username: '',
  full_name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  background_color: '',
  status: 1,
  has_changed_password: 0,
  role: 0,
  last_updated: '',
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const user = readUser();

  const [profile, setProfile] = useState<Profile>(defaultProfileContextValue);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const ProfileProviderValue = {
    profile,
    setProfile,
  };

  return <ProfileContext.Provider value={ProfileProviderValue}>{children}</ProfileContext.Provider>;
};

export default ProfileProvider;
