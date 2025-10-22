import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 16 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5 lg:gap-4">
      {
        Array.from({ length: count }).map((_, i) => (
          <ProductSkeleton key={`product-skeleton-${i + 1}`} />
        )) as React.ReactNode[]
      }
    </div>
  );
}
