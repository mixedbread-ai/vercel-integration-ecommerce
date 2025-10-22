import { useState } from "react";

export function useSelection() {
  const [isProductSelected, setIsProductSelected] = useState(false);

  return {
    isProductSelected,
    setIsProductSelected,
  };
}
