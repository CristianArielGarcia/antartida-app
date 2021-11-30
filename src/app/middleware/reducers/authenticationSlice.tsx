
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetInfoUser, LogOutUser, TokenUserInfomation } from "../../shared/helpers/userConfig";
//<IAuth, IAuthUser>
interface authNeded {
	AUTH_TOKEN: string;
	username: string;
	id: number;
	dni: number;
}

const AuthenticateState = {
	data: {
		AUTH_TOKEN: "",
		username: "",
		id: 0,
		dni: 0,
	},
};
const information = () => {
	if (TokenUserInfomation().AUTH_TOKEN) {
		const info = GetInfoUser();
		return {
			data: {
				AUTH_TOKEN: TokenUserInfomation().AUTH_TOKEN,
				dni: info.dni,
				username: info.username,
				id: info.id,
			},
		};
	} else return AuthenticateState;
};

export const authenticationSlice = createSlice({
	name: "Authentication",
	initialState: information(),
	reducers: {
		SetInfoUser: (state, action: PayloadAction<authNeded>) => {
			state.data.AUTH_TOKEN = action.payload.AUTH_TOKEN;
			state.data.username = action.payload.username;
			state.data.id = action.payload.id;
			state.data.dni = action.payload.dni;
		},
		deleteInfoUser: (state) => {
			state.data = AuthenticateState.data;
		},
		ForceLogOut: (state) => {
			state.data = AuthenticateState.data;
			LogOutUser();
		},
	},
});
