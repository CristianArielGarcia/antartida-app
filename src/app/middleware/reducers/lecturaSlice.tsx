import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIniState } from "app/models/IInitState";
import { ILectura } from "app/models/ILectura";
import { LecturaService } from "app/services/lectura.service";
import { errorNotification } from "../helperMiddleware/errorNotifications";

//<IAuth, IAuthUser>
const lecturaService = new LecturaService();

interface prop {
	modeloA: string;
	modeloB: string;
}

interface lecturasProp {
	fecha: string;
}

class LecturaClassSlice {
	constructor(private service: LecturaService) {}
	getAllLecturasRequest = createAsyncThunk<ILectura[], prop>(
		`Lectura/GetAllLecturas`,
		async (modelo, info) => {
			return await errorNotification(
				() =>
					this.service.getAllLecturasRequest(
						modelo.modeloA,
						modelo.modeloB
					),
				info
			);
		}
	);
	getLecturaByIdRequest = createAsyncThunk<ILectura, number>(
		`Lectura/GetLecturaById`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getLecturaByIdRequest(modelo),
				info
			);
		}
	);
	getLecturaBySensorRequest = createAsyncThunk<ILectura[], number>(
		`Lectura/by-sensor`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getLecturaBySensorRequest(modelo),
				info
			);
		}
	);
	getAllLecturasByFechaRequest = createAsyncThunk<
		ILectura[],
		lecturasProp
	>(`Lectura/GetAllByFecha`, async (modelo, info) => {
		return await errorNotification(
			() =>
				this.service.getAllLecturasByFechaRequest(
					modelo.fecha
				),
			info
		);
	});
	getAllRequest = createAsyncThunk<ILectura[]>(
		`Lectura/GetAll`,
		async (info, thunk) => {
			return await errorNotification(
				() => this.service.getAllRequest(),
				thunk
			);
		}
	);
	postRequest = createAsyncThunk<ILectura, ILectura>(
		`Lectura/PostRequest`,

		async (modelo, info) => {
			return await errorNotification(
				() => this.service.postRequest(modelo),
				info
			);
		}
	);
	putRequest = createAsyncThunk<boolean, ILectura>(
		`Lectura/PutRequest`,

		async (modelo, info) => {
			return await errorNotification(
				() => this.service.putRequest(modelo),
				info
			);
		}
	);
	deleteRequest = createAsyncThunk<boolean, number>(
		`Lectura/DeleteRequest`,
		async (number, info) => {
			return await errorNotification(
				() => this.service.deleteRequest(number),
				info
			);
		}
	);
}
export const LecturaSliceRequests = new LecturaClassSlice(lecturaService);

const initialState: IIniState<ILectura> = {
	loading: null,
	data: null,
};

export const LecturaSlice = createSlice({
	name: "Lectura",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		//Nuevos slices que no heredan de generic

		builder.addCase(
			LecturaSliceRequests.getLecturaByIdRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			LecturaSliceRequests.getLecturaByIdRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			LecturaSliceRequests.getLecturaBySensorRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			LecturaSliceRequests.getLecturaBySensorRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			LecturaSliceRequests.getAllLecturasRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			LecturaSliceRequests.getAllLecturasRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			LecturaSliceRequests.getAllLecturasByFechaRequest
				.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			LecturaSliceRequests.getAllLecturasByFechaRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			LecturaSliceRequests.postRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			LecturaSliceRequests.postRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			LecturaSliceRequests.deleteRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			LecturaSliceRequests.deleteRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			LecturaSliceRequests.getAllRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			LecturaSliceRequests.getAllRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
	},
});
