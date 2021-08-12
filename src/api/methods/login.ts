import { getApiUrl, fetchApiWithGlobalCatch } from "../api";
import schema from "../schemas/UserWithToken.json";
import { JSONSchema7 } from "json-schema";
import { UserWithToken } from "../types";
import { RootStore } from "../../stores/root-store";
import { ENDPOINTS } from "../endpoints";

interface LoginRequestProps {
  login: string;
  onFinally?: () => void;
  onSuccess: (response: UserWithToken | undefined) => void;
  password: string;
  store: RootStore;
}

export const loginRequest = ({
  login,
  onFinally,
  onSuccess,
  password,
  store,
}: LoginRequestProps) => {
  fetchApiWithGlobalCatch<UserWithToken>(
    getApiUrl(ENDPOINTS.LOGIN),
    {
      body: {
        login,
        password,
      },
      method: "POST",
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
