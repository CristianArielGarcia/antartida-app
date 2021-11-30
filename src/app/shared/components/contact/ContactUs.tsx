import { CardContent, Grid, Typography, Card, TextField, Button } from "@mui/material";
import React from "react";


export const ContactUs = (): JSX.Element => {
	return(
        <div className="Contact">
            <Typography gutterBottom variant="h3" align="center" sx={{ pt: 2 }}>
                SGSA
            </Typography>
            <Card style={{maxWidth:450, margin:"0 auto",padding:"20px 5px"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5">Contactános!</Typography>
                    <Typography variant="body2" color="textSecondary" component="p"> Llena este formulario  y el equipo del IAA se podra en contacto contigo en la brevedad</Typography>
                    <form>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Nombre" placeholder="Ingrese su nombre" variant="outlined" fullWidth required/>
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Apellido" placeholder="Ingrese su apellido" variant="outlined" fullWidth required/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField type= "email" label="Email" placeholder="Ingrese su email" variant="outlined" fullWidth required/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField label="Mensaje" multiline rows={4} placeholder="Solicitud..." variant="outlined" fullWidth required/>
                            </Grid>
                            <Grid xs={12} item>
                                <Button type="submit" variant="contained" color="primary" fullWidth>Enviar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default ContactUs;
