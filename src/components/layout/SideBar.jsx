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
} from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Login from "../Login";
import Register from "../Register";
import CreatePost from '../Pages/CreatePost'
import toast from "react-hot-toast";

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
							<AddCircleOutlineIcon />
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
							<AddCircleOutlineIcon />
						</ListItemIcon>
						<ListItemText primary={"My Blogs"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={setOpenCreatePostDialog}>
						<ListItemIcon>
							<AddCircleOutlineIcon />
						</ListItemIcon>
						<ListItemText primary={"Create Blog"} />
					</ListItemButton>
				</ListItem>
				<Divider sx={{ width: "200px" }} />
				<ListItem disablePadding>
					<ListItemButton onClick={() => setOpenRegister(true)}>
						<ListItemIcon>
							<AddCircleOutlineIcon />
						</ListItemIcon>
						<ListItemText primary={"Register"} />
					</ListItemButton>
				</ListItem>
				{isLogin ? (
					<>
						<ListItem disablePadding>
							<ListItemButton onClick={handleLogout}>
								<ListItemIcon>
									<AddCircleOutlineIcon />
								</ListItemIcon>
								<ListItemText primary={"Logout"} />
							</ListItemButton>
						</ListItem>
					</>
				) : (
					<ListItem disablePadding>
						<ListItemButton onClick={() => setOpenLogin(true)}>
							<ListItemIcon>
								<AddCircleOutlineIcon />
							</ListItemIcon>
							<ListItemText primary={"Login"} />
						</ListItemButton>
					</ListItem>
				)}
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<AddCircleOutlineIcon />
						</ListItemIcon>
						<Switch color='warning' onClick={toggleThemeMode} />
					</ListItemButton>
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
