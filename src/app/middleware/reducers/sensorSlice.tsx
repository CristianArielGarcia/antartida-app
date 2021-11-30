import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIniState } from "../../models/IInitState";
import { ISensor } from "../../models/ISensor";
import { SensorService } from "../../services/sensor.service";
import { errorNotification } from "../helperMiddleware/errorNotifications";
//<IAuth, IAuthUser>
const sensorService = new SensorService();

interface prop {
	modeloA: string;
	modeloB: string;
}

interface lecturasProp {
	fecha: string;
}

class SensorClassSlice {
	constructor(private service: SensorService) {}
	getAllLecturasRequest = createAsyncThunk<ISensor[], prop>(
		`Sensor/GetAllLecturas`,
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
	getSensorByIdRequest = createAsyncThunk<ISensor, number>(
		`Sensor/GetSensorById`,
		async (modelo, info) => {
			return await errorNotification(
				() => this.service.getSensorByIdRequest(modelo),
				info
			);
		}
	);
	getAllLecturasByFechaRequest = createAsyncThunk<
		ISensor[],
		lecturasProp
	>(`Sensor/GetAllByFecha`, async (modelo, info) => {
		return await errorNotification(
			() =>
				this.service.getAllLecturasByFechaRequest(
					modelo.fecha
				),
			info
		);
	});
	getAllRequest = createAsyncThunk<ISensor[]>(
		`Sensor/GetAll`,
		async (info, thunk) => {
			return await errorNotification(
				() => this.service.getAllRequest(),
				thunk
			);
		}
	);
	postRequest = createAsyncThunk<ISensor, ISensor>(
		`Sensor/PostRequest`,

		async (modelo, info) => {
			return await errorNotification(
				() => this.service.postRequest(modelo),
				info
			);
		}
	);
	putRequest = createAsyncThunk<boolean, ISensor>(
		`Sensor/PutRequest`,

		async (modelo, info) => {
			return await errorNotification(
				() => this.service.putRequest(modelo),
				info
			);
		}
	);
	deleteRequest = createAsyncThunk<boolean, number>(
		`Sensor/DeleteRequest`,
		async (number, info) => {
			return await errorNotification(
				() => this.service.deleteRequest(number),
				info
			);
		}
	);
}
export const SensorSliceRequests = new SensorClassSlice(sensorService);

const initialState: IIniState<ISensor> = {
	loading: null,
	data: null,
};

export const SensorSlice = createSlice({
	name: "Sensor",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		//Nuevos slices que no heredan de generic

		builder.addCase(
			SensorSliceRequests.getSensorByIdRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			SensorSliceRequests.getSensorByIdRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			SensorSliceRequests.getAllLecturasRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			SensorSliceRequests.getAllLecturasRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			SensorSliceRequests.getAllLecturasByFechaRequest
				.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			SensorSliceRequests.getAllLecturasByFechaRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			SensorSliceRequests.postRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			SensorSliceRequests.postRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			SensorSliceRequests.deleteRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			SensorSliceRequests.deleteRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
		builder.addCase(
			SensorSliceRequests.getAllRequest.fulfilled,
			(state, action) => {
				state.loading = "fulfilled";
				state.data = action.payload;
			}
		);
		builder.addCase(
			SensorSliceRequests.getAllRequest.rejected,
			(state, action) => {
				state.loading = "rejected";
			}
		);
	},
});
