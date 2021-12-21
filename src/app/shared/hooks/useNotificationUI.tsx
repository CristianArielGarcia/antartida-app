import { AlertColor } from "@mui/material/Alert";
import { NotificationSlice } from "app/middleware/reducers/notificationUISlice";
import { useAppDispatch } from "app/middleware/store/store";

export const useNotificationUI = () => {
	// const { openDialog } = React.useContext(ConfirmationDialogContext);
	const dispatch = useAppDispatch();
	function openNotificationUI(mensaje: string, type: AlertColor): void {
		dispatch(NotificationSlice.actions.notificationUIopen({ Mensaje: mensaje, type: type }));
	}

	return { openNotificationUI };
};
