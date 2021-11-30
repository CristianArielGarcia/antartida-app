import { IPagedPaginator } from "./IPagedPaginator";

export interface IIniState<T> {
	loading: string | null;
	data: T | T[] | boolean | null;
	PaginatorData?: IPagedPaginator<T> | null;
}
