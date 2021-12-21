import { ILectura } from "./ILectura";
import { ITipoMedicion } from "./ITipoMedicion";

export interface IMedicion {
	lectura: ILectura;
	id: number;
	tipo_medicion?: ITipoMedicion;
	valor?: string | null;
	deleted?: boolean | null;
}
