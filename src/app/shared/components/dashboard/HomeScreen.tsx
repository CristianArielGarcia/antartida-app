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
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/middleware/store/store";
import { SensorSliceRequests } from "app/middleware/reducers/sensorSlice";
import { ISensor } from "app/models/ISensor";
import { ILectura } from "app/models/ILectura";
// import { LecturaSliceRequests } from "app/middleware/reducers/lecturaSlice";
import useAppTitle from "app/shared/hooks/useAppTitle";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ListIcon from "@mui/icons-material/List";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import RadioGroup from "@mui/material/RadioGroup";

let options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "",
		},
	},
};

export const HomeScreen = (): JSX.Element => {
	const { TitleChanger } = useAppTitle();

	React.useEffect(() => {
		TitleChanger("DASHBOARD DE SENSORES");
	}, []);

	const [rangoFecha, setRangoFecha] = React.useState<DateRange<Date>>([
		new Date(moment().subtract(7, "d").format("MM-DD-YYYY")),
		new Date(moment().format("MM-DD-YYYY")),
	]);
	const [sensores, setSensores] = React.useState<ISensor[]>([]);
	const [lecturas, setLecturas] = React.useState<ILectura[]>([]);
	const [sensor, setSensor] = React.useState<ISensor>();

	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

	const dispatch = useAppDispatch();

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

	const onVerGrafico = async (event: any) => {
		let sensor = event.target.value;
		setSensor(sensor);
	};

	const onDateChange = async (newValue: any) => {
		try {
			setRangoFecha(newValue);
		} catch (error) {
			console.error(error);
		}
	};

	const onBuscar = async () => {
		let fetchLecturasRequest;
		try {
			let desde = moment(rangoFecha[0]).format("YYYY-MM-DD");
			let hasta = moment(rangoFecha[1]).format("YYYY-MM-DD");
			fetchLecturasRequest = unwrapResult(
				await dispatch(
					SensorSliceRequests.getAllLecturasByFechaRequest({
						desde,
						hasta,
						sensor,
					})
				)
			);
			setLecturas(fetchLecturasRequest);
			options.plugins.title.text = sensores.find((x) => x.id == sensor)?.nombre!;
		} catch (error) {
			console.error(error);
		}
	};

	const getData = () => {
		let labels = lecturas
			.map((lectura) => moment.utc(lectura.fecha_lectura).format("DD-MM-YY HH:mm").split(" "))
			.sort();
		let tipoMediciones: any[] = [];
		let datasets: {
			label: string;
			data: any;
			backgroundColor: string;
			borderColor: string;
		}[] = [];
		lecturas.forEach((lectura) => {
			lectura.mediciones.forEach((medicion) => {
				if (medicion?.tipo_medicion?.nombre !== "Foto") {
					//si no tiene nada, crea el primero\
					if (tipoMediciones.length === 0) {
						tipoMediciones.push({
							nombre: medicion?.tipo_medicion?.nombre,
							mediciones: [medicion.valor],
							color: medicion?.tipo_medicion?.color,
							unidad_de_medida: medicion?.tipo_medicion?.unidad_de_medida,
						});
					}
					//si tiene algun elemento
					else {
						let indice = tipoMediciones.findIndex((tipo) => {
							return tipo.nombre === medicion?.tipo_medicion?.nombre;
						});
						//si no tiene de ese tipo, lo crea desde 0
						if (indice === -1) {
							tipoMediciones.push({
								nombre: medicion?.tipo_medicion?.nombre,
								mediciones: [medicion.valor],
								color: medicion?.tipo_medicion?.color,
								unidad_de_medida: medicion?.tipo_medicion?.unidad_de_medida,
							});
						}
						//si tiene de ese tipo, solo agrega la medicion al arreglo
						else {
							tipoMediciones[indice].mediciones.push(medicion.valor);
						}
					}
				}
			});
		});

		tipoMediciones.forEach((tipoMedicion) => {
			datasets.push({
				label: tipoMedicion.nombre + " (" + tipoMedicion.unidad_de_medida + ")",
				data: tipoMedicion.mediciones,
				backgroundColor: tipoMedicion.color,
				borderColor: tipoMedicion.color,
			});
		});
		return {
			labels,
			datasets: datasets,
		};
	};

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	function TabPanel(props: { children: any; value: any; index: any }) {
		const { children, value, index } = props;
		return <div>{value === index && <h1>{children}</h1>}</div>;
	}

	function renderImagenes(): any {
		let mediciones: any = [];
		lecturas.forEach((lectura) => {
			lectura.mediciones.forEach((medicion) => {
				if (medicion?.tipo_medicion?.nombre == "Foto") {
					mediciones.push({
						medicion: medicion,
						fecha: moment.utc(lectura.fecha_lectura).format("DD-MM-YY HH:mm"),
					});
				}
			});
		});
		return (
			<ImageList sx={{ width: "100%", height: 1000, p: 2 }}>
				{mediciones.map((item: any) => (
					<ImageListItem key={item.medicion.id}>
						<img
							src={`${item.medicion.valor}`}
							srcSet={`${item.medicion.valor}`}
							alt={item.title}
							loading="lazy"
						/>
						<ImageListItemBar
							title={item.fecha}
							subtitle="Todos los derechos reservados © IAA"
							actionIcon={
								<IconButton
									sx={{ color: "rgba(255, 255, 255, 0.54)" }}
									aria-label={`info about ${item.title}`}
								>
									<InfoIcon />
								</IconButton>
							}
						/>
					</ImageListItem>
				))}
			</ImageList>
		);
	}

	return (
		<div>
			{/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center py-5 px-20"> */}
			<RadioGroup
				sx={{ maxWidth: 1000, maxHeight: 200, p: 2 }}
				name="controlled-radio-buttons-group"
			>
				{sensores.map((sen) => (
					<Box key={sen.id} sx={{ width: 250, height: 500 }}>
						<SensorCard onVerGrafico={onVerGrafico} sensor={sen} />
					</Box>
				))}
			</RadioGroup>
			{/* </div> */}
			<div className="text-center p-5">
				<Box display="flex" alignItems="center" justifyContent="center">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateRangePicker
							startText="Desde"
							endText="Hasta"
							inputFormat="dd/MM/yyyy"
							value={rangoFecha}
							onChange={onDateChange}
							renderInput={(startProps, endProps) => (
								<React.Fragment>
									<TextField {...startProps} />
									<Box sx={{ mx: 2 }}> </Box>
									<TextField {...endProps} />
								</React.Fragment>
							)}
						/>
					</LocalizationProvider>
					<Box sx={{ mx: 2 }}></Box>
					<Button
						onClick={onBuscar}
						size="small"
						variant="contained"
						disabled={sensor == null || rangoFecha[0] == null || rangoFecha[1] == null}
					>
						Buscar
					</Button>
				</Box>
			</div>
			{lecturas.length > 0 ? (
				<div>
					<Box sx={{ width: "100%" }}>
						<Tabs value={value} onChange={handleChange} centered>
							<Tab icon={<EqualizerIcon />} label="GRÁFICOS" />
							<Tab icon={<InsertPhotoIcon />} label="FOTOS" />
							<Tab icon={<ListIcon />} label="DATOS" />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<div>
							<div>
								<Line options={options} data={getData()} />
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={1}>
						{" "}
						{renderImagenes()}{" "}
					</TabPanel>
					<TabPanel value={value} index={2}>
						{" "}
						Item 3 Detail{" "}
					</TabPanel>
				</div>
			) : null}
		</div>
	);
};
