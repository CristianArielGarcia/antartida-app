import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";

interface props {
	sensor: any;
	onVerGrafico: any;
}

export const SensorCard = ({ sensor,onVerGrafico }: props) => {
	return (
		<Card sx={{ maxWidth: 150 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{sensor.nombre}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Latitud: no tiene - Longitud: no tiene
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick= { (evento) => onVerGrafico(evento)} value={sensor.id} size="small" variant="contained">Ver Gráfico</Button>
                <Switch defaultChecked />
			</CardActions>
		</Card>
	);
};
