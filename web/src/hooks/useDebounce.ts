import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 800): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handleDebounce);
  }, [value, delay]);

  return debouncedValue;
};
