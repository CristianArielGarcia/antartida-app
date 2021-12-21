import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	ListItemIcon,
} from "@mui/material";
import {
	Dashboard,
	Menu,
	ChevronRight,
	ExpandMore,
	ExitToApp,
	Sensors,
	PeopleAlt,
	Api,
	FilterHdr,
	Info,
	ContactMail,
} from "@mui/icons-material";

// import useFetchApi from "@app/shared/hooks/useFetchApi";
// import { IPersonal } from "@app/models/sgrh/IPersonal";
// import { usuarioSGRHSliceRequests } from "@app/Middleware/reducers/UsuarioSGRHSlice";
// import { GetInfoUser } from "@app/shared/helpers/userConfig";
// import { IAppUser } from "@app/models/IAppUser";
// import { authenticationSlice } from "@app/Middleware/reducers/AuthenticationSlice";
// import { useAppDispatch, useAppSelector } from "@app/Middleware/store/store";
// import { ThemeToggle } from "../themeToggle";
import {  useNavigate } from "react-router";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
	list: {
		width: 350,
	},
	fullList: {
		width: "auto",
	},
	paper: {
		background:
			"linear-gradient(45deg, rgba(220,15,77,0.8) 00%, rgba(155, 7, 45,0.6)  50%, rgba(220,15,77,0.8) 100%)," +
			// `url(${Images})`,
			"https://images.theconversation.com/files/376676/original/file-20201228-49872-119qm9b.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C798%2C499&q=45&auto=format&w=1000&fit=clip",
		backgroundSize: "cover",
		backgroundPositionX: "center",
		// color: theme.palette.primary.main
		color: "black",
	},
	root: {
		"& NoSsr SwipeArea": {
			width: 0,
		},
	},
	accordion: {
		padding: 0,
		boxShadow: "none",
		background: "transparent",
		border: 0,
		"& .Mui-expanded": {
			minHeight: "auto",
		},
	},
	summaryaccordion: {
		padding: 0,
		minHeight: "auto",
		flexDirection: "row-reverse",
		"& .MuiAccordionSummary-content": {
			margin: 0,
		},
		"& .MuiAccordionSummary-expandIcon": {
			color: "white",
		},
	},
	small: {
		width: "100%",
		height: "auto",
		gridColumn: "span 1",
	},
	contentaccordion: {
		padding: "0 0 0 24px",
		minHeight: "auto",
		flexDirection: "column",
		"& .MuiAccordionSummary-content": {
			margin: 0,
		},
	},
	listItem: {
		margin: 0,
		padding: 0,
	},
}));

