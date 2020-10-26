import { useContext } from 'react';
import { getAxiosContext } from './AxiosContext';

const useAxiosContext = () => useContext(getAxiosContext());

export default useAxiosContext;
