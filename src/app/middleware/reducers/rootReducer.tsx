import { AppTitleSlice } from "./appTitleSlice";
import { ColorAppSlice } from "./ColorAppSlice";
import { NotificationSlice } from "./notificationUISlice";
import { SensorSlice } from "./sensorSlice";

export const rootReducer = {
	//------Color Reducer----
	colorApp: ColorAppSlice.reducer,
	//---------SENSOR REDUCER------------
	sensor: SensorSlice.reducer,

	//---------USUARIO REDUCER------------
	// usuario: usuarioSlice.reducer,
	//---------APP REDUCERS---------------
	appTitle: AppTitleSlice.reducer,

	//---------LECTURA REDUCER------------
	// lectura: LecturaSlice.reducer,
	//-----UI REDUCERS-----
	notificationUI: NotificationSlice.reducer,
};
