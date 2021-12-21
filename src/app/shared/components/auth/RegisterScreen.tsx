import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppUserSliceRequests } from "app/middleware/reducers/appUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/middleware/store/store";
import { IAppUser } from "app/models/IAppUser";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useNotificationUI } from "app/shared/hooks/useNotificationUI";
import { first } from "lodash";

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

const theme = createTheme();

const defaultValues = {
	first_name: "",
	last_name: "",
	username: "",
	email: "",
	password: "",
};

export const RegisterScreen = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { openNotificationUI } = useNotificationUI();

	const { control, getValues } = useForm({ defaultValues });

	const handleRegister = async () => {
		const { email, username, password, first_name, last_name } = getValues();

		const nuevoUsuario: IAppUser = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			username: username,
			password: password,
		};

		console.log(nuevoUsuario);

		let fetchRegisterRequest;

		try {
			fetchRegisterRequest = unwrapResult(
				await dispatch(AppUserSliceRequests.registerRequest(nuevoUsuario))
			);
		} catch (error) {
			fetchRegisterRequest = null;
		}

		if (fetchRegisterRequest) {
			openNotificationUI("Registrado correctamente", "success");
			navigate("/login");
		} else {
			openNotificationUI("No se pudo completar el registro", "error");
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
						Registro
					</Typography>
					<Box component="form" sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Controller
									name="first_name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											required
											fullWidth
											label="Nombre"
											name="firstName"
											autoComplete="none"
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Controller
									name="last_name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											required
											fullWidth
											label="Apellido"
											name="last_name"
											autoComplete="none"
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Controller
									name="username"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											required
											fullWidth
											label="Nombre de usuario"
											name="username"
											autoComplete="none"
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											required
											fullWidth
											id="email"
											label="Correo electrónico"
											autoComplete="email"
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Controller
									name="password"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											required
											fullWidth
											label="Contraseña"
											type="password"
											id="password"
											autoComplete="new-password"
										/>
									)}
								/>
							</Grid>
						</Grid>
						<Button
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleRegister}
						>
							Registrarse
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Ya tenes una cuenta? inicia sesión
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
};
