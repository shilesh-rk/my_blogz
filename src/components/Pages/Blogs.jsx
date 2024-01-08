import * as React from "react";
import BlogCard from "./BlogCard";
import { Box, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Api";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Blogs = () => {
	const [blogs, setBlogs] = React.useState([]);
	const [isLogin, setIsLogin] = React.useState(false);
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loading);

	const userData = useSelector((state) => state.userStorage);

	// GET Blogs
	const getBlogs = async () => {
		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.get("/blog/all-blogs");
			if (data?.success) {
				setBlogs(data?.blogs);
				setIsLogin(true);
				dispatch(authActions.login());
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
	}, [isLogin]);

	return (
		<Box
			flex={4}
			p={{ xs: 0, md: 2 }}
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			{loading && (
				<Box sx={{ position: "relative", width: "100%", top: "-250px" }}>
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
							username={blog?.user?.username}
							time={blog?.updatedAt}
							like={true}
						/>
					))}
			</Box>
		</Box>
	);
};

export default Blogs;
