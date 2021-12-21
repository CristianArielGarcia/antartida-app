import { Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ISensor } from "app/models/ISensor";
import useAppTitle from "app/shared/hooks/useAppTitle";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { TableComponent } from "../table/TableComponent";
import { SensorSliceRequests } from "app/middleware/reducers/sensorSlice";
import { useAppDispatch } from "app/middleware/store/store";
import { ModalCompoment } from "../ui/ModalComponent";
import { SensorDialog } from "./SensorDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";


export const SensoresCRUD = (): JSX.Element => {
	const [sensores, setSensores] = React.useState<ISensor[]>([]);
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [selectedSensor, setSelectedSensor] = React.useState(0);
	const { TitleChanger } = useAppTitle();
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		TitleChanger("GESTIÓN DE SENSORES");
	}, []);

	const onInit = async () => {
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
			console.log(
				"🚀 ~ file: SensoresCRUD.tsx ~ line 33 ~ onInit ~ fetchSensoresRequest",
				fetchSensoresRequest
			);
		}
	};

	React.useEffect(() => {
		onInit();
	}, []);

	const setRow = (id: number) => {
		setSelectedSensor(id);
		setModalOpen(true);
	};

	const eliminarSensor = async (id: number) => {
		let sensorDeleteResult;
		try {
			sensorDeleteResult = unwrapResult(
				await dispatch(SensorSliceRequests.deleteRequest(id))
			);
		} catch (error) {
			sensorDeleteResult = null;
		}
		if (sensorDeleteResult) {
			onInit(); //esto deberia actualizar la tabla
		}
	};

	const handleEliminar = async (id: number) => {
		Swal.fire({
			title: "Está seguro que desea eliminar este sensor?",
			showDenyButton: true,
			confirmButtonText: "Si",
			denyButtonText: `Cancelar`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				eliminarSensor(id);
				Swal.fire("Eliminado!", "", "success");
			} else if (result.isDenied) {
				Swal.fire("Cambios descartados", "", "info");
			}
		});
	};

	return (
		<div className="my-2 ml-36" style={{ width: "80vw" }}>
			<div>
				<TableComponent
					IDcolumn={"id"}
					columns={[
						{
							title: "Nombre",
							field: "nombre",
						},
						{
							title: "Latitud",
							field: "latitud",
						},
						{
							title: "Longitud",
							field: "longitud",
						},
						{
							title: "Acciones",
							field: (row) => {
								return (
									<div className="flex w-full justify-end sm:justify-start gap-4">
										<div>
											<IconButton
												onClick={() => {
													setRow(row?.id);
												}}
												size="small"
												style={{ position: "relative" }}
											>
												<Info />
											</IconButton>
										</div>
										<div>
											<IconButton
												onClick={() => {
													handleEliminar(row?.id);
												}}
												size="small"
												style={{ position: "relative" }}
											>
												<DeleteIcon />
											</IconButton>
										</div>
									</div>
								);
							},
						},
					]}
					dataInfo={sensores}
					// Collapse={true}
					buscar={true}
					Dense={true}
					// Watch={(rowData) => {
					// 	setRow(rowData?.idProduccion);
					// }}
					// rowStyle={(rowData) => {
					// 	switch (rowData.estado) {
					// 		case "2":
					// 			return { padding: 1, backgroundColor: "#28a745", fontSize: 14 };
					// 		case "3":
					// 			return { padding: 1, backgroundColor: "#2697FF", fontSize: 14 };
					// 		case "4":
					// 			return { padding: 1, backgroundColor: "#ffc107", fontSize: 14 };
					// 		default:
					// 			return { padding: 1, fontSize: 14 };
					// 	}
					// }}
				/>
			</div>
			<ModalCompoment
				title="Detalle del sensor"
				openPopup={modalOpen}
				setOpenPopup={setModalOpen}
			>
				<SensorDialog
					idSensor={selectedSensor}
					setOpenPopup={setModalOpen}
					callback={onInit}
				/>
			</ModalCompoment>
		</div>
	);
};
