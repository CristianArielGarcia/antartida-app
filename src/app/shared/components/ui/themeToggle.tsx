/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from "react-redux";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import { useDarkModeClass } from "app/shared/hooks/useDarkMode";
import { ColorAppSlice } from "app/middleware/reducers/ColorAppSlice";

export const ThemeToggle = (): JSX.Element => {
	const [isDark, setIsDark] = useDarkModeClass();
	const dispatch = useDispatch();

	const handleChange = () => {
		setIsDark(!isDark);
		dispatch(ColorAppSlice.actions.changeColor(!isDark));
	};

	return (
		<>
			<Switch
				checked={isDark}
				onChange={handleChange}
				name="derecha"
				inputProps={{ "aria-label": "secondary checkbox" }}
			/>
			<IconButton size="large">
				{!isDark ? (
					<Brightness7Icon htmlColor="white"></Brightness7Icon>
				) : (
					<Brightness4Icon htmlColor="white"></Brightness4Icon>
				)}
			</IconButton>
		</>
	);
};
