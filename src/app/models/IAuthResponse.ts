export type IAuthResponse = {
	id?: number | null;
	email?: string | null;
	username?: string | null;
	token?: string | null;
	accessToken?: string | null;
	isStaff?: boolean | null;
	isActive?: boolean | null;
};
