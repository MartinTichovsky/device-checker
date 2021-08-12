import { JSONSchema7 } from "json-schema";
import { fetchApiWithGlobalCatch, getApiUrl } from "../api";
import { ENDPOINTS } from "../endpoints";
import schema from "../schemas/Phones.json";
import { CommonRequestProps, EditPhone, Phones } from "../types";

type GetPhonesRequestProps = CommonRequestProps<Phones>;

interface CreatePhoneRequestProps extends CommonRequestProps<Phones> {
  body: EditPhone;
}

export const getPhonesRequest = ({ store, ...rest }: GetPhonesRequestProps) => {
  fetchApiWithGlobalCatch<Phones>({
    ...rest,
    fetchProps: {
      method: "GET",
      schema: schema as JSONSchema7
    },
    store,
    url: getApiUrl(ENDPOINTS.PHONES)
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
      body: body as Record<string, unknown>
    },
    store,
    url: getApiUrl(ENDPOINTS.PHONES)
  });
};
