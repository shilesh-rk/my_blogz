import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "authentication",
	initialState: {
		isLogin: false,
		loading: false,
		blogs: [],
		userDetails: {},
		userStorage: [],
	},
	reducers: {
		login(state, action) {
			state.isLogin = true;
			state.userStorage = action.payload;
		},
		logout(state) {
			state.isLogin = false;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setBlogs(state, action) {
			state.blogs = action.payload;
		},
		setUserDetails(state, action) {
			state.userDetails = action.payload;
		},
	},
});

export const authActions = authSlice.actions;
export const store = configureStore({
	reducer: authSlice.reducer,
});
