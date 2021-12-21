import { IAppUser } from "app/models/IAppUser";
import { IAuthRequest } from "app/models/IAuthRequest";
import { IAuthResponse } from "app/models/IAuthResponse";
import axios from "axios";
import moment from "moment";

export class AppUserService {
	Url = "User";
	public LoginUser(model: IAuthRequest): Promise<IAuthResponse> {
		return new Promise((resolve, reject) => {
			axios
				.post<IAuthRequest>(
					`${process.env.REACT_APP_API_URL}/token/`,
					model
				)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getInfoUserById(model: number): Promise<IAppUser> {
		return new Promise((resolve, reject) => {
			axios
				.get<IAppUser>(`${process.env.REACT_APP_API_URL}/${this.Url}/GetUserById/${model}`)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public getInfoUserByDni(model: number): Promise<IAppUser> {
		return new Promise((resolve, reject) => {
			axios
				.get<IAppUser>(`${process.env.REACT_APP_API_URL}/${this.Url}/GetUserByDni/${model}`)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
	public registerRequest(entity: IAppUser): Promise<IAppUser> {
		return new Promise((resolve, reject) => {
			axios
				.post<IAppUser>(`${process.env.REACT_APP_API_URL}/${this.Url}/create/`, {
					email: entity.email,
					user_name: entity.username,
					first_name: entity.first_name,
					last_name: entity.last_name,
					password: entity.password,
					start_date: moment().format("YYY-MM-DD")
				})
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}
}
