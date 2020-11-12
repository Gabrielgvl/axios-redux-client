import useAxios from './hooks/useAxios';

const Test = () => {
  const [, refetch] = useAxios();

  async function teste() {
    await refetch({ data: { 1: 2 } });
  }
};
