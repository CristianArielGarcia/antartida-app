import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { IMedicion } from "app/models/IMedicion";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/middleware/store/store";
import { MedicionSliceRequests } from "app/middleware/reducers/MedicionSlice";
import { TipoMedicionSliceRequests } from "app/middleware/reducers/tipoMedicionSlice";
import { ILectura } from "app/models/ILectura";
import { ITipoMedicion } from "app/models/ITipoMedicion";
import { MedicionesTable } from "app/shared/components/medicion/MedicionesTable";
import moment from "moment";

interface prop {
	lectura: ILectura;
}

export const Mediciones = ({ lectura }: prop): JSX.Element => {
	const [tipoMediciones, setTipoMediciones] = React.useState<ITipoMedicion[]>([]);

	const dispatch = useAppDispatch();

	const verificarEstado = (estado: string) => {
		if (estado === "N") {
			return <Typography className="m-1 ">Estado: En Reproceso</Typography>;
		}
		if (estado === "S") {
			return <Typography className="m-1 ">Estado: Reprocesado</Typography>;
		}
	};

	const getAllTipoMediciones = async () => {
		let fetchTipoMedicionesResult;

		try {
			fetchTipoMedicionesResult = unwrapResult(
				await dispatch(TipoMedicionSliceRequests.getAllRequest())
			);
		} catch (error) {
			fetchTipoMedicionesResult = null;
		}

		if (fetchTipoMedicionesResult) {
			console.log(
				"🚀 ~ file: SensorDialog.tsx ~ line 75 ~ getLecturas ~ fetchTipoMedicionesResult",
				fetchTipoMedicionesResult
			);
			setTipoMediciones(fetchTipoMedicionesResult);
		}
	};

	React.useEffect(() => {
		console.log("llegue a lectura");
		getAllTipoMediciones();
	}, []);

	return (
		<div className="w-96">
			<Accordion className="m-1 text-center text-base">
				<AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel-content">
					<span className="text-lg">
						Fecha de la Lectura: {moment(lectura?.fecha_lectura).format("DD-MM-YYYY")}
					</span>
					{/* <Typography className="m-1 ">tipo: {med?.tipo_medicion.nombre}</Typography>
						<Typography className="m-1 ">Valor: {med?.valor}</Typography> */}
					{/* {verificarEstado(lectura?.estadoReproceso)} */}
				</AccordionSummary>
				<AccordionDetails>
					{lectura.mediciones.map((lec) => {
						return (
							<div className="text-left">
								<a>
									{lec.tipo_medicion.nombre} {lec.valor}
									{lec.tipo_medicion.unidad_de_medida}
								</a>
							</div>
						);
					})}
					{/* <div className="grid grid-cols-1 text-center w-full">
							<a>Tipo de medicion: {med?.tipo_medicion.nombre}</a>
							<a>Valor: {med?.valor}{med?.tipo_medicion.unidad_de_medida}</a>
						</div> */}
					{/* <MedicionesTable mediciones={lectura.mediciones} /> */}
				</AccordionDetails>
			</Accordion>
			<br />
		</div>
	);
};
