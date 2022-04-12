import { useState, useEffect } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/Styles";

const DetectMetamask = () => {
	const [walletAddress, setWalletAddress] = useState("");
	async function requestAccount() {
		console.log("Requesting account...");

		//check if metamask exists
		if (window.ethereum) {
			console.log("detected");
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				console.log(accounts);
				accountChangedHandler(accounts[0]);
			} catch (error) {
				console.log("Error connecting...", error);
			}
		} else {
			console.log("Meta Mask was not detected!");
		}
	}

	const accountChangedHandler = (newAccount) => {
		setWalletAddress(newAccount);
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	window.ethereum.on("accountsChanged", accountChangedHandler);

	window.ethereum.on("chainChanged", chainChangedHandler);

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

export default DetectMetamask;
