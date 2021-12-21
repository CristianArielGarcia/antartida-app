import { ITipoMedicion } from "app/models/ITipoMedicion";
import axios from "axios";

export class TipoMedicionService {
	Url = "TipoMedicion";
	public getAllTipoMedicionesRequest(modelA: string, modelB: string): Promise<ITipoMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ITipoMedicion[]>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetAllTipoMediciones/${modelA}/${modelB}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getTipoMedicionByIdRequest(model: number): Promise<ITipoMedicion> {
		return new Promise((resolve, reject) => {
			axios
				.get<ITipoMedicion>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetTipoMedicionById/${model}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getTipoMedicionBySensorRequest(model: number): Promise<ITipoMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ITipoMedicion[]>(`${process.env.REACT_APP_API_URL}/${this.Url}/by-sensor/${model}`)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getAllTipoMedicionesByFechaRequest(modelA: string): Promise<ITipoMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ITipoMedicion[]>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetAllByFecha/${modelA}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getAllRequest(): Promise<ITipoMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ITipoMedicion[]>(`${process.env.REACT_APP_API_URL}/${this.Url}/`)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public postRequest(entity: ITipoMedicion): Promise<ITipoMedicion> {
		return new Promise((resolve, reject) => {
			axios
				.post<ITipoMedicion>(`${process.env.REACT_APP_API_URL}/${this.Url}`, entity)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public putRequest(entity: ITipoMedicion): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.put<boolean>(`${process.env.REACT_APP_API_URL}/${this.Url}`, entity)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public deleteRequest(Id: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.delete<boolean>(`${process.env.REACT_APP_API_URL}/${this.Url}?Id=${Id}`)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
}
