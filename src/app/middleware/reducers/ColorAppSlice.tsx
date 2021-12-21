import { createSlice, PayloadAction } from "@reduxjs/toolkit";
function getInfo(): boolean {
	const value = window.localStorage.getItem("dark-mode");
	if (value) {
		return value === "true";
	}
	return false;
}

export const ColorAppSlice = createSlice({
	name: "ColorApp",
	initialState: { darkMode: getInfo() },
	reducers: {
		changeColor: (state, action: PayloadAction<boolean>) => {
			state.darkMode = action.payload;
		},
	},
});
