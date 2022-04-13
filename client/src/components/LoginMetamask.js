import React from "react";
import useDetectProvider from "../hooks/useDetectProvider";
import { Button, Container, Paper, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/Styles";

const LoginMetamask = () => {
	const [walletAddress, requestAccount, handleClickMetamask] =
		useDetectProvider();
	return (
		<ThemeProvider theme={theme}>
			<Container
				sx={{
					maxWidth: "800px",
				}}
			>
				<Paper
					sx={{
						marginTop: "10rem",
						marginLeft: "2rem",
					}}
				>
					<Button onClick={requestAccount} variant="contained" sx={{}}>
						Connect Wallet
					</Button>
					<Typography
						variant="h6"
						sx={{
							padding: "1rem",
						}}
					>
						Wallet Address: {walletAddress}
					</Typography>
					<Button onClick={handleClickMetamask} variant="contained">
						Get Metamask
					</Button>
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

export default LoginMetamask;
