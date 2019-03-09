import { useEffect, useState } from 'react';

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export function useThrottle(value: any, delay: number) {
  const [isWaiting, setWaiting] = useState(false);
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    setWaiting(true);
    const handler = setTimeout(() => {
      setThrottledValue(value);
      setWaiting(false);
    }, delay);
    return () => clearTimeout(handler);
  }, [value]);

  return isWaiting ? throttledValue : value;
}
