import { useEffect, useState, Dispatch, SetStateAction } from "react";

// check if the code is running on the server or in the browser
const isServer = typeof window === "undefined";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => initialValue);

  // function to initialize the state by reading from local storage
  const initialize = (): T => {
    if (isServer) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  };

  // prevents hydration error so that state is only initialized after the server is defined
  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<T>> = (value: SetStateAction<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? (value as Function)(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
