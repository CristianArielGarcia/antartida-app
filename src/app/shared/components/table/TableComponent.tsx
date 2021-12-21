import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Collapse, TableFooter, TableSortLabel, TextField } from "@mui/material";
import { Delete, Edit, Search, Visibility } from "@mui/icons-material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import _ from "lodash";
import { visuallyHidden } from "@mui/utils";
import classNames from "classnames";
import { Buscador } from "app/shared/helpers/deepSearch";
import { IQuery, IQueryResult } from "app/models/IQuery";
export const divofacctions =
	"w-full py-2 sm:col-span-1 items-center grid grid-cols-3 sm:grid-cols-2 sm:border-2 sm:content-center border-gray-500 rounded-md px-0 sm:px-4 gap-2 sm:gap-4";

interface propsTable {
	dataInfo?: any;
	agregar?: (props?: any) => any;
	columns: { title: string; field: string | ((row: any) => any) }[];
	buscar?: boolean;
	Dense?: boolean;
	IDcolumn: string;
	AsyncData?: (query: IQuery<any>) => Promise<IQueryResult<any>>;
	Collapse?: boolean;
	CollapseExtraModulesBefore?: any;
	CollapseExtraModulesAfter?: any;
	CollapseOverride?: any;
	Edit?: (props?: any) => any;
	Delete?: (props?: any) => any;
	rowStyle?: (props?: any) => any;
	Watch?: (props?: any) => any;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (_.get(b, orderBy) < _.get(a, orderBy)) {
		return -1;
	}
	if (_.get(b, orderBy) > _.get(a, orderBy)) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }
