import moment from "moment";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "../shared/components/auth/LoginScreen";
import { DashboardScreen } from "../shared/components/dashboard/DashboardScreen";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { ContactUs } from "../shared/components/contact/ContactUs";




export const AppRouter = (): JSX.Element => {
	moment.locale("es-ar");

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/auth"
					element={
						<PublicRoute>
							<LoginScreen />
						</PublicRoute>
					}
				/>
				<Route
					path="/main/*"
					element={
						<PrivateRoute>
							<DashboardScreen />
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
