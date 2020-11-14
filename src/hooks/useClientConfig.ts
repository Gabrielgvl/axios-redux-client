import useAxiosContext from '../context/useAxiosContext';
import { configDefault } from '../utils/constants';

const useClientConfig = () => {
  const { useConfiguration, useAxiosHook } = useAxiosContext();
  const config = useConfiguration();
  return { ...configDefault, ...config, useAxiosHook };
};

export default useClientConfig;
