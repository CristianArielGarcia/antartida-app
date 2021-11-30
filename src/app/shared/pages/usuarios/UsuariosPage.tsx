import React from "react";
import { UsuarioDetail } from "../../components/usuarios/UsuarioDetail";

export const UsuariosPage = (): JSX.Element => {
	return (
		<div>
			<h2>listar todos los usarios</h2>
            {/* vas tener un boton que te mande al detail */}
            <UsuarioDetail />
		</div>
	);
};
