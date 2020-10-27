import { useContext } from 'react';
import { AxiosContextInterface, getAxiosContext } from './AxiosContext';

const useAxiosContext = ():AxiosContextInterface => useContext(getAxiosContext());

export default useAxiosContext;
