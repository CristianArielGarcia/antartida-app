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
import moment from "moment";
import _ from "lodash";
import { ConstructionOutlined } from "@mui/icons-material";

interface sensor {
	id: number;
	nombre: string;
	latitud: number;
	longitud: number;
}
// import { unwrapResult } from "@reduxjs/toolkit";
// import { useAppDispatch } from "app/middleware/store/store";
// import { SensorSliceRequests } from "app/middleware/reducers/sensorSlice";
// import { ISensor } from "app/models/ISensor";

interface lectura{
	id: number;
	sensor: sensor;
	fecha_lectura: Date;
	mediciones: Array<any>;
}

let options =  {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: '',
		},
	},
};

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
	const [lecturas, setLecturas] = React.useState<lectura[]>([]);
	//const dispatch = useAppDispatch();

	//const [sensores, setSensores] = React.useState<ISensor[]>([]);

	// const getAllSensores = async () => {
	// 	let fetchSensoresRequest;

	// 	try {
	// 		fetchSensoresRequest = unwrapResult(
	// 			await dispatch(SensorSliceRequests.getAllRequest())
	// 		);
	// 	} catch (error) {
	// 		fetchSensoresRequest = null;
	// 	}

	// 	if (fetchSensoresRequest) {
	// 		setSensores(fetchSensoresRequest);
	// 	}
	// };

	const onVerGrafico = (event: any) => {
		let sensor = event.target.value
		try {
			axios.get(`http://127.0.0.1:8000/api/lectura/${sensor}`)
			.then((response: any) => setLecturas(response.data))
			options.plugins.title.text = sensores.find(x => x.id == sensor)?.nombre!
		} catch (error) {
			console.error(error);
		}
	}

	const getData = () => {
		let labels = lecturas.map(lectura => moment.utc(lectura.fecha_lectura).format('HH:mm')).sort()
		let tipoMediciones: any[] = []
		let datasets: { label: string; data: any; backgroundColor: string; borderColor: string; }[] = [];
		lecturas.forEach(lectura => {
			lectura.mediciones.forEach(medicion => {
				//si no tiene nada, crea el primero
				if(tipoMediciones.length == 0){
						tipoMediciones.push({
							nombre: medicion.tipo_medicion.nombre,
							mediciones: [medicion.valor],
							color: medicion.tipo_medicion.color
						})
				}
				//si tiene algun elemento
				else{
					let indice = _.findIndex(tipoMediciones, function(tipo) { return tipo.nombre == medicion.tipo_medicion.nombre})
					//si no tiene de ese tipo, lo crea desde 0
					if (indice === -1){
						tipoMediciones.push({
							nombre: medicion.tipo_medicion.nombre,
							mediciones: [medicion.valor],
							color: medicion.tipo_medicion.color
						})
					}
					//si tiene de ese tipo, solo agrega la medicion al arreglo
					else{
						tipoMediciones[indice].mediciones.push(medicion.valor)
					}
				}
			});		
		});

		tipoMediciones.forEach(tipoMedicion => {
			datasets.push(
				{
					label: tipoMedicion.nombre,
					data: tipoMedicion.mediciones,
					backgroundColor: tipoMedicion.color,
					borderColor: tipoMedicion.color,
				})
		});


		return {
			labels,
			datasets: datasets
		};

	}

	React.useEffect(() => {
		getAllSensores();
	}, []);

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center py-5 px-20">
				{sensores.map((sen) => (
					<div key={sen.id} className="grid col-span-1">
						<SensorCard onVerGrafico={onVerGrafico} sensor={sen} />
					</div>
				))}
			</div>
			{lecturas.length > 0
				? 
					<div className="p-10" >
						<Line options={options} data={getData()} />
					</div> 
				: null
			}
		</div>
	);
};