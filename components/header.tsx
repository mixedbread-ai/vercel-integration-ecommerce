"use client";

import { Search, SendHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/app-context";
import mixedbreadLogo from "@/public/mixedbread_logo.svg";
import vercelLogo from "@/public/vercel_logo.svg";

export function Header() {
  const { searchInput, setSearchInput, handleSearch } = useApp();

  return (
    <header className="w-full border-b">
      <div className="flex w-full flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4">
        <div className="flex items-center justify-end gap-2 sm:order-2 sm:gap-3">
          <Image
            className="h-4 w-auto sm:h-5"
            src={vercelLogo}
            alt="Vercel logo"
            width={88}
            height={24}
            priority
          />
          <span className="text-xs text-muted-foreground sm:text-sm">/</span>
          <Image
            className="h-4 w-auto sm:h-5"
            src={mixedbreadLogo}
            alt="Mixedbread logo"
            width={88}
            height={24}
            priority
          />
        </div>

        <form
          onSubmit={handleSearch}
          className="flex w-full gap-2 sm:order-1 sm:max-w-xl"
        >
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for clothing..."
              className="h-8 pl-10 font-semibold"
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
          >
            <SendHorizontal className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </header>
  );
}
