import { useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./pages/Home";
import { Mint } from "./pages/Mint";
import { nftStore } from "./store/NFT.store";

function App() {
  const Web3Api = useMoralisWeb3Api();
  console.log(Web3Api);
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
    <GlobalStyles>
      <Router>
        <Routes>
          <Route path="/mint" element={<Mint />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GlobalStyles>
  );
}

export default App;

const GlobalStyles = styled.div`
  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: white;
    }
  }
`;
