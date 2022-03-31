import React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { InternalPage } from "../components/InternalPage";
import { Page } from "../components/Page";
import { useForm } from "../hooks/useForm";

interface IProps {}

export const Mint: React.FC<IProps> = (props) => {
  const [formValues, setFormValues] = useForm({
    tokenId: 0,
    amount: 0,
    contractAddress: "",
  });

  return (
    <Page>
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

        <Button label="Submit" className="is-fullwidth" />
      </InternalPage>
    </Page>
  );
};
