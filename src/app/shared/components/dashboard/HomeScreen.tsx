import React from "react";
import { SensorCard } from "../sensores/SensorCard";

interface sensor {
	id: number;
	nombreSensor: string;
	latitud: number;
	longitud: number;
}

export const HomeScreen = (): JSX.Element => {
	const axios = require("axios").default;

	const [sensores, setSensores] = React.useState<sensor[]>([]);

	const idSensor = 1;

	// const onInit = async () => {
	// 	let fetchSensoresResult;

	// 	try {
	// 		fetchSensoresResult = await axios.get(
	// 			`http://127.0.0.1:8000/api/sensor/detail/${idSensor}`
	// 		);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// 	if (fetchSensoresResult) {
	// 		setData(fetchSensoresResult.data);
	// 		console.log(fetchSensoresResult.data);
	// 	}
	// };

	const getAllSensores = async () => {
		let fetchSensoresRequest;

		try {
			fetchSensoresRequest = await axios.get(
				`http://127.0.0.1:8000/api/sensor`
			);
		} catch (error) {
			console.error(error);
		}
		if (fetchSensoresRequest?.data) {
			setSensores(fetchSensoresRequest.data);
			console.log(fetchSensoresRequest.data);
		}
	};

	React.useEffect(() => {
		// onInit();
		getAllSensores();
	}, []);

	return (
		<div className="grid grid-cols-4 gap-x-10 text-center p-10">
			{sensores.map((sen) => (
				<div key={sen.id} className="gird col-span-1">
					<SensorCard sensor={sen} />
				</div>
			))}
		</div>
	);
};
