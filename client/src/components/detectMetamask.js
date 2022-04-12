import { Button, Container, Paper, Typography } from "@mui/material";
import DetectMetamask from "../logic/detectMetamask";

const DetectMetamaskButton = () => {
	return (
		<Container>
			<Paper>
				<Button>Connect Wallet</Button>
				<Typography variant="h3">Wallet Address: {walletAddress}</Typography>
			</Paper>
		</Container>
	);
};
