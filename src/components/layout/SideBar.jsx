// Import statements
import React, { useState } from "react";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch,
	Drawer,
	Button,
	FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Login from "../Login";
import Register from "../Register";
import CreatePost from '../Pages/CreatePost'
import toast from "react-hot-toast";
import styled from "@emotion/styled";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	"& .MuiSwitch-switchBase": {
		margin: 1,
		padding: 0,
		transform: "translateX(px)",
		"&.Mui-checked": {
			color: "#fff",
			transform: "translateX(22px)",
			"& .MuiSwitch-thumb:before": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					"#fff"
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#F69100",
		width: 32,
		height: 32,
		"&::before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				"#fff"
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	"& .MuiSwitch-track": {
		opacity: 1,
		backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
		borderRadius: 20 / 2,
	},
}));

const SideBar = ({ mode, toggleThemeMode, navOpen, setNavOpen }) => {
	const [loginDialog, setOpenLogin] = useState(false);
	const [registerDialog, setOpenRegister] = useState(false);
	const [createPostDialog, setOpenCreatePostDialog] = useState(false);

	const isLogin = localStorage.getItem("BlogUserId");

	const handleLogout = () => {
		try {
			toast.success("Logout Successfully");
			localStorage.clear();
			window.location.reload();
		} catch (error) {
			toast.error("Logout Failed");
			console.log(error);
		}
	};

	const menuList = () => (
		<Box
			zIndex={1}
			height='100vh'
			position='fixed'
			top='60px'
			sx={{
				backgroundColor: mode === "light" ? "#ffffff" : "#303030",
				whiteSpace: "nowrap",
			}}>
			<List>
				<ListItem disablePadding>
					<ListItemButton
						component={Link}
						to='/'
						onClick={() => setNavOpen(false)}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Home' />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						LinkComponent={Link}
						onClick={() => setNavOpen(false)}
						to='/my-blogs'>
						<ListItemIcon>
							<StickyNote2Icon />
						</ListItemIcon>
						<ListItemText primary={"My Blogs"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={setOpenCreatePostDialog}>
						<ListItemIcon>
							<NoteAddIcon />
						</ListItemIcon>
						<ListItemText primary={"Create Blog"} />
					</ListItemButton>
				</ListItem>
				<Divider sx={{ width: "200px" }} />
				<ListItem disablePadding>
					<ListItemButton onClick={() => setOpenRegister(true)}>
						<ListItemIcon>
							<PersonAddIcon />
						</ListItemIcon>
						<ListItemText primary={"Register"} />
					</ListItemButton>
				</ListItem>
				{isLogin ? (
					<>
						<ListItem disablePadding>
							<ListItemButton onClick={handleLogout}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary={"Logout"} />
							</ListItemButton>
						</ListItem>
					</>
				) : (
					<ListItem disablePadding>
						<ListItemButton onClick={() => setOpenLogin(true)}>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText primary={"Login"} />
						</ListItemButton>
					</ListItem>
				)}
				<ListItem disablePadding>
					
						
						<FormControlLabel
							control={
								<MaterialUISwitch sx={{ m: 1 }} onClick={toggleThemeMode} />
							}
							label='Theme'
						/>
					
				</ListItem>
			</List>
			<Divider sx={{ width: "200px" }} />
		</Box>
	);

	return (
		<>
			{/* ... (rest of the code) */}
			<Box
				height={`calc(100vh - 50px)`}
				flex={1}
				p={2}
				sx={{
					display: {
						xs: "none",
						sm: "block",
					},
					backgroundColor: navOpen
						? mode === "light"
							? "#ffffff"
							: "#303030"
						: "",
				}}>
				{menuList()}
			</Box>
			<Drawer
				anchor='left'
				open={navOpen}
				onClose={() => setNavOpen(false)}
				sx={{
					display: {
						xs: "block",
						sm: `"none"`,
					},
					"& .MuiDrawer-paper": {
						width: "230px",
					},
				}}>
				<Box>
					<Button
						sx={{
							margin: 1,
							color: "white",
							backgroundColor: `${mode === "light" ? "#F69100" : ""}`,
							width: "90%",
							"&:hover": {
								color: `${mode === "light" ? "#303030" : "#ffffff"}`,
								border: 1,
								borderColor: `${mode === "light" ? "#303030" : "#ffffff"}`,
							},
						}}
						onClick={() => setNavOpen(false)}>
						Close me
					</Button>
					{menuList()}
				</Box>
			</Drawer>

			<Login
				dialog={loginDialog}
				setOpenDialog={() => setOpenLogin(false)}
				mode={mode}
			/>
			<Register
				dialog={registerDialog}
				setOpenDialog={() => setOpenRegister(false)}
				mode={mode}
			/>
			<CreatePost
				mode={mode}
				dialog={createPostDialog}
				setOpenDialog={setOpenCreatePostDialog}
			/>
		</>
	);
};

export default SideBar;
