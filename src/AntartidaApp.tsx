import React from "react";
import { Provider } from "react-redux";
import moment from "moment";
import { store } from "./app/middleware/store/store";
import { AppRouter } from "./app/routers/AppRouter";

export interface sensor {
	id: number;
	nombre: string;
	latitud: number;
	longitud: number;
}

export const AntartidaApp = (): JSX.Element => {
	moment.locale("es-ar");
	return (
		<div style={{ height:"100vh" }}>
			<Provider store={store}>
				<AppRouter />
			</Provider>
		</div>
	);
};
