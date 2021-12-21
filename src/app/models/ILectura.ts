import { IMedicion } from "./IMedicion";

export interface ILectura {
	id: number;
	sensor: number;
	fecha_lectura: Date;
	info_adicional?: string | null;
	mediciones: IMedicion[];
	deleted?: boolean | null;
}