const ModuleCollapse = (props: any) => {
	const { row } = props;
	return (
		<>
			{props.CollapseOverride ? (
				<props.CollapseOverride />
			) : (
				<div className="w-full sm:flex  sm:items-stretch sm:justify-center sm:gap-2 px-8">
					{props.CollapseExtraModulesBefore && (
						<props.CollapseExtraModulesBefore row={row} />
					)}
					{(props.Edit || props.Watch || props.Delete) && (
						<div className={divofacctions}>
							<div className=" font-bold">Acciones </div>
							<div className="col-span-2 sm:col-span-1 text-right justify-end flex gap-4">
								{props.Edit && (
									<IconButton
										className="textButtons"
										onClick={() => {
											props.Edit(row);
										}}
										size="large"
									>
										<Edit />
									</IconButton>
								)}
								{props.Watch && (
									<IconButton
										className="textButtons"
										onClick={() => {
											props.Watch(row);
										}}
										size="large"
									>
										<Visibility />
									</IconButton>
								)}
								{props.Delete && (
									<IconButton
										className="textButtons"
										onClick={() => {
											props.Delete(row);
										}}
										color="error"
										size="large"
									>
										<Delete />
									</IconButton>
								)}
							</div>
						</div>
					)}
					{props.CollapseExtraModulesAfter && (
						<props.CollapseExtraModulesAfter row={row} />
					)}
				</div>
			)}
		</>
	);
};
const RowBody = (props: any) => {
	const { row, rowStyle } = props;
	const [open, setOpen] = React.useState(false);
	const funcionDeRenderizado = (row) => {
		if (rowStyle) {
			return {
				"&:last-child td, &:last-child th": { border: 0 },
				"& > *": { borderBottom: "unset" },
				...rowStyle(row),
			};
		} else {
			return {
				"&:last-child td, &:last-child th": { border: 0 },
				"& > *": { borderBottom: "unset" },
			};
		}
	};
	return (
		<>
			<TableRow role="checkbox" sx={funcionDeRenderizado(row)}>
				{props.Collapse && (
					<TableCell
						sx={{ "@media (max-width: 640px)": { padding: "0", position: "relative" } }}
					>
						<IconButton
							sx={{
								"@media (max-width: 640px)": {
									position: "absolute",
									padding: 0,
									top: "4px",
								},
							}}
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}
						>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
				)}
				{props.columns?.map((element, index) => (
					<TableCell
						align="left"
						key={element.field}
						sx={{ "@media (max-width: 640px)": { padding: "0rem 2rem" } }}
					>
						<div
							className={classNames(
								"w-full grid grid-cols-3 sm:grid-cols-2 gap-4",
								props.Dense ? "py-0" : "py-2"
							)}
						>
							<div className="sm:hidden font-bold">{element.title}:</div>
							<div
								className={classNames(
									"col-span-2 text-right  sm:text-left",
									props.Dense ? "text-sm" : "text-base"
								)}
							>
								{typeof element.field === "string"
									? _.get(row, element.field)
									: element.field(row)}
							</div>
						</div>
					</TableCell>
				))}
			</TableRow>
			{props.Collapse && (
				<TableRow>
					<TableCell
						style={{ paddingBottom: 0, paddingTop: 0 }}
						colSpan={props.columns.length + 1}
						sx={{
							"@media (max-width: 640px)": {
								padding: "0rem 0rem",
							},
						}}
					>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<ModuleCollapse row={row} {...props} />
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

function EnhancedTableHead(props: any) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead sx={{ fontSize: "1rem" }}>
			<TableRow>
				{props.Collapse && <TableCell padding="checkbox" />}
				{props.columns.map((element) => (
					<TableCell
						className="text-base"
						align="left"
						key={element.title}
						sortDirection={orderBy === element.title ? order : false}
					>
						<TableSortLabel
							active={orderBy === element.title}
							direction={orderBy === element.title ? order : "asc"}
							onClick={createSortHandler(element.title)}
						>
							{element.title}
							{orderBy === element.title ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
		// {/* <TableHead>
		//   <TableRow>
		//     {headCells.map((headCell) => (
		//       <TableCell
		//         key={headCell.id}
		//         align={headCell.numeric ? "right" : "left"}
		//         padding={headCell.disablePadding ? "none" : "normal"}
		//         sortDirection={orderBy === headCell.id ? order : false}>
		//         <TableSortLabel
		//           active={orderBy === headCell.id}
		//           direction={orderBy === headCell.id ? order : "asc"}
		//           onClick={createSortHandler(headCell.id)}>
		//           {headCell.label}
		//           {orderBy === headCell.id ? (
		//             <Box component="span" sx={visuallyHidden}>
		//               {order === "desc" ? "sorted descending" : "sorted ascending"}
		//             </Box>
		//           ) : null}
		//         </TableSortLabel>
		//       </TableCell>
		//     ))}
		//   </TableRow>
		// </TableHead> */}
	);
}
export const TableComponent = (props: propsTable) => {
	const [DataOpen, setData] = useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [searchString, setSearchString] = React.useState("");
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState("");
	const [totalCount, setTotalCount] = React.useState(0);

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	//const [TotalPages, setTotalPages] = React.useState(0);
	// Avoid a layout jump when reaching the last page with empty rows.
	//const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.dataInfo.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleChange = (e: any) => {
		if (props.dataInfo) {
			setData(Buscador(props.dataInfo, e.target.value));
		} else {
			setSearchString(e.target.value);
		}
	};
	const memorize = React.useCallback(_.debounce(handleChange, 500), [handleChange]);

	const handleAsyncData = async () => {
		const result = await props.AsyncData({
			page: page,
			pageSize: rowsPerPage,
			search: searchString,
		});
		setTotalCount(result.totalCount);
		//setTotalPages(result.page);
		setData(result.data);
	};

	React.useEffect(() => {
		//setData(_.cloneDeep(props.dataInfo));
		if (!props.dataInfo) {
			if (props.AsyncData) {
				handleAsyncData();
			}
		} else {
			setData(_.cloneDeep(props.dataInfo));
		}
	}, [props, rowsPerPage, page, searchString]);

	return (
		<div>
			{props.buscar && (
				<div className="my-2 h-full">
					{/* aca va el search  */}
					<div className="flex rounded-lg items-center px-2 w-full my-2 bg-secondaryNew shadow-elevation-4">
						{props.agregar && (
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									props.agregar();
								}}
							>
								Agregar
							</Button>
						)}
						<div className=" text-gray-900 dark:text-gray-200 px-2 pb-4">
							<div className="flex items-end">
								<Search />
								<TextField
									id="busqueda"
									fullWidth
									label="Buscar"
									type="search"
									onChange={memorize}
									variant="standard"
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			<TableContainer component={Paper} className="shadow-elevation-6 rounded-lg">
				<Table size="small" aria-label="simple table">
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						{...props}
					/>
					<TableBody>
						{props.dataInfo?.length > 0
							? (rowsPerPage > 0
									? DataOpen?.sort(
											getComparator(
												order,
												props.columns.find((x) => x.title === orderBy)
													?.field as any
											)
									  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									: DataOpen
							  ).map((row: any) => (
									<RowBody
										{...props}
										row={row}
										key={_.get(row, props.IDcolumn)}
									/>
							  ))
							: DataOpen.map((row: any) => (
									<RowBody
										{...props}
										row={row}
										key={_.get(row, props.IDcolumn)}
									/>
							  ))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
								count={props.dataInfo ? DataOpen.length : totalCount}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	);
};
