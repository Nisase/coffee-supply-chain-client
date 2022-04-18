import { Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import useDetectProvider from "../hooks/useDetectProvider";

const LoginMetamask = () => {
	const [walletAddress, error, requestAccount] = useDetectProvider();
	const theme = useTheme();

	const handleClickMetamask = () => {
		window.open("https://metamask.io/download/")
	}

	return (
		<div className="flex flex-col justify-center items-center">
			{ !walletAddress && <>
			<LoadingButton onClick={requestAccount} variant="contained" fullWidth size="large" type="submit" loading={false}>
			Connect Wallet
			</LoadingButton>
			<div className="w-full h-1 my-3" />
			<LoadingButton onClick={handleClickMetamask} color="secondary" variant="contained" type="submit" loading={false}>
				Get Metamask
			</LoadingButton>
			</>}

			{ walletAddress && !error && 
				<Typography variant="h6">
				Wallet Address: {walletAddress}
				</Typography>
			}

			{error && <div className="mt-5">
				{error}
			</div>}			
		</div>				
	);
};

export default LoginMetamask;
