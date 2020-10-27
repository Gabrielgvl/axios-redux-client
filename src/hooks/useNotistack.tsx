import { useSnackbar } from 'notistack';

/**
 * Hook para utilizar as variações das SnackBars
 */
export default function useNotistack() {
  const { enqueueSnackbar } = useSnackbar();

  const successSnack = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  const errorSnack = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const infoSnack = (message: string) => {
    enqueueSnackbar(message, { variant: 'info' });
  };

  const warnSnack = (message: string) => {
    enqueueSnackbar(message, { variant: 'warning' });
  };

  const snack = (message: string) => {
    enqueueSnackbar(message);
  };

  const persistSnack = (
    message: string,
    variant: 'success' | 'error' | 'info' | 'warning',
  ) => {
    enqueueSnackbar(message, { variant, persist: true });
  };

  return {
    successSnack,
    errorSnack,
    infoSnack,
    warnSnack,
    snack,
    persistSnack,
  };
}
