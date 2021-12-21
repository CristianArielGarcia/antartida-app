import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";

import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

interface props {
	sensor: any;
	onVerGrafico: any;
}

export const SensorCard = ({ sensor, onVerGrafico }: props) => {
	return (
		<Card sx={{ maxWidth: 200 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{sensor.nombre}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Latitud: no tiene - Longitud: no tiene
				</Typography>
			</CardContent>
			<CardActions>
				<FormControlLabel
					onClick={(evento: any) => onVerGrafico(evento)}
					value={sensor.id}
					control={<Radio />}
					label=""
					sx={{
						"& .MuiSvgIcon-root": {
							fontSize: 30,
						},
					}}
				/>
				{/* <Button onClick= { (evento) => onVerGrafico(evento)} value={sensor.id} size="small" variant="contained">Seleccionar</Button> */}
				<Switch defaultChecked />
			</CardActions>
		</Card>
	);
};
