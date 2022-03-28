import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { IoDiamondOutline } from "react-icons/io5";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { uiColors } from "../constants/colors";
import { userStore } from "../store/user.store";
import { IUser } from "../types/user.types";
import { Login } from "./auth/Login";
import { Logout } from "./auth/Logout";
import { TextIcon } from "./TextIcon";

export const Header: React.FC = observer(() => {
  const { authenticate, isAuthenticated, user } = useMoralis();

  useEffect(() => {
    if (user) {
      userStore.setUser(user.attributes as unknown as IUser);
    }
  }, [isAuthenticated, user]);

  return (
    <Container>
      <HeaderBlock className="center" flex={10}>
        {userStore.user?.accounts && (
          <TextIcon text="Connected" Icon={IoDiamondOutline} />
        )}
      </HeaderBlock>

      <HeaderBlock className="center" flex={80}>
        <h1>NFT MarketPlace</h1>
      </HeaderBlock>

      <HeaderBlock className="center" flex={10}>
        {!isAuthenticated ? <Login authenticate={authenticate} /> : <Logout />}
      </HeaderBlock>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  color: white;
  background-color: ${uiColors.primary};

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .center {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: 1000px) {
    flex-wrap: wrap;
    div {
      flex: 100%;
    }
  }
`;

interface IPropsHeaderBlock {
  flex?: number;
}

const HeaderBlock = styled.div<IPropsHeaderBlock>`
  flex: ${(props) => props.flex || 25}%;
  height: 100%;
  background-color: ${uiColors.primary};
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
`;