export const Drawer = (): JSX.Element => {
	const classes = useStyles();
	const navigate = useNavigate();
	// const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	// const { State: InfoUsuario } = useFetchApi<IPersonal>(
	// 	usuarioSGRHSliceRequests.LoginUser,
	// 	GetInfoUser().dni || 0
	// );
	// const AppUserInfo: IAppUser = useAppSelector(
	// 	(state) => state.appUser.data as any
	// );
	// const handleLogOut = () => {
	// 	dispatch(authenticationSlice.actions.ForceLogOut());
	// };

	const historyPush = (page: string) => {
		navigate(page);
		setIsOpen(false);
	};

	return (
		<div>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="Menu"
				onClick={() => {
					setIsOpen(true);
				}}
				size="large"
			>
				<Menu />
			</IconButton>
			<SwipeableDrawer
				anchor="left"
				open={isOpen}
				SwipeAreaProps={{ width: 0 }}
				onClose={() => {
					setIsOpen(false);
				}}
				onOpen={() => {
					setIsOpen(true);
				}}
				classes={{ paper: classes.paper, root: classes.root }}
			>
				<div className={classes.list}>
					<Box
						className="text-2xl font-sans px-4 py-2"
						textAlign="center"
					>
						<div className="grid grid-cols-5">
							<Avatar
								alt="Cristian"
								className={classes.small}
								src="https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg"
							/>
							<div className="col-span-4 ml-4 text-black-50 text-sm font-medium text-left">
								<div>Cristian Garcia</div>
								<div>Desarrollador</div>
								<div>Editor</div>
							</div>
						</div>
					</Box>
					<div className="flex md:hidden justify-around items-center ">
						{/* <ThemeToggle /> */}
					</div>
					<Divider />
					<ListItem button>
						<ListItemIcon>
							<Dashboard />
						</ListItemIcon>
						<ListItemText
							className="text-black-50"
							primary={"Dashboard"}
						/>
					</ListItem>

					<Accordion className={classes.accordion}>
						<AccordionSummary
							className={classes.summaryaccordion}
							expandIcon={
								<ExpandMore className="text-black-50" />
							}
						>
							<ListItem button>
								<ListItemIcon>
									<Sensors />
								</ListItemIcon>
								<ListItemText
									className="text-black-50"
									primary={"Sensores"}
								/>
							</ListItem>
						</AccordionSummary>
						<AccordionDetails className={classes.contentaccordion}>
							<div className="flex items-center">
								<ChevronRight className="text-black-50" />
								<ListItem
									button
									onClick={() => {
										historyPush("/main");
									}}
								>
									<ListItemText
										primary={"Lista de sensores"}
										className="text-black-50"
									/>
								</ListItem>
							</div>
							<div className="flex items-center">
								<ChevronRight className="text-black-50" />
								<ListItem
									button
									onClick={() => {
										historyPush("/sensores");
									}}
								>
									<ListItemText
										primary={"Gestión de sensores"}
										className="text-black-50"
									/>
								</ListItem>
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion className={classes.accordion}>
						<AccordionSummary
							className={classes.summaryaccordion}
							expandIcon={
								<ExpandMore className="text-black-50" />
							}
						>
							<ListItem button>
								<ListItemIcon>
									<PeopleAlt />
								</ListItemIcon>
								<ListItemText
									className="text-black-50"
									primary={"Usuarios"}
								/>
							</ListItem>
						</AccordionSummary>
						<AccordionDetails className={classes.contentaccordion}>
							<div className="flex items-center">
								<ChevronRight className="text-black-50" />
								<ListItem
									button
									onClick={() => {
										historyPush("/users");
									}}
								>
									<ListItemText
										primary={"Lista de Usuarios"}
										className="text-black-50"
									/>
								</ListItem>
							</div>
							<div className="flex items-center">
								<ChevronRight className="text-black-50" />
								<ListItem
									button
									onClick={() => {
										historyPush(
											"/user/new"
										);
									}}
								>
									<ListItemText
										primary={"Nuevo Usuario"}
										className="text-black-50"
									/>
								</ListItem>
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion className={classes.accordion}>
						<AccordionSummary
							className={classes.summaryaccordion}
							expandIcon={
								<ExpandMore className="text-black-50" />
							}
						>
							<ListItem button>
								<ListItemIcon>
									<Api />
								</ListItemIcon>
								<ListItemText
									className="text-black-50"
									primary={"API"}
								/>
							</ListItem>
						</AccordionSummary>
						<AccordionDetails className={classes.contentaccordion}>
							<div className="flex items-center">
								<ChevronRight className="text-black-50" />
								<ListItem
									button
									onClick={() => {
										historyPush("/main/baterias/CRUD");
									}}
								>
									<ListItemText
										primary={"Endpoints Disponibles"}
										className="text-black-50"
									/>
								</ListItem>
							</div>
						</AccordionDetails>
					</Accordion>
					<Divider />
					<ListItem
						button
						onClick={() =>
							window.open(
								"https://www.cancilleria.gob.ar/es/iniciativas/dna/instituto-antartico-argentino",
								"_blank"
							)
						}
					>
						<ListItemIcon>
							<FilterHdr />
						</ListItemIcon>
						<ListItemText
							className="text-black-50"
							primary={"Instituto Antártico Argentino"}
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<Info />
						</ListItemIcon>
						<ListItemText
							className="text-black-50"
							primary={"Sobre Nosotros"}
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<ContactMail />
						</ListItemIcon>
						<ListItemText
							className="text-black-50"
							primary={"Contacto"}
						/>
					</ListItem>
					<Divider />
					<ListItem
						button
						onClick={() => {
							// handleLogOut();
							console.log("logout");
						}}
					>
						<ListItemIcon>
							<ExitToApp className="text-black-50" />
						</ListItemIcon>
						<ListItemText primary={"Salir"} />
					</ListItem>
				</div>
			</SwipeableDrawer>
		</div>
	);
};
