"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { useSearch } from "@/hooks/use-search";
import type { SearchChunk } from "@/lib/types";
import { useUploadSampleData } from "@/hooks/upload-sample-data";

interface AppContextType {
  // Search state
  query: string;
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;

  // Product state
  products: SearchChunk[];
  isLoading: boolean;
  error: Error | undefined;

  // Selection state
  isProductSelected: boolean;
  setIsProductSelected: (selected: boolean) => void;

  // Store state
  ingestingFiles: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState(
    "",
  );
  const [isProductSelected, setIsProductSelected] = useState(false);

  const { products, isLoading, error, containsFiles} = useSearch(query);
  // Trigger sample data upload when store has no files yet
  const { isLoading: ingestingFiles } = useUploadSampleData(!containsFiles);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  return (
    <AppContext.Provider
      value={{
        query,
        searchInput,
        setSearchInput,
        handleSearch,
        products,
        isLoading,
        error,
        isProductSelected,
        setIsProductSelected,
        ingestingFiles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
