import React from "react";
import { TableComponent } from "../table/TableComponent";
import { IMedicion } from "app/models/IMedicion";


interface props {
    mediciones: IMedicion[];
}

export const MedicionesTable = ({mediciones}: props): JSX.Element => {


	return (
		<div  >
			<div>
				<TableComponent
					IDcolumn={"id"}
					columns={[
						{
							title: "Tipo de Medicion",
							field: "tipo_medicion.nombre",
						},
						{
							title: "Valor",
							field: (row:IMedicion) => {
								return row?.valor + row?.tipo_medicion.unidad_de_medida;
							}
						}
					]}
					dataInfo={mediciones}
					// buscar={true}
					Dense={true}
				/>
			</div>
		</div>
	);
};
