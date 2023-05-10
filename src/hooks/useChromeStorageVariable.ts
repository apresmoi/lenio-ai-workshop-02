import { useState, useEffect } from "react";

type SetValue<T> = (newValue: T | ((oldValue: T) => T)) => void;

export function useChromeStorageVariable<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (chrome && chrome.storage) {
      chrome.storage.sync.get(key, (result) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }
        if (result[key] !== undefined) {
          setValue(result[key]);
        }
      });
    }
  }, [key]);

  const updateValue: SetValue<T> = (newValue: T | ((oldValue: T) => T)) => {
    if (chrome && chrome.storage) {
      if (typeof newValue === "function") {
        chrome.storage.sync.get(key, (result) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
          }
          const oldValue =
            result[key] !== undefined ? result[key] : initialValue;
          const updatedValue = (newValue as (oldValue: T) => T)(oldValue);
          chrome.storage.sync.set({ [key]: updatedValue }, () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              return;
            }
            setValue(updatedValue);
          });
        });
      } else {
        chrome.storage.sync.set({ [key]: newValue }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
          }
          setValue(newValue);
        });
      }
    } else {
      setValue(newValue);
    }
  };

  return [value, updateValue];
}
