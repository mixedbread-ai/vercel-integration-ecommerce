"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-skeleton";
import { useApp } from "@/contexts/app-context";

export default function App() {
  const { isProductSelected, products, isLoading, error, ingestingFiles } =
    useApp();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
      <motion.div
        animate={{ opacity: isProductSelected ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Header />
      </motion.div>

      <div className="flex w-full flex-1 flex-col px-5">
        <main className="flex flex-1 flex-col">
          <div className="py-8">
            {error ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-destructive">
                  Failed to load products. Please try again.
                </p>
              </div>
            ) : isLoading ? (
              <ProductGridSkeleton />
            ) : (
              <ProductGrid
                products={products}
                ingestingFiles={ingestingFiles}
              />
            )}
          </div>
        </main>

        <motion.footer
          animate={{ opacity: isProductSelected ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-3 border-t py-8"
        >
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              className="text-xs tracking-tight opacity-70 transition-opacity duration-200 hover:opacity-100 sm:text-sm"
              href="https://www.mixedbread.com"
              target="_blank"
            >
              Mixedbread
            </Link>
            <Link
              className="text-xs tracking-tight opacity-70 transition-opacity duration-200 hover:opacity-100 sm:text-sm"
              href="https://www.mixedbread.com/docs"
              target="_blank"
            >
              Docs
            </Link>
            <Link
              className="text-xs tracking-tight opacity-70 transition-opacity duration-200 hover:opacity-100 sm:text-sm"
              href="https://discord.gg/fCpaq2dr"
              target="_blank"
            >
              Discord
            </Link>
          </ul>
        </motion.footer>
      </div>
    </div>
  );
}
