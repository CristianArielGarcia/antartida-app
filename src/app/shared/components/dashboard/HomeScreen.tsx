import React from "react";
import { SensorCard } from "../sensores/SensorCard";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

interface sensor {
	id: number;
	nombreSensor: string;
	latitud: number;
	longitud: number;
}

export const HomeScreen = (): JSX.Element => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);
	const axios = require("axios").default;

	const [sensores, setSensores] = React.useState<sensor[]>([]);

	const idSensor = 1;

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
		getAllSensores();
	}, []);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Chart.js Line Chart",
			},
		},
	};

	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
	];

	const data = {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: labels.map(() => 14431243214132),
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Dataset 2",
				data: labels.map(() => 123131),
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	return (
		<div>
			<div className="grid grid-cols-4 gap-x-10 text-center p-10">
				{sensores.map((sen) => (
					<div key={sen.id} className="gird col-span-1">
						<SensorCard sensor={sen} />
					</div>
				))}
			</div>
			<div style={{ width: "80vw" }}>
				<Line options={options} data={data} />;
			</div>
		</div>
	);
};
