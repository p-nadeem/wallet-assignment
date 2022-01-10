import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLibrary = () => {
    return new Web3(provider);
  };
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
