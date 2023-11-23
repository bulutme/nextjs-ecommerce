import { useState, Dispatch, SetStateAction } from "react";

type ReturnValue<T> = [T, Dispatch<SetStateAction<T>>];

const useLocalStorage = <T>(key: string, initialValue: T): ReturnValue<T> => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue !== null ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  const setStoredValue: Dispatch<SetStateAction<T>> = (newValue) => {
    setValue((prevValue) => {
      const updatedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(prevValue)
          : newValue;
      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    });
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
