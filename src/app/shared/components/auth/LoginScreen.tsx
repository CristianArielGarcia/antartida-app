import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppUserSliceRequests } from "app/middleware/reducers/appUserSlice";
import { useNotificationUI } from "app/shared/hooks/useNotificationUI";
import { useAppDispatch } from "app/middleware/store/store";
import { Controller, useForm } from "react-hook-form";
import { IAuthRequest } from "app/models/IAuthRequest";

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				SGSA
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const defaultValues: IAuthRequest = {
	email: "",
	password: "",
};

const theme = createTheme();

export const LoginScreen = () => {
	const dispatch = useAppDispatch();
	const { openNotificationUI } = useNotificationUI();

	const { control, getValues } = useForm({ defaultValues });

	const navigate = useNavigate();
	const handleLogin = async () => {
		const { email, password } = getValues();

		let fetchLoginResponse;

		try {
			fetchLoginResponse = unwrapResult(
				await dispatch(AppUserSliceRequests.LoginUser({ email: email, password: password }))
			);
		} catch (error) {
			fetchLoginResponse = null;
		}

		if (fetchLoginResponse) {
			openNotificationUI("Inicio de sesión correcto", "success");
			navigate("/main");
		} else {
			openNotificationUI("Error al iniciar sesión", "error");
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Iniciar Sesión
					</Typography>
					<Box component="form" sx={{ mt: 1 }}>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									label="Correo electrónico"
									name="email"
									autoComplete="none"
								/>
							)}
						/>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									type="password"
									label="Contraseña"
									name="contraseña"
									autoComplete="none"
								/>
							)}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Recordarme"
						/>
						<Button
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleLogin}
						>
							Iniciar Sesión
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Olvidaste tu contraseña?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"No tenes una cuenta? Registrate"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};
