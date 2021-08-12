import { createProxy } from "proxy-object-path";

export type Lang = Readonly<{
  card: {
    borrow: string;
  };
  filter: {
    any: string;
    onlyAvailable: string;
    os: string;
    search: string;
    vendor: string;
  };
  general: {
    noResults: string;
  };
  login: {
    formButtonLogin: string;
    formInputLogin: string;
    formInputPassword: string;
    label: string;
    info: string;
  };
  logout: {
    label: string;
  };
}>;

export default createProxy<Lang>();
