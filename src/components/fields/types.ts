export interface FormStore<T> {
  errors: (keyof T)[];
  values: T;
}

export interface FormFieldProps<T, State extends FormStore<T>, Event> {
  fieldKey: keyof T;
  label: string;
  onChange: (event: Event) => void;
  requiredFields: (keyof T)[];
  state: State;
}
