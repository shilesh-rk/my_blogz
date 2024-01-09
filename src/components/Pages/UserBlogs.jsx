import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import api from "../../Api";
import { Box, LinearProgress, Typography } from "@mui/material";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const UserBlogs = React.memo(({ mode }) => {
	const [userBlogs, setUserBlogs] = useState([]);
	const [userDetails, setUserDetails] = useState({});
	const loading = useSelector((state) => state.loading);
	const isLogin = localStorage.getItem("BlogUserId") || false;
	const dispatch = useDispatch();

	// get user blogs
	const getUserBlogs = async () => {
		try {
			dispatch(authActions.setLoading(true));
			// const id = localStorage.getItem("BlogUserId");
			const { data } = await api.get(`/user/user-blog/${isLogin}`);
			if (data?.success) {
				setUserBlogs(data?.userBlog);
				setUserDetails({
					username: data?.userBlog.username,
					blogCount: data?.userBlog.blogs.length,
				});
			}
		} catch (error) {
			console.log("getting user blogs", error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	useEffect(() => {
		if (isLogin) {
			// Only make the API call if isLogin has changed
			getUserBlogs();
		}
	}, [isLogin]); // Re-run the effect only when isLogin (localStorage) changes

	return (
		<Box
			flex={4}
			p={{ xs: 0, md: 2 }}
			display='flex'
			alignItems='center'
			flexDirection='column'>
			{!isLogin && (
				<Box
					flex={4}
					height='50%'
					width='50%'
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "start",
						position: "fixed",
						color: "#303030",
					}}>
					<Typography sx={{ letterSpacing: 6 }}>You</Typography>
					<Typography sx={{ letterSpacing: 6 }}>Haven't</Typography>
					<Typography sx={{ letterSpacing: 6 }}>Created</Typography>
					<Typography sx={{ letterSpacing: 6 }}>Blogs</Typography>
				</Box>
			)}

			{loading ? (
				<Box
					sx={{
						position: 'relative',
						top:'20px',
						width: "50%",
					}}>
					<LinearProgress color='warning' />
				</Box>
			) : userBlogs.blogs && userBlogs.blogs.length > 0 ? (
				<Box>
					{userBlogs.blogs.map((blog, i) => (
						<BlogCard
							key={blog?._id}
							title={blog?.title}
							description={blog?.description}
							image={blog?.image}
							username={userDetails?.username}
							time={blog?.updatedAt}
							isUser={true}
							id={blog?._id}
							like={true}
						/>
					))}
				</Box>
			) : null}
		</Box>
	);
});

export default UserBlogs;
