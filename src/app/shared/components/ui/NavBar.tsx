import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Drawer } from "./Drawer";
import { Link } from "react-router-dom";

export const NavBar = (): JSX.Element => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Drawer />
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						SGSA
					</Typography>
					<Button color="inherit">
						<Link to="/login">Login </Link>
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
