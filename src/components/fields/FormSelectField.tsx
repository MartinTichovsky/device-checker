import { FormHelperText, InputLabel } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SelectStyled } from "./FormSelectField.styles";
import { FormFieldProps, FormStore } from "./types";

interface OwnProps<T, State extends FormStore<T>>
  extends FormFieldProps<
    T,
    State,
    React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  > {
  options: JSX.Element[];
}

export const FormSelectField = <T, State extends FormStore<T>>({
  fieldKey,
  label,
  onChange,
  options,
  requiredFields,
  state,
}: OwnProps<T, State>) => {
  const { t } = useTranslation();

  // TODO: fix the casting
  const error =
    state.errors.includes(fieldKey) &&
    (!state.values[fieldKey] ||
      (typeof state.values[fieldKey] === "string" &&
        !(state.values[fieldKey] as unknown as string)?.trim()));

  const id = `create-device-${fieldKey}-label`;

  return (
    <span>
      <InputLabel shrink={true} htmlFor={id}>
        {label}
      </InputLabel>
      <SelectStyled
        error={error}
        labelId={id}
        onChange={onChange}
        required={requiredFields.includes(fieldKey)}
        value={state.values[fieldKey] || ""}
      >
        {options}
      </SelectStyled>
      {error && (
        <FormHelperText className="Mui-required">Required</FormHelperText>
      )}
    </span>
  );
};