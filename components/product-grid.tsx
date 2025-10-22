"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useApp } from "@/contexts/app-context";
import type { SearchChunk } from "@/lib/types";

interface ProductGridProps {
  products: SearchChunk[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { setIsProductSelected } = useApp();

  const handleSelect = (id: string | null) => {
    setSelected(id);
    setIsProductSelected(id !== null);
  };

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">No products found</p>
      </div>
    );
  }

  const selectedProduct = products.find(
    (p) => (p.metadata?.filename || "product") === selected,
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const productId = product.metadata?.filename || "product";

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
                    alt={product.metadata?.name || "Product"}
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
                <h3 className="text-sm leading-tight font-semibold">
                  {product.metadata?.name || "Unnamed Product"}
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
                  alt={selectedProduct.metadata?.name || "Product"}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-2 px-4"
              >
                <h2 className="text-2xl font-semibold leading-tight">
                  {selectedProduct.metadata?.name || "Unnamed Product"}
                </h2>
                {selectedProduct.metadata?.description && (
                  <p className="text-sm text-muted-foreground max-w-xl">
                    {selectedProduct.metadata.description}
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
