import { useState } from 'react';

export function useForm<T>(initialState: T): [T, (key: string, value: string) => void] {
  const [formValues, setForm] = useState<T>(initialState);

  const setFormValues = (key: string, value: string) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  return [formValues, setFormValues];
}
