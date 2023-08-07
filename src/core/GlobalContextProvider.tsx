import ProfileProvider from '@app/features/profile/context/ProfileProvider';
import combineProviders from '@app/utils/combineProviders';

const GlobalProviders = combineProviders([ProfileProvider]);

/**
 * GlobalContextProvider is component like CombineReducer but for Context Provider;\
 */
const GlobalContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <GlobalProviders>{children}</GlobalProviders>;
};

export default GlobalContextProvider;
