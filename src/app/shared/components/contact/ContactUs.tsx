import { CardContent, Grid, Typography, Card, TextField, Button } from "@mui/material";
import React from "react";
import { useState } from 'react';
import emailjs from 'emailjs-com';

     export const ContactUs = (): JSX.Element => {

        function onSubmit (e: any) {
            e.preventDefault();
            emailjs.sendForm(
                'service_3o8w1ab',
                'template_7h2nxxl',
                e.target,
                'user_ucPAMzGz8gP9XbEwXYHPf'
              )
                .then((response) => {
                  console.log('Enviado con exito !', response.status, response.text);
                })
                .catch((err) => {
                  console.log('FAILED...', err);
                });
          };
        return(
            <div className="Contact">
                <Typography gutterBottom variant="h3" align="center" sx={{ pt: 2 }}>
                    SGSA
                </Typography>
                <Card style={{maxWidth:450, margin:"0 auto",padding:"20px 5px"}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5">Contactános!</Typography>
                        <Typography variant="body2" color="textSecondary" component="p"> Llena este formulario  y el equipo del IAA se podra en contacto contigo en la brevedad</Typography>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={6} item>
                                    <TextField name="nombre" label="Nombre" placeholder="Ingrese su nombre" variant="outlined" fullWidth required/>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField name="apellido" label="Apellido" placeholder="Ingrese su apellido" variant="outlined"  fullWidth required/>
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField name="email" type= "email" label="Email" placeholder="Ingrese su email" variant="outlined"  fullWidth required/>
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField name="mensaje" label="Mensaje" multiline rows={4} placeholder="Solicitud..." variant="outlined"  fullWidth required/>
                                </Grid>
                                <Grid xs={12} item>
                                     <Button type="submit" value="send" variant="contained" color="primary" fullWidth>Enviar</Button> 
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
}
export default ContactUs;