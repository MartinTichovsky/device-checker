import { JSONSchema7 } from "json-schema";
import { consoleLog } from "../utils/console";
import { Validator } from "../utils/validator";
import { ENDPOINTS } from "./endpoints";
import { CommonRequestProps } from "./types";

interface FetchProps {
  body?: Record<string, unknown>;
  headers?: RequestInit["headers"];
  method: RequestInit["method"];
  schema?: JSONSchema7;
}

export const fetchApi = async <T>(
  url: string,
  { body, headers, method, schema }: FetchProps
): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const responseBody = await response.json();

  if (response.status >= 200 && response.status < 400) {
    if (schema) {
      validateResponse(schema, responseBody);
    }

    return responseBody as T;
  } else {
    throw responseBody?.error || response.statusText;
  }
};

interface ApiWithGlobalCatchProps<T> extends CommonRequestProps<T> {
  fetchProps: FetchProps;
  url: string;
  useAuthToken?: boolean;
}

export const fetchApiWithGlobalCatch = <T>({
  fetchProps,
  store,
  onError,
  onFinally,
  onSuccess,
  url,
  useAuthToken = true
}: ApiWithGlobalCatchProps<T>) => {
  try {
    fetchApi<T>(url, {
      ...fetchProps,
      headers: {
        ...fetchProps?.headers,
        ...(useAuthToken && { "Auth-Token": store.user?.token || "" })
      }
    })
      .then((response) => {
        onSuccess(response);
      })
      .finally(() => {
        if (onFinally) {
          onFinally();
        }
      })
      .catch(() => {
        if (onError) {
          onError();
        }
      });
  } catch (e) {
    if (onError) {
      onError();
    }

    // TODO: make error messages user friendly
    store.notificationStore.addNotification({
      color: "error",
      message: typeof e !== "string" ? e.toString() : e,
      severity: "error"
    });
  }
};

export const getApiUrl = (endpoint: ENDPOINTS) =>
  `${process.env.REACT_APP_API_URL}${endpoint}`;

const validateResponse = <T>(schema: JSONSchema7, data: T) => {
  const validator = new Validator(schema, data);
  if (!validator.validate()) {
    consoleLog(validator.errors);
    throw new Error("Response is not valid");
  }
};
