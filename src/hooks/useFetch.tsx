import { useEffect, useState } from "react"

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true)
        const res = await fetch(url, { signal: abortController.signal });
        const data = await res.json();
        setData(data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('fetch aborted');
          return;
        }
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      abortController.abort()
    }
  }, [url]);
  return { data, loading, error }

}