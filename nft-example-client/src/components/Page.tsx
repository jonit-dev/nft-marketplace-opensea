import React from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";

interface IProps {
  children: React.ReactNode;
}

export const Page: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <NavBar />

      <MainSection>{children}</MainSection>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const MainSection = styled.section`
  padding: 2rem;
  min-height: 100%;
`;
