import { useQuery } from 'react-query';
import { getProfile } from '@app/api/profile.api';

export const useGetProfile = (enabled = false) => {
  return useQuery(
    'Profile',
    async () => {
      const profileData = await getProfile();
      return { ...profileData?.data };
    },
    {
      enabled,
    },
  );
};
