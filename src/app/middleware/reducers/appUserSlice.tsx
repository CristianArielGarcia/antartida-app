import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAppUser } from "app/models/IAppUser";
import { IAuthRequest } from "app/models/IAuthRequest";
import { IAuthResponse } from "app/models/IAuthResponse";
import { IIniState } from "app/models/IInitState";
import { AppUserService } from "app/services/appUser.service";
import { errorNotification } from "../helperMiddleware/errorNotifications";

//<IAuth, IAuthUser>
const appUserService = new AppUserService();

class AppUserClassSlice {
	constructor(private service: AppUserService) {}
	LoginUser = createAsyncThunk<IAppUser, IAuthRequest>(
		// `User/Authenticate`,
		`User/Login`,

		async (modelo, info) => {
			return await errorNotification(() => this.service.LoginUser(modelo), info);
		}
	);
	getInfoUserById = createAsyncThunk<IAppUser, number>(
		`User/getInfoUserById/`,

		async (modelo, info) => {
			return await errorNotification(() => this.service.getInfoUserById(modelo), info);
		}
	);
	getInfoUserByDni = createAsyncThunk<IAppUser, number>(
		`User/getInfoUserByDni`,

		async (modelo, info) => {
			return await errorNotification(() => this.service.getInfoUserByDni(modelo), info);
		}
	);

	registerRequest = createAsyncThunk<IAppUser, IAppUser>(
		`User/create`,

		async (modelo, info) => {
			return await errorNotification(() => this.service.registerRequest(modelo), info);
		}
	);
}
export const AppUserSliceRequests = new AppUserClassSlice(appUserService);

const initialState: IIniState<IAppUser> = {
	loading: null,
	data: null,
};

export const appUserSlice = createSlice({
	name: "AppUser",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(AppUserSliceRequests.LoginUser.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(AppUserSliceRequests.LoginUser.rejected, (state, action) => {
			state.loading = "rejected";
		});
		builder.addCase(AppUserSliceRequests.getInfoUserById.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(AppUserSliceRequests.getInfoUserById.rejected, (state, action) => {
			state.loading = "rejected";
		});
		//Nuevos slices que no heredan de generic
		builder.addCase(AppUserSliceRequests.getInfoUserByDni.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(AppUserSliceRequests.getInfoUserByDni.rejected, (state, action) => {
			state.loading = "rejected";
		});
		builder.addCase(AppUserSliceRequests.registerRequest.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(AppUserSliceRequests.registerRequest.rejected, (state, action) => {
			state.loading = "rejected";
		});
	},
});
