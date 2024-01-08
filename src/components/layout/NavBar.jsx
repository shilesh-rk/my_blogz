import styled from "@emotion/styled";

import {
	AppBar,
	Avatar,
	Button,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import React from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	justifyContent: "space-between",
});

const NavBar = ({ mode, sideNav }) => {
	const local = localStorage.getItem("BlogUserId");

	return (
		<AppBar
			sx={{ backgroundColor: mode === "light" ? "#F69100" : "" }}
			position='sticky'>
			<StyledToolbar>
				<Typography variant='h6' display={'flex'} justifyContent={'center'} alignItems={'center'}>
					<span className='logo'>
						<Button sx={{ display: { sm: "none" } }} onClick={sideNav}>
							<MenuOpenIcon sx={{ color: "#fff", fontSize: "3rem" }} />
						</Button>
						Blogz
					</span>
				</Typography>
				<Tooltip
					title={`${
						local
							? `user id : ${local?.toString().slice(0, 4)}`
							: "Please Login"
					}`}>
					<Avatar alt='User' />
				</Tooltip>
			</StyledToolbar>
		</AppBar>
	);
};

export default NavBar;
