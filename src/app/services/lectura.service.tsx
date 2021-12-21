import { ILectura } from "app/models/ILectura";
import axios from "axios";


export class LecturaService {
	Url = "Lectura";
	public getAllLecturasRequest(
		modelA: string,
		modelB: string
	): Promise<ILectura[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ILectura[]>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetAllLecturas/${modelA}/${modelB}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getLecturaByIdRequest(model: number): Promise<ILectura> {
		return new Promise((resolve, reject) => {
			axios
				.get<ILectura>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetLecturaById/${model}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getLecturaBySensorRequest(model: number): Promise<ILectura[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ILectura[]>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/by-sensor/${model}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getAllLecturasByFechaRequest(
		modelA: string
	): Promise<ILectura[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ILectura[]>(
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
	public getAllRequest(): Promise<ILectura[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ILectura[]>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/GetAll`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public postRequest(entity: ILectura): Promise<ILectura> {
		return new Promise((resolve, reject) => {
			axios
				.post<ILectura>(
					`${process.env.REACT_APP_API_URL}/${this.Url}`,
					entity
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public putRequest(entity: ILectura): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.put<boolean>(
					`${process.env.REACT_APP_API_URL}/${this.Url}`,
					entity
				)
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
				.delete<boolean>(
					`${process.env.REACT_APP_API_URL}/${this.Url}?Id=${Id}`
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
}
