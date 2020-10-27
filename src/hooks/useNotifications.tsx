/* eslint-disable no-bitwise */
import useAxiosContext from '../context/useAxiosContext';
import useWriteCache from './useWriteCache';
import useReadCache from './useReadCache';

const createUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const useNotifications = () => {
  const { addOne, removeAll } = useWriteCache('_notification');
  const { selectedAll } = useReadCache('_notification');
  const { slices } = useAxiosContext();

  const addNotification = (notification) => {
    if (slices && slices._notification) {
      const newNotification = notification;
      if (!newNotification.id) {
        newNotification.id = createUUID();
      }
      addOne(newNotification);
    }
  };

  return { notifications: selectedAll, addNotification, clearNotifications: removeAll };
};

export default useNotifications;
