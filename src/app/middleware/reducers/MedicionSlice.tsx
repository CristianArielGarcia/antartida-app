import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIniState } from "app/models/IInitState";
import { IMedicion } from "app/models/IMedicion";
import { MedicionService } from "app/services/medicion.service";
import { errorNotification } from "../helperMiddleware/errorNotifications";

//<IAuth, IAuthUser>
const medicionService = new MedicionService();

interface prop {
	modeloA: string;
	modeloB: string;
}

interface medicionesProp {
	fecha: string;
}

class MedicionClassSlice {
	constructor(private service: MedicionService) {}
	getAllMedicionesRequest = createAsyncThunk<IMedicion[], prop>(
		`Medicion/GetAllMediciones`,
		async (modelo, info) => {
			return await errorNotification(
				() =>
					this.service.getAllMedicionesRequest(
						modelo.modeloA,
						modelo.modeloB
					),
				info
			);
		}
	);
	getMedicionByIdRequest = createAsyncThunk<IMedicion, number>(
		`Medicion/GetMedicionById`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getMedicionByIdRequest(modelo),
				info
			);
		}
	);
	getMedicionBySensorRequest = createAsyncThunk<IMedicion[], number>(
		`Medicion/by-sensor`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getMedicionBySensorRequest(modelo),
				info
			);
		}
	);
	getAllMedicionesByFechaRequest = createAsyncThunk<
		IMedicion[],
		medicionesProp
	>(`Medicion/GetAllByFecha`, async (modelo, info) => {
		return await errorNotification(
			() =>
				this.service.getAllMedicionesByFechaRequest(
					modelo.fecha
				),
			info
		);
	});
	getAllRequest = createAsyncThunk<IMedicion[]>(
		`Medicion/GetAll`,
		async (info, thunk) => {
			return await errorNotification(
				() => this.service.getAllRequest(),
				thunk
			);
		}
	);
	postRequest = createAsyncThunk<IMedicion, IMedicion>(
		`Medicion/PostRequest`,

		async (modelo, info) => {
			return await errorNotification(
				() => this.service.postRequest(modelo),
				info
			);
		}
	);
	putRequest = createAsyncThunk<boolean, IMedicion>(
		`Medicion/PutRequest`,

		async (modelo, info) => {
			return await errorNotification(
				() => this.service.putRequest(modelo),
				info
			);
		}
	);
	deleteRequest = createAsyncThunk<boolean, number>(
		`Medicion/DeleteRequest`,
		async (number, info) => {
			return await errorNotification(
				() => this.service.deleteRequest(number),
				info
			);
		}
	);
}
export const MedicionSliceRequests = new MedicionClassSlice(medicionService);

const initialState: IIniState<IMedicion> = {
	loading: null,
	data: null,
};

export const MedicionSlice = createSlice({
	name: "Medicion",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		//Nuevos slices que no heredan de generic

		builder.addCase(
			MedicionSliceRequests.getMedicionByIdRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			MedicionSliceRequests.getMedicionByIdRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			MedicionSliceRequests.getMedicionBySensorRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			MedicionSliceRequests.getMedicionBySensorRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			MedicionSliceRequests.getAllMedicionesRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			MedicionSliceRequests.getAllMedicionesRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			MedicionSliceRequests.getAllMedicionesByFechaRequest
				.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			MedicionSliceRequests.getAllMedicionesByFechaRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			MedicionSliceRequests.postRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			MedicionSliceRequests.postRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			MedicionSliceRequests.deleteRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			MedicionSliceRequests.deleteRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			MedicionSliceRequests.getAllRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			MedicionSliceRequests.getAllRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
	},
});
