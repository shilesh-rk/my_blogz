import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Checkbox } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { authActions } from "../redux/store";
import api from "../../Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
	title,
	description,
	image,
	username,
	time,
	id,
	isUser,
	like,
	shadow,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Blog Date
	const formattedTime = new Date(time).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
	});

	const formattedDate = new Date(time).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const min = 28;
	const max = 97;
	let rand = Math.floor(min + Math.random() * (max - min + 1));

	const [showMore, setShowMore] = React.useState(false);

	// Card handles
	const toggleDescription = () => {
		setShowMore(!showMore);
	};

	// EDIT
	const handleEdit = () => {
		navigate(`/blog-details/${id}`);
	};

	// DELETE
	const handleDelete = async () => {
		try {
			dispatch(authActions.setLoading(true));
			const { data } = await api.delete(`/blog/delete-blog/${id}`);
			if (data?.success) {
				window.location.reload();
				dispatch(authActions.setLoading(false));
				toast.success("Blog Deleted Successfully");
			}
		} catch (error) {
			toast.error("Failed");
			console.log(error);
		}
	};

	return (
		<Card
			sx={{
				maxWidth: 510,
				margin: 5,
				boxShadow: shadow && "0px 0px 10px #ccc",
			}}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
						{username?.slice(0, 1).toUpperCase()}
					</Avatar>
				}
				action={
					isUser ? (
						<Box display='flex'>
							<IconButton sx={{ color: blue[300] }} onClick={handleEdit}>
								<BorderColorIcon />
							</IconButton>
							<IconButton sx={{ color: red[500] }} onClick={handleDelete}>
								<DeleteIcon />
							</IconButton>
						</Box>
					) : (
						<IconButton aria-label='settings'>
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={`${username ? username : "@username"}`}
				subheader={
					time ? `${formattedDate} ${formattedTime}` : "Date: Posting Now"
				}
			/>
			<CardMedia component='img' height='194' image={image} alt={`${image}`} />
			<CardContent>
				<Typography
					variant='h6'
					color='text.secondary'
					display='flex'
					justifyContent='space-between'>
					{!title && "Title"} {title}
					<Typography style={{ display: "flex" }}>
						<Checkbox
							sx={{ position: "relative", top: "-9px" }}
							icon={<FavoriteBorder />}
							checkedIcon={<Favorite sx={{ color: "red" }} />}
						/>
						<Typography style={{ fontSize: 15 }} onClick={() => (rand += 1)}>
							{like ? rand : null}
						</Typography>
					</Typography>
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{!description && "Description"}
					{showMore ? description : `${description?.slice(0, 100)}...`}
					<ExpandMoreIcon
						aria-label='settings'
						onClick={toggleDescription}
						sx={{
							transform: `${showMore ? "rotate(180deg)" : "rotate(0deg)"}`,
							border: 1,
							borderRadius: 5,
							fontSize: "18px",
							borderColor: "#F69100",
							position: "relative",
							left: "3px",
							top: "5px",
						}}></ExpandMoreIcon>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default BlogCard;
