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
}

export const SensorCard = ({ sensor }: props) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				component="img"
				height="100"
				image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToWLO2969QuO8Md8R1gkqbLKzxQo4kDppOXA&usqp=CAU"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{sensor.nombre}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Latitud: no tiene - Longitud: no tiene
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="contained">Ver Gráfico</Button>
                <Switch defaultChecked />
			</CardActions>
		</Card>
	);
};
