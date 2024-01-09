import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SideBar from "./components/layout/SideBar";
import Blogs from "./components/Pages/Blogs";
import RightBar from "./components/layout/RightBar";
import NavBar from "./components/layout/NavBar";
import UserBlogs from "./components/Pages/UserBlogs";
import BlogDetails from "./components/Pages/BlogDetails";

function App() {
	const [mode, setMode] = useState("light");
	const [navOpen, setNavOpen] = useState(false);

	const currentTheme = createTheme({
		palette: {
			mode: mode,
			primary: {
				main: "#1760b5",
				light: "#F69100",
				dark: "#000000",
			},
			secondary: {
				main: "#15c690",
			},
			background: {
				default: {
					light: "#ffffff",
					dark: "#303030",
				}[mode],
			},
		},
	});

	const sideNav = () => {
		setNavOpen(!navOpen);
	};

	const toggleThemeMode = () => {
		setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	};

	return (
		<>
			<ThemeProvider theme={currentTheme}>
				<Box
					bgcolor={currentTheme.palette.background.default}
					color={currentTheme.palette.text.primary}>
					<NavBar
						toggleThemeMode={toggleThemeMode}
						mode={mode}
						sideNav={sideNav}
					/>
					<Toaster />
					<Stack direction='row' spacing={2} justifyContent='space-between'>
						<SideBar
							toggleThemeMode={toggleThemeMode}
							mode={mode}
							navOpen={navOpen}
							setNavOpen={setNavOpen}
						/>
						<Routes>
							<Route
								path='/'
								element={<Blogs />}
							/>
							<Route
								path='/my-blogs'
								element={
									<UserBlogs mode={mode} />
								}
							/>
							<Route
								path='/blog-details/:id'
								element={<BlogDetails />}
							/>
						</Routes>
						<RightBar mode={mode} />
					</Stack>
				</Box>
			</ThemeProvider>
		</>
	);
}

export default App;
