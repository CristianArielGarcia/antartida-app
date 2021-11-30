import moment from "moment";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "../shared/components/auth/LoginScreen";
import { RegisterScreen } from "../shared/components/auth/RegisterScreen";
import { DashboardRoutes } from "../shared/components/dashboard/DashboardRoutes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { ContactUs } from "../shared/components/contact/ContactUs";




export const AppRouter = (): JSX.Element => {
	moment.locale("es-ar");

	return (
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
							<ContactUs/>
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
