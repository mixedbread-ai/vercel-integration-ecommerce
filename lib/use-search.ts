import useSWR from "swr";
import type { SearchResponse } from "./search";

const fetcher = async (url: string): Promise<SearchResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  return res.json();
};

export function useSearch(query: string) {
  const { data, error, isLoading } = useSWR<SearchResponse>(
    query ? `/api/search?q=${encodeURIComponent(query)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  return {
    products: data?.results || [],
    isLoading,
    error,
  };
}
