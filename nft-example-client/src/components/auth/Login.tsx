import Moralis from "moralis/types";
import React from "react";
import { AuthenticateOptions } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth";
import styled from "styled-components";
import { ImageButton } from "../ImageButton";

interface IProps {
  authenticate: (
    options?: AuthenticateOptions | undefined
  ) => Promise<Moralis.User<Moralis.Attributes> | undefined>;
}

export const Login: React.FC<IProps> = ({ authenticate }) => {
  return (
    <Container onClick={() => authenticate()}>
      <ImageButton imagePath="images/metamask.png" text="Connect" />
    </Container>
  );
};

const Container = styled.div`
  max-width: 135px;
`;
