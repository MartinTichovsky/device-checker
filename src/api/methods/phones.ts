import { getApiUrl, fetchApiWithGlobalCatch } from "../api";
import schema from "../schemas/Phones.json";
import { JSONSchema7 } from "json-schema";
import { Phones } from "../types";
import { RootStore } from "../../stores/root-store";
import { ENDPOINTS } from "../endpoints";

interface GetPhonesRequestProps {
  onFinally?: () => void;
  onSuccess: (response: Phones | undefined) => void;
  store: RootStore;
}

export const getPhonesRequest = ({
  onFinally,
  onSuccess,
  store,
}: GetPhonesRequestProps) => {
  fetchApiWithGlobalCatch<Phones>(
    getApiUrl(ENDPOINTS.PHONES),
    {
      headers: {
        "Auth-Token": store.user?.token || "",
      },
      method: "GET",
      schema: schema as JSONSchema7,
    },
    store.notificationStore
  )
    .then((response) => {
      onSuccess(response);
    })
    .finally(() => {
      if (onFinally) {
        onFinally();
      }
    });
};
