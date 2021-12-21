import { UsuariosPage } from "app/shared/pages/usuarios/UsuariosPage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SensoresCRUD } from "../sensores/SensoresCRUD";
import { Footer } from "../ui/Footer";
import { NavBar } from "../ui/NavBar";
import { HomeScreen } from "./HomeScreen";



export const DashboardRoutes = () => {
	return (
		<>
			<NavBar />
			<div className=" mt-2">
				<Routes>
					<Route path="/main" element={<HomeScreen />} />
					<Route path="/sensores" element={<SensoresCRUD />} />
					<Route path="/users" element={<UsuariosPage />} />
					<Route path="/user/new" element={<UsuariosPage />} />
					{/* <Route path="/hero/:heroeId" element={<SensorScreen />} />
                    <Route path="/dc" element={<UsuariosScreen />} />
                    <Route path="/search" element={<CrudSensorScreen />} />

                    <Route path="/" element={<HomeScreen />} /> */}
				</Routes>
			</div>
			<Footer />
		</>
	);
};
