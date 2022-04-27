import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/Styles";

const DetectProvider = () => {
	const [walletAddress, setWalletAddress] = useState("");

	const requestAccount = useCallback(async () => {
		console.log("Requesting account...");
		if (window.ethereum) {
			console.log("detected...");
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				setWalletAddress(accounts[0]);
				console.log(accounts);
			} catch (error) {
				console.log("Error connecting...", error);
			}
		} else {
			console.log("Metamask not detected");
			handleClickMetamask();
		}
	}, []);
	useEffect(() => {
		requestAccount();
		const chainChangedHandler = () => {
			// reload the page to avoid any errors with chain change mid use of application
			window.location.reload();
		};
		window.ethereum.on("accountsChanged", requestAccount);
		window.ethereum.on("chainChanged", chainChangedHandler);
		//window.addEventListener("load", requestAccount);
		return () => {
			window.removeEventListener("accountsChanged", requestAccount);
			window.removeEventListener("chainChanged", chainChangedHandler);
			//window.removeEventListener("load", requestAccount);
		};
	}, []);

	const handleClickMetamask = () => {
		window.open("https://metamask.io/download/");
	};

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

export default DetectProvider;
