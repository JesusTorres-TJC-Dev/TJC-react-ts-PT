import React, { useEffect } from 'react';
import { People } from '@/data';
import { useDispatch } from 'react-redux';
import { addFavorite, addPeople } from '@/redux/states';
import { PeopleTable } from './components';

export interface HomeInterface {}

const Home : React.FC<HomeInterface> = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addPeople(People))
	}, [])

	return (
		<PeopleTable/>
	);
};

export default Home;