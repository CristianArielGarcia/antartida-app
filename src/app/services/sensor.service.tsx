import axios from "axios";
import { ISensor } from "../models/ISensor";

export class SensorService {
	Url = "Sensor";
	public getAllLecturasRequest(
		modelA: string,
		modelB: string
	): Promise<ISensor[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ISensor[]>(
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
	public getSensorByIdRequest(model: number): Promise<ISensor> {
		return new Promise((resolve, reject) => {
			axios
				.get<ISensor>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/Detail/${model}`
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
	): Promise<ISensor[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ISensor[]>(
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
	public getAllRequest(): Promise<ISensor[]> {
		return new Promise((resolve, reject) => {
			axios
				.get<ISensor[]>(
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
	public postRequest(entity: ISensor): Promise<ISensor> {
		return new Promise((resolve, reject) => {
			axios
				.post<ISensor>(
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
	public putRequest(entity: ISensor): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.put<boolean>(
					`${process.env.REACT_APP_API_URL}/${this.Url}/Update/${entity.id}`,
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
