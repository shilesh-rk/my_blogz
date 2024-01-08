import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store";
import BlogCard from "./BlogCard";
import api from "../../Api";
import toast from "react-hot-toast";

const BlogDetails = () => {
	const [singleBlog, setSingleBlog] = useState({});
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((state) => state.loading);

	const [inputs, setInputs] = useState({
		title: "",
		description: "",
		image: "",
		user: id,
	});

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const getBlogDetails = async () => {
		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.get(`/blog/get-blog/${id}`);
			if (data?.success) {
				setSingleBlog(data?.blog);
				setInputs({
					title: data?.blog.title,
					description: data?.blog.description,
					image: data?.blog.image,
				});
			}
		} catch (error) {
			toast.error("Please refresh the page and try again");
			console.log(error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.put(`/blog/update-blog/${id}`, {
				title: inputs.title,
				description: inputs.description,
				image: inputs.image,
				user: inputs.user,
			});
			if (data?.success) {
				toast.success("Blog Updated Successfully");
				navigate("/my-blogs");
			}
		} catch (error) {
			toast.error("Updating Failed");
			console.log(error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	useEffect(() => {
		getBlogDetails();
	}, [id]);

	return (
		<Box flex={4} p={{ xs: 0, md: 2 }}>
			{loading && <h1>Loading...</h1>}
			<form onSubmit={handleSubmit}>
				<Box
					maxWidth={450}
					display='flex'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					margin='auto'
					marginTop={5}
					boxShadow='0px 0px 10px #ccc'
					borderRadius={5}
					p={3}>
					<Typography variant='h4' padding={3} textAlign='center'>
						Edit Your Post
					</Typography>
					{["title", "description", "image"].map((field) => (
						<TextField
							key={field}
							sx={{ width: "90%", marginBottom: 2 }}
							placeholder={field}
							name={field}
							margin='normal'
							type='text'
							value={inputs[field]}
							onChange={handleChange}
							multiline
						/>
					))}
					<Button
						type='submit'
						sx={{ borderRadius: 3, marginTop: 3 }}
						variant='outlined'
						color='secondary'>
						Update
					</Button>
					<Box
						width='90%'
						display='flex'
						alignItems='center'
						justifyContent='space-between'
						marginTop={2}>
						<Button
							color='primary'
							onClick={() =>
								setInputs({ title: "", description: "", image: "" })
							}>
							Reset
						</Button>
						<Button color='primary' onClick={() => navigate("/my-blogs")}>
							Cancel
						</Button>
					</Box>
				</Box>
			</form>
			<Box
				display='flex'
				alignItems='center'
				flexDirection='column'
				justifyContent='center'>
				<BlogCard
					title={inputs.title}
					description={inputs.description}
					image={inputs.image}
					username='@username'
					shadow={true}
				/>
			</Box>
		</Box>
	);
};

export default BlogDetails;
