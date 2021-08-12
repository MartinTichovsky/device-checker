import { getApiUrl, fetchApiWithGlobalCatch } from "../api";
import schema from "../schemas/Phones.json";
import { JSONSchema7 } from "json-schema";
import { CommonRequestProps, EditPhone, Phones } from "../types";
import { ENDPOINTS } from "../endpoints";

type GetPhonesRequestProps = CommonRequestProps<Phones>;

interface CreatePhoneRequestProps extends CommonRequestProps<Phones> {
  body: EditPhone;
}

export const getPhonesRequest = ({ store, ...rest }: GetPhonesRequestProps) => {
  fetchApiWithGlobalCatch<Phones>({
    ...rest,
    fetchProps: {
      method: "GET",
      schema: schema as JSONSchema7,
    },
    store,
    url: getApiUrl(ENDPOINTS.PHONES),
  });
};

export const createPhoneRequest = ({
  body,
  store,
  ...rest
}: CreatePhoneRequestProps) => {
  fetchApiWithGlobalCatch<Phones>({
    ...rest,
    fetchProps: {
      method: "POST",
      body: body as Record<string, unknown>,
    },
    store,
    url: getApiUrl(ENDPOINTS.PHONES),
  });
};
