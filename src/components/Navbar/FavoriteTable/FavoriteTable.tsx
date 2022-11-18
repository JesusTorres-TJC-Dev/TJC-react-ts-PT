import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '@/models';
import { AppStore } from '@/redux/store';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFavorite } from '@/redux/states';
export interface FavoriteTableInterface {}

const FavoriteTable : React.FC<FavoriteTableInterface> = () => {
	const pageSize = 5
	const distatch = useDispatch()
	const stateFavorites = useSelector((store: AppStore) => store.favorites)

	const handleClick = (person: Person) => {
		distatch(removeFavorite(person))
	}
	
	const columns = [
		{
			field: 'actions',
			type: 'actions',
      		sortable: false,
			headerName: '',
			width: 50,
			renderCell: (params: GridRenderCellParams) => (
				<>
					{
						<IconButton
							color="secondary"
							aria-label="favorites"
							component="label"
							onClick={() => handleClick(params.row)}
						>
							<DeleteIcon/>
						</IconButton>
					}
				</>
			)
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'category',
			headerName: 'Category',
			flex: 1,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'company',
			headerName: 'Company',
			flex: 1,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'levelOfHappiness',
			headerName: 'LOH',
			flex: 1,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
	]
	return (
		<DataGrid
			disableColumnSelector
			disableSelectionOnClick
			autoHeight
			pageSize={pageSize}
			rowsPerPageOptions={[pageSize]}

			rows={stateFavorites}
			columns={columns}
			getRowId={(row: any) => row.id}
		/>
	);
};

export default FavoriteTable;