import { CardContent, Grid, Typography, Card, TextField, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ContactUs = (): JSX.Element => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [toSend, setToSend] = useState({
		nombre: '',
		apellido: '',
		email: '',
		mensaje: '',
	  });
	
	  const onSubmit = (e:any) => {
		e.preventDefault();
		console.log(toSend)
    axios.post(`http://127.0.0.1:8000/api/contacto/create/`, toSend).then(function (response) {
		console.log(response.data);
	  })
	  .catch(function (error) {
		console.log(error.response.data);
	  });
}
	
	  const handleChange = (e:any) => {
		setToSend({ ...toSend, [e.target.name]: e.target.value });
	  };

	  const historyPush = (page: string) => {
		alert("Mensaje enviado con éxito!")
		navigate(page);
		setIsOpen(false);
	};

		return (
			<div>
				<Typography gutterBottom variant="h3" align="center" sx={{ pt: 2 }}>
					SGSA
				</Typography>
				<Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
					<CardContent>
						<Typography gutterBottom variant="h5">
							Contactános!
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{" "}
							Llena este formulario y el equipo del IAA se podra en contacto contigo en la
							brevedad
						</Typography>
						<form onSubmit={onSubmit}>
							<Grid container spacing={1}>    
								<Grid xs={12} sm={6} item>
									<TextField
										name="nombre"
										label="Nombre"
										placeholder="Ingrese su nombre"
										onChange={handleChange}
										variant="outlined"
										fullWidth
										required
									/>
								</Grid>
								<Grid xs={12} sm={6} item>
									<TextField
										name="apellido"
										label="Apellido"
										placeholder="Ingrese su apellido"
										onChange={handleChange}
										variant="outlined"
										fullWidth
										required
									/>
								</Grid>
								<Grid xs={12} item>
									<TextField
										name="email"
										type="email"
										label="Email"
										placeholder="Ingrese su email"
										onChange={handleChange}
										variant="outlined"
										fullWidth
										required
									/>
								</Grid>
								<Grid xs={12} item>
									<TextField
										name="mensaje"
										label="Mensaje"
										multiline
										rows={4}
										placeholder="Solicitud..."
										onChange={handleChange}
										variant="outlined"
										fullWidth
										required
									/>
								</Grid>
								<Grid xs={12} item>
									<Button
										type="submit"
										value="Submit"
										variant="contained"
										color="primary"
										fullWidth
										onClick={() => {
											historyPush("/main");
										}}
									>
										Enviar
									</Button>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</div>
		);
	};
export default ContactUs;
