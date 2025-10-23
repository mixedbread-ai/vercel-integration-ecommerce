import useSWR, { mutate } from "swr";

const uploadSampleDataFetcher = async (url: string): Promise<void> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to upload sample data");
  }
  return res.json();
};

export function useUploadSampleData(enabled: boolean) {
  const { error, isLoading } = useSWR<void>(
    enabled ? `/api/upload_sample_files` : null,
    uploadSampleDataFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      onSuccess: () => {
        // Refresh store state and any existing search queries once upload finishes
        mutate(`/api/contains_files`);
        mutate(
          (key) => typeof key === "string" && key.startsWith(`/api/search`),
        );
      },
    },
  );

  return {
    isLoading,
    error,
  };
}
