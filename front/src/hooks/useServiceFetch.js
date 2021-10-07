import { useCallback, useEffect, useState } from "react";

const useServiceFetch = ({service, params = []}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await service(...params);
      if(res.error) {
        setError(res.error);
      } else {
        setData(res);
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return {data, error, isLoading, refetch: fetchData};
}

export default useServiceFetch;