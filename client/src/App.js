import { useEffect, useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import useDetectProvider from "./hooks/useDetectProvider";

import supplychainStorageABI from "./contracts/SupplyChainStorage.json";
import supplychainUserABI from "./contracts/SupplyChainUser.json";
import coffeeSupplychainABI from "./contracts/CoffeeSupplyChain.json";

const CoffeeSupplyChainAddress = "0xB103004b86BC26dCB6eB0e87C5B9877929d68298";
const SupplyChainUserAddress = "0x9719E9dC77A7eDD3825844c77a68c896d4a7BB2b";

function App() {
	const [walletAddress, error] = useDetectProvider();
	const [isWallet, setIsWallet] = useState(false);

	useEffect(()=>{
		setIsWallet(walletAddress !==null && error ===null)
	}, [walletAddress]);


	return (
		<ThemeProvider>
			<ScrollToTop />
			<BaseOptionChartStyle />
			{useRoutes(routes(isWallet))}
		</ThemeProvider>
	);
}

export default App;