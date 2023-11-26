// a pure function to generate a short random id
export const generateShortId = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";

  for (let i = 0; i < length; i++) {
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    shortId += randomCharacter;
  }

  return shortId;
};

// a pure function to create a delayed action using Promise
export const createDelayedAction = <T>(
  action: () => T,
  delay: number
): Promise<T> => {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      const result = action();
      resolve(result);
    }, delay);
  });
};

// function to create a debounced version of a callback function
export const createDebouncedFunction = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default createDebouncedFunction;
