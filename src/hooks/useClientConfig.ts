import useAxiosContext from '../context/useAxiosContext';
import { configDefault } from '../utils/constants';

const useClientConfig = () => {
  const { useConfiguration } = useAxiosContext();
  const config = useConfiguration();
  return { ...configDefault, ...config };
};

export default useClientConfig;
