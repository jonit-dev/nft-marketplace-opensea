import { useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { nftStore } from "./store/NFT.store";

function App() {
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();

  useEffect(() => {
    // start by pulling NFT contract data.

    if (isInitialized) {
      (async () => {
        const nftTokens = await nftStore.getNFTTokenIds(Web3Api);

        nftStore.updateNftTokens(nftTokens);

        await nftStore.loadTokenIdOwners(Web3Api);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
