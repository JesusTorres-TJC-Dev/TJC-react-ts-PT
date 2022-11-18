import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '@/models';
import { AppStore } from '@/redux/store';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { addFavorite } from '@/redux/states';

export interface PeopleTableInterface {}

const PeopleTable : React.FC<PeopleTableInterface> = () => {
	const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
	const pageSize = 5
	const distatch = useDispatch()
	const statePeople = useSelector((store: AppStore) => store.people)
	const stateFavoritePeople = useSelector((store: AppStore) => store.favorites)

	const findPerson = (person: Person) => !!stateFavoritePeople.find(p => p.id === person.id);
  	const filterPerson = (person: Person) => selectedPeople.filter(p => p.id !== person.id);

	const handleChange = (person: Person) => {
		const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
		distatch(addFavorite(filteredPeople))
		setSelectedPeople(filteredPeople)
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
						<Checkbox
							size='small'
							checked={findPerson(params.row)}
							onChange={() => handleChange(params.row)}
						/>
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

	useEffect(() => {
		setSelectedPeople(stateFavoritePeople)
	}, [stateFavoritePeople])

	return (
		<DataGrid
			disableColumnSelector
			disableSelectionOnClick
			autoHeight
			pageSize={pageSize}
			rowsPerPageOptions={[pageSize]}

			rows={statePeople}
			columns={columns}
			getRowId={(row: any) => row.id}
		/>
	);
};

export default PeopleTable;