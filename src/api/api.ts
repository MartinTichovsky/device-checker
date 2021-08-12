import { JSONSchema7 } from "json-schema";
import { NotificationStore } from "../stores/notifiction-store";
import { consoleLog } from "../utils/console";
import { Validator } from "../utils/validator";
import { ENDPOINTS } from "./endpoints";

interface Props {
  body?: Record<string, unknown>;
  headers?: RequestInit["headers"];
  method: RequestInit["method"];
  schema?: JSONSchema7;
}

export const fetchApi = async <T>(
  url: string,
  { body, headers, method, schema }: Props
): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
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

export const fetchApiWithGlobalCatch = async <T>(
  url: string,
  props: Props,
  notificationStore: NotificationStore
): Promise<T | undefined> => {
  try {
    return await fetchApi<T>(url, props);
  } catch (e) {
    // TODO: make error messages user friendly
    notificationStore.addNotification({
      color: "error",
      message: typeof e !== "string" ? e.toString() : e,
      severity: "error",
    });
  }
};

export const getApiUrl = (endpoint: ENDPOINTS) =>
  `${process.env.REACT_APP_API_URL}${endpoint}`;

const validateResponse = <T>(schema: JSONSchema7, data: T) => {
  const validator = new Validator(schema, data);
  if (!validator.validate()) {
    consoleLog(validator.errors);
    throw "Response is not valid";
  }
};
