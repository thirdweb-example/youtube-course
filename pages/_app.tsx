import type { AppProps } from "next/app";
import { ThirdwebProvider, localWallet, metamaskWallet, paperWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "optimism-goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedWallets={[
        metamaskWallet(),
        localWallet()
      ]}
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
