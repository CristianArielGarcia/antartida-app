import { AppTitleSlice } from "app/middleware/reducers/appTitleSlice";
import { useAppDispatch } from "app/middleware/store/store";

interface props {
	func: any;
}
export default function useAppTitle() {
	const dispatch = useAppDispatch();
	const TitleChanger = (title: string) => {
		dispatch(AppTitleSlice.actions.SetAppTitle({ Title: title }));
	};

	return {
		TitleChanger,
	};
}
