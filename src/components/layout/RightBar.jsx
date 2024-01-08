import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../../Api";
import { authActions } from "../redux/store";
import UserProfileCard from "./UserProfile";

const RightBar = ({ mode }) => {
	const [ users, setUsers ] = useState([]);
	const localId = localStorage.getItem("BlogUserId");

	const dispatch = useDispatch();

	const getUsers = async () => {
		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.get("/user/all-users");
			if (data?.success) {
				setUsers(data.users || []);
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const rightDetails = () => <UserProfileCard users={users} mode={mode} />;

	return (
		<Box
			flex={2}
			p={2}
			sx={{
				display: { sm: "none", xs: "none", md: "block" },
				overflow: "hidden",
			}}>
			<Box
				display='flex'
				alignItems='center'
				flexDirection='column'
				justifyContent='center'
				sx={{
					backgroundColor: mode === "light" ? "#ffffff" : "#303030",
					whiteSpace: "nowrap",
				}}>
				{rightDetails()}

				<Box position='fixed' top='620px'>
					<Typography variant='h6' fontWeight={100}>
						Online Friends
					</Typography>
					<AvatarGroup max={4}>
						<Avatar
							sx={{ backgroundColor: "#527853" }}
							alt={localId&&'S'}
							src='/static/images/avatar/1.jpg'
						/>
						<Avatar
							sx={{ backgroundColor: "#F7B787" }}
							alt={localId&&'R'}
							src='/static/images/avatar/2.jpg'
						/>
						<Avatar
							sx={{ backgroundColor: "#219C90" }}
							alt={localId&&'K'}
							src='/static/images/avatar/3.jpg'
						/>
						<Avatar
							sx={{ backgroundColor: "#B4BDFF" }}
							alt={localId&&'A'}
							src='/static/images/avatar/4.jpg'
						/>
						<Avatar
							sx={{ backgroundColor: "#B4BDFF" }}
							alt={localId&&'T'}
							src='/static/images/avatar/5.jpg'
						/>
					</AvatarGroup>
				</Box>
			</Box>
		</Box>
	);
};

export default RightBar;
