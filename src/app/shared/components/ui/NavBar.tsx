import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Drawer } from "./Drawer";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/middleware/store/store";
import { ThemeToggle } from "./themeToggle";

export const NavBar = (): JSX.Element => {
	const { Title } = useAppSelector((state) => state.appTitle);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Drawer />
					<div className="grid grid-cols-1 md:grid-cols-11 items-center w-full">
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							SGSA
						</Typography>
						<div className="col-span-1 text-md uppercase md:col-span-9 text-center md:text-xl font-medium">
							{Title}
						</div>
					</div>
					<ThemeToggle />
					<Button color="inherit">
						<Link to="/login">Login </Link>
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
