import * as React from "react";
import BlogCard from "./BlogCard";
import { Box, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Api";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Blogs = () => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);
	const loading = useSelector((state) => state.loading);

	// GET Blogs
	const getBlogs = async () => {
		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.get("/blog/all-blogs");
			if (data?.success) {
				dispatch(authActions.setBlogs(data?.blogs));
			}
		} catch (error) {
			toast.error("Error. Please refresh the page.");
			console.log(error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	React.useEffect(() => {
		getBlogs();
	}, []); // Removed isLogin from dependencies

	return (
		<Box
			flex={4}
			p={{ xs: 0, md: 2 }}
			display='flex'
			flexDirection='column'
			justifyContent='start'
			alignItems='center'>
			{loading && (
				<Box sx={{ position: "relative", width: "50%", top: "20px" }}>
					<LinearProgress color='warning' />
				</Box>
			)}
			<Box>
				{!loading &&
					blogs &&
					blogs.map((blog, i) => (
						<BlogCard
							key={i}
							isUser={localStorage.getItem("BlogUserId") === blog?.user?._id}
							id={blog?._id}
							title={blog?.title}
							description={blog?.description}
							image={blog?.image}
							username={blog?.user?.username.toUpperCase()}
							time={blog?.updatedAt}
							like={true}
						/>
					))}
			</Box>
		</Box>
	);
};

export default Blogs;
