import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		padding: theme.spacing(1),
		position: "fixed",
		top: theme.spacing(2),
		bottom: theme.spacing(2),
		paddingBottom: 0,
		maxWidth: "unset",
	},
	buttonClose: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

interface props {
	title: string;
	children: JSX.Element;
	openPopup: boolean;
	setOpenPopup: any;
}
export const ModalCompoment = ({
	title,
	children,
	openPopup,
	setOpenPopup,
}: props): JSX.Element => {
	const classes = useStyles();
	return (
		<Dialog
			onClose={() => {
				setOpenPopup(false);
			}}
			open={openPopup}
			classes={{ paper: classes.dialogWrapper }}
		>
			<button
				className={classes.buttonClose}
				color="secondary"
				onClick={() => {
					setOpenPopup(false);
				}}
			>
				<CloseIcon />
			</button>
			<DialogTitle>
				<div className="bg-gradient-to-r from-newsan via-newsanLighten to-newsan shadow-elevation-6 rounded-md text-gray-900 dark:text-gray-200 ">
					<div className="rounded-xl text-center px-4 py-2">
						<h1 className="text-2xl text-gray-900 dark:text-gray-50 ">{title}</h1>
					</div>
				</div>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
};
