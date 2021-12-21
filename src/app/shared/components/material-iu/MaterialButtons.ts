import makeStyles from "@mui/styles/makeStyles";
import { colors } from "@mui/material";
import { alpha } from "@mui/material/styles";
export const MaterialButtons = makeStyles((theme) => ({
	purpleButton: {
		color: theme.palette.getContrastText(colors.purple[500]),
		backgroundColor: colors.purple[500],
		"&:hover": {
			backgroundColor: colors.purple[700],
		},
		"&:disabled": {
			backgroundColor: alpha(colors.grey[900], 0.12),
		},
	},
	greenButton: {
		color: theme.palette.getContrastText(colors.green[600]),
		backgroundColor: colors.green[600],
		"&:hover": {
			backgroundColor: colors.green[700],
		},
		"&:disabled": {
			backgroundColor: alpha(colors.grey[900], 0.12),
		},
	},
	yellowButton: {
		color: theme.palette.getContrastText(colors.yellow[500]),
		backgroundColor: colors.yellow[500],
		"&:hover": {
			backgroundColor: colors.yellow[700],
		},
		"&:disabled": {
			backgroundColor: alpha(colors.grey[900], 0.12),
		},
	},
	blueButton: {
		color: theme.palette.getContrastText(colors.blue[500]),
		backgroundColor: colors.blue[500],
		"&:hover": {
			backgroundColor: colors.blue[700],
		},
	},
	redButton: {
		color: theme.palette.getContrastText(colors.red[500]),
		backgroundColor: colors.red[500],
		"&:hover": {
			backgroundColor: colors.red[700],
		},
	},
}));

export const IconButtons = makeStyles((theme) => ({
	purpleIcon: {
		color: colors.purple[500],
		"&:hover": {
			backgroundColor: alpha(colors.purple[500], 0.1),
		},
		"&:disabled": {
			backgroundColor: alpha(colors.grey[900], 0.12),
		},
	},
	greenIcon: {
		color: colors.green[600],
		"&:hover": {
			backgroundColor: alpha(colors.green[600], 0.1),
		},
	},
	yellowIcon: {
		color: colors.yellow[500],
		"&:hover": {
			backgroundColor: alpha(colors.yellow[500], 0.1),
		},
	},
}));
