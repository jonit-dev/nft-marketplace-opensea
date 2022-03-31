import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Loading } from "../components/Loading";
import { Page } from "../components/Page";
import { appEnv } from "../constants/env";
import { nftStore } from "../store/NFT.store";
import { uiStore } from "../store/UI.store";

interface IProps {}

export const Home: React.FC<IProps> = observer((props) => {
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

  const onRenderNFTs = () =>
    nftStore.nftTokens.map((nft, index) => {
      if (nft.amount) {
        return (
          <Card
            title={nft.metadata.name}
            imagePath={nft.metadata.image}
            key={`${nft.metadata.name}-${index}`}
          >
            <p>{nft.metadata.description}</p>
            <p>
              <strong>Amount: </strong> {nft.amount}
            </p>
            <p>
              <strong>Owners</strong>:{" "}
              {!nftStore.ownersLoaded
                ? "Loading..."
                : nft.owners?.length || "No owners for this NFT."}
            </p>
            <Link to={`/mint/${nft.token_id}/${appEnv.nft.contractAddress}`}>
              <span
                className="button is-link modal-button"
                data-target="modal-card"
              >
                Mint
              </span>
            </Link>
          </Card>
        );
      }
    });

  return (
    <Page>
      {uiStore.isLoading && <Loading />}
      <div className="columns features">
        {!uiStore.isLoading && onRenderNFTs()}
      </div>
    </Page>
  );
});
