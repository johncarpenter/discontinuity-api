import useSWR from "swr";

const useApiKeys = (slug) => {
  const apiRoute = `/api/workspace/${slug}/apikeys`;
  const { data, error } = useSWR(`${apiRoute}`);
  return {
    ...data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useApiKeys;
