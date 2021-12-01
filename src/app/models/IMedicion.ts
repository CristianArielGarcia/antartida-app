import { ITipoMedicion } from "./ITipoMedicion";

export interface IMedicion {
	id: number;
	tipo_medicion?: ITipoMedicion;
	valor?: string | null;
	deleted?: boolean | null;
}
