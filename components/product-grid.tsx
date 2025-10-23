"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "@/contexts/app-context";
import type { SearchChunk } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button";

interface ProductGridProps {
  products: SearchChunk[];
  ingestingFiles: boolean;
}

export function ProductGrid({ products, ingestingFiles }: ProductGridProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { setIsProductSelected } = useApp();

  const handleSelect = (id: string | null) => {
    setSelected(id);
    setIsProductSelected(id !== null);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleSelect is stable dependency
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected) {
        handleSelect(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selected]);

  if (ingestingFiles) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Ingesting files...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">No items found</p>
      </div>
    );
  }

  const selectedProduct = products.find(
    (p) => (p.metadata?.filename || p.generated_metadata?.filename || "product") === selected,
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5 lg:gap-4">
        {products.map((product) => {
          const productId = product.metadata?.filename || product.generated_metadata?.filename || "product";

          return (
            <motion.div
              key={productId}
              className="space-y-3"
              animate={{ opacity: selected ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                layoutId={productId}
                className="aspect-square overflow-hidden rounded-lg border bg-transparent cursor-pointer"
                onClick={() => handleSelect(productId)}
              >
                {product.image_url?.url ? (
                  <img
                    src={product.image_url.url}
                    alt={product.metadata?.name || product.generated_metadata?.name || "Product"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="text-xs text-muted-foreground">
                      No image
                    </span>
                  </div>
                )}
              </motion.div>
              <div className="space-y-1 text-center">
                <h3 className="text-sm leading-tight">
                  {product.metadata?.name || product.generated_metadata?.name || "Unnamed Product"}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && selectedProduct?.image_url?.url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            onClick={() => handleSelect(null)}
          >
            <div className="flex flex-col items-center gap-4 max-w-3xl px-4 py-8">
              <motion.div
                layoutId={selected}
                className="relative w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] sm:w-[75vw] sm:h-[75vw] md:w-[60vw] md:h-[60vw] lg:w-[500px] lg:h-[500px] rounded-lg overflow-hidden border"
              >
                <img
                  src={selectedProduct.image_url.url}
                  alt={selectedProduct.metadata?.name || selectedProduct.generated_metadata?.name || "Product"}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-2 px-4 leading-tight"
              >
                <h2 className="text-2xl">
                  {selectedProduct.metadata?.name || selectedProduct.generated_metadata?.name || "Unnamed Product"}
                </h2>
                {(selectedProduct.metadata?.description || selectedProduct.generated_metadata?.description) && (
                  <p className="text-sm text-muted-foreground max-w-xl">
                    {selectedProduct.metadata?.description || selectedProduct.generated_metadata?.description || "No description"}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
