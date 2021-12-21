import moment from "moment";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "../shared/components/auth/LoginScreen";
import { RegisterScreen } from "../shared/components/auth/RegisterScreen";
import { DashboardRoutes } from "../shared/components/dashboard/DashboardRoutes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { ContactUs } from "../shared/components/contacto/ContactUs";
import {
	adaptV4Theme,
	createTheme,
	StyledEngineProvider,
	Theme,
	ThemeProvider,
} from "@mui/material/styles";
import { useAppSelector } from "app/middleware/store/store";

declare module "@mui/styles/defaultTheme" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

export const AppRouter = (): JSX.Element => {
	moment.locale("es-ar");

	const { darkMode } = useAppSelector((state) => state.colorApp);
	const darkTheme = createTheme(
		adaptV4Theme({
			palette: {
				mode: "dark",
				background: {
					default: "#1E1E2D",
					paper: "#2D2D41",
				},
				text: {
					primary: "rgba(250, 250, 250,0.90)",
					secondary: "rgba(250, 250, 250,0.60)",
				},
				primary: {
					main: "#2495c8",
				},
				success: {
					main: "#29c824",
				},
			},
		})
	);
	const lightTheme = createTheme(
		adaptV4Theme({
			palette: {
				mode: "light",
				background: {
					default: "rgb(240, 241, 242)",
					paper: "rgb(248, 249, 250)",
				},
				text: {
					primary: "#181818",
					secondary: "#181818e0",
				},
			},
		})
	);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			{/* <ThemeProvider theme={darkTheme}> */}
				<BrowserRouter>
					<Routes>
						<Route
							path="/login"
							element={
								<PublicRoute>
									<LoginScreen />
								</PublicRoute>
							}
						/>
						<Route
							path="/register"
							element={
								<PublicRoute>
									<RegisterScreen />
								</PublicRoute>
							}
						/>
						<Route
							path="/*"
							element={
								<PrivateRoute>
									<DashboardRoutes />
								</PrivateRoute>
							}
						/>
						<Route
							path="/contact"
							element={
								<PrivateRoute>
									<ContactUs />
								</PrivateRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};
