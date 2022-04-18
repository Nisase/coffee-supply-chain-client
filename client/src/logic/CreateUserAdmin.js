import {
	FormControlLabel,
	FormGroup,
	Input,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useState} from "react";
import useDetectProvider from "../hooks/useDetectProvider";

const CreateUserAdmin = () => {
	const [walletAddress, requestAccount] = useDetectProvider();
	const [userInfoAdmin, setUserInfoAdmin] = useState({
		userAddress: "",
		userNAme: "",
		userContactNo: "",
		userRole: "",
		userIsActive: false,
		userProfileHash: "",
	});

	return (
		<div>
			<Typography variant="h6" color="initial">
				ADMIN
			</Typography>
			<FormGroup>
				<TextField
					id="userAddress"
					label="User Address"
					variant="filled"
				></TextField>
				<Input fullWidth placeholder="User Name"></Input>
				<Input fullWidth placeholder="User Contact No"></Input>
				<Input fullWidth placeholder="User Role"></Input>
				<FormControlLabel control={<Switch />} label="User is Active" />
				{/* <Switch /> */}
				<Input fullWidth placeholder="User Profile Hash"></Input>
			</FormGroup>
		</div>
	);
};

export default CreateUserAdmin;
