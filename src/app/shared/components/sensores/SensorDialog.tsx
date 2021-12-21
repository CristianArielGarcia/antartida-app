import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	TextField,
	Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { SensorSliceRequests } from "app/middleware/reducers/sensorSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "app/middleware/store/store";
import { ISensor } from "app/models/ISensor";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Controller, useForm } from "react-hook-form";
import { createStyles, makeStyles } from "@mui/styles";
import { ILectura } from "app/models/ILectura";
import { Mediciones } from "app/shared/components/medicion/Mediciones";
import { LecturaSliceRequests } from "app/middleware/reducers/lecturaSlice";
import { MaterialButtons } from "../material-iu/MaterialButtons";

interface props {
	idSensor: number;
	setOpenPopup: any;
	callback: any;
}

const useAccordionDetails = makeStyles(() =>
	createStyles({
		responsive: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			padding: "0",
		},
	})
);

export const SensorDialog = ({ idSensor, setOpenPopup, callback }: props): JSX.Element => {
	const buttonClasses = MaterialButtons();
	const { darkMode } = useAppSelector((state) => state.colorApp);
	const useButtons: any = makeStyles(() =>
		createStyles({
			textColor: {
				color: darkMode ? "rgba(250, 250, 250, 0.9)" : "#c80f4d",
			},
		})
	);

	const [editable, setEditable] = React.useState<boolean>(true);
	const textClasses = useButtons();
	const accordionClasses = useAccordionDetails();
	const [datosSensor, setDatosSensor] = React.useState<ISensor>(null);
	const [lecturasSensor, setLecturasSensor] = React.useState<ILectura[]>([]);
	const dispatch = useAppDispatch();

	const { control, getValues, setValue, watch } = useForm({
		defaultValues: datosSensor,
	});

	const onInit = async () => {
		let fetchSensorResult;

		try {
			fetchSensorResult = unwrapResult(
				await dispatch(SensorSliceRequests.getSensorByIdRequest(idSensor))
			);
		} catch (error) {
			fetchSensorResult = null;
		}

		if (fetchSensorResult) {
			console.log(
				"🚀 ~ file: SensorDialog.tsx ~ line 27 ~ onInit ~ fetchSensorResult",
				fetchSensorResult
			);
			setDatosSensor(fetchSensorResult);
		}
	};
	const getLecturas = async () => {
		let fetchLecturasSensorResult;

		try {
			fetchLecturasSensorResult = unwrapResult(
				await dispatch(LecturaSliceRequests.getLecturaBySensorRequest(idSensor))
			);
		} catch (error) {
			fetchLecturasSensorResult = null;
		}

		if (fetchLecturasSensorResult) {
			console.log(
				"🚀 ~ file: SensorDialog.tsx ~ line 75 ~ getLecturas ~ fetchLecturasSensorResult",
				fetchLecturasSensorResult
			);
			setLecturasSensor(fetchLecturasSensorResult);
		}
	};

	React.useEffect(() => {
		onInit();
		getLecturas();
	}, []);

	const handleEditar = () => {
		setEditable(!editable);
	};

	
	const handleCancelar = () => {
		setOpenPopup(false);
	};

	const handleGuardar = async () => {
		const { nombre, latitud, longitud } = getValues();
		let nuevoSensor: ISensor = JSON.parse(JSON.stringify(datosSensor));

		nuevoSensor = {
			...nuevoSensor,
			nombre: nombre,
			latitud: Number(latitud),
			longitud: Number(longitud),
		};

		console.log(
			"🚀 ~ file: SensorDialog.tsx ~ line 114 ~ handleGuardar ~ nuevoSensor",
			nuevoSensor
		);
		let sensorUpdateResult;
		try {
			sensorUpdateResult = unwrapResult(
				await dispatch(SensorSliceRequests.putRequest(nuevoSensor))
			);
		} catch (error) {
			sensorUpdateResult = null;
		}

		if (sensorUpdateResult) {
			callback(); //esto deberia actualizar la tabla
			setOpenPopup(false);
		}
	};

	return (
		<div>
			{datosSensor && (
				<div>
					<div className="text-right space-x-3">
						<Button
							size="small"
							className={textClasses.textColor}
							variant="text"
							onClick={handleEditar}
						>
							<EditIcon />
							Editar
						</Button>
					</div>
					<div style={{ width: "50vw", textAlign: "center" }}>
						<div className="inline-grid sm:inline-flex  sm:gap-x-36 gap-x-10">
							{/* ----------------NOMBRE SENSOR---------------*/}
							<div className="text-center sm:text-left p-2">
								<Controller
									name="nombre"
									control={control}
									defaultValue={datosSensor?.nombre}
									render={({ field }) => (
										<TextField
											disabled={editable}
											variant="standard"
											label="Nombre del sensor"
											{...field}
										/>
									)}
								/>
							</div>
							{/* ----------------LATITUD---------------*/}
							<div className="text-center sm:text-left p-2">
								<Controller
									name="latitud"
									control={control}
									defaultValue={datosSensor?.latitud}
									render={({ field }) => (
										<TextField
											variant="standard"
											disabled={editable}
											label="Latitud"
											{...field}
										/>
									)}
								/>
							</div>
							{/* ----------------LONGITUD---------------*/}
							<div className="text-center sm:text-left p-2">
								<Controller
									name="longitud"
									control={control}
									defaultValue={datosSensor?.longitud}
									render={({ field }) => (
										<TextField
											variant="standard"
											disabled={editable}
											label="Longitud"
											{...field}
										/>
									)}
								/>
							</div>
						</div>
						<div className="inline-grid w-96 sm:mb-2 ">
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className="text-base ">Lecturas</Typography>
								</AccordionSummary>
								<AccordionDetails className="flex flex-col w-full p-0">
									{lecturasSensor?.length > 0 ? (
										lecturasSensor?.map((lec) => {
											return <Mediciones lectura={lec} key={lec.id} />;
										})
									) : (
										<AccordionDetails className={accordionClasses.responsive}>
											<Typography className="text-base ">
												Sin lecturas registradas...
											</Typography>
										</AccordionDetails>
									)}
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				</div>
			)}
			<div className="inline-grid sm:flex sm:content-center sm:gap-x-36 gap-x-10">
				<Button
					className={buttonClasses.greenButton}
					variant="contained"
					onClick={handleGuardar}
				>
					Guardar
				</Button>
				<Button
					className={buttonClasses.redButton}
					variant="contained"
					onClick={handleCancelar}
				>
					Cancelar
				</Button>
			</div>
		</div>
	);
};
