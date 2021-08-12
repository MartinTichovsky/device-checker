import { createProxy } from "proxy-object-path";

export type Lang = Readonly<{
  card: {
    borrow: string;
  };
  common: {
    os: string;
    vendor: string;
  };
  createDevice: {
    addDevice: string;
    addedInfo: string;
    code: string;
    image: string;
    label: string;
    model: string;
    osVersion: string;
  };
  filter: {
    any: string;
    onlyAvailable: string;
    search: string;
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
  menu: {
    createDevice: string;
    deviceList: string;
  };
}>;

export default createProxy<Lang>();
