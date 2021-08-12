import { i18ObjectPath } from "proxy-object-path";
import { useTranslation } from "react-i18next";
import lang from "../../translations/lang";
import { TextFieldStyled } from "./TextField.styles";
import { FormFieldProps, FormStore } from "./types";

type OwnProps<T, State extends FormStore<T>> = FormFieldProps<
  T,
  State,
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
>;

export const FormTextField = <T, State extends FormStore<T>>({
  fieldKey,
  label,
  onChange,
  requiredFields,
  state
}: OwnProps<T, State>) => {
  const { t } = useTranslation();

  // TODO: fix the casting
  const error =
    state.errors.includes(fieldKey) &&
    (!state.values[fieldKey] ||
      (typeof state.values[fieldKey] === "string" &&
        !(state.values[fieldKey] as unknown as string)?.trim()));

  return (
    <TextFieldStyled
      error={error}
      helperText={error && t(i18ObjectPath(lang.general.required))}
      label={label}
      onChange={onChange}
      required={requiredFields.includes(fieldKey)}
      value={state.values[fieldKey] || ""}
    />
  );
};
