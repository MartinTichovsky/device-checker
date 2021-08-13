import { render } from "@testing-library/react";
import { RootStore } from "../../stores/root-store";
import { RootStoreProvider, useRootStore } from "../use-root-store";

describe("Root Store Provider", () => {
  it("Should throw an error", () => {
    const Consumer = () => {
      useRootStore();
      return <>content</>;
    };

    console.error = () => {};

    expect(() => {
      render(
        <RootStoreProvider store={undefined as unknown as RootStore}>
          <Consumer />
        </RootStoreProvider>
      );
    }).toThrowError();
  });

  it("Should provide the store", () => {
    const store = new RootStore();
    let consumedStore;

    const Consumer = () => {
      consumedStore = useRootStore();
      return <>content</>;
    };

    render(
      <RootStoreProvider store={store}>
        <Consumer />
      </RootStoreProvider>
    );

    expect(consumedStore).toEqual(store);
  });
});
