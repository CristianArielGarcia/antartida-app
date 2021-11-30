/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { SensorCard } from "../sensores/SensorCard";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/middleware/store/store";
import { SensorSliceRequests } from "app/middleware/reducers/sensorSlice";
import { ISensor } from "app/models/ISensor";

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
	const dispatch = useAppDispatch();

	const [sensores, setSensores] = React.useState<ISensor[]>([]);

	const getAllSensores = async () => {
		let fetchSensoresRequest;

		try {
			fetchSensoresRequest = unwrapResult(
				await dispatch(SensorSliceRequests.getAllRequest())
			);
		} catch (error) {
			fetchSensoresRequest = null;
		}

		if (fetchSensoresRequest) {
			setSensores(fetchSensoresRequest);
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
