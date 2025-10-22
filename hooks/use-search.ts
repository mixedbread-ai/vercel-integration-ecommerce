import useSWR from "swr";
import type { ContainsFilesResponse, SearchResponse } from "@/lib/types";

const searchFetcher = async (url: string): Promise<SearchResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  return res.json();
};

const containsFilesFetcher = async (url: string): Promise<ContainsFilesResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch contains files data");
  }
  return res.json();
};

export function useSearch(query: string) {
  const { data, error, isLoading } = useSWR<SearchResponse>(
    query ? `/api/search?q=${encodeURIComponent(query)}` : null,
    searchFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  const products = data?.results || [];
  let containsFiles = true;
  const { data: containsFilesData, error: containsFilesError, isLoading: containsFilesLoading } = useSWR<ContainsFilesResponse>(
    `/api/contains_files`,
    containsFilesFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );
  containsFiles = containsFilesData?.containsFiles ?? true;

  return {
    products,
    isLoading,
    error,
    containsFiles,
  };
}
