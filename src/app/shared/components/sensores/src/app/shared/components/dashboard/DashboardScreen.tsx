import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "../ui/Footer";
import { NavBar } from "../ui/NavBar";
import { HomeScreen } from "./HomeScreen";



export const DashboardScreen = () => {
	return (
		<>
			<NavBar />
			<div className="container mt-2">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
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
