import React, { useState } from "react";
import styled from "@emotion/styled";
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
import Login from "./Login";
import api from "../Api";
import toast from "react-hot-toast";
import { authActions } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";

const StyledModal = styled(Dialog)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

const Register = ({ dialog, setOpenDialog, mode }) => {
	const [openLogin, setOpenLogin] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loading);
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "",
		image: "",
	});

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.post("/user/register", {
				username: inputs.name,
				email: inputs.email,
				password: inputs.password,
			});
			if (data.success) {
				toast.success("User Register Successfully", { position: "top-right" });
			}
		} catch (error) {
			toast.error("Register Failed");
			console.log(error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	return (
		<>
			<StyledModal
				display='flex'
				justifyContent='Start'
				alignItems='center'
				open={dialog}
				onClose={() => setOpenDialog(false)}
				TransitionComponent={Transition}
				keepMounted
				aria-describedby='alert-dialog-slide-description'>
				<Typography
					height={50}
					bgcolor={`${mode === "light" ? "orange" : ""}`}
					textAlign='center'
					variant='h6'
					color='white'>
					Register Here
				</Typography>
				<Divider />
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
					marginBottom={2}
					p={3}
					borderRadius={5}>
					{loading && (
						<Box sx={{ position: "relative", width: "100%" }}>
							<LinearProgress color='warning' />
						</Box>
					)}
					<form onSubmit={handleSubmit}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							maxWidth={450}>
							{["name", "email", "password", "image"].map((field) => (
								<TextField
									key={field}
									sx={{ width: "90%", marginBottom: 2 }}
									variant='standard'
									label={field.charAt(0).toUpperCase() + field.slice(1)}
									name={field}
									margin='normal'
									type={field === "email" ? "email" : "password"}
									color='warning'
									value={inputs[field]}
									onChange={handleChange}
									required={field !== "image"}
								/>
							))}
							<Box
								width='100%'
								display='flex'
								alignItems='center'
								justifyContent='space-between'
								marginTop={2}>
								<Button
									type='submit'
									color={`${mode === "light" ? "success" : "warning"}`}>
									Register
								</Button>
								<Button
									sx={{
										color: `${
											mode === "light"
												? "rgba(255, 141, 0, 1)"
												: "rgba(215, 197, 206, 0.70)"
										}`,
									}}
									onClick={() => setOpenDialog(false)}>
									Cancel
								</Button>
							</Box>
						</Box>
					</form>
					<Typography>
						Existing User?{" "}
						<Button
							color={`${mode === "light" ? "primary" : "info"}`}
							sx={{ fontSize: "13px" }}
							onClick={() => {
								setOpenLogin(true);
								setOpenDialog(false);
							}}>
							Click here
						</Button>
					</Typography>
				</Box>
			</StyledModal>
			<Login
				mode={mode}
				openLogin={openLogin}
				setOpenLogin={() => setOpenLogin(false)}
			/>
		</>
	);
};

export default Register;
