import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
//import { CustomDialog } from '../CustomDialog';
import { FavoriteTable } from './FavoriteTable';
import CustomDialog, { dialogOpenSubject$ } from '../CustomDialog/CustomDialog';
export interface NavbarInterface {}

const Navbar : React.FC<NavbarInterface> = () => {
	const handleClick = () => {
		dialogOpenSubject$.setSubject = true
	}

	return (
		<>
			<CustomDialog>
				<FavoriteTable/>
			</CustomDialog>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						TJC Programing
					</Typography>
					<IconButton
						color="secondary"
						aria-label="favorites"
						component="label"
						onClick={handleClick}
					>
						<FavoriteIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
