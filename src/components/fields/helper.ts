import { FormStore } from "./types";

export const setFormValue = <T, State extends FormStore<T>>(
  setState: React.Dispatch<React.SetStateAction<State>>,
  key: keyof T,
  value: string
) => {
  setState((prevState) => ({
    ...prevState,
    values: {
      ...prevState.values,
      [key]: value
    }
  }));
};

export const validateFields = <T extends { [key in keyof T]: string }>(
  values: T,
  requiredFields: (keyof T)[]
) => {
  const keys = Object.keys(values) as (keyof T)[];

  return requiredFields.filter(
    (field) =>
      !(keys.includes(field) && field in values && values[field]?.trim())
  );
};
