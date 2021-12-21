import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIniState } from "app/models/IInitState";
import { ITipoMedicion } from "app/models/ITipoMedicion";
import { TipoMedicionService } from "app/services/tipoMedicion.service";
import { errorNotification } from "../helperMiddleware/errorNotifications";

//<IAuth, IAuthUser>
const tipoTipoMedicionService = new TipoMedicionService();

interface prop {
	modeloA: string;
	modeloB: string;
}

interface tipoTipoMedicionesProp {
	fecha: string;
}

class TipoMedicionClassSlice {
	constructor(private service: TipoMedicionService) {}
	getAllTipoMedicionesRequest = createAsyncThunk<ITipoMedicion[], prop>(
		`TipoMedicion/GetAllTipoMediciones`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getAllTipoMedicionesRequest(modelo.modeloA, modelo.modeloB),
				info
			);
		}
	);
	getTipoMedicionByIdRequest = createAsyncThunk<ITipoMedicion, number>(
		`TipoMedicion/GetTipoMedicionById`,
		async (modelo, info) => {
			return await errorNotification(() => this.service.getTipoMedicionByIdRequest(modelo), info);
		}
	);
	getTipoMedicionBySensorRequest = createAsyncThunk<ITipoMedicion[], number>(
		`TipoMedicion/by-sensor`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getTipoMedicionBySensorRequest(modelo),
				info
			);
		}
	);
	getAllTipoMedicionesByFechaRequest = createAsyncThunk<ITipoMedicion[], tipoTipoMedicionesProp>(
		`TipoMedicion/GetAllByFecha`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getAllTipoMedicionesByFechaRequest(modelo.fecha),
				info
			);
		}
	);
	getAllRequest = createAsyncThunk<ITipoMedicion[]>(`TipoMedicion/GetAll`, async (info, thunk) => {
		return await errorNotification(() => this.service.getAllRequest(), thunk);
	});
	postRequest = createAsyncThunk<ITipoMedicion, ITipoMedicion>(
		`TipoMedicion/PostRequest`,

		async (modelo, info) => {
			return await errorNotification(() => this.service.postRequest(modelo), info);
		}
	);
	putRequest = createAsyncThunk<boolean, ITipoMedicion>(
		`TipoMedicion/PutRequest`,

		async (modelo, info) => {
			return await errorNotification(() => this.service.putRequest(modelo), info);
		}
	);
	deleteRequest = createAsyncThunk<boolean, number>(
		`TipoMedicion/DeleteRequest`,
		async (number, info) => {
			return await errorNotification(() => this.service.deleteRequest(number), info);
		}
	);
}
export const TipoMedicionSliceRequests = new TipoMedicionClassSlice(tipoTipoMedicionService);

const initialState: IIniState<ITipoMedicion> = {
	loading: null,
	data: null,
};

export const TipoMedicionSlice = createSlice({
	name: "TipoMedicion",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		//Nuevos slices que no heredan de generic

		builder.addCase(TipoMedicionSliceRequests.getTipoMedicionByIdRequest.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(TipoMedicionSliceRequests.getTipoMedicionByIdRequest.rejected, (state, action) => {
			state.loading = "rejected";
		});
		builder.addCase(
			TipoMedicionSliceRequests.getTipoMedicionBySensorRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			TipoMedicionSliceRequests.getTipoMedicionBySensorRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			TipoMedicionSliceRequests.getAllTipoMedicionesRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(TipoMedicionSliceRequests.getAllTipoMedicionesRequest.rejected, (state, action) => {
			state.loading = "rejected";
		});
		builder.addCase(
			TipoMedicionSliceRequests.getAllTipoMedicionesByFechaRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			TipoMedicionSliceRequests.getAllTipoMedicionesByFechaRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(TipoMedicionSliceRequests.postRequest.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(TipoMedicionSliceRequests.postRequest.rejected, (state, action) => {
			state.loading = "rejected";
		});
		builder.addCase(TipoMedicionSliceRequests.deleteRequest.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(TipoMedicionSliceRequests.deleteRequest.rejected, (state, action) => {
			state.loading = "rejected";
		});
		builder.addCase(TipoMedicionSliceRequests.getAllRequest.fulfilled, (state, action) => {
			state.loading = "fulfilled";
			state.data = action.payload;
		});
		builder.addCase(TipoMedicionSliceRequests.getAllRequest.rejected, (state, action) => {
			state.loading = "rejected";
		});
	},
});
