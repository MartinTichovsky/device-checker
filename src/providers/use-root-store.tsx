import React from "react";
import { RootStore } from "../stores/root-store";

export const rootStoreContext = React.createContext<RootStore | undefined>(
	undefined
);

type RootStoreProviderProps = React.PropsWithChildren<{
	readonly store: RootStore;
}>;

export function RootStoreProvider(props: RootStoreProviderProps) {
	const { children, store } = props;

	return (
		<rootStoreContext.Provider value={store}>
			{children}
		</rootStoreContext.Provider>
	);
}

export function useRootStore() {
	const store = React.useContext(rootStoreContext);

	if (!store) {
		throw new Error("RootStore not available!");
	}

	return store;
}
