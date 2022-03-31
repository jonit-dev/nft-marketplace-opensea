import React, { useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { InternalPage } from "../components/InternalPage";
import { Loading } from "../components/Loading";
import { Notification } from "../components/Notification";
import { Page } from "../components/Page";
import { nftContractABI } from "../contracts/nftContractABI";
import { useForm } from "../hooks/useForm";
import { notificationStore } from "../store/Notification.store";

interface IProps {}

export interface IMintTokenData {
  amount: number;
  tokenId: string;
  contractAddress: string;
}

export const Mint: React.FC<IProps> = (props) => {
  const { tokenId, contractAddress } = useParams();

  const { enableWeb3, account } = useMoralis();

  const [formValues, setFormValues] = useForm<IMintTokenData>({
    tokenId: tokenId!,
    amount: 1,
    contractAddress: contractAddress!,
  });

  const { data, error, fetch, isLoading, isFetching } = useWeb3ExecuteFunction({
    abi: nftContractABI,
    contractAddress: formValues.contractAddress,
    functionName: "mint",
    params: {
      account,
      id: formValues.tokenId,
      amount: formValues.amount,
    },
  });

  useEffect(() => {
    enableWeb3();
  }, [enableWeb3]);

  useEffect(() => {
    if (error) {
      console.log(error);
      notificationStore.clearNotification();
    }

    if (data) {
      console.log(data);
    }
  }, [data, error]);

  const onClickMint = async () => {
    if (formValues.amount === 0) {
      alert("You cannot mint zero tokens");
      return;
    }

    notificationStore.showNotification(
      "is-info",
      "Your NFT is being minted. Please wait...",
      false
    );

    await fetch({
      onSuccess: async (transaction: any) => {
        notificationStore.showNotification(
          "is-info",
          "Processing transaction...",
          false
        );

        await transaction.wait();

        notificationStore.showNotification(
          "is-success",
          "Your NFT has been minted!",
          false
        );
      },
    });
  };

  return (
    <Page>
      <Notification />
      {isLoading && !data ? (
        <Loading />
      ) : (
        <InternalPage>
          <h1 className="title">Mint</h1>

          <Input
            label="Token ID"
            value={formValues.tokenId}
            onChange={(e) => {
              setFormValues("tokenId", e.target.value);
            }}
            type="number"
            placeholder="Token ID"
          />

          <Input
            label="Amount"
            value={formValues.amount}
            onChange={(e) => {
              setFormValues("amount", e.target.value);
            }}
            type="number"
            placeholder="Amount"
          />
          <Input
            label="Contract Address"
            value={formValues.contractAddress}
            onChange={(e) => {
              setFormValues("contractAddress", e.target.value);
            }}
            type="text"
            placeholder="Contract address"
          />

          <Button
            label="Submit"
            disabled={isFetching}
            className="is-fullwidth"
            onClick={onClickMint}
          />
        </InternalPage>
      )}
    </Page>
  );
};
