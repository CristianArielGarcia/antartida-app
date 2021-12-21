import { IMedicion } from "app/models/IMedicion";
import axios from "axios";

export class MedicionService {
	Url = "Medicion";
	public getAllMedicionesRequest(modelA: string, modelB: string): Promise<IMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<IMedicion[]>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetAllMediciones/${modelA}/${modelB}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getMedicionByIdRequest(model: number): Promise<IMedicion> {
		return new Promise((resolve, reject) => {
			axios
				.get<IMedicion>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetMedicionById/${model}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getMedicionBySensorRequest(model: number): Promise<IMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<IMedicion[]>(`${process.env.REACT_APP_API_URL}/${this.Url}/by-sensor/${model}`)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getAllMedicionesByFechaRequest(modelA: string): Promise<IMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<IMedicion[]>(
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
	public getAllRequest(): Promise<IMedicion[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<IMedicion[]>(`${process.env.REACT_APP_API_URL}/${this.Url}/GetAll`)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public postRequest(entity: IMedicion): Promise<IMedicion> {
		return new Promise((resolve, reject) => {
			axios
				.post<IMedicion>(`${process.env.REACT_APP_API_URL}/${this.Url}`, entity)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public putRequest(entity: IMedicion): Promise<boolean> {
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
