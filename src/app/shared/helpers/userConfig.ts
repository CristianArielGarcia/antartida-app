import { IAuthResponse } from "../../models/IAuthResponse";

export let AUTH_TOKEN = "";
export const SetTokenUserInformation = (information: string) => {
	AUTH_TOKEN = information;
	localStorage.setItem("Token", AUTH_TOKEN);
};
export const SetInfoUser = (info: IAuthResponse) => {
	localStorage.setItem(
		"InfoUser",
		JSON.stringify({ username: info.username, id: info.id, dni: info.dni })
	);
};
export const GetInfoUser = () => {
	return JSON.parse(localStorage.getItem("InfoUser") || '{}');
};
export const LogOutUser = () => {
	localStorage.removeItem("Token");
	localStorage.removeItem("InfoUser");
};
export const TokenUserInfomation = () => {
	if (AUTH_TOKEN?.length < 2) {
		// AUTH_TOKEN = localStorage.getItem("Token");
        AUTH_TOKEN = "aca lo saco del locale storage"
	}
	return { AUTH_TOKEN };
};
