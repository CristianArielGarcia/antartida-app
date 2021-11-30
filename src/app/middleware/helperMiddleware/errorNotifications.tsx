import { authenticationSlice } from "../reducers/authenticationSlice";
import { NotificationSlice } from "../reducers/notificationUISlice";
import { mensajeDeErrorHttp } from "./statusErrors";

export async function errorNotification(
	func: any,
	{ rejectWithValue, dispatch }: any
) {
	try {
		return await func();
	} catch (e: any) {
		if (e.response) {
			dispatch(
				NotificationSlice.actions.notificationUIopen({
					Mensaje: mensajeDeErrorHttp(e),
					type: "error",
				})
			);

			if (e.response.status === 401) {
				dispatch(authenticationSlice.actions.ForceLogOut());
			}
		} else {
			dispatch(
				NotificationSlice.actions.notificationUIopen({
					Mensaje: "Error en la conexión con el servidor",
					type: "error",
				})
			);
		}
		return rejectWithValue(e);
	}
}
