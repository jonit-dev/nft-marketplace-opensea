import React from "react";
import styled from "styled-components";
import { BaseButton } from "../BaseButton";

interface IProps {}

export const Logout: React.FC<IProps> = (props) => {
  const logout = () => {
    // clear localstorage and refresh page
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container onClick={() => logout()}>
      <BaseButton>
        <p>Disconnect</p>
      </BaseButton>
    </Container>
  );
};

const Container = styled.div`
  max-width: 135px;
`;
