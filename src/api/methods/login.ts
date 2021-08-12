import { JSONSchema7 } from "json-schema";
import { fetchApiWithGlobalCatch, getApiUrl } from "../api";
import { ENDPOINTS } from "../endpoints";
import schema from "../schemas/UserWithToken.json";
import { CommonRequestProps, UserWithToken } from "../types";

interface LoginRequestProps extends CommonRequestProps<UserWithToken> {
	login: string;
	password: string;
}

export const loginRequest = ({
	login,
	password,
	store,
	...rest
}: LoginRequestProps) => {
	fetchApiWithGlobalCatch<UserWithToken>({
		...rest,
		fetchProps: {
			body: {
				login,
				password,
			},
			method: "POST",
			schema: schema as JSONSchema7,
		},
		store,
		url: getApiUrl(ENDPOINTS.LOGIN),
		useAuthToken: false,
	});
};
