export function mensajeDeErrorHttp(e: any): string {
	switch (e.response.status) {
		case 400:
			return `Error ${e.response.status} request incorrecta`;
		case 401:
			return `Error ${e.response.status} sin autorización`;
		case 403:
			return `Error ${e.response.status} Permisos incorrectos`;
		case 404:
			return `Error ${e.response.status} peticion no encontrada`;
		case 500:
			return `Error ${e.response.status} error de peticion no controlada por el servidor`;
		case 501:
			return `Error ${e.response.status} peticion no implementada`;

		default:
			return `Error ${e.response.status} error desconocido`;
	}
}
