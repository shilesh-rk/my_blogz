import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
	Box,
	Button,
	Dialog,
	Divider,
	LinearProgress,
	Slide,
	TextField,
	Typography,
} from "@mui/material";
import api from "../Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/store";

// Styled component for customization
const StyledModal = styled(Dialog)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

// MUI Style for Dialog appearance
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

const Login = ({ openLogin, setOpenLogin, mode, dialog, setOpenDialog }) => {
	const loading = useSelector((state) => state.loading);
	const userData = useSelector((state) => state.userStorage);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const [done, setDone] = useState(false);

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(authActions.setLoading(true));

		try {
			const { data } = await api.post("/user/login", {
				email: inputs.email,
				password: inputs.password,
			});

			if (data.success) {
				localStorage.setItem("BlogUserId", data?.user._id);
				dispatch(authActions.login(data?.user));
				toast.success("User login Successfully", { position: "top-center" });
				userData ? setOpenLogin : setOpenDialog(false);
				window.location.reload();
				setDone(true);
			} else {
				toast.error("Login Failed");
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(authActions.setLoading(false));
		}
	};

	useEffect(() => {
		// Reset the form after successful login
		if (done) {
			setInputs({ email: "", password: "" });
		}
	}, [done]);

	return (
		<>
			<StyledModal
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				open={openLogin || dialog}
				onClose={openLogin ? setOpenLogin : setOpenDialog}
				TransitionComponent={Transition}
				keepMounted
				aria-describedby='alert-dialog-slide-description'>
				<Typography
					height={50}
					bgcolor={`${mode === "light" ? "orange" : ""}`}
					textAlign={"center"}
					variant='h6'
					color={"white"}>
					Login Here
				</Typography>
				<Divider />
				<Box
					p={3}
					borderRadius={5}
					marginTop={0}
					marginLeft={5}
					marginRight={5}
					marginBottom={2}>
					{loading && (
						<Box sx={{ position: "relative", width: "100%" }}>
							<LinearProgress color='warning' />
						</Box>
					)}
					<form onSubmit={handleSubmit}>
						<Box
							display='flex'
							flexDirection={"column"}
							alignItems={"center"}
							justifyContent={"center"}
							margin={"auto"}
							padding={3}
							maxWidth={450}>
							{["email", "password"].map((field) => (
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
									required
								/>
							))}
							<Button
								type='submit'
								color={`${mode === "light" ? "success" : "warning"}`}
								variant='contained'
								sx={{ marginTop: "20px" }}
								onClick={() => done && setOpenDialog(false)}>
								Login
							</Button>
							<Box
								width='90%'
								display='flex'
								alignItems={"center"}
								justifyContent={"space-between"}
								marginTop={2}>
								<Button color='warning'>Reset</Button>
								<Button color='warning' onClick={() => setOpenDialog(false)}>
									Cancel
								</Button>
							</Box>
						</Box>
					</form>
					{/* Display "Not a User?" message only if the user is not logged in */}
					{!userData && (
						<Typography textAlign={"center"}>
							Not a User? Please Register
						</Typography>
					)}
				</Box>
			</StyledModal>
		</>
	);
};

export default Login;
