import { TypeEnum, UserWithToken } from "../../api/types";
import { RootStore } from "../root-store";

jest.mock("mobx-persist-store", () => ({
  makePersistable: async () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}));

describe("Root Store", () => {
  const store = new RootStore();

  it("Defaults", () => {
    expect(store.isAuthorized).toBeFalsy();
    expect(store.isUserAdmin).toBeFalsy();
    expect(store.user).toBeNull();
    expect(store.isPersisted).toBeFalsy();
    jest.resetAllMocks();
  });

  it("Reference", () => {
    const incorrectRef = undefined as unknown as React.RefObject<HTMLElement>;
    store.setLoadingRef(incorrectRef);
    store.showLoading();
    expect(store["loadingRef"]).toEqual(incorrectRef);
    store.hideLoading();
    expect(store["loadingRef"]).toEqual(incorrectRef);

    const correctRef = {
      current: { style: { display: "" } }
    } as React.RefObject<HTMLElement>;
    store.setLoadingRef(correctRef);
    store.showLoading();
    expect(correctRef.current?.style.display).toBe("block");
    store.hideLoading();
    expect(correctRef.current?.style.display).toBe("none");
  });

  it("User", () => {
    const user: UserWithToken = {
      id: "id",
      type: TypeEnum.User,
      login: "login",
      name: "name",
      token: "token"
    };
    store.setUser(user);
    expect(store.user).toEqual(user);
    expect(store.isUserAdmin).toBeFalsy();

    store.setUser({
      id: "id",
      type: TypeEnum.Admin,
      login: "login",
      name: "name",
      token: "token"
    });
    expect(store.isUserAdmin).toBeTruthy();
  });
});
