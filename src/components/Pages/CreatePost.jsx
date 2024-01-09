import styled from "@emotion/styled";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {
	Box,
	Button,
	Dialog,
	Divider,
	Fab,
	LinearProgress,
	Slide,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import toast from "react-hot-toast";
import api from "../../Api";
import { authActions } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Styled component for the modal with scrollbar customization
const StyledModal = styled(Dialog)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

// ... (imports)

const CreatePost = ({ mode, dialog, setOpenDialog }) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const id = localStorage.getItem("BlogUserId");
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!id) {
			toast.error("Please Login...", {
				style: {
					border: "1px solid #713200",
					padding: "16px",
					color: "#713200",
				},
				iconTheme: { primary: "#713200", secondary: "#FFFAEE" },
			});
			return;
		}

		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.post("/blog/create-blog", inputs);
			if (data?.success) {
				toast.success("Blog Created Successfully");
				navigate("/");
				open && setOpen(false);
				setOpenDialog(false);
			}
		} catch (error) {
			toast.error("Blog Creating Failed");
			console.log(error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	return (
		<>
			<Tooltip
				title='Create Blog'
				sx={{
					position: "fixed",
					bottom: 20,
					left: { xs: "calc(50% - 25px)", md: 30 },
				}}>
				<Fab
					color={`${mode === "light" ? "warning" : ""}`}
					aria-label='add'
					onClick={() => setOpen(true)}>
					<AddCircleOutline />
				</Fab>
			</Tooltip>
			<StyledModal
				open={open ? open : dialog}
				onClose={() => {
					open && setOpen(false);
					setOpenDialog(false);
				}}
				TransitionComponent={Transition}
				keepMounted
				aria-describedby='alert-dialog-slide-description'>
				<Typography
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					height={50}
					bgcolor={`${mode === "light" ? "orange" : ""}`}
					textAlign={"center"}
					variant='h6'
					color={"white"}>
					Create Blog
				</Typography>
				<Divider />
				{loading && (
					<Box sx={{ position: "relative", width: "50%", top: "20px" }}>
						<LinearProgress color='warning' />
					</Box>
				)}
				<Box
					sx={{
						"&::-webkit-scrollbar": {
							width: 2,
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: "none",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "#F69100",
							borderRadius: 2,
						},
					}}
					marginTop={0}
					marginLeft={5}
					marginRight={5}
					// margin={5}
					marginBottom={2}
					height={500}
					p={3}
					borderRadius={5}
					overflow={"auto"}>
					<form onSubmit={handleSubmit}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							margin='auto'
							padding={3}
							maxWidth={450}>
							{["title", "description", "image"].map((field) => (
								<TextField
									key={field}
									sx={{ width: "90%", marginBottom: 2 }}
									variant='standard'
									label={field.charAt(0).toUpperCase() + field.slice(1)}
									name={field}
									margin='normal'
									type='text'
									color='warning'
									value={inputs[field]}
									onChange={handleChange}
									required
								/>
							))}
							<Button
								type='submit'
								color={`${mode === "light" ? "success" : "warning"}`}
								variant='outlined'>
								Submit
							</Button>
							<Box
								width='90%'
								display='flex'
								alignItems='center'
								justifyContent='space-between'
								marginTop={2}>
								<Button color='warning'>Reset</Button>
								<Button
									color='warning'
									onClick={() => {
										open && setOpen(false);
										setOpenDialog(false);
									}}>
									Cancel
								</Button>
							</Box>
						</Box>
					</form>
					<BlogCard
						title={inputs.title}
						description={inputs.description}
						image={inputs.image}
					/>
				</Box>
			</StyledModal>
		</>
	);
};

export default CreatePost;
